<template>
  <div style="box-sizing: border-box">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      height="600"
    >
      <el-table-column label="上传日期" prop="file_add_time"> </el-table-column>
      <el-table-column label="文件标题" prop="file_title"> </el-table-column>
      <el-table-column label="审核状态" prop="file_pass">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.file_pass === '审核中' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.file_pass }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.file_pass === '审核中' ? true : false"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >查看文件</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除文件</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DeleteUserFileApi, UserFileStateApi } from '@/service/File'
import { getCache, CHECKTOKEN } from '@/config/store2'

export default {
  name: 'MyFiles',
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      window.open('http://localhost:5000' + row.file_src)
    },
    handleDelete(index, row) {
      console.log(index, '2', row)
      DeleteUserFileApi(row._id).then((res) => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.tableData.forEach((item, index) => {
            if (item._id === row._id) {
              this.tableData.splice(index, 1)
            }
          })
        }
      })
    }
  },
  mounted() {
    let _this = this
    const user_id = getCache(CHECKTOKEN)?.token
    UserFileStateApi(user_id).then((res) => {
      _this.tableData = res.data
    })
  }
}
</script>

<style scoped></style>
