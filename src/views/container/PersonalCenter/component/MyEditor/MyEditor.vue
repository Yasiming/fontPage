<template>
  <div class="dds">
    <div v-for="(person, index) in list" :key="index" class="mtt">
      <div class="aas">
        <el-tag @click="handleClick(person)">{{ person.user_title }}</el-tag>
        <p @click="handleDelete(person)">>删除</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCache, CHECKTOKEN, setCache } from '@/config/store2'
import {
  getUserEditor,
  deleteUserEditor
} from '../../../../../service/Log/index'

export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    let _this = this
    const user_id = getCache(CHECKTOKEN).token
    getUserEditor(user_id).then((res) => {
      _this.list = res.data
    })
  },
  methods: {
    handleClick(person) {
      const editor_title = person.user_title
      const editor_content = person.user_editor
      const editTempid = person._id
      setCache('_id', editTempid)
      setCache('TempSaveInfo', editor_content)
      setCache('TempSaveTitle', editor_title)
      setCache('isEditor', 'ok')
      this.$router.push({
        path: '/superUser'
      })
    },
    handleDelete(person) {
      const _id = person._id
      if (confirm('确定删除吗？')) {
        deleteUserEditor(_id)
        this.$router.go(0)
      }
    }
  }
}
</script>

<style>
.dds {
  display: flex;
}
.mtt {
  margin: 10px 10px;
  cursor: pointer;
}
.aas {
  display: flex;
  align-items: center;
}
</style>
