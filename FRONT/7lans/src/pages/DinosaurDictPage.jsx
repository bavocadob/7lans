import React from 'react';
import styled from 'styled-components';
import DinosaurSidePanel from '../components/side_panels/DinosaurSidePanel';
import { Link } from 'react-router-dom';
import NormalNav from '../components/navs/NormalNav';


const DinosaurDictPage = () => {
  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}>
      <NormalNav />
      <div style={{flex: 1, padding: '30px', backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%',borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
          <DinosaurSidePanel />
        </div>
      </div>
    </div>
    </>
  );
};

export default DinosaurDictPage;
