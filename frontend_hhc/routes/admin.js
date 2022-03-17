var express = require('express');
var config = require('../config/config');
var request = require('request');
var router = express.Router();
var session = require('express-session');
var baseUrl = config.Url;

//show login
router.get('/login', function(req, res) {
    try{
        year = String(new Date().getFullYear());
        if(req.session.user){
            res.render("admin/dashboard", {
                title: config.title,
                slogan: config.slogan,
                currentYear: year,
                session: req.session
            })
        }else{
            res.render('admin/login', {
                title: config.title,
                slogan: config.slogan,
                currentYear: year,
                session: req.session
            });
        }
    }catch{
        res.redirect('/admin/login');
    }
});

//login
router.post('/login', function(req, res) {
    try{
        var url = baseUrl + "/api/authentication/login";
        year = String(new Date().getFullYear());
        request.post(
            url, {
                json: true,
                headers: {
                    'x-api-key': config.apikey
                },
                body: {
                    username: req.body.username,
                    hash: req.body.password
                        // sam - test
                        // nirmal - 12345
                },

            },

            (err, _, body) => {
                if (err) {
                    return console.log(err);
                }
                if (body.status == 1) {

                    req.session.user = body.response;

                    res.render("admin/dashboard", {
                        title: config.title,
                        slogan: config.slogan,
                        currentYear: year,
                        session: req.session
                    })

            
                
            } else {
                res.redirect('/admin/login');
            }
            }
        );
    }catch{
        res.redirect('/admin/login');
    }

});

//log out
router.get('/logout', function(req, res) {
    try{
        req.session.destroy();
        res.redirect('/admin/login');
    }catch{
        res.redirect('/admin/login');
    }
});


module.exports = router;