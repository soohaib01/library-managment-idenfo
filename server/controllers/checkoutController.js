const asyncHandler = require("express-async-handler")
const Books = require("../models/bookModel")
const checkoutHistory = asyncHandler(async (req,res) => {
   const bookID = req.params.id
   const bookCheckout = await Books.findOne({bookID})
   res.send(bookCheckout)
})


module.exports = {
    checkoutHistory
}