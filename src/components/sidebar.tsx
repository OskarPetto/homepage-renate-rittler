import { StaticImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentService from '../services/content-service';
import './sidebar.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function getIcon(link: string) {
  if (link.includes('mail')) {
    return faEnvelope;
  }
  return null;
}

const Sidebar: FunctionComponent = () => {
  const sections = ContentService.getSections();
  const artist = ContentService.getArtist();

  return (
    <div className="sidebar">
      <div className="banner" />
      <div className="sidebar-container">
        <StaticImage
          src="../../static/artist.jpg"
          alt={artist.name}
          width={160}
          height={160}
          className="artist-portrait"
        />
        <div className="artist-name">
          <h1>{artist.name}</h1>
        </div>
        <div className="artist-description">
          <ul>
            {artist.facts.map((fact) => (
              <li>{`# ${fact}`}</li>
            ))}
          </ul>
        </div>
        {artist.quotes.map((quote) => (
          <div className="quote-text">
            <p>{`"${quote.text}"`}</p>
            <p>{quote.author}</p>
          </div>
        ))}
        <div className="menu">
          {sections.map((section) => (
            <a className="menu-item" href={`#${section.id}`}>
              {section.name}
            </a>
          ))}
          {/* {artist.links.map((link) => (
            <a className="menu-item" href={link} aria-label="Mail">
              <FontAwesomeIcon icon={getIcon(link)} />
            </a>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
