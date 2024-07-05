<template>
    <div class="body">
        <el-button type="text" @click="returnclick" icon="el-icon-back" style="font-size: 30px;color: #d3dce6;margin-left:24px"></el-button>
        <span class="title1">监考安排表/</span>
        <span class="title2">监考详细名单</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" icon="el-icon-document"  style="background-color:dodgerblue;">导入监考信息</el-button>
                <el-button type="primary" plain class="shu" @click="dialogVisible = true">数据导出</el-button>
                <el-input
                        placeholder="请输入监考名称关键词查询"
                        v-model="input"
                        class="shuru">
                </el-input>
                <el-button type="primary" class="shu2"  style="background-color:dodgerblue;">查询</el-button>
                <el-button type="primary" plain class="shu1">重置</el-button>
                <div class="table-container"><el-table
                        ref="multipleTable"
                        :data="paginatedData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="25px"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            type="index"
                            :index="indexMethod"
                            label="序号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="xb"
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            prop="gh"
                            label="工号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="szdw"
                            label="所在单位"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="sfzh"
                            label="身份证号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="yddh"
                        label="移动电话"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="jkzz"
                        label="监考职责"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="jkcc"
                        label="监考场次"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="kcmc"
                        label="考场名称"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="jksj"
                        label="监考时间"
                        width="150">
                    </el-table-column>
                </el-table>
                    <div class="pagination-container">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10]"
                                :page-size="pageSize"
                                layout="prev, pager, next"
                                :total="tableData.length"
                                class="ye">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second',
      currentPage: 1,
      pageSize: 10,
      value: '',
      input: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '计算机智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '1',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '艺术学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '2',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '人工智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '4',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '艺术学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '2',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '计算机智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '1',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '人工智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '3',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '计算机智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '2',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '艺术学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '1',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '人工智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '2',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '艺术学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '4',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '计算机智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '3',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '人工智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '2',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        },
        {
          name: '王家栋',
          xb: '男',
          gh: '34099001',
          szdw: '计算机智能学院',
          sfzh: '370345198009091234',
          yddh: '18789000998',
          jkzz: '副监考',
          jkcc: '1',
          kcmc: 'A栋301',
          jksj: '12月25日全天-12月26日全天'
        }
      ]
    }
  },
  computed: {
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.tableData.slice(start, end)
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleClick1 () {
      alert('button click')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    returnclick () {
      this.$router.push({
        path: '/main/second/second3'
      })
    }
  }
}
</script>

<style scoped>
.body {
    height: 100%;
}
.top {
    background: #FFFFFF;
    position: absolute;
    left: 24px;
    top: 64px;
    right: 24px;
    bottom: 24px;
}
.top1 {
    height: 48px;
    background: #FFFFFF;
    position: absolute;
    left: 32px;
    right: 32px;
    top: 18px;
    bottom:16px;
}
.shu {
    background-color: #ffffff;
}
.shu1 {
    background-color: #ffffff;
    position: absolute;
    right: 0px;
}
.shu2 {
    position: absolute;
    right: 85px;
}
.table-container {
    position: relative;
    padding-bottom: 50px;
}
.pagination-container {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    background: white;
}
.shuru{
    position: absolute;
    right: 172px;
    width: 230px;
}
.title1 {
    margin-left: 10px;
    margin-top: 5px;
    color: #00000066;
    font-size: 25px;
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
    font-weight: 1000;
    line-height: 28px;
    letter-spacing: 0;
    paragraph-spacing: 0;
    text-align: right;
}

</style>
