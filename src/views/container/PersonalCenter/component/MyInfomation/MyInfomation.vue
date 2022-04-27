<template>
  <div class="myInformation">
    <el-form label-width="100px">
      <el-form-item label="用户名：" prop="user">
        <el-input
          v-model="user_name"
          disabled
          style="width: 300px"
          size="mini"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="注册时间：" prop="user">
        <el-input
          v-model="user_reg"
          disabled
          style="width: 300px"
          size="mini"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="user">
        <el-input
          v-model="user_email"
          disabled
          style="width: 300px"
          size="mini"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findUserInfoApi } from '@/service/Log'
import { getCache, CHECKTOKEN } from '@/config/store2'

export default {
  name: 'MyInfomation',
  data() {
    return {
      user_name: '',
      user_reg: '',
      user_email: ''
    }
  },
  async mounted() {
    let _this = this
    const token = getCache(CHECKTOKEN)?.token
    const res = await findUserInfoApi(token)
    if (res.status === 200) {
      _this.user_name = res.data.user_name
      _this.user_reg = res.data.register_time
      _this.user_email = res.data.user_email
    }
  }
}
</script>

<style lang="less" scoped>
.myInformation {
  input {
    color: #1a1a1a;
  }
}
</style>
