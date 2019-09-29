<template>
  <div>
      <!-- 自己再次在这个位置调用了自己 -->
      <comment 
      v-if="data.parent" 
      :data="data.parent"
      @handleReply="handleReply">
      </comment>
      
      <!-- 评论楼层 -->
      <div class="comment-floor">
        <div class="floor-header">
          <span>{{data.user.nickname}}</span>
          <i>2小时前</i>
          <em @click="handleReply">回复</em>
        </div>

        <div class="comment-content">
          {{data.content}}
        </div>
      </div>
  </div>
</template>

<script>
export default {
    // 组件的名字，单纯的针对当前的组件命名，当前的组件可以通过该名字自己调用自己
    name: "comment",
    props: ["data"],

    methods: {
      handleReply(){
        this.$emit("handleReply", this.data);
      }
    }
}
</script>

<style scoped lang="less">
.comment-floor{
    border: 1px #ccc solid;
    padding: 10px;
    background: #f6f6f6;
    .floor-header{
        font-size:13px;
        color:#666;

        i{
            font-size:12px;
            color:#999;
        }
        em{
            float:right;
        }
    }
}

.comment-floor:not(:first-child){
  border-top: none;
}
</style>