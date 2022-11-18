const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookTitle: {
        type: String,
        required: [true, "Please Provide Book Name"]
    },
    Isbn: {
        type: String,
        required: [true, "Please Provide ISBN Number"]
    },
    PublishYear: {
        type: String,
        required: [true, "Please Provide Publish Date"]
    },
    CoverPrice:{
        type: Number,
        required: [true, "Please Provide Cover Prices"]
    },
    checkIn: {
        type: Boolean,
    },

}, {
    timestamps: true,
})


module.exports = mongoose.model("Books", bookSchema)