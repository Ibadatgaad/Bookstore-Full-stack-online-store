import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import trophyImage from '../../assets/images/Award.svg'

const Banner = () => {
  return (
    <section className='banner_section'>
      <Container fluid className='banner_container'>
        <Row className='align-items-center g-0'>
          <Col>
            <h3 className='banner_title'>2025 National Book Awards for Fiction Shortlist</h3>
            <NavLink to='/Explore' className='banner_btn'>
              Explore Now
            </NavLink>
          </Col>
          <Col xs='auto' className='banner_img-col'>
            <img src={trophyImage} alt='trophy' className='banner_img' />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner