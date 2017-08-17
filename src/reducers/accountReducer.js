import constants from '../constants';

var initialState = {
  user: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch(action.type) {

    case constants.CURRENT_USER_RECEIVED:
      updated['user'] = action.user;
      //console.log(JSON.stringify(updated));
      return updated;

    default:
      return updated;
  }
}
