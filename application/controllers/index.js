//跟首页交互
var Movie=require('../models/movie')
var Category=require('../models/category')

exports.index = function(req,res){

	console.log("user in session:"+JSON.stringify(req.session.user))
	// var _user=req.session.user

	// if(_user){
	// 	app.locals.user=_user
	// }

	Category
	   .find({})
	   .populate({path:'movies',options:{limits:5}})
	   .exec(function(err,categories){
	   		if(err){
	   			console.log(err)
	   		}

	   		res.render('index',{
	   			title:'首页',
	   			categories:categories
	   		})

	   })




	// Movie.fetch(function(err,movies){
	// 	if(err){
	// 		console.log(err)
	// 	}

	// 	res.render('index',{
	// 		title:'首页',
	// 		movies:movies
	// 	})
	// })

}