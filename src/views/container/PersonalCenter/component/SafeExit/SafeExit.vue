<template>
  <div>正在退出中,若无反应请刷新页面再试。</div>
</template>

<script>
import { SafeExitApi } from '@/service/Log'
import Pubsub from 'pubsub-js'
export default {
  name: 'SafeExit',
  mounted() {
    SafeExitApi().then((res) => {
      localStorage.clear()
      this.$message.success('退出成功')
      Pubsub.publish('safeExit', '/')
      this.$router.push('/page1')
    })
  }
}
</script>

<style scoped></style>
