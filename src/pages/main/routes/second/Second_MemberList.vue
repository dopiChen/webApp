<template>
    <div class="body">
        <el-button type="text" @click="returnclick" icon="el-icon-back" style="font-size: 30px;margin-left:24px"></el-button>
        <span class="title1">部门与角色管理/</span>
        <span class="title2">成员名单</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" plain class="shu" @click="outdata">数据导出</el-button>
<!--                <el-button type="primary" plain class="shu" @click="dialogVisible = true">添加成员</el-button>-->
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
                    v-model="query.name"
                    class="shuru">
                </el-input>
                <el-button type="primary" class="shu2"  style="background-color:dodgerblue;" @click="getList">查询</el-button>
                <el-button type="primary" plain class="shu1" @click="resetData1">重置</el-button>
                <div class="table-container"><el-table
                    ref="multipleTable"
                    :data="tableData"
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
                        prop="name"
                        label="姓名"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-model="username"
                        prop="username"
                        label="工号">
                    </el-table-column>
                    <el-table-column
                            prop="usertype"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话号码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="住址">
                    </el-table-column>
                    <el-table-column
                        prop="eduBackground"
                        label="学历"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="statusText"
                            label="人员状态"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span :class="scope.row.statusClass">{{ scope.row.statusText }}</span>
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
                                    <el-button type="text" @click="showChangeStatusDialog3(scope.row)">调整人员职位</el-button>
                                    <br>
<!--                                    <el-button type="text" @click="showChangeStatusDialog4(scope.row)">变更角色代码</el-button>-->
<!--                                    <br>-->
                                    <el-button type="text" @click="showChangeStatusDialog5(scope.row)">变更人员状态</el-button>
                                    <br>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                            layout="total,sizes,prev, pager, next"
                            :total="total"
                            class="ye">
                        </el-pagination>
                    </div>
                    <el-dialog
                        title="调整人员职位"
                        :visible.sync="changeStatusDialogVisible3"
                        width="30%">
                        <span>调整人员职位:</span>
                        <el-select v-model="newStatus1" placeholder="请选择系统角色">

                            <el-option label="在职在岗教职工" value=1></el-option>
                            <el-option label="学院研工办主任" value=2></el-option>
                            <el-option label="职能部门综合办主任" value=3></el-option>
                            <el-option label="学院分管研究生工作副院长" value=4></el-option>
                            <el-option label="研究生招生考务科科长" value=5></el-option>
                        </el-select>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changePosition">确认</el-button>
            <el-button @click="changeStatusDialogVisible3 = false">取消</el-button>
        </span>
                    </el-dialog>
                    <el-dialog
                        title="变更人员状态"
                        :visible.sync="changeStatusDialogVisible"
                        width="30%">
                        <span>变更人员状态:</span>
                        <el-select v-model="newStatus2" placeholder="请选择人员状态">
                            <el-option label="激活" value=1></el-option>
                            <el-option label="冻结" value=0></el-option>
                        </el-select>
                        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changeStatus">确认</el-button>
            <el-button @click="changeStatusDialogVisible = false">取消</el-button>
        </span>
                    </el-dialog>
                    <!-- 预览对话框 -->
                    <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                        <el-table :data="selectedData" style="width: 100%;">
                            <el-table-column
                                prop="name"
                                label="姓名"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                v-model="username"
                                prop="username"
                                label="工号">
                            </el-table-column>
                            <el-table-column
                                prop="usertype"
                                label="职位">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="电话号码">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="住址">
                            </el-table-column>
                            <el-table-column
                                prop="eduBackground"
                                label="学历">
                            </el-table-column>
                            <el-table-column
                                prop="statusText"
                                label="人员状态">
                                <template slot-scope="scope">
                                    <span :class="scope.row.statusClass">{{ scope.row.statusText }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
        <el-button @click="isExportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExportExcel">确认导出</el-button>
      </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {_getperuserdto, _postionChange, _statusChange} from '../../../../api/user'
import * as XLSX from 'xlsx'
export default {
  data () {
    return {
      username: '',
      status: '',
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
      newStatus1: '',
      newStatus2: '',
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
      tableData: [],
      query: {
        unit: this.$route.query.unit,
        pageNo: 1,
        pageSize: 10,
        name: ''
      },
      total: 0,

      selectedData: [],
      isExportDialogVisible: false
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
    changePosition () {
      _postionChange(this.username, this.newStatus1)
      this.getList()
      this.changeStatusDialogVisible3 = false
    },
    changeStatus () {
      _statusChange(this.username, this.newStatus2)
      this.getList()
      this.changeStatusDialogVisible = false
    },
    getList () {
      _getperuserdto(this.query.unit, this.query.pageNo, this.query.pageSize, this.query.name).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
        this.transformUserTypes()
        this.transformUserStatus()
      })
    },
    transformUserTypes () {
      this.tableData = this.tableData.map(item => {
        switch (item.usertype) {
          case 1:
            item.usertype = '在职在岗教职工'
            break
          case 2:
            item.usertype = '研工办主任'
            break
          case 3:
            item.usertype = '研究生招生考务科科长'
            break
          case 4:
            item.usertype = '副院长'
            break
          case 5:
            item.usertype = '研究生招生考务科科长'
            break
        }
        return item
      })
    },
    transformUserStatus () {
      this.tableData = this.tableData.map(item => {
        if (item.isEnabled) {
          item.statusText = '已激活'
          item.statusClass = 'active'
        } else {
          item.statusText = '已冻结'
          item.statusClass = 'inactive'
        }
        return item
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
      this.username = row.username
    },
    showChangeStatusDialog4 (row) {
      this.changeStatusDialogVisible4 = true
      this.currentRow = row
      this.newStatus = row.jsdm
    },
    showChangeStatusDialog5 (row) {
      this.changeStatusDialogVisible = true
      this.currentRow = row
      this.username = row.username
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
.active {
    color: green;
}
.inactive {
    color: red;
}
</style>
