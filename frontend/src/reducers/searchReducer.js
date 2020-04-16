import { SEARCH_STUDENTS } from '../actions/types';

const initialState = {
  students: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state;
  }
}
