<template>
  <div>
      <!-- 组件占位符 -->
      <router-view></router-view>
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
/* 公共样式 */
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