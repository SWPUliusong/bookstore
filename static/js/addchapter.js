$(function() {
	$("#addChapter").on("submit", function(e) {
		//e.preventDefault()
		var that = this
		$.ajax({
			url : $(that).attr("action"),
			type : "POST",
			data : $(that).serialize(),
                  cache : false,
                  success : function(user) {
                  	$(that).trigger("reset")
                  	$("#showModal").click()
                  	$(".btn-success").on("click", function() {
                  		window.location.href = "/user/" + user._id + "/books"
                  	})
                  },
                  error : function() {
                  	alert("error")
                  }
		})
            return false
	})
})