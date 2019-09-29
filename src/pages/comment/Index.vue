<template>
  <div class="container">
    <!-- 头部组件 -->
    <HeaderNormal title="精彩跟帖"/>

    <!-- 评论模块 -->
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

        <span class="reply">回复</span>
      </div>

      <!-- 渲染评论楼层的组件 -->
      <CommentFloor v-if="item.parent" :data="item.parent"/>

      <div class="comment-content">
        {{item.content}}
      </div>
    </div>

    <!-- 页脚组件 -->
    <PostFooter :post="detail" @getComments="getComments"/>
  </div>
</template>

<script>
import config from "./index"
export default config;
</script>

<style scoped lang="less">
@import url("./index.less");
</style>