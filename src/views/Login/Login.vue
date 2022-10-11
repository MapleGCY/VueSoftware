<template>
  <div>
    <div class="login-box">
      <h2 style="margin:20px;text-align: center;">登录界面</h2>
      <div style="text-align:center">{{info}}</div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
// import { token } from 'mysql/lib/protocol/Auth'
import { mapMutations } from 'vuex'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      info: ''
    }
  },
  methods: {
    ...mapMutations('loginModule', ['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log('校验通过', this.loginForm)
          let { username, password } = this.loginForm
          //请求校验接口
          this.$api.getLogin({ username, password }).then(res => {
            //console.log('555', res.data)
            if (res.data.status === 200) {
              // console.log('666', jwt(res.data.data))
              this.info = ''
              //登陆成功后：1.存储登录信息 2.跳转网页 3.顶部区域显示用户信息 4.持久化
              let obj = {
                user: jwt(res.data.data).username,
                token: res.data.data
              }
              this.setUser(obj)
              //存储本地
              localStorage.setItem('user', JSON.stringify(obj))
              //跳转
              // console.log('跳转')
              this.$router.push('/layout/home')
            } else {
              //账号错误或者密码错误
              //console.log('用户不存在')
              this.info = '用户不存在'
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  width: 500px;
  height: 300px;
  margin: 150px auto;
  padding: 20px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 20px;
  /*  position: absolute; //第一种居中方法
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto; */
  /*  position: absolute;    //第二种居中方法
  transform: translate(-50%, -50%); 
  left: 50%;
  top: 50%; */
  // background: red;
}
</style>