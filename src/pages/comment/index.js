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
            detail: {}
        }
    },
    // 注册组件
    components: {
        HeaderNormal,
        CommentFloor,
        PostFooter
    },

    mounted(){
        // 文章的id
        const {id} = this.$route.params;
        // 请求文章评论
        this.$axios({
            url: "/post_comment/" + id,
        }).then(res => {
            const {data} = res.data;

            this.comments = data;
        });

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
