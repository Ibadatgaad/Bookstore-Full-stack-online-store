import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const Signup = () => {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container className='py-5' style={{ maxWidth: 420 }}>
      <h2 className='mb-4'>Create Account</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
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
            minLength={6}
            required
          />
          <Form.Text muted>At least 6 characters.</Form.Text>
        </Form.Group>
        <Button type='submit' className='w-100' disabled={loading}>
          {loading ? 'Creating account…' : 'Sign Up'}
        </Button>
      </Form>
      <p className='mt-3'>
        Already have an account? <NavLink to='/login'>Log in</NavLink>
      </p>
    </Container>
  )
}

export default Signup
