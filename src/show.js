const $ = require('jquery');
//显示文章
function showPost(title, bDate, mDate) {
    //修改标题
    //document.querySelector('header > h1').innerText = title;
    vm.title = title;
    //加上创建、修改时间
    //document.querySelector('header > span').innerText = 'Posted on '+bDate +' | Post modified: '+mDate;
    vm.seen = true;
    vm.time = 'Posted on '+bDate +' | Post modified: '+mDate;
    //显示文章内容
    $.get("posts/" + title +".md", function(data) {
        var showdown  = require('showdown'),
        converter = new showdown.Converter(),
        html      = converter.makeHtml(data);
        $('.content').html(html);
    });
    console.log('显示文章');
}
//显示目录
function showPosts(isClear){
    //修改标题
    //document.querySelector('header > h1').innerText = "Sky's Home";
    vm.title = "Sky's Home";
    //修改文章时间
    //document.querySelector('header > span').innerText = '';
    vm.time = '';
    vm.seen = false;//消灭第二行的span，保持Home垂直居中
	 $.getJSON("posts.json", function(posts) {
        $.each(posts, function(index, post) {
            var content = 
	        	`<div class = 'post_preview'>
	        	<a href='#' id='pp${index}' mdate='${post.mDate}'>
	        	<h2 class = 'post_title'>
	            ${post.title}
	            </h2>
	            <p class = 'post_summary'>
	            ${post.summary}
	            </p>
	            </a>
	            <span class = 'post_date'>
	            ${post.bDate}
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
            document.getElementById(`pp${index}`).addEventListener('click',e=>{
                if(e.currentTarget.tagName==='A')
                    showPost(e.currentTarget.querySelector('h2').innerText,
                        e.currentTarget.parentNode.querySelector('.post_date').innerText,
                        e.currentTarget.getAttribute('mdate'));
            });
        });
    });
    console.log('显示目录');
    return {
        title:"Sky's Home"
    };
}
module.exports = {
    showPost : showPost,
    showPosts : showPosts
}