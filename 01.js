const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/betadb').then(() => console.log('数据库启动成功！')).catch(err => console.log(err));
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', userSchema);
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Article = mongoose.model('Article', articleSchema);
// User.create({ name: 'martin' }, result => console.log(result));
// Article.create({ title: 'database', author: '61740feddefacffec8cdef54' }, result => console.log(result));
User.findOne({ __id: '61740feddefacffec8cdef54' }).then(result => console.log(result));
// Article.find().populate('author').then(result => console.log(result));