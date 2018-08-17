const 
	fs = require('fs'),
	path = require('path'),
	execSync = require('child_process').execSync;
module.exports = function(dirName){
	var filesToCheck = [];
	var rawArr;
	var gitCmd_untracked = 'git ls-files --exclude-standard -o';
	var gitCmd_modified = 'git ls-files --exclude-standard -m';//会有被删除的文件，所以不要它
	var gitCmd_eol = 'git ls-files --exclude-standard --eol -m';
	let regExp = /w\/(crlf|lf|-text|none)/;// /w后面不是空的，就代表文件能接触

	//把untracked的md文件加入数组
	filesToCheck = filesToCheck.concat(execSync(gitCmd_untracked,{
		encoding:'utf8',
		cwd:dirName
	}).split(/\r?\n/));
	//去掉最后的空行
	if(filesToCheck[filesToCheck.length-1]==='')
		filesToCheck.pop();

	// //把modified的md文件加入数组
	// filesToCheck = filesToCheck.concat(execSync(gitCmd_modified,{
	// 	encoding:'utf8',
	// 	cwd:dirName
	// }).split(/\r?\n/));
	// //去掉最后的空行
	// if(filesToCheck[filesToCheck.length-1]==='')
	// 	filesToCheck.pop();

	//把modified的md文件加入数组
	rawArr = execSync(gitCmd_eol,{
		encoding:'utf8',
		cwd:dirName
	}).split(/\r?\n/);
	//console.log(rawArr);
	for(index in rawArr){
		if(regExp.test(rawArr[index]))
			filesToCheck.push(rawArr[index].split(/\s+/)[3]);
	}


	return filesToCheck;
}