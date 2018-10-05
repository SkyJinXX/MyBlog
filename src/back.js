module.exports = function() {
    //先给当前页面加个state
    this.history.replaceState('hasHash', '', '');
    //监听hashchange事件
    window.addEventListener('hashchange', function() {

        //为当前导航页附加一个tag
        this.history.replaceState('hasHash', '', '');

    }, false);
    //监听重新激活历史记录
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            //侦测是重新打开，还是重新激活
            var show = require('./show');
            show.showPosts(true);
            console.log('重新激活历史');
        }
    });
};