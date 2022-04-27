<template>
  <div class="personal ct">
    <div class="left">
      <div class="userTitle">
        <h2>个人中心</h2>
      </div>
      <div class="userMenus">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: isActive === item.path }"
            @click="changeClass(item.path)"
          >
            <router-link to=""
              ><span class="iconfont icon" v-html="item.iconfont" />
              {{ item.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="right_main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      isActive: '/PersonalCenter/myInfomation',
      list: [
        {
          id: 1,
          iconfont: '&#xe882;',
          path: '/PersonalCenter/myInfomation',
          title: '我的资料'
        },
        {
          id: 2,
          iconfont: '&#xe655;',
          path: '/PersonalCenter/myFiles',
          title: '我的文件'
        },
        {
          id: 3,
          iconfont: '&#xe621;',
          path: '/PersonalCenter/uploadFile',
          title: '上传文件'
        },
        {
          id: 4,
          iconfont: '&#xe600;',
          path: '/PersonalCenter/editPassword',
          title: '修改密码'
        },
        {
          id: 5,
          iconfont: '&#xe60e;',
          path: '/PersonalCenter/safeExit',
          title: '安全退出'
        }
      ]
    }
  },
  methods: {
    changeClass(path) {
      this.isActive = path
      this.$router.push(path)
    }
  },
  mounted() {
    let _this = this
    this.list.forEach((item) => {
      if (item.path === this.$route.path) {
        _this.isActive = this.$route.path
      }
    })
  }
}
</script>

<style lang="less" scoped>
.personal {
  .left {
    box-sizing: border-box;
    float: left;
    width: 200px !important;
    height: 100vh;
    padding: 20px;
    border: 1px dashed #1a1a1a;
    background-color: #fbfbfb;
    .userTitle {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eaeaea;
      overflow: hidden;
      text-align: center;
    }
    .userMenus {
      ul {
        margin: 15px;
        padding: 0;
        list-style: none;
        li {
          margin-bottom: 1px;
          a {
            display: block;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 2px;
            color: #1a1a1a;
            .icon {
              font-size: 18px;
            }
          }
          &.active a {
            color: #666;
            background-color: #eee;
            text-decoration: none;
          }
        }
      }
    }
  }
  .right {
    float: left;
    width: 877px;
    padding: 40px;
    .right_main {
      border: 1px dashed red;
      position: relative;
      min-height: 650px;
    }
  }
}
</style>
