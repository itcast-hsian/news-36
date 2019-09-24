<template>
  <div class="cell-wrap">
      <div class="cell">
          <span>我的关注</span>
          <i>关注的用户</i>
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .cell-wrap{
        padding-left:10px;

        .cell{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 10px;
            height:48 / 360 * 100vw;
            border-bottom: 1px #eee solid;

            i{
                display: block;
                flex:1;
                text-align: right;
                padding:0 10px;
                font-size:14px;
                color:#999;
            }
        }
    }
</style>