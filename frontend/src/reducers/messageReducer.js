import { ALL_CONVERSATIONS, ALL_CHATS } from "../actions/types";
const initialState = {
  allConversations: {},
  allChats: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
      case ALL_CONVERSATIONS:
          return {
              ...state,
              allConversations: action.payload
          };
      case ALL_CHATS:
        return {
          ...state,
          allChats:action.payload
        }
      default:
          return state;
  }
};