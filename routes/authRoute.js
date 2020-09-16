const { Router } = require("express");
const router = Router();
const {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout_get,
} = require("../controllers/authController");

router.get("/signup", signup_get);
router.post("/signup", signup_post);
router.get("/login", login_get);
router.post("/login", login_post);
router.get("/logout", logout_get);

module.exports = router;
