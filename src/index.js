var show = require('./show');
var backListener = require('./back');
const $ = require('jquery');
//const Vue = require('vue');
import Vue from 'vue';

//试一下Vue
window.vm = new Vue({
el: 'header',
data:{
        title:"undefined",
        seen : false,
        time:""
    }
});
console.log(vm);

//显示目录
show.showPosts(false).title;
//监听返回事件
backListener();
//显示隐藏侧栏
$(".toggle").click(function() {
    $(".sidebar").toggle();
})




