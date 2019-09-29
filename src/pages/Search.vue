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