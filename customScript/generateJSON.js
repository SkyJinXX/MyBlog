const fs = require("fs"),
    path = require('path'),
    getPostsInfo = require('./getPostsInfo'),
    writePostsInfo = require('./writePostsInfo');
module.exports = function(dirName) {
    var posts;

    //把该写的信息先写进去
    writePostsInfo(dirName);
    //拿posts对象数组
    posts = getPostsInfo(dirName);
    //将posts对象数组，写入posts.json
    fs.writeFileSync(path.join(dirName, '../posts.json'), JSON.stringify(posts, null, 2), 'utf8');
    console.log('已试图生成json文件,最好自行检查');
    return true;
}