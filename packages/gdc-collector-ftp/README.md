# The FTP data collector

A GDC module for collection of files through FTP.
Can collect multiple files by using multiple targets.
Can collect multiple files by using the '*' and '?' wildcards (the wildcards can be used any number of times in any target)

#### Efficiency
The FTP tree scanning algorithm was built to only scan directories which can potentially match at least one of the targets, thus skipping irrelevant directories.

#### Progress reporting
The tree scanning phase (which determines which files to collect) progress is not reported because there is no way to know in advance the size of the tree. Notification are sent per scanned sub directory, so it's possible to understand
that it's progressing.

Usage example:

<pre><code>

const GDCCollectorFtp = require('../gdc-collector-ftp');
const {GDCCallbackDataReceiver} = require('@gdc-js/common');
const {GDCLogNotificationHandler} = require('@gdc-js/common');

const ftpCollector = new GDCCollectorFtp({
      properties: {
        'host': 'demo.wftpserver.com',
        'username': 'demo',
        'password': 'demo',
      },
      dataReceiver: new GDCCallbackDataReceiver((data, meta) => {
        console.log(data);
        console.log(meta);
      }),
      notificationHandler: new GDCLogNotificationHandler(),
    });
ftpCollector.collect(['/download/*.jpg']);
</code></pre>