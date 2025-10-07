import React, { useState } from 'react';
import { marked } from 'marked';
import './IntroMessage.css';
// Import the n8n image
import n8nImage from '../assets/n8n.png';

const IntroMessage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Introduction message text (partie principale)
  const introMessage = `
### Agent IA
### Portail Alimentation Durable

Votre assistant intelligent pour explorer et exploiter les ressources du portail
[portail-alimentation-durable.fr](https://www.portail-alimentation-durable.fr/). Accédez facilement aux politiques, initiatives, acteurs et projets de la transition alimentaire en France.
`;

  // Contenu de l'accordéon (détails techniques)
  const accordionContent = `
Développé par **[Data Players](https://data-players.com/)**, l'agent a été conçu avec **n8n**, une plateforme d'automatisation open source. Son comportement est totalement **configurable** par des instructions en langage naturel (prompts agentiques), et il est possible d'**intégrer d'autres outils** et de **choisir son LLM** selon les cas d'usage.

> 💡 Cette technologie peut être **adaptée à toute base de connaissance métier** (open data, base interne, référentiels sectoriels...) pour valoriser vos contenus, améliorer leur accessibilité, et offrir un point d'entrée conversationnel moderne à vos utilisateurs
`;

  // Texte d'invitation final
  const inviteText = `
**Utilisez la barre de recherche ci dessous pour à interagir avec l'agent.**
`;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="intro-message">
      <div className="intro-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div
            className="hero-title markdown"
            dangerouslySetInnerHTML={{ __html: marked(introMessage) }}
          />
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <h4>Recherche intelligente</h4>
            <p>Interrogez directement la base de connaissance du portail avec un langage naturel</p>
          </div>
          <div className="feature-card">
            <h4>Accès unifié aux sources</h4>
            <p>Accédez à toutes les bases de connaissances des partenaires du portail simplement</p>
          </div>
          <div className="feature-card">
            <h4>Exploration enrichie</h4>
            <p>Explorez des concepts complexes en s'appuyant sur des ressources externes</p>
          </div>

          <div className="feature-card">
            <h4>Réponses contextualisées</h4>
            <p>Obtenez des réponses synthétiques qualifiées et contextualisées</p>
          </div>


        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={toggleAccordion}
            >
              <span>✨ Comment ça marche ? J'en veux un pour mon organisation !</span>
              <span className={`accordion-icon ${isAccordionOpen ? 'open' : ''}`}>
                {isAccordionOpen ? '−' : '+'}
              </span>
            </button>

            <div className={`accordion-content ${isAccordionOpen ? 'open' : ''}`}>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: marked(accordionContent) }}
              />

              <div className="action-button-container">
                <a
                  href="https://data-players.github.io/comm-agent-IA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more-button"
                >
                  En savoir plus sur les solutions d'agent IA
                </a>
              </div>

              <div className="n8n-illustration">
                <img
                  src={n8nImage}
                  alt="Architecture n8n pour l'Agent Portail AD"
                  className="n8n-image"
                />
                <p className="image-caption">Architecture de l'agent basée sur n8n</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invitation Section */}
        <div className="invite-section">
          <div className="invite-content">
            <div className="invite-icon">💬</div>
            <div
              className="invite-text"
              dangerouslySetInnerHTML={{ __html: marked(inviteText) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroMessage; 
