import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const Login = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container className='py-5' style={{ maxWidth: 420 }}>
      <h2 className='mb-4'>Log In</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type='submit' className='w-100' disabled={loading}>
          {loading ? 'Logging in…' : 'Log In'}
        </Button>
      </Form>
      <p className='mt-3'>
        Don't have an account? <NavLink to='/signup'>Sign up</NavLink>
      </p>
    </Container>
  )
}

export default Login
