<template>
  <div class="container">
      <div class="header">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <div class="input-wrap">
              <span class="iconfont iconsearch"></span>
              <input type="text" v-model="keyword" placeholder="搜索关键字">
          </div>
          
          <span class="search-btn" @click="handleSearch">搜索</span>
      </div>

      <div class="list">
          <!-- 调用首页用过的文章模块的组件 -->
          <PostCard 
          v-for="(item, index) in list"
          :key="index"
          :post="item"/>
      </div>
  </div>
</template>

<script>

// 文章列表模块的组件
import PostCard from "@/components/PostCard";

export default {
    name: "search",
    data(){
        return {
            // 搜索的关键字
            keyword: "",
            // 文章的列表
            list: []
        }
    },

    components: {
        PostCard
    },

    methods: {
        // 处理搜索
        handleSearch(){
            this.$axios({
                url: `/post_search?keyword=${this.keyword}`
            }).then(res => {
               const {data} = res.data;

               // 赋值给list
               this.list = data;
            })
        }
    },

    // 组件内的路由守卫，判断如果是首页进入到搜索页的，清空页面的缓存数据
    // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB

    // to: 去哪里
    // from: 从哪里来
    // next: 函数，必须要调用，可以接受url的路径、函数，不传参数。
    beforeRouteEnter(to, from, next){
        
        // 如果from.path值等于斜杆
        if(from.path === "\/" ){
             // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`,需要在next的回调函数中获取

            next(vm => {
                // vm就是组件的实例，也就是this
                vm.keyword = "";
                vm.list = [];
            })

        }else{
            next();
        }
    }
}
</script>

<style scoped lang="less">
    .header{
        height: 60 / 360 * 100vw;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .input-wrap{
            position: relative;
            flex:1;
            margin: 0 10px;
            
            .iconsearch{
                position: absolute;
                left:10px;
                top:12 / 360 * 100vw;
            }

            input{
                width: 100%;
                display: block;
                
                height: 40 / 360 * 100vw;
                background: #fff;
                border: 1px #eee solid;
                border-radius: 50px;
                padding:0 15px 0 30px;
                font-size:12px;
                box-sizing: border-box;
            }
        }

        .search-btn{
            font-size:14px;
        }
    }
</style>