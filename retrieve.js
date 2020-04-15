'use strict'
const https = require('https');
const iconv=require('iconv-lite');

const options = {
    // accept: "text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    // "accept-encoding": "gzip, deflate, br",
    // "accept-language": "en",
    // "cache-control": "no-cache",
    // pragma: "no-cache",
    // "sec-fetch-mode": "navigate",
    // "sec-fetch-site": "none",
    // "sec-fetch-user": "?1",
    // "upgrade-insecure-requests": 1,
    // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
};

function request(url,opt) {
    return new Promise((resolve, reject) => {
        // opt.agent = new https.Agent(opt)
        https.get(url, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            let chunks=[],size=0;
            res.on('data', (d) => {
                // resolve(d);
                chunks.push(d);
                size+=d.length;
            });
            res.on("end", ()=>{
                let buf=Buffer.concat(chunks,size);
                let str=iconv.decode(buf,'utf8');
                resolve(str);
            })
        }).on('error', (e) => {
            reject(e)
        });
    })
};
module.exports={
    request,
    async get(url){
        Object.assign(options,{method:'GET'});
        return await request(url,options);
    }
}
