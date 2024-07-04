<template>
    <div class="body">
        <span class="title">报名审批</span>
        <div class="top">
            <div class="top1">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待我审批" name="first">
                        <el-button type="primary" icon="el-icon-user-solid">邀约</el-button>
                        <el-button type="primary" plain class="shu">数据导出</el-button>
                        <el-select v-model="value" placeholder="请选择监考批次" class="xuanze">
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
                            class="shuru">
                        </el-input>
                        <el-button type="primary" class="shu2">查询</el-button>
                        <el-button type="primary" plain class="shu1">重置</el-button>
                        <div class="table-container"><el-table
                            ref="multipleTable"
                            :data="paginatedData"
                            tooltip-effect="dark"
                            style="width: 100%"
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
                                label="操作">
                                <el-button type="text">审批</el-button>
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
                                :total="tableData.length"
                            class="ye">
                            </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="同意报名" name="second">
                    </el-tab-pane>
                    <el-tab-pane label="不同意报名" name="third">
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
      pageSize: 10,
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
      tableData: [{
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
      }]
    }
  },
  computed: {
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.tableData.slice(start, end)
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
.xuanze{
    position: absolute;
    right: 420px;
}
</style>
