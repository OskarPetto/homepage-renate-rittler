import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useState } from 'react';
import Painting from '../models/painting';
import { Section } from '../models/section';
import ContentService from '../services/content-service';
import './gallery.css';

interface GalleryProps {
  section: Section
}

const Gallery: FunctionComponent<GalleryProps> = ({
  section,
}: GalleryProps) => {
  const [openedPainting, setOpenedPainting] = useState<Painting>(undefined);

  const paintings = ContentService.getPaintings(section);

  return (
    <div className="gallery">
      <h2 className="gallery-title" id={section.id}>
        {section.name}
      </h2>
      <div className="gallery-paintings">
        {paintings.map((painting) => (
          <div
            role="button"
            className="painting"
            onClick={() => setOpenedPainting(painting)}
            onKeyDown={() => setOpenedPainting(painting)}
            tabIndex={0}
          >
            <GatsbyImage
              image={ContentService.getSmallImage(painting)}
              alt={painting.title}
            />

            <div className="painting-info">
              <h3 className="painting-title card-title">{painting.title}</h3>
              <div className="painting-subtitle">
                {`${painting.year}, 
                  ${painting.technique}, 
                  ${painting.size}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      {openedPainting !== undefined
      && <p>{openedPainting.id}</p>}

    </div>
  );
};

export default Gallery;
