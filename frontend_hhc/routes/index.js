var express = require('express');
var config = require('../config/config');

var router = express.Router();
var session = require('express-session');

router.get('/', function(req, res) {
    try{
        year=String(new Date().getFullYear());
        // var team = [
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //     { title:'Web Developer', name: "Ashwin Apadoo",image:"1.png"},
        //   ];
        res.render('index', {
            title: config.title ,
            slogan: config.slogan,
            currentYear: year,
            session: req.session
        });
        //res.send(year);
    }catch{
        res.redirect('/');
    }
});

module.exports = router;