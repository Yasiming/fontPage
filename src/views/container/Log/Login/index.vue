<template>
  <div class="login">
    <div id="login-container">
      <div style="text-align: center; height: 50px">登录页面</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户" prop="user">
          <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="reg_user">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { UserLoginApi } from '@/service/Log'
import { setCache, CHECKTOKEN } from '@/config/store2'
import Pubsub from 'pubsub-js'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'))
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass')
        }
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
    return {
      ruleForm: {
        user: '',
        pass: ''
      },
      rules: {
        user: [{ validator: validatePass, trigger: 'blur' }],
        pass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      isLogin: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const user_name = this.ruleForm.user || ''
          const user_pwd = this.ruleForm.pass || ''
          const res = await UserLoginApi(user_name, user_pwd)
          if (res.status === 200) {
            setCache(CHECKTOKEN, res.result)
            this.$store.dispatch('userInfo', res.result)
            this.$message.success(res.message)
            Pubsub.publish('page', '/')
            this.$router.push('/')
          } else {
            this.$message.error('用户名或者密码错误！')
          }
        } else {
          alert('提交失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    reg_user() {
      this.$router.push('/user/reg')
    }
  }
}
</script>

<style scoped>
#login-container {
  width: 400px;
  height: 290px;
  background: #e5e9f2;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
}
</style>
