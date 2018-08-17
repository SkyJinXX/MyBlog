const path = require('path'),
	fs = require('fs');
module.exports = function(filePath){
	var regEx = /\d{13,13}/;
	var baseName = path.basename(filePath);
	var dirName = path.dirname(filePath);
	var stats;
	if(!regEx.test(baseName)){
		stats = fs.statSync(filePath);
		baseName = `${stats.birthtime.getTime()}_${baseName}`;
		fs.renameSync(filePath, path.join(dirName, baseName));
		filePath = path.join(dirName, baseName);
		return filePath;
	}else {
		return filePath;
	}
}