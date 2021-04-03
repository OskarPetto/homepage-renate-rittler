import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';
import Painting from '../models/painting';
import ContentService from '../services/content-service';
import './painting-modal.css';

const bigPaintingQuery = graphql`
  query BigPaintingQuery {
    allFile {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: 1500, height: 1500, transformOptions: {fit: INSIDE})
          }
        }
      }
    }
  }
`;

interface PaintingModalProps {
  painting: Painting;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PaintingModal: FunctionComponent<PaintingModalProps> = ({
  painting,
  onClose,
  onNext,
  onPrevious,
}: PaintingModalProps) => {
  const data = useStaticQuery(bigPaintingQuery);

  const previousPainting = (e) => {
    onPrevious();
    e.stopPropagation();
  };

  const nextPainting = (e) => {
    onNext();
    e.stopPropagation();
  };

  return (
    <div
      className="modal"
      role="button"
      onClick={() => {
        onClose();
      }}
      onKeyDown={() => {
        onClose();
      }}
      tabIndex={0}
    >
      <span className="close">&times;</span>
      <span className="left" role="button" onClick={previousPainting} onKeyDown={previousPainting} tabIndex={0}>&#10094;</span>
      <span className="right" role="button" onClick={nextPainting} onKeyDown={nextPainting} tabIndex={0}>&#10095;</span>

      <GatsbyImage
        objectFit="contain"
        className="modal-image"
        image={ContentService.getImage(data, painting)}
        alt={painting.title}
      />
    </div>
  );
};

export default PaintingModal;
