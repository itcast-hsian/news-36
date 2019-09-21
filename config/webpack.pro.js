const base = require("./webpack.base");
// 合并webpack的配置
const merge = require("webpack-merge");

// merge接受多个参数，把参数对象合并成，后面的对象 属性会覆前面的
module.exports = merge( base, {
    mode: "production",    // 声明当前是生产模式
})