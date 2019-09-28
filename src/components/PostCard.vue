<template>
  <div>
    <!-- 单张图片显示的布局 -->
    <div class="card" v-if="post.cover.length > 0 && post.cover.length < 3 && post.type === 1">
        <!-- 左侧文字 -->
        <div class="card-left">
            <div class="post-title">
                <router-link :to="`/post_detail/${post.id}`">
                    {{post.title}}
                </router-link>
            </div>
            <p class="post-info">
                <span>{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>

        <div class="card-img">
            <router-link :to="`/post_detail/${post.id}`">
                <img :src="post.cover[0].url" alt="">
            </router-link>
        </div>
    </div>

    <!-- 3张图片显示的布局 -->
    <div class="img-cart" v-if="post.cover.length >= 3">
        <div class="post-title">
            <router-link :to="`/post_detail/${post.id}`">
                {{post.title}}
            </router-link>
        </div>
        <router-link :to="`/post_detail/${post.id}`">
            <div class="img-list">
                <img 
                v-for="(item, index) in post.cover" 
                :key="index"
                :src="item.url" 
                v-if="index < 3"
                >
            </div>
        </router-link>
        <p class="post-info">
            <span>{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
        </p>
    </div>

    <!-- 视频显示的布局 -->
    <div class="video-cart" v-if="post.type === 2 && post.cover.length === 1">
        <div class="post-title">
            <router-link :to="`/post_detail/${post.id}`">
                {{post.title}}
            </router-link>
        </div>
        <router-link :to="`/post_detail/${post.id}`">
            <div class="video">
                <img :src="post.cover[0].url" alt="">
                <span class="video-layer">
                    <i class="iconfont iconshipin"></i>
                </span>
            </div>
        </router-link>
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
        padding: 15px 10px;
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
            margin-left:5px;
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

    .video-cart{
        padding: 20px 10px;
        border-bottom: 1px #ccc solid;

        .post-title{
            line-height: 1.5;
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .video {
            position: relative;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                display: block;
                width:100%;
                height: 170 / 360 * 100 vw;
            }
            .video-layer{
                position: absolute;
                background: rgba(0, 0, 0, 0.5);
                width:46 / 360 * 100vw;
                height:46 / 360 * 100vw;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;

                i{
                    color: #fff;
                    font-size: 30px;
                }
            }
        }

        .post-info{
            font-size:12px;
            color:#999;
        }
    }
</style>