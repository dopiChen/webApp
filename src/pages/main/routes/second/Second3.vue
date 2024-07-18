<template>
    <div class="body">
        <span class="title">监考安排表</span>
        <div class="top">
            <div class="top1">
                <el-button type="primary" icon="el-icon-document" style="background-color:dodgerblue;">导入监考信息</el-button>
                <el-button type="primary" plain class="shu" @click="dialogVisible = true">数据导出</el-button>
                <el-input
                    placeholder="请输入工号查询"
                    v-model="input"
                    class="shuru">
                </el-input>
                <el-button type="primary" class="shu2" style="background-color:dodgerblue;" @click="getListSearch">查询</el-button>
                <el-button type="primary" plain class="shu1" @click="resetData1">重置</el-button>
                <div class="table-container">
                    <el-table
                        ref="multipleTable"
                        :data="users"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="25px"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">
                                {{scope.$index + 1 + (currentPage - 1) * pageSize}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="personnel.name"
                            label="姓名"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="personnel.gender"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="personnel.username"
                            label="工号"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="personnel.unit"
                            label="所在单位"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="personnel.phone"
                            label="移动电话"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="examination.examId"
                            label="监考场次"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="examination.examRoom"
                            label="考场名称"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="监考时间"
                            width="150">
                            <template slot-scope="scope">
                                {{ scope.row.examination.fromTime }} 至 {{ scope.row.examination.endTime }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10,20,30,40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="total"
                            class="ye">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getFinalList, getFinalListsearch} from '../../../../api/user'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      input: '',
      users: [],
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getListSearch () {
      getFinalListsearch(this.input, this.currentPage, this.pageSize).then(res => {
        this.users = res.data.data
        this.total = res.data.total
      })
    },
    getList () {
      getFinalList(this.currentPage).then(res => {
        this.users = res.data.data
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    returnclick () {
      this.$router.push({
        path: '/main/second/second3'
      })
    },
    searchData1 () {
      const searchQuery = this.input.toLowerCase()
      this.users = this.users.filter(item => {
        return item.personnel.name.toLowerCase().includes(searchQuery) || item.personnel.username.toLowerCase().includes(searchQuery)
      })
      this.total = this.users.length
      this.currentPage = 1
    },
    resetData1 () {
      this.input = ''
      this.getList()
    }
  }
}
</script>

<style scoped>
.title {
    width: 100px;
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
    top: 18px;
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
.shuru {
    position: absolute;
    right: 172px;
    width: 230px;
}
.title1 {
    width: 160px;
    height: 28px;
    font-weight: 500;
    font-size: 20px;
    color: #000000e6;
    text-align: right;
    line-height: 28px;
    position: absolute;
    top: 18px;
}

</style>
