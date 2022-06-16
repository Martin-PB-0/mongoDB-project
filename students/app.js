require('./model/connect.js');

const http = require('http');
const app = http.createServer();
const path = require('path');

const template = require('art-template');
template.defaults.root = path.join(__dirname, 'views');
template.defaults.extname = '.art';
// 引入时间格式模块方法，并导入到模板中
// 无法使用require()方法导入，原因是dateformat属于ES module不支持require导入,但是可安装dateformat旧版npm install dateformat@3.0.3
const dateFormat = require('dateformat');

template.defaults.imports.dateFormat = dateFormat;

const router = require('./route/index.js')
    // 引入静态资源访问模块
const serveStatic = require('serve-static');
const serve = serveStatic(path.join(__dirname, 'public'));


app.on('request', (req, res) => {
    router(req, res, () => {});
    serve(req, res, () => {});
});
app.listen(3000);