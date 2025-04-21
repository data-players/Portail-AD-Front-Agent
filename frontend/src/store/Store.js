import React, { createContext, useReducer } from 'react';

// Initial state for chat messages
const initialState = {
  messages: [],
  loadingAgent: false,     // new: track loading state for n8n agent
  errorAgent: null         // new: track error from agent call
};

// Reducer to handle adding messages and agent fetch
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    // new: n8n agent call started
    case 'FETCH_START_AGENT':
      // add a loading placeholder message
      return {
        ...state,
        loadingAgent: true,
        errorAgent: null,
        messages: [
          ...state.messages,
          { sender: 'agent', text: '', loading: true }
        ]
      };

    // new: n8n agent call succeeded, payload is agent message object
    case 'FETCH_SUCCESS_AGENT':
      // replace the loading placeholder with actual reply
      const msgsSuccess = [...state.messages];
      const idx = msgsSuccess.findIndex(msg => msg.loading);
      if (idx !== -1) {
        msgsSuccess[idx] = {
          sender: action.payload.sender,
          text:   action.payload.text
        };
      } else {
        msgsSuccess.push(action.payload);
      }
      return {
        ...state,
        loadingAgent: false,
        messages: msgsSuccess
      };

    // new: n8n agent call failed
    case 'FETCH_ERROR_AGENT':
      // replace the loading placeholder with error text
      const msgsError = [...state.messages];
      const errIdx = msgsError.findIndex(msg => msg.loading);
      if (errIdx !== -1) {
        msgsError[errIdx] = {
          sender: 'agent',
          text:   action.payload,
          error:  true
        };
      }
      return {
        ...state,
        loadingAgent: false,
        errorAgent: action.payload,
        messages: msgsError
      };

    default:
      return state;
  }
};

// Create context
export const StoreContext = createContext(initialState);

// Provider wraps the entire app
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}; 