module.exports = function(data) {
    //多系统下的换行符应该都行的正则表达式
    var regExp = /^<!---(\r\n|\n)([^]*?)(\r\n|\n)--->/;
    var result = regExp.exec(data);
    if (result)
        return result[2];
    return '';
};