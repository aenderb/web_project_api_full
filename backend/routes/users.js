const router = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middlewares/validation");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", celebrate(validateUserId), getUserById);
router.patch("/me", celebrate(validateUpdateProfile), updateProfile);
router.patch("/me/avatar", celebrate(validateUpdateAvatar), updateAvatar);

module.exports = router;
