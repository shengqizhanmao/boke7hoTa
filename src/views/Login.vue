<template>
  <div class="login">
    <el-page-header  content="用户登录" />
    <br><br><br>
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" label-width="60px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="warning" size="small" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";
import loginApi from "/src/api/loginApi.js"
import userApi from "/src/api/userApi.js"
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginRef.validate(async v => {
        if (!v) return
        let data  = await loginApi.login(this.loginForm)
        if (data.success === false) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        window.sessionStorage.setItem('token', data.data)
        let data2 =await userApi.getUserByToken();
        window.sessionStorage.setItem('user', JSON.stringify(data2))
        // window.$cookies.set('user', JSON.stringify(data2.data))
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 280px;
  height: 250px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2)
}

.btn {
  float: right;
}
</style>
