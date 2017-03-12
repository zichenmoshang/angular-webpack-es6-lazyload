const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: {
		app: './src/js/app.js',
		vendor: ['angular','angular-ui-router']
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
						loader: 'babel-loader',
						options: {
				        	presets: ["env"]
				        }
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
				]
			},
			{
		        test: /\.css$/,
		        use: extractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		})
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
	            })
	        },
      		{
        		test: /\.(ttf|eot|svg|woff2?)(\?[\s\S]+)?$/,
        		use: "file-loader?name=[name].[ext]&publicPath=http://localhost:3000/font/&outputPath=font/"
      		},
      		{
    			test: /\.(png|jpg)$/,
    			loader: 'url-loader?limit=1000&name=images/[name].[hash:8].[ext]'
    		}	
		]
	},
	resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".js", ".json", ".css"]
    },
	plugins: [
		new extractTextPlugin({
			filename: 'css/[name][contenthash:8].css',
			allChunks: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/[name].[chunkhash:8].js'
		}),
		new cleanWebpackPlugin('asset', {
            verbose: true,
            dry: false
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
