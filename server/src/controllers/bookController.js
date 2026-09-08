const Book = require('../models/Book')

// @route  GET /api/books
// Supports ?category=Fiction&search=react&sort=price-asc
const getBooks = async (req, res, next) => {
  try {
    const { category, search, sort } = req.query
    const filter = {}

    if (category && category !== 'All') {
      filter.category = category
    }
    if (search) {
      const re = new RegExp(search, 'i')
      filter.$or = [{ title: re }, { author: re }, { category: re }]
    }

    let query = Book.find(filter)

    switch (sort) {
      case 'price-asc':
        query = query.sort({ price: 1 })
        break
      case 'price-desc':
        query = query.sort({ price: -1 })
        break
      case 'rating':
        query = query.sort({ rating: -1 })
        break
      case 'name':
        query = query.sort({ title: 1 })
        break
      default:
        query = query.sort({ createdAt: 1 })
    }

    const books = await query.exec()
    res.json(books)
  } catch (err) {
    next(err)
  }
}

// @route  GET /api/books/:id
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (err) {
    next(err)
  }
}

// @route  POST /api/books   (protected — "Sell Your Book")
const createBook = async (req, res, next) => {
  try {
    const { title, author, price, category, description, rating, bg } = req.body

    if (!title || !author || price === undefined || !category) {
      return res.status(400).json({ message: 'title, author, price and category are required' })
    }

    const book = await Book.create({
      title,
      author,
      price,
      category,
      description,
      rating: rating || 0,
      bg: bg || '#eaf4fb',
      seller: req.user._id,
    })

    res.status(201).json(book)
  } catch (err) {
    next(err)
  }
}

// @route  GET /api/books/mine   (protected — books the logged-in user has listed)
const getMyBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ seller: req.user._id }).sort({ createdAt: -1 })
    res.json(books)
  } catch (err) {
    next(err)
  }
}

// @route  DELETE /api/books/:id   (protected — only the seller can remove their listing)
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })

    if (!book.seller || book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only remove books you listed yourself' })
    }

    await book.deleteOne()
    res.json({ message: 'Book removed' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getBooks, getBookById, createBook, getMyBooks, deleteBook }
