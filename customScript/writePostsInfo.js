const
	fs = require('fs'),
	path = require('path'),
    formatName = require('./formatName'),
    getFilesToCheck = require('./getFilesToCheck'),
    checkMTime = require('./checkMTime');

module.exports = function(dirName) {
	var filesToCheck;   
	//格式化所有文章文件名
	for(fileName of fs.readdirSync(dirName)){
	    formatName(path.join(dirName, fileName));
	};
	//再给新文章加修改时间，老文章更新修改时间
	filesToCheck = getFilesToCheck(dirName)
	for(fileName of filesToCheck){
	    checkMTime(path.join(dirName, fileName));
	};  
}