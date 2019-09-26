<template>
  <div>
      
      <!-- 红色块头部 -->
      <div class="header">
          <span class="iconfont iconnew logo"></span>

          <div class="header-search">
              <span class="iconfont iconsearch"></span>
              <i>搜索新闻</i>
          </div>
          
          <router-link to="/personal">
            <span class="iconfont iconwode personal"></span>
          </router-link>
      </div>

    <!-- 栏目列表 -->
    <!-- v-model: 默认选中的标签栏 -->
    <!-- sticky: 配置粘性布局 -->
    <!-- swipeable: 滑动切换 -->
    <van-tabs v-model="active" sticky swipeable>
        <!-- title: 要显示的内容 -->
        <van-tab 
        v-for="(item, index) in categories" 
        :key="index"
        :title="item.name"
        >   
            <!-- v-model: 列表是否在加载 -->
            <!-- finished: 是否加载完毕 -->
            <!-- load: 到底部触发的事件 -->
            <!-- immediate-check 禁止list立即出发onload -->
            <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
                >
                <!-- 文章模块组件，post是单篇文章详情 -->
                <PostCard 
                v-for="(item, index) in item.posts" 
                :key="index"
                :post="item"/>
            </van-list>

        </van-tab>
    </van-tabs>

  </div>
</template>

<script>
// 文章列表模块
import PostCard from "@/components/PostCard"

export default {
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
                console.log("已经滚动到底部");
                
                const category = this.categories[this.active];

                console.log(category)

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
</script>

<style scoped lang="less">
    .header{
        height:50 / 360 * 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 10px;
        background:#f00;

        .logo{
            font-size:50 / 360 * 100vw;
            color:#fff;
        }

        .personal{
            font-size:22 / 360 * 100vw;
            color:#fff;
        }

        .header-search{
            height:34 / 360 * 100vw;
            background: rgba(255,255,255,0.5);
            flex:1;
            margin:0 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;
            border-radius: 50px;

            i{
                font-size: 14px;
                margin-left:5px;
            }
        }
    }

    /deep/ .van-tabs__nav{
        background:#f6f6f6;
    }

    /deep/ .van-tabs__line{
        width:40px;
        height:1px;
    }
</style>