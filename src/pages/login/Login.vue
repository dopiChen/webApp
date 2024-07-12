<template>
    <div class="center">
        <el-card class="box-card">
            <h2>登录</h2>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="70px"
                class="login-from"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="btnGroup">
                <el-button type="primary" @click="submitForm"
                >登录</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置密码</el-button>
                <router-link to="/register">
                    <el-button style="margin-left:10px">注册</el-button>
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import {_login} from '../../api/user'

export default {
  data () {
    return {
      ruleForm: {
        sn: '',
        password: ''
      },
      // rules: {
      //   uname: [
      //     { required: true, message: '用户名不能为空！', trigger: 'blur' }
      //   ],
      //   password: [
      //     { required: true, message: '密码不能为空！', trigger: 'blur' }
      //   ]
      // },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      // let obj = {
      //   sn: this.ruleForm.sn,
      //   password: this.ruleForm.password
      // }
      // userLogin(obj).then(res => {
      //   // 这里是没有axios封装的res
      //   // res.data就是后端返回的数据，要与下面用axios的区分开
      //   if (res.data !== null) {
      //     this.$message({
      //       message: '登陆成功',
      //       type: 'success'
      //     })
      //     this.$router.push({path: '/main'})
      //   } else {
      //     this.$message({
      //       message: '用户名或密码错误',
      //       type: 'warning'
      //     })
      //   }
      //   console.info(res)
      // })
      console.log(this.form.username)
      console.log(this.form.password)
      _login(this.form).then(res => {
        // 这里的返回值res是axios封装后的
        // res.data就是后端返回的json数据
        // res.data.data才是后端真正返回的数据
        if (res.data !== null) {
          this.$router.push({path: '/main'})
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '用户名或密码错误',
            type: 'warning'
          })
        }
        console.info(res.data)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.box-card {
    margin: auto;
    width: 400px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    background: -webkit-linear-gradient(right, #35bbf7, #29eac4);
}
.login-from {
    margin: auto;
}
.center {
    width: 100vw;
    height: 100vh;
    background-image: url('https://gd-hbimg.huaban.com/9165dc3c0f8279ae5402d1f47212847bff68b49f3cb547-QEli8R');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.btnGroup {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
