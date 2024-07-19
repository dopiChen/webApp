<template>
    <div class="body">
        <span class="title">报名审批</span>
        <div class="top">
            <div class="top1">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待我审批" name="first" style="font-size: 25px">
                        <div class="select">
                            <el-button type="primary" icon="el-icon-user-solid" style="font-size: 22px" @click="openApprovalDialog2">邀约</el-button>
                            <el-button type="primary" plain class="shu" style="font-size: 22px" @click="outdata">数据导出</el-button>
                            <el-input
                                placeholder="请输入报名人姓名/工号查询"
                                v-model="input1"
                                class="shuru"
                                style="font-size: 18px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 20px;margin-left: 5px" @click="search1">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 20px" @click="resetData1">重置</el-button>
                            <el-dialog :visible.sync="isApprovalDialogVisible2" title="邀约" width="800px" height="1000px" center style="font-weight: bolder">
                                <hr />
                                <div class="info">
                                    <el-alert
                                        title="通过邀约渠道，不受监考批次时间限制!"
                                        type="warning"
                                        show-icon>
                                    </el-alert>
                                </div>
                                <div class="table">
                                    <el-form ref="form" :model="form" label-width="80px">
                                        <el-form-item label="监考批次">
                                            <el-select v-model="form.round" placeholder="请选择活动区域" >
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="选择方式">
                                            <el-radio-group v-model="form.way">
                                                <el-radio label="自走流程"></el-radio>
                                                <el-radio label="帮助报名"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="查询">
                                            <el-input
                                                placeholder="请输入报名人姓名/工号查询"
                                                v-model="input2"
                                                style="margin-right: 50px;margin-right: 20px;width: 80%">
                                            </el-input>
                                            <el-button icon="el-icon-search" circle  @click='search'></el-button>
                                        </el-form-item>
                                        <div>
                                            <p>{{form.result}}</p>
                                        </div>
                                        <el-form-item >
                                            <el-button type="primary" @click="oncomfirm">确认</el-button>
                                            <el-button @click="isApprovalDialogVisible2=false">取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-dialog>
                        </div>
                        <div class="table-container">
                            <el-table
                                ref="multipleTable"
                                :data="show1"
                                tooltip-effect="dark"
                                style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
                                @selection-change="handleSelelctionChange">
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
                                    label="报名人"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="username"
                                    label="工号">
                                </el-table-column>
                                <el-table-column
                                    prop="intendedCampus"
                                    label="意向监考校区"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="way"
                                    label="报名方式"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    label="上传材料">
                                    <el-button type="text" @click="dialogFormVisible=true">预览</el-button>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <!-- 传递 row 参数 -->
                                    <template  v-slot="scope">
                                        <el-button type="text" @click="openApprovalDialog(scope.row)">审批</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange1"
                                    @current-change="handleCurrentChange1"
                                    :current-page.sync="currentPage1"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next"
                                    :total="total1"
                                    background>
                                </el-pagination>
                            </div>
                            <el-dialog :visible.sync="isApprovalDialogVisible" title="审批" width="600px" center style="font-weight: bolder">
                                <el-form :model="approvalForm">
                                    <el-table :data="[approvalForm]" stripe style="width: 100%; margin-bottom: 20px;">
                                        <el-table-column prop="num" label="工号" width="180">
                                            <template v-slot="scope">
                                                <span style="font-size: 16px; padding: 10px;">{{ scope.row.num }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180">
                                            <template v-slot="scope">
                                                <span style="font-size: 16px; padding: 10px;">{{ scope.row.name }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  width="180" label="操作">
                                            <template>  <el-button type="text"  style="font-size: 18px">移除</el-button></template>
                                        </el-table-column>
                                    </el-table>
                                    <hr />
                                    <el-form-item label="审批" style="text-align: center;">
                                        <el-radio-group v-model="approvalForm.approval">
                                            <el-radio label="同意" style="font-size: 16px;">同意</el-radio>
                                            <el-radio label="不同意" style="font-size: 16px;">不同意</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item v-if="approvalForm.approval === '不同意'" style="text-align: center;">
                                        <el-input
                                            v-model="approvalForm.reason"
                                            placeholder="请输入不同意理由"
                                            type="textarea"
                                            style="background-color: #f0f0f0; width: 100%;"></el-input>
                                    </el-form-item>
                                    <span style="color: red; display: block; text-align: center; font-size: 16px;">请确认，一经提交无法申请</span>
                                    <hr />
                                    <el-form-item style="text-align: center;">
                                        <el-button type="primary" @click="submitApproval" style="font-size: 16px;">提交</el-button>
                                        <el-button @click="isApprovalDialogVisible = false" style="font-size: 16px;">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                            <el-dialog :visible.sync="dialogFormVisible">
                                <div style="width: 630px;height: 829px">
                                    <div class="utopbar">
                                        <span class="utitle">武汉理工大学研究生招生考试监考人员报名表</span>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="同意报名" name="second">
                        <div class="select">
                            <el-button type="primary" plain class="shu" style="font-size: 22px" @click="outdata">数据导出</el-button>
                            <el-input
                                placeholder="请输入报名人姓名/工号查询"
                                v-model="input2"
                                class="shuru"
                                style="font-size: 18px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 20px;margin-left: 5px" @click="search2">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 20px" @click="resetData2">重置</el-button>
                        </div>
                        <div class="table-container">
                            <el-table
                                ref="multipleTable"
                                :data="show2"
                                tooltip-effect="dark"
                                style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
                                @selection-change="handleSelelctionChange">
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
                                    label="报名人"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="username"
                                    label="工号">
                                </el-table-column>
                                <el-table-column
                                    prop="intendedCampus"
                                    label="意向监考校区"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="way"
                                    label="报名方式"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    label="上传材料">
                                    <el-button type="text">预览</el-button>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    v-slot="scope">
                                    <el-button type="text" @click="accepttowaite(scope.row)">移除</el-button>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange2"
                                    @current-change="handleCurrentChange2"
                                    :current-page.sync="currentPage2"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next"
                                    :total="total2"
                                    background>
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="不同意报名" name="third">
                        <div class="select">
                            <el-button type="primary" plain class="shu" style="font-size: 22px" @click="outdata">数据导出</el-button>
                            <el-input
                                placeholder="请输入报名人姓名/工号查询"
                                v-model="input3"
                                class="shuru"
                                style="font-size: 18px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 20px;margin-left: 5px" @click="search3">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 20px" @click="resetData3">重置</el-button>
                        </div>
                        <div class="table-container">
                            <el-table
                                ref="multipleTable"
                                :data="show3"
                                tooltip-effect="dark"
                                style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
                                @selection-change="handleSelelctionChange">
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
                                    label="报名人"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="username"
                                    label="工号">
                                </el-table-column>
                                <el-table-column
                                    prop="intendedCampus"
                                    label="意向监考校区"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    prop="way"
                                    label="报名方式"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    label="上传材料">
                                    <el-button type="text" >预览</el-button>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    v-slot="scope">
                                    <el-button type="text" @click="rejecttowaite(scope.row)">移除</el-button>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange3"
                                    @current-change="handleCurrentChange3"
                                    :current-page.sync="currentPage3"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next"
                                    :total="total3"
                                    background>
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!-- 预览对话框 -->
                <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                    <el-table :data="selectedData" style="width: 100%;">
                        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
                        <el-table-column prop="num" label="姓名" width="200"></el-table-column>
                        <el-table-column prop="yxjkxq" label="意向校区" width="200"></el-table-column>
                        <!-- 添加其他你需要预览的列 -->
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
import * as XLSX from 'xlsx'
import {
  _getAllBatches,
  _getApprovedList,
  _getApproveList,
  _getDisapprovedList, _getUserData,
  _rejectApprove, _searchApprovedList, _searchApproveList, _searchDisapprovedList,
  _submitApprove
} from '../../../../api/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      total1: 0,
      total2: 0,
      total3: 0,
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      size1: 10,
      size2: 10,
      size3: 10,
      activeName: 'second',
      currentPage: 1,
      pageSize: 15,
      dialogTableVisible: false,
      dialogFormVisible: false,
      options: [],
      allBatchs: [],
      value: null,
      input1: '',
      input2: '',
      input3: '',
      WaiteData: [],
      acceptData: [],
      rejectdata: [],
      // 过滤数据
      fliterData1: [],
      fliterData2: [],
      fliterData3: [],
      // 展示的数据
      show1: [],
      show2: [],
      show3: [],
      isApprovalDialogVisible2: false,
      isApprovalDialogVisible: false,
      approvalForm: {
        num: '',
        name: '',
        approval: '',
        reason: ''
      },
      form: {
        round: '',
        way: '',
        input1: '',
        input2: '',
        input3: '',
        result: ''
      },
      currentRow: null,
      // 导出数据
      selectedData: [],
      isExportDialogVisible: false
    }
  },
  computed: {
    // 1：待审批 2：同意 3：拒绝
    // paginatedData1 () {
    //   const start = (this.currentPage - 1) * this.pageSize
    //   const end = this.currentPage * this.pageSize
    //   return this.fliterData1.slice(start, end)
    // },
    // paginatedData2 () {
    //   const start = (this.currentPage - 1) * this.pageSize
    //   const end = this.currentPage * this.pageSize
    //   return this.fliterData2.slice(start, end)
    // },
    // paginatedData3 () {
    //   const start = (this.currentPage - 1) * this.pageSize
    //   const end = this.currentPage * this.pageSize
    //   return this.fliterData3.slice(start, end)
    // },
    ...mapState({
      username: state => state.user.id // 映射 userId
    })
  },
  created () {
    this.getApproveList(this.size1, 1)
    this.getApprovedList(this.size2, 1)
    this.getDisapprovedList(this.size3, 1)
    this.getAllBatchs()
  },
  methods: {
    // 调整页面 引用时不用改动
    handleSizeChange1 (size) {
      this.size1 = size
      this.getApproveList(this.size1, this.currentPage1)
    },
    handleSizeChange2 (size) {
      this.size2 = size
      this.getApprovedList(this.size2, this.currentPage2)
    },
    handleSizeChange3 (size) {
      this.size3 = size
      this.getDisapprovedList(this.size2, this.currentPage3)
    },
    getAllBatchs () {
      _getAllBatches().then(res => {
        this.allBatchs = res.data
        this.processData()
      })
    },
    search () {
      _getUserData(this.form.input).then(res => {
        this.form.result = `工号：${res.data.username},姓名：${res.data.name},单位：${res.data.unit},电话：${res.data.phone}`
      })
    },
    getApproveList (pageSize, pageNum) {
      _getApproveList(this.username, pageSize, pageNum).then(res => {
        this.WaiteData = res.data.data
        this.total1 = res.data.total
        this.show1 = this.WaiteData
      })
    },
    getApprovedList (pageSize, pageNum) {
      _getApprovedList(this.username, pageSize, pageNum).then(res => {
        this.acceptData = res.data.data
        this.total2 = res.data.total
        this.show2 = this.acceptData
      })
    },
    getDisapprovedList (pageSize, pageNum) {
      _getDisapprovedList(this.username, pageSize, pageNum).then(res => {
        this.rejectdata = res.data.data
        this.total3 = res.data.total
        this.show3 = this.rejectdata
      })
    },
    handleSelelctionChange (val) {
      this.selectedIds = val.map(item => item.id)
      // 处理表格选择变化
      this.selectedData = val
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    search1 () {
      _searchApproveList(this.username, this.size1, this.currentPage, this.input1).then(res => {
        this.fliterData1 = res.data.data
        this.total1 = res.data.total
        this.show1 = this.fliterData1
      })
    },
    search2 () {
      _searchApprovedList(this.username, this.size2, this.currentPage, this.input2).then(res => {
        this.fliterData2 = res.data.data
        this.total2 = res.data.total
        this.show2 = this.fliterData2
      })
    },
    search3 () {
      _searchDisapprovedList(this.username, this.size3, this.currentPage, this.input3).then(res => {
        this.fliterData3 = res.data.data
        this.total3 = res.data.total
        this.show3 = this.fliterData3
      })
    },
    handleCurrentChange1 (page) {
      this.currentPage1 = page
      if (this.input1 === '') {
        this.getApproveList(this.size1, page)
      } else {
        this.search1()
      }
    },
    handleCurrentChange2 (page) {
      this.currentPage2 = page
      if (this.input2 === '') {
        this.getApprovedList(this.size2, page)
      } else {
        this.search2()
      }
    },
    handleCurrentChange3 (page) {
      this.currentPage3 = page
      if (this.input3 === '') {
        this.getDisapprovedList(this.size3, page)
      } else {
        this.search3()
      }
    },
    handleClick1 () {
      alert('button click')
    },
    openApprovalDialog (row) {
      this.currentRow = row
      this.approvalForm.num = row.num
      this.approvalForm.name = row.name
      this.approvalForm.approval = ''
      this.approvalForm.reason = ''
      this.isApprovalDialogVisible = true
    },
    openApprovalDialog2 (row) {
      this.isApprovalDialogVisible2 = true
    },
    submitApproval () {
      if (this.approvalForm.approval === '同意') {
        this.acceptData.push(this.currentRow)
        _submitApprove(this.currentRow.username, this.currentRow.examId)
      } else if (this.approvalForm.approval === '不同意') {
        this.rejectdata.push({ ...this.currentRow, reason: this.approvalForm.reason })
        _rejectApprove(this.currentRow.username, this.currentRow.examId, this.approvalForm.reason)
      }
      const index = this.WaiteData.indexOf(this.currentRow)
      if (index > -1) {
        this.WaiteData.splice(index, 1)
      }
      this.isApprovalDialogVisible = false
    },
    accepttowaite (row) {
      this.WaiteData.push(this.currentRow)
      const index = this.acceptData.indexOf(row)
      if (index > -1) {
        this.acceptData.splice(index, 1)
      }
    },
    rejecttowaite (row) {
      this.WaiteData.push(this.currentRow)
      const index = this.rejectdata.indexOf(row)
      if (index > -1) {
        this.rejectdata.splice(index, 1)
      }
    },
    oncomfirm () {
      if (this.form.way === '帮助报名') {
        // 如果需要携带参数可以在这里携带
        this.$router.push({ name: 'first_enroll', query: {ids: this.form.round, username: this.form.input} })
      } else {
        // 向老师端发送邀请短信
      }
    },
    processData () {
      this.options = this.allBatchs.map(item => ({
        value: item.batchId,
        label: item.batchName
      }))
    },
    // 搜索函数
    searchData1 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData1 = this.WaiteData.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) ||
                    item.num.includes(searchQuery)
      })
    },
    resetData1 () {
      this.input1 = ''
      this.getApproveList(this.size1, 1)
    },
    searchData2 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData2 = this.acceptData.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) ||
                    item.num.includes(searchQuery)
      })
    },
    resetData2 () {
      this.input2 = ''
      this.getApprovedList(this.size2, 1)
    },
    searchData3 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData3 = this.rejectdata.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) ||
                    item.num.includes(searchQuery)
      })
    },
    resetData3 () {
      this.input3 = ''
      this.getDisapprovedList(this.size3, 1)
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
    display: flex;
    height: 48px;
    background: #FFFFFF;
    position: absolute;
    left: 32px;
    right: 32px;
    top: 16px;
    bottom: 16px;
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
    margin-top: 40px;
    padding-bottom: 40px;
}

.select {
    margin-top: 20px;
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

.xuanze {
    position: absolute;
    right: 420px;
}
.utopbar{
    text-align: center;
    position: absolute;
    top:36px;
    left: 16px;
    right: 16px;
    height: 56px;
    background: #F2F2F2;
    border: 1px solid #ABABAB;
}
.utitle{
    font-weight: 500;
    font-size: 24px;
    color: #000000e6;
    line-height: 24px;
}
</style>
