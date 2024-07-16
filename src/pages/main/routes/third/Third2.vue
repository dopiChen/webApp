<template>
    <div class="body">
        <span class="title">监考记录</span>
        <div class="main_body">
            <div class="selectbody">
                <div class="demo-input-suffix">
                    <el-input
                            placeholder="输入考试编号查询"
                            prefix-icon="el-icon-search"
                            v-model="input">
                    </el-input>
                    <el-button type="primary" @click="searchData1">搜索</el-button>
                    <el-button type="info" @click="resetData1">重置</el-button>
                </div>
            </div>
            <div class="tablebody">
                <el-table
                        :data="currentdata"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="examId"
                            label="考试编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="工号"
                            width="450">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="450">
                    </el-table-column>
                    <el-table-column
                        prop="way"
                        label="报名方式"
                        width="450">
                    </el-table-column>
                    <el-table-column
                            prop="intendedCampus"
                            label="校区"
                            width="400">
                    </el-table-column>
                    <el-table-column
                        prop="isComfirm"
                        label="是否确认"
                        width="400">
                        <template v-slot="scope">
                            <el-button
                                type="text"
                                size="small"
                                :disabled="scope.row.isComfirm === 1"
                                @click="scope.row.isComfirm === 0 ? handlecomfirm(scope.row) : null">
                                {{ scope.row.isComfirm === 1 ? '已确认' : '未确认' }}
                            </el-button>
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
import {mapState} from 'vuex'
import {_doComfirm, _getAllComfirm, _searchComfirm} from '../../../../api/api'

export default {
  name: 'Third2',
  data () {
    return {
      input: '',
      checked: true,
      currentdata: [],
      teams: [],
      expandedTeam: null // 存储当前展开的队伍信息
    }
  },
  created () {
    this.fetchData1()
  },
  computed: {
    ...mapState({
      username: state => state.user.id // 映射 userId
    })
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
      _doComfirm(this.username, row.examId).then(res => {
        this.$message({
          message: '确认成功',
          type: 'success'
        })
      })
      this.fetchData1()
    },
    resetData1 () {
      this.input = ''
      this.currentdata = this.teams
    },
    searchData1 () {
      if (this.input === '') {
        this.currentdata = this.teams
      } else {
        _searchComfirm(this.username, this.input).then(res => {
          this.currentdata = res.data
        })
      }
    },
    async fetchData1 () {
      _getAllComfirm(this.username).then(res => {
        this.teams = res.data
        this.currentdata = this.teams
      })
    }
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
