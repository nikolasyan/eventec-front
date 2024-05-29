import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInUp from './pages/SignInUp';
import Homepage from './pages/Homepage';
import MyAccount from './pages/MyAccount'
import CrudEvent from './pages/CrudEvent';
import AllEvents from './pages/AllEvents';
import DiretorMyAccount from './pages/DiretorMyAccount';
import MyEvents from './pages/MyEvents';
import MyCertifications from './pages/MyCertifications';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/signinup' element={<SignInUp/>}></Route>
            <Route path='/' element={<Homepage/>}></Route>
            <Route path='/home' element={<Homepage/>}></Route>
            <Route path='/myAccount' element={<MyAccount/>}></Route>
            <Route path='/crudevent' element={<CrudEvent/>}></Route>
            <Route path='/events' element={<AllEvents/>}></Route>
            <Route path='/myAccountDiretor' element={<DiretorMyAccount/>}></Route>
            <Route path='/myEvents' element={<MyEvents/>}></Route>
            <Route path='/myCertifications' element={<MyCertifications/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes;