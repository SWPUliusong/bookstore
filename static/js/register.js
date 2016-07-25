$(function() {
	$("#register").on("submit", function(e) {
		e.preventDefault()
		var that = this
		var password = $("#password").val()
		var password_two = $("#password_two").val()
		if (password === password_two) {
			$.ajax({
				url : "/user",
				type : 'POST',
				data : $(that).serialize(),
				cache : false,
				success : function() {
					window.location.href = "/"
				},
				error : function(xhr) {
					alert(xhr.statusText)
				}
			})
		}
		else {
			alert("两次密码不匹配")
		}
	})
})