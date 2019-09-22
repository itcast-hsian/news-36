<template>
  <div class="container">
      <!-- 关闭的按钮 -->
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>

      <!-- logo -->
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <!-- 用户名密码输入框 -->
      <div class="inputs">

        <!-- 输入框组件 -->
        <AuthInput
        placeholder="手机号码"
        :value='form.username'
        @input="handleUsername"

        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
        ></AuthInput>

        <!-- 昵称 -->
        <AuthInput
        placeholder="昵称"
        v-model="form.nickname"

        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="昵称格式不正确"
        ></AuthInput>

        <!-- 密码 -->
        <AuthInput
        placeholder="密码"
        type="password"
        v-model="form.password"

        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
        ></AuthInput>
      </div>

      <p class="tips">
        有账号？ 
        <router-link to="/login">去登录</router-link>
      </p>

      <!-- <button @click="handleSubmit">登录按钮</button> -->
      <AuthButton text="注册" @click="handleSubmit"/>
  </div>
</template>

<script>
// 导入请求库
// import axios from "axios";

//  导入组件
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default {
  data(){
    return {
      // 发送给后台的数据
      form: {
        username: "",
        password: "",
        nickname: ""
      },
    }
  },
  // 注册组件
  components: {
    AuthInput,
    AuthButton
  },

  methods: {
    // 传递给输入框组件，用于获取用户名
    handleUsername(value){
      this.form.username = value;
    },

    // 表单提交
    handleSubmit(){

      this.$axios({
        url: "/register",
        method: "POST",  // method相当于type
        data: this.form
        // .then的回调函数相当于success
      }).then( res => {
        const {message} = res.data;

        if(message === "注册成功"){
          // 跳转到首页
          this.$router.push("/login");
        }
      });

    }
  }
}
</script>

<style scoped lang="less">
  // scoped 作用域样式
  // lang声明样式的类型

  .container{
    padding:20px;
  }

  .close{
    span{
      font-size: 27 / 360 * 100vw;
    }
  }

  .logo{
    display: flex;
    justify-content: center;

    span{
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }

  .inputs{
    input{
      margin-bottom: 20px;
    }
  }

  .tips{
    text-align: right;
    margin-bottom: 20px;

    a{
      color:#3385ff;
    }
  }
</style>