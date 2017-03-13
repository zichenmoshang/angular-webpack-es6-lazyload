const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
	context: __dirname,
	entry: {
		app: './src/js/app.js'
	},
	output: {
		path: path.resolve(__dirname,'asset'),
		publicPath: 'http://localhost:3000/',
		filename: 'js/[name].[chunkhash:8].js',
		chunkFilename: "[name].chuck[chunkhash:8].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'ng-annotate-loader',
						options: {
							add: true
						}
					},
					{
						loader: 'HappyPack'
					}
				],
				exclude: [
					path.resolve(__dirname,'node_modules')
				],
				
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false
						}
					}
				],
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
			},
			{
		        test: /\.css$/,
		        use: extractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		}),
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
		   	},
		   	{
	            test: /\.scss$/,
	            loader: extractTextPlugin.extract({
	            	fallback: "style-loader",
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }]
	            }),
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
	        },
      		{
        		test: /\.(ttf|eot|svg|woff2?)(\?[\s\S]+)?$/,
        		use: "file-loader?name=[name].[ext]&publicPath=http://localhost:3000/font/&outputPath=font/",
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
      		},
      		{
    			test: /\.(png|jpg)$/,
    			loader: 'url-loader?limit=1000&name=images/[name].[hash:8].[ext]',
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
    		}	
		]
	},
	resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".js", ".json", ".css"]
    },
    externals: {
    	angular: 'angular',
    	'angualr-ui-router': 'uiRouter'
    },
	plugins: [
		new extractTextPlugin({
			filename: 'css/[name][contenthash:8].css',
			allChunks: false
		}),
		new cleanWebpackPlugin('asset', {
            verbose: true,
            dry: false
        }),
//      new UglifyJsPlugin({
//		    // 最紧凑的输出    beautify: false,
//		    // 删除所有的注释    comments: false,
//		    compress: {
//		      // 在UglifyJs删除没有用到的代码时不输出警告        warnings: false,
//		      // 删除所有的 `console` 语句// 还可以兼容ie浏览器      drop_console: true,
//		      // 内嵌定义了但是只用到一次的变量      collapse_vars: true,
//		      // 提取出出现多次但是没有定义成变量去引用的静态值      reduce_vars: true,
//		    }
//		}),
		new HappyPack({
//	      	cache: process.env.HAPPY_CACHE === '1',
	      	loaders: [
		       	{
		          	path: 'babel-loader',
		          	query: {
		            	plugins: [
		              		'transform-runtime',
		            	],
		            	presets: ['env'],
		            	cacheDirectory: false
		         	}
		        }
		    ],
	      	threads: 2
	    }),
        new htmlWebpackPlugin({
			template: path.resolve(__dirname,'src/404.html'),
			filename: path.resolve(__dirname,'asset/404.html'),
			chunks: ['']
		}),
		new htmlWebpackPlugin({
			template: path.resolve(__dirname,'src/500.html'),
			filename: path.resolve(__dirname,'asset/500.html'),
			chunks: ['']
		}),
		new htmlWebpackPlugin({
			template: path.resolve(__dirname,'src/index.html'),
			filename: path.resolve(__dirname,'asset/index.html'),
			chunks: ['app','vendor']
		})
	]
}
