const { HttpError, ctrlWrapper } = require("../helpers");

const { Medicines } = require("../models/medicines");

const getAllMedicines = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Medicines.find({}, "", {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Medicines.findOne({ _id: id });
  const result = await Medicines.findById(id).populate("availablePharmacies");

  // const result = await Medicines.findById(id);

  if (!result) {
    throw HttpError(404, "Medicines not found");
  }
  res.json(result);
};

const addMedicines = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Medicines.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Medicines.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Medicines not found");
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Medicines.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Medicines not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteMedicines = await Medicines.findByIdAndDelete(id);
  if (!deleteMedicines) {
    throw HttpError(404, "Medicines not found");
  }
  res.json({ message: "Medicines deleted" });
};

module.exports = {
  getAllMedicines: ctrlWrapper(getAllMedicines),
  getById: ctrlWrapper(getById),
  addMedicines: ctrlWrapper(addMedicines),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteById: ctrlWrapper(deleteById),
};
