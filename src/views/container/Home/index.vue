<template>
  <div class="home">
    <!--  上半部分  -->
    <div class="home_top">
      <!--      <div class="home_menu"><htx-menu /></div>-->
      <!--      <div class="home-side-bar"><htx-side-bar /></div>-->
      <htx-particle />
      <htx-content />
    </div>
    <!-- 中部A4缩放区   -->
    <div class="home_center">
      <htx-division />
      <htx-template-centent />
    </div>

    <Footer />
  </div>
</template>

<script>
import HtxSideBar from '@/components/SideBar/SideBar'
import HtxMenu from '@/views/container/Home/component/Top/Menu'
import HtxParticle from '@/views/container/Home/component/Top/Particle'
import HtxContent from '@/views/container/Home/component/Top/Content'
import HtxDivision from '@/views/container/Home/component/Center/Division'
import HtxTemplateCentent from '@/views/container/Home/component/Center/TemplateCentent'
import Footer from '@/views/container/Home/component/Footer/Footer'

export default {
  name: 'index',
  components: {
    Footer,
    HtxSideBar,
    HtxMenu,
    HtxParticle,
    HtxContent,
    HtxDivision,
    HtxTemplateCentent
  }
}
</script>

<style lang="less" scoped>
.home {
  min-width: 800px !important;
  height: 1600px;
  .home_top {
    overflow: hidden;
    height: 80vh;
    min-width: 900px !important;
    width: 100%;
    background: linear-gradient(180deg, #d4ffe7, #13d8a7);
    .home_menu {
      position: fixed;
      z-index: 10000;
      right: 0;
    }
  }

  .home_center {
    //padding-left: 80px;
    height: 1150px;
    background-color: #f5f5f5;
  }
}
</style>
