var express = require('express');
var config = require('../config/config');
var router = express.Router();
const request = require('request');
var baseUrl = config.Url;

router.get('/recruitment', function(req, res) {
        res.render('recruitment');
});





module.exports = router;