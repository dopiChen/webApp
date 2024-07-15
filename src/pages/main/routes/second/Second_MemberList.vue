<template>
    <div class="body">
        <el-button type="text" @click="returnclick" icon="el-icon-back" style="font-size: 30px;color: #d3dce6;margin-left:24px"></el-button>
        <span class="title1">部门与角色管理/</span>
        <span class="title2">成员名单</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" plain class="shu" @click="dialogVisible = true">添加成员</el-button>
                <el-dialog
                    title="添加成员"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="handleClose">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  label-position="left" class="demo-ruleForm" >
                            <el-form-item label="成员名称" prop="name" required>
                                <el-input placeholder="请输入成员名称" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="工号" prop="gh" required>
                                <el-input placeholder="请输入工号" v-model="ruleForm.gh"></el-input>
                            </el-form-item>
                            <el-form-item label="系统角色" prop="xtjs">
                                <el-select v-model="ruleForm.xtjs" placeholder="请选择系统角色" style="width:526px" required>
                                    <el-option label="研究生招生考务科科长" value="研究生招生考务科科长"></el-option>
                                    <el-option label="学院分管研究生工作副院长" value="学院分管研究生工作副院长"></el-option>
                                    <el-option label="职能部门综合办主任" value="职能部门综合办主任"></el-option>
                                    <el-option label="学院研工办主任" value="学院研工办主任"></el-option>
                                    <el-option label="在职在岗教职工" value="在职在岗教职工"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="角色代码" prop="jsdm">
                                <el-select v-model="ruleForm.jsdm" placeholder="请选择角色代码" style="width:526px" required>
                                    <el-option label="role1" value="role1"></el-option>
                                    <el-option label="role2" value="role2"></el-option>
                                    <el-option label="role3" value="role3"></el-option>
                                    <el-option label="role4" value="role4"></el-option>
                                    <el-option label="role5" value="role5"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="人员状态" prop="ryzt">
                                <el-select v-model="ruleForm.ryzt" placeholder="请选择人员状态" style="width:526px" required>
                                    <el-option label="冻结" value="冻结"></el-option>
                                    <el-option label="激活" value="激活"></el-option>
                                </el-select>
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
                <el-input
                    placeholder="请输入成员关键词查询"
                    v-model="input"
                    class="shuru">
                </el-input>
                <el-button type="primary" class="shu2"  style="background-color:dodgerblue;" @click="searchData1">查询</el-button>
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
                        label="姓名"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="gh"
                        label="工号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="xtjs"
                        label="系统角色"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="jsdm"
                        label="角色代码"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ryzt" label="人员状态">
                        <template slot-scope="scope">
                            <span :style="{ color: scope.row.ryzt === '激活' ? 'green' : 'red' }">{{ scope.row.ryzt }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                变更<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
<!--                                    <el-button type="text" @click="showChangeStatusDialog1(scope.row)">修改姓名</el-button>-->
<!--                                    <br>-->
<!--                                    <el-button type="text" @click="showChangeStatusDialog2(scope.row)">修改工号</el-button>-->
<!--                                    <br>-->
                                    <el-button type="text" @click="showChangeStatusDialog3(scope.row)">变更系统角色</el-button>
                                    <br>
<!--                                    <el-button type="text" @click="showChangeStatusDialog4(scope.row)">变更角色代码</el-button>-->
<!--                                    <br>-->
                                    <el-button type="text" @click="showChangeStatusDialog5(scope.row)">变更人员状态</el-button>
                                    <br>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="text" @click="remove(scope.row)" style="margin-left: 10px">删除</el-button>
                        </template>
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
                    <el-dialog
                        title="修改姓名"
                        :visible.sync="changeStatusDialogVisible1"
                        width="30%">
                        <span>修改姓名:</span>
                        <el-input v-model="newStatus" placeholder="请修改姓名"></el-input>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStatusChange1">确认</el-button>
            <el-button @click="changeStatusDialogVisible1 = false">取消</el-button>
        </span>
                    </el-dialog>
                    <el-dialog
                        title="修改工号"
                        :visible.sync="changeStatusDialogVisible2"
                        width="30%">
                        <span>修改工号:</span>
                        <el-input v-model="newStatus" placeholder="请修改工号"></el-input>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStatusChange2">确认</el-button>
            <el-button @click="changeStatusDialogVisible2 = false">取消</el-button>
        </span>
                    </el-dialog>
                    <el-dialog
                        title="变更系统角色"
                        :visible.sync="changeStatusDialogVisible3"
                        width="30%">
                        <span>变更系统角色:</span>
                        <el-select v-model="newStatus" placeholder="请选择系统角色">
                            <el-option label="研究生招生考务科科长" value="研究生招生考务科科长"></el-option>
                            <el-option label="学院分管研究生工作副院长" value="学院分管研究生工作副院长"></el-option>
                            <el-option label="职能部门综合办主任" value="职能部门综合办主任"></el-option>
                            <el-option label="学院研工办主任" value="学院研工办主任"></el-option>
                            <el-option label="在职在岗教职工" value="在职在岗教职工"></el-option>
                        </el-select>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStatusChange3">确认</el-button>
            <el-button @click="changeStatusDialogVisible3 = false">取消</el-button>
        </span>
                    </el-dialog>
                    <el-dialog
                        title="变更角色代码"
                        :visible.sync="changeStatusDialogVisible4"
                        width="30%">
                        <span>变更角色代码:</span>
                        <el-select v-model="newStatus" placeholder="请选择角色代码" style="width:526px" required>
                            <el-option label="role1" value="role1"></el-option>
                            <el-option label="role2" value="role2"></el-option>
                            <el-option label="role3" value="role3"></el-option>
                            <el-option label="role4" value="role4"></el-option>
                            <el-option label="role5" value="role5"></el-option>
                        </el-select>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStatusChange4">确认</el-button>
            <el-button @click="changeStatusDialogVisible4 = false">取消</el-button>
        </span>
                    </el-dialog>
                    <el-dialog
                        title="变更人员状态"
                        :visible.sync="changeStatusDialogVisible"
                        width="30%">
                        <span>变更人员状态:</span>
                        <el-select v-model="newStatus" placeholder="请选择人员状态">
                            <el-option label="激活" value="激活"></el-option>
                            <el-option label="冻结" value="冻结"></el-option>
                        </el-select>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStatusChange5">确认</el-button>
            <el-button @click="changeStatusDialogVisible = false">取消</el-button>
        </span>
                    </el-dialog>
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
      changeStatusDialogVisible1: false,
      changeStatusDialogVisible2: false,
      changeStatusDialogVisible3: false,
      changeStatusDialogVisible4: false,
      changeStatusDialogVisible: false,
      newStatus: '',
      ruleForm: {
        name: '',
        gh: '',
        xtjs: '',
        jsdm: '',
        ryzt: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入成员名称', trigger: 'blur' }
        ],
        gh: [
          { required: true, message: '请输入工号', trigger: 'change' }
        ],
        xtjs: [
          { required: true, message: '请选择系统角色', trigger: 'change' }
        ],
        jsdm: [
          { required: true, message: '请选择角色代码', trigger: 'change' }
        ],
        ryzt: [
          { required: true, message: '请选择人员状态', trigger: 'change' }
        ]
      },
      fliterData1: [],
      tableData: [
        {
          name: '张家栋',
          gh: '340990011',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
        },
        {
          name: '陈家栋',
          gh: '340990012',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
        },
        {
          name: '王家栋',
          gh: '340990013',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
        },
        {
          name: '王家栋',
          gh: '340990014',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
        },
        {
          name: '王家栋',
          gh: '340990015',
          xtjs: '教职工',
          jsdm: 'role1',
          ryzt: '激活'
        },
        {
          name: '王家栋',
          gh: '340990016',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
        },
        {
          name: '王家栋',
          gh: '340990017',
          xtjs: '教职工',
          jsdm: 'role5',
          ryzt: '激活'
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
    returnclick () {
      this.$router.push({
        path: '/main/second6'
      })
    },
    remove (row) {
      const index = this.tableData.indexOf(row)
      if (index > -1) {
        this.tableData.splice(index, 1)
      }
    },
    showChangeStatusDialog1 (row) {
      this.changeStatusDialogVisible1 = true
      this.currentRow = row
      this.newStatus = row.name
    },
    showChangeStatusDialog2 (row) {
      this.changeStatusDialogVisible2 = true
      this.currentRow = row
      this.newStatus = row.gh
    },
    showChangeStatusDialog3 (row) {
      this.changeStatusDialogVisible3 = true
      this.currentRow = row
      this.newStatus = row.xtjs
    },
    showChangeStatusDialog4 (row) {
      this.changeStatusDialogVisible4 = true
      this.currentRow = row
      this.newStatus = row.jsdm
    },
    showChangeStatusDialog5 (row) {
      this.changeStatusDialogVisible = true
      this.currentRow = row
      this.newStatus = row.ryzt
    },
    confirmStatusChange1 () {
      const index = this.tableData.indexOf(this.currentRow)
      if (index > -1) {
        this.tableData[index].name = this.newStatus
      }
      this.changeStatusDialogVisible1 = false
    },
    confirmStatusChange2 () {
      const index = this.tableData.indexOf(this.currentRow)
      if (index > -1) {
        this.tableData[index].gh = this.newStatus
      }
      this.changeStatusDialogVisible2 = false
    },
    confirmStatusChange3 () {
      const index = this.tableData.indexOf(this.currentRow)
      if (index > -1) {
        this.tableData[index].xtjs = this.newStatus
      }
      this.changeStatusDialogVisible3 = false
    },
    confirmStatusChange4 () {
      const index = this.tableData.indexOf(this.currentRow)
      if (index > -1) {
        this.tableData[index].jsdm = this.newStatus
      }
      this.changeStatusDialogVisible4 = false
    },
    confirmStatusChange5 () {
      const index = this.tableData.indexOf(this.currentRow)
      if (index > -1) {
        this.tableData[index].ryzt = this.newStatus
      }
      this.changeStatusDialogVisible = false
    },
    // 搜索函数
    searchData1 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData1 = this.tableData.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) || item.gh.toLowerCase().includes(searchQuery)
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 15px;
}
</style>
