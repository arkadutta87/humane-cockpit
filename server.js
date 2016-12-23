#!/usr/bin/env node
const path = require('path');

console.log(process.env.PATH);
console.log(__dirname);

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config');
console.log(process.env.NODE_CONFIG_DIR);

process.env.MODULE_ROOT = path.resolve(__dirname);
console.log(process.env.MODULE_ROOT);

require('./lib/ServerInvoker.js');