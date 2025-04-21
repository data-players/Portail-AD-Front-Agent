import { getSessionId } from '../utils/session';

// action to send a message to n8n agent and dispatch its response
let isFetchingAgent = false;

export const sendMessageToAgent = async (dispatch, getState, message) => {
  // prevent concurrent calls
  if (getState().loadingAgent || isFetchingAgent) return;
  isFetchingAgent = true;

  // 1️⃣ dispatch start
  dispatch({ type: 'FETCH_START_AGENT' });

  try {
    // 2️⃣ use fetch to communicate with n8n agent webhook
    const response = await fetch('https://n8n.data-players.com/webhook/6aecc4d3-8d0a-49ae-89d4-12d9f88ad95d/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatInput: message,
        sessionId: getSessionId(),
        // Optional: Include conversation history if needed
        // history: getState().messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }))
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 3️⃣ dispatch agent reply as a message
    dispatch({
      type: 'FETCH_SUCCESS_AGENT',
      payload: {
        sender: 'agent',
        text: data.output || data.text || data.message // Adapt based on actual API response structure
      }
    });
  } catch (error) {
    // 4️⃣ dispatch error
    dispatch({ type: 'FETCH_ERROR_AGENT', payload: error.message });
  } finally {
    isFetchingAgent = false;
  }
}; 