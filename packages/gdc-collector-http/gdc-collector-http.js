const {GDCCollector} = require('@gdc-js/common');
const axios = require('axios');

/**
 * A collector for http web pages
 */
class GDCCollectorHttp extends GDCCollector {
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

    const meta = {
      target: target,
      collectioStart: new Date(),
    };

    this.notificationHandler.notification('Collecting ' + this.progress + ' of ' + this.numTargets + ' targets');

    axios.get(target)
        .then((response) => {
          this.progress++;
          meta.collectionEnd = new Date();
          this.dataReceiver.receiveData(response.data, meta);
          this.notificationHandler.progress(this.progress/this.numTargets);
        })
        .catch((error) => {
          this.notificationHandler.error({'target': target, 'error': error});
        });
  }
}

module.exports = GDCCollectorHttp;
