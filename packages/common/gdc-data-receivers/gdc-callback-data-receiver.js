const GDCDataReceiver = require('./gdc-data-receiver');

/**
 * A simple data receiver that passes the data to a callback function
 */
class GDCCallbackDataReceiver extends GDCDataReceiver {
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

module.exports = GDCCallbackDataReceiver;
