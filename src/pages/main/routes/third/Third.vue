<template>
    <div class="body">
        <span class="title">监考报名</span>
        <hr>
        <div class="main_body">
            <div class="selectbody">
                <el-button type="primary" @click="gosubmit">+ 监考报名</el-button>
                <div class="demo-input-suffix">
                    <el-input
                            placeholder="输入监考批次关键词"
                            prefix-icon="el-icon-search"
                            v-model="input">
                    </el-input>
                    <el-button type="primary" @click="searchData1">搜索</el-button>
                    <el-button type="info" @click="resetData1">重置</el-button>
                </div>
            </div>
            <div class="tablebody">
                <el-table
                        :data="fliterData1"
                        stripe
                        style="width: 100%"
                        @selection-change="handleSelelctionChange"
                        :height="tableHeight"
                        class="table">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                        fixed
                        type="index"
                        label="序号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="batchId"
                            label="批次编号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="batchName"
                            label="监考批次"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="startDate"
                            label="报名开始时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="endDate"
                            label="报名结束时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="year"
                            label="创建时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            label="批次状态"
                            width="400">
                        <div>已结束</div>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="handleclick(scope.row)">查看报名</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <span class="demonstration">调整每页显示条数</span>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage2"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="sizes, prev, pager, next"
                        :total="this.total">
                    </el-pagination>
                </div>
            </div>
                        <el-dialog
                            :visible.sync="dialogVisible"
                            width="25%"
                            :before-close="handleClose"
                            custom-class="custom-dialog">
                            <div class="dialog-content">
                                <div class="dialog-header"  style="width: 100%">
                                    <img src="../../../../assets/images/bg/bg.jpg" alt="背景图片" class="dialog-background">
                                    <h3 class="dialog-title">未确认申请提醒</h3>
                                </div>
                                <div class="dialog-body">
                                    <div v-for="(item, index) in notComfirmlist" :key="index" class="record-item">
                                        <p><strong>申请人:</strong> {{ item.name }}</p>
                                        <p><strong>考试编号:</strong> {{ item.examId }}</p>
                                        <p><strong>校区:</strong> {{ item.intendedCampus }}</p>
                                        <el-divider></el-divider>
                                    </div>
                                </div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">前往确认</el-button>
                  </span>
                        </el-dialog>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'

import {_getAllBatches, _getAllNotComfirms, _searchBatches} from '../../../../api/api'
import {mapState} from 'vuex'

export default {
  name: 'third',
  data () {
    return {
      welcome: '欢迎第三用户！',
      input: '',
      checked: true,
      teams: [],
      selectedIds: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示行数
      tableHeight: 0,
      total: 0,
      // 搜索数据
      fliterData1: [],
      notComfirmlist: [],
      dialogVisible: false
    }
  },
  // 生成页面时从后端获取数据
  created () {
    this.fetchData()
    console.info(this.teams)
    this.fetchData2(this.currentPage)
  },
  currentTableData () {
    const start = (this.currentPage - 1) * this.pageSize
    const end = start + this.pageSize
    return this.fliterData1.slice(start, end)
  },
  computed: {
    ...mapState({
      username: state => state.user.id, // 映射 userId
      name: state => state.user.name
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateTableHeight)
  },
  methods: {
    handleclick (row) {
      this.$router.push({
        name: 'third3A',
        query: {
          id: row.batchId
        }
      })
    },
    handleSelelctionChange (val) {
      this.selectedIds = val.map(item => item.batchId)
    },
    gosubmit () {
      if (this.selectedIds.length === 0) {
        Message({
          message: '尚未选择批次',
          type: 'warning'
        })
        return
      }
      // 路由跳转
      this.$router.push({name: 'third_submit', query: {ids: this.selectedIds.join(','), username: this.username}})
    },
    searchData1 (page) {
      const params = {page: page, size: this.pageSize}
      _searchBatches(this.input, params).then(res => {
        this.fliterData1 = res.data
        this.total = res.data.total
      })
    },
    resetData1 () {
      this.input = ''
      this.fliterData1 = this.teams
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleConfirm () {
      // 处理前往确认的逻辑
      this.dialogVisible = false
      this.$router.push({name: 'third2'})
      // 可以跳转到其他页面或执行其他操作
    },
    // 异步函数
    async fetchData (page) {
      try {
        const params = {page: page, size: this.pageSize}
        const response = await _getAllBatches(params)
        this.teams = response.data
        console.info(this.teams)
        this.fliterData1 = this.teams
        this.total = response.data.total
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchData2 () {
      try {
        const res = await _getAllNotComfirms(this.username)
        this.notComfirmlist = res.data
        if (this.notComfirmlist.length > 0) {
          this.dialogVisible = true
        }
      } catch (error) {
        console.error(error)
      }
    },
    handleCurrentChange (page) {
      if (this.input === '') {
        this.currentPage = page
        this.fetchData(page)
      } else {
        this.currentPage = page
        this.searchData1(page)
      }
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.fetchData(this.currentPage) // 使用当前页重新获取数据
    }
  }

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
/////
.custom-dialog .el-dialog__header {
    display: none;
}

.custom-dialog .dialog-content {
    padding-top: 0;
}

.custom-dialog .dialog-header {
    position: relative;
    height: 25%;
}

.custom-dialog .dialog-background {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.custom-dialog .dialog-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 20px;
    text-align: center;
}

.custom-dialog .dialog-body {
    padding: 20px;
}

.record-item {
    margin-bottom: 10px;
}

.record-item p {
    margin: 5px 0;
    font-size: 16px;
}

.dialog-footer {
    text-align: right;
}

.dialog-footer .el-button {
    margin-left: 10px;
}

.dialog-footer .el-button--primary {
    background-color: #409eff;
    border-color: #409eff;
}

.el-divider {
    margin: 10px 0;
}

.el-button {
    font-size: 14px;
    padding: 10px 20px;
}

</style>
