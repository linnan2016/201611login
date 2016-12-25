var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'asd'
}));
function getCustoms(fn) {
    fs.readFile('./custom.json', 'utf8', function (err, data) {
        if (err) {
            fn([])
        } else {
            fn(JSON.parse(data))
        }
    })
}
function setCustoms(data, fn) {
    fs.writeFile('./custom.json', JSON.stringify(data), fn)
}

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('public')));

app.get('/signup', function (req, res) {
    res.render('zhuce', {title: '注册',error:req.session.error});
});
app.post('/signup', function (req, res) {
    var obj = req.body;
    getCustoms(function (data) {
        var user=data.find(function (item) {
            return item['username']==obj['username']
        });
        if(user){
            req.session.error='用户名重复，请您重新填写';
            res.redirect('/signup');
        }else{
            data.push(obj);
            req.session.error='';
            setCustoms(data,function () {
                res.redirect('/signin');
            })
        }
    });
});
app.get('/welcome', function (req, res) {
    res.render('welcome', {title: '欢迎',success:req.session.success});
});
app.get('/signin', function (req, res) {
    res.render('signin', {title: '登录',error:req.session.error})
});
app.post('/signin', function (req, res) {
    var obj = req.body;
    getCustoms(function (data) {
        var user=data.find(function (item) {
            return item['username']==obj['username']&&item['password']==obj['password']
        });
        if(user){
            req.session.success=`欢迎${user['username']}用户`;
            req.session.error='';
            res.redirect('/welcome');
        }else{
            req.session.error='用户名或密码输入错误';
            res.redirect('/signin');
        }
    })
});
app.listen(8081);
