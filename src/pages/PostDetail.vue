<template>
  <div>
      
    <!-- 文章的详情页的内容 -->
    <div class="article">

        <div class="header">
            <div class="header-left" @click="$router.back()">
                <span class="iconfont iconjiantou2"></span>
                <span class="iconfont iconnew"></span>
            </div>
            <span class="focus">关注</span>
        </div>

        <h3>文章的详情页的内容</h3>

        <p class="post-info">火星时报  2019-10-10</p>

        <div class="post-content">
            文章的详情页的内容文章的详情页的内容,
            文章的详情页的内容，文章的详情页的内容文章的详情页的内容
            文章的详情页的内容
        </div>
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

  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
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