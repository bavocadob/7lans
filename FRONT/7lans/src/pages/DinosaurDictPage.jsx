import React from 'react';
import styled from 'styled-components';
import DinosaurSidePanel from '../components/side_panels/DinosaurSidePanel';
import { Link } from 'react-router-dom';
import NormalNav from '../components/navs/NormalNav';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Adjust as needed */
`;

const ContentContainer = styled.div`
  background-color: rgb(255, 255, 255);
  flex: 1;
  margin: 20px;
  border-radius: 20px;
`;

const DinosaurDictPage = () => {
  return (
    <>
      <NormalNav />
      <DinosaurSidePanel />
      <PageContainer>
        <ContentContainer></ContentContainer>
      </PageContainer>
    </>
  );
};

export default DinosaurDictPage;
