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

    <!-- 栏目列表 -->
    <!-- v-model: 默认选中的标签栏 -->
    <!-- sticky: 配置粘性布局 -->
    <!-- swipeable: 滑动切换 -->
    <van-tabs v-model="active" sticky swipeable>
        <!-- title: 要显示的内容 -->
        <van-tab 
        v-for="index in 8" 
        :key="index"
        :title="'标签 ' + index"
        >
            <p v-for="index in 100">内容 {{ index }} </p>
        </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
    data(){
        return {
            active: 1
        }
    }
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

    /deep/ .van-tabs__nav{
        background:#f6f6f6;
    }

    /deep/ .van-tabs__line{
        width:40px;
        height:1px;
    }
</style>