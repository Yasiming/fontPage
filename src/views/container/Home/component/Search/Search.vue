<template>
  <div class="ct search">
    <div class="search_top">
      <div>
        <h1>高级检索</h1>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form label-width="100px">
              <el-form-item label="标题：">
                <el-input v-model="title" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form label-width="20" class="ddd">
              <el-form-item label="日期:">
                <el-date-picker
                  value-format="yyyy年MM月dd日 hh时mm分ss秒"
                  v-model="date"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="height: 60px"></div>
        <div class="search_button">
          <el-button
            type="warning"
            icon="el-icon-orange
"
            @click="handleClearButton"
            >重置</el-button
          ><el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchFile"
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <div class="search_bottom">
      <el-table
        class="table"
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.file_title.toLowerCase().includes(search.toLowerCase())
          )
        "
        height="450"
        stripe
        style="width: 100%"
      >
        <el-table-column label="编号" prop="order" />
        <el-table-column label="上传日期" prop="file_add_time">
        </el-table-column>
        <el-table-column label="文件标题" prop="file_title"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入文件标题" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >查看/下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllFile, getIndexFile } from '@/service/File'
import config from '@/config/config'
import Pubsub from 'pubsub-js'
export default {
  name: 'Search',
  inject: ['reload'], // 使用 inject 注入 reload 变量
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      title: '',
      date: '',
      tableData: [],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      window.open(config.BASE_URL + row.file_src)
    },
    handleClearButton() {
      this.title = ''
      this.date = ''
      this.search = ''
      getAllFile().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].order = i + 1
        }
        this.tableData = res.data
        this.$router.push('/search')
      })
    },
    handleSearchFile() {
      if (this.title && this.date) {
        const startTime = this.date[0]
        const endTime = this.date[1]
        getIndexFile(this.title, startTime, endTime).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].order = i + 1
          }
          this.tableData = res.data
        })
      } else {
        this.$message.error('请输入对应信息')
      }
    }
  },
  mounted() {
    let _this = this
    Pubsub.subscribe('add', (msgName, data) => {
      if (data === '/search') {
        getIndexFile(this.$route.query.title).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].order = i + 1
          }
          _this.tableData = res.data
        })
      }
    })
    if (this.$route.query.title) {
      getIndexFile(this.$route.query.title).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].order = i + 1
        }
        _this.tableData = res.data
      })
    } else {
      getAllFile().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].order = i + 1
        }
        _this.tableData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 100vh;
  background-color: #fff;
  //box-sizing: border-box;
  .search_top {
    background-color: #fff;
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    div {
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
      .search_form {
        height: 40px;
        line-height: 40px;
        .search_input {
          width: (100% - 1100px);
        }
      }
      .search_button {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
    }
  }
  .el-date-editor {
    width: 400px !important;
  }
  .search_bottom {
    box-sizing: border-box;
    background-color: #fff;
    padding: 0px 13px 13px 13px;
    .table {
      min-height: 400px;
      max-height: 730px;
    }
  }
}
</style>
