const base = require("./webpack.base");
// 合并webpack的配置
const merge = require("webpack-merge");

// merge接受多个参数，把参数对象合并成，后面的对象 属性会覆前面的
module.exports = merge( base, {
    mode: "development",    // 声明当前是开发模式

    devtool: "source-map", // 生成映射源代码文件,找到源文件错误的地方

    // + 开发服务配置
    devServer: {
        port: 8000, // 默认端口是8080
        stats: 'errors-only' 
    },
})