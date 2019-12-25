//先判斷是否已登入
if(!$.cookie('userID') || !$.cookie("userID")==null){
    alert("請先登入會員!");
    location.href = '/public/login.html';
}
//新增投票選項
var optionAry = []; //選項陣列，存放要給後端的資料

function pushOption(){
    if ($('#option').val() != ''){  //確定不為空
        optionAry.push($('#option').val());
        //創建列表項目
        var optionLabel = `<li style="margin:10px">
                            ${$('#option').val()}
                            <input type="button" class="del" value="刪除"/>
                            </li>`;
        $('#option-group').append(optionLabel);
        //清空輸入框
        $('#option').val('');
    }
}

//送出投票
function addVote(){
    //檢查
    if($('#title').val() == null || $('#title').val() == ""){
        alert("請輸入標題");
        return;
    }
    if(optionAry.length < 2){
        alert("請至少加入兩個投票選項");
        return;
    }
    console.log("ary:"+optionAry);
    //建資料
    var postdata = {
        title: $('#title').val(),
        optionAry: optionAry,
        account: $.cookie('userID'),
        name: $.cookie('userName')
    }
    console.log(postdata);
    //post資料
    $.post("/vote/addVote", postdata, function(res){
        console.log("b"+res);
        if(res.status == 0){
            alert("建立成功");
            location.href = '/public/vote.html';
        }else{
            console.log(err);
        }
    });

}

//刪除投票選項
$(document).on('click','.del', function(){
    var opt = $(this).parent();
    //console.log(opt);
    optionAry.splice(opt.index, 1); //從選項陣列刪除
    $(this).parent().remove(); //從網頁刪除
});