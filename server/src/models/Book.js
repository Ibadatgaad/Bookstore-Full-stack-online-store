const mongoose = require('mongoose')

const CATEGORIES = ['Fiction', 'Mystery', 'Sci-Fi', 'Cooking', 'Technology', 'Self-Help']

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    category: { type: String, required: true, enum: CATEGORIES },
    description: { type: String, default: '' },
    bg: { type: String, default: '#eaf4fb' }, // placeholder cover color used by the front end
    // The user who listed this book via "Sell Your Book". Null for the original seeded catalog.
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
)

bookSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString() // front end expects `id`, not `_id`
    delete ret._id
    delete ret.__v
    return ret
  },
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.CATEGORIES = CATEGORIES
