<template>
  <header class="mui-bar mui-bar-nav bar-redd">
    <a v-if="this.$route.path!='/login'&&this.$route.path!='/returnUrl'&&this.$route.path!='/pay'" @touchstart="goBack" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left barh el-icon-arrow-left" ></a>
    <a v-if="this.$route.path=='/returnUrl'||this.$route.path=='/success'||this.$route.path=='/fail'" @touchstart="goHome" class="shou barh fl" >返回首页</a>
    <h1 class="mui-title barh">{{title}}</h1>
  </header>
</template>
<script>
  export default {
      data(){
          return{
          }
      },
    props: ['title']
//    ,created:function () {
//      this.title = this.$route.path;
//    }
    ,methods:{
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      goHome () {
        this.$router.push('/pay')
      }
    }

  }
</script>
<style scoped lang="scss">
  .ak{
    font-size: 12rem;
  }
  .mui-bar {
    border-bottom: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .mui-bar-nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .bar-redd {
    background-color: #C4151C;
  }
  .shou{
    font-size: 14px;
    line-height: 43px;
  }
  .mui-bar-nav {
    top: 0;
    -webkit-box-shadow: 0 1px 6px #ccc;
    box-shadow: 0 1px 6px #ccc;
  }
  .mui-bar {
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    height: 44px;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 0;
    background-color: #409EFF;
    -webkit-box-shadow: 0 0 1px rgba(0,0,0,.85);
    box-shadow: 0 0 1px rgba(0,0,0,.85);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .mui-bar .mui-icon:active {
    opacity: .3;
  }
  .mui-bar-nav.mui-bar .mui-icon {
    margin-right: -10px;
    margin-left: -10px;
    padding-right: 10px;
    padding-left: 10px;
  }
  .mui-bar .mui-icon {
    font-size: 24px;
    position: relative;
    z-index: 20;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  a:focus, a:hover {
    text-decoration: none;
  }
  a:active {
    color: #0062cc;
  }
  a:active, a:hover {
    outline: 0;
  }
  .barh {
    color: #fff !important;
  }
  .mui-icon {
    font-family: Muiicons;
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    line-height: 1;
    display: inline-block;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
  }

  .mui-pull-left {
    float: left;
  }
  .mui-bar .mui-title {
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
  }
  .barh {
    color: #fff;
  }
  .mui-title {
    font-size: 17px;
    font-weight: 500;
    line-height: 44px;
    position: absolute;
    display: block;
    width: 100%;
    margin: 0 -10px;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    color: #000;
  }
</style>
