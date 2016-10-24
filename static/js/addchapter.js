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
                  e.preventDefault()
                  var end = this.selectionEnd
                  var val1 = val.slice(0, end)
                  var val2 = val.slice(end)
                  $(this).val(val1 + "    " + val2)
                  this.selectionEnd = end + 4
            }
      })

      $("#chapter").on("keyup", function(e) {
            var val = $(this).val()
            parseMarkdown(val)
      })

      function parseMarkdown(str) {
            $.post("/api/v1/parseMarkdown", {
                  mdtpl: str
            }, function(data) {
                  $("#preview").html(data)
            })
      }

      // 找到适合浏览器的全屏方法  
      function launchFullScreen(element) {  
            if(element.requestFullScreen) {  
                  element.requestFullScreen();  
            } else if(element.mozRequestFullScreen) {  
                  element.mozRequestFullScreen();  
            } else if(element.webkitRequestFullScreen) {  
                  element.webkitRequestFullScreen();  
            }  
      }
      // Whack fullscreen
      function exitFullscreen() {
            if(document.exitFullscreen) {
                  document.exitFullscreen();
            } else if(document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
            }
      } 
      
      var flag = false;
      // 全屏模式  
      $(".fullscreen").on('click', function() {
            if (flag) {
                  exitFullscreen()
                  flag = false;
            }
            else {
                  launchFullScreen(document.getElementById("newChapter"));
                  flag = true; 
            }
      })
})