import React from 'react'
import styles from '../Component.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {

    const navigate = useNavigate()

    const GSHandler = () => {
        navigate('/login?redirect=/products')
    }
  return (
    <section className={styles.home} >
        <div className={styles.image}>
            <img style={{ height: 'auto', width: '100%' }} src={process.env.PUBLIC_URL + '/images/home-img.jpg'} alt='' ></img>
        </div>
        <div className={styles.content} style={{paddingLeft: '5rem'}}>
            <span style={{ fontSize: '3rem', color: '#666' }}>fresh and organic</span>
            <h3 style={{ fontSize: '5rem', color: '#2c2c54' }}>your daily needy products</h3>
            <Button className={styles.btn} style={{fontSize: '1.6rem'}} type='button' onClick={GSHandler}>
                Get Started
            </Button>
        </div>
    </section>
  )
}

export default HomeScreen
