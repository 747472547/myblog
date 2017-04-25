var Comment=require('../models/comment')

exports.save=function(req,res){
	var _comment=req.body
	var movieId=_comment.movieId

	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			}

			comment.reply.push(reply)

			comment.save(function(err,comment){
				if(err){
					console.log
				}

				res.redirect('/movie/'+comment.movie)
			})
		})
	}
	else{
		var comment=new Comment(_comment)

		comment.save(function(err,comment){
			if(err){
				console.log
			}

			res.redirect('/movie/'+comment.movie)
		})
	}
}