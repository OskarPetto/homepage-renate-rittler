import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { Section } from '../models/section';
import ContentService from '../services/content-service';
import './gallery.css';

interface GalleryProps {
    section: Section;
}

const Gallery: FunctionComponent<GalleryProps> = ({ section }: GalleryProps) => {
  const paintings = ContentService.getPaintings(section);

  return (
    <div className="gallery">
      <h2 id={section.id}>{section.name}</h2>
      <CardColumns>
        {paintings.map((painting) => (
          <Card className="painting shadow-sm">
            <GatsbyImage
              image={ContentService.getSmallImage(painting)}
              alt={painting.title}
            />
            <Card.Body>
              <Card.Title className="painting-title">{painting.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default Gallery;
