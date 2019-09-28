<template>
  <div class="container">
      
    <!-- 文章的详情页的内容 -->
    <div class="article">

        <div class="header">
            <div class="header-left" @click="$router.back()">
                <span class="iconfont iconjiantou2"></span>
                <span class="iconfont iconnew"></span>
            </div>
            <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
            <span class="focus focus_active" v-else>已关注</span>
        </div>

        <h3>{{ detail.title }}</h3>

        <p class="post-info">{{ detail.user.nickname }}  2019-10-10</p>

        <div class="post-content" v-html="detail.content"></div>
    </div>

    <div class="post-btns">
        <span>
            <i class="iconfont icondianzan"></i>
            112
        </span>
        <span>
            <i class="iconfont iconweixin"></i>
            微信
        </span>
    </div>

    <!-- 页脚组件 -->
    <PostFooter/>
  </div>
</template>

<script>

// 导入页脚组件
import PostFooter from "@/components/PostFooter"

export default {
    data(){
        return {
            // 文章的详情
            detail: {
                // user需要在模板中渲染，不然页面会报错 
                user: {}
            }
        }
    },
    components: {
        PostFooter
    },

    methods: {
        // 关注当前的作者
        handleFollow(){
            // 通过作者id关注用户
            this.$axios({
                url: "/user_follows/" + this.detail.user.id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const {message} = res.data;

                if(message === "关注成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_follow = true;
                    this.$toast.success(message)
                }
            })
        }
    },

    mounted(){
        // 请求文章的详情
        const {id} = this.$route.params;
        // token
        const token = localStorage.getItem("token");
        // 请求的配置
        const config = {
            url: "/post/" + id
        }
        // 如果有token就带上，才可能获取到是否关注，是否收藏的属性
        if(token){
            config.headers = {
                Authorization: token
            }
        }

        this.$axios(config).then(res => {
            const {data} = res.data;

            // 保存到详情
            this.detail = data;
        })
    }
}
</script>

<style scoped lang="less">
.container{
    padding-bottom: 100 / 360 * 100vw;
}

.article{
    padding:0 10px;

    .header{
        height:60 / 360 * 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-left{
            *{
                vertical-align: middle;
            }
        }

        .iconnew{
            font-size:50px;    
        }

        .focus{
            width:62 / 360 * 100vw;
            height: 26 / 360 * 100vw;
            line-height: 26 / 360 * 100vw;
            text-align: center;
            font-size:12px;
            background:red;
            color:#fff;
            border-radius: 100px;
        }

        .focus_active{
            border: 1px #ccc solid;
            color:#333;
            background:none;
        }
    }

    h3{
        margin-bottom:5px;
    }

    .post-info{
        font-size: 12px;
        color:#999;
        margin-bottom:10px;
    }

    .post-content{
        line-height: 1.5;
        // img是有服务器返回的标签，不属于当前的也米阿尼，不受scoped的影响
        /deep/ img{
            max-width: 100%;
        }
    }
}

.post-btns{
    margin-top:30px;
    display: flex;
    justify-content: space-around;

    span{
        padding: 0 15px;
        height: 30 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        font-size:12px;
        border: 1px #ddd solid;
        border-radius: 50px;
    }

    .iconweixin{
        color: #07c907;
    }
}
</style>