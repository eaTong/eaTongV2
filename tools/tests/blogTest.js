/**
 * created by eaTong at 2019/10/12
 */
const blogService = require("../../server/services/blogService");

(async () => {
  // await
  const data = {
    categoryId: "3",
    content: "## 啊啊↵![ddd](http://eatong.oss-cn-beijing.aliyuncs.com/e4620c93-f3a8-491a-b3e6-e13877d4bced.png)↵ fsdfaasdfasdf ![aaa](http://eatong.oss-cn-beijing.aliyuncs.com/e4620c93-f3a8-491a-b3e6-e13877d4bced.png)↵↵| Head | Head | Head | Head | Head |↵| --- | --- | --- | --- | --- |↵| Data | Data | Data | Data | Data |↵| Data | Data | Data | Data | Data |↵| Data | Data | Data | Data | Data |↵↵- 阿斯蒂芬↵>  asdfa↵dfasd",
    title: "4"
  };
  // console.log(date.get('time'), moment().get('time'));
  await blogService.addBlog(data);

})();

