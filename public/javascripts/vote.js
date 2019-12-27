
getVote();  //初始化，執行一次

//將新增的投票資料顯示到網頁上(供getVote呼叫)
function newVote(data) {
    var content = document.createElement('tr');
    content.className = "row100 body";

    //取得投票建立時間
    var date = new Date(data.postdate);
    var date_element = (date.getMonth() + 1) + '/' + date.getDate() + '    '
        + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
        + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    //建立投票元素
    var vote_element = `<td class="cell100 column1"></td>
                        <td class="cell100 column2">
                            <a href="/public/voteDetail.html?_id=${data._id}">${data.title}</a>
                        </td>
                        <td class="cell100 column5">
                            <a href="/public/vote.html?account=${data.account}">${data.account}</a>
                        </td>
                        <td class="cell100 column6">${date_element}</td>`;
    //將投票元素插入<tr>最尾端
    content.insertAdjacentHTML('beforeend', vote_element);

    //append進<tbody>中
    $('#vote').append(content);

}

//按下搜尋時重新整理頁面，並重新取得資料
function search() {
    console.log("test.");
    location.href = "/public/vote.html?title=" + $('#title').val();
}

//取得網址列上的搜尋條件
function getUrlVal(search) { //search可能為account或title
    //先取得當前網頁url的參數值
    var query = (window.location.search).substr(1); //順便把問號去掉
    var params = query.split('&'); //把account與title分開
    for (var i = 0; i < params.length; i++) {
        var splitedParams = params[i].split('='); //"account=jack"
        if (splitedParams[0] == search) {
            return splitedParams[1]; //return jack
        }
    }
    return false;
}

//取得投票資料
function getVote() {
    var search = ''; //用以存放要搜尋的條件(字串)
    //取得目前網址上的搜尋條件(按下搜尋，頁面重新整理時)
    if (getUrlVal("account")) {
        search += "account=" + getUrlVal("account") + '&';
    }
    if (getUrlVal("title")) {
        search += "title=" + getUrlVal("title") + '&';
    }
    //根據條件，向後端get資料
    $.get('/vote/getVote?' + search, function (data, status) {
        //成功時將所有資料使用newVote顯於網頁上
        for (var i = 0; i < data.length; i++) {
            newVote(data[i]);   //將取的資料傳給newVote進行顯示
        }
    });
}