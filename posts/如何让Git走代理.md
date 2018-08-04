<!---
在走代理之前，我git push都是听天由命的，输完命令之后都是没反应的，先去做点别的事，中间偶尔回来看看，说不定它就上传成功了。 直到今天，它真的没法成功了...
--->
# 代理工具
ShadowsocksR  
# 协议
## http或https协议  
输入以下命令即可，后面的1080是本地端口
```
git config --global http.proxy 'socks5://127.0.0.1:1080' 
git config --global https.proxy 'socks5://127.0.0.1:1080'
```
这个很简单，很多教程都有。比如[这个](https://blog.fazero.me/2015/07/11/%E7%94%A8shadowsocks%E5%8A%A0%E9%80%9Fgit-clone/)
## SSH
内容来自[CSDN的armink_ztl](https://blog.csdn.net/arminkztl/article/details/79407723)  
> 把`ProxyCommand connect -S 127.0.0.1:1080 %h %p`配置添加到~/.ssh/config 中即可  
（~ 在
Windows 中为 C:/User/当前用户 的文件夹），如果没有这个文件，请先新建。  

