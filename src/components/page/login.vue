<template>
    <div class="login-wrap">
      <h5 class="ms-title mb30 logo-color mt12">安易康缴费平台</h5>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" >
        <!--<el-form-item label="用户名" prop="name">-->
          <el-form-item  prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" class="wid100" :loading="loading" @touchstart="submitForm('ruleForm')">登录</el-button>-->
          <el-button type="primary" class="wid100" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12" ><router-link to="/register" class="wordblue fl">注册</router-link></el-col>
        <el-col :span="12" ><router-link to="/forgetpwd" class="wordblue fr">忘记密码</router-link></el-col>
      </el-row>
    </div>
</template>

<script>
  import {login} from '../../apiconfig/api.config'
  export default {
    data() {
      return {
        msg:'',
        msg2:'',
        url:'daili/login',
        loading:false,
        ruleForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min:11,max:11, message: '手机号长度不正确', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少为6位', trigger: 'blur' }
          ]
        }
      };
    },
    created:function () {
      localStorage.removeItem('Authorization');
    },
    methods: {
      submitForm(formName) {
          console.log(this.$route.path);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            var pam = {userName:this.ruleForm.name,password:this.ruleForm.pass};
//            var params = new URLSearchParams();
//            params.append('mobile', this.ruleForm.name);
//            params.append('password', this.ruleForm.pass);
            var params = 'mobile='+this.ruleForm.name+'&password='+this.ruleForm.pass
            login(params).then(res=>{
                console.log(res);
                 var ak = this.isSucess(res.data,'pay');
                if(!ak){
                  this.loading = false;
                }else{
                  localStorage.setItem('py_username',this.ruleForm.name);
                  localStorage.setItem('Authorization',res.data.data.token);
//                  sessionStorage.setItem('Authorization',res.data.data.token);  //微信跳转后auth获取不到，传成null接口报错，用本地存储
                  this.$router.push('/pay');
                }
            })
             .catch( error=> {
               this.loading = false;
               this.isFail(error)
             });
//            this.$axios.get('http://47.95.218.144:9001/web/oldman/findOldMan?tokenId=3mh5FlNaEvXwAl3tK3cVSA==41&pageIndex=1&pageSize=5')
//              .then(res => {
//                console.log(res.status)
//                if (res.data.status == 1) {
//                    this.msg = 'GET'+res.data.msg;

//
//                  this.$message({
//                    showClose: true,
//                    message: '注册成功',
//                    type: 'success'
//                  })
//                   router.push({name: 'Login'})
//                } else {
//
//                }
//              })

//            this.$axios.post(this.url,'userName=wangwei&password=123456')
//              .then(res => {
//                console.log(res.data)
//                if (res.data.status == 0) {
//                  this.msg2 = 'POST'+res.data.msg;
//                }
//              })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

      , open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              center: true,
              message: `action: ${ action }`
            });
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
