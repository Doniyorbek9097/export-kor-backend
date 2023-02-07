const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema({
    images:[String],
    name:String,
    discription:String,
    category:String,
    price:String,
    bucket_size:String,
    digging_depth:String,
    mass:String,
    advance_payment:String

});

module,exports.Products  = mongoose.model("Products", Schema);

const validate = (data) => {
    const schema = Joi.object({
        name:Joi.string().required().label("name"),
        discription:Joi.string().required().label("discription"),
        price:Joi.string().required().label("price"),
        category:Joi.string().required().label("category"),
        bucket_size:Joi.string().label("backet_size"),
        digging_depth:Joi.string(),
        mass:Joi.string(),
        advance_payment:Joi.string()
    })

return schema.validate(data);

};

module.exports.validate = validate;

