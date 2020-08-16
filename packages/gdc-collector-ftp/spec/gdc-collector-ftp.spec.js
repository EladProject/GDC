const GDCCollectorFtp = require('../gdc-collector-ftp');
const {GDCCallbackDataReceiver} = require('@gdc-js/common');
const {GDCLogNotificationHandler} = require('@gdc-js/common');
const fs = require('fs');

describe('Collect ftp', function() {



  it('test ftp collection', function(done) {
    let numDownloaded = 0;
    const ftpCollector = new GDCCollectorFtp({
      properties: {
        'host': 'demo.wftpserver.com',
        'username': 'demo',
        'password': 'demo',
      },
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        const fileName = 'packages/gdc-collector-ftp/spec/' + meta.target.substring(meta.target.lastIndexOf('/')+1);
        const groundTruth = fs.readFileSync(fileName);

        expect(data).toEqual(groundTruth);
        numDownloaded++;

        if (numDownloaded == 4) {
          done();
        }
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    ftpCollector.collect(['/download/*.jpg']);
  }, 100000);

  it('test FreeBSD site collection', function(done) {
    let numDownloaded = 0;

    const ftpCollector = new GDCCollectorFtp({
      properties: {
        'host': 'ftp.at.freebsd.org',
      },
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        numDownloaded++;
        if (numDownloaded == 35) {
          done();
        }
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    ftpCollector.collect(['/pub/FreeBSD/doc/en_US.ISO8859-1/articles/*article*ml.tar.zip']);
  }, 100000);
});
