import Vue from 'vue'
import Router from 'vue-router'
import pay from '../components/page/pay.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          // path:'/pay/:tok',
          path:'/pay',
          component:resolve => require(['../components/page/pay.vue'],resolve)
           // ,props: (route) => ({ query: route.query.name })
        },
        {
          path:'/order/:id',
          component:resolve => require(['../components/page/order.vue'],resolve)
        },
        {
          path:'/success',
          component:resolve => require(['../components/page/PaySuccess.vue'],resolve)
        },
        {
          path:'/returnUrl',
          component:resolve => require(['../components/page/returnUrl.vue'],resolve)
        },
        {
          path:'/returnUrl2',
          component:resolve => require(['../components/page/returnUrl2.vue'],resolve)
        },
        {
          path:'/fail',
          component:resolve => require(['../components/page/PayFail.vue'],resolve)
        },
        {
          path:'/login',
          component:resolve => require(['../components/page/login.vue'],resolve)
        },
        {
          path:'/forgetpwd',
          component:resolve => require(['../components/page/forgetPwd.vue'],resolve)
        },
        {
          path:'/register',
          component:resolve => require(['../components/page/register.vue'],resolve)
        }

      ]
    }

  ]
})
