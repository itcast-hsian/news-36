<template>
  <div class="container">
    <!-- 头部组件 -->
    <HeaderNormal title="精彩跟帖"/>

    <!-- 评论模块 -->
    <!-- v-model：是否在加载
    finished：是否加载完毕
    load：到底部触发加载 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="comment" 
      v-for="(item, index) in comments"
      :key="index">
        <div class="comment-info">

          <!-- 左侧的用户的信息 -->
          <div class="comment-user">
            <!-- 头像 -->
            <img :src="$axios.defaults.baseURL + item.user.head_img" v-if="item.user.head_img">
            <img src="../../../static/default_green.jpg" v-else>
            <!-- 用户名字 -->
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>2小时前</span>
            </div>
          </div>

          <span class="reply" @click="handleReply(item)">回复</span>
        </div>

        <!-- 渲染评论楼层的组件 -->
        <CommentFloor 
        v-if="item.parent" 
        :data="item.parent" 
        @handleReply="handleReply"/>

        <div class="comment-content">
          {{item.content}}
        </div>
      </div>
    </van-list>

    <!-- 页脚组件 -->
    <!-- post文章的详情
    replyComment：要回复的评论
    getComments：发布评论成功后重新请求评论的列表 -->
    <PostFooter 
    :post="detail" 
    :replyComment="replyComment" 
    @handleReply="handleReply"
    @getComments="getComments"/>
  </div>
</template>

<script>
import config from "./index"
export default config;
</script>

<style scoped lang="less">
@import url("./index.less");
</style>