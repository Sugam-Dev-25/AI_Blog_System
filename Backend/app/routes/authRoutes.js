const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User profile",
    user: req.user,
  });
});
router.get(
  "/admin-test",
  authMiddleware.verifyToken,
  roleMiddleware.authorize("admin"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Admin Access Granted",
    });
  },
);

module.exports = router;
