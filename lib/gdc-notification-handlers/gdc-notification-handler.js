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
}

module.exports = GDCNotificationHandler;
