
#The http(s) data collector

A GDC module for collection of http(s) pages. Can collect multiple pages.

Usage example:

<pre><code>

const {GDCCollectorHttp} = require('@gdc-js/gdc-collector-http');
const {GDCCallbackDataReceiver} = require('@gdc-js/common');
const {GDCLogNotificationHandler} = require('@gdc-js/common');

const httpCollector = new GDCCollectorHttp({
      properties: {},
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        console.log(data);
        console.log(meta);
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
httpCollector.collect(['http://www.iiiiiiii.com/index.html', 'https://www.google.com/index.html']);

</code></pre>