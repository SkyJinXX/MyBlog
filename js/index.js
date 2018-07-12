$(document).ready(function() {
    //显示目录
    $.getJSON("_posts/posts.json", function(posts) {
    	console.log(posts);
        $.each(posts, function(index, post) {
            var content = 
            	"<div class = 'post_preview'>" +
            	"<a href='#' onclick = 'showPost(\"" + post.Fname + "\")'>" +
            	"<h2 class = 'post_title'>" +
                post.title +
                "</h3>" +
                "<p class = 'post_summary'>" + 
                post.summary + 
                "</p>" + 
                "</a>" + 
                "<span class = 'post_date'>" +
                post.date +
                "</span>" +
                "</div>"
                ;
            $(".real_content").append(content);
        })
    })
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

function showPost(Fname) {

    //显示md文章
    $.get("_posts/" + Fname, function(data) {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);
        $('.real_content').html(html);
    });

}

function keyEnter(e) {
    if (e.keyCode == 13)
        $("#b1").click();
}