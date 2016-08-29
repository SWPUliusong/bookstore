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
					var sourElem =`<div class="comment-item">
						<div data-critic="<%= comment.criticId %>" class="critic-avatar">
							<img title="${data.critic.name}" class="img-circle" 
							src="/${data.critic.avatar}" alt="${data.critic.name}">
						</div>
						<div class="comment-main">
							<div class="text-primary comment-info">
								<div class="critic-name">${data.critic.name}</div>
								<div class="comment-time">
									${data.count}楼 
									<span class="critic-time hidden-xs">发布于: ${data.create_at}</span>
								</div>
							</div>
							<div class="comment-content">
								${data.content}
							</div>
						</div>
            </div>`

					$(".comment").prepend(sourElem).children(".noComment").remove()
				}
			})
		}
		return false
	})

	function tpl (obj) {
		var str = `<img title="${obj.name}" class="img-circle"
		 src="/${obj.avatar}" alt="${obj.name}">`
		return str
	}

	$(".critic-avatar").each(function(ind, elem) {
		$.get("/user/" + $(elem).data("critic"), function(data) {
			$(elem).append(tpl(data))
			$(elem).parent().find(".critic-name").text(data.name)
		})
	})
})

