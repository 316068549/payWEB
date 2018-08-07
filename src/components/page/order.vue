<template>
  <div class="p20">
    <!--<p>订单详情</p>-->
    <el-form ref="form" :model="form" label-width="80px">
      <!--<span>{{ $route.params.tok}}{{ $route.query.tok}},{{ $route.query.name}}</span>-->
      <el-row class="order-content">
        <el-col :span="8" class="tr">
          设备：
        </el-col>
        <el-col :span="16" class="tc">
          <span >{{imei}}</span>
        </el-col>
      </el-row>
      <el-row class="order-content mb30">
        <el-col :span="8" class="tr">
          套餐总价：
        </el-col>
        <el-col :span="16" class="tc">
          <span >¥{{totalAmount}}</span>
        </el-col>

      </el-row>
      <!--<el-row class="order-content mb30">-->
        <!--<el-col :span="8" class="tr">-->
          <!--总计：-->
        <!--</el-col>-->
        <!--<el-col :span="16" class="tc">-->
          <!--<span v-model="form.region">¥ 100元 </span>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-form-item class="" label="请选择支付方式" label-width="136px">
      </el-form-item>

      <el-form-item class="zhifubao" label="支付宝">
        <!--<i class="el-icon-edit "></i>-->
        <el-checkbox class="ml30" v-model="form.checked" @change="choose"></el-checkbox>
      </el-form-item>
      <el-form-item class="weixin" label="微信">
        <!--<i class="el-icon-edit "></i>-->
        <el-checkbox class="ml30" v-model="form.checked2" @change="choose2"></el-checkbox>
      </el-form-item>
      <el-form-item label-width="73px" label="总价：" class="zhifubox">
        <el-col :span="11" class="tl">
          <span class="warning f20">¥{{totalAmount?totalAmount:0}} </span>
        </el-col>
        <el-col :span="11">
          <el-button  type="primary" :loading="loading" @click="onSubmit" class="pay-btn">支付</el-button>
          <a class="hiddenbox" id="getBrandWCPayRequest" href="#">立即购买</a>
        </el-col>
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
    <!--<h1 v-if="seen">{{ ak }}</h1>-->
    <!--<ul>-->
    <!--<li v-for="item in items"><a href="http://router.vuejs.org/" target="_blank">{{item.name}}</a></li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import {pay,payResult,wxpay,wxpayResult,orderInfo,reurl} from '../../apiconfig/api.config'
  export default {
    data() {
      return {
        loading:false,
        imei:'',
        totalAmount:0,
        orderId:'',
        form: {
          checked:false,
          checked2:false
        }
      }
    },
    created:function () {
//      this.totalAmount = this.$route.query.name;
      console.log(this.$route.params.id);
      this.orderId = this.$route.params.id;
      this.searchOrder();
      this.findwxUrl();
    }
//    ,mounted:function () {
//      this.name = this.$route.query.name
//    }
    ,methods: {
      choose(){
        if(this.form.checked&&this.form.checked2){
          this.form.checked2=false;
        }else if(!this.form.checked&&!this.form.checked2){
          this.form.checked=true;
        }
      },
      choose2(){
        if(this.form.checked&&this.form.checked2){
          this.form.checked=false;
        }else if(!this.form.checked&&!this.form.checked2){
          this.form.checked2=true;
        }
      },
      //查询订单详情
      searchOrder(){
        orderInfo(this.orderId).then(res=>{
          console.log(res);
          var ak = this.isSucess(res.data,'pay');
          if(ak){
            this.totalAmount = res.data.data.totalAmount;
            this.imei = res.data.data.deviceIMEI;
          }else{
           alert(res.data.msg);
          }
        })
          .catch( error=> {
            this.isFail(error)
          });
      },
      //获取微信支付url
      findwxUrl(){
//        var params = new URLSearchParams();
//        params.append('orderId', this.orderId);
        var params = 'orderId='+this.orderId;
        wxpay(params).then(res=>{
          console.log(res);
          var ak = this.isSucess(res.data,'pay');
          if(!ak){
//              this.loading = false;
          }else{
            if(res.data.status==1){
//                跳转页面  http://192.168.1.103:8080/#/success   http%3a%2f%2f192.168.1.103%3a8080%2f%23%2fsuccess
              this.$('#getBrandWCPayRequest').attr("href",res.data.data.mweb_url+'&redirect_url='+reurl);
            }else{
//              alert(ak.errmsg);
              this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定'
              })
            }
          }
        })
          .catch( error=> {
            this.loading = false;
            this.isFail(error)
          });
      },
      //支付宝查询支付结果
      searchResult(){
        var pam = {orderId:this.orderId}
        payResult(pam).then(res=>{
          console.log(res);
          var ak = this.isSucess(res.data,'pay');
          if(!ak){
            this.loading = false;
            this.$router.push('fail');
          }else{
            this.$router.push('success');
          }
        })
          .catch( error=> {
            this.loading = false;
            this.isFail(error)
          });
      },
      //微信查询支付结果
      wxsearchResult(){
        var pam = {orderId:this.orderId}
        wxpayResult(pam).then(res=>{
          console.log(res);
          var ak = this.isSucess(res.data,'pay');
          if(!ak){
            this.loading = false;
            this.$router.push('fail');
          }else{
            this.$router.push('success');
          }
        })
          .catch( error=> {
            this.loading = false;
            this.isFail(error)
          });
      },
      onSubmit() {
//        var ordertime = localStorage.getItem("ordertime");
//        if ((new Date().getTime() - ordertime) >= 60 * 9 * 1000) {
//          alert("订单已超时,请重新预订！");
//          window.location = "index.html";
//          return;
//        }
        this.loading = true;
        var payFuc = this.form.checked?1:2;//1支付宝2微信
        var params = 'orderId='+this.orderId;
        var disVal = this.$(".pay-btn").prop("disabled");
        console.log(disVal)
        if(disVal==true){
          this.$(".pay-btn").attr("disabled", false);
        }
//        var params = new URLSearchParams();
//        params.append('orderId', this.orderId);
        if(this.form.checked){
          //z支付宝支付
          this.$(".pay-btn").val("正在支付").attr("disabled", true);
          pay(params).then(res=>{
            console.log(res);
            var ak = this.isSucess(res.data,'pay');
            if(!ak){
//              this.loading = false;
            }else{
              const div = document.createElement('div');
              div.innerHTML = res.data.data;
              document.body.appendChild(div);
              document.forms.punchout_form.submit();
              setTimeout(()=> this.searchResult(),10000)
            }
          })
            .catch( error=> {
              this.loading = false;
              this.isFail(error)
            });
        }else if(this.form.checked2){
          //微信支付
          this.$(".pay-btn").val("正在支付").attr("disabled", true);
          localStorage.setItem('payOrderId',this.orderId);
          console.log(this.$('#getBrandWCPayRequest'));
          var valUrl = this.$('#getBrandWCPayRequest').attr('href');
          this.$.ajax({
            headers: {
              'Referer':'http://www.qianniukeji.vip'
            },
            url:valUrl,
            type: "get",
            success: function (data) {
                console.log(data);
            }
          });
           window.location.href=valUrl
         setTimeout(()=> this.wxsearchResult(),10000)
        }else {
          this.loading = false;
          this.$alert('请选择支付方式', '提示', {
            confirmButtonText: '确定'
          })
        }
//       this.$axios.post('http://47.95.218.144:9001/login','userName=wangwei&password=123456')
//       this.$axios.post('http://47.95.218.144:9001/login',{total_amount:this.form.region,deviceIMEI:this.form.name})
      }
    }
  }

