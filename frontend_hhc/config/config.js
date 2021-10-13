// const { config } = require("dotenv");
config = {};

config.title = "Unrism";
config.slogan = "A digital agency based in Mauritius";
config.apikey = "wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh";
config.adminuser = "";
// config.baseUrl = "http://unrism.com";

config.baseUrl = "http://localhost";
config.port = 3000;
config.Url = config.baseUrl + ":" + String(config.port);


module.exports = config;