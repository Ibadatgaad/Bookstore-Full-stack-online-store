const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstore'

  try {
    await mongoose.connect(uri)
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.error(
      '   Make sure MongoDB is installed and running locally (e.g. `mongod` or `brew services start mongodb-community`),\n' +
      '   and that MONGODB_URI in server/.env points to it.'
    )
    process.exit(1)
  }
}

module.exports = connectDB
