const express = require("express");

const ctrl = require("../../controllers/drugs-controllers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllDrugs);

router.get("/:id", isValidId, ctrl.getById);

module.exports = router;
