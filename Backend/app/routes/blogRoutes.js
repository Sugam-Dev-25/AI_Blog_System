const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/BlogController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
    "/create-blog",
    authMiddleware.verifyToken,
    BlogController.createBlog
);
router.get(
    "/my-blogs",
    authMiddleware.verifyToken,
    BlogController.getMyBlogs
);

router.put(
    "/update-blog/:id",
    authMiddleware.verifyToken,
    BlogController.updateBlog
);

router.delete(
    "/delete-blog/:id",
    authMiddleware.verifyToken,
    BlogController.deleteBlog
);

router.put(
    "/submit-for-review/:id",
    authMiddleware.verifyToken,
    BlogController.submitForReview
);

router.get(
    "/pending-blogs",
    authMiddleware.verifyToken,
    BlogController.getPendingBlogs,
    roleMiddleware.authorize("admin"),

);

router.put(
    "/publish-blog/:id",
    authMiddleware.verifyToken,
    BlogController.publishBlog,
    roleMiddleware.authorize("admin"),
);

module.exports = router; 