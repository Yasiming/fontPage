<template>
  <div class="center_title ct">
    <div class="home-table">
      <htx-list-table
        v-loading="loading"
        v-for="item in newurl"
        :item="item"
        :key="item._id"
      ></htx-list-table>
    </div>
  </div>
</template>

<script>
import HtxListTable from '../ListTab'
//网络请求
import { HomeIMG_APi } from '@/service/Home'

export default {
  name: 'first',
  components: {
    HtxListTable
  },
  data() {
    return {
      newurl: {},
      loading: true
    }
  },
  async mounted() {
    const res = await HomeIMG_APi(3)
    this.newurl = res.data
    this.loading = false
  }
}
</script>

<style>
.center_title {
  min-height: 440px;
}
.home-table {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
</style>
