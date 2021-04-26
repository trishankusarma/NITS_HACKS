import './App.css';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Login from './components/login_register/login';
import Register from './components/login_register/register';
import User from './components/user_profile';
import UserState from './contexts/userContexts/userState';

function App() {
  return (
       <UserState>
            <Router>
                <Switch>
                     <Route path="/user/login" component={Login}/>
                     <Route path="/user/register" component={Register}/>
                     <Route path="/" component={User}/>
                </Switch>
            </Router>
       </UserState>
  );
}

export default App;
