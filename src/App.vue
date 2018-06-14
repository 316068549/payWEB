<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'App'
}
//changshi
//(function($){
//  var _$ajax = $.ajax;
//  $.ajax = function (options) {
//    //自己的处理过程
//    var fn = {
//      error:function(err){
//        alert(err)
//      },
//      complete:function(status){
//        if(status == 'timeout'){
//          alert('timeout!')
//        }
//      },
//      success:function(data){
//        alert(data)
//      }
//    }
//    //判断是否自己写
//    if(options.error){
//        fn.error = options.error;
//    }
//    if(options.complete){
//      fn.complete = options.complete;
//    }
//    if(options.success){
//      fn.success = options.success;
//    }
//    //合并options
//    var _options = $.extend(options,{
//      error:function(err){
//        fn.error(err);
//      },
//      complete:function(status){
//        fn.complete(status);
//      },
//      success:function(data){
//        fn.success(data);
//      }
//    })
//  }
//  var defaults={
//      url:'',
//      method:'',
//  }
//  _$ajax(_options);
//})(jQuery)
  //选择id组件
  //用个构造函数传参，面向对象编程
//  function sid(id) {
//    var _self = document.getElementById(id);
//    this.ale = function () {
//      alert('chuzii')
//    }
//  }
//  var aa = new sid('app');
//  aa.ale();
//  //select组件
// var aa = function ($) {
//   $.fn.extend()
// }
// aa(jQuery)
</script>

<style>
  @import "../static/css/main.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

