const express = require('express');
const router = express.Router();
const {getAllBooks,createNewBook,findABook} = require('../controllers/booksController')

router.get("/", getAllBooks)
router.post("/create", createNewBook)
router.get("/:id", findABook)

module.exports = router;