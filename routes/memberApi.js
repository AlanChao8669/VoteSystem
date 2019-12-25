/*撰寫會員功能相關的路由程式*/
var express = require('express');
var router = express.Router();
var memberModel = require('../models/memberModel.js');

//註冊功能
router.post('/register', function(req, res){
    //先檢查是否已被註冊
    memberModel.count({account: req.body.account}, function(err, data){
        if(data > 0){ //已有人註冊
            res.json({"status": 1, "msg": "帳號已被註冊!"});
        }
        else{ //未被註冊
            var newMember = memberModel({
                name: req.body.name,
                account: req.body.account,
                password: req.body.password
            });
            newMember.save(function(err, data){
                if(err) res.json({"status": 1, "msg": "error"});
                res.json({"status": 0, "msg": "success", "data": data});
            });
        }
    });

});

//登入功能
router.post('/login',function(req,res){
    memberModel.findOne({
        account: req.body.account,
        password: req.body.password        
    }, function(err, data){
        if(data === null){
            res.json({"status": 1, "msg": "帳號密碼錯誤"});
        }
        else{
            if(err) res.json({"status": 1, "msg": "error"});
            res.json({"status": 0, "msg": "success", "data": data});
        }
    });
});

//修改密碼功能
router.post('/changePass', function(req,res){
    memberModel.findOne({account: req.body.account,
    password: req.body.oldPass}, function(err, data){
        if(data == null){
            res.json({"status":1, "msg":"舊密碼輸入錯誤!"}); 
        }
        else{
            data.password = req.body.newPass;
            data.save(function(err){
                if(err) res.json({"status":1, "msg":"error"});
                res.json({"status":0, "msg":"success"});
            });
        }
    });
});

module.exports = router;