<template>
    <div class="header">
        <div class="header-left">
            <a
                    href="javascript:;"
                    class="header-icon"
                    @click="collapseTrigger"
                    role="button"
            >
                <s-icon
                        v-if="collapse"
                        icon="suncaper-menu-fold"
                />
                <s-icon
                        v-else
                        icon="suncaper-menu-unfold"
                />
            </a>
            <span class="header-title text-center">欢迎您，{{ userName }} {{ roleName }}</span>
        </div>
        <div class="header-right">
            <a
                    href="javascript:;"
                    class="header-logout"
                    @click="enterPersonalPage"
                    role="button"
                    style="margin-right: 10px"
            >
                <s-tooltip effect="dark" content="个人主页" placement="bottom">
                    <s-icon
                            icon="suncaper-user"
                            class="text-center"
                    />
                </s-tooltip>
            </a>
            <span class="text-center">
          {{ userName }}
        </span>
            <a
                    href="javascript:;"
                    class="header-logout"
                    @click="exit"
                    role="button"
            >
                <s-tooltip effect="dark" content="退出" placement="bottom">
                    <s-icon
                            icon="suncaper-quit"
                    />
                </s-tooltip>
            </a>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon'
import {Tooltip} from 'element-ui'
import {userLogout} from '../api/user'
import store from '../store'

export default {
  name: 's-header',
  props: {
    collapseTrigger: Function,
    collapse: Boolean,
    logout: Function,
    userName: String,
    roleName: String
  },
  components: {
    's-icon': Icon,
    's-tooltip': Tooltip
  },
  methods: {
    exit () {
      // 清楚session 的登录用户，在后端controller里面
      userLogout().then(res => {
        // 清除前端的的用户
        store.dispatch('user/clearUserInfo')
        // 跳转登录
        this.$router.push({path: '/login'})
        this.$message.success('退出成功')
      })
    },
    enterPersonalPage () {
      this.$router.push({name: 'personnelPage'})
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/styles/var";

.header {
  width: 100%;
  height: 60px;
  padding: 0 23px;
  line-height: 59px;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 1px solid @borderBottomColor;
  overflow: hidden;

  > span {
    vertical-align: middle;
  }
}

.header-left {
  display: inline-block;
}

.header-right {
  font-size: 14px;
  float: right;
  display: inline-block;
}

.header-title {
  font-size: 14px;
  margin-left: 10px;
}

.header-icon {
  font-size: 22px;
  color: inherit;
  outline: none;
  display: inline-block;
  text-decoration: none;
  vertical-align: top;

  &:hover {
    color: @dch;
  }
}

.header-logout {
  .header-icon;
  .text-center;
  font-size: 14px;
  margin-left: 10px;
  line-height: normal;

  &:hover {
    color: red;
  }
}

.text-center {
  vertical-align: middle;
}
</style>
