import React, { useState, useEffect } from 'react'
import book1 from '../../assets/images/slide1.svg'
import book2 from '../../assets/images/slide2.svg'
import book3 from '../../assets/images/slide3.svg'
import book4 from '../../assets/images/slide4.svg'

const books = [book1, book2, book3, book4]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % books.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='hero_section'>
      <div className='hero_content'>
        <h1 className='hero_title'>
          Buy and sell your books{' '}
          <span className='hero_title--highlight'>for the best prices</span>
        </h1>
        <p className='hero_description'>
          Find and read more you'll love, and keep track of the books you want to read.
          Be part of the word's largest community of book lovers on Goodreads.
        </p>
        <div className='hero_search'>
          <span className='hero_search--icon'>🔍</span>
          <input type='text' placeholder='Search for Books...' className='hero_search--input' />
          <span className='hero_search--dots'>···</span>
        </div>
      </div>

      <div className='hero_image'>
        {books.map((book, index) => (
          <img
            key={index}
            src={book}
            alt={`book ${index + 1}`}
            className={`hero_image--slide ${index === current ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero