import {
  USER_SAVE_LOGIN_DATA_ACTION,
  USER_SAVE_PASSWORD_ACTION,
  USER_SAVE_TOKEN_ACTION,
  USER_DELETE_ACTION,
  USER_SAVE_TEMP_PASS_DATA_ACTION,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
  cellPhone: '',
  cpf: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SAVE_LOGIN_DATA_ACTION:
      return {
        ...state,
        name: action.payload.name,
        cpf: action.payload.cpf,
        cellPhone: action.payload.cellPhone,
        location: action.payload.location,
        email: action.payload.email,
      };
    case USER_SAVE_PASSWORD_ACTION:
      return {...state, password: action.payload};
    case USER_SAVE_TEMP_PASS_DATA_ACTION:
      return {...state, isTemporaryPassword: action.payload};
    case USER_SAVE_TOKEN_ACTION:
      return {...state, bearerToken: action.payload};
    case USER_DELETE_ACTION:
      return INITIAL_STATE;
    default:
      return {...state};
  }
};
