import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import './bootstrap.min.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from './screens/HomeScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import FarmerScreen from './screens/FarmerScreen'
import FarmerProfileScreen from './screens/FarmerProfileScreen'
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import SubHeader from './components/SubHeader'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListSrn from './screens/ProductListSrn'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import OrderListScreen from './screens/OrderListScreen'
import AdminProductListSrn from './screens/AdminProductListSrn'
import AdminProductCreateScreen from './screens/AdminProductCreateScreen'
import AdminProductEditScreen from './screens/AdminProductEditScreen'

const App = () => {
  const [clientID, setClientID] = useState('');
 
  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
 
      setClientID(clientId);
    };
 
    if (!window.paypal) {
      getClientId();
    }
  }, []);

  return (
    <>
      {clientID && (
        <PayPalScriptProvider options={{ 'client-id': clientID }}>
          <Router>
            <Header />
            <SubHeader />
            <main className='py-3'>
              <Container>
                <Routes>
                  <Route path='/' element={<HomeScreen />} exact />
                  <Route path='/search/:keyword' element={<ProductListScreen />} />
                  <Route path='/products' element={<ProductListScreen />} />
                  <Route path='/product/:id' element={<ProductScreen />} />
                  <Route path='/farmer/:id' element={<FarmerProfileScreen />} />
                  <Route path='/farmers' element={<FarmerScreen />} />
                  <Route path='/cart/:id?' element={<CartScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
                  <Route path='/admin/productlist' element={<AdminProductListSrn />} />
                  <Route path='/admin/product/create' element={<AdminProductCreateScreen />} />
                  <Route path='/admin/product/:id/edit' element={<AdminProductEditScreen />} />
                  <Route path='/admin/orderlist' element={<OrderListScreen />} />
                  <Route path='/farmer/productlist' element={<ProductListSrn />} />
                  <Route path='/farmer/product/create' element={<ProductCreateScreen />} />
                  <Route path='/farmer/product/:id/edit' element={<ProductEditScreen />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </Router>
        </PayPalScriptProvider>
      )}
    </>
  );
}

export default App;
