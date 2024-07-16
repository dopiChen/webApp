<!--当前身份直接邀约填写报名表-->
<template>
    <div class="body">
        <div class="title">
            <el-button type="primary" icon="el-icon-arrow-left" @click="returnclick">返回</el-button>
            <span class="title2" style="margin-left: 10px;margin-bottom: 20px">帮助报名信息填写</span>
        </div>
        <div class="mainbody">
            <!--            报名信息填写-->
            <div class="tablebody">
                <div class="subtitle1">
                    <span class="tag1">|</span>
                    <span class="subtitle1">武汉理工大学研究生招生考试监考人员报名表</span><br>
                </div>
                <div class="table">
                    <el-form ref="form" :model="form" label-width="80px" label-position="left" class="custom-form">
                        <el-form-item label="姓名" :style="{ paddingLeft: '10px' }" required>
                            <el-input v-model="form.name" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.name" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="所在单位" required>
                            <el-input v-model="form.region" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.region" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="性别" required>
                            <el-radio-group v-model="form.sex" style="margin-left: 100px;">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                            <span v-if="!form.sex" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="工号" required>
                            <el-input v-model="form.id" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.id" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="学历" required>
                            <el-input v-model="form.qualification" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.qualification" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="联系电话" required>
                            <el-input v-model="form.tel" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.tel" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="备用电话" required>
                            <el-input v-model="form.spare_tel" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!form.spare_tel" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="出生年月" required>
                            <el-col :span="11" style="margin-left: 100px;">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                                style="width: 100%;"></el-date-picker>
                            </el-col>
                            <span v-if="!form.date" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="上传电子照片" required>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    style="width: 400px; margin-left: 100px;">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-col :span="24" style="margin-top: 0; padding-top: 5px;margin-left: 100px;">
                                <small class="promisetext">仅支持上传JPG、PNG格式图片建议上传分辨率未450x300的寸照图片，限制1张、文件大小10M以下。</small>
                            </el-col>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="校区" required>
                            <el-checkbox-group v-model="form.campus" style="margin-left: 100px;width: 400px;">
                                <el-checkbox label="清水河校区" name="type"></el-checkbox>
                                <el-checkbox label="长菱校区" name="type"></el-checkbox>
                                <el-checkbox label="服从调剂" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-button type="primary" class="submitbtn" @click="handlesubmit">提交报名</el-button>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import {mapActions} from 'vuex'

export default {
  name: 'Third4',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date: '',
        sex: '',
        tel: '',
        spare_tel: '',
        qualification: '',
        campus: [],
        promise: [],
        dialogImageUrl: '',
        dialogVisible: false
      },
      activeStep: 1, // 当前活跃的步骤，可以根据需要动态设置
      // 教师信息
      teacher_data1: {
        name: '张三',
        id: '100900',
        date: '2023-09-12',
        time: '12:09:23'
      },
      // 学院研工办主任
      teacher_data2: {
        name: '刘洋',
        id: '100901',
        date: '2023-09-13',
        time: '11:09:23'
      },
      // 职能部门综合办主任
      teacher_data3: {
        name: '张莉莎',
        id: '100902',
        date: '2023-09-15',
        time: '12:09:23'
      },
      // 学院分管研究生工作副院长
      teacher_data4: {
        name: '林朝阳',
        id: '100903',
        date: '2023-11-16',
        time: '12:09:23'
      },
      // 研究生招生考务科科长
      teacher_data5: {
        name: '陈晨',
        id: '100904',
        date: '2023-10-19',
        time: '12:09:23'
      },
      roletype: 0,
      recordVisible1: false,
      recordVisible2: false,
      recordVisible3: false
    }
  },
  methods: {
    handlesubmit () {
      // 如果所有必填字段都填写，则继续提交表单
      this.fetchUserType()
      if (!this.form.id || !this.form.qualification || !this.form.tel || !this.form.spare_tel || !this.form.date || !this.form.sex || !this.form.campus || !this.form.promise) {
        Message({
          message: '信息未完整无法提交！',
          type: 'warning'
        })
      } else {
        this.$confirm('确认信息无误提交报名！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleConfirmation()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消报名'
          })
        })
      }
    },
    handleConfirmation () {
      this.$message({
        type: 'success',
        message: '提交成功!'
      })
      console.info(this.roletype)
      if (this.roletype === 1) {
        this.recordVisible1 = true
      } else if (this.roletype === 4) {
        this.recordVisible2 = true
      } else {
        this.recordVisible3 = true
      }
      console.info(this.recordVisible1)
      console.info(this.recordVisible2)
      console.info(this.recordVisible3)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getStatus (step) {
      if (step === 1) {
        return '提交完成'
      } else {
        return '待审批'
      }
    },
    ...mapActions('user', ['getUserType']),
    async fetchUserType () {
      try {
        const userType = await this.getUserType()
        console.info(userType)
        this.roletype = userType
        return userType
      } catch (error) {
        console.error('Failed to fetch user type:', error)
        return null // 或者返回一个默认值
      }
    }
  }
}
</script>

