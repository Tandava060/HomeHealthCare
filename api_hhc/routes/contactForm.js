const contactForm = require('../controllers/contactForm')

const routes = [
    {
        method: 'POST',
        url:'/api/contactForm/sendContactForm',
        handler: contactForm.sendContactForm
    },
    {
        method: 'GET',
        url:'/api/contactForm/viewContactForm',
        handler: contactForm.viewContactForm
    },
    {
        method: 'POST',
        url:'/api/contactForm/searchContactForm',
        handler: contactForm.searchContactForm
    }
]

module.exports=routes