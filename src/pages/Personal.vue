<template>
  <div>
        <div class="profile">
            <img src="http://img1.imgtn.bdimg.com/it/u=2357912857,682090914&fm=26&gp=0.jpg" alt="">

            <div class="profile-center">
                <div class="name">
                    <span class="iconfont iconxingbienan"></span>
                    火星网友
                </div>
                <div class="time">
                    2019-9-24
                </div>
            </div>

            <span class="iconfont iconjiantou1"></span>
        </div>

        <!-- 调用条形组件 -->
        <CellBar label="我的关注" text="关注的用户"/>

        <CellBar label="我的跟帖" text="跟帖/回复"/>

        <CellBar label="我的收藏" text="文章/视频"/>

        <CellBar label="设置"/>
  </div>
</template>

<script>

// 导入条形组件
import CellBar from "@/components/CellBar"

export default {
    components: {
        CellBar
    },

    mounted(){
        // 请求个人资料接口
        this.$axios({
            url: "/user/" + localStorage.getItem("user_id"),
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res)
        })
    }
}
</script>

<style scoped lang="less">
    .profile{
        display: flex;
        padding: 20px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 5px #eee solid;

        img{
            width: 70 / 360 * 100vw;
            height: 70 / 360 * 100vw;
            border-radius: 50%;
        }

        .profile-center{
            flex:1;
            padding: 0 10px;
        }

        .name{
            span{
                color:#75b9eb;
            }
        }

        .time{
            color:#666;
            font-size: 14px;
            margin-top: 5px;
        }
    }
</style>