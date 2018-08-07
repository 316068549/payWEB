<template>
  <div class="m20 mt20">
    <el-form ref="form" :model="form" :rules="rules" label-width="55px" >
      <el-form-item label="设备号" prop="name">
        <el-input v-model="form.name" placeholder="请输入设备号"></el-input>
      </el-form-item>
      <el-form-item label="套餐" prop="region">
        <!--<el-select v-model="form.region" placeholder="请选择套餐" >-->
          <!--<el-option label="一天一分钱" value="0.01"></el-option>-->
          <!--<el-option label="一个月100元" value="100"></el-option>-->
          <!--<el-option label="三个月300元" value="300"></el-option>-->
          <!--<el-option label="半年600元" value="600"></el-option>-->
          <!--<el-option label="一年1200元" value="1200"></el-option>-->
        <!--</el-select>-->
        <el-select v-model="form.region" placeholder="请选择套餐" >
          <el-option v-for="price in prices" :label="price.name" :value="price.price" :key="price.price"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="73px" label="">
        <el-col :span="11" class="tl">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="11">
          <el-button  id="getBrandWCPayRequest" class="mt12" type="primary" :loading="loading" @click="onSubmit('form')">购买</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 // var fp=new Fingerprint2();
//  fp.get(function(result)获取指纹
//  {
//    $.getJSON("h5.json.php?code="+result, function(d){
//      if(d.errmsg == ''){
//        $('#getBrandWCPayRequest').attr("href",d.url+'&redirect_url=http%3a%2f%2fwxpay.wxutil.com%2fmch%2fpay%2fh5jumppage.php');
//      }else{
//        alert(d.errmsg);

  import {order,priceInfo} from '../../apiconfig/api.config';
//  import Fingerprint2 from 'fingerprintjs2';
  export default {
    data() {
      return {
        loading:false,
        form: {
          name: '',
          region: ''
        },
        prices:[],
        rules: {
          name: [
            { required: true, message: '请输入设备号', trigger: 'blur' }
          ],
          region: [{required: true, message: '请选择套餐', trigger: 'change'}]
        }
      }
    },
    created:function () {
      console.log(this.$route.query);
      localStorage.removeItem('payOrderId');
      if(this.$route.query.deviceIMEI){
        this.form.name = this.$route.query.deviceIMEI;
      }
      if(this.$route.query.Authorization){
        localStorage.setItem('Authorization',this.$route.query.Authorization);
      }
      priceInfo().then(res=>{
        console.log(res);
        var ak = this.isSucess(res.data,'pay');
        if(!ak){
          this.$message.error('获取数据失败，请刷新页面重试')
        }else{
          this.prices=res.data.data;
        }

      })
        .catch( error=> {
          this.isFail(error)
        });

    }
    ,methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = 'orderName=设备服务购买&deviceIMEI='+this.form.name+'&totalAmount='+this.form.region+'&description=';
            //生成订单
            order(params).then(res=>{
              console.log(res);
              var ak = this.isSucess(res.data,'pay');
              if(!ak){
                this.loading = false;
              }else{
                var ordUrl = '/order/'+res.data.data.id;
                this.$router.push(ordUrl);
              }
            })
              .catch( error=> {
                this.loading = false;
                this.isFail(error)
              });
          }else {
            console.log('error submit!!');
            return false;
          }
        })
//        var fp=new Fingerprint2();
//        fp.get((result, components)=>{
//          console.log(result); //指纹获取
//          console.log(components); // an array of FPcomponents
//          console.log(this.$route);

//        let pam = {total_amount:this.form.region,code:1,body:this.form.name,subject:'服务购买',
//                   out_trade_no:'70501111111S001111119',product_code:'QUICK_WAP_WAY',timeout_express:"90m"};

//          var params = new URLSearchParams();
//          params.append('orderName', '设备服务购买');
//          params.append('deviceIMEI', this.form.name);
//          params.append('totalAmount', this.form.region);
//          params.append('description', '');
//          params.append('code', result);


//        });


//        var ordertime = localStorage.getItem("ordertime");
//        if ((new Date().getTime() - ordertime) >= 60 * 9 * 1000) {
//          alert("订单已超时,请重新预订！");
//          window.location = "index.html";
//          return;
//        }

      }
    }
  }

</script>

<style scoped lang="scss">
  .grid-content{
    display: inline-block;
  }

</style>
