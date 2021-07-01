  import { createReducer, on, Action } from '@ngrx/store';
  import { setUser, unSetUser } from './auth.actions';
import { Usuario } from '../models/usuario.models';

  export interface State {
      user: Usuario;
  }

  export const initialState: State = {
    user: new Usuario('', '', ''),
  }

  const _authReducer = createReducer(initialState,

      on(setUser, (state, {user}) => ({ ...state, user: {...user}})),
      on(unSetUser, state => ({ ...state, user: new Usuario('', '', '')})),
  );

  export function authReducer(state=initialState , action: Action) {
      return _authReducer(state, action);
  }

