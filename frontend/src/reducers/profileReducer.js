import { REGISTERED_STUDENTS, COMPANY_PROFILE, STUDENT_PROFILE } from '../actions/types';

const initialState = {
  registeredStudents: {},
  companyProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTERED_STUDENTS:
      return {
        ...state,
        registeredStudents: action.payload,
      };
    case COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: action.payload,
      };
    case STUDENT_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
