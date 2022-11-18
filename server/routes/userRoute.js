const express = require('express');
const router = express.Router();
const {registerUser,loginUser,checkInBooks} = require('../controllers/userController')

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/checkinBooks/:id", checkInBooks)


module.exports = router;