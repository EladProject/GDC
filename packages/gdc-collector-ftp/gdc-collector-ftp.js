const {GDCCollector} = require('@gdc-js/common');
const FtpRecursiveGetter = require('./ftp-recursive-getter.js');

/**
 * FTP data collector
 */
class GDCCollectorFtp extends GDCCollector {

  /**
     * @return {*} - supported properties
    */
  getPropertiesSchema() {
    return {
      'required': ['host'],
      'properties': {
        'host': {
          'type': 'string',
        },
        'port': {
          'type': 'number',
          'minimum': 0,
          'maximum': 65535,
          'default': 21,
        },
        'username': {
          'type': 'string',
          'default': '',
        },
        'password': {
          'type': 'string',
          'default': '',
        },
      },
    };
  }

  /**
   *
   * @param {*} conf
   */
  constructor(conf) {
    super(conf);
    this.ftpRecursiveGetter = new FtpRecursiveGetter(
      this.getFtpConnectionConf(),
      this.notificationHandler,
      this.dataReceiver);
  }

  /**
   * @param {*} targets - collection targets
   *
   * Perform data collection for this collector
   */
  collectSpecific(targets) {

    this.numTargets = targets.length;

    this.ftpRecursiveGetter.getTargets(targets).then( (result) => {
      console.log('Finished');
    });

  }


  /**
   * Build FTP conf from properties
   * @return {*} FTP conf
   */
  getFtpConnectionConf() {
    const conf = {
      'host': this.properties.host,
      'port': this.properties.port,
    };

    if (this.properties.username) {
      conf.user = this.properties.username;
    }
    if (this.properties.password) {
      conf.password = this.properties.password;
    }

    return conf;
  }
}

module.exports = GDCCollectorFtp;
