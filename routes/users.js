const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");
const middleware = require("../middleware/authentication");

router.post("/user", controllers.register);
router.post("/login", controllers.login);
router.delete("/logout", middleware.verifyToken, controllers.logout);

module.exports = router;
