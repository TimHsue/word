# 汉语拼音与英文单词练习
（英文单词练习还没写完...
目前部署在[这里](<http://word.xtybox.com/>)
### 用法

1. **服务器部署**

   ​	[安装插件](<https://github.com/hotoo/pinyin>)

   ​	`npm intall pinyin`

   ​	安装nodejs（自行解决）

   ​	`node startServer.js`

2. **使用方法**

   ​	进入主页即视为开始答题，每次答题将从服务器题库随机20道选择题，每道题给出一个汉字与四个选项，选项带有拼音标注，鼠标在拼音上悬停可播放读音，鼠标单击可提交答案。

   ​	如果你的答案是正确的，选项将变为绿色，如果你的答案是错误的，你的选项将变为红色，答案选项将变为绿色。

   ​	在提交答案后将播放一次正确读音，并自动切换至下一题，你也可以点击“下一题“跳过等待。

   ​	答满20题将自动跳转到数据统计界面，这个界面展示了你的答题结果，其中绿的部分为正确答题，黄色部分为未答题，红色部分为错误答题，所有在未进行答题的前提下单击“下一题”将被视为未答题。

### Feature

1. 单击右上角选项卡，在下拉菜单中可切换至英文版本。
2. 基于bootstrap，界面美观大方。
3. 使用nodejs搭建服务器，部署简单，响应快。
4. 使用ajax动态更新页面，省去刷新冗杂。
5. 采用《百年孤独》第十二章作为题库，题库中多为常用字，且保证了常用字的出现频率。
6. 悬停发音，帮助记忆拼音读法。
7. 没了，想起来再加，反正觉得自己挺nb的（逃。
