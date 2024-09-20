const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const { hadleMongooseError } = require("../helpers");

const ordersSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    address: { type: String, required: true },
  },
  order: {
    items: [
      {
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
      },
    ],
    totalOrderPrice: { type: Number, required: true },
  },
});

// name
// lastName
// email
// phone
// deliveryMethod
// address
// quantity
// totalPrice
// medicine
// id

ordersSchema.post("save", hadleMongooseError);
const addSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "any.required": `"name" is required`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`,
    }),
    lastName: Joi.string().min(3).max(30).required().messages({
      "any.required": `"name" is required`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`,
    }),
    email: Joi.string().email().required().messages({
      "any.required": `"email" is required`,
      "string.empty": `"email" cannot be empty`,
      "string.email": `"email" must be a valid email`,
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,14}$/)
      .required()
      .messages({
        "any.required": `"phone" is required`,
        "string.empty": `"phone" cannot be empty`,
        "string.pattern.base": `"phone" must be a valid phone number`,
      }),
    deliveryMethod: Joi.string()
      .valid("Pick up from store", "Delivery to address", "New Post")
      .required()
      .messages({
        "any.required": `"deliveryMethod" is required`,
        "string.empty": `"deliveryMethod" cannot be empty`,
        "any.only": `"deliveryMethod" must be either 'standard' or 'express'`,
      }),
    address: Joi.string().min(5).max(100).required().messages({
      "any.required": `"address" is required`,
      "string.empty": `"address" cannot be empty`,
      "string.base": `"address" must be string`,
    }),
  }).required(),
  order: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          quantity: Joi.number().integer().min(1).required().messages({
            "any.required": `"quantity" is required`,
            "number.base": `"quantity" must be a number`,
            "number.integer": `"quantity" must be an integer`,
            "number.min": `"quantity" must be at least 1`,
          }),
          totalPrice: Joi.number().min(0).required().messages({
            "any.required": `"totalPrice" is required`,
            "number.base": `"totalPrice" must be a number`,
            "number.min": `"totalPrice" must be at least 0`,
          }),
          medicineId: Joi.string().required().messages({
            "any.required": `"medicineId" is required`,
            "string.empty": `"medicineId" cannot be empty`,
          }),
        })
      )
      .required(),
    totalOrderPrice: Joi.number().min(0).required(),
  }).required(),
});

const schemas = {
  addSchema,
};

const Order = model("order", ordersSchema);

module.exports = { Order, schemas };
