/*建立會員功能相端的資料庫模型，並與mongodb連線 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ex6',{useNewUrlParser: true});

var memberSchema = new mongoose.Schema({
    name: String,
    account: String,
    password: String
});
memberSchema.set('collection','member');

var model = mongoose.model('member', memberSchema);

module.exports = model;



