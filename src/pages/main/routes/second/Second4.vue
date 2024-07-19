<template>
    <div class="body">
        <span class="title">监考通知确认情况</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" plain class="shu" icon="el-icon-document" @click="outdata">数据导出</el-button>
                <el-input placeholder="请输入考场名称关键词查询" v-model="query.examRoom" class="shuru"></el-input>
                <el-button type="primary" class="shu2" style="background-color:dodgerblue;" @click="getList">查询</el-button>
                <el-button type="primary" plain class="shu1" @click="resetData">重置</el-button>
                <div class="table-container">
                    <el-table @selection-change="handleSelelctionChange" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
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
                        <el-table-column label="考场名称">
                            <template slot-scope="scope">
                                <span v-html="highlightSearchTerm(scope.row.examRoom)"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="examId" label="考场编号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="totalnum" label="通知人数" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="count" label="通知已确认人数" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="fromTime" label="报名开始时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="endTime" label="报名结束时间" show-overflow-tooltip></el-table-column>
                        <el-table-column label=" 考试状态">
                            <template slot-scope="scope">
                                <el-tag :type="getStatusType(scope.row)" class="status-tag">{{ getStatusText(scope.row) }}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
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
                <!-- 预览对话框 -->
                <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                    <el-table :data="selectedData" style="width: 100%;">
                        <el-table-column label="考场名称">
                            <template slot-scope="scope">
                                <span v-html="highlightSearchTerm(scope.row.examRoom)"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="examId" label="考场编号">
                        </el-table-column>
                        <el-table-column prop="totalnum" label="通知人数">
                        </el-table-column>
                        <el-table-column prop="count" label="通知已确认人数">
                        </el-table-column>
                        <el-table-column prop="fromTime" label="报名开始时间"></el-table-column>
                        <el-table-column prop="endTime" label="报名结束时间"></el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
        <el-button @click="isExportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExportExcel">确认导出</el-button>
      </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {_removeBatch, _removeBatchs, _getEms, _getEms1} from '../../../../api/user'
import * as XLSX from 'xlsx'

export default {
  data () {
    return {
      activeName: 'second',
      total: 0,
      dialogVisible: false,
      selectedData: [],
      isExportDialogVisible: false,
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
        examRoom: ''
      }
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
    sg (value) {
      // 这的value就是选中的数据构成的数组
      this.selectdata = value
    },
    removeBatchs () {
      this.$confirm('此操作将永久删除该批次, 是否继续?', '提示', {
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
      if (this.query.examRoom !== '' || this.query !== null) {
        _getEms(this.query.pageNo, this.query.pageSize, this.query.examRoom).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
        })
      } else {
        _getEms1(this.query.pageNo, this.query.pageSize).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
        })
      }
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    resetData () {
      this.query.examRoom = ''
      this.getList()
    },
    highlightSearchTerm (text) {
      if (!this.query.batchName) return text
      const regex = new RegExp(`(${this.query.batchName})`, 'gi')
      return text.replace(regex, '<span class="highlight">$1</span>')
    },
    getStatusType (row) {
      const now = this.now
      const start = new Date(row.fromTime)
      const end = new Date(row.endTime)
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
      const start = new Date(row.fromTime)
      const end = new Date(row.endTime)
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
    width: 160px;
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
    background-color: #ffffff;
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
.shuru {
    position: absolute;
    right: 170px;
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
