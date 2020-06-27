const GDCCollectorHttpHttpsBase = require('./gdc-collector-http-https-base');


/**
 * Http collector
 */
class GDCCollectorHttp extends GDCCollectorHttpHttpsBase {

  /**
     * Constructor
     * @param {*} conf
     */
  constructor(conf) {
    super(conf);
    this.service = require('http');
  }

  /**
   * Prepend http
   * @param {string} target
   * @return {string}
   */
  fixTarget(target) {
    // Add http:// prefix if no prefix supplied
    if (!target.match(/^http:\/\/(\S+)/)) {
      target = 'http://'+target;
    }

    return target;
  }
}

module.exports = GDCCollectorHttp;
