<template>
  <div class="container">
      <div class="header">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <div class="input-wrap">
              <span class="iconfont iconsearch"></span>
              <input type="text" >
          </div>
          
          <span class="search-btn">搜索</span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .header{
        height: 60 / 360 * 100vw;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .input-wrap{
            position: relative;
            flex:1;
            margin: 0 10px;
            
            .iconsearch{
                position: absolute;
                left:10px;
                top:12 / 360 * 100vw;
            }

            input{
                width: 100%;
                display: block;
                
                height: 40 / 360 * 100vw;
                background: #fff;
                border: 1px #eee solid;
                border-radius: 50px;
                padding:0 15px 0 30px;
                font-size:12px;
                box-sizing: border-box;
            }
        }

        .search-btn{
            font-size:14px;
        }
    }
</style>