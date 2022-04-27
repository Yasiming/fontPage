<template>
  <div class="ct">
    <!--    第一层-->
    <ul>
      <li
        :class="[{ liClass: liNum === index }]"
        @click="btnli(index, item.path)"
        v-for="(item, index) in demo"
        :key="index"
        style="list-style: none; float: left"
      >
        {{ item.a1 }}
      </li>
    </ul>
    <!--   第二层-->
    <!-- A4缩放区域-->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'templateCenter',
  data() {
    return {
      demo: [
        { a1: '采购合同', path: '/page1' },
        { a1: '劳动合同', path: '/page2' },
        { a1: '工业品买卖合同', path: '/page3' }
      ],
      liNum: 0
    }
  },
  mounted() {
    let num = this.$route.fullPath.split('page')[1]
    let newNum = Number(num)
    this.liNum = newNum - 1
  },
  methods: {
    btnli(e, url) {
      this.liNum = e
      this.$router.push(url)
    },
    bottomNumcli(e) {
      this.bottomNum = e
    }
  }
}
</script>

<style lang="less" scoped>
.ct {
  //margin-top: 50px;
  border-radius: 4px;
  background-color: #fff;
  ul:nth-child(1) {
    border-bottom: 2px solid #f3f4f9;
    height: 72px;
    li {
      cursor: pointer;
      height: 100%;
      line-height: 72px;
      padding: 0 20px;
    }
  }
  .ulClass1 {
    margin: 0;
    height: 72px;
    li {
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      padding: 0 15px;
      border-radius: 4px;
      color: #666;
    }
  }
}

.liClass {
  color: #5faae8;
  border-bottom: 2px solid #007aff;
}
.liClass2 {
  color: #fff !important;
  background-color: #007aff;
}
</style>
