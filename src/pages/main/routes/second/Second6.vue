<template>
    <div class="body">
        <span class="title">部门与角色管理</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" plain class="shu" icon="el-icon-document" @click="outdata">数据导出</el-button>
<!--                <el-button type="primary" plain class="shu" @click="dialogVisible = true">添加部门</el-button>-->
<!--                <el-dialog-->
<!--                    title="添加部门"-->
<!--                    :visible.sync="dialogVisible"-->
<!--                    width="40%"-->
<!--                    :before-close="handleClose">-->
<!--                    <div>-->
<!--                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  label-position="left" class="demo-ruleForm" >-->
<!--                            <el-form-item label="部门名称" prop="name" required>-->
<!--                                <el-input placeholder="请输入部门名称" v-model="ruleForm.name"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="部门代码" prop="bmdm" required>-->
<!--                                <el-input placeholder="请输入部门代码" v-model="ruleForm.bmdm"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="部门类型" prop="bmlx" required>-->
<!--                                <el-input placeholder="请输入部门类型" v-model="ruleForm.bmlx"></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </div>-->
<!--                    <hr>-->
<!--                    <span slot="footer" class="dialog-footer">-->
<!--                         <div class="horizontal-line"></div>-->
<!--                         <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:dodgerblue;">提交</el-button>-->
<!--                         <el-button @click="dialogVisible = false">取消</el-button>-->
<!--                    </span>-->
<!--                </el-dialog>-->
<!--                <el-input-->
<!--                    placeholder="请输入部门名称/代码查询"-->
<!--                    v-model="query.unit"-->
<!--                    class="shuru">-->
<!--                </el-input>-->
<!--                <el-button type="primary" class="shu2" style="background-color:dodgerblue;" @click="getList">查询</el-button>-->
<!--                <el-button type="primary" plain class="shu1" @click="resetData1">重置</el-button>-->
                <div class="table-container"><el-table
                    ref="multipleTable"
                    :data="units"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelelctionChange">
                    <el-table-column
                        type="selection"
                        width="25px"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="序号">
                        <template slot-scope="scope">
                            {{scope.$index + 1 + (query.pageNo - 1) * query.pageSize}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="unit"
                        label="部门名称"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="部门地址">
                        <template slot-scope="scope">
                            西安交通大学
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="成员人数"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                        <el-button type="text" @click="openMemberlist(scope.row)">查看成员</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                    <!-- 预览对话框 -->
                    <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                        <el-table :data="selectedData" style="width: 100%;">
                            <el-table-column prop="unit" label="部门名称">
                            </el-table-column>
                            <el-table-column prop="count" label="通知已确认人数">
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
        <el-button @click="isExportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExportExcel">确认导出</el-button>
      </span>
                    </el-dialog>
                    <div class="pagination-container">
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="query.pageNo"
                            :page-sizes="[10,20,30,40]"
                            :page-size="query.pageSize"
                            layout="total,sizes,prev, pager, next"
                            :total="total"
                            class="ye">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {_selectUnit} from '../../../../api/user'
import * as XLSX from 'xlsx'

export default {
  data () {
    return {
      total: 0,
      activeName: 'second',
      value: '',
      dialogVisible: false,

      selectedData: [],
      isExportDialogVisible: false,
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
      units: [],
      query: {
        pageNo: 1,
        pageSize: 10
      },
      sunit: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleSelelctionChange (val) {
      this.selectedIds = val.map(item => item.id)
      // 处理表格选择变化
      this.selectedData = val
    },
    // 导出数据的方法
    outdata () {
      if (this.selectedData.length > 0) {
        this.isExportDialogVisible = true
      } else {
        this.$message.warning('请选择要导出的数据')
      }
    },
    // 确认导出的方法
    confirmExportExcel () {
      const ws = XLSX.utils.json_to_sheet(this.selectedData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, 'export.xlsx')
      this.isExportDialogVisible = false
    },
    getList () {
      _selectUnit(this.query.pageNo, this.query.pageSize).then(res => {
        console.info(res)
        this.units = res.data.data
        this.total = res.data.total
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getList()
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
    openMemberlist (row) {
      this.sunit = row.unit
      this.$router.push({
        path: '/main/second_MemberList?unit=' + this.sunit
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
      this.getList()
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
