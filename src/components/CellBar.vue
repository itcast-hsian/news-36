<template>
  <!-- $event是模板事件对象 -->
  <div class="cell-wrap" @click="$emit('click', $event)">
    <div class="cell">
      <span>{{label}}</span>

      <!-- 如果type等于password，显示星号 -->
      <i>{{ type === 'password'? '******' : text}}</i>

      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  // label左侧的文件， text是右侧的文字
  props: ["label", "text", "type"]
};
</script>

<style scoped lang="less">
.cell-wrap {
  padding-left: 10px;

  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    height: 48 / 360 * 100vw;
    border-bottom: 1px #eee solid;

    i {
      display: block;
      flex: 1;
      text-align: right;
      padding: 0 10px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>