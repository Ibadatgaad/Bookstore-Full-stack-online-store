const express = require('express')
const {
  getBooks,
  getBookById,
  createBook,
  getMyBooks,
  deleteBook,
} = require('../controllers/bookController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.get('/', getBooks)
router.get('/mine', protect, getMyBooks) // must come before /:id
router.post('/', protect, createBook)
router.get('/:id', getBookById)
router.delete('/:id', protect, deleteBook)

module.exports = router
