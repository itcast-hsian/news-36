// 文章列表模块
import PostCard from "@/components/PostCard"

export default {
    name: "index", // 可以命名为任意字符串
    data(){
        return {
            // 当前默认的栏目, 没有登录应该0，有登录等于1, 最终的效果为了默认显示头条
            // 随着栏目的切换会变化
            active: localStorage.getItem("token") ? 1 : 0, 
            // 栏目列表
            categories: [],
            // 栏目id
            cid: 999,

            // 默认的头条文章列表
            // posts: [],
            // // 是否在加载,加载完毕后需要手动变为false
            // loading: false,
            // // 是否有更多数据，如果加载完所有的数据，改为true
            // finished: false,
            
            // 分页的变量,只用第一次加载
            pageIndex: 1,
            // 每页加载条数这个值不用去修改
            pageSize: 5, 
        }
    },

    watch: {
        active(){
            this.cid = this.categories[this.active].id;

            // console.log(this.cid)
            // console.log(this.active)

            // 切换栏目时候加载当前栏目的数据
            this.onLoad();
        }
    },

    components: {
        PostCard
    },

    methods: {
        // 加载下一页的数据
        onLoad(){
            setTimeout(() => {
                const category = this.categories[this.active];

                // 请求文章列表
                this.$axios({
                    url: `/post?category=${this.cid}
                    &pageIndex=${category.pageIndex}
                    &pageSize=${this.pageSize}`
                }).then(res => {
                    const {data} = res.data;

                    // 没有更多的数据了
                    if(data.length < this.pageSize){
                        category.finished = true;
                    }

                    // 默认赋值给头条的列表
                    category.posts = [
                        ...category.posts, 
                        ...data
                    ];

                    // 页数加一
                    category.pageIndex++;

                    // 告诉onload事件这次的数据加载已经完毕，下次可以继续的出发onload
                    category.loading = false;
                })
            }, 2000)
        }
    },

    mounted(){

        const config = {
            url: "/category",
        }

        // 是否存在token，如果有就给头部加上token验证
        if(localStorage.getItem("token")){
            config.headers = {
                 Authorization: localStorage.getItem("token")
            }
        }

        // 请求栏目的数据
        this.$axios(config)
        .then(res => {
            const {data} = res.data;
            const newData = [];

            // 循环给栏目中每一项都添加四个独立的属性
            data.forEach(v => {
                v.posts = [];
                v.loading = false;
                v.finished = false;
                v.pageIndex = 1;
                newData.push(v);
            })

            // 保存了栏目列表
            this.categories = newData;

            // 必须要先等待栏目请求完毕，再请求文章列表
            this.$axios({
                url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            }).then(res => {
                const {data} = res.data;

                // 默认赋值给头条的列表
                this.categories[this.active].posts = data;

                // 页数加一
                this.categories[this.active].pageIndex++;
            })
        });
    }
}