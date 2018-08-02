//显示文章
function showPost(Fname) {
    console.log('showpost');
    $.get("posts/" + Fname, function(data) {
        var showdown  = require('showdown'),
        converter = new showdown.Converter(),
        html      = converter.makeHtml(data);
        $('.content').html(html);
    });
}
//显示目录
function showPosts(isClear){
	 $.getJSON("posts/posts.json", function(posts) {
        $.each(posts, function(index, post) {
            var content = 
	        	`<div class = 'post_preview'>
	        	<a href='#' id='${post.Fname}'>
	        	<h2 class = 'post_title'>
	            ${post.title}
	            </h2>
	            <p class = 'post_summary'>
	            ${post.summary}
	            </p>
	            </a>
	            <span class = 'post_date'>
	            ${post.date}
	            </span>
	            </div>
	            <hr />`
                ;
            //为了视觉效果，content元素内不能为空
            if(isClear){
                $(".content").html(content);
                isClear = false;
            }else
                $(".content").append(content);
            //增加点击事件(日后记得改成herf)
            document.getElementById(post.Fname).addEventListener('click',e=>{
                if(e.currentTarget.tagName==='A')
                    showPost(e.currentTarget.id);
            });
        });
    });
}
module.exports = {
    showPost : showPost,
    showPosts : showPosts
}