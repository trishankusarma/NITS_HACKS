import './App.css';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Login from './components/login_register/login';
import Register from './components/login_register/register';
import User from './components/user_profile/user';

function App() {
  return (
    <div className="App">
         <Router>
                <Switch>
                     <Route exact path="/" component={User}/>
                     <Route path="/user/login" component={Login}/>
                     <Route path="/user/register" component={Register}/>
                </Switch>
          </Router>
    </div>
  );
}

export default App;
