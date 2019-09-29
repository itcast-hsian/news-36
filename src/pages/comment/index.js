import HeaderNormal from "@/components/HeaderNormal"
// 评论楼层组件
import CommentFloor from "@/components/CommentFloor"
// 页面发布评论的地步
import PostFooter from "@/components/PostFooter"

export default {
    data(){
        return {
            // 评论的列表
            comments: [],
            // 文章的详情
            detail: {},
            // 保存点击回复的评论
            replyComment: null
        }
    },
    // 注册组件
    components: {
        HeaderNormal,
        CommentFloor,
        PostFooter
    },

    methods: {
         // 请求评论的列表
        getComments(id){
            // 请求文章评论
            this.$axios({
                url: "/post_comment/" + id,
            }).then(res => {
                const {data} = res.data;

                this.comments = data;
            });
        },

        // 点击回复按钮时候触发的方法
        handleReply(item){
            // 获取到当前要回复的id
            this.replyComment = item;
        }
    },

    mounted(){
        // 文章的id
        const {id} = this.$route.params;
        
        // 请求评论的列表
        this.getComments(id);

        // 文章的详情
        const config = {
            url: "/post/" + id
        }
        const token = localStorage.getItem("token");

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
