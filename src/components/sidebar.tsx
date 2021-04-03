import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ContentService from '../services/content-service';
import './sidebar.css';

const artistImageQuery = graphql`
query ArtistImageQuery {
  file(name: {eq: "_artist"}) {
    childImageSharp {
      gatsbyImageData(width: 150, height: 150)
    }
  }
}`;

const Sidebar: FunctionComponent = () => {
  const sections = ContentService.getSections();
  const artist = ContentService.getArtist();
  const artistImage = useStaticQuery(artistImageQuery);

  return (
    <div className="sidebar">
      <div className="banner" />
      <div className="sidebar-container">
        <GatsbyImage
          image={getImage(artistImage.file)}
          alt={artist.name}
          className="artist-portrait"
        />
        <div className="artist-name">
          <h1>{artist.name}</h1>
        </div>
        <div className="menu">
          {sections.map((section) => (
            <a className="menu-item" href={`#${section.id}`}>
              {section.name}
            </a>
          ))}
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
      </div>
    </div>
  );
};

export default Sidebar;
