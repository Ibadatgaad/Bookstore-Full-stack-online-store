const express = require('express')
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/mine', protect, getMyOrders) // must come before /:id
router.get('/:id', protect, getOrderById)

module.exports = router
