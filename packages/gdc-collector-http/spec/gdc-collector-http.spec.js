const GDCCollectorHttp = require('../gdc-collector-http');
const {GDCCallbackDataReceiver} = require('@gdc-js/common');
const {GDCLogNotificationHandler} = require('@gdc-js/common');
const fs = require('fs');

describe('Collect http', function() {

  const expectedHtml = fs.readFileSync('packages/gdc-collector-http/spec/iiiiiiii.html', 'utf8');


  it('test http page', function(done) {
    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        expect(data).toEqual(expectedHtml);
        done();
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['www.iiiiiiii.com/index.html']);
  }, 10000);

  it('test multiple urls', function(done) {
    let collectedCount = 0;

    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        collectedCount++;
        if (meta.target === 'www.iiiiiiii.com/index.html') {
          expect(data).toEqual(expectedHtml);
        }
        if (collectedCount == 3) {
          done();
        }
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['www.google.com', 'www.iiiiiiii.com/index.html', 'www.tic.com/index.html']);
  }, 10000);

  it('test redirection', function(done) {
    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        expect(data).toEqual(expectedHtml);
        done();
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
    httpCollector.collect(['www.itcorp.com/']);
  }, 10000);
});
