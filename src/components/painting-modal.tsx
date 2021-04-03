import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useEffect, useRef } from 'react';
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
  const modalEl = useRef(null);
  const data = useStaticQuery(bigPaintingQuery);

  useEffect(() => {
    modalEl.current.focus();
  });

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
      ref={modalEl}
      className="modal"
      role="button"
      onClick={() => {
        onClose();
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'Escape':
          case 'Backspace':
            onClose();
            break;
          case 'ArrowRight':
            onNext();
            break;
          case 'ArrowLeft':
            onNext();
            break;
          default:
        }
      }}
      tabIndex={0}
    >
      <span className="close" role="button" onKeyDown={onClose} tabIndex={0}>&times;</span>
      <span className="left" role="button" onClick={previousPainting} onKeyDown={onClose} tabIndex={0}>&#10094;</span>
      <span className="right" role="button" onClick={nextPainting} onKeyDown={onClose} tabIndex={0}>&#10095;</span>

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
