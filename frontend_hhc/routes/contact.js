var express = require('express');
var config = require('../config/config');
var router = express.Router();
var session = require('express-session');
const request = require('request');
var baseUrl = config.Url;

router.get('/', function(req, res) {
    try{
        year=String(new Date().getFullYear());
        res.render('contact', {
            title: config.title ,
            slogan: config.slogan,
            currentYear: year,
            session: req.session,
            status: null

        });
    }catch{
        res.redirect('/');
    }
});


router.post('/', function(req, res) {
    try{
        const formData = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            budget: req.body.budget,
            description: req.body.description
        };
        var url = baseUrl + "/api/contactForm/sendContactForm";
        const options = {
            url: url,
            json: true,
            body: formData
            
        };
        
        request.post(options, (err, response, body) => {
            var status = true;
            if (err) {
                status = false;
                return console.log(err);
                
            }
            year=String(new Date().getFullYear());
            res.render('contact', 
            {
                title: config.title ,
                slogan: config.slogan,
                currentYear: year,
                session: req.session,
            status: status
            })
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
                        title: config.title ,
                        currentYear: year,
                        slogan: config.slogan,
                        session: req.session
                    });
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
                        title: config.title ,
                        slogan: config.slogan,
                        currentYear: year,
                        session: req.session,
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