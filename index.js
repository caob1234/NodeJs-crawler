const model = require("./model"),
    imgUrl = "https://hbimg.huabanimg.com/",
  basicPath = "https://huaban.com/explore/shanshui";
let start = 2,
  end = 10;
const main = async url => {
  let list = [];
  const data = await model.getPage(url);
  list = model.getUrl(data);
  downLoadImages(list);//下载
};
const downLoadImages = async (list) => {
  list.forEach(async (pin,index,array)=>{
    model.downloadImage(pin.pin_id,imgUrl+pin.file.key);
  })
};
main(basicPath);
console.log("test2");
//git reset 可以将提交的内容重置。--mixed 是默认操作。 --soft 重置之后不会不会让本地的代码消失。 --hard 重置之后会让本地代码消失。
//git reset --hard HEAD^^ 小角个数代表重置次数。执行reset操作之后，HEAD和远程仓库不一致，需要解决冲突才能push。
console.log("测试冲突");
