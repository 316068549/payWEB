/**
 * Created by Administrator on 2017/7/12..
 */
import axios from 'axios'

let qs = require('qs');

 let base = '';
let paybase='http://192.168.1.151:8072';
if (process.env.NODE_ENV == 'development') {
   base = 'daili';//需要代理的
  // base='http://192.168.1.151:9006' //axios直接跨域访问的
} else if (process.env.NODE_ENV == 'production') {
  // base = 'devdaili';
  base = 'daili';
  paybase = '';
}



var instance = axios.create({
  headers: {
    // 'content-type': 'application/json'
    'content-type': 'application/x-www-form-urlencoded'
    ,
    'Authorization': ''
  }
});


//在实例创建后改变默认值
// instance.defaults.headers.common ['Authorization'] = AUTH_TOKEN;
// instance.defaults.validateStatus = function (status) {
//   return true;
// };
instance.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
 instance.defaults.timeout = 3000;


instance.interceptors.request.use(
  config => {
    config.headers.Authorization = sessionStorage.getItem('Authorization');
    return config
  }, err => {
    return Promise.reject(err)
  });

//添加响应拦截器
instance.interceptors.response.use(function(response){

    return response;

},function(error){
  //请求错误时做些事
   return Promise.reject(error);
});






export const login = params => { return instance.post(`${base}/wap/payUser/login`, params) };//登录
export const regeister = params => { return instance.post(`${base}/wap/payUser/register`, params) };//注册
export const forgetpass = params => { return instance.post(`${base}/wap/payUser/forgetpw`, params) };//忘记密码
export const order = params => { return instance.post(`${paybase}/api/userOrder/add`, params) };//生成订单
export let orderInfo = (id) => { return instance.get(`${paybase}/api/userOrder/`+id) };//订单详情
export const pay = params => { return instance.post(`${paybase}/api/alipay/pay`, params) };//支付宝支付
export const payResult = params => { return instance.get(`${paybase}/api/userOrder/isPay`,{ params: params }) };//支付宝查询结果
export const wxpay = params => { return instance.post(`${paybase}/api/wxpay/pay`, params) };//微信订单
export const wxpayResult = params => { return instance.get(`${paybase}/api/userOrder/isPay`, { params: params }) };//微信结果

export const reqGetDemoList = params => { return instance.get(`${base}/demo/list`, { params: params }) };

export const reqDeleteDemo = params => { return instance.delete(`${base}/demo/delete/`+params.testDemoId, params) };

export const requestLogin = params => {return instance.post(`${base}/login`, qs.stringify(params)).then(res => res.data)};

