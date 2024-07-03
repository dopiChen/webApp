<template>
    <div class="body">
        <span class="title">报名审批</span>
        <div class="top">
            <div class="top1">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待我审批" name="first">
                        <el-button type="primary" icon="el-icon-user-solid">邀约</el-button>
                        <el-button type="primary" plain class="shu">数据导出</el-button>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="30px">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="序号"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="报名人"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="num"
                                label="工号"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="jkpc"
                                label="监考批次"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="yxjkxq"
                                label="意向监考校区"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                label="上传材料">
                                <el-button type="text" >上传材料</el-button>
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <el-button type="text" >操作</el-button>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="同意报名" name="second">
                    </el-tab-pane>
                    <el-tab-pane label="不同意报名" name="third">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second',
      tableData: [{
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区',
        sccl: 200333,
        cz: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    indexMethod (index) {
      return index + 1
    }
  }
}
</script>

<style scoped>

.title {
    width: 80px;
    height: 28px;
    font-weight: 500;
    font-size: 20px;
    color: #000000e6;
    text-align: right;
    line-height: 28px;
    position: absolute;
    left:24px;
    top:18px;
}
.body{
    height: 100%;
}
.top{
    background: #FFFFFF;
    position: absolute;
    left:24px;
    top:64px;
    right:24px;
    bottom:24px;
}
.top1{
    height: 48px;
    background: #FFFFFF;
    position: absolute;
    left:32px;
    right: 32px;
    top:16px;
}
.shu{
    background-color: #ffffff;
}
</style>
