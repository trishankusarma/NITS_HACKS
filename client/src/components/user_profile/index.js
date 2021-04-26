import React from "react";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Profile from './user';

import Edit from './edit';

import AddStock from '../addStock/addStock';
import ViewStock from '../addStock/viewStock';
import ViewDemand from '../addStock/viewDemand';

const Page1=()=>{
    return(<>

        <Router>
            <div>
              <Profile/>
               <Switch> 
                    <Route exact path='/' component={AddStock}/>

                    <Route path='/user/edit' component={Edit}/>

                    <Route path='/user/viewStock' component={ViewStock}/>

                    <Route path='/user/viewDemand' component={ViewDemand}/>
               </Switch>
            </div>
        </Router>

    </>)
}

export default Page1;