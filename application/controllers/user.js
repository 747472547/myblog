var User=require('../models/user')


exports.signup=function(req,res){
	var _user=req.body

//findOne find的区别 这边用find则会一直是已存在
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}

		if(user){
			console.log("已存在")
			return res.redirect('/')
		}
		else{
			var user = new User(_user)

			user.save(function(err,user){
				if(err){
					console.log(err)
				}

				res.redirect('/')
			})
		}
	})
}
exports.signin=function(req,res){
	var _user=req.body
	var name=_user.name
	var password=_user.password

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}

		if(!user){
			console.log("用户不存在")
			return res.redirect('/')
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}

			if(isMatch){

				req.session.user=user
				console.log('password is correct')
				return res.redirect('/')
			}
			else{
				console.log("password is wrong")
			}
		})
	})
}

exports.logout=function(req,res){
	delete req.session.user
	//delete app.locals.user

	res.redirect('/')
}



exports.list=function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}

		res.render('userlist',{
			title:'用户列表页',
			users:users
		})
	})
}


//midleware for 权限控制
//判断是否登录的中间件
exports.signinRequired=function(req,res,next){
	var user=req.session.user

	if(!user){
		return res.redirect('/signin')
	}

	next()
}

exports.adminRequired=function(req,res,next){
	var user=req.session.user
	console.log(user.role)
	if(user.role<=10||user.role==undefined){
		console.log("权限不通过")

		return res.redirect('/')
	}
	console.log("权限通过")
	next()
}






