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
  </div>
</template>

<script>
export default {

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