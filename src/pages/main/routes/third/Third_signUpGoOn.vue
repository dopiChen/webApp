<template>
    <div class="recordbody">
        <div class="title2">
            <div class="btn">
                <el-button type="primary" icon="el-icon-arrow-left" @click="returnclick" style="height: 70%;margin-top: 15px">返回</el-button>
                <div class="subtitle1" style="margin-bottom: 20px">
                    <span class="tag1">|</span>
                    <span class="subtitle1">审批进程</span><br>
                </div>
            </div>
            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            <div class="subtitle1" style="margin-top: 40px">
                <span class="tag1">|</span>
                <span class="subtitle1">您的监考申请：</span><br>
            </div>
            <div class="examdetails" style="margin-left: 50px;margin-top: 50px">
                <div class="subtitle1">
                    <span class="subtitle1">考试编号：{{ examdetail.examId }}</span><br>
                </div>
                <div class="subtitle1">
                    <span class="subtitle1">考场：{{ examdetail.examRoom }}</span><br>
                </div>
                <div class="subtitle1">
                    <span class="subtitle1">考试开始时间：{{ examdetail.fromTime }}</span><br>
                </div>
                <div class="subtitle1">
                    <span class="subtitle1">考试结束时间：{{ examdetail.endTime }}</span><br>
                </div>
                <div class="subtitle1" v-if="signupdetail.isOut!=1 && signupdetail.approvalStatus<5">
                    <span class="info1">您的申请正在审批中，请耐心等待！</span><br>
                </div>
                <div class="subtitle1" v-if="signupdetail.isOut!=1 && signupdetail.approvalStatus===5">
                    <span class="info2">您的申请已通过，请尽快确认！</span><br>
                </div>
                <div class="subtitle1" v-if="signupdetail.isOut===1">
                    <span class="info3">您的申请已被拒绝！</span><br>
                </div>
                <div class="subtitle1" v-if="signupdetail.isOut===1">
                    <span class="info3" style="margin-top:20px">拒绝理由：</span><br>
                    <span class="info4">{{examdetail.reson}}</span>
                </div>
            </div>
        </div>
        <div class="indexbody" style="margin-right: 100px">
            <div style="height: 1000px;width: 100%">
                <el-steps direction="vertical" :active=activeStep style="font-size: 18px">
                    <el-step title="步骤 1">
                        <template #description>
                            <div class="info-box">
                                <img src="../../../../../src/assets/images/teacher1.jpg" class="avatar"
                                     alt="Avatar" style="width: 40px;height: 40px;">
                                <div :class="{ 'red-text': getStatus(1) === '审批失败' }" style="font-size: 15px">
                                    <p>发起人</p>
                                    <p>{{ teacherdata.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ teacherdata.username }}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p>状态: {{ getStatus(1) }}</p>
                                </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="步骤 2">
                        <template #description>
                            <div class="info-box">
                                <img src="../../../../../src/assets/images/teacher2.jpg" class="avatar"
                                     alt="Avatar" style="width: 40px;height: 40px;">
                                <div :class="{ 'red-text': getStatus(2) === '审批失败' }" style="font-size: 15px">
                                    <p>审批人(学院研工办主任)</p>
                                    <p>{{leaderData[0].personnel.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ leaderData[0].personnel.username  }}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p>状态: {{ getStatus(2) }}</p>
                                </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="步骤 3">
                        <template #description >
                            <div class="info-box">
                                <img src="../../../../../src/assets/images/teacher3.jpg" class="avatar"
                                     alt="Avatar" style="width: 40px;height: 40px;">
                                <div :class="{ 'red-text': getStatus(3) === '审批失败' }" style="font-size: 15px">
                                    <p>审批人(职能部门综合办主任)</p>
                                    <p>{{ leaderData[1].personnel.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ leaderData[1].personnel.username  }}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p>状态: {{ getStatus(3) }}</p>
                                </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="步骤 4">
                        <template #description>
                            <div class="info-box" style="font-size: 15px">
                                <img src="../../../../../src/assets/images/teacher4.jpg" class="avatar"
                                     alt="Avatar" style="width: 40px;height: 40px;">
                                <div :class="{ 'red-text': getStatus(4) === '审批失败' }" style="font-size: 15px">
                                    <p>审批人(学院分管研究生工作副院长)</p>
                                    <p>{{ leaderData[2].personnel.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ leaderData[2].personnel.username  }}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p>状态: {{ getStatus(4) }}</p>
                                </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="步骤 5">
                        <template #description>
                            <div class="info-box">
                                <img src="../../../../../src/assets/images/teacher5.jpg" class="avatar"
                                     alt="Avatar" style="width: 40px;height: 40px;">
                                <div :class="{ 'red-text': getStatus(5) === '审批失败' }" style="font-size: 15px">
                                    <p>审批人(研究生招生考务科科长)</p>
                                    <p>{{ leaderData[3].personnel.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ leaderData[3].personnel.username  }}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p>状态: {{ getStatus(5) }}</p>
                                </div>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
        </div>

    </div>
</template>

<script>
import {_getExamDetail, _getLeaders, _getOneSignUp, _getUserData} from '../../../../api/api'

export default {
  name: 'Third_signUpGoOn',
  data () {
    return {
      username: this.$route.query.username,
      examId: this.$route.query.examId,
      examdetail: [],
      teacherdata: [],
      signupdetail: [],
      // 教师信息
      teacher_data1: {
        name: '张三',
        id: '100900',
        date: '2023-09-12',
        time: '12:09:23'
      },
      leaderData: [],
      activeStep: 1
    }
  },
  created () {
    this.fetchData1()
    this.fetchData2()
    this.fetchData3()
    this.fetchData4()
  },
  methods: {
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
          if (this.signupdetail.isOut === 1) {
            return '审批失败'
          } else {
            return '正在审批'
          }
        }
      } else {
        return '待审批'
      }
    },
    returnclick () {
      this.$router.push({name: 'third_submitrecord'})
    },
    async fetchData1 () {
      _getExamDetail(this.examId).then(res => {
        this.examdetail = res.data
      })
    },
    async fetchData2 () {
      _getUserData(this.username).then(res => {
        this.teacherdata = res.data
      })
    },
    async fetchData3 () {
      _getOneSignUp(this.username, this.examId).then(res => {
        this.signupdetail = res.data
        this.activeStep += this.signupdetail.approvalStatus
      })
    },
    async fetchData4 () {
      try {
        const res = await _getLeaders(this.username)
        this.leaderData = res.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
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
.btn{
    display: flex;
}

.recordbody {
    width: 90%;
    height: 100%;
    background-color: white;
    flex: 1 1 auto; /* 让 recordbody 占据剩余的所有空间 */
    /*overflow: auto;  当内容超出时，允许滚动 */
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
}

.indexbody {
    width: 90%;
    height: 80%;
    background-color: white;
    flex: 1 1 auto; /* 让 indexbody 占据剩余的所有空间 */
    /*overflow: auto;  当内容超出时，允许滚动 */
    margin-top: 80px;
    margin-right: 20px;
    margin-left: 30px;
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

.info1{
    color: #35bbf7;
}
.info2{
    color: #0dbd73;
}
.info3{
    color: red;
}
.info4{
    color: indianred;
}

.red-text {
    color: red;
}

.title2 {
    display: flex;
    align-items: center;
    flex-direction: column
}
</style>
