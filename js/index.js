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
    $("#b1").click(function(){
    	var str = $("#str").val();

    	var regex = /^\w+@\w+\.com$/;
    	var StringArray = str.match(regex);	
    	if(StringArray != null)
    		var substr = StringArray[0].replace(/@\w+/, '@sky')
    	else 
    		var substr = "Wrong Email";

    	$("#subStr").text(substr);
    })
});