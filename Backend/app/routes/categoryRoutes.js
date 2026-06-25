const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
    "/create-category",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    CategoryController.createCategory
);

router.get(
    "/get-all-categories",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    CategoryController.getAllCategories
);

router.put(
    "/update-category/:id",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    CategoryController.updateCategory
);

router.delete(
    "/delete-category/:id",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    CategoryController.deleteCategory
);

module.exports = router;