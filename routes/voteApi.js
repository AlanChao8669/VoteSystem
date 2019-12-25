//先引入express router
var express = require('express');
var router = express.Router();
//投票功能相關api
var voteModel = require('../models/voteModel.js');
//投票功能
router.post('/addvote', function(req, res){
    //將投票選項陣列中的內容抓下來
    var optionAry = [];
    for(var i=0; i < req.body.optionAry.length; i++){
        var option = {name: req.body.optionAry[i], account: []};
        optionAry.push(option);
    }
    //建立資料庫一筆資料，並儲存
    var newvote = new voteModel({
        account: req.body.account,
        name: req.body.name,
        title: req.body.title,
        option: optionAry,
        postdate: new Date();
    });
});

module.exports = router;