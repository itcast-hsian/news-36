<template>
  <div>
      <HeaderNormal title="我的跟帖"/>
      
      <!-- 评论的列表 -->
      <div class="comment-item">
          <div class="time">2019-9-25 10:10</div>

          <!-- 当前的评论回复的评论 -->
          <div class="parent">
              <div class="parent-title">
                  @: 彩票研究员
              </div>
              <div class="parent-content">
                  今天买什么码？
              </div>
          </div>

          <!-- 个人评论的内容 -->
          <div class="content">
              不知道
          </div>
          
          <div class="article-link">
            <router-link to="#">
                原文：今天买什么码？今天买什么码？今天买什么码？今天买什么码？今天买什么码？
            </router-link>
            <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
  </div>
</template>

<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
export default {
    components: {
        HeaderNormal
    }
}
</script>

<style>

</style>