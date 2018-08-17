const
    fs = require('fs'),
    path = require('path'),
    getPostInfo = require('./getPostInfo');

module.exports = function(dirName){
    var posts = [];
    var files = fs.readdirSync(dirName);
    //逐个添加文章信息对象到posts数组
    for (fileName of files) {
        //filePath = formatName(path.join(__dirname, '../posts', fileName));
        let filePath = path.join(dirName, fileName)
        let post = getPostInfo(filePath);
        posts.push(post);
    }
    //根据创建时间对posts排序
    posts.sort(function(x, y) {
        return parseInt(y.bTime) - parseInt(x.bTime);
    });
    //console.log(posts);
    return posts;
}
