var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book

//直接访问主页时cookie验证用户
exports.get = function (req,res){
    var user = req.session._user
    if(user){
        Book.countAll(function(err, count) {
            Book.fetchRecent(function(err,recent) {
                Book.fetch(null, function(err, books) {
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

//登录验证
exports.post = function (req,res){
    var info = {
        email : req.body.email,
        password : req.body.password
    };
    User.findByEmail(info)
        .then(function(user) {
            req.session._user = user
            res.status(200).json(null)
        })
        .catch(function(err) {
            res.status(403).json(null)
        })
}