import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ChildNormalNav from '../components/navs/ChildNormalNav';
import ChildDinosaurSidePanel from '../components/side_panels/ChildDinosaurSidePanel';


const ChildDinosaurDictPage = () => {
  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}>
      <ChildNormalNav />
      <div style={{flex: 1, padding: '30px', backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%',borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
          <ChildDinosaurSidePanel />
        </div>
      </div>
    </div>
    </>
  );
};

export default ChildDinosaurDictPage;
