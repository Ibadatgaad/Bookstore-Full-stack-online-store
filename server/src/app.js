const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',') }))
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

// ── Routes ───────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)

// ── Error handling (must be last) ───────────────────────────
app.use(notFound)
app.use(errorHandler)

module.exports = app
