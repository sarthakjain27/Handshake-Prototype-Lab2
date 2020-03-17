import { SEARCH_JOB, APPLY_FOR_JOB, COMPANY_POSTED_JOBS, CREATE_JOB_POST, APPLIED_JOBS } from '../actions/types';
const initialState = {
  jobs: {},
  applyForJob: '',
  createJobPost: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
      case SEARCH_JOB:
          return {
              ...state,
              jobs: action.payload
          };
      case APPLY_FOR_JOB:
        return {
          ...state,
          applyForJob: action.payload
        }
      case COMPANY_POSTED_JOBS:
        return {
          ...state,
          jobs: action.payload
        }
      case CREATE_JOB_POST:
        return {
          ...state,
          createJobPost: action.payload
        }
      case APPLIED_JOBS:
        return {
          ...state,
          jobs: action.payload
        }
      default:
          return state;
  }
};