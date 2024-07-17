<template>
    <div class="body">
        <span class="title">监考通知确认情况</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" plain>数据导出</el-button>
                <el-input placeholder="请输入监考名称关键词查询" v-model="input" class="shuru" @keyup.enter="searchData"></el-input>
                <el-button type="primary" class="shu3" style="background-color:dodgerblue;" @click="searchData">查询</el-button>
                <el-button type="primary" plain class="shu2" @click="resetData">重置</el-button>
                <el-button type="primary" plain class="shu1" warning @click="removeBatchs">删除选中</el-button>
                <div class="table-container">
                    <el-table @selection-change="sg" ref="multipleTable" :data="paginatedData" tooltip-effect="dark" style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="25px"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">
                                {{scope.$index + 1 + (currentPage - 1) * pageSize}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="batchName" label="监考名称" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-html="highlightSearchTerm(scope.row.batchName)"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="batchId" label="批次代码" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="startDate" label="报名开始时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="endDate" label="报名结束时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="year" label="创建时间" show-overflow-tooltip></el-table-column>
                        <el-table-column label="批次状态">
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
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="filteredData.length"
                            class="ye">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import {_creatBatch, _getAllBatches, _removeBatch, _removeBatchs} from '../../../../api/user'

export default {
  data () {
    return {
      activeName: 'second',
      currentPage: 1,
      pageSize: 10,
      input: '',
      dialogVisible: false,
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
      filteredData: [],
      now: new Date(), // 新增的当前时间变量
      selectdata: []
    }
  },
  computed: {
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.filteredData.slice(start, end)
    }
  },
  created () {
    this.getList()
    this.debouncedSearch = debounce(this.searchData, 300)
  },
  methods: {
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
      _getAllBatches().then(res => {
        this.tableData = res.data
        this.filteredData = res.data
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      this.currentPage = val
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    searchData () {
      const searchQuery = this.input.toLowerCase()
      this.filteredData = this.tableData.filter(item => {
        return item.batchName.toLowerCase().includes(searchQuery)
      })
      this.currentPage = 1
    },
    resetData () {
      this.input = ''
      this.getList()
    },
    highlightSearchTerm (text) {
      if (!this.input) return text
      const regex = new RegExp(`(${this.input})`, 'gi')
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
    position: absolute;
    right: 120px;
}
.shu3 {
    position: absolute;
    right: 210px;
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
    right: 300px;
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
