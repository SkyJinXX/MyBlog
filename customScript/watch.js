const path = require('path');
const generateJSON = require('./generateJSON.js');
const webpack = require('webpack');
const config = require('../webpack.config.js');
var chokidar = require('chokidar');

var dirName = path.join(__dirname, '../posts');
var dirName_posix = path.posix.join(__dirname, '../posts');//为了能用glob patterns，要废弃Back-slashes
var mdFiles_posix = path.posix.join(dirName_posix, '*.md');//为了能用glob patterns，要废弃Back-slashes
var srcJsFiles_posix = path.posix.join(__dirname, '../src/*.js');
console.log(mdFiles_posix);
function addListener(){
	var watcher = chokidar.watch([mdFiles_posix,srcJsFiles_posix], {ignored: /(^|[\/\\])\../})
	.on('ready', function(){
		console.log('Initial scan complete. Ready for changes');
		//console.log(this.getWatched());
		this
		.on('all',function(event, path){
			console.log(event, path);
			this.close();
			generateJSON(dirName);
			webpack(config, (err, stats)=>{
				if (err || stats.hasErrors()) {
    				// 构建过程出错
    				console.log('webpack出错了');
  				}
  				console.log('webpack打包完成');
			});
			addListener();
		});
	});
	//console.log(watcher);
}
addListener();