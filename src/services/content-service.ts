import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import ink from '../content/ink.yml';
import oil from '../content/oil.yml';
import sections from '../content/sections.yml';
import artist from '../content/artist.yml';
import Painting from '../models/painting';
import Section from '../models/section';
import Artist from '../models/artist';

const smallImageQuery = graphql`
query SmallImageQuery {
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
}`;

const ContentService = {

  getPaintings(section: Section): Painting[] {
    let paintings = [];
    switch (section.id) {
      case 'ink':
        paintings = ink;
        break;
      case 'oil':
        paintings = oil;
        break;
      default:
        paintings = [];
    }
    return paintings.filter((painting) => !painting.hide).sort((p1, p2) => p1.year - p2.year);
  },

  getSmallImage(painting: Painting) {
    const data = useStaticQuery(smallImageQuery);
    const { edges } = data.allFile;
    const imageNode = edges.find(({ node }) => node.name === painting.id).node;
    return getImage(imageNode);
  },

  getBigImage(painting: Painting) {
    return this.getSmallImage(painting);
  },

  getSections(): Section[] {
    return sections;
  },

  getArtist(): Artist {
    return artist;
  },
};

export default ContentService;
