var User=require('../application/controllers/user')
var Movie=require('../application/controllers/movie')
var Index=require('../application/controllers/index')
var Comment=require('../application/controllers/comment')
var Category=require('../application/controllers/category')

module.exports=function(app){
	//pre handle 预处理 把这段单独提取出来，这样访问每个页面都可以拿到user值
	app.use(function(req,res,next){
		var _user=req.session.user

		app.locals.user=_user
		next()
	})


	app.get('/',Index.index)

	app.post('/user/signup',User.signup)

	app.post('/user/signin',User.signin)

	app.get('/logout',User.logout)

	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)

	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
	app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.save)

	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

	app.get('/movie/:id',Movie.detail)

	app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)


	//Comment
	app.post('/user/comment',User.signinRequired,Comment.save)

	//category
	app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new)
	app.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list)

	app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)


}