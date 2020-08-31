
import {SET_USER_DATA, CLEAR_USER_DATA} from './types'

const setUserData = data =>  {
  return {type: SET_USER_DATA, data}
};

const clearUserData = data => {
  return { type: CLEAR_USER_DATA }
};

export default {
  setUserData,
  clearUserData
}