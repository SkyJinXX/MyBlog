const fs = require("fs"),
	dateformat = require('dateformat'),
	path = require('path');
//目前用来把posts.json里的创建时间放入文件名开头
var dirName = path.join(__dirname, '../posts');
var filePath = path.join(__dirname, '../posts.json');
var posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//console.log(posts);
for(post of posts){
	let fileName = post.title + '.md';
	let bTime = (new Date(post.bDate)).getTime();
	//console.log(bTime);
	let newName = `${bTime}_${fileName}`;
	fs.renameSync(path.join(dirName, fileName), path.join(dirName, newName));
		
}
