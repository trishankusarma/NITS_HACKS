import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';

import {
  SET_USER
} from '../types';

const AuthState = (props) => {

  const initialState = {
    user:null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //set user
  const setUser = async (data) => {
    
    dispatch({
    
        type:SET_USER,
        payload:data
    })
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default AuthState;