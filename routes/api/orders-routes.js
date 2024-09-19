const express = require("express");

const ctrl = require("../../controllers/orders-controllers");

const { isValidId } = require("../../middlewares");
const { schemas } = require("../../models/orders");

const router = express.Router();

router.get("/", ctrl.getAllOrders);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addOrder);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
