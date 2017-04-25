var Movie=require('../models/movie')
var Category=require('../models/category')
var Comment=require('../models/comment')

var _=require('underscore')



exports.detail=function(req,res){

	var id=req.params.id


	Movie.findById(id,function(err,movie){

		if(err){
			console.log('none')
		}else{

			// Comment.find({movie:id},function(err,comments){
			// 	console.log(comments)
			// 	res.render('detail',{
			// 		title:'详情页'+movie.title,
		 // 			movie:movie,
		 // 			comments:comments
		 // 		})
			// })


			Comment
				.find({movie:id})
			    .populate('from','name')
			    .populate('reply.from reply.to','name')
			    .exec(function(err,comments){
			    	console.log(comments)
			    	res.render('detail',{
						title:'详情页'+movie.title,
						movie:movie,
						comments:comments
					})
			    })

			// res.render('detail',{
			// 	title:'详情页'+movie.title,
	 	// 		movie:movie
	 	// 		//comments:comments
	 	// 	})
		
		}
	})
}


exports.new=function(req,res){
	
	Category.find({}, function(err, categories) {
	    res.render('admin', {
	      title: '后台录入页',
	      categories: categories,
	      movie: {}
	    })
    })
}

exports.update=function(req,res){
	var id = req.params.id

	if(id){
		Movie.findById(id,function(err,moive){
			res.render('admin',{
				title:'后台更新页',
				movie:movie
			})
		})

	}
}

exports.save=function(req,res){
	//console.log(JSON.stringify(req.body, null, 2))//json特别复杂啊啊啊啊
	var movieObj = req.body
	var id = movieObj._id

	//var movieObj = req.body.movie
	var _movie 
	
	
	var categoryId=movieObj.category


	_movie=new Movie({
		title:movieObj.title,
		summary:movieObj.summary,
		category:movieObj.category
	})

	_movie.save(function(err,movie){
		if(err){
			console.log(err)
		}
		if (categoryId) {
	        Category.findById(categoryId, function(err, category) {
	          category.movies.push(movie._id)

	          category.save(function(err, category) {
	            res.redirect('/movie/' + movie._id)
	          })
	        })
	      }
	    else if (categoryName) {
	        var category = new Category({
	          name: categoryName,
	          movies: [movie._id]
	        })

	        category.save(function(err, category) {
	          movie.category = category._id
	          movie.save(function(err, movie) {
	            res.redirect('/movie/' + movie._id)
	          })
	        })
	    }
	})
}

exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}

		res.render('list',{
			title:'列表页',
			movies:movies
		})
	})
}


exports.del=function(req,res){
	var id = req.query.id
	//console.log(JSON.parse(req.query))
	console.log(id)

	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}