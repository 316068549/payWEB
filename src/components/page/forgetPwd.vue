<template>
  <div class="login-wrap">
    <h5 class="ms-title mb30 logo-color mt12">安易康缴费平台</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" >
      <!--<el-form-item label="用户名" prop="name">-->
      <el-form-item  prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item   prop="valdate">
        <el-row>
          <el-col :span="12"><el-input  class="" v-model="ruleForm.valdate" @blur="validate" placeholder="请输入短信验证码"></el-input></el-col>
          <el-col :span="12"><el-button type="button" @click="send(ruleForm.name)" :disabled="sended"><span v-show="!sended">获取验证码</span><span v-show="sended">（{{count==0?1:count}}s后可重新获取）</span></el-button></el-col>
        </el-row>

      </el-form-item>
      <el-form-item  prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请重置密码"></el-input>
      </el-form-item>
      <el-form-item  prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="wid100" :loading="loading" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {forgetpass} from '../../apiconfig/api.config'
  const TIME_COUNT = 60;
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length<6){
          callback(new Error('密码至少为6位'));
        }else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading:false,
        sended:false,
        timer:null,
        count:'',
        url:'http://v.juhe.cn/sms/send',
        msgId:'',
        ruleForm: {
          name: '',
          valdate:'',
          pass: '',
          checkPass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min:11,max:11, message: '手机号长度不正确', trigger: 'blur' },
            { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
          ],
          pass: [{validator:validatePass , trigger: 'blur' },],
          checkPass: [{validator:validatePass2, trigger: 'blur' }]
        }
      };
    },
    methods: {
      creatCode(){
        var num='';
        for(let i=0;i<6;i++){
          num+=Math.floor(Math.random()*10)
        }
        console.log(num);
        return num;
      },
      send(a){
        this.code = this.creatCode();
        this.$refs.ruleForm.validateField('name', (val)=> {
          console.log(val)
          if(val!=''){

          }else {
            if(!this.timer){
              this.sended=true;
              this.count = TIME_COUNT;
              this.timer = setInterval(()=>{
                if(this.count>0&&this.count<=TIME_COUNT){
                  this.count--;
                }else{
                  this.sended = false;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              },1000)
            }
            var sendUrl = this.url+'?mobile='+this.ruleForm.name+'&tpl_id=85895&tpl_value=%23code%23%3D'+this.code+'&dtype=&key=ddbf2eb2fd6889536d25b932ded6d07f';
            this.$.ajax({
              type: "get",
              url: sendUrl,
              dataType: 'jsonp'
            })
              .done((res) =>{
                console.log(res)
                if(res['error_code']==0){

                }else{
                  this.$message.error(res.reason);
                }
              })
              .fail(function(res) {
                console.log(res);
                alert(res);
              });//延迟失败

          }

        })




//        this.$axios({
//          method:'post',
//          url:'http://60.205.4.247:8082/login',
//          data: 'userName=wangwei&password=123456',
//        }).then((res)=>{
//          console.log(res);
//        }).catch((error)=>{
//          console.log(error);
//        })

//        this.$axios.post('https://api.sms.jpush.cn/v1/codes',{mobile:a,temp_id:'1'},{headers: {
//          'Authorization': 'Basic OWU3MjkxNzk2Nzk3MzgzMTFhM2QyYzUzOjQ2MzI0NjUwMWQ0ODBkODIzYzUzNTIwMg=='
//        }})

//        this.$axios({
//          headers: {
//            'Authorization':'Basic OWU3MjkxNzk2Nzk3MzgzMTFhM2QyYzUzOjQ2MzI0NjUwMWQ0ODBkODIzYzUzNTIwMg=='
//          },
//          method:'get',
//          url:'https://api.sms.jpush.cn/v1/templates/149021',
//          auth: {
//            username: '9e729179679738311a3d2c53',
//            password: '463246501d480d823c535202'
//          }

      },
      validate(){
        if(this.ruleForm.valdate==this.code){
          this.$message({type:'successs',message:'验证成功'});
        }else{
          this.$message.error('验证码错误');
        }
      }
      ,
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
//            let pam = {userName:this.ruleForm.name,password:this.ruleForm.pass};
            var params = 'mobile='+this.ruleForm.name+'&password='+this.ruleForm.pass;
            forgetpass(params).then(res=>{
              console.log(res);
              var ak = this.isSucess(res.data,'login');
              if(!ak){
                this.loading = false;
              }else{
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.push('login');
              }
            })
              .catch( error=> {
                this.loading = false;
                this.isFail(error)
              });

//            this.$axios.post('https://api.sms.jpush.cn/v1/codes')
//              .then(res => {
//                console.log(res.status)
//                if (res.data.status == 1) {
//                  this.msg = 'GET'+res.data.msg;
//                  localStorage.setItem('ms_username',this.ruleForm.username);
//                  this.$router.push('/pay');
////                  this.$message({
////                    showClose: true,
////                    message: '注册成功',
////                    type: 'success'
////                  })
////                   router.push({name: 'Login'})
//                } else {
//
//                }
//              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped lang="scss">
  $word:#606266;
  .login-wrap{
    margin: 0 20px;
    height:100%;
    .ms-title{
      font-family:"microsoft yahei";
      font-size: 2rem;
      &:before{
        content: '';
        display: inline-block;
        background:url("../../assets/img/lALPBY0V4s_dXf06Og_58_58.png") no-repeat;
        width: 58px;
        height: 58px;
        vertical-align: middle;
        /*background-size: 32px;*/
      }
    }
  }
</style>
