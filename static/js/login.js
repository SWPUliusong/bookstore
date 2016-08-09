$(function() {
	$("#login").on("submit", function(e) {
		e.preventDefault()
		var that = this
		$.ajax({
			url : "/",
			type : 'POST',
			data : $(that).serialize(),
			cache : false,
			success : function() {
				window.location.href = "/"
			},
			error : function() {
				$("#password").val("")
				alert("账号密码不匹配")
			}
		})
	})
})