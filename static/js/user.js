$(function(){

	//获取html片段
	function getPage() {
		//添加数据修改样式
		function handler(cxt, data) {
			cxt.addClass("active").siblings().removeClass("active")
			$(".user-content").html(data)
		}

		$.get($(location.hash).attr("href"), {self: true}, function(data) {
			handler($(location.hash), data)
		})
	}


	var hashMap = new HashMap()
	hashMap.register({
		url: "info",
		default: true,
		ctrl: getPage
	})
	.register({
		url: "addbook",
		ctrl: getPage
	})
	.register({
		url: "mybooks",
		ctrl: getPage
	})
	
	//刷新时获取保存ajax状态
	hashMap.run()

	//点击触发hashchange
	$("#mybooks, #addbook, #info").on("click", function(e) {
		var that = this
		if (location.hash.substr(1) != that.id) {
			location.hash = that.id
		}
		return false
	})

	//提交删除请求
	$(".user-content").on("submit", ".delete", function(e) {
		var that = this
      if(confirm("确认删除")) {
          $.ajax({
              url : $(that).attr("action"),
              type : "delete",
              success : function() {
                $(that).parents(".col-md-3").remove()
              }
          })
      }
      return false
	})

	//提交新建书籍请求
	$(".user-content").on("submit", "#newBook", function(e) {
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
				$("#back").on("click", function() {
			  		$.get($("#mybooks").attr("href"), {self: true}, function(data) {
						setTimeout(function(){
							handler($("#mybooks"), data)
						}, 400)
					})
				})
			},
			error : function(xml) {
				alert(JSON.stringify(xml.responseText))
			}
		})
	})

	//修改头像
	$("#user-avatar").on("change", function(e) {
		var that = this
		$.ajax({
			url: $("#avatar-upload").attr("action"),
			type: "POST",
			data: new FormData($("#avatar-upload")[0]),
			contentType: false,
			processData: false
		}).done(function(data) {
			console.log(data)
			$("#close").trigger("click")
			$(".user-avatar").find("img").attr("src", "/" + data)
		})
	})
})