import { APPLY_NUMBER, CHANGE_OPERATION } from '../store/actions.jsx';
import {
  CE,
  EQUALS,
  ADD_ONE,
  MEMORY_ADD,
  MEMORY_CLEAR,
  MEMORY_RECALL,
  MEMORY_RECORD,
  TYPE_ON_SCREEN,
} from './actions.jsx';

export const initialState = {
  total: 0,
  operation: '+',
  memory: 0,
  temporary: 0,
};

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '*':
      return num1 * num2;
    case '-':
      return num1 - num2;
    case '/':
      return num1 / num2;
    default:
      return;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case APPLY_NUMBER:
      return {
        ...state,
        total: calculateResult(state.total, action.payload, state.operation),
      };

    case CHANGE_OPERATION:
      return {
        ...state,
        operation: action.payload,
        total: initialState.total,
        temporary:
          state.temporary === 0
            ? state.total
            : calculateResult(
                Number(state.temporary),
                Number(state.total),
                state.operation
              ),
      };
    case TYPE_ON_SCREEN:
      const newState = {
        ...state,
        total:
          state.total === 0
            ? action.payload
            : state.total.toString() + action.payload.toString(),
      };

      return newState;
    case ADD_ONE:
      return {
        ...state,
        total: calculateResult(state.total, action.payload, state.operation),
      };

    case EQUALS:
      return {
        ...state,
        total: calculateResult(
          Number(state.temporary),
          Number(state.total),
          state.operation
        ),
      };
    case CE:
      return {
        ...state,
        total: initialState.total,
        temporary: initialState.temporary,
      };
    case MEMORY_ADD:
      return {
        ...state,
        memory: state.total,
      };

    case MEMORY_RECORD:
      return {
        ...state,
        total: calculateResult(state.total, state.memory, state.operation),
      };

    case MEMORY_RECALL:
      return {
        ...state,
        total: state.memory,
      };

    case MEMORY_CLEAR:
      return {
        ...state,
        memory: initialState.memory,
      };

    default:
      return state;
  }
};

export default reducer;