</script>

<style scoped lang="scss">
  .aa{
    position: absolute;
    left:-20px;
    right: 0px;
    width: 120%;
    height: 1px;
    background-color: #c8c7cc;
    transform: scaleY(.5);
    content:'';
    -webkit-transform:scaleY(.5);
  }
  .order-content{
      position: relative;
      font-size: 14px;
      line-height: 40px;
      height:40px;
    /*background-color: #f5f5f9;*/
      &:after{
        position: absolute;
        left:0;
        bottom:0;
        right: 15px;
        width: 100%;
        height: 1px;
        background-color: #c8c7cc;
        transform: scaleY(.5);
        content:'';
        -webkit-transform:scaleY(.5);
      }
  }
  .zhifubox{
    /*margin-top: 100px;*/
     position: fixed;
    z-index: 999;
    width: 100%;
    bottom: 0;
  padding:8px 0 6px 0;
    .pay-btn{
      width:120px;
      line-height: 0.6;
    }
 &:after{
    @extend .aa;
    bottom: 0;
  }
  &:before{
    @extend .aa;
    top: 0;
  }
}
.zhifubao{
  position: relative;
  &:before{
    content: '';
    display: inline-block;
    float: left;
    margin-left: 30px;
    width: 50px;
    height: 50px;
    background: url("../../assets/img/logo.png") center center no-repeat;
    background-size: 50px;
  }
  &:after{
    content: '';
    position: absolute;
    top:0;
    left:150px;
    display: inline-block;
    width: 50px;
    height: 50px;
    float: left;
    background: url("../../assets/img/tuijian.png") top left no-repeat;
    background-size: 50px;
  }
}
.weixin{
  position: relative;
  &:before{
    content: '';
    display: inline-block;
    float: left;
    margin-left: 30px;
    width: 50px;
    height: 50px;
    background: url("../../assets/img/timg.jpg") center center no-repeat;
    background-size: 50px;
  }
}
/*.zhifubao:before{*/
  /**/
  /*}*/
  /*.zhifubao:after{*/
  /**/
  /*}*/
</style>
