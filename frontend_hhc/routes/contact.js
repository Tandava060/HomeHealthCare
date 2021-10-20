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
        res.render('contact', {
            phone: config.phone ,
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
            phone: req.body.phone,
            service: req.body.service,
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

            var msg = {
                from: 'ceo@unrism.com',
                to: 'appadooashwin@gmail.com', 
                subject: 'Recruitment for ' + req.body.name,
                // text: 'test'
                html: "<p>you have received a new client<p><p>Name: " + req.body.name + "</p><p>Email: " + req.body.email + "</p><p>Phone: " + req.body.phone + "</p><p>Service: " + req.body.Service + "</p><p>Description: " + req.body.description + "</p> " 
            }

            transporter.sendMail(msg,function(error, info) {
                if(error) {
                    console.log(error);
                } else {
                    console.log(info.response);
                }
            }
              
            );

            year=String(new Date().getFullYear());
            res.render('contact', 
            {
                phone: config.phone ,
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
                        phone: config.phone ,
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
                        phone: config.phone ,
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