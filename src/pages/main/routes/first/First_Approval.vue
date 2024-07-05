<template>
    <div class="body">
        <span class="title">报名审批</span>
        <div class="top">
            <div class="top1">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待我审批" name="first" style="font-size: 25px">
                        <div class="select">
                            <el-button type="primary" icon="el-icon-user-solid" style="font-size: 22px" @click="openApprovalDialog2">邀约</el-button>
                            <el-button type="primary" plain class="shu" style="font-size: 22px">数据导出</el-button>
                            <el-select v-model="value" placeholder="请选择监考批次" class="xuanze"
                                       style="font-size: 25px">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input
                                    placeholder="请输入报名人姓名/工号查询"
                                    v-model="input"
                                    class="shuru"
                                    style="font-size: 25px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 22px">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 22px">重置</el-button>
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
                                            <el-select v-model="form.round" placeholder="请选择活动区域">
                                                <el-option label="批次一" value="shanghai"></el-option>
                                                <el-option label="批次二" value="beijing"></el-option>
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
                                                v-model="form.input"
                                            style="margin-right: 50px;margin-right: 20px;width: 80%">
                                            </el-input>
                                            <el-button icon="el-icon-search" circle></el-button>
                                        </el-form-item>
                                        <el-input
                                            v-model="approvalForm.reason"
                                            placeholder="老师信息"
                                            type="textarea"
                                            style="background-color: #f0f0f0; width: 100%; margin-bottom: 20px"
                                        height="300px"></el-input>
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
                                    :data="paginatedData1"
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
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
                                        label="报名人"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="num"
                                        label="工号">
                                </el-table-column>
                                <el-table-column
                                        prop="jkpc"
                                        label="监考批次"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="yxjkxq"
                                        label="意向监考校区"
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
                            <div class="pagination-container">
                                <el-pagination
                                        background
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10]"
                                        :page-size="pageSize"
                                        layout="prev, pager, next"
                                        :total="WaiteData.length"
                                        class="ye">
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
                            <el-button type="primary" plain class="shu" style="font-size: 22px">数据导出</el-button>
                            <el-select v-model="value" placeholder="请选择监考批次" class="xuanze"
                                       style="font-size: 25px">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input
                                    placeholder="请输入报名人姓名/工号查询"
                                    v-model="input"
                                    class="shuru"
                                    style="font-size: 25px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 22px">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 22px">重置</el-button>
                        </div>
                        <div class="table-container">
                            <el-table
                                    ref="multipleTable"
                                    :data="paginatedData2"
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
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
                                        label="报名人"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="num"
                                        label="工号">
                                </el-table-column>
                                <el-table-column
                                        prop="jkpc"
                                        label="监考批次"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="yxjkxq"
                                        label="意向监考校区"
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
                            <div class="pagination-container">
                                <el-pagination
                                        background
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10]"
                                        :page-size="pageSize"
                                        layout="prev, pager, next"
                                        :total="acceptData.length"
                                        class="ye">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="不同意报名" name="third">
                        <div class="select">
                            <el-button type="primary" plain class="shu" style="font-size: 22px">数据导出</el-button>
                            <el-select v-model="value" placeholder="请选择监考批次" class="xuanze"
                                       style="font-size: 25px">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input
                                    placeholder="请输入报名人姓名/工号查询"
                                    v-model="input"
                                    class="shuru"
                                    style="font-size: 25px">
                            </el-input>
                            <el-button type="primary" class="shu2" style="font-size: 22px">查询</el-button>
                            <el-button type="primary" plain class="shu1" style="font-size: 22px">重置</el-button>
                        </div>
                        <div class="table-container">
                            <el-table
                                    ref="multipleTable"
                                    :data="paginatedData3"
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow: auto; flex: 0 1 auto;font-size: 24px;margin-top: 10px"
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
                                        label="报名人"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="num"
                                        label="工号">
                                </el-table-column>
                                <el-table-column
                                        prop="jkpc"
                                        label="监考批次"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="yxjkxq"
                                        label="意向监考校区"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        label="上传材料">
                                    <el-button type="text">预览</el-button>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        v-slot="scope">
                                    <el-button type="text" @click="rejecttowaite(scope.row)">移除</el-button>
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
                                        :total="rejectdata.length"
                                        class="ye">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
      pageSize: 15,
      dialogTableVisible: false,
      dialogFormVisible: false,
      options: [{
        value: '选项1',
        label: '批次1'
      }, {
        value: '选项2',
        label: '批次2'
      }, {
        value: '选项3',
        label: '批次3'
      }, {
        value: '选项4',
        label: '批次4'
      }, {
        value: '选项5',
        label: '批次5'
      }],
      value: '',
      input: '',
      WaiteData: [{
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '服从调剂'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '服从调剂'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '南湖校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '服从调剂'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      },
      {
        name: '王家栋',
        num: '34099001',
        jkpc: '2023年A楼2023监考报名',
        yxjkxq: '余家头校区'
      }],
      acceptData: [],
      rejectdata: [],
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
        input: ''
      },
      currentRow: null
    }
  },
  computed: {
    // 1：待审批 2：同意 3：拒绝
    paginatedData1 () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.WaiteData.slice(start, end)
    },
    paginatedData2 () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.acceptData.slice(start, end)
    },
    paginatedData3 () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.rejectdata.slice(start, end)
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
      } else if (this.approvalForm.approval === '不同意') {
        this.rejectdata.push({ ...this.currentRow, reason: this.approvalForm.reason })
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
        this.$router.push({ path: '/main1/first/first_enroll' })
      } else {
        // 向老师端发送邀请短信
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
