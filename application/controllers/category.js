var Category=require('../models/category')
var _=require('underscore')

exports.new=function(req,res){
	res.render('category_admin',{
		title:'后台分类录入页'

	})
}

exports.save=function(req,res){
	var _category=req.body
	var category=new Category(_category)

	category.save(function(err,category){
		if(err){
			console.log(err)
		}

		res.redirect('/admin/categorylist')
	})
}

exports.list=function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err)
		}

		res.render('categorylist',{
			title:'分类列表页',
			categories:categories
		})
	})
}