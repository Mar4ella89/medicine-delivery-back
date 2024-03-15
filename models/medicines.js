const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { hadleMongooseError } = require("../helpers");

const medicinesSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
});

medicinesSchema.post("save", hadleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  // email: Joi.string()
  //   .email({
  //     minDomainSegments: 2,
  //   })
  //   .required()
  //   .messages({
  //     "any.required": `"email" is required`,
  //     "string.empty": `"email" cannot be empty`,
  //   }),
  // phone: Joi.string().required().messages({
  //   "any.required": `"phone" is required`,
  //   "string.empty": `"phone" cannot be empty`,
  // }),
  // favorite: Joi.boolean(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "any.required": `"favorite status" is required`,
//   }),
// });

const schemas = {
  addSchema,
  // updateFavoriteSchema,
};

const Medicines = model("medicines", medicinesSchema);

module.exports = { Medicines, schemas };
