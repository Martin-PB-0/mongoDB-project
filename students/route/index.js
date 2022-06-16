// 引入路由方法，再获取路由对象
const getRouter = require('router');
const router = getRouter();
const querystring = require('querystring');
const Student = require('../model/user.js');

const template = require('art-template');

router.get('/add', (req, res) => {
    let html = template('index', {});
    res.end(html);
});
router.get('/list', async(req, res) => {
    let students = await Student.find();
    // console.log(students);
    let html = template('list', {
        students: students
    });
    // find()方法查找结果为数组
    res.end(html);
});
router.post('/add', (req, res) => {
    let postParams = '';
    req.on('data', params => {
        postParams += params;
    });
    req.on('end', async() => {
        // postParams = new URLSearchParams(postParams);
        // // console.log(postParams);
        // await Student.create(postParams).then(() => console.log('数据添加成功'));

        postParams = querystring.parse(postParams);
        // console.log(postParams);
        await Student.create(postParams).then(() => console.log('数据添加成功'));
        res.writeHead(301, { location: '/list' });
        res.end();
    })
});
module.exports = router;