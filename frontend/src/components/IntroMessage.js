import React, { useState } from 'react';
import { marked } from 'marked';
import './IntroMessage.css';
// Import the n8n image
import n8nImage from '../assets/n8n.png';

const IntroMessage = () => {
  // Check if 'no_marketing' parameter is in URL (hash router)
  const hasNoMarketing = () => {
    // Extract query string from hash (e.g., #/chat?no_marketing -> ?no_marketing)
    const hash = window.location.hash;
    const queryStart = hash.indexOf('?');
    if (queryStart === -1) return false;

    const queryString = hash.substring(queryStart);
    const urlParams = new URLSearchParams(queryString);
    return urlParams.has('no_marketing');
  };

  // Check if marketing mode is enabled (no_marketing NOT present)
  const isMarketingMode = !hasNoMarketing();

  // Open accordion by default, unless 'no_marketing' parameter is present
  const [isAccordionOpen, setIsAccordionOpen] = useState(isMarketingMode);

  // Introduction message text (partie principale)
  const introMessage = `
### Agent IA
### Portail Alimentation Durable

Votre assistant intelligent pour explorer et exploiter les ressources du portail [portail-alimentation-durable.fr](https://www.portail-alimentation-durable.fr/).</br> Accédez facilement aux politiques, initiatives, acteurs et projets de la transition alimentaire en France.
`;

  // Contenu de l'accordéon (détails techniques)
  const accordionContent = `
Développé par **[Data Players](https://data-players.com/)**, l'agent a été conçu avec **n8n**, une plateforme d'automatisation open source. Son comportement est totalement **configurable** par des instructions en langage naturel (prompts agentiques), et il est possible d'**intégrer d'autres outils** et de **choisir son LLM** selon les cas d'usage.

> 💡 Cette technologie peut être **adaptée à toute base de connaissance métier** (open data, base interne, référentiels sectoriels...) pour valoriser vos contenus, améliorer leur accessibilité, et offrir un point d'entrée conversationnel moderne à vos utilisateurs
`;

  // Texte d'invitation final
  const inviteText = `
**Utilisez la barre de recherche ci dessous pour interagir avec l'agent.**
`;

  // Disclaimer text about the project
  const disclaimerText = `
Le Portail de l'Alimentation Durable est un projet numérique collectif, dont le portage, assuré dans sa première phase par Crisalim et Maurésiaterre, a été confié, en 2025, à Solagro. Le projet a déjà permis de rassembler près d'une dizaine d'acteurs qui contribuent à la construction du projet* et centraliser les ressources de 6 structures (présentées ci-dessous).

Dans le but de renforcer sa capacité à faciliter l'accès à une information fiable et pertinente en matière d'alimentation durable mais aussi le traitement et la restitution de l'information, le projet s'oriente vers le développement d'un agent IA en mesure de répondre à cet objectif. Un démonstrateur a été développé dans ce sens est vous est d'ores et déjà proposé à l'utilisation. La phase de déploiement du projet qui débute vise à permettre l'amélioration de cet outil.

Pour partager vos retours sur ce démonstrateur, vos attentes et/ou idées sur ce type d'outil, n'hésitez pas à écrire à : contact@portail-alimentation-durable.fr
`;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Titre de l'accordéon - varie selon le mode
  const accordionTitle = isMarketingMode
    ? 'Comment ça marche ? J\'en veux un pour mon organisation !'
    : 'Comment ça marche ?';

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

        {/* Disclaimer Section */}
        <div className="disclaimer-section">
          <div className="disclaimer-content">
            <div className="disclaimer-icon">ℹ️</div>
            <div
              className="disclaimer-text markdown"
              dangerouslySetInnerHTML={{ __html: marked(disclaimerText) }}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={toggleAccordion}
            >
              <span>{accordionTitle}</span>
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
        {/* <div className="invite-section">
          <div className="invite-content">
            <div className="invite-icon">💬</div>
            <div
              className="invite-text"
              dangerouslySetInnerHTML={{ __html: marked(inviteText) }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IntroMessage; 
