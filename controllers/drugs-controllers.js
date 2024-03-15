const { HttpError, ctrlWrapper } = require("../helpers");

const { Drugs } = require("../models/drugs");

const getAllDrugs = async (req, res) => {
  const { _id } = req.drugs;
  const { page = 1, limit = 10 } = req.query;
  const { favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const result = await Drugs.find(
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Drugs.findOne({ _id: id });
  const result = await Drugs.findById(id);

  if (!result) {
    throw HttpError(404, "Drugs not found");
  }
  res.json(result);
};

const addDrugs = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Drugs.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Drugs.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Drugs not found");
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Drugs.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Drugs not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteDrugs = await Drugs.findByIdAndDelete(id);
  if (!deleteDrugs) {
    throw HttpError(404, "Drugs not found");
  }
  res.json({ message: "Drugs deleted" });
};

module.exports = {
  getAllDrugs: ctrlWrapper(getAllDrugs),
  getById: ctrlWrapper(getById),
  addDrugs: ctrlWrapper(addDrugs),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteById: ctrlWrapper(deleteById),
};
