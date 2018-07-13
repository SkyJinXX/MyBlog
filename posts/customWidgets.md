> 一开始用的是彩云天气的桌面小部件，自带显示短时降雨预报。但是一直不太准，直到今天，明明大太阳，它说在下雨，我就换了中国天气网。  
> 
> 它确实比彩云天气要准一些，但是用网页版的始终没法自动定位，我灵机一动，安装了app版的。但是它的小部件没法显示短时降雨预报。我就想着用个自定义widgets的app来调用一下人家的api，然后显示出来就OK了。  
> 

# 流程
### 找api
现有的api都是普通的城市降雨，这种普通app都能做到。花了一些时间去找找不到。和风天气的要好几百RMB。
本来我都打算利用自己服务器去爬那个降水预报的内容，再提取关键内容，搞成一个api，再给自己手机用（知乎上有位同学在好几年前就这样获取美国使馆的空气污染度）。在放弃找api，打算择日开始学习怎么爬东西之前，我最后去探索一下，想知道那个降水预报的网站到底是怎么动态获取降水资讯的。
我在PC网页的流程是进入jsyb网页，进入选择准确地址的地图，确定地址，再显示降水预报。通过Chrome的开发者工具里的network，找到了传输的地址。
仔细一看，居然里面直接包含lat和lon参数，好像就是个api！简直开心死我了。
### 获取并截取预报
参照人家用kwgt的公式，我知道需要用获取网络资源的公式。但是怎么处理获取来的json字符串呢？人家有用长度去截的，我觉得这不太合适。又尝试了自带的正则表达式，且不说它自带公式的作用只是替换字符串，不能提取，而且它还没法识别引号，转义别的都行，就引号没法转义。这里花了很多时间。
搜索着，又发现有个能直接从网络获取内容，并获取json的某个属性值的公式，一试，成了！
### 获取实时且精准的定位
还有问题，就是虽然可以通过小部件的按钮来刷新获取的内容，但是KWGT对手机的定位信息却更新不了。重装之前是要开SSR才能更新，装了免Google验证版的之后，就不准确而且傻愣愣的很久也不变了。
经过了一个晚上的搜索定位相关问题和重装GoolgeService，最后感觉可能是国行手机对GoogleService的定位服务不支持，也可能是SSR无法支持Google定位。
我想要是能给KWGT提供我想给他的经纬度就好了，于是又想到可不可以让tasker和KWGT连接一下，让tasker给KWGT提供经纬度。
Google一下，还真的有。可以通过tasker的plugin给kwgt广播信息。
于是就需要在tasker里获取定位，可以通过%LOCN变量提供，但是需要分开经纬度，于是又去搜了variable split教程，成功给KWGT提供了经度和纬度。
但是经过查询，发现虽然用Tasker定位能及时更新，但是相对于地图还是有偏移。
我一开始认为，app通过GPS获取的经纬度应该不会有区别才对，有区别的顶多是地图不一样。
经过搜索后发现，经纬度应该是没错的，但是中国地图上的坐标都是经过偏移的。所以未处理的坐标，对上偏移后的地图，就感觉定位不准了。
于是现在我们想办法给坐标处理一下。
tasker里好像是可以运行java偏移算法的代码的，但是我不会用又不想看英文，就找到一个阿里云的坐标转换api。1000次以下免费，我打算先用着，以后没了再学tasker的java。
调用api需要改http请求的header的Authorization，我平时没用过，但是底下有各种语言的调用范例。
我直接搜了tasker header关键词，先发现有个app可以使tasker支持，随后又发现有人说可以试试tasker 的run shell功能，可以直接执行curl。
我就想起来api的范例里就有curl的方式。试了一下，一开始失败，但我也不知道为什么我要删掉https的s，反正就是成功调用api了。
但是返回的是包括request，response，网页内容，的字符串，没法直接用KWGT的json公式。
那我就想试试tasker能不能用正则表达式提取子串。
搜索+尝试大半天，也没找到个能用的Group方法。没办法，就把找到的匹配串截取一下拿来用了。（在搜索过程中，看了别人的tasker，感觉我还是不了解tasker的使用方法。）
最终在tasker里用了很繁琐的步骤，成功拿到了偏移后的坐标，传给了KWGT。完成了精准而即时的定位。

# 学到了什么
### 阅读英文适应度
看到英文的帖子没有那么难受了，为了获取想要的信息，只能一句话一句话读下去。
### 中国特色
还真是什么东西都有中国特色，好玩。

# 费时的事
### 搜索并学习方法
### 发现问题所在

----------
坐标偏移解释：http://skx926.com/2017/03/04/gps-correction/（看了之后就顿悟了）