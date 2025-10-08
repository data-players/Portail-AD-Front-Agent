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
    const response = await fetch('https://access-guard.data-players.com/gateway/agent-portail-ad/agentAD', {
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

    const data = await response.json();

    // Handle quota exceeded error (status 429)
    if (response.status === 429) {
      const quotaMessage = data?.error?.message || "Quota dépassé";

      // Check if 'no_marketing' parameter is in URL (hash router)
      const hash = window.location.hash;
      const queryStart = hash.indexOf('?');
      const hasNoMarketing = queryStart !== -1 && new URLSearchParams(hash.substring(queryStart)).has('no_marketing');

      if (hasNoMarketing) {
        // Simple message without marketing
        data.message = `Cet outil est un démonstrateur avec un **nombre limité de messages** sur une période de temps pour **limiter la consommation d'énergie**. Voici le quota qui a été dépassé : **${quotaMessage}**
Vous pourrez réutiliser ce démonstrateur une fois que ce dépassement de quotas ne sera plus applicable.`;
      } else {
        // Marketing message with call to action
        data.message = `Cet outil est un démonstrateur avec un **nombre limité de messages** pour **limiter la consommation d'énergie**. Le quota a été dépassé : **${quotaMessage}**
Vous pourrez réutiliser ce démonstrateur une fois que ce dépassement de quotas ne sera plus applicable.
Vous souhaitez accéder à davantage de cas d'usage sans limitation ? **[Contactez Data Players](https://data-players.github.io/comm-agent-IA/)** pour découvrir nos solutions d'agents IA personnalisés adaptés à vos besoins professionnels.`;
      }
      // dispatch({ type: 'FETCH_ERROR_AGENT', payload: customMessage });
      // return;
    }

    // if (!response.ok) {
    //   dispatch({ type: 'FETCH_ERROR_AGENT', payload: `HTTP error! status: ${ response.status } ` });
    // }



    // 3️⃣ dispatch agent reply as a message
    dispatch({
      type: 'FETCH_SUCCESS_AGENT',
      payload: {
        sender: 'agent',
        text: data.output || data.text || data.message || 'réponse non disponible' // Adapt based on actual API response structure
      }
    });
  } catch (error) {
    // 4️⃣ dispatch error
    dispatch({ type: 'FETCH_ERROR_AGENT', payload: error.message });
  } finally {
    isFetchingAgent = false;
  }
}; 
