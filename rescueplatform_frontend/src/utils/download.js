import axios from 'axios'

const service = axios.create({
    responseType: 'arraybuffer'
})
//请求拦截器
service.interceptors.request.use(config => {
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    return config;
}, error => {
    console.log(error);
})

//响应拦截器
service.interceptors.response.use(resp => {
        const headers = resp.headers;
        let reg = RegExp(/application\/json/);
        if (headers['content-type'].match(reg)) {
            resp.data = unitToString(resp.data);
        } else {
            let fileDownload = require('js-file-download'); //引进来的filedownload插件
            let fileName = headers['content-disposition'].split(';')[1].split('filename=')[1]; //文件名
            let contentType = headers['content-type']; // 响应类型
            fileName = decodeURIComponent(fileName); //文件名格式进行转换,防止中文乱码
            fileDownload(resp.data, fileName, contentType);
        }
    },
    error => {
        console.log(error);
    })

function unitToString(unitArray) {
    let encodeString = String.fromCharCode.apply(null, new Uint8Array(unitArray));
    let decodeString = decodeURIComponent(escape(encodeString));
    return JSON.parse(decodeString)
}

let base = '';

export const downloadRequest = (url, params) => {
    return service({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}


export default service