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
        method: 'GET',
        url:'/api/contactForm/viewOne/:id',
        handler: contactForm.getOne
    },

    {
        method: 'POST',
        url:'/api/contactForm/delete',
        handler: contactForm.delete
    }
]


module.exports=routes