<template>
  <div>
      <HeaderNormal title="我的关注"/>
      
      <!-- 关注用户的列表 -->
      <div class="follow-item">
          <img src="../../static/default_green.jpg" alt="">

          <div class="item-center">
              <p>火星新闻</p>
              <span>2019-9-25</span>
          </div>

          <span class="cancel">取消关注</span>
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

<style scoped lang="less">
    .follow-item{
        padding:20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #ccc solid;

        img{
            display: block;
            width: 60 / 360 * 100vw;
            height: 60 / 360 * 100vw;
            border-radius: 50%;
        }

        .item-center{
            flex:1;
            padding:0 10px;
            span{
                color:#999;
                font-size: 12px;
            }
        }

        .cancel{
            display: block;
            background: #ccc;
            padding: 0 10px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            border-radius: 50px;
        }
    }
</style>