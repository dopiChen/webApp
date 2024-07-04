<template>
    <div class="body">
        <span class="title">监考记录</span>
        <div class="main_body">
            <div class="selectbody">
                <div class="demo-input-suffix">
                    <el-input
                            placeholder="输入监考名称关键词"
                            prefix-icon="el-icon-search"
                            v-model="input2">
                    </el-input>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="info">重置</el-button>
                </div>
            </div>
            <div class="tablebody">
                <el-table
                        :data="currentTableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="index"
                            label="序号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="round"
                            width="400"
                            label="监考批次">

                    </el-table-column>
                    <el-table-column
                            prop="startdate"
                            label="报名开始时间"
                            width="450">
                    </el-table-column>
                    <el-table-column
                            prop="overdate"
                            label="报名结束时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            label="是否确认"
                            width="400">
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="handlecomfirm(scope.row)">{{
                                scope.row.state
                                }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="handleclick(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
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
export default {
  name: 'Third2',
  data () {
    return {
      welcome: '欢迎第三用户！',
      input1: '',
      input2: '',
      checked: true,
      teams: [{
        id: 'A',
        index: '00',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'

      }, {
        id: 'B',
        index: '01',
        round: '2023B楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'C',
        index: '02',
        round: '2023C楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'D',
        index: '03',
        round: '2023D楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'E',
        index: '04',
        round: '2023E楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '05',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '06',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '07',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '08',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '09',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '10',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '11',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '12',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '13',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '14',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '15',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '16',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '17',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '18',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }, {
        id: 'A',
        index: '19',
        round: '2023A楼2023监考报名',
        startdate: '2023-9-12-10:30:00',
        overdate: '2023-10-12-10:30:00',
        state: '已确认'
      }
      ],
      expandedTeam: null, // 存储当前展开的队伍信息
      pageSize: 15, // 每页显示行数
      currentPage: 1 // 当前页码
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
      return this.teams.slice(start, end)
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
    handlecomfirm (row) {
      if (row.state === '已确认') {
        row.state = '未确认'
      } else {
        row.state = '已确认'
      }
    }
  },
  mounted () {
    this.updateTableHeight()
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
    margin-top: 15px;
}

.tablebody {
    padding: 1rem;
    margin-top: 1rem;
    width: 95%;
    background-color: white;
    flex: 1 1 auto; /* 让 tablebody 占据剩余的所有空间 */

}

.block {
    padding: 1rem;
    width: 95%;
    background-color: white;
    margin-bottom: 100px;
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
    margin-top: 20px;
    margin-left: 10px;
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
