const model = require("./model"),
    imgUrl = "https://hbimg.huabanimg.com/",
    basicPath = "https://huaban.com/explore/shanshui?limit=20";
let main = async url => {
    let data = await model.getPage(url);
    // list = model.getUrl(data);
    let pins = JSON.parse(data).pins;
    await downLoadImages(pins);//下载
    return pins.pop().pin_id;
};
let downLoadImages = list => {
    list.forEach((pin, index, array) => {
        model.downloadImage(pin.pin_id, imgUrl + pin.file.key).then(r => {
            console.log(r);
        });
    })
};
let recursiveVar = 10;

function recursiveMain(url) {
    if (--recursiveVar < 0) {
        console.log('ended+++++++++++++++++++++++++');
    } else {
        main(url).then(r => {
            console.log('----------------ending----------------------' + r);
            recursiveMain(`${basicPath}&max=${r}`)
            console.log(`${basicPath}&max=${r}`)
        });
    }
};
recursiveMain(basicPath);
console.log("test2");
//git reset 可以将提交的内容重置。--mixed 是默认操作。 --soft 重置之后不会不会让本地的代码消失。 --hard 重置之后会让本地代码消失。
//git reset --hard HEAD^^ 小角个数代表重置次数。执行reset操作之后，HEAD和远程仓库不一致，需要解决冲突才能push。
console.log("测试冲突");
