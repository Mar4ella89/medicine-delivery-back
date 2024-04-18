const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { hadleMongooseError } = require("../helpers");

const drugsSchema = new Schema({
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

drugsSchema.post("save", hadleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),

  // favorite: Joi.boolean(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "any.required": `"favorite status" is required`,
//   }),
// });

const schemas = {
  addSchema,
};

const Drugs = model("drugs", drugsSchema);

module.exports = { Drugs, schemas };
