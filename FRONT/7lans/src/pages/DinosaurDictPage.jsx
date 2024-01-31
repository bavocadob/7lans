import React from 'react';
import styled from 'styled-components';
import DinosaurSidePanel from '../components/side_panels/DinosaurSidePanel';
import { Link } from 'react-router-dom';
import NormalNav from '../components/navs/NormalNav';


const DinosaurDictPage = () => {

  const renderBody = () => {
    return (
      <div style={{display: 'flex', flex: 1, margin: '2rem', border: '5px solid black', borderRadius: '20px'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '65%', height: '100%', backgroundColor: 'rgb(232, 225, 255)', borderRadius: '15px 0 0 15px'}}>
          <div style={{height: '20%'}}>
            수집한 공룡
          </div>
          <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
            <span style={{border: '5px solid black', borderLeft: 'none', width: '8rem', padding: '0.5rem 0 0.5rem 0', borderRadius: '0 20px 20px 0', textAlign: 'center', fontSize: '25px', backgroundColor: 'rgb(208, 192, 237)', color: 'white', fontWeight: 'bolder'}}>목록</span>
            <div style={{border: '2.5px solid black', width: '100%'}}></div>
          </div>
          <div style={{flex: 1}}>
            공룡 이미지
          </div>
        </div>
        <div style={{flex: 1, borderLeft: '5px solid black', borderRadius: '0 15px 15px 0', backgroundColor: 'rgb(208, 192, 237)'}}>
          공룡 자세한 설명
        </div>
      </div>
    )
  }

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
        <div style={{display: 'flex', height: '100%',borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
          <DinosaurSidePanel />
          {renderBody()}
        </div>
      </div>
    </div>
    </>
  );
};

export default DinosaurDictPage;
