const GDCCollectorHttp = require('../gdc-collector-http');
const {GDCCallbackDataReceiver} = require('@gdc-js/common');
const {GDCLogNotificationHandler} = require('@gdc-js/common');
const fs = require('fs');

describe('Collect http', function() {

  const iiiiiiiiHtml = fs.readFileSync('packages/gdc-collector-http/spec/iiiiiiii.html', 'utf8');


  it('test http page', function(done) {
    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        expect(data).toEqual(iiiiiiiiHtml);
        done();
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['http://www.iiiiiiii.com/index.html']);
  }, 10000);

  it('test multiple urls', function(done) {
    let collectedCount = 0;

    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        collectedCount++;
        if (meta.target === 'http://www.iiiiiiii.com/index.html') {
          expect(data).toEqual(iiiiiiiiHtml);
        }
        if (collectedCount == 3) {
          done();
        }
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['http://www.google.com', 'http://www.iiiiiiii.com/index.html', 'http://www.tic.com/index.html']);
  }, 30000);

  /**
   * The 'www.tic.com' page is redirected
   */
  it('test redirection', function(done) {
    let ticHtml = fs.readFileSync('packages/gdc-collector-http/spec/tic.html', 'utf8');
    ticHtml = ticHtml.replace(/(\r\n|\n|\r)/gm, '');
    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        data = data.replace(/(\r\n|\n|\r)/gm, '');
        expect(data).toEqual(ticHtml);
        done();
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['http://www.tic.com/index.html']);
  }, 100000);
});
