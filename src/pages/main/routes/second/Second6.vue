<template>
    <div class="body">
        <span class="title">部门与角色管理</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" icon="el-icon-search" style="background-color:dodgerblue;">快速找人</el-button>
                <el-button type="primary" plain class="shu" @click="dialogVisible = true">添加部门</el-button>
                <el-dialog
                    title="添加部门"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="handleClose">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  label-position="left" class="demo-ruleForm" >
                            <el-form-item label="部门名称" prop="name" required>
                                <el-input placeholder="请输入部门名称" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="部门代码" prop="bmdm" required>
                                <el-input placeholder="请输入部门代码" v-model="ruleForm.bmdm"></el-input>
                            </el-form-item>
                            <el-form-item label="部门类型" prop="bmlx" required>
                                <el-input placeholder="请输入部门类型" v-model="ruleForm.bmlx"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <hr>
                    <span slot="footer" class="dialog-footer">
                         <div class="horizontal-line"></div>
                         <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:dodgerblue;">提交</el-button>
                         <el-button @click="dialogVisible = false">取消</el-button>
                    </span>
                </el-dialog>
                <el-button type="primary" plain class="shu4">数据导出</el-button>
                <el-input
                    placeholder="请输入部门名称/代码查询"
                    v-model="input"
                    class="shuru">
                </el-input>
                <el-button type="primary" class="shu2" style="background-color:dodgerblue;" @click="searchData1">查询</el-button>
                <el-button type="primary" plain class="shu1" @click="resetData1">重置</el-button>
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
                        label="部门名称"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="bmdm"
                        label="部门代码">
                    </el-table-column>
                    <el-table-column
                        prop="bmlx"
                        label="部门类型"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="cyrs"
                        label="成员人数"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <el-button type="text" @click="openMemberlist">查看成员</el-button>
                        <el-dropdown>
                                    <span class="el-dropdown-link">
                                     更多<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
        bmdm: '',
        bmlx: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        bmdm: [
          { required: true, message: '请输入部门代码', trigger: 'change' }
        ],
        bmlx: [
          { required: true, message: '请输入部门类型', trigger: 'change' }
        ]
      },
      fliterData1: [],
      tableData: [
        {
          name: 'A部门',
          bmdm: 'xy1001',
          bmlx: '行政部门',
          cyrs: '4'
        },
        {
          name: 'A学院',
          bmdm: 'xy1002',
          bmlx: '教学部门',
          cyrs: '3'
        },
        {
          name: 'B部门',
          bmdm: 'xy1003',
          bmlx: '行政部门',
          cyrs: '6'
        },
        {
          name: 'B学院',
          bmdm: 'xy1004',
          bmlx: '教学部门',
          cyrs: '2'
        },
        {
          name: 'A部门',
          bmdm: 'xy1001',
          bmlx: '行政部门',
          cyrs: '4'
        }
      ]
    }
  },
  computed: {
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.fliterData1.slice(start, end)
    }
  },
  mounted () {
    this.fliterData1 = this.tableData
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.tableData.push({ ...this.ruleForm })
          this.dialogVisible = false
          this.$refs.ruleForm.resetFields()
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
    openMemberlist () {
      this.$router.push({
        path: '/main2/second/second_MemberList'
      })
    },
    // 搜索函数
    searchData1 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData1 = this.tableData.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) || item.bmdm.toLowerCase().includes(searchQuery)
      })
    },
    resetData1 () {
      this.input = ''
      this.fliterData1 = this.tableData
    }
  }
}
</script>

<style scoped>
.title {
    width: 150px;
    height: 28px;
    font-weight: 500;
    font-size: 20px;
    color: #000000e6;
    text-align: right;
    line-height: 28px;
    position: absolute;
    left: 24px;
    top: 18px;
}
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
.shu4 {
    background-color: #ffffff;
    position: absolute;
    left: 235px;
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 15px;
}
.dialog-footer {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
</style>
