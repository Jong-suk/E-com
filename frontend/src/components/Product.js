import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Container className='px-4' style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem'}}>
      <Card className='my-3 p-3 rounded' style={{
        textAlign: 'center', 
        flex: '1 1 30rem',
        padding: '2rem',
        border: '.1rem solid rgba(0,0,0,.3)',
        borderRadius: '.5rem',
        overflow: 'hidden',
        position: 'relative',
        height: 'auto',
        width: '100%'
        }}> 
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' className='rounded' style={{ height: 'auto', width: '100%'}}/> 
        </Link>

        <Card.Body style={{ textAlign: 'center' }}>
          <Link to={`/product/${product._id}`}>
              <Card.Title as='h1'><strong style={{textTransform: 'uppercase'}}>{product.name}</strong></Card.Title> 
          </Link>
          <Card.Text as='h2' style={{fontSize: '1.5rem'}}>
              <Rating 
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  />
          </Card.Text>
          <Card.Text>
                <h2 style={{ fontSize: '1.5rem', textTransform: 'none' }}>Price: ₹{product.price}/Kg</h2> 
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product
