<template>
    <div class="body">
        <span class="title">批次管理</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" style="background-color:dodgerblue;"  @click="dialogVisible = true" icon="el-icon-circle-plus-outline">创建批次</el-button>
                <el-dialog
                    title="创造监考报名批次"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="handleClose">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" label-position="left" class="demo-ruleForm">
                            <el-form-item label="批次名称" prop="name">
                                <el-input placeholder="请输入批次名称" v-model="ruleForm.batchName"></el-input>
                            </el-form-item>
                            <el-form-item label="批次开始时间" required>
                                <el-date-picker
                                    v-model="ruleForm.startDate"
                                    type="datetime"
                                    placeholder="请选择批次开始时间"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="批次结束时间" required>
                                <el-date-picker
                                    v-model="ruleForm.endDate"
                                    type="datetime"
                                    placeholder="请选择批次结束时间"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="批次说明">
                                <el-input type="textarea" placeholder="请输入批次说明" v-model="ruleForm.description" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:dodgerblue;">提交</el-button>
                        <el-button @click="dialogVisible = false">取消</el-button>
                    </span>
                </el-dialog>
                <el-button type="primary" plain class="shu" @click="outdata">数据导出</el-button>
              <el-button type="primary" plain class="shu" @click="dialogVisible1 = true">数据导入</el-button>
              <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible1"
                  width="30%">
                <div class="upload">
                <el-upload
                    class="shu"
                    action="/file/upload/excel/batch"
                    :show-file-list="false"
                    :before-upload="handleLimit"
                    :on-success="handleSuccess">
                  <el-button type="primary" plain class="shu" >批次导入</el-button>
                </el-upload>
                <el-upload
                    class="shu"
                    action="/file/upload/excel"
                    :show-file-list="false"
                    :before-upload="handleLimit"
                    :on-success="handleSuccess">
                  <el-button type="primary" plain class="shu" >考场导入</el-button>
                </el-upload>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible1 = false">返 回</el-button>
  </span>
              </el-dialog>
                <el-input placeholder="请输入监考名称关键词查询" v-model="query.batchName" class="shuru"></el-input>
                <el-input placeholder="请输入监考名称关键词查询" rr8era87rwetyas v-model="query.batchName" class="shuru"></el-input>
                <el-button type="primary" class="shu3" style="background-color:dodgerblue;" @click="getList">查询</el-button>
                <el-button type="primary" plain class="shu2" @click="resetData">重置</el-button>
                <el-button type="primary" plain class="shu1" warning @click="removeBatchs">删除选中</el-button>
                <div class="table-container">
                    <el-table @selection-change="sg" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
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
                        <el-table-column prop="batchName" label="批次名称" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-html="highlightSearchTerm(scope.row.batchName)"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="batchId" label="批次代码" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="startDate" label="报名开始时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="endDate" label="报名结束时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="year" label="创建时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="description" label="批次说明"></el-table-column>
                        <el-table-column label="批次状态">
                            <template slot-scope="scope">
                                <el-tag :type="getStatusType(scope.row)" class="status-tag">{{ getStatusText(scope.row) }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button type="text" @click="removeBatch(scope.row.batchId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                        <el-table :data="selectdata" style="width: 100%;">
                            <el-table-column prop="batchName" label="批次名称" >
                            </el-table-column>
                            <el-table-column prop="batchId" label="批次代码" >
                            </el-table-column>
                            <el-table-column prop="startDate" label="报名开始时间"></el-table-column>
                            <el-table-column prop="endDate" label="报名结束时间" ></el-table-column>
                            <el-table-column prop="year" label="创建时间"></el-table-column>
                            <el-table-column prop="description" label="批次说明"></el-table-column>
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
                            layout="total, sizes, prev, pager, next"
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
import {_creatBatch, getBatchList, _removeBatch, _removeBatchs} from '../../../../api/user'
import * as XLSX from 'xlsx'

export default {
  data () {
    return {
      isExportDialogVisible: false,
      fileList: [],
      activeName: 'second',
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: {
        attachment: 'string',
        batchId: 0,
        batchName: '',
        description: '',
        endDate: '',
        startDate: '',
        year: 2024
      },
      rules: {
        name: [
          { required: true, message: '请输入批次名称', trigger: 'blur' }
        ],
        year: [
          { required: true, message: '请选择关联年份', trigger: 'change' }
        ],
        bmkssj: [
          { required: true, message: '请输入批次开始时间', trigger: 'change' }
        ],
        bmjssj: [
          { required: true, message: '请输入批次结束时间', trigger: 'change' }
        ]
      },
      tableData: [],
      now: new Date(), // 新增的当前时间变量
      selectdata: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        batchName: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleSuccess (res, file) {
      this.$message.success('上传成功!')
      this.getList()
    },
    handleLimit (file) {
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      console.log(isXLSX)
      if (!isXLSX) {
        this.$message.error('上传头像图片只能是 xlsx 格式!')
      }
      return isXLSX
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 导出数据的方法
    outdata () {
      if (this.selectdata.length > 0) {
        this.isExportDialogVisible = true
      } else {
        this.$message.warning('请选择要导出的数据')
      }
    },
    // 确认导出的方法
    confirmExportExcel () {
      const ws = XLSX.utils.json_to_sheet(this.selectdata)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, 'export.xlsx')
      this.isExportDialogVisible = false
    },
    sg (value) {
      // 这的value就是选中的数据构成的数组
      this.selectedIds = value.map(item => item.id)
      this.selectdata = value
    },
    removeBatchs () {
      this.$confirm('此操作将永久删除所选中批次, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selectdata.map(tableData => tableData.batchId)
        let obj = {
          ids: ids
        }
        _removeBatchs(obj).then(res => {
          if (res.data === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
      })
    },
    removeBatch (id) {
      this.$confirm('此操作将永久删除该批次, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _removeBatch(id)
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getList () {
      getBatchList(this.query).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getList()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formName) {
      _creatBatch(this.ruleForm)
      this.dialogVisible = false
      this.getList()
    },
    resetData () {
      this.query.batchName = ''
      this.getList()
    },
    highlightSearchTerm (text) {
      if (!this.query.batchName) return text
      const regex = new RegExp(`(${this.query.batchName})`, 'gi')
      return text.replace(regex, '<span class="highlight">$1</span>')
    },
    getStatusType (row) {
      const now = this.now
      const start = new Date(row.startDate)
      const end = new Date(row.endDate)
      if (now < start) {
        return 'info'
      } else if (now > end) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    getStatusText (row) {
      const now = this.now
      const start = new Date(row.startDate)
      const end = new Date(row.endDate)
      if (now < start) {
        return '未开始'
      } else if (now > end) {
        return '已结束'
      } else {
        return '进行中'
      }
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
    left: 24px;
    top: 18px;
}
.body {
    height: 100%;
    overflow: auto; /* 当内容超出时，允许滚动 */
}
.top {
    background: #FFFFFF;
    position: absolute;
    left: 24px;
    top: 64px;
    right: 24px;
    bottom: 24px;
    overflow: auto; /* 当内容超出时，允许滚动 */
}
.top1 {
  display: inline;
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
    position: absolute;
    right: 0px;
}
.shu2 {
    background-color: #ffffff;
    position: absolute;
    right: 110px;
}
.shu3 {
    position: absolute;
    right: 190px;
}
.upload{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.table-container {
    position: relative;
    padding-bottom: 50px;
    overflow: auto; /* 当内容超出时，允许滚动 */
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
    overflow: auto; /* 当内容超出时，允许滚动 */
}
.shuru {
    position: absolute;
    right: 270px;
    width: 230px;
}
.scwj {
    background-color: #FFFFFF;
    position: absolute;
    left:0px;
}
.wjxianzhi {
    width: 261px;
    height: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #00000066;
    line-height: 20px;
}
.dialog-footer {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.highlight {
    background-color: yellow;
}
</style>
