import React, { useContext, useState, useEffect, useRef } from 'react';
import { StoreContext } from '../store/Store';
import { sendMessageToAgent } from '../actions/agentActions';
// import marked for markdown parsing
import { marked } from 'marked';
import IntroMessage from './IntroMessage';
import './ChatAgent.css';

const ChatAgent = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

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
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = getBaseHeight() + 'px';
    }

    // 2) call n8n agent (this will dispatch FETCH_START_AGENT → spinner)
    await sendMessageToAgent(dispatch, () => state, messageToSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getBaseHeight = () => {
    if (window.innerWidth <= 480) return 56;
    if (window.innerWidth <= 768) return 64;
    return 72;
  };

  const getMaxHeight = () => {
    if (window.innerWidth <= 480) return 100;
    if (window.innerWidth <= 768) return 120;
    return 150;
  };

  const handleTextareaResize = (textarea) => {
    textarea.style.height = 'auto';
    const baseHeight = getBaseHeight();
    const maxHeight = getMaxHeight();
    const newHeight = Math.max(Math.min(textarea.scrollHeight, maxHeight), baseHeight);
    textarea.style.height = newHeight + 'px';
  };

  return (
    <div className="chatContainer">
      <div className="messages">
        {state.messages.length === 0 ? (
          // Display custom intro message component when no conversation has started
          <>
            <IntroMessage />
            <div className="inputContainer intro-mode">
              <div className="input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    handleTextareaResize(e.target);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question ou votre recherche ici..."
                  rows={1}
                />
              </div>
              <button onClick={handleSend} disabled={state.loadingAgent}>
                {state.loadingAgent ? (
                  <div className="spinner" style={{ width: '16px', height: '16px', margin: 0 }} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                  </svg>
                )}
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
                  dangerouslySetInnerHTML={{ __html: marked(m.text || '') }}
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
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleTextareaResize(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Tapez votre message..."
              rows={1}
            />
          </div>
          <button onClick={handleSend} disabled={state.loadingAgent}>
            {state.loadingAgent ? (
              <div className="spinner" style={{ width: '16px', height: '16px', margin: 0 }} />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            )}
          </button>
          {state.errorAgent && <div className="error">{state.errorAgent}</div>}
        </div>
      )}
    </div>
  );
};

export default ChatAgent; 