const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const { hadleMongooseError } = require("../helpers");

const ordersSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  availablePharmacies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Drugs" }],
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
    .valid("standard", "express")
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
  medicineId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "any.required": `"medicineId" is required`,
      "string.empty": `"medicineId" cannot be empty`,
      "string.guid": `"medicineId" must be a valid UUID`,
    }),
});

const schemas = {
  addSchema,
};

const orders = model("orders", ordersSchema);

module.exports = { orders, schemas };
