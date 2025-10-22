import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as PortalSvgIcon } from '../assets/logos/common/SVG/logo blanc.svg';
import { ReactComponent as ExploreIcon } from '../assets/logos/common/SVG/explorer.svg';
import { ReactComponent as SearchIcon } from '../assets/logos/common/SVG/rechercher.svg';
import { ReactComponent as WikiIcon } from '../assets/logos/common/SVG/documentation.svg';
import './SideBar.css';

const routes = [
  {
    path: '/chat',
    label: 'Chat',
    section: 'middle',
    icon: <ExploreIcon />,
    id: 'chat-link'
  }
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinks = (section) => {
    return routes
      .filter(route => route.section === section)
      .map(route => {
        if (route.isExternal) {
          return (
            <a
              key={route.path}
              href={route.path}
              id={route.id}
              className={`${currentPath === route.path ? 'active' : ''} external-link`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="link-content">
                <div>{route.icon}</div>
                <div className="body3">{route.label}</div>
              </div>
            </a>
          );
        }

        return (
          <Link
            key={route.path}
            to={route.path}
            id={route.id}
            className={currentPath === route.path ? 'active' : ''}
          >
            <div className="link-content">
              <div>{route.icon}</div>
              <div className="body3">{route.label}</div>
            </div>
          </Link>
        );
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <a href="https://www.portail-alimentation-durable.fr/" target="_blank" rel="noopener noreferrer">
          <PortalSvgIcon style={{ width: '50px', height: '50px' }} />
        </a>
      </div>

      <div className="sidebar-middle">
        {renderLinks('middle')}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-divider"></div>
        {renderLinks('bottom')}
      </div>
    </div>
  );
};

export default Sidebar; 