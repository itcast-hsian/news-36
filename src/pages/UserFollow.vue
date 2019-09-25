<template>
  <div>
      <HeaderNormal title="我的关注"/>
      
      <!-- 关注用户的列表 -->
      <!-- :key="index"为给for每一个循环的元素打上一个标识，方便页面的数据刷新 -->
      <div 
      class="follow-item" 
      v-for="(item, index) in list"
      :key="index">
          <img :src=" $axios.defaults.baseURL + item.head_img " alt="">

          <div class="item-center">
              <p>{{item.nickname}}</p>
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
    data(){
        return {
            // 关注列表
            list: []
        }
    },
    components: {
        HeaderNormal
    },

    mounted(){
        // 请求用户关注的列表
        this.$axios({
            url: "/user_follows",
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }).then(res => {
            const {data} = res.data;

            // 赋值给关注的列表
            this.list = data;
        })
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