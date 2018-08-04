var fs = require("fs"),
	dateformat = require('dateformat'),
	path = require('path'),
	getSummary = require('./getSummary');
var posts = [];

fs.readdir(path.join(__dirname, '../posts'), function(err, files) {
    //逐个添加文章信息对象到posts数组
    for (fileName of files) {
        let post = {};
        var stat = fs.statSync(path.join(__dirname, '../posts', fileName));
        post.title = fileName.split('.')[0];
        post.bDate = stat.birthtimeMs;
        post.mDate = stat.mtimeMs;
        //同步读summary
        post.summary = getSummary(fs.readFileSync(path.join(__dirname, '../posts', fileName), 'utf8'));
        posts.push(post);
    }
    //根据创建时间对posts排序
    posts.sort(function(x, y) {
        return y.bDate - x.bDate;
    });
    //把时间戳转为指定格式的字符串
    for (post of posts) {
        post.bDate = dateformat(new Date(post.bDate), "isoDate");
        post.mDate = dateformat(new Date(post.mDate), "isoDate");
    }
    //console.log(posts);
    //将posts对象，写入posts.json
    fs.writeFileSync(path.join(__dirname, '../posts.json'), JSON.stringify( posts, null, 2 ), 'utf8' );
    console.log('已试图生成json文件,最好自行检查');
});