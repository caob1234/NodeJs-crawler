# NodeJs-crawler
## 使用说明
-------------
1.下载代码，npm install<br />
2.node index.js即可<br />
3.停止Cltr+c<br />
## 博文
好的，我们从爬虫流程开始分析我们需要的一些模块。<br />
首先，我们需要发送请求获得页面，在这里呢，我们用到了request-promise模块。<br />
<pre><code>
    const rp = require("request-promise"), //进入request-promise模块
      async getPage(URL) {
        const data = {
          url, <br />
          res: await rp(
             url: URL
          }) 
      }; 
      return data //这样，我们返回了一个对象，就是这个页面的url和页面内容。
    }
</code></pre>
郑重提升，爬虫虽好，一定不能触犯法律。

如果本本文触犯您的利益，请留言。

如果觉得本文不错，不要吝啬您的点赞和关注。谢谢。
