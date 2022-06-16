// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
// 	实现路由功能
// 	呈现用户列表页面
// 	从数据库中查询用户信息 将用户信息展示在列表中
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 	修改用户信息分为两大步骤
// 		1.增加页面路由 呈现页面
// 			1.在点击修改按钮的时候 将用户ID传递到当前页面
// 			2.从数据库中查询当前用户信息 将用户信息展示到页面中
// 		2.实现用户修改功能
// 			1.指定表单的提交地址以及请求方式
// 			2.接受客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
// 当用户访问/delete时，实现用户删除功能


const http = require('http');
const url = require('url');
const querystring = require('querystring');
require('./model/index');
const User = require('./model/user').userdata;
const app = http.createServer();
app.on('request', async(req, res) => {
    const method = req.method;
    const { pathname, query } = url.parse(req.url, true);

    if (method == 'GET') {
        if (pathname == '/list') {
            let users = await User.find();
            let list =
                `<!DOCTYPE html>
                <html lang="cn_Zh">
                
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                
                <body>
                    <div class="container">
                        <h6>
                            <a href="/add" class="btn btn-primary">添加用户</a>
                        </h6>
                        <table class="table table-striped table-bordered">
                            <tr>
                                <td>用户名</td>
                                <td>年龄</td>
                                <td>爱好</td>
                                <td>邮箱</td>
                                <td>操作</td>
                            </tr>`
            users.forEach((item) => {
                list += `<tr>
                <td>${item.username}</td>
                <td>${item.age}</td>
                <td>
                   ${item.hobbies}
                </td>
                <td>${item.email}</td>
                <td>
                    <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                </td>
            </tr>`
            });
            list += ` </table>
                </div>
            </body>
            </html>
            `;
            res.end(list)
        } else if (pathname == '/add') {
            const add = `<!DOCTYPE html>
            <html lang="cn_Zh">
            
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                        <div class="form-group">
                            <label>用户名</label>
                            <input name="username" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input name="password" type="password" class="form-control" placeholder="请输入密码">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="篮球" name="hobbies"> 篮球
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="烫头" name="hobbies"> 烫头
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="吃饭" name="hobbies"> 吃饭
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="睡觉" name="hobbies"> 睡觉
                            </label>
                                <label class="checkbox-inline">
                              <input type="checkbox" value="打豆豆" name="hobbies"> 打豆豆
                            </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            
            </html>`;
            res.end(add);
        } else if (pathname == '/modify') {
            let thisuser = await User.findOne({ _id: query.id });
            let hobbies = ["足球", "篮球", "橄榄球", "敲代码", "抽烟", "喝酒", "烫头", "吃饭", "睡觉", "打豆豆"];
            let modify = `<!DOCTYPE html>
            <html lang="cn_Zh">
            
            <head>
                <meta charset="UTF-8">
                <title>修改用户信息</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            
            <body>
                <div class="container">
                    <h3>修改用户信息</h3>
                    <form method="post" action="/modify?id=${thisuser._id}">
                        <div class="form-group">
                            <label>用户名</label>
                            <input value="${thisuser.username}" name="username" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input value = "${thisuser.password}"name="password" type="password" class="form-control" placeholder="请输入密码">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input value = "${thisuser.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input value = "${thisuser.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>                                
                            `;
            hobbies.forEach(item => {
                let isHobbies = thisuser.hobbies.includes(item);
                if (isHobbies) {
                    modify += `<label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies" checked="checked"> ${item}
                  </label>`
                } else {
                    modify += `<label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies"> ${item}
                  </label>`
                }
            });
            modify += `</div>
            </div>
            <button type="submit" class="btn btn-primary">确认修改</button>
        </form>
    </div>
</body>
</html>`;
            res.end(modify);
        } else if (pathname == '/delete') {
            await User.findOneAndDelete({ _id: query.id });
            res.writeHead(301, {
                Location: '/list'
            });
            res.end();
        }
    } else if (method == 'POST') {
        if (pathname == '/add') {
            let postparams = '';
            req.on('data', params => {
                postparams += params;
            });
            req.on('end', async() => {
                postparams = querystring.parse(postparams);
                await User.create(postparams)
                res.writeHead(301, {
                    location: '/list'
                });
                res.end();
            })

        } else if (pathname == '/modify') {
            let postparams = '';
            req.on('data', params => {
                postparams += params;
            });
            req.on('end', async() => {
                postparams = querystring.parse(postparams);
                await User.updateOne({ _id: query.id }, postparams)
                res.writeHead(301, {
                    location: '/list'
                });
                res.end();
            })
        }
    }
});
app.listen(800);