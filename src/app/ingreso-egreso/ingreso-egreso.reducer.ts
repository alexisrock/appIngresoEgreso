import { createReducer, on, Action } from '@ngrx/store';
import { setItems,unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
  items: [],
}

export interface AppsStateWithIngreso extends AppState{
  ingresoEgreso: State
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state,  items: [...items]})),
    on(unSetItems, (state) => ({ ...state,  items: []})),

);

export function ingresoEgresoReducer(state= initialState, action: Action) {
    return _ingresoEgresoReducer(state, action);
}
