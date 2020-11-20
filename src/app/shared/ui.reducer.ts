import * as UI from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: UI.UIActions) {
  switch (action.type) {
    case UI.START_LOADING:
      return {
        isLoading: true,
      };
    case UI.STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
