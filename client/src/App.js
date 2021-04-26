import './App.css';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Login from './components/login_register/login';
import Register from './components/login_register/register';
import User from './components/user_profile';
import UserState from './contexts/userContexts/userState';

import CustomerLogin from './components/customerLogin/login';
import CustomerRegister from './components/customerLogin/register';
import Customer from './components/customer/buyersPage';

function App() {
  return (
       <UserState>
            <Router>
                <Switch>
                     <Route exact path='/customer' component={Customer} />
                     <Route path="/customer/login" component={CustomerLogin}/>
                     <Route path="/customer/register" component={CustomerRegister}/>

                     <Route path="/user/login" component={Login}/>
                     <Route path="/user/register" component={Register}/>
                     <Route path="/" component={User}/>
                </Switch>
            </Router>
       </UserState>
  );
}

export default App;
