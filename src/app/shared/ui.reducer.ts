import { createReducer, on, Action } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean,
}

export const initialState: State = {
   isLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, stopLoading: false})),
);

export function uiReducer(state=initialState, action: Action) {
    return _uiReducer(state, action);
}