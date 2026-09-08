import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='footer_section'>
      <Container fluid className='footer_container'>
        <Row className='footer_top'>

          {/* Brand Column */}
          <Col lg={4} md={6} className='footer_col footer_col--brand'>
            <h2 className='footer_brand'>Books</h2>
            <p className='footer_brand--tagline'>
              The world's largest community for readers. Discover, buy, and sell books at the best prices.
            </p>
            <div className='footer_socials'>
              <a href='#' className='footer_social--link' aria-label='Facebook'>
                <span className='footer_social--icon'>f</span>
              </a>
              <a href='#' className='footer_social--link' aria-label='Twitter'>
                <span className='footer_social--icon'>𝕏</span>
              </a>
              <a href='#' className='footer_social--link' aria-label='Instagram'>
                <span className='footer_social--icon'>ig</span>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={6} className='footer_col'>
            <h4 className='footer_col--heading'>Quick Links</h4>
            <ul className='footer_links'>
              <li><a href='#' className='footer_links--item'>Home</a></li>
              <li><a href='#' className='footer_links--item'>Explore</a></li>
              <li><a href='#' className='footer_links--item'>Shop</a></li>
              <li><a href='#' className='footer_links--item'>Sell Your Book</a></li>
            </ul>
          </Col>

          {/* Categories */}
          <Col lg={2} md={6} sm={6} className='footer_col'>
            <h4 className='footer_col--heading'>Categories</h4>
            <ul className='footer_links'>
              <li><a href='#' className='footer_links--item'>Fiction</a></li>
              <li><a href='#' className='footer_links--item'>Non-Fiction</a></li>
              <li><a href='#' className='footer_links--item'>Science</a></li>
              <li><a href='#' className='footer_links--item'>History</a></li>
              <li><a href='#' className='footer_links--item'>Children</a></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col lg={4} md={6} className='footer_col'>
            <h4 className='footer_col--heading'>Stay in the loop</h4>
            <p className='footer_newsletter--text'>
              Get weekly picks, new arrivals, and exclusive deals straight to your inbox.
            </p>
            <div className='footer_newsletter'>
              <input
                type='email'
                placeholder='Enter your email'
                className='footer_newsletter--input'
              />
              <button className='footer_newsletter--btn'>Subscribe</button>
            </div>
          </Col>

        </Row>

        {/* Divider */}
        <div className='footer_divider' />

        {/* Bottom Bar */}
        <Row className='footer_bottom'>
          <Col md={6} className='footer_bottom--left'>
            <p className='footer_bottom--text'>© 2025 Books. All rights reserved.</p>
          </Col>
          <Col md={6} className='footer_bottom--right'>
            <a href='#' className='footer_bottom--link'>Privacy Policy</a>
            <a href='#' className='footer_bottom--link'>Terms of Service</a>
            <a href='#' className='footer_bottom--link'>Contact Us</a>
          </Col>
        </Row>

      </Container>
    </footer>
  )
}

export default Footer