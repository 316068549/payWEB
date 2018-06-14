/**
 xuexi
 **/



var base = {
  // get:function ($, requestUrl, data){
  //   var userId = localStorage.getItem("userId");
  //   var tokenId = localStorage.getItem("tokenId");
  //   //var roleId = localStorage.getItem("roleId");
  //
  //   var data = data+"&userId="+ userId +"&tokenId="+ tokenId;
  //
  //   var result = "";
  //   $.ajax({
  //     type: "GET",
  //     async: false,
  //     crossDomain:true,
  //     url: requestUrl,
  //     data: data,
  //     dataType: "json",//·µ»Øjson¸ñÊ½µÄÊý¾Ý
  //
  //     success: function(data){//msgÎª·µ»ØµÄÊý¾Ý£¬ÔÚÕâÀï×öÊý¾Ý°ó¶¨
  //       result = data;//JSON.stringify(data);
  //     },
  //     error:function(jqXHQ){
  //       var status = jqXHQ.status;
  //       var error = "{error:"+status+",code=-1}" ;
  //       result =error;
  //
  //
  //     }
  //   });
  //   return result;
  // },
  // post:function ($, requestUrl, data){
  //   var userId = localStorage.getItem("userId");
  //   var tokenId = localStorage.getItem("tokenId");
  //   //var roleId = localStorage.getItem("roleId");
  //   var data = data+"&userId="+ userId +"&tokenId="+ tokenId;
  //   var result = "";
  //   $.ajax({
  //     type: "POST",
  //     async: false,
  //     crossDomain:true,
  //     url: requestUrl,
  //     data: data,
  //     dataType: "json",//·µ»Øjson¸ñÊ½µÄÊý¾Ý
  //
  //     success: function(data){//msgÎª·µ»ØµÄÊý¾Ý£¬ÔÚÕâÀï×öÊý¾Ý°ó¶¨
  //       result = data;//JSON.stringify(data);
  //     },
  //     error:function(jqXHQ){
  //       var status = jqXHQ.status;
  //       var error = "{error:"+status+",code=-1}" ;
  //       result =error;
  //     }
  //   });
  //   return result;
  // },

//   this.$message({
//   message: response.data.status,
//   type: 'success'
// });

  // getURLParameter: function(name) {//»ñÈ¡Ò³ÃæÖ®¼äµÄ´«²Î
  //   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  // },
  //
  // isSucess:function(json){
  //   var bool;
  //   if(json.code == 0){
  //     bool = true;
  //   }else if(json.code == 5){//token¹ýÆÚ»òÆ¥Åä´íÎó
  //     alert(json.error);
  //     Message.error(json.msg);
  //     // location.href='login.html';
  //     bool = false;
  //   }else if(json.code == 6){//ÎÞÈ¨ÏÞ
  //     alert(json.error);
  //     // location.href='login.html';
  //     bool = false;
  //   }else{
  //     alert(json.error);
  //     bool =false;
  //   }
  //   return bool;
  // }


};

//ÅÐ¶Ï
String.prototype.test=function(str){
  return this.toString()==str;
}

String.prototype.contains=function(list){
  list = (list instanceof Array)?list:[].slice.call(arguments);
  for(var i=0;i<list.length;i++){
    var str = (list[i] instanceof RegExp) ? list[i]:(list[i]+"")
    if(str .test(this.toString())){
      return true;
    }
  }
  return false;
}

Array.prototype.insert = function(index, item){
  this.splice(index, 0, item);
}
// Array.prototype.remove = function(index){
// 	return this.splice(index, 1);
// }

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
//¸ù¾Ý×Ö·û´®ÒÆ³ýÖ¸¶¨µÄÔªËØ
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.quchong = function(){
  var ak=[];
  for (var i = 0; i <this.length; i++) {
    console.log(this[i]);
    if(ak.indexOf(this[i])==-1){
      ak.push(this[i]);
    }
  }
  return ak;
}




