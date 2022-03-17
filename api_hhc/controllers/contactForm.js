const common = require('./common');
const Cforms= require("../models/contactForm");
const cforms= require("../models/contactForm");


exports.sendContactForm=async(request,reply)=> {
    
    try{
            

            if (request.body.name && request.body.email){
                
                const now=Date.now();
                const newContactForm = {
                    ID: await common.generateNextFormId(),
                    name: request.body.name,
                    email: request.body.email,
                    phone: request.body.phone,
                    service: request.body.service,
                    description: request.body.description,
                    sent_on: now
                }
                console.log(newContactForm);
                const cforms= new Cforms(newContactForm);
                const created= await cforms.save();

                return await common.respond(newContactForm);

            }
            else{
                return await common.error("error sending form");
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
                console.log(req.body.name);
            if (request.body.name){
                const currentForm = await Cforms.findOne({
                    name: request.body.name
                });

                console.log(currentForm);

                const currentContactForm = {
                    name: currentForm.name,
                    email: currentForm.email,
                    title: currentForm.phone,
                    phone: currentForm.service,
                    description: currentForm.description,
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


exports.getOne = async (req, reply) => {
    try {
        if (await common.secure(req.headers['x-api-key']) == true) {
            var data;
           Cforms.findOne({
                ID: req.params.id
            },  data = function(err, result) {
                if (err) throw err;
                 data = result;
                 reply.send(result);
            });
          
        } else {
            return await common.error("Invalid Request");
        }
    } catch (err) {
        console.log(err);
        // throw boom.boomify(err);
        return await common.error(err);
    }
}

exports.delete = async (req, reply) => {
    try {
        if (await common.secure(req.headers['x-api-key']) == true) {
            await Cforms.findOneAndDelete({
                ID: req.body.ID
            })

            return await common.respond("Success");
        } else {
            return await common.error("Invalid Request");
        }
    } catch (err) {
        console.log(err);
        // throw boom.boomify(err);
        return await common.error(err);
    }
}