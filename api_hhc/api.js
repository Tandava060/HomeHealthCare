//const mongoose = require('mongoose'); //Db connector
const helmet = require('fastify-helmet'); //Security middleware
//const swagger = require("./config/swagger"); //API Documentation

const mongoose = require("./config/database.js");

//Routes
const authentication_routes = require("./routes/authentication");
const cf_routes = require('./routes/contactForm');


//Init framework
const app = require('fastify')({
    logger: true
});

// //Middleware
// app.register(require('fastify-cors'), { //cross origin requests
//     // origin:true
// })

// Security modules
app.register(
    helmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' } }
)


//Link Routes

authentication_routes.forEach((route, index) => {
    app.route(route);
});

cf_routes.forEach((route, index) => {
    app.route(route);
});

//Static Routes
app.get('/api/', async(request, reply) => {
    return {
        server: "online"
    }
})

//Start Server in async mode
const start = async() => {
    try {
        await app.listen(3001, '0.0.0.0');
        //app.swagger();
        console.log(`Server started on ${app.server.address().port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();

module.export = app;