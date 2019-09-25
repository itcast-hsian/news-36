<template>
  <div>
      <HeaderNormal title="我的跟帖"/>
      
      <!-- 评论的列表 -->
      <div 
      class="comment-item"
      v-for="(item, index) in list"
      :key="index"
      >
          <div class="time">2019-9-25 10:10</div>

          <!-- 当前的评论回复的评论 -->
          <div class="parent" v-if="item.parent">
              <div class="parent-title">
                  @: {{item.parent.user.nickname}}
              </div>
              <div class="parent-content">
                  {{item.parent.content}}
              </div>
          </div>

          <!-- 个人评论的内容 -->
          <div class="content">
              {{ item.content }}
          </div>
        
          <router-link to="#" class="article-link">  
            <p>
                原文：{{ item.post.title }}
            </p>
            <span class="iconfont iconjiantou1"></span>
          </router-link>
      </div>
  </div>
</template>

<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
export default {
    data(){
        return {
            list: []
        }
    },

    components: {
        HeaderNormal
    },
    
    mounted(){
        // 请求评论列表
        this.$axios({
            url: "/user_comments",
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            const {data} = res.data;

            // 保存到data中
            this.list = data;
        })
    }
}
</script>

<style scoped lang="less">
.comment-item{
    padding: 10px;
    font-size: 14px;
    line-height: 1.8;
    border-bottom:1px #ccc solid;

    .time{
        font-size: 12px;
        color:#999;
        margin-bottom: 5px;
    }

    .parent{
        background:#eee;
        padding: 10px;
        margin-bottom: 5px;

        .parent-title{
            font-size: 12px;
            color:#999;
        }
    }

    .content{
        margin-bottom: 5px;
    }

    .article-link{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color:#999;

        p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>