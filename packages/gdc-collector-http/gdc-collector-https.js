const GDCCollectorHttpHttpsBase = require('./gdc-collector-http-https-base');

/**
 * Https collector
 */
class GDCCollectorHttps extends GDCCollectorHttpHttpsBase {

  /**
     * Https collector constcutor
     * @param {*} conf
     */
  constructor(conf) {
    super(conf);
    this.service = require('https');
  }

  /**
   * Prepend https
   * @param {string} target
   * @return {string}
   */
  fixTarget(target) {
    // Add http:// prefix if no prefix supplied
    if (!target.match(/^https:\/\/(\S+)/)) {
      target = 'https://'+target;
    }

    return target;
  }
}

module.exports = GDCCollectorHttps;
