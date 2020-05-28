const rollup = require('rollup');
const watchOptions = require('../rollup.config');

const watcher = rollup.watch(watchOptions);

watcher.on('event', (event) => {
  switch (event.code) {
    case 'START':
      console.info('building...');
      break;
    case 'END':
      console.info('build finished');
      break;
    case 'ERROR':
      // break;
    case 'FATAL':
      // watcher.close();
      console.error(event.error);
      break;
  }
});
