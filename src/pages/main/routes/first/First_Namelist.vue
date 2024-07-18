
<!--用来接入后端展示当前级别已批准的监考人员的详细名单-->
<template>
    <div class="body">
        <span class="title">监考详细名单</span>
        <hr>
        <div class="main_body">
            <div class="selectbody">
                <el-button type="primary" @click="outdata">数据导出</el-button>
                <div class="demo-input-suffix">
                    <el-input
                            placeholder="输入老师工号"
                            prefix-icon="el-icon-search"
                            v-model="input">
                    </el-input>
                    <el-button type="primary" style="margin-left: 10px" @click="searchData1">搜索</el-button>
                    <el-button type="info" @click="resetData1">重置</el-button>
                </div>
            </div>
            <div class="tablebody">
                <el-table
                        :data="showList"
                        stripe
                        style="width: 100%;font-size:18px"
                        @selection-change="handleSelelctionChange"
                        :height="tableHeight"
                        class="table">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="personnel.name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="personnel.gender"
                            label="性别"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="personnel.username"
                            label="工号"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="personnel.unit"
                            label="工作单位"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="personnel.phone"
                            label="移动电话"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="examination.examRoom"
                            label="教室"
                            width="300">
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog :visible.sync="isRemoveDialogVisible" title="移除监考" width="600px" center style="font-weight: bolder">
                <el-form :model="removeForm">
                    <el-table :data="[removeForm]" stripe style="width: 100%; margin-bottom: 20px;">
                        <el-table-column prop="num" label="工号" width="180">
                            <template v-slot="scope">
                                <span style="font-size: 16px; padding: 10px;">{{ scope.row.workid }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                            <template v-slot="scope">
                                <span style="font-size: 16px; padding: 10px;">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  width="180" label="操作">
                            <template>  <el-button type="text"  style="font-size: 18px" @click="isRemoveDialogVisible = false">移除</el-button></template>
                        </el-table-column>
                    </el-table>
                    <hr />
                    <span style="color: red; display: block; text-align: center; font-size: 16px;">请确认，一经移除无法恢复！</span>
                    <el-form-item style="text-align: center; margin-top: 15px">
                        <el-button type="primary" @click="finalremove" style="font-size: 16px;">提交</el-button>
                        <el-button @click="isRemoveDialogVisible = false" style="font-size: 16px;">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 预览对话框 -->
            <el-dialog title="导出数据预览" :visible.sync="isExportDialogVisible" width="50%">
                <el-table :data="selectedData" style="width: 100%;">
                    <el-table-column prop="name" label="姓名" width="150"></el-table-column>
                    <el-table-column prop="gender" label="性别" width="100"></el-table-column>
                    <el-table-column prop="personnelId" label="工号" width="200"></el-table-column>
                    <!-- 添加其他你需要预览的列 -->
                </el-table>
                <span slot="footer" class="dialog-footer">
        <el-button @click="isExportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExportExcel">确认导出</el-button>
      </span>
            </el-dialog>
          <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="total"
                background>
            </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx'
import {_getFinalList, _searchFinalList} from '../../../../api/api'
export default {
  name: 'third',
  data () {
    return {
      welcome: '欢迎第三用户！',
      input: '',
      total: 0,
      checked: true,
      teams: [],
      finalList: [],
      showList: [],
      selectedIds: [],
      currentPage: 1, // 当前页码
      size: 10,
      pageSize: 15, // 每页显示行数
      tableHeight: 0,
      isRemoveDialogVisible: false,
      removeForm: {
        name: '',
        workid: ''
      },
      // 导出数据
      isExportDialogVisible: false,
      selectedData: [],
      // 搜索数据
      // 过滤数据
      fliterData: []

    }
  },
  created () {
    this.getFinalList(1)
  },
  // 计算换页显示
  computed: {
    currentTableData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.fliterData1.slice(start, end)
    }
  },
  methods: {
    // 调整页面 引用时不用改动
    handleSizeChange (size) {
      this.size = size
      this.currentPage = page
      if (this.input === '') {
        this.getFinalList(this.currentPage)
      } else {
        this.search()
      }
    },
    getFinalList (page) {
      _getFinalList(this.size, page).then(res => {
        this.finalList = res.data.data
        this.total = res.data.total
        this.showList = this.finalList
      })
    },
    search () {
      _searchFinalList(this.size, this.currentPage, this.input).then(res => {
        this.fliterData = res.data.data
        this.total = res.data.total
        this.showList = this.fliterData
      })
    },
    handleSelelctionChange (val) {
      this.selectedIds = val.map(item => item.id)
      // 处理表格选择变化
      this.selectedData = val
    },
    handleCurrentChange (page) {
      this.currentPage = page
      if (this.input === '') {
        this.getFinalList(page)
      } else {
        this.search()
      }
    },
    updateTableHeight () {
      this.$nextTick(() => {
        const tableBody = this.$refs.tableBody
        const height = tableBody.clientHeight * 0.9
        this.tableHeight = height
      })
    },
    removeclick (row) {
      this.currentRow = row
      this.removeForm.name = row.name
      this.removeForm.workid = row.personnelId
      this.isRemoveDialogVisible = true
    },
    // 直接一步否决删除不会再回到待审批
    finalremove () {
      const index = this.teams.indexOf(this.currentRow)
      if (index > -1) {
        this.teams.splice(index, 1)
      }
      this.isRemoveDialogVisible = false
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
    // 搜索函数
    searchData1 () {
      this.search()
    },
    resetData1 () {
      this.input = ''
      this.getFinalList(1)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateTableHeight)
  }
  // 调整页面 引用时不用改动

}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.selectbody {
    padding: 1rem;
    width: 95%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 1 auto; /* 让 selectbody 的高度根据内容自适应 */
}

.table {
    margin-top: 20px;
}

.tablebody {
    padding: 1rem;
    margin-top: 1rem;
    width: 95%;
    background-color: white;
    flex: 1 1 auto; /* 让 tablebody 占据剩余的所有空间 */
    overflow: auto; /* 当内容超出时，允许滚动 */
    display: flex;
    flex-direction: column;
}

.block {
    padding: 1rem;
    width: 95%;
    background-color: white;
    margin-bottom: 100px;
}

.table.el-table__body {
    font-size: 16px;

}

.main_body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-start
}

.title {
    width: 80px;
    height: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 1000;
    font-size: 25px;
    color: #000000e6;
    text-align: right;
    padding: 1rem;
    margin-top: 1rem;
}

.body {
    height: 100%;
}

.demo-input-suffix {
    display: flex;
}

/* 自定义样式 */
.nested-table {
    margin-left: 20px;
}

.expanded-row + .nested-table {
    display: block;
}

</style>
