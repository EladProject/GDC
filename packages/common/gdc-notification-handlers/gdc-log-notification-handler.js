const GDCNotificationHandler = require('./gdc-notification-handler.js');

/**
 * A simple notification handler that prints progress and notifications to console
 */
class GDCLogNotificationHandler extends GDCNotificationHandler {
  /**
   *
   * @param {*} notification
   */
  notification(notification) {
    console.log('notification:' + notification);
  }

  /**
   *
   * @param {*} progress
   */
  progress(progress) {
    console.log('progress:' + progress);
  }

  /**
   *
   * @param {*} error
   */
  error(error) {
    console.log('error:' + error);
  }
}

module.exports = GDCLogNotificationHandler;
