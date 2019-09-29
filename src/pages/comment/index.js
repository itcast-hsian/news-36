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
            replyComment: null,

            // 分页的参数
            loading: false,
            finished: false,
            pageIndex: 1,
            pageSize: 10
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
        getComments(id, isReply){

            // 如果评论发布成功，初始化分页的数据和列表数据
            if(isReply === "isReply"){
                this.pageIndex = 1;
                this.comments = []
            }

            // 请求文章评论
            this.$axios({
                // 条数默认是10
                url: `/post_comment/${id}?pageIndex=${this.pageIndex}`,
            }).then(res => {
                const {data} = res.data;
                // 覆盖评论的列表
                this.comments = [...this.comments, ...data];
                
                // 请求完毕需要手动变为false
                this.loading = false;

                if(data.length < this.pageSize){
                    this.finished = true;
                    return;
                }
                
                // 页数加1
                this.pageIndex++;
                
            });
        },

        // 点击回复按钮时候触发的方法
        handleReply(item){
            // 获取到当前要回复的id
            this.replyComment = item;
        },

        // 评论加载更多
        onLoad(){
            setTimeout(() => {
                // 文章的id
                const {id} = this.$route.params;
                // 请求下一页的数据
                this.getComments(id);
            }, 2000)
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
