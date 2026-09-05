const initialState = true;

function isPreloadReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_IS_PRELOAD':
      return action.payload.isPreload;
    default:
      return state;
  }
}

export default isPreloadReducer;
