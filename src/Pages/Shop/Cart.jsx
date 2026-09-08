import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from './CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import '../../../src/style.css'

const FREE_SHIPPING_THRESHOLD = 499
const SHIPPING_COST = 80

// ─── Cart Item Card ───────────────────────────────────────────────────────────
const CartItem = ({ item, onRemove, onQtyChange }) => (
  <div className='cart_item'>
    <div className='cart_item--cover' style={{ backgroundColor: item.bg }}>
      <span className='cart_item--icon'>📖</span>
    </div>
    <div className='cart_item--info'>
      <h5 className='cart_item--title'>{item.title}</h5>
      <p className='cart_item--author'>{item.author}</p>
      <div className='cart_item--bottom'>
        <div className='cart_item--qty'>
          <button
            className='cart_qty--btn'
            onClick={() => onQtyChange(item.id, item.qty - 1)}
            disabled={item.qty <= 1}
          >−</button>
          <span className='cart_qty--value'>{item.qty}</span>
          <button
            className='cart_qty--btn'
            onClick={() => onQtyChange(item.id, item.qty + 1)}
          >+</button>
        </div>
        <span className='cart_item--price'>USD{(item.price * item.qty).toFixed(2)}</span>
      </div>
    </div>
    <button className='cart_item--remove' onClick={() => onRemove(item.id)} aria-label='Remove item'>
      ✕
    </button>
  </div>
)

// ─── Main Cart Page ───────────────────────────────────────────────────────────
const Cart = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout')
    } else {
      navigate('/login', { state: { from: '/checkout' } })
    }
  }

  const shipping  = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total     = subtotal + shipping
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress  = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <section className='cart_page'>
      <Container fluid className='cart_container'>

        {/* ── Page heading ── */}
        <div className='cart_heading'>
          <h1 className='cart_heading--title'>Your Cart</h1>
          <span className='cart_heading--count'>
            {cartItems.reduce((s, i) => s + i.qty, 0)} item{cartItems.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* ── Empty state ── */
          <div className='cart_empty'>
            <span className='cart_empty--icon'>🛒</span>
            <h3 className='cart_empty--heading'>Your cart is empty</h3>
            <p className='cart_empty--text'>Looks like you haven't added anything yet.</p>
            <NavLink to='/explore' className='cart_empty--btn'>Browse Books</NavLink>
          </div>
        ) : (
          <Row className='g-4'>

            {/* ── Cart Items ── */}
            <Col lg={7} xl={8}>
              <div className='cart_items--wrapper'>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onQtyChange={updateQty}
                  />
                ))}
                <NavLink to='/explore' className='cart_continue'>
                  ← Continue Shopping
                </NavLink>
              </div>
            </Col>

            {/* ── Order Summary ── */}
            <Col lg={5} xl={4}>
              <div className='cart_summary'>
                <h3 className='cart_summary--heading'>Order Summary</h3>

                {/* Free shipping progress */}
                <div className='cart_shipping--bar'>
                  <div
                    className='cart_shipping--fill'
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {shipping > 0 ? (
                  <p className='cart_shipping--msg'>
                    Spend <strong>USD{remaining.toFixed(2)}</strong> more to get{' '}
                    <span className='cart_shipping--free'>FREE Shipping!</span>
                  </p>
                ) : (
                  <p className='cart_shipping--msg cart_shipping--msg--success'>
                    🎉 You've unlocked <span className='cart_shipping--free'>FREE Shipping!</span>
                  </p>
                )}

                {/* Line items */}
                <div className='cart_summary--rows'>
                  <div className='cart_summary--row'>
                    <span>Subtotal</span>
                    <span>USD{subtotal.toFixed(2)}</span>
                  </div>
                  <div className='cart_summary--row'>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className='cart_shipping--free'>FREE</span> : `USD${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className='cart_summary--divider' />
                  <div className='cart_summary--row cart_summary--row--total'>
                    <span>Total</span>
                    <span>USD{total.toFixed(2)}</span>
                  </div>
                </div>

                <button className='cart_checkout--btn' onClick={handleCheckout}>
                  Proceed to Checkout
                </button>

                {/* Accepted payments */}
                <div className='cart_payments'>
                  <p className='cart_payments--label'>We Accept</p>
                  <div className='cart_payments--icons'>
                    <span className='cart_pay--icon'>💳</span>
                    <span className='cart_pay--icon'>🏦</span>
                    <span className='cart_pay--icon'>📱</span>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        )}

      </Container>
    </section>
  )
}

export default Cart