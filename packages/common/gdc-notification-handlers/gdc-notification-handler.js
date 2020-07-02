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
  notification(notification) {
    throw new Error('Method GDCNotificationHandler::receiveNotification is abstract');
  }

  /**
   * Receive progress
   * @param {*} progress - A number between 0 and 1 noting the progress of the collection
   */
  progress(progress) {
    throw new Error('Method GDCNotificationHandler::receiveProgress is abstract');
  }

  /**
   * Receive error
   * @param {*} progress - An error
   */
  error(progress) {
    throw new Error('Method GDCNotificationHandler::receiveError is abstract');
  }
}

module.exports = GDCNotificationHandler;
