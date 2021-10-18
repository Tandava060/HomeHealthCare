// const { config } = require("dotenv");
config = {};

config.title = "Soin Domicil";
config.slogan = "Our aim is to avoid hospitalisation, where treatments can be given a Domicile itself we do it but on Doctor's instructions";
config.apikey = "wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh";
config.adminuser = "";
// config.baseUrl = "http://unrism.com";

config.baseUrl = "http://localhost";
config.port = 3000;
config.Url = config.baseUrl + ":" + String(config.port);


module.exports = config;