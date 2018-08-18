const getFilesToCheck = require('./getFilesToCheck');
const path = require('path');
const dateformat = require('dateformat');
var dirName = path.join(__dirname, '../posts');
console.log(dateformat(new Date(parseInt("1533902167000")),'isoDate'));