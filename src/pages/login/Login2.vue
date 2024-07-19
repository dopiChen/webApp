<template>
    <div class="center">
        <div class="logon">
            <div :class="overlaylong">
                <div class="overlaylong-Signin" v-if="disfiex == 0">
                    <h2 class="overlaylongH2">用户名密码登录</h2>
                    <input type="text" v-model="usernameform.username" placeholder="user">
                    <el-input type="text" v-model="usernameform.password" placeholder="password" show-password
                              @keyup.enter.native="openCaptchaDialog"></el-input>
                    <el-button type="text" @click="forgetPassWord">忘记密码?</el-button>
                    <button class="inupbutton" @click="openCaptchaDialog">登录</button>
                </div>
                <el-dialog title="请输入验证码" :visible.sync="captchaDialogVisible" width="20%">
                    <Captcha @getValue="updateCaptcha" :width="'400px'" :height="'100px'" :number="4"></Captcha>
                    <el-input v-model="enteredCaptcha" placeholder="输入验证码" style="width: 100%;margin-top: 10px"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="captchaDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="usernameSignIn" @keyup.enter.native="usernameSignIn">确定</el-button>
                    </span>
                </el-dialog>
                <div class="overlaylong-Signup" v-if="disfiex == 1">
                    <h2 class="overlaylongH2">手机验证码登录</h2>
                    <input type="text" v-model="codeform.phone" placeholder="phone">
                    <div class="code-container">
                        <input type="text" v-model="codeform.code" placeholder="code" style="width: 120px"
                               @keyup.enter="SmsCodeSignIn">
                        <button class="send-code-button" @click="sendCode" :disabled="isCountingDown">
                            {{ isCountingDown ? countdown + 's' : '发送验证码' }}
                        </button>
                    </div>
                    <button class="inupbutton" @click="SmsCodeSignIn">登录</button>
                </div>

            </div>
            <div :class="overlaytitle">
                <div class="overlaytitle-Signin" v-if="disfiex == 0">
                    <h2 class="overlaytitleH2">其他登录方式</h2>
                    <p class="overlaytitleP">
                        使用已经绑定的手机号进行登录
                    </p>
                    <div class="buttongohs" @click="phoneSign">前往登录</div>
                </div>
                <div class="overlaytitle-Signup" v-if="disfiex == 1">
                    <h2 class="overlaytitleH2">返回登录</h2>
                    <p class="overlaytitleP">使用教务处发放的教师用户名密码进行登录</p>
                    <div class="buttongohs" @click="Signup">返回</div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="IsforgetPassWord" title="找回密码" width="30%">
            <div class="main">
                <el-form
                        label-position="top"
                        label-width="100px"
                        :model="formdata"
                >
                    <el-form-item
                            label="用户名"
                            :rules="[
              { required: true, message: '用户名不能为空', trigger: 'blur' }]"
                    >
                        <el-input v-model="formdata.username" placeholder="请输入用户名" style="width: 500px"/>
                    </el-form-item>
                    <el-form-item
                            label="设置新密码"
                            :rules="[
              { required: true, message: '不能为空', trigger: 'blur' },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$).{8,}$/,
                message: '格式错误',
                trigger: 'blur'
              }
            ]"
                    >
                        <div class="main-rule">至少8个字符，不能全是字母或数字</div>
                        <el-input
                                v-model="formdata.newPassword"
                                placeholder="请输入新密码"
                                show-password
                                style="width: 500px"
                        />
                    </el-form-item>

                    <el-form-item
                            label="确认新密码"
                            :rules="[
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$).{8,}$/,
                message: '格式错误',
                trigger: 'blur'
              },
              {
                required: true,
                validator: passWordCheck,
                trigger: 'blur'
              }
            ]"
                    >
                        <el-input
                                v-model="formdata.confirmPassword"
                                placeholder="请再次输入新密码"
                                show-password
                                style="width: 500px"
                        />
                    </el-form-item>
                    <el-form-item
                            label="账号所绑定的手机号"
                            :rules="[
              { required: true, message: '手机号号不能为空', trigger: 'blur' },
              {
                pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|166|17[0-8]|18[0-9]|19[1,8-9])\\d{8}$/,
                message: '手机号格式不正确',
                trigger: 'blur',
              },
            ]"
                    >
                        <el-input v-model="formdata.phone" placeholder="请输入手机号" style="width: 500px"/>
                    </el-form-item>

                    <el-form-item
                            label="获取验证码"
                            :rules="[
              { required: true, message: '验证码不能为空', trigger: 'blur' },
            ]"
                    >
                        <div class="main-code">
                            <el-input v-model="formdata.code" placeholder="请输入" style="width: 500px"/>
                            <button class="send-code-button" @click="resetkeygetcode" :disabled="isCountingDown">
                                {{ isCountingDown ? countdown + 's' : '发送验证码' }}
                            </button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <el-button type="primary" @click="resetgologin" :loading="loginLoading" style="margin-right: 300px">
                    确认并返回登录
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import {_login, _loginByCode, _sendCode} from '../../api/user'
import {_checkUser, _resetPassword} from '../../api/api'
import Captcha from '../../pages/login/Captcha.vue'// 根据实际路径调整导入
export default {
  components: {
    Captcha
  },
  data () {
    return {
      overlaylong: 'overlaylong',
      overlaytitle: 'overlaytitle',
      disfiex: 0,
      isCountingDown: false,
      countdown: 60,
      enteredCaptcha: '',
      generatedCaptcha: '',
      captchaDialogVisible: false,
      usernameform: {
        username: '',
        password: ''
      },
      codeform: {
        code: '',
        phone: ''
      },
      IsforgetPassWord: false,
      formdata: {
        phone: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
        username: ''
      },
      disabled: false,
      buttonText: '获取验证码',
      loginLoading: false
    }
  },
  methods: {
    passWordCheck (rule, value, callback) {
      if (value !== this.formdata.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    openCaptchaDialog () {
      if (this.usernameform.username === '' || this.usernameform.password === '') {
        this.$message({
          message: '用户名或密码不能为空',
          type: 'warning'
        })
      } else {
        this.captchaDialogVisible = true
      }
    },
    updateCaptcha (value) {
      this.generatedCaptcha = value
    },
    phoneSign () {
      this.overlaylong = 'overlaylongleft'
      this.overlaytitle = 'overlaytitleright'
      setTimeout(() => {
        this.disfiex = 1
      }, 200)
    },
    Signup () {
      this.overlaylong = 'overlaylongright'
      this.overlaytitle = 'overlaytitleleft'

      setTimeout(() => {
        this.disfiex = 0
      }, 200)
    },
    usernameSignIn () {
      if (this.usernameform.username === '' || this.usernameform.password === '') {
        this.$message({
          message: '用户名或密码不能为空',
          type: 'warning'
        })
      } else {
        if (this.enteredCaptcha !== this.generatedCaptcha) {
          this.$message({
            message: '验证码错误',
            type: 'warning'
          })
        } else {
          _login(this.usernameform).then(res => {
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
        }
      }
    },
    SmsCodeSignIn () {
      if (this.codeform.code === '' || this.codeform.phone === '') {
        this.$message({
          message: '手机号或验证码不能为空！',
          type: 'warning'
        })
      } else {
        _loginByCode(this.codeform).then(res => {
          if (res.data !== null) {
            this.$router.push({path: '/main'})
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '验证码错误！',
              type: 'warning'
            })
          }
        })
      }
    },
    forgetPassWord () {
      this.IsforgetPassWord = true
    },
    sendCode () {
      if (this.isCountingDown) return
      this.isCountingDown = true
      let interval = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(interval)
          this.isCountingDown = false
          this.countdown = 60
        }
      }, 1000)
      // 发送验证码
      _sendCode(this.codeform.phone).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    resetkeygetcode () {
      if (this.isCountingDown) return
      this.isCountingDown = true
      let interval = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(interval)
          this.isCountingDown = false
          this.countdown = 60
        }
      }, 1000)
      // 发送验证码
      _sendCode(this.formdata.phone).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    resetgologin () {
      if (this.formdata.code === '') {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
      } else {
        const params = {phone: this.formdata.phone, code: this.formdata.code}
        _checkUser(this.formdata.username, params).then(res => {
          if (res.data !== null) {
            const setpassword = {username: this.formdata.username, password: this.formdata.newPassword}
            _resetPassword(setpassword).then(res => {
              if (res.data != null) {
                this.$message({

                  message: '重置密码成功',
                  type: 'success'
                })
                this.IsforgetPassWord = false
              } else {
                this.$message({
                  message: '重置密码失败',
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message({
              message: '验证码错误！',
              type: 'warning'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
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

h1 {
    font-size: 30px;
    color: black;
}
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
}
.logon {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    /* position: relative;
    overflow: hidden; */
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin-top: 20px;
    display: flex;
    background: -webkit-linear-gradient(right, #4284db, #29eac4);
}

.overlaylong {
    border-radius: 10px 0 0 10px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaylongleft {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    transform: translateX(100%);
    transition: transform 0.6s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaylongright {
    border-radius: 10px 0 0 10px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    transform: translateX(0%);
    transition: transform 0.6s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaytitle {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaytitleH2 {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
}

.overlaytitleP {
    font-size: 15px;
    color: #fff;
    margin-top: 20px;
}

.overlaytitleleft {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(0%);
    transition: transform 0.6s ease-in-out;
}

.overlaytitleright {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    transition: transform 0.6s ease-in-out;
}

.overlaytitle-Signin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.overlaytitle-Signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.buttongohs {
    width: 180px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
    margin-top: 40px;
}

.overlaylongH2 {
    font-size: 25px;
    color: black;
    /* width: 250px; */
}

.overlaylong-Signin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.overlaylong-Signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 10px 0;
    width: 240px;
}

h3 {
    font-size: 10px;
    margin-top: 10px;
    cursor: pointer;
}

.inupbutton {
    background-color: #29eac4;
    border: none;
    width: 180px;
    height: 40px;
    border-radius: 50px;
    font-size: 15px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
}

.code-container {
    display: flex;
    align-items: center;
}

.send-code-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.send-code-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.main {
    margin: 20px 0;
}

.main-rule {
    margin-bottom: 10px;
    color: #666;
}

.main-code {
    display: flex;
    align-items: center;
}

.main-sms {
    margin-top: 10px;
    color: #999;
}
</style>
