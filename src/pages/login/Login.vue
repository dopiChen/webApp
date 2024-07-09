<template>
    <div class="center">
        <h1>Sign in/ Sign up</h1>
        <div class="logon">
            <div :class="overlaylong">
                <div class="overlaylong-Signin" v-if="disfiex == 0">
                    <h2 class="overlaylongH2">Sign in</h2>
                    <input type="text" placeholder="user">
                    <input type="text" placeholder="password">
                    <h3>Forgot your password?</h3>
                    <button class="inupbutton" @click="Signin1">Sign in</button>
                </div>
                <div class="overlaylong-Signup" v-if="disfiex == 1">
                    <h2 class="overlaylongH2">Registered Account</h2>
                    <input type="text" placeholder="user">
                    <input type="text" placeholder="password">
                    <button class="inupbutton">Sign up</button>
                    <button>NIHAO</button>
                </div>
            </div>
            <div :class="overlaytitle">
                <div class="overlaytitle-Signin" v-if="disfiex == 0">
                    <h2 class="overlaytitleH2">Hello,Friend!</h2>
                    <p class="overlaytitleP">
                        Enter your personal details and start journey with us
                    </p>
                    <div class="buttongohs" @click="Signin2">Sign up</div>
                </div>
                <div class="overlaytitle-Signup" v-if="disfiex == 1">
                    <h2 class="overlaytitleH2">Welcome Back!</h2>
                    <p class="overlaytitleP">To keep connected with us please login with your personal info</p>
                    <div class="buttongohs" @click="Signup2">Sign in</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      overlaylong: 'overlaylong',
      overlaytitle: 'overlaytitle',
      disfiex: 0,
      data: null
    }
  },
  // 对角色类型进行判断后跳转至各自首页
  computed: {
    ...mapState('user', {
      userType: state => state.type // 确保引用正确
    })
  },
  methods: {
    ...mapActions('user', ['fetchUserInfo']),
    // 其余登录注册按钮在此书写
    async Signin1 () {
      setTimeout(() => {
        this.disfiex = 0
      }, 200)

      await this.fetchUserInfo()
      this.redirectBasedOnUserType()
    },
    redirectBasedOnUserType () {
      if (this.userType === 1 || this.userType === 4 || this.userType === 5) {
        this.$router.push('/main1/first/first_approval')
      } else if (this.userType === 2) {
        this.$router.push('/main2/second/second1')
      } else if (this.userType === 3) {
        this.$router.push('/main3/third/third1')
      } else {
        this.$router.push('/main')
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
</style>
