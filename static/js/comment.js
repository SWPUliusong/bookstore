$(function() {

	$("#addComment").click(function(e) {
		var that = this
		var data = $("#commentText").val()
		if (data) {
			$.ajax({
				type: "POST",
				url: $(that).attr("href"),
				data : {
					content : data
				},
				success : function(data) {
					$("#commentText").val("")
					var sourElem = '<div class="row comment-item">' + 
					'<div class="col-sm-1"><img title="' + data.critic.name +
					'" class="img-responsive img-circle" src="/' + data.critic.avatar + 
					'" alt="' + data.critic.name + '"></div>' + 
					'<div class="col-sm-10"><div class="row">' + 
					'<div class="col-sm-4 text-primary"><span class="critic-name">' + data.critic.name + 
					'</span> ' + data.count +'楼  发布于:<span class="critic-time">' + data.create_at + 
					'</div></div><div class="row">' + data.content + '</div></div></div>'

					$(".comment").prepend(sourElem).children(".noComment").remove()
				}
			})
		}
		return false
	})

	function tpl (obj) {
		var str = '<img title="' + obj.name + '" class="img-responsive img-circle"' + 
			' src="/' + obj.avatar + '" alt="' + obj.name + '">'
		return str
	}

	$(".critic-avatar").each(function(ind, elem) {
		$.get("/user/" + $(elem).data("critic"), function(data) {
			$(elem).append(tpl(data))
			$(elem).parent().find(".critic-name").text(data.name)
		})
	})
})

