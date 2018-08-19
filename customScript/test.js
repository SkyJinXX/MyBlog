const getFilesToCheck = require('./getFilesToCheck');
const path = require('path');
const dateformat = require('dateformat');
var chokidar = require('chokidar');

var dirName = path.join(__dirname, '../posts');

var watcher = chokidar.watch(dirName, {ignored: /(^|[\/\\])\../});
watcher
.on('ready', function(){
	//console.log('Initial scan complete. Ready for changes');
	this
	.on('all',(event, path)=>{
		console.log(event, path);
	});
});


//console.log(watcher);