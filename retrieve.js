'use strict'
const https = require('https');
const iconv = require('iconv-lite');

const headers = {
    "X-Requested-With": "XMLHttpRequest",
};
const options={
    headers:headers
}

function request(url, opt) {
    return new Promise((resolve, reject) => {
        https.get(url, opt,(res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            let chunks = [], size = 0;
            res.on('data', (d) => {
                chunks.push(d);
                size += d.length;
            });
            res.on("end", () => {
                let buf = Buffer.concat(chunks, size);
                let str = iconv.decode(buf, 'utf8');
                resolve(str);
            })
        }).on('error', (e) => {
            reject(e)
        });
    })
};
module.exports = {
    request,
    async get(url) {
        // Object.assign(options,{method:'GET'});
        return await request(url, options);
    }
}
