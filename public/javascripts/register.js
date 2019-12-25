function register(){
    //先取得html資料
    var _name = $('#name').val();
    var _account = $('#account').val();
    var _password = $('#password').val();
    var _confirmpsd = $('#confirmpsd').val();

    if(!_account || !_password || !_confirmpsd){     //檢查一:使否有欄位為空
        $('#errormsg').text('請輸入未填欄位!');
        console.log(_account);
    }
    else if(_password != _confirmpsd){  //檢查二:密碼與確認密碼
        $('#errormsg').text('密碼與確認密碼不符!');
    }
    else{
        $.post('/member/register',{'name':_name, 'account':_account, 
            'password':_password}, function (res) {
                if(res.status == 0){
                    location.href = '/public/login.html';
                    alert('註冊成功');
                }
            }
        );
    }

}