const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const { hadleMongooseError } = require("../helpers");

const medicinesSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  availablePharmacies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Drugs" }],
});

medicinesSchema.post("save", hadleMongooseError);
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  price: Joi.number().required().messages({
    "any.required": `"price" is required`,
    "number.base": `"price" must be a number`,
  }),
  imageUrl: Joi.string().required().messages({
    "any.required": `"imageUrl" is required`,
    "string.empty": `"imageUrl" cannot be empty`,
    "string.base": `"imageUrl" must be string`,
  }),
  availablePharmacies: Joi.array().items(Joi.string()).required().messages({
    "any.required": `"availablePharmacies" is required`,
    "array.base": `"availablePharmacies" must be an array`,
  }),
});

const schemas = {
  addSchema,
};

const Medicines = model("medicines", medicinesSchema);

module.exports = { Medicines, schemas };
