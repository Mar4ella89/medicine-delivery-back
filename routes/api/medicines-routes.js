const express = require("express");

const ctrl = require("../../controllers/medicines-controllers");

const { isValidId } = require("../../middlewares");
// const { schemas } = require("../../models/medicines");

const router = express.Router();

router.get("/", ctrl.getAllMedicines);

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
