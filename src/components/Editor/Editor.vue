<template>
  <div>
    <section style="min-height: 371px" id="tinymce-editor"></section>
  </div>
</template>

<script>
import '../../../public/tinymce/langs/zh-Hans.js'
import '../../../public/tinymce/plugins/table/plugin.min'
import '../../../public/tinymce/plugins/image/plugin.min'
import '../../../public/tinymce/plugins/media/plugin.min'
import '../../../public/tinymce/themes/silver/theme.min'
//初始化设置
import EditorBase from '../../config/EditorBase'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  name: 'app',
  data() {
    return {
      key: '',
      content: ''
    }
  },
  methods: {
    handleClearCatch() {
      tinymce.activeEditor.setContent('')
    }
  },
  mounted() {
    tinymce.init({
      width: '824px',
      selector: '#tinymce-editor',
      language: 'zh-Hans',
      toolbar: EditorBase.toolbar,
      plugins: ['table', 'image', 'media'],
      branding: false,
      resize: false,
      // 图片异步上传处理函数
      images_upload_handler: (blobInfo, progress) =>
        new Promise((resolve, reject) => {
          const a = blobInfo.base64()
          if (a) {
            resolve('data:image/jpeg;base64,' + a)
          } else {
            reject('图片添加失败，请控制上传图片大小！')
          }
        }),
      //初始化
      setup: (editor) => {
        console.log('开始进行初始化')
        editor.on('init', (e) => {
          editor.setContent(this.value)
        })
      },
      //监听input、change,实时更新value
      init_instance_callback: (editor) => {
        editor.on('input', (e) => {
          this.$emit('input', e.target.innerHTML)
        })
        editor.on('change', (e) => {
          this.$emit('input', e.level.content)
        })
      }
    })
  },
  destroyed() {
    tinymce.remove()
  }
}
</script>

<style></style>
