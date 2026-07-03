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
    roleMiddleware.authorize("admin"),
    BlogController.getPendingBlogs,
    

);

router.put(
    "/publish-blog/:id",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    BlogController.publishBlog,
    
);

router.put(
    "/reject-blog/:id",
    authMiddleware.verifyToken,
    roleMiddleware.authorize("admin"),
    BlogController.rejectBlog,
    
);

router.get(
    "/",
    BlogController.getPublishedBlogs
);  

router.get(
    "/:slug",
    BlogController.getSingleBlog
);

module.exports = router; 