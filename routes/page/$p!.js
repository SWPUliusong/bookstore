var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book

exports.get = function (req,res){
    var user = req.session._user
    if(user){
        var page = Number(req.params.p) - 1
        if (typeof page !== 'number' || page < 1) {
            res.status(302).redirect("/")
            return
        }
        Book.countAll(function(err, count) {
            Book.fetchRecent(function(err,recent) {
                Book.fetch(page * 10, function(err, books) {
                    books.forEach(function(item,index) {
                        User.findById(item.authorId)
                            .then(function(author) {
                                books[index].author = author
                                if (books.length === index + 1) {
                                    res.status(200).render("home",{
                                        user : user,
                                        books : books,
                                        recent : recent,
                                        count : Math.ceil(count / 10)
                                    })
                                }
                            })
                            .catch(function(err) {
                                res.status(500).json(err)
                            })
                    })
                })
            })
        })
        
    }else{
        res.status(401).redirect("/login.html")
    }
}