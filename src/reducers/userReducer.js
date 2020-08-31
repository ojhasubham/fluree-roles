import {SET_USER_DATA, CLEAR_USER_DATA} from '../action/types'

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, user: action.data };
    case CLEAR_USER_DATA:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default UserReducer;