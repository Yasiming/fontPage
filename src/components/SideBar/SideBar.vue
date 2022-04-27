<template>
  <div class="side-bar">
    <div class="container_wrapper">
      <div
        class="container_wrapper_card"
        :style="[{ width: isActive ? '120px' : '60px' }]"
      >
        <ul>
          <li
            v-for="(item, index) in list"
            :key="item.id"
            :class="{ active: num === index }"
            :title="item.title"
            @click="handlePathTo(item.path, item.id)"
          >
            <span class="icon iconfont" v-html="item.iconfont"></span>
            <span class="title">{{ item.title }}</span>
          </li>
        </ul>
      </div>

      <div class="container_wrapper_toggle" @click="isActive = !isActive">
        <span class="arrow icon iconfont">
          {{ isActive ? '&#xe7ef;' : '&#xe7ee;' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Pubsub from 'pubsub-js'
export default {
  name: 'SideBar',
  data() {
    return {
      crux: [{}], //声明下变量
      isActive: false,
      list: [
        { id: 1, path: '/page1', iconfont: '&#xe60d;', title: '首页' },
        { id: 2, path: '/search', iconfont: '&#xe60f;', title: '搜索' },
        { id: 3, path: '/user/login', iconfont: '&#xe611;', title: '账户' },
        { id: 4, path: '/superUser', iconfont: '&#xe614;', title: '编辑器' }
      ],
      num: 0
    }
  },
  methods: {
    handlePathTo(path, index) {
      this.num = index - 1
      this.$router.push(path)
    }
  },
  mounted() {
    Pubsub.subscribe('add', (msgName, data) => {
      if (data === '/search') {
        _this.num = 1
      }
    })

    Pubsub.subscribe('page', (msgName, data) => {
      if (data === '/') {
        _this.num = 0
      }
    })
    Pubsub.subscribe('safeExit', (msgName, data) => {
      if (data === '/') {
        _this.num = 0
      }
    })

    let _this = this
    const { path } = this.$route
    this.list.forEach(function (ele) {
      if (path === ele.path) {
        _this.num = ele.id - 1
      }
    })
    if (path === '/') {
      _this.num = 2
    }
  },
  beforeDestroy() {
    Pubsub.unsubscribe()
  }
}
</script>

<style lang="less" scoped>
.active {
  color: rgba(228, 108, 10);
}
.side-bar {
  display: flex;
  .container {
    &_wrapper {
      position: relative;
      &_card {
        background-color: #fff;
        border-radius: 4px;
        //border-right: 1px solid black;
        box-shadow: 0 0.5rem 5px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        transition: 0.5s;
        ul {
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
          padding-left: 20px;
          li {
            display: flex;
            flex-direction: row;
            cursor: pointer;
            line-height: 50px;
            .icon {
              font-size: 22px;
            }
            .title {
              white-space: nowrap;
              font-size: 14px;
              margin-left: 18px;
              padding-right: 10px;
            }
          }
          li:hover {
            span.icon {
              transform: scale(1.4);
              transition: 0.4s;
              color: rgba(228, 108, 10);
            }
            span.title {
              color: rgba(228, 108, 10);
            }
          }
        }
      }
      &_toggle {
        position: absolute;
        width: 20px;
        height: 20px;
        top: calc(50% - 10px);
        right: -10px;
        cursor: pointer;
        background-color: #fff;
        border-radius: 50%;
        border: 3px solid #ccc;
        .arrow {
          line-height: 20px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
