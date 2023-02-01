import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import './bootstrap.min.css'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome!!!</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
