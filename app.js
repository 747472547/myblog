var express = require('express')
var path = require('path')
var mongoose=require('mongoose')
var connect = require('connect');
var logger = require('morgan');


require("babel-core/register");


var cookieParser = require('cookie-parser')
var session = require('express-session'); 
var mongoStore=require('connect-mongo')(session)

var port = process.env.PORT || 3000
var app =express()
var bodyParser=require('body-parser')
var dbUrl='mongodb://localhost/imooc'

var db = mongoose.connect('mongodb://localhost/imooc')


db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error); 
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});


//使用 req.body必须载入bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.locals.moment=require('moment')


app.set('views','./application/views/pages')  //视图目录
app.set('view engine','jade')

app.use(cookieParser())
app.use(session({
	secret:'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))

//配置开房环境 区别于生产环境
if('development'===app.get('env')){
	app.set('showStackError',true)

	//用于开房中打印出请求日志
	app.use(logger(':method :url :status')) 
	app.locals.pretty=true //将网页源代码美化
	mongoose.set('debug',true)
}


require('./config/routes')(app)


app.use(express.static('public'))//设置静态文件目录

//console.log(path.join(__dirname,'/public/bower_components'))
app.listen(port)

console.log('app start on'+port)







