<template>
    <div>
        <div class="title">
            <el-button type="primary" icon="el-icon-arrow-left">返回</el-button>
            <span class="title1">监考报名/</span>
            <span class="title2">监考批次详情</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Third3.vue'
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
.title1{
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
.title2{
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
</style>
