import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import '../../../src/style.css'
import { useCart } from '../Shop/CartContext.jsx'
import * as booksApi from '../../api/books'

const CATEGORIES = ['All', 'Fiction', 'Mystery', 'Sci-Fi', 'Cooking', 'Technology', 'Self-Help']

const CATEGORY_ICONS = {
  All:         '📚',
  Fiction:     '📖',
  Mystery:     '🔍',
  'Sci-Fi':    '🚀',
  Cooking:     '🍳',
  Technology:  '💻',
  'Self-Help': '🌟',
}

const StarRating = ({ rating }) => (
  <div className='bs_stars'>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`bs_star ${
          rating >= star ? 'bs_star--full' : rating >= star - 0.5 ? 'bs_star--half' : 'bs_star--empty'
        }`}
      >★</span>
    ))}
  </div>
)

const BookCard = ({ book }) => {
  const { addToCart, cartItems } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = cartItems.some((i) => i.id === book.id)

  const handleAdd = () => {
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className='bs_card h-100 d-flex flex-column'>
      <div className='bs_card--cover' style={{ backgroundColor: book.bg }}>
        <span className='bs_card--placeholder-icon'>📖</span>
        <span className='bs_card--price'>USD {book.price.toFixed(2)}</span>
      </div>
      <div className='bs_card--body flex-grow-1'>
        <h5 className='bs_card--title'>{book.title}</h5>
        <div className='bs_card--meta d-flex align-items-center flex-wrap'>
          <span className='bs_card--author'>{book.author}</span>
          <span className='bs_card--dot mx-1'>•</span>
          <StarRating rating={book.rating} />
        </div>
        <p className='bs_card--desc'>{book.description}</p>
      </div>
      <div className='bs_card--footer mt-auto'>
        <button
          className={`bs_card--btn w-100 ${added ? 'bs_card--btn--added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Added!' : inCart ? '🛒 Add More' : '🛒 Add To Cart'}
        </button>
      </div>
    </div>
  )
}

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Debounce search + refetch whenever filters change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true)
      setError('')
      booksApi
        .getBooks({ category: activeCategory, search, sort })
        .then(setBooks)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timeout)
  }, [activeCategory, search, sort])

  return (
    <section className='exp_page'>

      <div className='exp_hero'>
        <Container fluid className='exp_hero--container'>
          <p className='exp_hero--eyebrow'>Explore Our Collection</p>
          <h1 className='exp_hero--heading'>Find Your Next Favourite Book</h1>
          <p className='exp_hero--sub'>Browse our full catalog across {CATEGORIES.length - 1} categories</p>
          <div className='exp_search'>
            <span className='exp_search--icon'>🔍</span>
            <input
              type='text'
              className='exp_search--input'
              placeholder='Search by title, author or genre…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className='exp_search--clear' onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </Container>
      </div>

      <div className='exp_cats'>
        <Container fluid className='exp_cats--container'>
          <div className='exp_cats--row'>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`exp_cat--btn ${activeCategory === cat ? 'exp_cat--btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span className='exp_cat--icon'>{CATEGORY_ICONS[cat]}</span>
                <span className='exp_cat--label'>{cat}</span>
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container fluid className='exp_results--bar'>
        <span className='exp_results--count'>
          {!loading && `${books.length} book${books.length !== 1 ? 's' : ''} found`}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {search ? ` for "${search}"` : ''}
        </span>
        <div className='exp_sort'>
          <label className='exp_sort--label' htmlFor='exp-sort'>Sort by:</label>
          <select
            id='exp-sort'
            className='exp_sort--select'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value='default'>Default</option>
            <option value='price-asc'>Price: Low → High</option>
            <option value='price-desc'>Price: High → Low</option>
            <option value='rating'>Top Rated</option>
            <option value='name'>A → Z</option>
          </select>
        </div>
      </Container>

      <Container fluid className='exp_grid--container'>
        {error && (
          <Alert variant='danger'>
            Couldn't load books: {error}. Is the backend server running at the configured API URL?
          </Alert>
        )}

        {loading ? (
          <div className='text-center py-5'>
            <Spinner animation='border' role='status' />
          </div>
        ) : books.length > 0 ? (
          <Row className='g-3'>
            {books.map((book) => (
              <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        ) : (
          !error && (
            <div className='exp_empty'>
              <span className='exp_empty--icon'>📭</span>
              <h3 className='exp_empty--heading'>No books found</h3>
              <p className='exp_empty--text'>Try a different category or search term.</p>
              <button
                className='exp_empty--btn'
                onClick={() => { setSearch(''); setActiveCategory('All') }}
              >
                Clear filters
              </button>
            </div>
          )
        )}
      </Container>

    </section>
  )
}

export default Explore
