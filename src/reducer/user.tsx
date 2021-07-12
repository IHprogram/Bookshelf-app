import { UserInfo } from '../Types'
import { SET_USER_INFO } from '../actions/index';

const initialState: UserInfo = {
  name: '',
  email: '',
  login_user: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      state.name = action.name
      state.email = action.email
      state.login_user = action.login_user
      console.log(state);
      return state
    default:
      return state
  }
}