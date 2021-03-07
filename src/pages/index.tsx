import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Main from '../components/main';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: FunctionComponent = () => (
  <Layout>
    <Sidebar />
    <Main />
  </Layout>
);

export default Home;
