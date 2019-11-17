/**
 * created by eaTong at 2019/10/12
 */
const blogService = require("../../server/services/blogService");
const {getCoverImage} = require("../../server/framework/utils");

// (async () => {
//   // await
//   const data = {
//     categoryId: "3",
//     content: "## 啊啊↵![ddd](http://eatong.oss-cn-beijing.aliyuncs.com/e4620c93-f3a8-491a-b3e6-e13877d4bced.png)↵ fsdfaasdfasdf ![aaa](http://eatong.oss-cn-beijing.aliyuncs.com/e4620c93-f3a8-491a-b3e6-e13877d4bced.png)↵↵| Head | Head | Head | Head | Head |↵| --- | --- | --- | --- | --- |↵| Data | Data | Data | Data | Data |↵| Data | Data | Data | Data | Data |↵| Data | Data | Data | Data | Data |↵↵- 阿斯蒂芬↵>  asdfa↵dfasd",
//     title: "4"
//   };
//   // console.log(date.get('time'), moment().get('time'));
//   await blogService.addBlog(data);
//
// })();
//
const blog = `最近公司项目中有一个需要更换web端主题的需求，基本实现效果如下：
![如何利用webpack实现一键换肤](http://eatong.oss-cn-beijing.aliyuncs.com/f29b0bd6-3c90-477d-8d77-518c142cf4e9.gif)
接收到这个需求的时候有三种思路：
-  打包的时候同时冗余打包多套CSS文件，并在切换主题的时候加载相应的样式文件。
- 在根组件上加上主题类名，并在切换主题的时候改变类名，然后通过CSS类来覆盖已有样式。
- 利用[ antd-theme-webpack-plugin](https://github.com/mzohaibqc/antd-theme-webpack-plugin)将less文件加载，并在线解析less文件后覆盖已有CSS
- 线上解析所有样式代码，并根据新的颜色重新生成样式，并加入HTML中
下面逐个方案分析：
###  方案一：打包的时候同时冗余打包多套CSS文件
劣势相当明显，第一是打包速度严重拖慢，第二是切换主题的时候还需要重新从服务器上获取CSS文件，意味着切换个主题需要等上好几秒之后才能见效。优势的话，估计就是实现起来稍微简单一点了。但这个很明显不是我想要的结果。
### 方案二：在根组件上加上主题类名
优势在于切换成本比较低，但是劣势也比较明显：第一是打包体积严重增加（多加一套主题样式文件几乎增加一倍），第二是后续代码维护困难，需要把所有需要更换主题的样式文件全部写进所有主题类里面，工作量太大，而且是个无底洞。
### 方案三：利用[ antd-theme-webpack-plugin](https://github.com/mzohaibqc/antd-theme-webpack-plugin)
这套方案的可以根据antd里面的所有less文件中的变量进行替换，正好我们的项目又是基于\`React\`和\`antd\`，简直完美融合。于是欣然试用，最终试用结果是：我水土不服了。做个简单的demo的时候运行很好，没问题，但是移植到已有项目的时候就出现各种不适应，首先是版本问题，这个好解决。然后又出现其他报错，一个一个解决完了之后发现实际运行起来之后还是水土不服。

另外这种模式还有另外的劣势，必须额外加载less文件，并且在线上解析所有less文件，然后应用到DOM中，对于我们这个光是样式文件打包（还是minify之后的）起来都有1M左右的项目来说简直是灾难。
### 方案四：线上解析所有样式代码
这种方案其实是比较讨巧的做法，将所有的\`link\`和\`style\`标签的样式取出来，然后替换相应的变量，再注入到DOM节点中，完成样式替换。不需要太多额外的文件引入，是一个比较好的实现思路，唯一的问题就在于前面提到的1M多的样式文件，考虑到本身项目已经比较庞大，在加上这么大的额外开销还是忍痛拒绝了。

于是主题到了：并非所有的样式代码都需要解析的，因为毕竟换肤一般来说只会更换一两个颜色，而不会更换所有的样式文件，那么何不在发布线上之前就将CSS解析好，线上的时候只需要解析这些已经处理好的样式文件即可，实际操作下来之后1M左右的样式文件只需要处理几KB的数据。在实际线上运行之后发现也确实比较流畅，也就是文章开头的GIF的效果了。

这个方案灵感来源于 [webpack-theme-color-replacer](https://github.com/hzsrc/webpack-theme-color-replacer)，该项目通过webpack插件形式将样式文件解析后将更换主题的代码注入到每个js头部，实现思路很漂亮，只是看了代码之后有几个问题：
- 样式加载到每个js头部，冗余！
- 颜色匹配必须对应array中的顺序，而且不直观
- 需要额外再代码中引入样式替换的js

综合起来觉得使用起来比较繁琐，于是自己动手撸了一个webpack插件：[webpack-stylesheet-variable-replacer-plugin](https://github.com/eaTong/webpack-stylesheet-variable-replacer-plugin)，只需要在webpack配置中增加一个plugin，其他的就OK了，支持\`key--value\`方式来定义需要替换的变量，还有就是注入文件可控，不会重复注入。下面介绍一下使用方法，简单三步走：
- 引入插件
\`\`\`js
const WebpackVariableReplacer = require('webpack-stylesheet-variable-replacer-plugin');
\`\`\`
- 定义插件配置信息
\`\`\`js
new WebpackVariableReplacer({
     publicPath: '',
     buildPath: 'static/',
     nextSupport: true,
     specifyEntry: /_app\\.js/,
     matchVariables: {
           main: '#209CEE',
         }
     }),
\`\`\`

- 客户端调用替换主题的方法：
\`\`\`js
 window.replaceStyleVariable && window.replaceStyleVariable({main: color});
\`\`\`
运行效果还是看文章开头的GIF，总结来说，效率高，代码侵入性低，方便使用。理论上来说，在angular和vue中使用也没有任何问题。不过本人主要技术栈还是react，其他没有测试。
下面解释一下使用参数：


| 参数| 默认值| 详细说明|
| --- | --- | --- |
| fileName| webpack-variable-replacer-[hash].js|  |
|publicPath|''|资源访问路径|
|htmlFileName|''|需要注入的HTML文件名|
|buildPath|‘’|文件打包后存放的位置前缀|
|nextSupport|false|是否需要支持next.js，如果后端服务用next.js搭建，此参数需传true|
|injectToEntry|false|是否需要将生成后的代码注入到打包的js中，如果穿了htmlFileName，此参数可传false，否则必须为true|
|excludeEntry|null|需要排除的entry文件名，支持传入正则或者正则字符串|
|specifyEntry|null|需要指定的entry文件名，支持传入正则或者正则字符串，不传默认所有|
|matchVariables|{}|需要匹配的字符串，通过\`key-value\`模式传入，例如：\`{main:'#123456'}\`|
`;

getCoverImage(blog)
