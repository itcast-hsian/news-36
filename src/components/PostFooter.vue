<template>
  <div class="footer">
      <input type="text" placeholder="写跟帖" @focus="handleFocus">
      
      <span class="comment">
          <em>1020</em>
          <i class="iconfont iconpinglun-"></i>
      </span>

      <i class="iconfont iconshoucang"></i>

      <i class="iconfont iconfenxiang"></i>
  </div>
</template>

<script>
export default {
    methods: {
        // 获得焦点时候触发
        handleFocus(){

        }
    }
}
</script>

<style scoped lang="less">
    
</style>