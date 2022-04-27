<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpass">
        <el-input
          size="mini"
          style="width: 300px"
          type="password"
          v-model="ruleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
          size="mini"
          style="width: 300px"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          size="mini"
          style="width: 300px"
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button round type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button round @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCache, CHECKTOKEN } from '@/config/store2'
import { EditPasswordApi } from '@/service/Log'

export default {
  name: 'EditPassword',
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      count: '',
      timer: null,
      ruleForm: {
        name: '',
        pass: '',
        email: ''
      },
      rules: {
        oldpass: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        pass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ]
      },
      isLogin: false,
      VCode: '',
      setClearTime: ''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const user_name = getCache(CHECKTOKEN)?.user_name
          const oldPassword = this.ruleForm.name
          const newPassword = this.ruleForm.pass
          const res = await EditPasswordApi(user_name, oldPassword, newPassword)
          if (res.status === 200) {
            this.$message.success(res.message)
          } else if (res.status === 0) {
            this.$message.error(res.message)
          } else {
            this.$message.error('服务器错误！')
          }
        }
      })
      // this.$router.push({path: "/"});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login_user() {
      this.$router.push('/user/login')
    }
  },
  destroyed() {
    this.VCode = ''
  }
}
</script>

<style scoped>
#login-container_reg {
  width: 400px;
  height: 480px;
  background: #e5e9f2;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -250px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
}
</style>
