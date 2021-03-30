import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Main from '../components/main';

const Home: FunctionComponent = () => (
  <Layout>
    <Sidebar />
    <Main />
  </Layout>
);

export default Home;
