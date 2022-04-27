<template>
  <div id="login-container_reg">
    <div style="text-align: center; height: 50px">注册页面</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="number">
        <el-input v-model="ruleForm.number" autocomplete="off">
          <el-button v-show="show" @click="getCode" slot="append"
            >点击获取验证码</el-button
          >
          <span v-show="!show" slot="append">{{ count }}秒后再次获取</span>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-button style="float: right" @click="login_user"
        >已有账户,点击登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { VCodeApi, UserRegApi } from '@/service/Log'

export default {
  name: 'Register',
  data() {
    var validatePass1 = (rule, value, callback) => {
      var t = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@qq.com$/
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      clearTimeout(timer)
      timer = null
      let timer = setTimeout(() => {
        if (t.test(value)) {
          callback()
        } else {
          // this.ruleForm.VCode = false
          callback(new Error('格式错误并且只能用QQ邮箱注册！'))
        }
      }, 1000)
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
        email: '',
        checkPass: '',
        number: ''
      },
      rules: {
        email: [{ required: true, validator: validatePass1, trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
        ]
      },
      isLogin: false,
      VCode: '',
      setClearTime: ''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user_name = this.ruleForm.name || ''
          const user_pwd = this.ruleForm.pass || ''
          const user_email = this.ruleForm.email || ''
          const user_number = this.ruleForm.number || ''
          //验证验证码
          if (this.VCode == this.ruleForm.number) {
            //验证码正确
            UserRegApi(user_name, user_pwd, user_email).then((res) => {
              if (res.status === 1) {
                this.$message.error(res.message)
              }
              if (res.status === 200) {
                //注册成功
                this.$message.success(res.message + '3秒后跳转到登录界面!')
                //跳转到主页
                setTimeout(() => {
                  this.$router.push('/user/login')
                }, 3000)
              }
            })
          }
        } else {
          alert('提交失败')
          return false
        }
      })
      // this.$router.push({path: "/"});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login_user() {
      this.$router.push('/user/login')
    },
    async getCode() {
      var t = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@qq.com$/
      const user_email = this.ruleForm.email || ''
      if (t.test(user_email)) {
        this.VCode = ''
        const res = await VCodeApi(user_email)
        if (res.status === 200) {
          this.VCode = res.data.code
          this.$message.success('验证码发送成功，有效期5分钟！')
          const TIME_COUNT = 60
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
          clearTimeout(this.setClearTime)
          this.setClearTime = setTimeout(() => {
            this.VCode = ''
          }, 300000)
        } else if (res.status === 1) {
          this.$message.error(res.message)
        }
      } else {
        this.$message.error('请先填写QQ邮箱！')
      }
    },
    changeEmail() {}
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
