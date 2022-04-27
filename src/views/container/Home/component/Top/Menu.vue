<template>
  <div class="c_body">
    <div class="menu" :class="{ active: isActive }">
      <div class="toggle" @click="toggleClick">
        <span style="font-size: 10px">主要</span>
      </div>
      <li style="--i: 0">
        <router-link to="/user/reg">注册</router-link>
      </li>
      <li style="--i: 1">
        <router-link to="/user/login">登录</router-link>
      </li>
      <li style="--i: 2">
        <router-link to="/superUser">模板</router-link>
      </li>
      <li style="--i: 3">
        <a href="#"><i class="el-icon-delete"></i></a>
      </li>
      <li style="--i: 4">
        <a href="#"><i class="el-icon-delete"></i></a>
      </li>
      <li style="--i: 5">
        <a href="#"><i class="el-icon-delete"></i></a>
      </li>
      <li style="--i: 6">
        <a href="#"><i class="el-icon-delete"></i></a>
      </li>
      <li style="--i: 7">
        <a href="#"><i class="el-icon-delete"></i></a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      isActive: false,
      timer: ''
    }
  },
  methods: {
    toggleClick() {
      this.isActive = !this.isActive
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isActive = false
      }, 10000)
    }
  }
}
</script>

<style lang="less">
.c_body {
  width: 200px;
  height: 200px;
  .menu {
    opacity: 0.8;
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    .toggle {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #1e1c1c;
      background: #fff;
      width: 60px;
      height: 60px;
      z-index: 1000;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
      font-size: 2em;
      transition: all 1.25s;
    }

    li {
      left: -10px;
      position: absolute;
      list-style: none;
      transform-origin: 100px;
      transition: 0.5s;
      transition-delay: calc(0.1s * var(--i));
      transform: rotate(0deg) translateX(100px);
      //transform: rotate(calc(360deg / 8 * var(--i)));
      //display: flex;
      //justify-content: center;
      //align-items: center;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
        transform: rotate(calc(360deg / -8 * var(--i)));
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
        color: #333;
        transition: 0.5s;

        &:hover {
          color: red;
        }
      }
    }
  }
}

.menu.active .toggle {
  //315
  transform: rotate(360deg);
}

.active li {
  left: 0 !important;
  transform: rotate(calc(360deg / 8 * var(--i))) !important;
}
a {
  text-decoration: none;
  font-size: 10px;
}
</style>
