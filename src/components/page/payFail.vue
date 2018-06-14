<template>
  <div class="f20 mt20 m20">
    <i class="el-icon-circle-close-outline danger"></i>支付遇到问题，请重新支付
  </div>
</template>

<script>
  export default {
      mounted:function () {
       setTimeout( ()=> {
         this.$router.push('/pay')
       },1000)
      }
  }
</script>

<style>

</style>
