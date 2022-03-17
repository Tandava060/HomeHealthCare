//const boom = require('boom');
const bcrypt = require('bcrypt');
const common = require('./common');

//Get data models
const User= require("../models/user");

exports.login=async(request,reply)=> {
    try{
        if (await common.secure(request.headers['x-api-key']) == true) {
            if (request.body.username && request.body.hash){
                const user_record = await User.findOne({
                    name: request.body.username
                });
                console.log(user_record)
                if (bcrypt.compareSync(request.body.hash, user_record.hash)) {
                    const {
                        hash,
                        __v,
                        ...user
                    } = user_record._doc;

                    const token = bcrypt.hashSync(request.body.hash, 10) + String(Date.now());

                    const updatedUser = await User.findOneAndUpdate({
                        name: request.body.name
                    }, {
                        $set: {
                            token: token
                        }
                    });
                    user.token = token;

                    return await common.respond(user);
                }else{
                    return await common.error("Invalid login");
                }

            } else{
                return await common.error("Empty fields");
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

exports.register=async(request,reply)=> {
    try{
        if (await common.secure(request.headers['x-api-key']) == true) {
            if (request.body.username && request.body.hash){
                const now=Date.now();
                const hashed=bcrypt.hashSync(request.body.hash,10);
                const token = hashed + String(now);
                const newUser = {
                    ID: await common.generateNextUserId(),
                    hash: hashed,
                    name: request.body.username,
                    token: token,
                    perms: "admin",
                    status: true,
                    created_on: now
                }
               
                console.log(newUser.token);
                const user= new User(newUser);
                const created= await user.save();

                const {
                    hash,
                    ...response
                }= newUser

                return await common.respond(response);

            } else{
                return await common.error("Invalid request");
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

// Update User
exports.update = async(req, reply) => {
    try {

        if (await common.auth(req.body.token) == true && await common.secure(req.headers['x-api-key']) == true) {
           
            updates = {}

            if (req.body.username) updates.name = req.body.username;
            if (req.body.status) updates.status = req.body.status;
            if (req.body.perms) updates.perms = req.body.perms;


            const update = await User.findOneAndUpdate({
                token: req.body.token
            }, {
                $set: updates
            });
                
            return await common.respond("Success");
        } else {
            return await common.error("Invalid request");
        }

    } catch (err) {
        console.log(err);
        return await common.error(err);
    }
}
