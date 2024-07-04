<template>
    <div class="mainbody">
        <div class="profile">
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
            >
                <img v-if="user.avatar" :src="user.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="info">
                <h2 style="font-size: 40px">{{ user.name }}</h2>
                <p style="font-size: 20px;margin-top: 10px">{{ user.role }}</p>
            </div>
            <el-descriptions class="table" :column="1" :size="medium" border style="width: 1000px;height: 500px">
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        用户名
                    </template>
                    kooriookami
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    苏州市
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
                        <i class="el-icon-office-building"></i>
                        联系地址
                    </template>
                    江苏省苏州市吴中区吴中大道 1188 号
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <hr>
        <h2>我的申请记录</h2>
        <div class="applications">
            <el-table :data="applications" stripe class="centered-table">
                <el-table-column prop="id" label="申请编号" width="280"></el-table-column>
                <el-table-column prop="title" label="申请标题" width="400"></el-table-column>
                <el-table-column prop="status" label="状态" width="280">
                    <template v-slot="scope">
                        <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="提交时间" width="400"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      // 介入数据库
      user: {
        avatar: 'https://via.placeholder.com/150',
        name: '张三',
        role: '在职在岗教师'
      },
      applications: [
        {id: 'A001', title: '监考报名 - 2023A楼', status: '审核中', createdAt: '2023-07-01'},
        {id: 'A002', title: '监考报名 - 2023B楼', status: '审核失败', createdAt: '2023-07-02'},
        {id: 'A003', title: '监考报名 - 2023C楼', status: '审核通过', createdAt: '2023-07-03'}
        // 更多申请记录...
      ]
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.user.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
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
    }
  }
}
</script>

<style scoped>
.mainbody {
    width: 80%;
    height: 100%;
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
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

}

.centered-table {
    width: 80%;
    font-size: 20px;
    margin-left: 200px;
}

.el-table th, .el-table td {
    font-size: 16px;
}
</style>
