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
        v-for="(item, index) in categories" 
        :key="index"
        :title="item.name"
        >
            <p v-for="index in 10">
                <PostCard/>
            </p>
        </van-tab>
    </van-tabs>

  </div>
</template>

<script>
// 文章列表模块
import PostCard from "@/components/PostCard"

export default {
    data(){
        return {
            // 当前默认的栏目, 没有登录应该0，有登录等于1, 最终的效果为了默认显示头条
            active: localStorage.getItem("token") ? 1 : 0, 
            // 栏目列表
            categories: []
        }
    },

    components: {
        PostCard
    },

    mounted(){

        const config = {
            url: "/category",
        }

        // 是否存在token，如果有就给头部加上token验证
        if(localStorage.getItem("token")){
            config.headers = {
                 Authorization: localStorage.getItem("token")
            }
        }

        // 请求栏目的数据
        this.$axios(config)
        .then(res => {
            const {data} = res.data;
            // 保存了栏目列表
            this.categories = data;
        })
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