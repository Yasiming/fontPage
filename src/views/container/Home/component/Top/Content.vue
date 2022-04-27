<template>
  <div class="homeitem ct">
    <img src="../images/ht.png" />
    <div class="item_1 ct">
      <div class="tit">在下面挑选您需要的模板进行编辑</div>
      <div class="box">
        <input type="text" ref="ipdata" />
        <div @click="spanbtn">
          <span>免费在线选取</span>
        </div>
      </div>
      <div class="hot" style="color: #fff">
        <p style="line-height: 22px">
          <b>推荐使用：</b>
          <router-link to="/superUser" style="font-size: 16px"
            >在线编辑</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'Content',
  methods: {
    spanbtn() {
      const so = this.$refs.ipdata.value
      this.$router.push('/search?title=' + so)
      PubSub.publish('add', '/search')
      this.$refs.ipdata.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.homeitem {
  // border: 1px solid red;
  padding-left: 80px;
  position: relative;
  min-width: 500px;
  height: 100%;
  img {
    position: absolute;
    top: 5%;
    left: 0;
  }
}
.item_1 {
  position: absolute;
  top: 25%;
  height: 300px;
  margin-top: 20px;
  //border: 1px solid red;
  .tit {
    width: 700px;
    margin: 50px auto;
    color: #fff;
    font-size: 40px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
.box {
  display: flex;
  margin: 50px auto 0 auto;
  width: 640px;
  min-width: 350px;
  border-radius: 39px;
  background-color: #ddf1f7;
  input {
    width: 320px;
    height: 58px;
    line-height: 58px;
    border: 0;
    border-radius: 29px 0 0 29px;
    background-color: #ddf1f7;
    font-size: 14px;
    outline: none;
    padding: 0 20px 0 46px;
    color: #333;
  }
  div {
    padding-left: 30px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    color: #fff;
    height: 60px;
    width: 320px;
    line-height: 58px;
    background-color: #13d8a7;
    border-radius: 0 29px 29px 0;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-out 0.1s;
    &:hover {
      border-radius: 39px;
    }
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
}
.hot {
  margin-top: 20px;
  margin-left: 400px;
  a {
    margin-right: 10px;
    color: #fff;
    text-decoration: none;
  }
}
</style>
