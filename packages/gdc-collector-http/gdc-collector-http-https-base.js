const {GDCCollector} = require('@gdc-js/common');

/**
 * A collector for http web pages
 */
class GDCCollectorHttpHttpsBase extends GDCCollector {
  /**
   * @return {*} - supported properties
   */
  getPropertiesSchema() {
    return {
      'properties': {
        'port': {
          'type': 'number',
          'minimum': 0,
          'maximum': 65535,
          'default': 80,
        },
      },
    };
  }

  /**
   *
   * @param {*} conf
   */
  constructor(conf) {
    super(conf);
    this.service = null;
  }

  /**
   * @param {*} targets - collection targets
   *
   * Perform data collection for this collector
   */
  collectSpecific(targets) {

    this.numTargets = targets.length;

    for (const target of targets) {

      this.collectTarget(target);
    }
  }

  /**
   * Collect a single http page
   * @param {string} target - An http path
   */
  collectTarget(target) {

    const options = this.getOptions(target);

    this.progress++;

    const meta = {
      target: target,
      collectioStart: new Date(),
    };

    this.notificationHandler.receiveNotification('Collecting ' + this.progress + ' of ' + this.numTargets + ' targets');

    const req = this.service.get(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        meta.collectionEnd = new Date();
        this.dataReceiver.receiveData(data, meta);
        this.notificationHandler.receiveProgress(this.progress/this.numTargets);
      });
    });

    req.on('error', function(e) {
      console.log('info1');
      throw new Error('Got error: ' + e.message);
    });
    req.on('information', (info) => {
      console.log('info2');
    });
  }

  /**
   * Get http options
   * @param {string} target
   * @return {*} http options
   */
  getOptions(target) {
    target = this.fixTarget(target);

    const url = new URL(target);
    return {
      host: url.host,
      port: this.properties['port'],
      path: url.pathname,
    };
  }

  /**
   * Fix target
   * @param {string} target
   * @return {string}
   */
  fixTarget(target) {
    return target;
  }
}

module.exports = GDCCollectorHttpHttpsBase;
