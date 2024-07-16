<template>
    <div class="body">
        <span class="title">监考管理</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" icon="el-icon-search" style="background-color:dodgerblue;">快速找人</el-button>
                <el-button type="primary" plain class="shu" @click="dialogVisible = true">创建批次</el-button>
                <el-dialog
                    title="创造监考报名批次"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="handleClose">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" label-position="left" class="demo-ruleForm">
                            <el-form-item label="批次名称" prop="name">
                                <el-input placeholder="请输入批次名称" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="关联年份" prop="year">
                                <el-date-picker
                                    v-model="ruleForm.year"
                                    type="year"
                                    placeholder="请选择关联年份"
                                    :clearable="false"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="批次开始时间" required>
                                <el-date-picker
                                    v-model="ruleForm.bmkssj"
                                    type="datetime"
                                    placeholder="请选择批次开始时间"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="批次结束时间" required>
                                <el-date-picker
                                    v-model="ruleForm.bmjssj"
                                    type="datetime"
                                    placeholder="请选择批次结束时间"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="监考说明">
                                <el-input type="textarea" placeholder="请输入监考说明" v-model="ruleForm.jksm" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="上传附件">
                                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
                                    <el-button size="small" type="primary" class="scwj" plain icon="el-icon-upload2">上传文件</el-button>
                                    <div class="wjxianzhi" style="margin-top: 40px">限制上传文件10个以下，单个大小不超过100M；</div>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:dodgerblue;">提交</el-button>
                        <el-button @click="dialogVisible = false">取消</el-button>
                    </span>
                </el-dialog>
                <el-button type="primary" plain class="shu4">数据导出</el-button>
                <el-input placeholder="请输入监考名称关键词查询" v-model="input" class="shuru" @keyup.enter="searchData"></el-input>
                <el-button type="primary" class="shu2" style="background-color:dodgerblue;" @click="searchData">查询</el-button>
                <el-button type="primary" plain class="shu1" @click="resetData">重置</el-button>
                <div class="table-container">
                    <el-table ref="multipleTable" :data="paginatedData" tooltip-effect="dark" style="width: 100%">
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
                        <el-table-column label="操作">
                            <el-button type="text">查看名单</el-button>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>查看详情</el-dropdown-item>
                                    <el-dropdown-item>编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
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
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
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
import { _getAllBatches } from '../../../../api/user'

export default {
  data () {
    return {
      activeName: 'second',
      currentPage: 1,
      pageSize: 10,
      input: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        year: '',
        bmkssj: '',
        bmjssj: '',
        jksm: ''
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
      now: new Date() // 新增的当前时间变量
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData.push({ ...this.ruleForm })
          this.filteredData = this.tableData
          this.dialogVisible = false
          this.$refs[formName].resetFields()
        }
      })
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
      this.filteredData = this.tableData
      this.currentPage = 1
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
.shuru {
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
