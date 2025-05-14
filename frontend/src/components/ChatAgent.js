import React, { useContext, useState } from 'react';
import { StoreContext } from '../store/Store';
import { sendMessageToAgent } from '../actions/agentActions';
// import marked for markdown parsing
import { marked } from 'marked';
import IntroMessage from './IntroMessage';
import './ChatAgent.css';

const ChatAgent = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // capture before clearing
    const messageToSend = input;

    // 1) dispatch user message
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { sender: 'user', text: messageToSend }
    });

    // clear input immediately
    setInput('');

    // 2) call n8n agent (this will dispatch FETCH_START_AGENT → spinner)
    await sendMessageToAgent(dispatch, () => state, messageToSend);
  };

  return (
    <div className="chatContainer">
      <div className="messages">
        {state.messages.length === 0 ? (
          // Display custom intro message component when no conversation has started
          <>
            <IntroMessage />
            <div className="intro-input-container">
              <textarea
                rows="3"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="poser votre question ou votre recherche ici"
                className="intro-textarea"
              />
              <button onClick={handleSend} disabled={state.loadingAgent}>
                {state.loadingAgent ? 'Loading…' : 'Send'}
              </button>
            </div>
          </>
        ) : (
          // Display conversation messages
          state.messages.map((m, i) => (
            <div
              key={i}
              className={
                `message ${m.sender}` +
                (m.loading ? ' loading' : '') +
                (m.error   ? ' error'   : '')
              }
            >
              {m.loading ? (
                // spinner placeholder
                <div className="spinner" />
              ) : m.sender === 'agent' ? (
                // render agent text as HTML from Markdown
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: marked(m.text) }}
                />
              ) : (
                // plain user text
                m.text
              )}
            </div>
          ))
        )}
      </div>
      {state.messages.length > 0 && (
        <div className="inputContainer">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message"
          />
          <button onClick={handleSend} disabled={state.loadingAgent}>
            {state.loadingAgent ? 'chargement...' : 'envoyer'}
          </button>
          {state.errorAgent && <div className="error">{state.errorAgent}</div>}
        </div>
      )}
    </div>
  );
};

export default ChatAgent; 