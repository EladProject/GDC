/**
 * Notification handler interface
 */
class GDCNotificationHandler {

  /**
     *
     */
  constructor() {
    if (new.target === GDCNotificationHandler) {
      throw new Error('Cannot instantiate abstract class GDCNotificationHandler');
    }
  }

  /**
   *
   * @param {*} notification
   */
  receiveNotification(notification) {
    throw new Error('Method GDCNotificationHandler::receiveNotification is abstract');
  }

  /**
   * Receive progress
   * @param {*} progress - A number between 0 and 1 noting the progress of the collection
   */
  receiveProgress(progress) {
    throw new Error('Method GDCNotificationHandler::receiveProgress is abstract');
  }
}

module.exports = GDCNotificationHandler;
