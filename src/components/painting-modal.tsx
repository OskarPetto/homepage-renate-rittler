import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent, useState } from 'react';
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
            gatsbyImageData(height: 1200)
          }
        }
      }
    }
  }
`;

interface PaintingModalProps {
  painting: Painting
  onClose: () => void
}

const PaintingModal: FunctionComponent<PaintingModalProps> = ({
  painting,
  onClose,
}: PaintingModalProps) => {
  if (!painting) {
    return null;
  }
  const data = useStaticQuery(bigPaintingQuery);

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

      <div
        className="modal-content"
        role="img"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        <GatsbyImage
          image={ContentService.getImage(data, painting)}
          alt={painting.title}
        />
      </div>
    </div>
  );
};

export default PaintingModal;
