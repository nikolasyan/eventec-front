import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';  // Usando Switch e Route da versão 5
import SignInUp from './pages/SignInUp';
import Homepage from './pages/Homepage';
import MyAccount from './pages/MyAccount';
import CrudEvent from './pages/CrudEvent';
import AllEvents from './pages/AllEvents';
import DiretorMyAccount from './pages/DiretorMyAccount';
import MyEvents from './pages/MyEvents';
import MyCertifications from './pages/MyCertifications';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  return (
    <Router>
        <Switch>
            <Route path='/signinup' component={SignInUp} />
            <Route path='/' component={Homepage} exact />
            <Route path='/home' component={Homepage} />
            <Route path='/myAccount' component={MyAccount} />
            <Route path='/crudevent' component={CrudEvent} />
            <Route path='/events' component={AllEvents} />
            <Route path='/myAccountDiretor' component={DiretorMyAccount} />
            <Route path='/myEvents' component={MyEvents} />
            <Route path='/myCertifications' component={MyCertifications} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
    </Router>
  )
}

export default AppRoutes;
