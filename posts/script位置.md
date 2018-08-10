<!---
8.10
--->
# 问题
用defer放在head里，显示内容的速度比不用defer放在body内部的最后要慢100ms左右，眼睛看到就感觉慢了很多。
用require导入jquery，最后只用加载一个bundle.js的速度，比用script导入jquery，最后加载两个script要慢。  
# 初步猜测
大概是因为defer是html解析完之后才执行，放body最后面是body搞完之后就执行了  
大概是因为两个script可以分开加载吧，所以速度就比单独加载一个要快了。  
# 疑问
那岂不是不要用require更快，不要用defer更快？  

---
去掉jquery的 document.ready，好像又快了一点点  

---
又看到有个externals就是用来解决引入jquery这种大库问题的。  
externals就是告诉webpack的require，碰见我这里面说明过的模块，你就不要打包了，随它去吧。  
# 问题
那我看vuejs也挺大的，是不是vue也不要打包进去呢？那还有什么要打包进去呢？