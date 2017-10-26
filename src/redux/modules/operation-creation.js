import { LOGOUT } from './auth';

export const OPEN_MODAL_OPERATION = 'operation-creation/OPEN_MODAL_OPERATION';
export const CLOSE_MODAL_OPERATION = 'operation-creation/CLOSE_MODAL_OPERATION';
export const CHANGE_OPERATION_TAB = 'operation-creation/CHANGE_OPERATION_TAB';

export const SELECT_ACCOUNT = 'operation-creation/SELECT_ACCOUNT';

export const SAVE_OPERATION_START = 'operation-creation/SAVE_OPERATION_START';
export const SAVED_OPERATION = 'operation-creation/SAVED_OPERATION';
export const SAVED_OPERATION_FAIL = 'operation-creation/SAVED_OPERATION_FAIL';

export function saveOperationStart() {
  return {
    type: SAVE_OPERATION_START,
  };
}

export function savedOperation() {
  return {
    type: SAVED_OPERATION,
  };
}

export function saveOperation() {
  return (dispatch) => {
    dispatch(saveOperationStart());
    setTimeout(() => {
      dispatch(savedOperation());
    }, 1000);
  };
}

export function openModalOperation() {
  return {
    type: OPEN_MODAL_OPERATION,
  };
}

export function closeModalOperation(from) {
  return {
    type: CLOSE_MODAL_OPERATION,
    from,
  };
}

export function changeTabOperation(index) {
  return {
    type: CHANGE_OPERATION_TAB,
    index,
  };
}

export function selectAccountItem(account) {
  return {
    type: SELECT_ACCOUNT,
    account,
  };
}

export function selectAccount(account) {
  return (dispatch) => {
    dispatch(selectAccountItem(account));
    dispatch(changeTabOperation(1));
  };
}

export const initialState = {
  modalOpened: false,
  currentTab: 0,
  account: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL_OPERATION:
      return { ...state, modalOpened: true };
    case CLOSE_MODAL_OPERATION:
      if (action.from === 'esc') {
        return { ...state, modalOpened: false };
      }
      return initialState;
    case CHANGE_OPERATION_TAB:
      return { ...state, currentTab: action.index };
    case SELECT_ACCOUNT:
      return { ...state, account: action.account };
    case SAVE_OPERATION_START:
      return { ...state, modalOpened: false };
    case SAVED_OPERATION:
      return initialState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
