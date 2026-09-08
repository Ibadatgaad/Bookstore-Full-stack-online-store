import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import gridImage from '../../assets/images/Favorite Book.png'

const stats = [
  { value: '800+',   label: 'Book Listing' },
  { value: '550+',   label: 'Register User' },
  { value: '1,200+', label: 'Books Sold' },
]

const FindFavorite = () => {
  return (
    <section className='ff_section'>
      <Container fluid className='ff_container'>
        <Row className='align-items-center g-0'>

          {/* Left — Book Grid Image */}
          <Col lg={5} md={6} className='ff_grid-col'>
            <div className='ff_grid'>
              <img src={gridImage} alt='book covers' className='ff_grid--img' />
            </div>
          </Col>

          {/* Right — Content */}
          <Col lg={7} md={6} className='ff_content-col'>
            <div className='ff_content'>
              <h2 className='ff_content--heading'>Find Your Favorite</h2>
              <h2 className='ff_content--heading ff_content--highlight'>Book Here!</h2>

              <p className='ff_content--desc'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ad non
                reprehenderit. Reiciendis illo iusto incidunt distinctio exercitationem
                officiis dicta dolores dolorem ea! Non saepe, voluptatum cupiditate
                beatae in dolore!
              </p>

              {/* Stats */}
              <Row className='ff_stats g-0'>
                {stats.map((stat, i) => (
                  <Col key={i} xs={4} className='ff_stat'>
                    <span className='ff_stat--value'>{stat.value}</span>
                    <span className='ff_stat--label'>{stat.label}</span>
                  </Col>
                ))}
              </Row>

              <NavLink to='/Explore' className='ff_btn' textcolor='#fff'>
                Explore Now
              </NavLink>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default FindFavorite