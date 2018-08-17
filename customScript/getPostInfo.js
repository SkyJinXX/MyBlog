const 
getSummary = require('./getSummary'),
getMTime = require('./getMTime'),
path = require('path'),
fs = require('fs');
module.exports = function(filePath){
	var post = {};
	var regEx = /^(\d{13,13})_(.+)/;
	var result = regEx.exec(path.basename(filePath, '.md'));

    post.title = result[2];
    post.bTime = result[1];
    post.mTime = getMTime(filePath);
    post.fileName = path.basename(filePath);
    post.summary = getSummary(filePath);
	
	return post;
}