// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios';
import 'es6-promise/auto'
import 'babel-polyfill'
import $ from 'jquery';



// axios.defaults.headers.common['Authorization'] = 'Basic OWU3MjkxNzk2Nzk3MzgzMTFhM2QyYzUzOjQ2MzI0NjUwMWQ0ODBkODIzYzUzNTIwMg==';


// this.$message({
//   type: 'info',
//   message: `action: ${ action }`
// });


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$ = $;
Vue.prototype.isFail = function (error) {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response);
    console.log(error.response.status);
    this.$message.error('网络异常'+error.response.status)
//   console.log(error.response.headers);
  } else {
    console.log('Error', error.message);
    this.$message.error('网络异常'+error.message)
  }
  console.log(error.status);
}

Vue.prototype.isSucess =function (json,path) {
  console.log(json);
  var bool;
  if(json.status == 1){
    bool = true;
  }
  // else if(json.code == 5){
  //   // this.$message('这是一条消息提示');
  //   this.$alert(json.error, '提示', {
  //       confirmButtonText: '确定'
  //     ,
  //       callback: action => {
  //         this.$router.push(path);
  //       }
  //   })
  //
  //   bool = false;
  // }else if(json.code == 6){
  //   this.$alert(json.error, '提示', {
  //     confirmButtonText: '确定'
  //     ,
  //     callback: action => {
  //       this.$router.push(path);
  //     }
  //   })
  //   bool = false;
  // }
  else{
    this.$alert(json.msg, '提示', {
      confirmButtonText: '确定'
      // ,
      // callback: action => {
      //   this.$router.push('login');
      // }
    })
    bool =false;
  }
  return bool;
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
