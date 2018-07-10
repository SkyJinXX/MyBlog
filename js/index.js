$(document).ready(function() {
	//显示md文章
	$.get("article_demo.md", function(data){
	    var converter = new showdown.Converter();
    	var html = converter.makeHtml(data);
  		$('.real_article').html(html);	
	});
   
	//显示隐藏侧栏
    $(".toggle").click(function() {
        $(".nav").toggle();
    })
    //字符串按钮功能
    $("#b1").click(function(){
    	var str = $("#str").val();

    	var regex = /^\w+@(\w+)\.com$/;

    	if(regex.test(str))
    		var substr = regex.exec(str)[1];
    	else 
    		var substr = "Wrong Email";

    	$("#subStr").text(substr);
    })
    //获取地址？后面的值
    $("#b2").click(function(){
    	// var url = window.location.search;

    	// var regex = /k=(\w+)/;
    	// var subStr = regex.exec(url)[1];
    	$.get("http://d3.weather.com.cn/webgis_rain_new/webgis/minute?lat=30.195567&lon=120.190509&stationid=101210101&callback=_jsonpz1tdk5ia9fs",function(data){
    		alert(data);
    	});
    	$("#subStr").text(new RegExp("k=(\\w+)").exec(window.location.search)[1]);
    })
});
function keyEnter(e){
	if(e.keyCode==13)
		$("#b1").click();
}