const Path = require('path');

const NODE_MODULES_PATH = Path.join(__dirname, 'node_modules');
const config = require('webpack-builder-boilerplate/lib/WebpackBuilder')
  .default(__dirname, './browser/CockpitBrowser.js',
    [
        //Path.join(NODE_MODULES_PATH, 'humane-cockpit'),
        Path.join(NODE_MODULES_PATH, 'reactjs-web-boilerplate')
    ]);

module.exports = config;