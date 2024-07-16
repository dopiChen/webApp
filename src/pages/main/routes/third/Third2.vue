<template>
    <div class="body">
        <span class="title">监考记录</span>
        <div class="main_body">
            <div class="selectbody">
                <div class="demo-input-suffix">
                    <el-input
                            placeholder="输入监考名称关键词"
                            prefix-icon="el-icon-search"
                            v-model="query.batchName">
                    </el-input>
                    <el-button type="primary" @click="getList">搜索</el-button>
                    <el-button type="info">重置</el-button>
                </div>
            </div>
            <div class="tablebody">
                <el-table
                        :data="lists"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                        label="序号">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="batchName"
                            width="400"
                            label="监考批次">
                    </el-table-column>
                    <el-table-column
                            prop="startDate"
                            label="报名开始时间"
                            width="450">
                    </el-table-column>
                    <el-table-column
                            prop="endDate"
                            label="报名结束时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                        prop="year"
                        label="创建时间"
                        show-overflow-tooltip>
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
                    style="margin-top: 20px"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.pageNo"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="query.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {batchList} from '../../../../api/user'

export default {
  name: 'Third2',
  data () {
    return {
      total: 0,
      welcome: '欢迎第三用户！',
      input: '',
      checked: true,
      lists: [],
      expandedTeam: null, // 存储当前展开的队伍信息
      query: {
        batchName: '',
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSizeChange (value) {
      // 吧页面大小重新赋值，然后重新获取数据
      this.query.pageSize = value
      this.getList()
    },
    handleCurrentChange (value) {
      this.query.pageNo = value
      this.getList()
    },
    handlecomfirm (row) {
      if (row.state === '已确认') {
        row.state = '未确认'
      } else {
        row.state = '已确认'
      }
    },
    getList () {
      console.info(this.query.batchName)
      batchList(this.query).then(res => {
        console.info(res)
        this.lists = res.data.records
        this.total = res.data.total
      })
    }
  },
  created () {
    this.getList()
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
