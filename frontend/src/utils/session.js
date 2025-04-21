// Store the sessionId in a module-scoped variable (in-memory)
let sessionId = null;

export function getSessionId() {
  // If sessionId is not set, generate and store it in memory
  if (!sessionId) {
    sessionId = Date.now().toString() + Math.random().toString(36).substring(2);
  }
  return sessionId;
}
