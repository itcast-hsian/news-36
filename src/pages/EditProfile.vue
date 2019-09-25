<template>
  <div>
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
        <img :src="profile.head_img" alt />

        <!-- vant上传组件 -->
        <van-uploader :after-read="afterRead" class="uploader"/>
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="昵称" :text="profile.nickname" />

    <CellBar label="密码" :text="profile.password" type="password"/>

    <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" />
  </div>
</template>

<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";

export default {

  data(){
      return {
          // 用户详情
          profile: {}
      }
  },

  components: {
    HeaderNormal,
    CellBar
  },

  mounted() {
    // 请求个人资料接口
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;

      if (data) {
        // 保存到data
        this.profile = data;

        // 如果用户有头像
        if (data.head_img) {
          this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
        } else {
          this.profile.head_img = "./static/default_green.jpg";
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  .uploader{
      position: absolute;
      opacity: .8;
  }

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}

// 如果要修改第三方组件库的样式时候，需要在前面加上/deep/， 因为组件库的样式不受scoped的影响
/deep/ .van-uploader__upload{
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
}
</style>