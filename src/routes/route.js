const express = require('express')
const router = express.Router()

const bookController=require("../Controllers/bookController")

router.post("/book", bookController.createBook)

router.get("/book", bookController.getAllbooks)

router.get("/book/:bookId", bookController.getbookByParams)

router.put("/book/:bookId", bookController.updateBook)

router.delete("/book/:bookId", bookController.deleteBook)




module.exports = router