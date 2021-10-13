const common = require('./common');
const Cforms= require("../models/contactForm");
const cforms= require("../models/contactForm");

exports.sendContactForm=async(request,reply)=> {
    try{
        if (await common.secure(request.headers['x-api-key']) == true) {
            
            if (request.body.name && request.body.email && request.body.title && request.body.content){
                const now=Date.now();
                const newContactForm = {
                    ID: await common.generateNextFormId(),
                    name: request.body.name,
                    email: request.body.email,
                    title: request.body.title,
                    content: request.body.content,
                    sent_on: now
                }
                
                const cforms= new Cforms(newContactForm);
                const created= await cforms.save();

                return await common.respond(newContactForm);

            }
            else{
                return await common.error("error sending form");
            }
            
        } else{
            return await common.error("Invalid request");
        }
    }catch(err){
        console.log(err);
        // throw boom.boomify(err);
        return await common.error(err);
    }
}

exports.viewContactForm=async(request, reply)=>{
    try{
        if (await common.secure(request.headers['x-api-key']) == true) {
            const allForms = await Cforms.find({
            });
            
            finalresponse = common.trimMongo(allForms);
            
            return await common.respond(finalresponse);
            
        } else{
            return await common.error("Invalid request");
        }
    }
    catch(err){
        console.log(err);
        // throw boom.boomify(err);
        return await common.error(err);
    }
}

exports.searchContactForm=async(request,reply)=> {
    try{
        if (await common.secure(request.headers['x-api-key']) == true) {
                
            if (request.body.name){
                const currentForm = await Cforms.findOne({
                    name: request.body.name
                });

                const currentContactForm = {
                    name: currentForm.name,
                    email: currentForm.email,
                    title: currentForm.title,
                    content: currentForm.content,
                    sent_on: currentForm.sent_on
                } 
                return await common.respond(currentContactForm);
            }
            else{
                return await common.error("please fill");
            }
            
        } else{
            return await common.error("Invalid request");
        }
    }catch(err){
        console.log(err);
        // throw boom.boomify(err);
        return await common.error(err);
    }
}