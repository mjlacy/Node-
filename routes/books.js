const express = require('express');
const router = express.Router();

const Book = require("../models/book");

router.get("/", (req, res) => {
    Book.find({}, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
});

router.post("/", (req, res) => {
    let book = new Book(req.body);
    book.save(function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
});

router.get("/:bookId", (req, res) => {
    Book.findById(req.params.bookId, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
});

router.put("/:bookId", (req, res) => {
    Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {upsert: true}, function(err, book) {
        if (err)
            res.send(err);
        res.json(req.body);
    });
});

router.delete("/:bookId", (req, res) => {
    Book.remove({
        _id: req.params.bookId
    }, function(err, book) {
        if (err)
            res.send(err);
        res.json({ message: 'Book successfully deleted' });
    });
});

module.exports = router;