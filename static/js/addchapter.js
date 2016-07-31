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


      $("#chapter").on("keydown", function(e) {
            var val = $(this).val()
            if (e.which == 9) {
                  var end = this.selectionEnd
                  var val1 = val.slice(0, end)
                  var val2 = val.slice(end)
                  $(this).val(val1 + "    " + val2)
                  this.selectionEnd = end + 4
                  e.preventDefault()
            }
            if (e.which == 13) {
                  parseMarkdown(val)
            }
      })

      $("#chapter").on("keyup", function(e) {
            if (e.which == 8) {
                  var val = $(this).val()
                  parseMarkdown(val)
            }
      })

      function parseMarkdown(str) {
            $.post("/api/v1/parseMarkdown", {
                  mdtpl: str
            }, function(data) {
                  $("#preview").html(data)
            })
      }
})