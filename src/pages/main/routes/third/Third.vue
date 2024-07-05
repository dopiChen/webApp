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
                        :data="currentTableData"
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
                            prop="index"
                            label="序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="round"
                            label="监考批次"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="startdate"
                            label="报名开始时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="overdate"
                            label="报名结束时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="创建时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="批次状态"
                            width="400">
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
            </div>
            <div class="block">
                <el-pagination
                        background
                        small
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
  name: 'third',
  data () {
    return {
      welcome: '欢迎第三用户！',
      input: '',
      checked: true,
      teams: [{
        id: 'A',
        index: '00',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'

      }, {
        id: 'B',
        index: '01',
        round: '2023B楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'C',
        index: '02',
        round: '2023C楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '03',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '04',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '05',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '06',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '07',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '08',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '09',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '10',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '11',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '12',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '13',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'A',
        index: '14',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'E',
        index: '15',
        round: '2023E楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'C',
        index: '16',
        round: '2023C楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'D',
        index: '17',
        round: '2023D楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'D',
        index: '17',
        round: '2023D楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'D',
        index: '17',
        round: '2023D楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }, {
        id: 'D',
        index: '17',
        round: '2023D楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        date: '2023-11-12-10:30:00',
        state: '进行中'
      }
      ],
      selectedIds: [],
      currentPage: 1, // 当前页码
      pageSize: 15, // 每页显示行数
      tableHeight: 0,
      // 搜索数据
      fliterData1: []
    }
  },
  // 计算换页显示
  computed: {
    total () {
      return this.teams.length
    },
    currentTableData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.fliterData1.slice(start, end)
    }
  },
  methods: {
    handleclick (row) {
      this.$router.push({
        name: 'third3A',
        query: {
          id: row.id
        }
      })
    },
    handleSelelctionChange (val) {
      this.selectedIds = val.map(item => item.id)
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
      this.$router.push({name: 'third_submit', query: {ids: this.selectedIds.join(',')}})
    },
    handleCurrentChange (page) {
      this.currentPage = page
    },
    updateTableHeight () {
      this.$nextTick(() => {
        const tableBody = this.$refs.tableBody
        const height = tableBody.clientHeight * 0.9
        this.tableHeight = height
      })
    },
    // 搜索函数
    searchData1 () {
      const searchQuery = this.input.toLowerCase()
      console.info(searchQuery)
      this.fliterData1 = this.teams.filter(item => {
        return item.round.toLowerCase().includes(searchQuery)
      })
    },
    resetData1 () {
      this.input = ''
      this.fliterData1 = this.teams
    }
  },
  mounted () {
    this.updateTableHeight()
    this.fliterData1 = this.teams
    window.addEventListener('resize', this.updateTableHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateTableHeight)
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

</style>
