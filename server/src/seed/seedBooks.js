// Loads the original hardcoded catalog (from the old Explore.jsx) into MongoDB.
// Run with: npm run seed   (from the /server folder)
require('dotenv').config()
const connectDB = require('../config/db')
const Book = require('../models/Book')
const mongoose = require('mongoose')

const books = [
  { title: 'The Silent Forest', author: 'David Kim', price: 11.25, rating: 5, category: 'Fiction', description: 'A breathtaking journey through an ancient, enchanted forest.', bg: '#e9f7ef' },
  { title: 'Shadows of Doubt', author: 'Emma Watson', price: 13.99, rating: 3, category: 'Fiction', description: 'A detective novel filled with twists and unexpected turns.', bg: '#d5d8dc' },
  { title: 'Echoes of Time', author: 'Michael Brown', price: 17.50, rating: 4, category: 'Fiction', description: 'A historical tale of secrets buried deep in time.', bg: '#eaf4fb' },
  { title: 'The Lost Expedition', author: 'Tom Hardy', price: 18.25, rating: 4.5, category: 'Fiction', description: "An adventurer's perilous quest in the Amazon jungle.", bg: '#fdf2e9' },
  { title: 'Mystery of the Lost Island', author: 'Jane Smith', price: 14.99, rating: 2.5, category: 'Mystery', description: 'A gripping mystery novel that keeps you guessing till the end.', bg: '#fdebd0' },
  { title: 'The Vanishing Hour', author: 'Clara Hunt', price: 12.50, rating: 4, category: 'Mystery', description: 'A clock ticks, a town disappears, a detective races the dark.', bg: '#f9ebea' },
  { title: 'Cold Case Files', author: 'Ryan Blake', price: 16.00, rating: 3.5, category: 'Mystery', description: 'Unsolved crimes revisited by a tenacious investigator.', bg: '#eaf7fb' },
  { title: 'Beyond the Stars', author: 'Neil Carter', price: 22.00, rating: 4, category: 'Sci-Fi', description: "A futuristic saga of humanity's journey across the galaxy.", bg: '#d6eaf8' },
  { title: 'Quantum Secrets', author: 'Sarah Lee', price: 24.99, rating: 4.5, category: 'Sci-Fi', description: 'A sci-fi thriller exploring the mysteries of quantum physics.', bg: '#e8daef' },
  { title: 'The Last Algorithm', author: 'Zara Ahmed', price: 19.99, rating: 5, category: 'Sci-Fi', description: 'An AI achieves consciousness and must choose its own fate.', bg: '#d5f5e3' },
  { title: 'Cooking Made Easy', author: 'Emily Clark', price: 9.99, rating: 4, category: 'Cooking', description: 'Simple and delicious recipes for everyday cooking.', bg: '#fef9e7' },
  { title: 'Taste of Italy', author: 'Gina Rossi', price: 15.75, rating: 3.5, category: 'Cooking', description: 'Authentic Italian recipes to bring the flavors of Italy home.', bg: '#fdedec' },
  { title: 'The Spice Route', author: 'Priya Sharma', price: 13.00, rating: 5, category: 'Cooking', description: 'A fragrant tour of South Asian cooking traditions.', bg: '#fdf2e9' },
  { title: 'Learning React', author: 'Alex Johnson', price: 29.99, rating: 4.5, category: 'Technology', description: 'A comprehensive guide to mastering React.js.', bg: '#eaf7fb' },
  { title: 'Python for Beginners', author: 'Laura Evans', price: 26.50, rating: 4, category: 'Technology', description: 'A beginner-friendly guide to mastering Python programming.', bg: '#e8f8f5' },
  { title: 'Clean Code', author: 'Robert Martin', price: 32.00, rating: 5, category: 'Technology', description: 'Principles and patterns for writing maintainable software.', bg: '#eaf4fb' },
  { title: 'Atomic Habits', author: 'James Clear', price: 19.99, rating: 5, category: 'Self-Help', description: 'Tiny changes, remarkable results — a guide to building good habits.', bg: '#eaf7fb' },
  { title: 'The Art of War', author: 'Sun Tzu', price: 8.99, rating: 5, category: 'Self-Help', description: 'An ancient treatise on strategy, leadership and discipline.', bg: '#f9ebea' },
  { title: 'Deep Work', author: 'Cal Newport', price: 17.00, rating: 4.5, category: 'Self-Help', description: 'Rules for focused success in a distracted world.', bg: '#e9f7ef' },
]

const run = async () => {
  await connectDB()
  const count = await Book.countDocuments()
  if (count > 0) {
    console.log(`Books collection already has ${count} document(s). Skipping seed.`)
    console.log('(Delete the collection first if you want to reseed from scratch.)')
  } else {
    await Book.insertMany(books)
    console.log(`✅ Seeded ${books.length} books into MongoDB.`)
  }
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
