<template>
  <div>
    <!-- 千万不要加空格 -->
      <keep-alive include="index,search">
        <!-- 组件占位符 -->
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
@import url("../node_modules/vant/lib/index.css");

/* 公共样式 */
html,body{
    /* background:#f6f6f6; */
}

*{
    margin:0;
    padding:0;
}
    
a{
    color: inherit;
}

a:hover{
    text-decoration: none;
}

ul,li,ol{
    list-style: none;
}

i,em{
   font-style: normal; 
}
</style>