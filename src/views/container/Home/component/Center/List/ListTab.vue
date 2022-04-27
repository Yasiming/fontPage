<template>
  <div class="home-tab">
    <img
      :src="url + item.file_img"
      :alt="item.file_title"
      style="width: 100%"
      @click="btnClick(item)"
    />
  </div>
</template>

<script>
import config from '@/config/config'
import { checkTokenApi } from '@/service/Log'
export default {
  name: 'Home',
  props: ['item'],
  data() {
    return {
      url: config.BASE_URL
    }
  },
  methods: {
    async btnClick({ file_src }) {
      const res = await checkTokenApi()
      if (res.status === 200) {
        const newSrc = config.BASE_URL + file_src
        window.open(newSrc)
      } else {
        this.$message.error(res.message)
        this.$router.push('/user/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-tab {
  box-sizing: border-box;
  display: inline-block;
  margin: 15px;
  height: 380px;
  width: 260px;
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  //transition: all .5s;
  &:hover {
    border: 3px solid #13d8a7;
    cursor: pointer;
  }
}
</style>
