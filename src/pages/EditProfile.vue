<template>
  <div>
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
      <img src="../../static/default_green.jpg" alt />
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="昵称" text="火星网友" />

    <CellBar label="密码" text="123" />

    <CellBar label="性别" text="男" />
  </div>
</template>

<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";

export default {
  components: {
    HeaderNormal,
    CellBar
  }
};
</script>

<style scoped lang="less">
.head{
    display: flex;
    justify-content: center;
    align-items: center;
    padding:20px;

    img{
        display: block;
        width: 100 / 360 * 100vw;
        height: 100 / 360 * 100vw;
        border-radius: 50%;
    }
}
</style>