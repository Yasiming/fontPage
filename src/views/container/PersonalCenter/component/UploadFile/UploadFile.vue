<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" :rules="rules">
    <el-form-item label="文件名：" prop="name">
      <el-input
        v-model="ruleForm.name"
        style="width: 300px"
        size="mini"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="上传文件：" prop="upload">
      <el-upload
        v-model="ruleForm.upload"
        ref="mYupload"
        name="file"
        class="upload-demo"
        drag
        action="/apifile/user/upload_file"
        show-file-list
        :limit="limit"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCache, CHECKTOKEN } from '@/config/store2'
import { UploadTempSave } from '@/service/File'

export default {
  data() {
    return {
      limit: 1,
      ruleForm: {
        name: '',
        upload: ''
      },
      title: '',
      file_src: '',
      rules: {
        name: [{ required: true, message: '请输入文件标题', trigger: 'blur' }],
        upload: [{ required: true, message: '请添加文件', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSuccess(res) {
      console.log(res)
      if (res.status === 200) {
        this.ruleForm.upload = '1'
        this.file_src = res.data.file_name
        this.$message.success(res.message)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const token = getCache(CHECKTOKEN).token
          const user_name = getCache(CHECKTOKEN).user_name
          const title = this.ruleForm.name
          const file_src = this.file_src
          if (file_src !== '') {
            const res = await UploadTempSave(token, user_name, title, file_src)
            if (res.status === 200) {
              this.file_src = ''
              this.ruleForm.name = ''
              this.ruleForm.upload = ''
              this.$message.success(res.result)
              this.$refs.mYupload.clearFiles()
            }
          } else {
            this.$message.error('未知错误，请重新登录再试。')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
