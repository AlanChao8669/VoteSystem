//先引入express router
var express = require('express');
var router = express.Router();
//投票功能相關api
var voteModel = require('../models/voteModel.js');
//新增投票功能
router.post('/addVote', function(req, res){
    //將投票選項陣列中的內容抓下來
    var optionAry = [];
    console.log("a"+req.body.optionAry);
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
        postdate: new Date()
    });
    //save into db
    newvote.save(function(err){
        if(err) res.json({"status": 1, "msg": "error"});
        res.json({"status": 0, "msg": "success", "data": newvote});
    });
});
//取得/搜尋投票資料功能
router.get('/getVote', function(req, res){
    //先把傳來的參數取出
    var account = (req.query.account != undefined) ? req.query.account : "";
    var title = (req.query.title != undefined) ? req.query.title : "";
    //去資料庫中查找account/ title
    voteModel.find({
        "account": (account != "") ? account : {$regex:'.*'},
        "title" : {$regex: '.*' + title + '.*'} 
    }, function(err, data){
        if(err) res.json({"status": 1, "msg": "error"})
        // console.log(data);
        res.json(data);
    });

});

module.exports = router;