const authentication = require('../controllers/authentication')

const routes = [
    {
        method: 'POST',
        url:'/api/authentication/login',
        handler: authentication.login
    },
    {
        method: 'POST',
        url:'/api/authentication/register',
        handler: authentication.register
    },
    {
      method: 'POST',
         url:'/api/authentication/update',
         handler: authentication.update
    }
]

module.exports=routes