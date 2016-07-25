$(function() {
	$("#newBook").on("submit", function(e) {
		e.preventDefault()
		var that = this
		var formData = new FormData(this)
		$.ajax({
			url : $(that).attr("action"),
			type : "POST",
			data : formData,
			contentType : false,	//采用原有的content-type
                  processData : false,	//不格式化数据
                  cache : false,
                  success : function(user) {
                  	$(that).trigger("reset")
                  	$("#showModal").click()
                  	$(".btn-success").on("click", function() {
                  		window.location.href = "/user/" + user._id + "/books"
                  	})
                  },
                  error : function(xml, txtStatus, err) {
                  	alert(JSON.stringify(err))
                  }
		})
	})
})