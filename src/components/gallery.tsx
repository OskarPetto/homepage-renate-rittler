import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useState } from 'react';
import Painting from '../models/painting';
import { Section } from '../models/section';
import ContentService from '../services/content-service';
import './gallery.css';
import PaintingModal from './painting-modal';

const smallPaintingQuery = graphql`
  query SmallPaintingQuery {
    allFile {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: 400)
          }
        }
      }
    }
  }
`;

interface GalleryProps {
  section: Section
}

const Gallery: FunctionComponent<GalleryProps> = ({
  section,
}: GalleryProps) => {
  const data = useStaticQuery(smallPaintingQuery);
  const [openedIndex, setOpenedIndex] = useState<number>(undefined);

  const paintings = ContentService.getPaintings(section);

  return (
    <div className="gallery">
      <h2 className="gallery-title" id={section.id}>
        {section.name}
      </h2>
      <div
        className="gallery-paintings"
      >
        {[...Array(paintings.length).keys()].map((index) => (
          <div
            role="button"
            className="painting"
            onClick={() => setOpenedIndex(index)}
            onKeyDown={() => setOpenedIndex(index)}
            tabIndex={0}
          >
            <GatsbyImage
              objectFit="contain"
              image={ContentService.getImage(data, paintings[index])}
              alt={paintings[index].title}
            />

            <div className="painting-info">
              <h3 className="painting-title card-title">{paintings[index].title}</h3>
              <div className="painting-subtitle">
                {`${paintings[index].year}, 
                  ${paintings[index].technique}, 
                  ${paintings[index].size}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      {openedIndex != null && (
      <PaintingModal
        paintings={paintings}
        openedIndex={openedIndex}
        onClose={() => {
          setOpenedIndex(undefined);
        }}
      />
      )}
    </div>
  );
};

export default Gallery;
