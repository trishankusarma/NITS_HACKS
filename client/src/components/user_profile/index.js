import React from "react";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Profile from './user';

import AddStock from '../addStock/stockFrontPage';

import Edit from './edit';

const Page1=()=>{
    return(<>

        <Router>
            <div>
              <Profile/>
               <Switch> 
                    <Route exact path='/' component={AddStock}/>

                    <Route path='/user/edit' component={Edit}/>
               </Switch>
            </div>
        </Router>

    </>)
}

export default Page1;