import React, { useState } from 'react';
import { marked } from 'marked';
import './IntroMessage.css';
// Import the n8n image
import n8nImage from '../assets/n8n.png';

const IntroMessage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Introduction message text (partie principale)
  const introMessage = `
### Agent IA Portail Alimentation Durable

L'Agent IA du Portail de l'Alimentation Durable est un assistant intelligent conçu pour faciliter l'accès et l'exploitation des données issues du projet [portail-alimentation-durable.fr](https://www.portail-alimentation-durable.fr/), qui regroupe une grande variété de ressources structurées sur les politiques, initiatives, acteurs et projets liés à la transition alimentaire en France.

Cet agent vous permet :
* **Interroger directement la base de connaissance** du portail,
* **Explorer des concepts complexes** ou peu connus en s'appuyant sur des ressources externes comme Wikipedia,
* **Obtenir des réponses synthétiques, qualifiées et contextualisées**, issues des données métier du portail et enrichies par la recherche documentaire,
* **Naviguer dans des contenus riches** (fiches actions, diagnostics territoriaux, cartographies, référentiels, etc.) sans expertise technique préalable.
`;

  // Contenu de l'accordéon (détails techniques)
  const accordionContent = `
Développé par **[Data Players](https://data-players.com/)**, l'agent a été conçu avec **n8n**, une plateforme d'automatisation open source. Son comportement est totalement **configurable** par des instructions en langage naturel (prompts agentiques), et il est possible d'**intégrer d'autres outils** et de **choisir son LLM** selon les cas d'usage.

> 💡 Cette technologie peut être **adaptée à toute base de connaissance métier** (open data, base interne, référentiels sectoriels...) pour valoriser vos contenus, améliorer leur accessibilité, et offrir un point d'entrée conversationnel moderne à vos utilisateurs
`;

  // Texte d'invitation final
  const inviteText = `
**Utilisez la barre de recherche ci dessous pour commencer à interagir avec l'agent.**
`;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="intro-message">
      <div className="intro-content">
        <div 
          className="markdown"
          dangerouslySetInnerHTML={{ __html: marked(introMessage) }}
        />
        
        <div className="accordion">
          <button 
            className="accordion-toggle" 
            onClick={toggleAccordion}
          >
            <span>Comment ça marche ? j'en veux un pour mon organisation !</span>
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
                href="https://data-players.github.io/comm-agent-IA/pitch-commercial.html" 
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
        
        <div 
          className="invite-text"
          dangerouslySetInnerHTML={{ __html: marked(inviteText) }}
        />
      </div>
    </div>
  );
};

export default IntroMessage; 