<template>
    <div class="wrapper">
        <v-head :title="msg"></v-head>
        <div class="content">
           <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
  import vHead from './Header.vue';
  export default {
      data(){
          return{
              msg:''
          }
      },

    components: {
      vHead,
    },
    methods:{
      setBannerMsg(obj){
        switch (obj){
          case '/forgetpwd':
            this.msg = '忘记密码';
            break;
          case '/register':
            this.msg = '注册';
            break;
          case '/login':
            this.msg = '登录';
            break;
          case '/pay':
            this.msg = '支付';
            break;
          case '/success':
            this.msg = '支付成功';
            break;
          case '/returnUrl':
            this.msg = '支付成功';
            break;
          case '/fail':
            this.msg = '支付失败';
            break;
          default:
            this.msg = '支付'
        }
      }
    },
    created: function () {
        console.log(this.$route.path)
        this.setBannerMsg(this.$route.path);
    }
    ,
    mounted: function () {
      console.log('mounted')
    }
    ,
    updated: function () {
      console.log('updated')
    },
    watch: {
      '$route.path' (to, from) {
          console.log(to)
        console.log(from)
        this.setBannerMsg(to);
//        switch (to){
//          case '/forgetpwd':
//            this.msg = '忘记密码';
//            break;
//          case '/register':
//            this.msg = '注册';
//            break;
//          case '/login':
//            this.msg = '登录';
//            break;
//          case '/pay':
//            this.msg = '支付';
//            break;
//          case '/success':
//            this.msg = '支付成功';
//            break;
//          case '/returnUrl':
//            this.msg = '支付成功';
//            break;
//          case '/fail':
//            this.msg = '支付失败';
//            break;
//          default:
//            this.msg = '支付'
//        }

      }
    }
  }
//    import vHead from './Header.vue';
//    export default {
//        component:{
//          vHead
//        }
//    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 44px;
    }
</style>
