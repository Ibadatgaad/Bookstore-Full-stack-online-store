import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap'
import { useCart } from '../Shop/CartContext.jsx'
import * as booksApi from '../../api/books'

const chunkArray = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
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
        {book.image
          ? <img src={book.image} alt={book.title} className='bs_card--img' />
          : <span className='bs_card--placeholder-icon'>📖</span>
        }
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

const BestSellers = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    booksApi
      .getBooks({ sort: 'rating' })
      .then((data) => setBooks(data.slice(0, 8)))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false))
  }, [])

  const slides = chunkArray(books, 4)

  if (loading) {
    return (
      <section className='bs_section'>
        <Container fluid className='bs_container text-center py-4'>
          <h2 className='bs_heading'>Best Seller Books</h2>
          <Spinner animation='border' role='status' />
        </Container>
      </section>
    )
  }

  if (books.length === 0) return null

  return (
    <section className='bs_section'>
      <Container fluid className='bs_container'>
        <h2 className='bs_heading'>Best Seller Books</h2>
        <div className='bs_carousel-wrapper'>
          <Carousel
            activeIndex={activeIndex}
            onSelect={(idx) => setActiveIndex(idx)}
            indicators={false}
            controls={false}
            interval={null}
          >
            {slides.map((slideBooks, slideIdx) => (
              <Carousel.Item key={slideIdx}>
                <Row className='g-3 px-2 pb-2'>
                  {slideBooks.map((book) => (
                    <Col key={book.id} xs={12} sm={6} md={3}>
                      <BookCard book={book} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className='bs_dots'>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`bs_dot ${i === activeIndex ? 'bs_dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default BestSellers