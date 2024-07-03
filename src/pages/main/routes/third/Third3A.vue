<template>
    <div class="body">
        <div class="title">
            <el-button type="primary" icon="el-icon-arrow-left" @click="returnclick">返回</el-button>
            <span class="title1">监考报名/</span>
            <span class="title2">监考批次详情</span>
        </div>
        <div class="detialbody">
            <span class="tag1">|</span>
            <span class="subtitle1">监考批次情况</span><br>
            <el-descriptions :column="1" class="custom1">
                <el-descriptions-item label="批次名称"> 2023年A楼2023监考报名</el-descriptions-item>
                <el-descriptions-item label="关联年份"> 2023年</el-descriptions-item>
                <el-descriptions-item label="批次开始时间">2023/09/30 00:00:00</el-descriptions-item>
                <el-descriptions-item label="批次结束时间">2023/09/30 00:00:00</el-descriptions-item>
                <el-descriptions-item label="批次时长">两天</el-descriptions-item>
                <el-descriptions-item label="监考说明">监考人员需要分别站在教室前后，在不影响考生情况下，适当走动。
                </el-descriptions-item>
                <el-descriptions-item label="附件">
                    <img src="../../../../../src/assets/images/email.jpg" alt="附件图片"
                         style="width: 16px; height: 16px;">
                    <router-link to="/path/to/your/route">
                        <el-link type="primary" class="tail">附件.docx</el-link>
                    </router-link>
                </el-descriptions-item>
            </el-descriptions>
            <span class="tag2">|</span>
            <span class="subtitle1">考场安排</span><br>
            <el-descriptions :column="1" class="custom2">
                <el-descriptions-item label="考场名称"> 3楼第一考场</el-descriptions-item>
                <el-descriptions-item label="校区"> 南湖校区</el-descriptions-item>
                <el-descriptions-item label="校内地址">南湖4-111</el-descriptions-item>
                <el-descriptions-item label="监考时间">2023/09/30 00:08:00</el-descriptions-item>
                <el-descriptions-item label="批次时长">两天</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Third3.vue',
  methods: {
    returnclick () {
      this.$router.push('/main/third/third1')
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
    width: 107px;
    height: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 1000;
    font-size: 26px;
    color: #171717;
    text-align: left;
    line-height: 22px;
}

.subtitle2 {
    width: 107px;
    height: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 1000;
    font-size: 26px;
    color: #171717;
    text-align: left;
    line-height: 22px;
}

.detialbody {
    padding: 1rem;
    width: 95%;
    background-color: white;
    margin-left: 50px;
    height: 100%;
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

.tag2 {
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

.custom1 {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 22px;
    margin-left: 20px;
}

.custom2 {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 22px;
    margin-left: 20px;
    flex: 1 1 auto; /* 让 tablebody 占据剩余的所有空间 */
    overflow: auto; /* 当内容超出时，允许滚动 */
}

.custom1.el-descriptions-item__label {
    font-size: 28px; /* 调整为你想要的字体大小 */
    font-weight: bold; /* 加粗字体 */
    margin-left: 20px;
}

.tail {
    margin-left: 5px;
    font-size: 20px;
}

.body {
    height: 100%;
}

</style>
