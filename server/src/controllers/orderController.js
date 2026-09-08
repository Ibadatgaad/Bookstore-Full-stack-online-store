const Order = require('../models/Order')
const Book = require('../models/Book')

const FREE_SHIPPING_THRESHOLD = 499
const SHIPPING_COST = 80

// @route  POST /api/orders   (protected — "Proceed to Checkout")
// body: { items: [{ bookId, qty }], shippingAddress: {...} }
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' })
    }
    const requiredAddrFields = ['fullName', 'addressLine', 'city', 'postalCode', 'phone']
    const missing = requiredAddrFields.filter((f) => !shippingAddress || !shippingAddress[f])
    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing shipping address field(s): ${missing.join(', ')}` })
    }

    // Re-fetch each book server-side so prices can't be tampered with client-side
    const orderItems = []
    for (const { bookId, qty } of items) {
      if (!bookId || !qty || qty < 1) {
        return res.status(400).json({ message: 'Each item needs a valid bookId and qty >= 1' })
      }
      const book = await Book.findById(bookId)
      if (!book) {
        return res.status(404).json({ message: `Book not found: ${bookId}` })
      }
      orderItems.push({ book: book._id, title: book.title, price: book.price, qty })
    }

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
    const total = subtotal + shipping

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      shipping,
      total,
      shippingAddress,
    })

    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

// @route  GET /api/orders/mine   (protected)
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

// @route  GET /api/orders/:id   (protected — only the owner can view it)
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' })
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
}

module.exports = { createOrder, getMyOrders, getOrderById }