<style scoped>
.title {
    padding: 1rem;
    width: 95%;
    display: flex;
    justify-content: flex-start;
    flex: 0 1 auto; /* 让 selectbody 的高度根据内容自适应 */
}

.promisetext {
    width: 444px;
    height: 60px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 12px;
    color: #00000099;
    line-height: 20px;
}

.title1 {
    margin-left: 10px; /* 调整文本和按钮之间的间距 */
    margin-top: 5px;
    color: #00000066;
    font-size: 25px;
    font-face: PingFangSC;
    font-weight: 1000;
    line-height: 28px;
    letter-spacing: 0;
    paragraph-spacing: 0;
    text-align: right;
}

.title2 {
    margin-top: 5px;
    color: #000000e6;
    font-size: 25px;
    font-face: PingFangSC;
    font-weight: 1000;
    line-height: 28px;
    letter-spacing: 0;
    paragraph-spacing: 0;
    text-align: right;
}

.subtitle1 {
    width: 1000px;
    height: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 1000;
    font-size: 22px;
    color: #171717;
    text-align: left;
    line-height: 22px;
    margin-top: 30px;
}

.tag1 {
    width: 107px;
    height: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 1000;
    font-size: 26px;
    color: dodgerblue;
    text-align: left;
    line-height: 22px;
    margin-left: 20px;

}

.mainbody {
    width: 100%;
    height: 85%;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;

}

.tablebody {
    width: 60%;
    height: 100%;
    background-color: white;
    flex: 1 1 auto; /* 让 tablebody 占据剩余的所有空间 */
    /*overflow: auto;  当内容超出时，允许滚动 */
    margin-left: 20px;

}

.recordbody {
    width: 35%;
    height: 100%;
    background-color: white;
    flex: 1 1 auto; /* 让 recordbody 占据剩余的所有空间 */
    /*overflow: auto;  当内容超出时，允许滚动 */
    margin-right: 10px;
    margin-left: 10px;
}

.indexbody {
    width: 90%;
    height: 80%;
    background-color: white;
    flex: 1 1 auto; /* 让 indexbody 占据剩余的所有空间 */
    /*overflow: auto;  当内容超出时，允许滚动 */
    margin-top: 45px;
    margin-right: 20px;
    margin-left: 30px;
}

.sortbtn {
    display: flex;
    height: 80%;
    margin-top: 20px;
}

.custom-form .el-radio__label,
.custom-form .el-checkbox__label,
.custom-form .el-date-editor--date input {
    font-size: 16px; /* 调整单选框、复选框和日期选择器字体大小 */
}

.custom-form .el-form-item__label {
    font-size: 16px; /* 调整标签字体大小 */
}

.custom-form .el-input__inner {
    font-size: 16px; /* 调整输入框字体大小 */
}

.body {
    height: 100%;
}

.table {
    margin-top: 30px;
    font-size: 30px;

}

.info-box {
    width: 490px;
    height: 116px;
    background: #FFFFFF;
    box-shadow: 0 1px 6px 2px #7c829224;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-left: 20px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.footer {
    width: 100%;
    height: 10%;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
}

.submitbtn {
    margin-left: 40px;
    font-size: 25px;
}

.required-star {
    color: red;
    margin-left: 5px;
}

.title2 {
    display: flex;
    align-items: center;
}
</style>
