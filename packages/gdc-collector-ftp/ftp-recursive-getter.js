const ftp = require('basic-ftp');
const {w2match} = require('wild2wild_matcher');
const {Writable } = require('stream');

/**
 * A class that recursively parses the FTP directory tree and gets the files
 * according to the target's regular expressions
 */
class FtpRecursiveGetter {

  /**
     *
     * @param {*} ftpConnectionConf
     * Constructor
     */
  constructor(ftpConnectionConf, notificationHandler, dataReceiver) {
    this.ftpClient = new ftp.Client();
    this.connectionConf = ftpConnectionConf;
    this.notificationHandler = notificationHandler;
    this.dataReciever = dataReceiver;
  }

  /**
   * @param {*} targets
   * Async function to do the collection
   */
  async getTargets(targets) {
    this.targets = targets;
    this.filesToCollect = [];

    try {
      await this.ftpClient.access(this.connectionConf);
      this.ftpClient.verbose = true;
      const startDir = await this.ftpClient.pwd();
      await this.scanDirRecursive(startDir);
      await this.getFiles();
      this.notificationHandler.notification('Closing');
      await this.ftpClient.close();
    } catch (err) {
      this.notificationHandler.notification(err);
    }
  }

  /**
   * Recursively scan a dir in ftp for target matches, update the 'filesToCollect' array with files
   * to be collected. The scan is efficient in the sense that directories that don't have a chance 
   * to match any of the targets are not scanned.
   *
   * @param {string} dirName - relative dir
   */
  async scanDirRecursive(dirName) {

    this.notificationHandler.notification('Scanning ' + dirName);
    const files = await this.ftpClient.list();
    for (const file of files) {
      const filePath = dirName + (dirName.endsWith('/') ? '' :'/') + file.name;
      //this.notificationHandler.notification(filePath);
      if (file.isDirectory && this.isDirPotentialMatch(filePath)) { // directory

        await this.ftpClient.cd(filePath);
        await this.scanDirRecursive(filePath);

      } else if (file.isFile && this.isFileMatch(filePath)) {

        this.filesToCollect.push({
          path: filePath,
          size: file.size,
        });

      } else if (file.isSymLink) {
        this.notificationHandler.notification('Symlinks not supported');
      }

      await this.ftpClient.cd('..');
    }
  }

  /**
   * Get all the files that that were marked for collection
   */
  async getFiles() {
    this.totalSize = this.getTotalSize(this.filesToCollect);
    this.notificationHandler.notification('Will download ' + this.filesToCollect.length + ' files totaling ' + this.totalSize);
    this.totalDownloaded = 0;

    for (let i = 0; i < this.filesToCollect.length; ++i) {
      const file = this.filesToCollect[i];
      this.notificationHandler.notification('Downloading ' + file.path + ' size:' + file.size);
      await this.getFile(file);
      this.notificationHandler.notification('Downloaded ' + file.path);
    }

    this.notificationHandler.progress(1.0);
  }

  /**
   * Download a specific target
   * @param {*} file 
   */
  async getFile(file) {

      let buffer = Buffer.alloc(file.size);
      let offset = 0;
      const meta = {
        target: file.path,
        collectioStart: new Date(),
      };

      const writeStream = new Writable ({
        highWaterMark: 65536,
        write: (chunk, encoding, callback) => {

          chunk.copy(buffer, offset);
          offset += chunk.length;
          this.totalDownloaded += chunk.length;

          // Indicate a succesful write
          callback();

          this.notificationHandler.progress(this.totalDownloaded/this.totalSize);
        },
        final: (callback) => {

          meta.collectionEnd = new Date();
          this.dataReciever.receiveData(buffer, meta);

          callback();
        }
      });
      
      const response = await this.ftpClient.downloadTo(writeStream, file.path);
  }

  /**
   * Get the total size of the files in filesList
   * @param {*} filesList - An array of file object of the form {path, size}
   */
  getTotalSize(filesList) {
    var totalSize = 0;

    filesList.forEach(file => {
      totalSize += file.size;
    });

    return totalSize;
  }

  /**
   * Check if the current file matches any of the targets
   *
   * @param {*} filePath
   * @return {boolean} - is file exactly match at least one of the targets
   */
  isFileMatch(filePath) {
    for (const target of this.targets) {
      
      if (w2match(filePath, target)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if current directory can have potential file matches (in it's descendats)
   *
   * @param {*} dirPath
   * @return {boolean} - is the current dir path a potential future match
   */
  isDirPotentialMatch(dirPath) {
    
    const dirAsPrefix = dirPath + '*';

    for (const target of this.targets) {

      if (w2match(dirAsPrefix, target)) {
        return true;
      }
    }

    return false;
  }
}

module.exports = FtpRecursiveGetter;
