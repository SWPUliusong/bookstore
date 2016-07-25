$(function() {

	$("#addComment").click(function(e) {
		var that = this
		
		e.preventDefault()
		$.ajax({
			type: "POST",
			url: $(that).attr("href"),
			data : {
				content : $("#commentText").val()
			},
			success : function(comment) {
				$("#commentText").val("")
				var sourElem = '<div class="row comment-item">' + 
				'<div class="col-sm-1"><img title="' + comment.user.name +
				'" class="img-responsive" src="/' + comment.user.avatar + 
				'" alt="' + comment.user.name + '"></div>' + 
				'<div class="col-sm-10"><div class="row">' + 
				'<div class="col-sm-4 text-primary">' + comment.user.name + 
				' ' + comment.count +'楼</div></div>' + 
				'<div class="row">' + comment.content + '</div></div></div>'

				$(".comment").prepend(sourElem).children(".noComment").remove()
			}
		})
	})
})

