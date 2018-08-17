const getFilesToCheck = require('./getFilesToCheck');
const path = require('path');
var dirName = path.join(__dirname, '../posts');
console.log(getFilesToCheck(dirName));