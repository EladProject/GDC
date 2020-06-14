/**
 * A data reciever interface
 */
class GDCDataReceiver {

  /**
   *
   * @param {*} receiverConf
   */
  constructor(receiverConf) {
    if (new.target === GDCDataReceiver) {
      throw TypeError('Cannot instantiate abstract class GDCDataReceiver');
    }
  }

  /**
   *
   * @param {*} data
   * @param {*} meta
   */
  receiveData(data, meta) {
    throw new Error('Method GDCDataReceiver::receiveData is abstract');
  }
}

module.exports = GDCDataReceiver;
