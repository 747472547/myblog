$(function(){
	$('.comment').click(function(e){
		var target=$(this)
		var toId=target.data('tid')
		var commentId=target.data('cid')

//判断是否第一次点击
		if($('#toId').length>0){
			$('#toId').val(toId)
		}else{
			$('<input>').attr({
			id:'toId',
			type:'hidden',
			name:'tid',
			value:toId
		}).appendTo('#commentForm')
		}

		
		if($('#commentId').length>0){
			$('#commentId').val(commentId)
		}else{
			$('<input>').attr({
			id:'commentId',
			type:'hidden',
			name:'cid',
			value:commentId
			}).appendTo('#commentForm')
		}
		
	})
})