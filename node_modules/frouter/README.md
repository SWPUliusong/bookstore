# frouter
  a middleware for express,file path is routes

# install
  npm install frouter

### Usage

```
app.use(app, options)
```
- app: {Object} a express application.
- options: {Object|String->root}
  - root: {String} router directory
  - wildcard: {String} will replace it with '`:`', default '`$`'
  - ignorable: {String} will replace it with '`?`', default '`!`'

# example

**File tree**

```
├── app.js
├── package.json
├── ...
└── router
    ├── users
    │   └── $uid.js
    │
    ├── posts
    │   ├── user
    │   │   └── $id.js
    │   ├── book
    │   │   └── $id.js
    │   └── comment
    │       └── $id!.js
    ├── index.js
    └── links.js
```
**$uid.js**

```
exports.post = function (req, res, next) {
  var uid = req.params.uid
  ...
}
```


**$id.js**

```
/*if you require the middleware like multer*/
var multer = require("multer");
var storage = multer.diskStorage({...})
var upload = multer({storage:storage})

exports.post = [upload.single('coverImg'), function (req, res, next) {
  var uid = req.params.uid
  console.log(req.file)
  ...
}]
```

**app.js**

```
var app = require('express')();
var frouter = require('frouter');

app.use(frouter(app, __dirname + '/router'));
app.listen(3000);
```
