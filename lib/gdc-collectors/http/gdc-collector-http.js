const GDCCollector = require('../gdc-collector');
const http = require('http');

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
  }

  /**
   * @param {*} targets - collection targets
   *
   * Perform data collection for this collector
   */
  collect(targets) {

    for (let target of targets) {
      // Add http:// prefix if no prefix supplied
      if (!target.match(/(\S+):\/\/(\S+)/)) {
        target = 'http://'+target;
      }

      const url = new URL(target);
      const options = {
        host: url.host,
        port: this.properties['port'],
        path: url.pathname,
      };

      http.get(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          this.dataReceiver.receiveData(data);
        });

      }).on('error', function(e) {
        console.log('Got error: ' + e.message);
      });
    }

  }
}

module.exports = GDCCollectorHttp;
