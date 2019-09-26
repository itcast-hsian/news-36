<template>
  <div>
    <!-- 单张图片显示的布局 -->
    <div class="card" v-if="post.cover.length > 0 && post.cover.length < 3">
        <!-- 左侧文字 -->
        <div class="card-left">
            <div class="post-title">
                {{post.title}}
            </div>
            <p class="post-info">
                <span>{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>

        <div class="card-img">
            <img :src="post.cover[0].url" alt="">
        </div>
    </div>

    <!-- 3张图片显示的布局 -->
    <div class="img-cart" v-if="post.cover.length >= 3">
        <div class="post-title">
            {{post.title}}
        </div>
        <div class="img-list">
            <img 
            v-for="(item, index) in post.cover" 
            :key="index"
            :src="item.url" 
            v-if="index < 3"
            >
        </div>
        <p class="post-info">
                <span>{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['post']
}
</script>

<style scoped lang="less">
    .card{
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #ccc solid;

        .card-left{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80 / 360 * 100vw;
            flex:1;

            .post-title{
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 5px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .post-info{
                font-size:12px;
                color:#999;
            }
        }

        .card-img{
            img{
                display: block;
                width: 120 / 360 * 100vw;
                height: 80 / 360 * 100vw;
                object-fit: cover;
            }
        }
    }

    .img-cart{
        padding: 20px 10px;
        border-bottom: 1px #ccc solid;

        .post-title{
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .img-list{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;

            img{
                display: block;
                width: 33%;
                height: 80 / 360 * 100vw;
                object-fit: cover;
            }
        }

        .post-info{
            font-size:12px;
            color:#999;
        }
    }
</style>