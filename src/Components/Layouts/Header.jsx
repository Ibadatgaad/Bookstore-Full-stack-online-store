import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useCart } from '../../Pages/Shop/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import cartIcon from '../../assets/Icons/Cart_icon.jpg'
import '../../style.css'

const Header = () => {
  const { cartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='header_section'>
      <div className='main_div'>
        <Navbar expand='lg' className='books-nav'>
          <Container fluid className='books-nav__container'>

            <Navbar.Brand as={NavLink} to='/' className='books-nav__brand'>
              Books
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='booksNav' />

            <Navbar.Collapse id='booksNav'>
              <Nav className='ms-auto align-items-center books-nav__links'>

                <NavLink
                  to='/'
                  end
                  className={({ isActive }) =>
                    `books-nav__link nav-link${isActive ? ' books-nav__link--active' : ''}`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to='/explore'
                  className={({ isActive }) =>
                    `books-nav__link nav-link${isActive ? ' books-nav__link--active' : ''}`
                  }
                >
                  Explore
                </NavLink>

                <NavLink
                  to='/sell'
                  className={({ isActive }) =>
                    `books-nav__link nav-link${isActive ? ' books-nav__link--active' : ''}`
                  }
                >
                  Sell Your Book
                </NavLink>

                {isAuthenticated ? (
                  <>
                    <span className='books-nav__link' style={{ opacity: 0.8 }}>
                      Hi, {user.name.split(' ')[0]}
                    </span>
                    <button
                      className='books-nav__link nav-link'
                      style={{ background: 'none', border: 'none' }}
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to='/login' className='books-nav__link nav-link'>
                      Log In
                    </NavLink>
                    <NavLink to='/signup' className='books-nav__link nav-link'>
                      Sign Up
                    </NavLink>
                  </>
                )}

                <NavLink to='/cart' className='books-nav__cart nav-link'>
                  <img src={cartIcon} alt='cart' className='books-nav__icon' />
                  {cartCount > 0 && (
                    <span className='books-nav__badge'>{cartCount}</span>
                  )}
                </NavLink>

              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
    </div>
  )
}

export default Header