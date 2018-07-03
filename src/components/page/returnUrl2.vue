<template>
  <div class="f20 mt20 m20">
   <i class="el-icon-warning blue"></i>支付结果查询...
    <!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      top="50%"
      :close-on-click-modal="false"
      :show-close="false">
      <div><span class="l60">请确认微信支付是否已完成?</span></div>
      <!--<span slot="footer" class="dialog-footer">-->
      <div ><span class="l40 over-btn"><a href="#" class="danger" @click="wxsearchResult">已完成支付</a></span></div>
      <div><span class="l40"><a href="javascript:;" class="grey" @click="payagain">支付遇到问题，重新支付</a></span></div>

    <!--<el-button type="primary" class="over-btn mb30" @click="dialogVisible = false"></el-button>-->
        <!--<el-button type="danger" class="over-btn" @click="dialogVisible = false">支付遇到问题，重新支付</el-button>-->
  <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>
  import {payResult,wxpayResult} from '../../apiconfig/api.config'
  export default {
    data() {
      return {
        dialogVisible: true
      };
    },
    mounted:function () {
    },
    methods: {
      wxsearchResult(){
        var payOrd = localStorage.getItem('payOrderId');
        var pam = {orderId:payOrd}
        wxpayResult(pam).then(res=>{
          console.log(res);
          if(res.data.status == 1){
            this.$router.push('success');
          }else {
            this.$router.push('fail');
          }
        })
          .catch( error=> {
            this.loading = false;
            this.isFail(error)
          });
      },
      payagain(){
        this.$router.push('/pay');
      }
    }
  }
</script>

<style scoped lang="scss">

  .over-btn{
      &:before{
         position: absolute;
         left:0;
         right: 0px;
         width: 100%;
         height: 1px;
         background-color: #c8c7cc;
         transform: scaleY(.5);
         content:'';
         -webkit-transform:scaleY(.5);
       }
    &:after{
      position: absolute;
      left:0;
      right: 0px;
      width: 100%;
      top: 100px;
      height: 1px;
      background-color: #c8c7cc;
      transform: scaleY(.5);
      content:'';
      -webkit-transform:scaleY(.5);
    }
  }

</style>
