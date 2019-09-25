<template>
  <div>
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
      <img :src="profile.head_img" alt />

      <!-- vant上传组件 -->
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="昵称" :text="profile.nickname" @click="show1 = !show1"/>

    <!-- 昵称编辑输入框 -->
    <!-- 鼠标放到属性上就可以查看 -->
    <van-dialog
        v-model="show1"
        title="编辑昵称"
        show-cancel-button
        @confirm="handlNickname"
        >
        <!-- value读取昵称 -->
        <van-field :value="profile.nickname" placeholder="请输入用户名" ref="nickname"/>
    </van-dialog>

    <CellBar label="密码" :text="profile.password" type="password" @click="show2 = !show2"/>
    <!-- 密码编辑输入框 -->
    <van-dialog
        v-model="show2"
        title="编辑密码"
        show-cancel-button
        @confirm="handlPassword"
        >
        <!-- value读取昵称 -->
        <van-field :value="profile.password" placeholder="请输入密码" ref="password"/>
    </van-dialog>

    <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" @click="show3 = !show3"/>

    <!-- 性别编辑输入框 -->
    <van-dialog
        v-model="show3"
        title="编辑性别"
        show-cancel-button
        @confirm="handlGender"
        >
        <van-radio-group v-model="genderCache">
            <van-cell-group>
                <van-cell title="男" clickable @click="genderCache = `1`">
                    <van-radio slot="right-icon" name="1" />
                </van-cell>
                <van-cell title="女" clickable @click="genderCache = `0`">
                    <van-radio slot="right-icon" name="0" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      // 用户详情
      profile: {},
      // 昵称弹窗
      show1: false,
      // 密码弹窗
      show2: false,
      // 显示性别的弹窗
      show3: false,
      

      genderCache: `0`,
    };
  },

  components: {
    HeaderNormal,
    CellBar
  },

  methods: {

    // 请求编辑资料的接口
    // data要提交给接口的数据
    editProfile(data, callback){
        if(!data) return;

        this.$axios({
            url: `/user_update/` + localStorage.getItem("user_id"),
            method: 'POST',
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            },
            data
        }).then(res => {
            const {message} = res.data;

            // 成功的弹窗提示
            if(message === '修改成功'){
                // 传入的回调函数
                // 等于callback && callback();
                if(callback){
                    callback();
                }

                this.$toast.success(message);
            }
        })
    },

    // 选择完图片之后的回调函数,file返回选中的图片
    afterRead(file) {

        //构造表单数据
        const formData = new FormData();
        // 通过表单使用append方法追加数据
        formData.append('file', file.file);

        this.$axios({
            url: "/upload",
            method: 'POST',
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            },
            // 把表单数据上传到服务器
            data: formData
        }).then(res => {
            const {data} = res.data;

            // 替换用户资料的头像
            this.profile.head_img = this.$axios.defaults.baseURL + data.url;

            // 把头像url上传到用户资料
            this.editProfile({ head_img: data.url});
        })
    },

    // 编辑昵称
    handlNickname(){
        // 拿到input输入框的值
        const value = this.$refs.nickname.$refs.input.value;

        // 提交到编辑资料的接口
        this.editProfile({ nickname: value}, () => {
            this.profile.nickname = value;
        });
    },
    // 编辑昵称
    handlPassword(){
        // 拿到input输入框的值
        const value = this.$refs.password.$refs.input.value;

        // 提交到编辑资料的接口
        this.editProfile({ password: value}, () => {
            this.profile.password = value;
        });
    },

    // 编辑性别
    handlGender(){
        // 把性别装换为数字
        const gender = +this.genderCache;

        // 编辑性别
        this.editProfile({ gender}, () => {
            // 修改成功之后替换页面显示的性别
            this.profile.gender = gender;
        });
    }
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

        // 把后台返回的性别复制genderCache,性别需要转换成字符串
        this.genderCache = String(data.gender);

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

  .uploader {
    position: absolute;
    opacity: 0;
  }

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}

// 如果要修改第三方组件库的样式时候，需要在前面加上/deep/， 因为组件库的样式不受scoped的影响
/deep/ .van-uploader__upload {
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
}
</style>