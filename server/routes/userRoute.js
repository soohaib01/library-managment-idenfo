const express = require('express');
const router = express.Router();
const {registerUser,loginUser,checkInBooks,checkOutBooks,getMe} = require('../controllers/userController')



router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/checkinBooks/:id", checkInBooks)
router.post("/checkoutBooks/:id", checkOutBooks)
router.get("/getMe/:id",getMe)



module.exports = router;