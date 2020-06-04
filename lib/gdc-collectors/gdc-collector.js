const GDCDataReceiver = require('../gdc-data-receivers/gdc-data-receiver');
const GDCNotificationHandler = require('../gdc-notification-handlers/gdc-notification-handler');
const Ajv = require('ajv');

/**
 * An abstract class
 */
class GDCCollector {
  /**
     *
     * @param {*} conf - An object of type
     * {
     *  properties: {},
     *  notificationHandler: Object,
     *  dataReceiver: Object
     * }
     */
  constructor(conf) {
    if (new.target === GDCCollector) {
      throw TypeError('Cannot instantiate abstract class GDCCollector');
    }

    this.ajv = new Ajv({allErrors: true, useDefaults: true});
    this.validate = this.ajv.compile(this.getPropertiesSchema());
    this.validateConf(conf);

    this.properties = conf.properties;
    this.notificationHanlder = conf.notificationHandler;
    this.dataReceiver = conf.dataReceiver;
  }

  /**
   *
   * @param {*} conf
   */
  validateConf(conf) {
    if (typeof conf === 'undefined') {
      throw new Error('Missing collector configuration');
    }

    this.validateProperties(conf.properties);

    if (typeof conf.notificationHandler === 'undefined') {
      throw new Error('Missing notification handler');
    }
    if (! (conf.notificationHandler instanceof GDCNotificationHandler)) {
      throw new Error('notificationHandler is not instance of GDCNotificationHandler');
    }

    if (typeof conf.dataReceiver === 'undefined') {
      throw new Error('Missing notification handler');
    }
    if (! (conf.dataReceiver instanceof GDCDataReceiver)) {
      throw new Error('dataReciever is not instance of GDCDataReceiver');
    }
  }

  /**
   * Perform data collection for this collector
   *
   * @param {*} targets - Collection targets
   */
  collect(targets) {
    throw new Error('Method CollectorBase::collect is abstract');
  }

  /**
   * Validate the properties set for this collector
   *
   * @param {*} properties - properties
   *
   * @return {boolean} - true if properties are valid
   */
  validateProperties(properties) {
    if (typeof properties === 'undefined') {
      throw new Error('Missing collector properties');
    }

    const valid = this.validate(properties);
    if (valid) {
      return true;
    }

    return false;
  }


  /**
   * @return {*} - properties
   */
  getProperties() {
    return this.properties;
  }

}

module.exports = GDCCollector;
