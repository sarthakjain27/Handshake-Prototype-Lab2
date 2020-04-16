import { SEARCH_EVENT, COMPANY_POSTED_EVENTS, CREATE_EVENT } from '../actions/types';

const initialState = {
  events: {},
  createEvent: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPANY_POSTED_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        createEvent: action.payload,
      };
    case SEARCH_EVENT:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
