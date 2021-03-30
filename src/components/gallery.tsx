import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useState } from 'react';
import Masonry from 'react-masonry-css';
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
  const [openedPainting, setOpenedPainting] = useState<Painting>(undefined);

  const paintings = ContentService.getPaintings(section);

  return (
    <div className="gallery">
      <h2 className="gallery-title" id={section.id}>
        {section.name}
      </h2>
      <Masonry
        className="gallery-paintings"
        columnClassName="gallery-column"
        breakpointCols={{
          default: 4,
          2000: 3,
          1400: 2,
          1000: 1,
        }}
      >
        {paintings.map((painting) => (
          <div
            role="button"
            className="painting"
            onClick={() => setOpenedPainting(painting)}
            onKeyDown={() => setOpenedPainting(painting)}
            tabIndex={0}
          >
            <GatsbyImage
              image={ContentService.getImage(data, painting)}
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
      </Masonry>
      <PaintingModal
        painting={openedPainting}
        onClose={() => {
          setOpenedPainting(null);
        }}
      />
    </div>
  );
};

export default Gallery;
