const User= require("../models/user");
const cforms = require("../models/contactForm")



exports.secure = async (apiKey) => {
    if (apiKey == "wdejfklej-dwqfdhjkqwd-dwqhdqk-q4679873fdh") {
        return true;
    }
    return false;
}


exports.respond = async (data = "error") => {
    if (data != "error") {
        json = {
            status: 1,
            response: data
        }
    } else {
        json = {
            status: 66,
            response: {
                response: "Error Occured"
            }
        }
    }
    return json;
}

exports.error = async (error) => {
    {
        json = {
            status: 69,
            response: {
                response: "Error Occured",
                error: String(error)
            }
        }
    }
    return json;
}

exports.generateNextUserId = async (error) => {
    return String(await User.countDocuments({}));
}

exports.generateNextFormId = async(error) => {
    return String(await cforms.countDocuments({}));
}

exports.trimMongo = function(allForms){
    const {
        _id,
        __v,
        ...finalForm
    } = allForms;
    
    response = {}
    for(resp in finalForm){
        const {
            _id,
            __v,
            ...singleForm
        }= finalForm[resp]._doc
        response[resp] = singleForm;
    }
    return response;
}


exports.auth = async (token) => {
    const valid = await User.countDocuments({
        token: token
    });

    if (valid == 0) {
        return false;
    } else {
        return true;
        //console.log("success");
    }
}


