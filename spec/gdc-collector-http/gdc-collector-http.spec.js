const GDCCollectorHttp = require('../../lib/gdc-collectors/http/gdc-collector-http');
const GDCDataReceiver = require('../../lib/gdc-data-receivers/gdc-data-receiver');
const GDCNotificationHandler = require('../../lib/gdc-notification-handlers/gdc-notification-handler');
const fs = require('fs');

describe('Collect http', function() {
  /**
   * A simple data reciever that outputs the data to the console
   */
  class MyDataReceiver extends GDCDataReceiver {

    /**
     *
     * @param {*} dataReceivedCallback - A callback that will be called when data arrives
     */
    constructor(dataReceivedCallback) {
      super();
      this.dataReceivedCallback = dataReceivedCallback;
    }

    /**
     *
     * @param {*} data
     * @param {*} meta
     */
    receiveData(data, meta) {
      this.dataReceivedCallback(data, meta);
    }
  }

  /**
   * A simple notification handler that outputs notification to console
   */
  class MyNotificationHadler extends GDCNotificationHandler {
    /**
     *
     * @param {*} notification
     */
    receiveNotification(notification) {
      console.log(notification);
    }
  }

  const myNotificationHandler = new MyNotificationHadler();

  it('test http page', function(done) {
    const expected = fs.readFileSync('spec/gdc-collector-http/itcorp.html', 'utf8');
    const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new MyDataReceiver((data, meta) => {
        expect(data).toEqual(expected);
        done();
      }),
      notificationHandler: myNotificationHandler,
    });
    httpCollector.collect(['www.itcorp.com/']);
  });
});
