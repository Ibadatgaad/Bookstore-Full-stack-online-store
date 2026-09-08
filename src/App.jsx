import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Layouts/Header.jsx'
import Footer from './Components/Layouts/Footer.jsx'
import { CartProvider } from '../src/Pages/Shop/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

// Home sections
import Hero from './Pages/Home/Hero.jsx'
import Bestsellers from './Pages/Home/Bestsellers.jsx'
import FindFavorite from './Pages/Home/Findfav.jsx'
import Banner from './Pages/Home/Banner.jsx'
import NewReleases from './Pages/Home/Newreleases.jsx'

// Pages
import Explore from './Pages/Explore/Explore.jsx'
import Cart from './Pages/Shop/Cart.jsx'
import Login from './Pages/Auth/Login.jsx'
import Signup from './Pages/Auth/Signup.jsx'
import SellBook from './Pages/Sell/SellBook.jsx'
import Checkout from './Pages/Checkout/Checkout.jsx'

// ── Page wrappers ─────────────────────────────────────────
const HomePage = () => (
  <>
    <Hero />
    <Bestsellers />
    <FindFavorite />
    <Banner />
    <NewReleases />
  </>
)

// ── App ───────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path='/'         element={<HomePage />} />
              <Route path='/explore'  element={<Explore />} />
              <Route path='/cart'     element={<Cart />} />
              <Route path='/login'    element={<Login />} />
              <Route path='/signup'   element={<Signup />} />
              <Route
                path='/sell'
                element={
                  <ProtectedRoute>
                    <SellBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/checkout'
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App