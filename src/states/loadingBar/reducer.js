const initialState = 0;

function loadingBarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SHOW_LOADING':
      return state + 1;
    case 'HIDE_LOADING':
      return Math.max(state - 1, 0);
    default:
      return state;
  }
}

export default loadingBarReducer;
