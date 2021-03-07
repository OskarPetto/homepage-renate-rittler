import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useState } from 'react';
import { Card, CardColumns, Modal } from 'react-bootstrap';
import Painting from '../models/painting';
import { Section } from '../models/section';
import ContentService from '../services/content-service';
import './gallery.css';

interface GalleryProps {
    section: Section;
}

const Gallery: FunctionComponent<GalleryProps> = ({ section }: GalleryProps) => {
  const [openedPainting, setOpenedPainting] = useState<Painting>(undefined);

  const paintings = ContentService.getPaintings(section);

  return (
    <div className="gallery">
      <h2 className="gallery-title" id={section.id}>{section.name}</h2>
      <CardColumns>
        {paintings.map((painting) => (
          <Card className="painting" onClick={() => setOpenedPainting(painting)}>
            <GatsbyImage
              image={ContentService.getSmallImage(painting)}
              alt={painting.title}
            />
            <Card.Body>
              <h3 className="painting-title card-title">
                {painting.title}
              </h3>
              <div className="painting-subtitle">
                {`${painting.year}, 
                  ${painting.technique}, 
                  ${painting.size}`}
              </div>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
      <Modal show={openedPainting !== undefined} onHide={() => setOpenedPainting(undefined)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <GatsbyImage
            image={openedPainting === undefined ? undefinded : ContentService.getBigImage(openedPainting)}
            alt={openedPainting.title}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
