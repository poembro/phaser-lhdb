const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack')
module.exports = {
    //模式
    mode:'development',
    target: 'web',

    entry: './src/index.js',
    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: './build/',
        filename: 'project.bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.evn': '"development"'  //添加全局变量
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {  
        host: "0.0.0.0",
        port: 8082,
        overlay: {
            errors: true
        },
        contentBase: path.join(__dirname, "./"),//告诉服务器从哪里提供内容
        hot: true,
        inline:true
    },
    stats: { children: false }
};
