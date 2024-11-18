const express = require("express");
const router = express.Router();
const controllers = require("../controllers/ToDo");
const middleware = require("../middleware/authentication");

router.get("/unfinished", middleware.verifyToken, controllers.getAllUnFinish);

// Update destination to finished
router.put(
  "/updatetofinished/:id_results",
  middleware.verifyToken,
  controllers.updateToFinished
);

// Get list of finished destinations
router.get("/finished", middleware.verifyToken, controllers.getfinishhistory);

module.exports = router;
