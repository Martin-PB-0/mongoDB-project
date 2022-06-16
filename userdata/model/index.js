const mongoose = require('mongoose');
// 27017是mongodb默认端口
mongoose.connect('mongodb://localhost:27017/usersdata').then(() => console.log('数据库连接成功')).catch((err) => console.log(err));