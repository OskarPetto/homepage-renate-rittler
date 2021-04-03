import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Main from '../components/main';
import artist from '../content/artist.yml';

const Home: FunctionComponent = () => (
  <div>
    <Helmet>
      <title>{artist.name}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={`Künstlerische Arbeiten von ${artist.name}`} />
      <meta name="language" content="de-AT" />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://renaterittler.art" />
    </Helmet>

    <Layout>
      <Sidebar />
      <Main />
    </Layout>
  </div>
);

export default Home;
