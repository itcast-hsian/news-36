<template>
  <!-- @input是输入框每次输入时候都会触发 -->
  <!-- :class值如果是对象的话，key是class的名称，如果这个key的值是true时候就加上该class -->
  <input 
    class="input"
    :class="{
        success: status === 'success',
        error: status === 'error'
    }"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script>
export default {
    data(){
        return {
            status: ""
        }
    },
    // rule传递过来的正则表达式
    props:[
        "placeholder",
        "value",
        "name",
        "rule",
        "err_message"
    ],

    methods: {
        // 每次输入框输入值时候都会触发
        handleInput(event){
            const {value} = event.target;

            // 触发父组件的input事件，返回输入框的值
            this.$emit("input", value);

            // 如果符合正则就位success，反之是error
            if(this.rule){
                if( this.rule.test(value) ){
                    this.status = "success";
                }else{
                    this.status = "error";
                }
            }
        },

        // 输入框失去焦点时候触发
        handleChange(){
            if(this.err_message){
                 alert(this.err_message);
            }
        }
    }
}
</script>

<style scoped lang="less">
.input{
    width:100%;
    height: 38 / 360 * 100vw;
    padding:20px;
    box-sizing: border-box;
    background: #fff;
    border:none;
    border: 2px #666 solid;
    outline: none;
}

.success{
    border-color: blue;
}

.error{
    border-color: red;
}
</style>