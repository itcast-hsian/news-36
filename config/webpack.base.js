const path = require("path");

//  导入提取样式的webpack插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 该插件自动在html文件引入打包文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 导入清除插件
const {CleanWebpackPlugin}= require('clean-webpack-plugin');

// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');


// webpack的配置
module.exports = {

    // 入口文件
    // entry: "./src/index.js",

    // 多个文件入口
    entry: {
        main: "./src/main.js",
    },

    // 输出配置
    output: {
        // path.resolve根据当前的目录返回绝对路径
        path: path.resolve(__dirname, "../dist"), // 返回上一级去找到dist
        filename: "js/[name].bundle.js"              // [name]是固定的写法，却entry中key的值
    },

    // 优化打包，提取出公共模块
    optimization: {
        splitChunks: {
            chunks: 'all'	// 提取所有文件的共同模块
        }
    },

    // 模块解释
    resolve: {
        // 提供别名，方便查找模块的路径
        alias: {
            '@': path.resolve(__dirname, "../src")
        },

        // 忽略扩展名
        extensions: [".js", ".json", ".vue"]
    },

     // 模块加载配置
    module: {
        rules: [
            // 处理css文件类型
            {
                test: /\.css$/, // 匹配.css结尾的文件
                use: ExtractTextPlugin.extract({	// 提取css
                    fallback: "vue-style-loader",
                    use: ["css-loader"]
                })
            },
            // 处理less文件类型
            {
                test: /\.less$/, // 匹配.less结尾的文件
                use: ExtractTextPlugin.extract({	// 提取css
                    fallback: "vue-style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },

            // 匹配图片文件
			{
                test: /\.(png|svg|jpg|gif)$/,	
                use: [
                    {
                        loader: "file-loader",              // 处理图片文件返回链接
                        options: {
                            publicPath: "./images/",        //  引入图片时会在路径前面加上该选项
                            outputPath: "images"            // 输出到dist下的images目录
                        }
                    } 
                ]
            },

            // 匹配vue的单文件组件
            {
                test: /\.vue$/,
                use: ['vue-loader']
			},
        ]
    },

    plugins: [
        new ExtractTextPlugin('style/style.css'), // 提取到dist的style文件夹中

        new CleanWebpackPlugin(), // 调用清除打包目录插件                  

        new HtmlWebpackPlugin({
            template: "public/index.html"	// template指定默认html模板
        }),

        new VueLoaderPlugin()   // vue加载器插件
    ]

}