<template>
    <div class="mainbody">
        <div class="profile" style="margin-top: 100px">
            <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
            >
                <img v-if="user.avatar" :src="user.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span style="margin-top: 10px" v-if="isHave">点击上传头像</span>
            </el-upload>
            <div class="info">
                <h2 style="font-size: 40px">{{ this.personnelData.name }}</h2>
                <h2 style="font-size: 35px;margin-top: 10px">{{ this.personnelData.unit}}</h2>
                <!--                <p style="font-size: 20px;margin-top: 10px">{{ user.role }}</p>-->
            </div>
            <el-descriptions class="table" :column="1" :size="medium" border style="width: 1000px;height: 500px">
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        用户名
                    </template>
                    {{personnelData.username}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{personnelData.phone}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    {{personnelData.address}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        备注
                    </template>
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        学历
                    </template>
                    {{personnelData.eduBackground}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        备用电话
                    </template>
                    {{personnelData.backupPhone}}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <hr>
        <div class="submitcody" v-if="isVasible" >
        <h2>我的申请记录</h2>
        <div class="applications">
            <el-table :data="applications" stripe class="centered-table"  max-height="350">
                <el-table-column prop="examId" label="考试编号" width="280"></el-table-column>
                <el-table-column prop="way" label="报名方式" width="400"></el-table-column>
                <el-table-column  label="状态" width="280">
                    <template v-slot="scope">
                        <el-tag :type="getTagType(getStatus(scope.row))">{{getStatus(scope.row) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="查看报名" width="400" v-slot="scope">
                    <el-button
                            type="text"
                            size="small"
                            @click="viewSignUp(scope.row)">
                        查看流程
                    </el-button>
                </el-table-column>
            </el-table>
        </div>
    </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {_getAllSignUp, _getLeaders, _getUserData} from '../../../../api/api'
import {_getUserAvatar} from '../../../../api/user'

export default {
  name: 'UserProfile',
  data () {
    return {
      personnelData: [],
      // 介入数据库
      user: {
        avatar: '', // 头像url
        name: this.name
      },
      applications: [],
      leaderData: [],
      isVasible: false,
      isHave: true
    }
  },
  created () {
    this.fetchData1()
    console.info(11111)
    this.fetchData2()
    console.info(11111)
    this.fetchData4()
    this.goVisible()
  },
  computed: {
    ...mapState({
      username: state => state.user.id, // 映射 userId
      name: state => state.user.name,
      usertype: state => state.user.type
    }),
    uploadUrl () {
      return `/file/upload/avatar/${this.username}`
    }
  },
  methods: {
    getTagType (status) {
      switch (status) {
        case '审核中':
          return 'info'
        case '审核失败':
          return 'danger'
        case '审核通过':
          return 'success'
        default:
          return ''
      }
    },
    getStatus (row) {
      if (row.isOut === 1) {
        return '审核失败'
      } else if (row.isOut !== 1 && row.approvalStatus < 5) {
        return '审核中'
      } else if (row.isOut !== 1 && row.approvalStatus === 5) {
        return '审核成功'
      }
      return '未知状态' // 如果有其他情况，可以返回一个默认状态
    },
    viewSignUp (row) {
      this.$router.push({name: 'third_signUpGoOn', query: {examId: row.examId, username: this.username, lederdata: this.leaderData}})
    },
    async fetchData1 () {
      _getUserData(this.username).then(res => {
        this.personnelData = res.data
      })
      _getUserAvatar(this.username).then(res => {
        if (res.url === null) {
          this.user.avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        } else {
          this.isHave = false
          this.user.avatar = res.url
          console.info(this.user.avatar)
        }
      })
    },
    async fetchData2 () {
      _getAllSignUp(this.username).then(res => {
        console.info(res)
        this.applications = res.data
      })
    },
    async fetchData4 () {
      _getLeaders(this.username).then(res => {
        this.leaderData = res.data
        console.info(1111)
        console.log(this.leaderData[0].user.username)
      })
    },
    handleAvatarSuccess (response, file) {
      // 假设后端返回的响应中包含文件 URL
      this.user.avatar = response.url
      console.log(this.user.avatar)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    goVisible () {
      if (this.usertype === 1) {
        this.isVasible = true
      }
    }
  }
}

</script>

<style scoped>
.mainbody {
    width: 80%;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
}

.table {
    margin-top: 100px;
    font-size: 24px;
}

.avatar-uploader {
    display: inline-block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.avatar-uploader .avatar {
    width: 150px;
    height: 150px;
    display: block;
    border-radius: 50%;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 150px;
    text-align: center;
}

.info {
    text-align: center;
    margin-top: 20px;
}

.info h2 {
    margin: 0;
    font-size: 24px;
}

.info p {
    margin: 0;
    color: #666;
    font-size: 18px;
}

.applications {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

}

.centered-table {
    width: 80%;
    font-size: 20px;
}

.el-table th, .el-table td {
    font-size: 16px;
}
</style>
