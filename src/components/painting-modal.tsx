import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react';
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
            gatsbyImageData(width: 150, height: 150, transformOptions: {fit: INSIDE})
          }
        }
      }
    }
  }
`;

interface PaintingModalProps {
  paintings: Painting[];
  openedIndex: number;
  onClose: () => void;
}

const PaintingModal: FunctionComponent<PaintingModalProps> = ({
  paintings,
  openedIndex,
  onClose,
}: PaintingModalProps) => {
  const data = useStaticQuery(bigPaintingQuery);
  const [index, setIndex] = useState<number>(openedIndex);

  const previousPainting = (e) => {
    const previousIndex = index - 1 < 0 ? paintings.length - 1 : index - 1;
    setIndex(previousIndex);
    e.stopPropagation();
  };

  const nextPainting = (e) => {
    const nextIndex = (index + 1) % paintings.length;
    setIndex(nextIndex);
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

      {/* <p style={{ color: 'white' }}>{ JSON.stringify(paintings[index])}</p> */}
      <GatsbyImage
        objectFit="contain"
        className="modal-image"
        image={ContentService.getImage(data, paintings[index])}
        alt={paintings[index].title}
      />
    </div>
  );
};

export default PaintingModal;
