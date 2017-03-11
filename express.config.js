var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var credential = require('./credential.js');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var compression = require('compression');
var routes = require('./routes/mongo');

var app = express();

//设置端口
app.set('port', process.env.PORT || 3000);

//设置模板引擎
app.set('views', [path.resolve(__dirname, 'asset'),path.resolve(__dirname, 'public')]);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//忽略响应报头中X-Powered-By信息
app.disable('x-powered-by');

switch(app.get('env')) {
	case 'development':
		// 紧凑的、彩色的开发日志
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		// 模块 'express-logger' 支持按日志循环
		app.use(require('express-logger')({
			path: __dirname + '/log/requests.log'
		}));
		break;
}

//设置gzip
app.use(compression());

//设置静态资源目录
app.use(express.static(path.resolve(__dirname, 'asset')));
app.use(express.static(path.resolve(__dirname, 'public')));

//添加cookie解析
app.use(cookieParser(credential.cookieSecret));

//添加session
app.use(expressSession({
	secret: 'abcdada',
	resave: false,
	name: 'jession_Id',
	saveUninitialized: false
}));

//bodyParser()已过时
//解析 application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({
	extended: false
}))

//解析 application/json  
app.use(bodyParser.json());

app.get('/', function(req, res) {
//	console.log(req.session);
//	req.session.name = 'abcdada';
	//给cookie加签名
//	res.cookie('signed_abc', 'nnn', { signed: true });
	res.render('index');
});

app.use(routes);

//下载文件
app.get('/header', function(req, res) {

	//download
	res.download('./public/script/a.js', 'b122.js', function(err) {
		if(err) {
			console.log(err.stack);
		}
	});

	//download
	res.attachment('a.js');
	res.send('adada');

});

app.get('/get/:id', function(req, res) {
	console.log(req.params.id);
	//根据请求类型来返回值
	res.format({
		'text/plain': function() {
			res.send('1223');
		},
		'application/json': function() {
			res.send({
				abc: 'this is json'
			})
		}
	})
});

app.post('/form', function(req, res) {
	console.log(req.cookies);
	//解析formdata 类型表单
	var form = new formidable.IncomingForm();
	//上传图片
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = 'public/upload/'; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files.file.name);
		fs.renameSync(files.file.path, form.uploadDir + 'a.jpg');
		res.send('ada');
	});

});

//404
app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

//500
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started in ' + app.get('env') +
		' mode on http://localhost:' + app.get('port') +
		'; press Ctrl-C to terminate.');
});