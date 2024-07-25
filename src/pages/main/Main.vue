<template>
    <suncaper-layout
            theme="dark"
            :logo="logo"
            :sidebar-list="sidebarList"
            :logout="logout"
    />
</template>

<script>
import {mapGetters} from 'vuex'
import Layout from '@/layouts/Layout'
import logo from '@/assets/images/logo.png'

export default {
  name: 'Main',
  data () {
    return {
      logo: {
        src: logo,
        alt: '研究生监考报名系统',
        firstDes: '研究生监考报名系统'
      }
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      getSidebarList: 'sidebar/getSidebarList'
    }),
    sidebarList () {
      return this.getSidebarList(this.userType).main
    }
  },
  methods: {
    logout () {
    }
  },
  components: {
    'suncaper-layout': Layout
  }
}
</script>
