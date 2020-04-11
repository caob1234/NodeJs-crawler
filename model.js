"use strict";
const rp = require("request-promise"), //进入request-promise模块
  fs = require("fs"), //进入fs模块
  cheerio = require("cheerio"), //进入cheerio模块
    path = require("path"),
  depositPath = path.dirname(require.main.filename)+"/images/"; //存放照片的地址
module.exports = {
  async getPage(url) {
    const data = {
      url,
      res:await rp({
        url: url
      })
    };
    return data;
  },
  getUrl(data) {
    const $ = cheerio.load(data.res); //将html转换为可操作的节点
    let list = [],
    str = $.html().toLocaleString(),
    // firstStr = str.slice(str.indexOf('<script>'),str.indexOf('</script>')),
    pins = str.slice(str.indexOf('app.page["pins"] ='),str.indexOf('app.page["search_keyword"]')).trim();
    console.log("start each function---------------");
    list = JSON.parse(pins.slice(18,pins.length-1));

    console.log("end each function---------------");
    return list;
  },
  //下载相册照片
  async downloadImage(pin_id, imgSrc) {
    let headers = {
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
    }).pipe(fs.createWriteStream(depositPath+pin_id+'.png'))
        // .end(console.log(depositPath+pin_id+'.png下载成功'));//下载
    return `${depositPath}+${pin_id}+'.png下载成功'`
  }
};