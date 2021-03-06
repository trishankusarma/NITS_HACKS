import {
    SET_USER
} from '../types';
  
const userReducer = (state, { type, payload }) => {
    switch (type) {

      case SET_USER:
        return {
          ...state,
          user: payload
        };

      default:
        return state;
    }
};
  
export default userReducer;