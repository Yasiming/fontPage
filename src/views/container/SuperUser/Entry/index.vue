<template>
  <div class="body-bgc">
    <div class="superUser">
      <div>
        <div></div>
        <div class="editCenter">
          <el-link
            id="htx1"
            :underline="false"
            icon="el-icon-s-promotion"
            @click="() => (isShowBottom = !isShowBottom)"
            >{{ !isShowBottom ? '隐藏编辑器' : '显示编辑器' }}</el-link
          >
          <div class="title_tt">
            <el-button type="text" @click="dialogVisible = true">{{
              title ? title : '点击输入标题'
            }}</el-button>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <div>标题：</div>
              <div><el-input v-model="title" /></div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
          <div class="mr30">
            <div id="htx2">
              <el-link
                style="margin-right: 12px"
                @click="handleEditorSave"
                :underline="false"
                icon="el-icon-s-promotion"
                >保存到云端</el-link
              >
              <el-link
                style="margin-right: 12px"
                @click="handleTempSaveInfoTOLocal"
                :underline="false"
                icon="el-icon-s-promotion"
                >临时保存</el-link
              >
              <el-link
                style="margin-right: 12px"
                @click="handleCleanData"
                :underline="false"
                icon="el-icon-s-promotion"
                >清空缓存</el-link
              >
              <el-button @click="handleSavePDFTOLocal" type="info" round
                >保存PDF至本地</el-button
              >
            </div>
          </div>
        </div>
        <div style="height: 70px"></div>
      </div>
      <go-top />
      <!--   预览区域   -->
      <div class="ct printContent">
        <div style="--i: 1" class="sild"></div>
        <div style="--i: 2" class="sild"></div>
        <div style="--i: 3" class="sild"></div>
        <div style="--i: 4" class="sild"></div>
        <div style="--i: 5" class="sild"></div>
        <div style="--i: 6" class="sild"></div>
        <div style="--i: 7" class="sild"></div>
        <div style="--i: 8" class="sild"></div>
        <div style="--i: 9" class="sild"></div>
        <!-- 页面显示区域 -->
        <div
          class="printHtml"
          v-html="value"
          style="
            background-color: #fff;
            width: 788px;
            min-height: 1160px;
            margin: 0;
            padding: 0px 16px;
            word-break: break-all;
          "
        ></div>
      </div>
    </div>
    <div style="min-height: 400px"></div>
    <!--   下半部操作区域-->
    <transition name="fade">
      <div
        v-show="!isShowBottom"
        class="main_footer"
        :style="!isShow ? 'height:72px' : 'height:375px'"
      >
        <!--图片      -->
        <div id="htx3" class="ft_icon" :class="isShow && 'shake'">
          <img @click="isShow = !isShow" src="../image/footer.svg" alt="" />
        </div>
        <transition name="fade">
          <div v-show="isShow" class="editPosition">
            <editor ref="EditorRef" v-model="value" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import GoTop from '@/views/container/SuperUser/component/GoTop'
import Editor from '@/components/Editor/Editor'
import { getPdf } from '@/config/untis'
import { getCache, removeCache, setCache, CHECKTOKEN } from '@/config/store2'
import { SaveUserEditor, editorUserEditor } from '../../../../service/Log/index'

import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

