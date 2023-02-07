const mongoose = require("mongoose");
const Joi = require("joi");

const UsersSchema = mongoose.Schema({
    user_id:String,
    first_name:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});

module.exports.Users = mongoose.model("Users", UsersSchema);

const validate = (data) => {
    const schema = Joi.object({
        first_name:Joi.string().required().label("first_name"),
        last_name:Joi.string().required().label("last_name"),
        phone_number:Joi.number().required().label("phone_number"),
        isAdmin:Joi.boolean()
    });

    return schema.validate(data);

}

module.exports.validate = validate;