const express = require("express");

const ctrl = require("../../controllers/drugs-controllers");

const { isValidId } = require("../../middlewares");
const { schemas } = require("../../models/drugs");

const router = express.Router();

router.get("/", ctrl.getAllDrugs);

router.get("/:id", isValidId, ctrl.getById);

// router.post(
//   "/",
//   authenticate,
//   validateBody(schemas.addSchema),
//   ctrl.addContact
// );

// router.put(
//   "/:id",
//   authenticate,
//   isValidId,
//   validateBody(schemas.addSchema),
//   ctrl.updateById
// );

// router.patch(
//   "/:id/favorite",
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavoriteById
// );

// router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
