<!---
把添加上的功能和文章都push到github上之后就上床准备睡觉了，用手机看了看文章目录，发现顺序全乱了，全都是8月4号。
去电脑上一看发现md文件的创建时间全都变成8月4号了，心中一凉...
--->
# 错误
md文件的时间信息全都丢失了，显示顺序全乱了  
# 原因

* Git不保存文件的时间信息
* `git checkout branch`会修改文件  

又修改，又不保存，时间信息就丢失了。  
至于为什么Git不保存，wiki有[解释](https://git.wiki.kernel.org/index.php/Git_FAQ#Why_isn.27t_Git_preserving_modification_time_on_files.3F)  
截了一段：  
> Modification time on files is a feature that affects build tools. Most build tools compare the timestamp of the source(s) with the timestamp of the derived file(s). If the source is newer, then a rebuild takes place, otherwise nothing happens. This speeds up the build process a lot.

> Now consider what would happen if you check out another branch, and modification times were preserved. We assume you already have a fully-built project. If a source file on that other branch has a timestamp that is older than that of the corresponding derived file, the derived file will not be built even if it is different, because the build system only compares modification times.  

大概意思就是恢复文件的时候如果顺便把时间也带上，那么本来期望build tools可以根据source文件和derived文件的修改时间先后来判断是否build，最后就不会build，因为恢复过来的文件时间肯定比derived文件久远。  
为了能build，就不保存了。  
于是我就跳坑里了...  
# 恢复方法  
## git log
[这里](https://www.commandlinefu.com/commands/view/14335/reset-the-last-modified-time-for-each-file-in-a-git-repo-to-its-last-commit-time)有一条命令，windows里执行不了，但可以试着了解一下它每部分都在做什么。  
```
for file in $( git ls-files ); do echo $file; touch -t $(git --no-pager log --date=local -1 --format="%ct" $file | php -r 'echo @date( "YmdHi.s", trim( file_get_contents( "php://stdin" ) ) );') $file; done
```  
大致的意思就是拿到所有被追踪的文件的文件名，然后挨个把这些文件的`修改时间`给修改为该文件的committer date(就差不多是真正的修改时间吧)。  
命令中的`%ct`代表`committer date`,根据下方RUO DOJO大佬提供的`git log`[文档](https://git-scm.com/docs/git-log)找到了一个`author date`，试了试，发现没什么用。  
## posts.json
我忽然想到，我的posts.json是有记录时间的，我可以用git找找历史提交中的posts.json。  
哈哈哈哈哈哈哈哈哈，我真聪明。
# 找回时间
用`git reset`来把posts.json文件恢复到时间信息没乱的commit就可以了，再先手动把新的信息加进去
# 更换方案

# 感谢
RUO DOJO大佬的[从 Git 提交历史中「恢复」文件修改时间](https://blog.jamespan.me/2016/04/24/restore-files-modification-time-in-git)  
搜中文搜到的唯一相关的文章