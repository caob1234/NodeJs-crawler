"use strict";
const rp = require("request-promise"), //进入request-promise模块
  fs = require("fs"), //进入fs模块
  cheerio = require("cheerio"), //进入cheerio模块
    path = require("path"),
  depositPath = path.dirname(require.main.filename)+"/images/"; //存放照片的地址
module.exports = {
  async getPage(url) {
    let headers = {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      "Cache-Control": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
      Host: "huaban.com",
      Pragma: "no-cache",
      "Proxy-Connection": "keep-alive",
      Referer: url,
      "Upgrade-Insecure-Requests": 1,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
    };
    const data = {
      url,
      res: await rp({
        url: url
        // resolveWithFullResponse: true,
      })
          // .pipe(fs.createWriteStream(depositPath+"download-and-record-file.md"))
    };
    return data;
  },
  getUrl(data) {
    const $ = cheerio.load(data.res); //将html转换为可操作的节点
    let list = [],
    // console.log($.html().toLocaleString().split('</script>')[1]);
    str = $.html().toLocaleString(),
    // firstStr = str.slice(str.indexOf('<script>'),str.indexOf('</script>')),
    pins = str.slice(str.indexOf('app.page["pins"] ='),str.indexOf('app.page["search_keyword"]')).trim();
    console.log("start each function---------------");
    list = JSON.parse(pins.slice(18,pins.length-1)
      //   if add revier function then return value would is undefined.
        //   ,(any,key,value)=>{
      // console.log("any is:"+any);
      // console.log("key is:"+key);
      // console.log("value is:"+value);
      // if (any === "pin_id"){
      //   Object.assign(obj,{pin_id:key})
      // }
      // if (any === "key"){
      //   Object.assign(obj,{key:key});
      // }
      // list.push(obj);
    // }
    );

    console.log("end each function---------------");
    return list;
  },
  //下载相册照片
  async downloadImage(pin_id, imgSrc) {
    let headers;
    headers = {
      authority: "hbimg.huabanimg.com",
      method: "GET",
      scheme: "https",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": 1,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
    };
    await rp({
      url: imgSrc,
      resolveWithFullResponse: true,
      headers
    }).pipe(fs.createWriteStream(depositPath+pin_id+'.png'));//下载
    console.log(depositPath+pin_id+'.png下载成功');
  }
};