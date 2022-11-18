const express = require('express');
const router = express.Router();
const {checkoutHistory} = require("../controllers/checkoutController")


router.post("/:id", checkoutHistory)



module.exports = router;