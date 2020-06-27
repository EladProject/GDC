const GDCNotificationHandler = require('./gdc-notification-handler.js');

/**
 * A simple notification handler that prints progress and notifications to console
 */
class GDCLogNotificationHandler extends GDCNotificationHandler {
  /**
     *
     * @param {*} notification
     */
  receiveNotification(notification) {
    console.log(notification);
  }

  /**
       *
       * @param {*} progress
       */
  receiveProgress(progress) {
    console.log(progress);
  }
}

module.exports = GDCLogNotificationHandler;
