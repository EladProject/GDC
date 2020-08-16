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

    this.validateConf(conf);

    this.properties = conf.properties;
    this.notificationHandler = conf.notificationHandler;
    this.dataReceiver = conf.dataReceiver;

    this.progress = 0;
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
    this.progress = 0;
    this.collectSpecific(targets);
  }

  /**
   * The specific collection implementation of the derived class (the specific collector).
   * This is the function that the derived classes need to implement to perform the collection
   *
   * @param {*} targets - Collection targets
   */
  collectSpecific(targets) {
    throw new Error('Method CollectorBase::collectSpecific is abstract');
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

    const ajv = new Ajv({allErrors: true, useDefaults: true});
    const validate = ajv.compile(this.getPropertiesSchema());

    const valid = validate(properties);
    if (valid) {
      return true;
    }

    throw Error('Bad properties:' + ajv.errorsText(validate.errors));
  }


  /**
   * @return {*} - properties
   */
  getProperties() {
    return this.properties;
  }

}

module.exports = GDCCollector;
