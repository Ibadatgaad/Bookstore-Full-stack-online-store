import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../Shop/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import * as ordersApi from '../../api/orders'

const FREE_SHIPPING_THRESHOLD = 499
const SHIPPING_COST = 80

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const [form, setForm] = useState({
    fullName: user?.name || '',
    addressLine: '',
    city: '',
    postalCode: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')

    if (cartItems.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setPlacing(true)
    try {
      const order = await ordersApi.createOrder({
        items: cartItems.map((i) => ({ bookId: i.id, qty: i.qty })),
        shippingAddress: form,
      })
      setPlacedOrder(order)
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setPlacing(false)
    }
  }

  if (placedOrder) {
    return (
      <Container className='py-5' style={{ maxWidth: 560 }}>
        <Alert variant='success'>
          <Alert.Heading>🎉 Order placed!</Alert.Heading>
          <p>
            Thanks, {placedOrder.shippingAddress.fullName}. Your order total was{' '}
            <strong>USD{placedOrder.total.toFixed(2)}</strong>.
          </p>
        </Alert>
        <NavLink to='/explore' className='btn btn-primary'>Continue Shopping</NavLink>
      </Container>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Container className='py-5 text-center'>
        <h3>Your cart is empty</h3>
        <p className='text-muted'>Add some books before checking out.</p>
        <NavLink to='/explore' className='btn btn-primary'>Browse Books</NavLink>
      </Container>
    )
  }

  return (
    <Container className='py-5'>
      <h2 className='mb-4'>Checkout</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Row className='g-4'>
        <Col lg={7}>
          <Form onSubmit={handlePlaceOrder}>
            <h5 className='mb-3'>Shipping Address</h5>
            <Form.Group className='mb-3'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control name='fullName' value={form.fullName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control name='addressLine' value={form.addressLine} onChange={handleChange} required />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control name='city' value={form.city} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control name='postalCode' value={form.postalCode} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-4'>
              <Form.Label>Phone</Form.Label>
              <Form.Control name='phone' value={form.phone} onChange={handleChange} required />
            </Form.Group>
            <Button type='submit' disabled={placing} className='w-100'>
              {placing ? 'Placing order…' : `Place Order — USD${total.toFixed(2)}`}
            </Button>
          </Form>
        </Col>

        <Col lg={5}>
          <div className='cart_summary'>
            <h5 className='mb-3'>Order Summary</h5>
            {cartItems.map((i) => (
              <div key={i.id} className='d-flex justify-content-between mb-2'>
                <span>{i.title} × {i.qty}</span>
                <span>USD{(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className='d-flex justify-content-between'>
              <span>Subtotal</span><span>USD{subtotal.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `USD${shipping.toFixed(2)}`}</span>
            </div>
            <hr />
            <div className='d-flex justify-content-between fw-bold'>
              <span>Total</span><span>USD{total.toFixed(2)}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout
