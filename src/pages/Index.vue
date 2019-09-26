<template>
  <div>
      
      <!-- 红色块头部 -->
      <div class="header">
          <span class="iconfont iconnew logo"></span>

          <div class="header-search">
              <span class="iconfont iconsearch"></span>
              <i>搜索新闻</i>
          </div>
          
          <router-link to="/personal">
            <span class="iconfont iconwode personal"></span>
          </router-link>
      </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .header{
        height:50 / 360 * 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 10px;
        background:#f00;

        .logo{
            font-size:50 / 360 * 100vw;
            color:#fff;
        }

        .personal{
            font-size:22 / 360 * 100vw;
            color:#fff;
        }

        .header-search{
            height:34 / 360 * 100vw;
            background: rgba(255,255,255,0.5);
            flex:1;
            margin:0 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;
            border-radius: 50px;

            i{
                font-size: 14px;
                margin-left:5px;
            }
        }
    }
</style>