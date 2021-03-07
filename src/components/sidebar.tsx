import { StaticImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';
import ContentService from '../services/content-service';
import './sidebar.css';

const Sidebar: FunctionComponent = () => {
  const sections = ContentService.getSections();
  const artist = ContentService.getArtist();

  return (
    <div className="sidebar-container">
      <StaticImage
        src="../../static/artist.jpg"
        alt={artist.name}
        placeholder="blurred"
        width={200}
        height={200}
        className="artist-portrait"
      />
      <h1 className="artist-name">{artist.name}</h1>
      <p>{artist.description}</p>
      {artist.quotes.map((quote) => (
        <div>
          <p>{quote.text}</p>
          <p>{quote.author}</p>
        </div>
      )) }
      {sections.map((section) => (
        <a className="menu-item" href={`#${section.id}`}>{section.name}</a>
      ))}
    </div>
  );
};

export default Sidebar;
