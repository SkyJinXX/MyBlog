$(document).ready(function() {
    var show = require('./show');
    var backListener = require('./back');
    //给Home加事件
    document.getElementById('home').addEventListener('click',()=>show.showPosts(true));
    //显示目录
   	show.showPosts(false);
    //监听返回事件
    backListener();
    //显示隐藏侧栏
    $(".toggle").click(function() {
        $(".nav").toggle();
    })
    //字符串按钮功能
    $("#b1").click(function() {
        var str = $("#str").val();

        var regex = /^\w+@(\w+)\.com$/;

        if (regex.test(str))
            var substr = regex.exec(str)[1];
        else
            var substr = "Wrong Email";

        $("#subStr").text(substr);
    })
    //获取地址？后面的值
    $("#b2").click(function() {
        // var url = window.location.search;

        // var regex = /k=(\w+)/;
        // var subStr = regex.exec(url)[1];
        $("#subStr").text(new RegExp("k=(\\w+)").exec(window.location.search)[1]);//故意写一行
    })
});

function keyEnter(e) {
    if (e.keyCode == 13)
        $("#b1").click();
}

