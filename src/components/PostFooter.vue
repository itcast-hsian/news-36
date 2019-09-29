<template>
    <div class="footer-wrap">
        <!-- 普通页脚 -->
        <div class="footer" v-show="!isFocus">
            <input type="text" placeholder="写跟帖" @focus="handleFocus">
            
            <!-- 跳转到评论页面 -->
            <!-- <router-link :to="`/post_comment/${post.id}`">
                <span class="comment">
                    <em>{{post.comment_length}}</em>
                    <i class="iconfont iconpinglun-"></i>
                </span>
            </router-link> -->

            <!-- 用事件的方式跳转并且带上参数 -->
            <span class="comment" 
            @click="$router.push(`/post_comment/${post.id}`)">
                <em>{{post.comment_length}}</em>
                <i class="iconfont iconpinglun-"></i>
            </span>

            <!-- 收藏 -->
            <i 
            class="iconfont iconshoucang" 
            :class="{ star_active: post.has_star }"
            @click="$emit('handleStar')"></i>

            <i class="iconfont iconfenxiang"></i>
        </div>

        <!-- 输入评论页脚, 这里显示隐藏必须要用v-show，原因是为了获得textare的dom元素 -->
        <div class="footer-comment" v-show="isFocus">
            <textarea 
            rows="3" 
            ref="textarea" 
            v-model="value" 
            :placeholder="placeholder"
            @blur="handleBlur" 
            :autofocus="isFocus">
            </textarea>
            <span @click="handleSubmit">发送</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //  输入框是否获得焦点
            isFocus: false,
            // 评论的内容
            value: "",
            // 输入框的提示文字
            placeholder: "写跟帖",
        }
    },

    // 接受文章的详情
    // replyComment 要回复的评论
    props: ["post", "replyComment"],

    watch: {
        replyComment(){
            // 评论回复有值的时候才显示@的用户名
            if(this.replyComment){
                this.isFocus = true;
                this.placeholder = '@' + this.replyComment.user.nickname;
            }
        }
    },

    methods: {
        // 获得焦点时候触发
        handleFocus(){
            this.isFocus = true;
        },

        // 输入框失去焦点时候触发
        handleBlur(){
            if(!this.value){
                this.isFocus = false;

                // 如果有回复的评论，清空回复的评论
                if(this.replyComment){
                    this.$emit("handleReply", null);
                    this.placeholder = "写跟帖"
                } 
            }           
        },

        // 发布评论
        handleSubmit(){

            if(!this.value){
                return;
            }

            this.$axios({
                url: "/post_comment/" + this.post.id,
                method: "POST",
                 // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: {
                    content: this.value
                }
            }).then(res => {
                const {message} = res.data;

                if(message === "评论发布成功"){
                    // 触发父组件方法更新评论的列表
                    this.$emit("getComments", this.post.id);

                    // 隐藏输入框
                    this.isFocus = false;

                    // 清空输入框的值
                    this.value = "";
                    
                    // 滚动到底部
                    window.scrollTo(0, document.body.offsetHeight);
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .footer-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width:100%;
        border-top:1px #eee solid;
        padding: 0 10px;
        box-sizing: border-box;
        background:#fff;
    }

    .footer-comment{
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        textarea{
            width: 260 / 360 * 100vw;
            background:#eee;
            padding: 10px;
            box-sizing: border-box;
            border:none;
            border-radius: 8px;   
            resize: none; 
        }

        span{
            font-size:12px;
            background:red;
            width: 60 / 360 * 100vw;
            height: 26 / 360 * 100vw;
            line-height: 26 / 360 * 100vw;
            color:#fff;
            text-align: center;
            border-radius: 50px;
        }
    }

    .footer{   
        height: 60 / 360 * 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        input{
            width:40%;
            height: 36 / 360 * 100vw;
            background: #eee;
            border:none;
            font-size: 12px;
            padding:0 15px;
            border-radius: 50px;
        }

        .comment{
            display: block;
            position: relative;

            em{
                position: absolute;
                display: block;
                background:red;
                border-radius: 50px;
                color:#fff;
                padding:0 5px;
                font-size: 10px;
                height:14px;
                line-height: 14px;
                left:0;
                top:-5px;
            }
        }

        .iconfont{
            font-size: 24px;
        }
    }

    .star_active{
        color:red;
    }
</style>