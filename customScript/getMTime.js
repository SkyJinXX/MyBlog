const
	fs = require('fs'),
	path = require('path');

module.exports = function(filePath){
	var data = fs.readFileSync(filePath, 'utf8')
    var regExp = /\[mTime\]:\s*#\s*\((\d+)\)/;
    var result = regExp.exec(data);
	if (result)
        return result[1];
	return 'unknow';
}