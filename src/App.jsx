import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/home/Home'
import Orders from './pages/orders/Orders'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashborad'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/data/MyState';


function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/*' element={<NoPage/>}/>
        </Routes>
      </Router>
    </MyState>
  )
}

export default App