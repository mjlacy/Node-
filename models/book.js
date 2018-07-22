'use strict';
const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    BookId: Number,
    Name: String,
    Author: String,
    Year: Number
},
{
    versionKey: false
});

module.exports = mongoose.model('Book', BookSchema);