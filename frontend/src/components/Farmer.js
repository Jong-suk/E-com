import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import Rating from './Rating'

const Farmer = ({farmer}) => {
  return (
    <Container className='px-4' style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem'}}>
      <Card className='my-3 p-3 rounded' style={{
        textAlign: 'center', 
        flex: '1 1 30rem',
        padding: '2rem',
        border: '.1rem solid rgba(0,0,0,.3)',
        borderRadius: '.5rem',
        overflow: 'hidden',
        position: 'relative'
        }}> 
        <Link to={`/farmer/${farmer._id}`}>
          <Card.Img src={farmer.image} variant='top' className='rounded' style={{ height: '20rem', width: '25rem'}}/> 
        </Link>

        <Card.Body>
          <Link to={`/farmer/${farmer._id}`}>
              <Card.Title as='h3' style={{textTransform: 'uppercase'}}><strong>{farmer.name}</strong></Card.Title> 
          </Link>
          
          <Card.Text as='h3' style={{textTransform: 'lowercase', fontSize: '1.6rem'}}>
              <>{farmer.email}</>    
          </Card.Text>
          
          <Card.Text as='div' style={{fontSize: '1.2rem'}}>
              <Rating 
                  value={farmer.rating} 
                  text={`${farmer.numReviews} reviews`}
                  />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Farmer
