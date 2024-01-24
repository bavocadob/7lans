import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../components/navs/NormalNav';
import PostIt from '../../components/volunteer/post_it/PostIt';


const StartPage = () => {
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
        <div style={{height: '100%', width: '90%', display: 'flex', borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
          <CommonSidePanel />
          <body style={{width: '100%', flex: 1, borderRadius: '20px'}}>
            body
          </body>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
            <PostIt/>
            <PostIt/>
            <PostIt/>
            <PostIt/>
          </div>
      </div>
    </div>
    </>
  );
};

export default StartPage;
