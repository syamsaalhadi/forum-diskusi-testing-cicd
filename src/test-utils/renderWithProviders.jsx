import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

function noopReducer(state = {}, action = {}) {
  switch (action.type) {
    case '__SET_STATE__':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function createTestStore(preloadedState = {}) {
  const store = createStore(noopReducer, preloadedState, applyMiddleware(thunk));
  return store;
}

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    route = '/',
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
