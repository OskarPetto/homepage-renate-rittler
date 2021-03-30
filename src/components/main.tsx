import React, { FunctionComponent } from 'react';
import ContentService from '../services/content-service';
import Gallery from './gallery';
import './main.css';

const Main: FunctionComponent = () => {
  const sections = ContentService.getSections();
  return (
    <main>
      <div className="main-container">
        {sections.map((section) => (
          <Gallery section={section} />
        ))}
      </div>
    </main>
  );
};

export default Main;
