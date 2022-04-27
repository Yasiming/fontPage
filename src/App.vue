<template>
  <div id="app">
    <div class="home-side-bar"><htx-side-bar /></div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import HtxSideBar from '@/components/SideBar/SideBar'
export default {
  name: 'app',
  provide() {
    // 在祖先组件中通过 provide 提供变量
    return {
      reload: this.reload //  声明一个变量
    }
  },
  components: {
    HtxSideBar
  },
  data() {
    return {
      isRouterAlive: true // 控制 router-view 是否显示达到刷新效果
    }
  },
  methods: {
    // provide中声明的变量
    reload() {
      // 通过 this.isRouterAlive 控制 router-view 达到刷新效果
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="less">
#app {
  background-color: #eee;
}
.home-side-bar {
  position: fixed;
  left: 0;
  z-index: 999999999;
}
</style>
