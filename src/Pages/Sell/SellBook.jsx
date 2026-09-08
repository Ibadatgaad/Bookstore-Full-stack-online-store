import React, { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as booksApi from '../../api/books'

const CATEGORIES = ['Fiction', 'Mystery', 'Sci-Fi', 'Cooking', 'Technology', 'Self-Help']

const SellBook = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    category: CATEGORIES[0],
    description: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.title || !form.author || !form.price || !form.category) {
      setError('Please fill in title, author, price and category.')
      return
    }

    setSubmitting(true)
    try {
      await booksApi.createBook({
        ...form,
        price: parseFloat(form.price),
      })
      setSuccess('Your book has been listed! Redirecting to Explore…')
      setTimeout(() => navigate('/explore'), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className='py-5' style={{ maxWidth: 620 }}>
      <h2 className='mb-1'>Sell Your Book</h2>
      <p className='text-muted mb-4'>List a book you own for other readers to discover in Explore.</p>

      {error && <Alert variant='danger'>{error}</Alert>}
      {success && <Alert variant='success'>{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7}>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control name='title' value={form.title} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className='mb-3'>
              <Form.Label>Author</Form.Label>
              <Form.Control name='author' value={form.author} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Price (USD)</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min='0'
                name='price'
                value={form.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Select name='category' value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='description'
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit' disabled={submitting}>
          {submitting ? 'Listing…' : 'List Book'}
        </Button>
      </Form>
    </Container>
  )
}

export default SellBook
