import styles from '../Component.module.css'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar } from 'react-bootstrap'
import SearchBox from './SearchBox'

const Header = () => {

  return (
    <header>
        <Navbar className={styles.header1}>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand className={styles.logo}>Seed The Rise</Navbar.Brand>
            </LinkContainer>
            <SearchBox />
          </Container>
        </Navbar>
    </header>
  )
}

export default Header
