<template>
    <div class="body">
        <div class="title">
            <el-button type="primary" icon="el-icon-arrow-left" @click="returnclick">返回</el-button>
            <span class="title1">监考报名/</span>
            <span class="title2">提交报名</span>
        </div>
        <div class="mainbody">
            <div class="tablebody">
                <div class="subtitle1">
                    <span class="tag1">|</span>
                    <span class="subtitle1">武汉理工大学研究生招生考试监考人员报名表</span><br>
                </div>
                <div class="subtitle1">
                    <span class="tag1">|</span>
                    <span class="subtitle1">报名监考批次：{{ this.batch.batchName }}</span><br>
                </div>
                <div class="table">
                    <el-form ref="form" :model="personnelData" label-width="80px" label-position="left" class="custom-form"
                             font-size="30px">
                        <el-form-item label="考试编号" :style="{ paddingLeft: '10px' }" required>
                            <el-select v-model="value" placeholder="请选择" @change="handleChange">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="姓名" :style="{ paddingLeft: '10px' }" required>
                            <el-input v-model="personnelData.name" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.name" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="所在单位" required>
                            <el-input v-model="personnelData.unit" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.unit" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="性别" required>
                            <el-radio-group v-model="personnelData.gender" style="margin-left: 100px;">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                            <span v-if="!personnelData.gender" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="工号" required>
                            <el-input v-model="personnelData.username" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.username" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="学历" required>
                            <el-input v-model="personnelData.eduBackground" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.eduBackground" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="联系电话" required>
                            <el-input v-model="personnelData.phone" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.phone" class="required-star">*</span>
                        </el-form-item>
                        <el-form-item label="备用电话" required>
                            <el-input v-model="personnelData.backupPhone" style="width: 400px; margin-left: 100px;"></el-input>
                            <span v-if="!personnelData.backupPhone" class="required-star">*</span>
                        </el-form-item>
<!--                        <el-form-item label="出生年月" required>-->
<!--                            <el-col :span="11" style="margin-left: 100px;">-->
<!--                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"-->
<!--                                                style="width: 100%;"></el-date-picker>-->
<!--                            </el-col>-->
<!--                            <span v-if="!form.date" class="required-star">*</span>-->
<!--                        </el-form-item>-->
                        <el-form-item label="上传电子照片" required>
                            <el-upload
                                    action="/file/upload"
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
                            <el-radio-group v-model="this.examdetail.campus" style="margin-left: 100px;">
                                <el-radio label="兴庆校区" v-if="this.examdetail.campus==='兴庆校区'"></el-radio>
                                <el-radio label="雁塔校区" v-if="this.examdetail.campus==='雁塔校区'"></el-radio>
                                <el-radio label="曲江校区" v-if="this.examdetail.campus==='曲江校区'"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="申请人承诺" required>
                            <el-col :span="11" style="margin-left: 100px;">
                                    <el-checkbox v-model="promise">本人自愿参加</el-checkbox>
                                <el-col :span="24" style="margin-top: 0; padding-top: 5px;">
                                    <small class="promisetext">本人自愿参加研究生入学考试监考工作，认真学习掌握工作纪律要求，严格遵守《国家教育考试考务安全保密工作规定》，切实遵守监考工作守则，按照考务工作安排，完成监考工作。</small>
                                </el-col>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <!--        // 正在提交报名-->
        <div class="footer" v-if="issubmitVisible">
            <el-button type="primary" class="submitbtn" @click="handlesubmit">提交报名</el-button>
        </div>
        <!--        // 提交成功-->
        <div class="footer" v-if="issuccessVisible">
            <el-alert
                    title="报名成功！"
                    type="success"
                    description="请关注审批进度！"
                    show-icon
                    style="height: 80%;font-size: larger">
            </el-alert>
        </div>
        <!--        //报名失败-->
        <div class="footer" v-if="isunsuccessVisible">
            <el-alert
                    title="报名失败！"
                    type="error"
                    show-icon
                    style="height:300px;font-size: 20px;">
            </el-alert>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import {_commitSignup, _getBatch, _getBatchDetail, _getExamDetail, _getUserData} from '../../../../api/api'

export default {
  name: 'Third4',
  data () {
    return {
      batchid: this.$route.query.ids,
      username: this.$route.query.username,
      issubmitVisible: true,
      issuccessVisible: false,
      isunsuccessVisible: false,
      batch: [], // 该批次
      exams: [], // 该批次所有考试
      options: [], // 考试选择框
      value: '', // 选择框的值
      examdetail: [], // 选定考试的信息
      activeStep: 1, // 当前活跃的步骤，可以根据需要动态设置
      personnelData: [], // 当前用户个人信息
      promise: false
    }
  },
  created () {
    this.fetchData2()
    this.fetchData1()
    this.fetchData3()
  },
  computed: {
  },
  methods: {
    handlesubmit () {
      if (!this.personnelData.name || !this.personnelData.username) {
        Message({
          message: '信息未完整无法提交！',
          type: 'warning'
        })
      } else {
        if (!this.promise) {
          this.$message({
            type: 'warning',
            message: '请同意报名协议！'
          })
        } else {
          this.$confirm('确认信息无误提交报名！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.handlefinalsubmit()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消报名'
            })
          })
        }
      }
    },
    handlefinalsubmit () {
      const submit = {
        approvalStatus: 1,
        examId: this.value,
        intendedCampus: this.examdetail.campus,
        isComfirm: 0,
        isOut: 0,
        name: this.personnelData.name,
        reson: '无',
        username: this.personnelData.username,
        way: '自主报名',
        dialogImageUrl: ''
      }
      _commitSignup(submit).then(res => {
        if (res.data == null) {
          this.$message({
            type: 'success',
            message: '提交成功!请前往个人主页查看'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '您已经报名过该场监考，请前往个人主页查看！'
          })
        }
      })
      // 报名失败在这里添加逻辑让其显示报名失败
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (res) {
      this.dialogImageUrl = res.url
      this.dialogVisible = true
    },
    getStatus (step) {
      if (step < this.activeStep) {
        if (step === 1) {
          return '提交完成'
        } else {
          return '审批完成'
        }
      } else if (step === this.activeStep) {
        if (step === 1) {
          return '正在提交'
        } else {
          return '正在审批'
        }
      } else {
        return '待审批'
      }
    },
    returnclick () {
      this.$router.push({
        path: '/main/third1'
      })
    },
    async fetchData2 () {
      _getBatchDetail(this.batchid).then(res => {
        this.batch = res.data
      })
    },
    async fetchData1 () {
      _getBatch(this.batchid).then(res => {
        this.exams = res.data
        this.processData()
        console.info(this.exams)
      })
    },
    async fetchData3 () {
      _getUserData(this.username).then(res => {
        this.personnelData = res.data
      })
    },
    processData () {
      this.options = this.exams.map(item => ({
        value: item.examId,
        label: item.examId + '.' + item.examRoom
      }))
    },
    handleChange () {
      console.log(this.value)
      _getExamDetail(this.value).then(res => {
        this.examdetail = res.data
      })
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
