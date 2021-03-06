var express = require('express');
var config = require('../config/config');
const auth = require("../config/email")
var router = express.Router();
var session = require('express-session');
const request = require('request');
var baseUrl = config.Url;
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.com',
    port: 465,
    auth: {
        user: auth.email,
        pass: auth.pass
    }
})



router.get('/', function(req, res) {
    try{
        year=String(new Date().getFullYear());
        res.render('contact2', {
            title: config.title,
                         slogan: config.slogan,
                         session: req.session,
                         currentYear: year,
            status: null

        });
    }catch{
        res.redirect('/');
    }
});



router.get('/admin', function(req,res){
    try{
        if (req.session.user) {
            var url = baseUrl + "/api/contactForm/viewContactForm";
            const options = {
                url: url,
                json: true,
                headers: {
                    'x-api-key': 'wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh'
                }
            };
            
            request.get(options, (err, response, body) => {
                if (err) {
                    return console.log(err);
                } else {
                    var formData = [];
                    for(var i in body.response) {
                        formData.push(body.response [i]);
                    }
                    year=String(new Date().getFullYear());
                    res.render('viewContact', {
                        formData: formData,
                        title: config.title,
                         slogan: config.slogan,
                         session: req.session,
                         currentYear: year,
                }
                    );
                }
        
            });
        } else {
            res.redirect('/admin/login');
        }
    }catch{
        res.redirect('/admin/login');
    }

});


router.get('/view/:id', function(req,res){
    try{
        if (req.session.user) {
            var url = baseUrl + "/api/contactForm/viewOne/" + req.params.id;
            const options = {
                url: url,
                json: true,
                headers: {
                    'x-api-key': 'wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh'
                }
            };
            
            request.get(options, (err, response, body) => {
                if (err) {
                    return console.log(err);
                } else {
                    // var formData = [];
                    // for(var i in body.response) {
                    //     formData.push(body.response [i]);
                    // }
                    year=String(new Date().getFullYear());
                    res.render('singleContact', {
                        contact: response.body,
                        title: config.title,
                         slogan: config.slogan,
                         session: req.session,
                         currentYear: year,
                        status: null
                    });
                }
        
            });
        } else {
            res.redirect('/admin/login');
        }
    }catch{
        res.redirect('/admin/login');
    }  
})

router.post('/delete/:id', function(req,res){
    try{
        if (req.session.user) {
            var url = baseUrl + "/api/contactForm/delete";
            const options = {
                url: url,
                json: true,
                body: {ID: req.params.id},
                headers: {
                    'x-api-key': 'wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh'
                }
            };
            
            request.post(options, (err, response, body) => {
                if (err) {
                    return console.log(err);
                }
                res.redirect('/contact/admin');
            });
        } else {
            res.redirect('/admin/login');
        }
    }catch{
        res.redirect('/admin/login');
    }
    
})

module.exports = router;