export default {
  name: 'superUser',
  inject: ['reload'], // 使用 inject 注入 reload 变量
  data() {
    return {
      value: '',
      show: true,
      isShow: false, //底部展示控制
      isShowBottom: false,
      title: '',
      dialogVisible: false
    }
  },
  components: {
    Editor,
    GoTop
  },
  methods: {
    handleSavePDFTOLocal() {
      getPdf('.printHtml')
      removeCache('TempSaveInfo')
      removeCache('TempSaveTitle')
    },
    handleTempSaveInfoTOLocal() {
      setCache('TempSaveInfo', this.value)
    },
    handleCleanData() {
      removeCache('TempSaveInfo')
      removeCache('TempSaveTitle')
      this.$refs['EditorRef'].handleClearCatch()
      this.value = ''
      this.title = ''
    },
    handleEditorSave() {
      const user_name = getCache(CHECKTOKEN).user_name
      const user_id = getCache(CHECKTOKEN).token
      const user_editor = this.value
      const user_title = this.title
      const isEditor = getCache('isEditor')
      if (isEditor !== 'ok') {
        if (user_editor !== '' && user_title !== '') {
          SaveUserEditor(user_name, user_id, user_editor, user_title).then(
            (res) => {
              console.log(res, 'dddddddddd')
              if (res.status === 200) {
                alert(res.message)
              }
            }
          )
        } else {
          alert('标题与编辑不能为空')
        }
      } else {
        const _id = getCache('_id')
        const user_editor = this.value
        const user_title = this.title
        editorUserEditor(_id, user_editor,user_title).then((res) => {
          if (res.status === 200) {
            alert('修改成功！')
          }
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  },
  created() {},
  mounted() {
    //获取缓存数据
    this.value = getCache('TempSaveInfo') || ''
    this.title = getCache('TempSaveTitle') || ''
    if (!window.name) {
      const driver = new Driver({
        allowClose: false, //禁止点击外部关闭,
        doneBtnText: '完成', // 完成按钮标题

        closeBtnText: '关闭', // 关闭按钮标题

        stageBackground: '#fff', // 引导对话的背景色

        nextBtnText: '下一步', // 下一步按钮标题

        prevBtnText: '上一步' // 上一步按钮标题
      })
      driver.defineSteps([
        {
          element: '#htx1',
          popover: {
            title: '操作提示 1/3', //也可以使用HTML标签
            description: '隐藏或显示底部编辑框', //也可以使用HTML标签
            position: 'bottom', //位置，可选值： left, left-center, left-bottom, top, top-center, top-right, right, right-center, right-bottom, bottom, bottom-center, bottom-right, mid-center
            offset: 10 //位移大小
          }
        },
        {
          element: '#htx2',
          popover: {
            title: '文件操作 2/3',
            description: '编辑过程中记得保存一下，防止网页关闭造成数据丢失',
            position: 'left'
          }
        },
        {
          element: '#htx3',
          popover: {
            title: '编辑器 3/3',
            description:
              '点击图标打开/关闭编辑器，预览页面红色虚线为分页符，上下需要间隔两个回车键的距离。',
            position: 'top'
          }
        }
      ])
      driver.start()
    }
    window.name = true
  },
  destroyed() {
    window.name = false
    setCache('isEditor', 0)
  }
}
</script>

<style lang="less" scoped>
.body-bgc {
  background-image: linear-gradient(#c2cbd9, #c3cfe2);
  min-height: 1300px;
  overflow: hidden;
  .superUser {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 100000 !important;
    .editCenter {
      width: 100%;
      position: fixed;
      box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1),
        0 0 4px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding: 10px 10px 10px 135px;
      border: 1px dashed #ccc;
      z-index: 100000 !important;
    }
    //打印区域居中
    .pct {
      width: 820px;
      margin: 0 auto;
    }
    .printContent {
      position: relative;
      background-color: #fff;
      min-height: 100px;
      width: 820px;
      border: 1px solid #ccc;
      .sild {
        position: absolute;
        width: 820px;
        border: 1px dashed red;
        top: calc(1160px * var(--i));
        right: 0;
      }
    }
  }
}

[v-cloak] {
  display: none;
}

.mr30 {
  margin-right: 160px;
  z-index: 100000 !important;
}
.main_footer {
  //overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid black;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.4);
  transition: all 0.6s;
  z-index: 10;
  .ft_icon {
    position: absolute;
    width: 100px;
    display: inline-block;
    //border: 1px solid red;
    left: 80%;
    top: -50px;
    img {
      z-index: 100;
      width: 100%;
    }
  }
  .editPosition {
    width: 820px;
    margin: 0 auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.title_tt {
  height: 40px;
  line-height: 40px;
  display: flex;
}
</style>
