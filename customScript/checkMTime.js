const
	fs = require('fs'),
	path = require('path');

//给文章更新或者新增修改时间
module.exports = function(filePath){
	var data = fs.readFileSync(filePath, 'utf8');
    var regExp = /\[mTime\]:\s*#\s*\(\d+\)/;
    var mTime = fs.statSync(filePath).mtime.getTime();
    if(regExp.test(data))
    	data = data.replace(regExp, `[mTime]:#(${mTime})`);//感觉搜索两次很浪费，但又找不到别的方法
    else{
    	data = `[mTime]:#(${mTime})\n${data}`;
    }
    fs.writeFileSync(filePath, data, 'utf8');
}