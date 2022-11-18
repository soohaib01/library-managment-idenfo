const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModel");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find();
  res.send(books);
});

const createNewBook = asyncHandler(async (req, res) => {
  if (!req.body.bookTitle) {
    res.status(400).json("Please Fulfil Requirements");
  }
  const newBook = await Books.create({
    bookTitle: req.body.bookTitle,
    Isbn: req.body.Isbn,
    PublishYear: req.body.PublishYear,
    CoverPrice: req.body.CoverPrice,
    checkIn: req.body.checkIn,
  });
  if (newBook) {
    res.send(newBook);
  } else {
    res.send("Not Created");
  }
});

const findABook = asyncHandler(async (req,res)=>{
     const bookDetail = await Books.findById(req.params.id)
     res.send(bookDetail)
})

module.exports = {
  getAllBooks,
  createNewBook,
  findABook
};
