mongoose = require('mongoose');

mongoUrl = "mongodb://unrism:unrismZ21@unrism.com:27017/hhcApi?authSource=admin";
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// mongoUrl = "mongodb://localhost:27017/unrismApi";
// const options = {
//     keepAlive: true,
//     keepAliveInitialDelay: 300000,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };

mongoose.connect(mongoUrl, options)
    .then(() => console.log("Db connection successful"))
    .catch(err => console.log(err))

module.exports = mongoose