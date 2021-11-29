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

router.get('/recruitment', function(req, res) {
        res.render('recruitment');
});


router.post('/contactHome', function(req, res) {
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
                    from: 'system@soindomicile.org',
                    to: 'info@soindomicile.org', 
                    subject: 'Patient Request for ' + req.body.name,
                    // text: 'test'
                    html: "<p>you have received a new client<p><p>Name: " + req.body.name + "</p><p>Email: " + req.body.email + "</p><p>Phone: " + req.body.phone + "</p><p>Service: " + req.body.service + "</p><p>Description: " + req.body.description + "</p> " 
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
                res.render('home', 
                {
                    title: config.title,
        slogan: config.slogan,
        session: req.session,
                    currentYear: year,
                status: status
                })
            });
        }catch{
            res.redirect('/');
        }
        
    });
    
    router.post('/contactAbout', function(req, res) {
        try{
            console.log(req.body.service);
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
                    from: 'system@soindomicile.org',
                    to: 'info@soindomicile.org', 
                    subject: 'Recruitment for ' + req.body.name,
                    // text: 'test'
                    html: "<p>you have received a new client<p><p>Name: " + req.body.name + "</p><p>Email: " + req.body.email + "</p><p>Phone: " + req.body.phone + "</p><p>Service: " + req.body.service + "</p><p>Description: " + req.body.description + "</p> " 
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
                res.render('about', 
                {
                   
                    title: config.title + " | About us",
        slogan: config.slogan,
        session: req.session,
                status: status
                })
            });
        }catch{
            res.redirect('/');
        }
        
    });




module.exports = router;