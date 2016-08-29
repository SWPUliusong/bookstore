$(function() {
  var book_hashMap = new HashMap()

  $(".title-item").each(function(ind, elem) {
    var flag = false
    if (ind === 0) {
      flag = true
    }
    book_hashMap.register({
      url: $(elem).text().trim(),
      default: flag,
      ctrl: handler
    })
  })

  book_hashMap.getState()

  function handler() {
    var title = location.hash.substr(1)
    $.ajax({
      url: $(".title-list").data("bookurl") + "?title=" + title,
      type: 'get'
    })
    .done(function(data) {
      $('#chapter-content').html(data)
    })
    .fail(function(xhr, textStatus) {
      alert(textStatus)
    })
  }

  //上一页， 下一页
  $(".previous a").click(function() {
    book_hashMap.prev()
  })
  $(".next a").click(function() {
    book_hashMap.next()
  })

})