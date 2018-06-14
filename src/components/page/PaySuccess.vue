<template>
  <div class="f20 mt20 m20">
    <i class="el-icon-circle-check-outline success" v-if="suc"></i>支付成功
    <i class="el-icon-circle-close-outline danger" v-if="!suc"></i>支付遇到问题，请重新支付
  </div>
</template>

<script>
    import {payResult} from '../../apiconfig/api.config'
    export default {
     data(){
         return{
             suc:false
         }
     },
      methods:{
         mounted:function () {
//           let pam = {userName:this.ruleForm.name,password:this.ruleForm.pass};
//           var params = new URLSearchParams();
//           params.append('mobile', this.ruleForm.name);
//           params.append('password', this.ruleForm.pass);
           payResult(pam).then(res=>{
             console.log(res);
             let ak = this.isSucess(res.data,'pay');
             if(!ak){
               this.suc = false;
             }else{
               this.$router.push('success');
             }
           })
             .catch( error=> {
               this.loading = false;
               this.isFail(error)
             });
         }
      }
    }
</script>

<style>

</style>
