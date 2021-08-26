const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path');
module.exports = (env)=>{
    const {NODE_ENV} = env
    console.log(env);
    return{
        mode: NODE_ENV,
        devtool: NODE_ENV === 'development' ? 'source-map' : 'cheap-source-map',
        devServer: {
            contentBase: path.join(__dirname, './public/'),
            publicPath: '/',
            host: '127.0.0.1',
            port: 3000,
            stats: {
                colors: true
            },
            hot:true
        },
        entry: './src/index.js',  //添加入口配置项
        output:{
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'dist'),
            clean:true,
        },
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
            alias: {
                'jquery': 'jquery' ,
                '@':path.resolve(__dirname,'src/')
              }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/, // jsx/js文件的正则
                    exclude: /node_modules/, // 排除 node_modules 文件夹
                    use: {
                        // loader 是 babel
                        loader: 'babel-loader',
                        options: {
                            // babel 转义的配置选项
                            babelrc: false,
                            presets: [
                                // 添加 preset-react
                                require.resolve('@babel/preset-react'),
                                [require.resolve('@babel/preset-env'), {modules: false}]
                            ],
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.css$/,   // 正则表达式，表示.css后缀的文件
                    use: ['style-loader','css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
                },{
                    test:/\.less$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },{
                   test:/\.s[ac]ss$/,
                   use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                   ]
                },{
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                }
                
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: 'public/index.html',
                filename: 'index.html',
                inject: true
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
              }),
            new webpack.HotModuleReplacementPlugin() 
        ],
    };
}