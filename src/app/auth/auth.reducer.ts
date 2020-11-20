import * as Auth from './auth.actions';

export interface State {
  isAutheticated: boolean;
}

const initialState: State = {
  isAutheticated: false,
};

export function uiReducer(state = initialState, action: Auth.AuthActions) {
  switch (action.type) {
    case Auth.SET_AUTHENTICATED:
      return {
        isAutheticated: true,
      };
    case Auth.SET_UNAUTHENTICATED:
      return {
        isAutheticated: false,
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAutheticated;
