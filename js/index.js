$(document).ready(function() {
	//显示md文章
	$.get("article_demo.md", function(data){
	    var converter = new showdown.Converter();
    	var html = converter.makeHtml(data);
  		$('.real_article').html(html);	
	});
   

    $(".toggle").click(function() {
        $(".nav").toggle();
    })
});