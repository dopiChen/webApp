<template>
    <div class="body">
        <span class="title">监考管理</span>
        <div class="top">
            <div class="top1">
                        <el-button type="primary" icon="el-icon-search">快速找人</el-button>
                        <el-button type="primary" plain class="shu" @click="dialogVisible = true">创建批次</el-button>
                <el-dialog
                        title="创造监考报名批次"
                        :visible.sync="dialogVisible"
                        width="40%"
                        :before-close="handleClose">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  label-position="left" class="demo-ruleForm" >
                            <el-form-item label="批次名称" prop="name">
                                <el-input placeholder="请输入批次名称" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="关联年份" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择关联年份">
                                    <el-option label="2022"></el-option>
                                    <el-option label="2023"></el-option>
                                    <el-option label="2024"></el-option>
                                    <el-option label="2025"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="批次开始时间" required>
                                    <el-form-item prop="date1">
                                        <el-input v-model="ruleForm.name" placeholder="请输入批次开始时间"></el-input>
                                    </el-form-item>
                            </el-form-item>
                            <el-form-item label="批次结束时间" required>
                                <el-form-item prop="date2">
                                    <el-input v-model="ruleForm.name" placeholder="请输入批次结束时间"></el-input>
                                </el-form-item>
                            </el-form-item>
                                <el-form-item label="监考说明">
                                   <el-input
                                    type="textarea"
                                    placeholder="请输入监考说明"
                                    v-model="textarea"
                                    maxlength="200"
                                    show-word-limit>
                                   </el-input>
                                </el-form-item>
                            <el-form-item label="上传附件">
                                <el-form-item>
                                    <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove">
                                        <el-button size="small" type="primary" class="scwj" plain icon="el-icon-upload2">上传文件</el-button>
                                        <div class="wjxianzhi" style="margin-top: 40px">限制上传文件10个以下，单个大小不超过100M；</div>
                                    </el-upload>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <div class="horizontal-line"></div>
                         <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:dodgerblue;">提交</el-button>
                         <el-button @click="dialogVisible = false">取消</el-button>
                    </span>
                </el-dialog>
                        <el-button type="primary" plain class="shu4">数据导出</el-button>
                        <el-input
                                placeholder="请输入监考名称关键词查询"
                                v-model="input"
                                class="shuru">
                        </el-input>
                        <el-button type="primary" class="shu2">查询</el-button>
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
                                    label="监考名称"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="bmqk"
                                    label="报名情况">
                            </el-table-column>
                            <el-table-column
                                    prop="bmkssj"
                                    label="报名开始时间"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="bmjssj"
                                    label="报名结束时间"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="cjsj"
                                    label="创建时间"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    label="批次状态">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <el-button type="text">查看名单</el-button>
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
        },
        {
          name: '2023年A楼2023监考报名',
          bmqk: '2/20',
          bmkssj: '2023-09-12-10:30:00',
          bmjssj: '2023-09-12-10:30:00',
          cjsj: '2023-09-12-10:30:00'
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
.scwj{
    background-color: #FFFFFF;
    position: absolute;
    left:0px;
}
.wjxianzhi{
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
</style>
