const asyncHandler = require("express-async-handler")
const Books = require("../models/bookModel")
const Checkout = require("../models/checkoutModel")
const checkoutHistory = asyncHandler(async (req,res) => {
   const bookID = req.params.id
   const bookCheckout = await Books.findOne({bookID})
   const {UserID,name,mobile,nationalId} = req.body
   if(bookCheckout){
   const newCheckOutCreated = await Checkout.create({
    User: UserID,
    Username: name,
    Mobile: mobile,
    NationalID: nationalId,
    BookId: req.params.id,
   })
   if(newCheckOutCreated){
    res.send(newCheckOutCreated)
    console.log(newCheckOutCreated)
   }
   }
   else{
    res.send("Book Not Found")
    console.log(newCheckOutCreated)
   }
})


module.exports = {
    checkoutHistory
}