$(function(){
  $("#enter").on('click', function(event){
    event.preventDefault(); // form機能の停止
    //alert("request processing...");
    status = false;

    if ($(this).prop("name")=="enter") {
      status = true;
    }else if ($(this).prop("name")=="exit") {
      status = false;
    }

    request_data = {
      "status": status
    };
    //console.log(JSON.stringify(data));
    $.ajax({
      url: "browser/",　// なぜか{% url 'status_change' %}とすると、404になってしまう。。。
      method: "POST",
      data: request_data, // 連想配列をJSONに変換しなくて良い見たい・・・
      cache: false
      //dataType: "json", // 返信データの形式
      //timeout : "5000", // 5秒待機
      //processData: false,
      //contentType: false,
      //data: {"user" : "higashi","status" : $(this).prop("name")}

      /*beforeSend: function(xhr, settings) {         //リクエスト送信前の処理,CSRFTokenを設定
         xhr.setRequestHeader("X-CSRFToken", $("input[name='csrfmiddlewaretoken']").val());
      }*/
    })
    .done(function(responce, textStatus, jqXHR){

      if (responce['status_proc'] === true) {

        //alert(responce['msg']+` (status = ${jqXHR.status})`); // for debug

        console.log(responce);
        $("#enter").prop('disabled', true);
        $("#exit").prop('disabled', false);
        $("#status").html("入室済み");
      	//alert("kkkkkkNNNNNN");
        $("#available_users_list .result").trigger("click");

        //return(0);

      } else if (responce['status_proc'] === true) {

        //alert(responce['msg']+` (status = ${jqXHR.status})`);
        //return(0);

      } else {

        //alert("サーバ上で予期せぬエラーが発生しました。\nもう一度試すか、管理者にご連絡ください。");
        //return(1);

      }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      alert(`通信エラーが発生しました。(status = ${jqXHR.status})\nもう一度試すか、管理者にご連絡ください。`);
    });
  });


  $("#exit").on('click', function(event){
    event.preventDefault(); // form機能の停止
    //alert("request processing...");
    status = false;

    if ($(this).prop("name")=="enter") {
      status = true;
    }else if ($(this).prop("name")=="exit") {
      status = false;
    }

    request_data = {
      "status": status
    };
    $.ajax({
      url: "browser/",　// なぜか{% url 'status_change' %}とすると、404になってしまう。。。
      method: "POST",
      data: request_data // 連想配列をJSONに変換しなくて良い見たい・・・
    })
    .done(function(responce, textStatus, jqXHR){

      if(responce['status_proc'] === true) {

        console.log(responce);
        //alert(`正常に処理しました。(status = ${jqXHR.status})`);
        $("#enter").prop('disabled', false);
        $("#exit").prop('disabled', true);
        $("#status").html("未入室");
        //alert("更新するよ！");
        $("#available_users_list .result").trigger('click');

      } else if (responce['status_proc'] === false) {

        //alert(responce['msg']+` (status = ${jqXHR.status})`); // for debug

      } else {

        alert("unknown error occured");
        $(innner_table).empty();

      }
    })
    .fail(function(jqXHR, textStatus, errorThrown){

      alert(`通信エラーが発生しました。(status = ${jqXHR.status})\nもう一度試すか、管理者にご連絡ください。`);

    });
  });

  /*
  $("#available_users_list").on('click', function(event){
    alert("kkkkkk");
    $.ajax({
          url: "status_all/",　// なぜか{% url 'status_change' %}とすると、404になってしまう。。。
          method: "POST",
          cache: false
          //data: request_data // 連想配列をJSONに変換しなくて良い見たい・・・
          //dataType: "json", // 返信データの形式
          //timeout : "5000", // 5秒待機
          //processData: false,
          //contentType: false,
          //data: {"user" : "higashi","status" : $(this).prop("name")}

          //beforeSend: function(xhr, settings) {         //リクエスト送信前の処理,CSRFTokenを設定
          //   xhr.setRequestHeader("X-CSRFToken", $("input[name='csrfmiddlewaretoken']").val());
          //}
        })
        .done(function(responce, textStatus, jqXHR){

          if ('error' in responce) {
	    //alart("サーバ上で予期せぬエラーが発生しました。\nもう一度試すか、管理者にご連絡ください。");
            $(innner_table).empty();
          } else {

            alert(`正常に処理しました。(status = ${jqXHR.status})`);

            console.log(responce.available_users[0].username);
            //alert(responce["available_users"][0]["username"]);

            var innner_table = "#available_users_list > table > tbody";
            $(innner_table).empty();
            for (var i = 0; i < responce.available_users.length; i++) {
              var username = responce.available_users[i].username;
              var time_in = responce.available_users[i].time_in;
              $(innner_table).html($(innner_table).html() + "<tr>\n<th>" + username + "</th>\n<td>" + time_in + "</td>\n</tr>");
            }
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          alert(`通信エラーが発生しました。(status = ${jqXHR.status})\nもう一度試すか、管理者にご連絡ください。`);
        });
  });

*/



});
