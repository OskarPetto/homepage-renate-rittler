import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import paintings from '../content/paintings.yml';
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
          fixed(maxWidth: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}`;

const ContentService = {

  getPaintings(section: Section): Painting[] {
    return paintings.filter((painting) => painting.section === section.id);
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
