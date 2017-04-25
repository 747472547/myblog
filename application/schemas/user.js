var mongoose=require('mongoose')
var bcrypt=require('bcrypt')
var SALT_WORK_FACTOR=10

var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,

	//用户权限 String Number都可以
	//0 normal
	//1 verified user
	//2 advanced user
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
		}
})
//中间件
//save之前触发
UserSchema.pre('save',function(next){
	var user=this

	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)

	    hash=bcrypt.hashSync(user.password,salt)

		user.password=hash
		console.log("加密的:"+user.password)
		next()
		
	})

	//this.password=user.password
	console.log("thispassword"+this.password)

})


UserSchema.post('save',function(doc){
	console.log(doc)
})

//实例方法
UserSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err)

			cb(null,isMatch)
		})
	}
}


//静态方法
UserSchema.statics={
	fetch:function(cb){
		return this
		  .find({})
		  .sort('meta.updateAt')
		  .exec(cb)
	},
	findById:function(id,cb){
		return this
		  .findOne({_id:id})
		  .exec(cb)
	}
}






module.exports=UserSchema



// var cb=async function(err,salt){
	// 	if(err) return next(err)

	// 	await bcrypt.hash(user.password,salt,function(err,hash){
	// 		if(err) {
	// 			console.log("加密错误")
	// 			console.log(err)
	// 			return next(err)
	// 		}

	// 		user.password=hash
	// 		console.log(user.password)
	// 		next()
	// 	})
	//     next()
	// };

	// bcrypt.genSalt(SALT_WORK_FACTOR,cb)
