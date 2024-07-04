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
                <h2>{{ user.name }}</h2>
                <p>{{ user.role }}</p>
            </div>
        </div>
        <div class="applications">
            <el-table :data="applications" stripe class="centered-table">
                <el-table-column prop="id" label="申请编号" width="180"></el-table-column>
                <el-table-column prop="title" label="申请标题" width="300"></el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                    <template v-slot="scope">
                        <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="提交时间" width="180"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {
        avatar: 'https://via.placeholder.com/150',
        name: '张三',
        role: '学生'
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
    margin-bottom: 40px;
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
    margin-top: 200px;
}

.centered-table {
    width: 80%;
    font-size: 16px;
}

.el-table th, .el-table td {
    font-size: 16px;
}
</style>
