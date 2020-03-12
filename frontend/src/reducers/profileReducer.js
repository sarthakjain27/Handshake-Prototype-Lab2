import { REGISTERED_STUDENTS } from '../actions/types';
const initialState = {
  registeredStudents: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
      case REGISTERED_STUDENTS:
          return {
              ...state,
              registeredStudents: action.payload
          };
      default:
          return state;
  }
};