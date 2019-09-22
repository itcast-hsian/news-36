<template>
  <div>
      <!-- 关闭的按钮 -->
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>

      <!-- logo -->
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <!-- 用户名密码输入框 -->
      <div>
        <input type="text">
      </div>
      <div>
        <input type="text">
      </div>

      登录按钮
      <button></button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: []
    }
  }
}
</script>

<style lang="less">
  // lang声明样式的类型
  .close{
    padding:20px;

    span{
      font-size: 27 / 360 * 100vw;
    }
  }

  .logo{
    display: flex;
    justify-content: center;

    span{
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }
</style>