const { HttpError, ctrlWrapper } = require("../helpers");

const { Order } = require("../models/orders");

const getAllOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await orders.find({}, "", {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const order = await Contact.findById(id);
  if (!order) {
    throw HttpError(404, "Contact not found");
  }
  res.json(order);
};

const addOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Order.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Order.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Order not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteOrders = await Order.findByIdAndDelete(id);
  if (!deleteOrders) {
    throw HttpError(404, "Order not found");
  }
  res.json({ message: "Order deleted" });
};

module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  getById: ctrlWrapper(getById),
  addOrder: ctrlWrapper(addOrder),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
