import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaHome, FaClock, FaBirthdayCake } from 'react-icons/fa';
import styled from 'styled-components';

const StyledDinosaurSidePanel = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 2rem;
  color: white;
  max-width: 300px;
  border-radius: 20px 0 0 20px;
  height: 100%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const InnerContainer = styled.div`
  height: 40%;
  position: relative;
  
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  left: 85%;
  border-radius: 25px;
  border: none;
  background-color: rgb(255, 248, 223);
  font-weight: bold;
  color: rgb(240, 165, 8);
  
  @media (max-width: 768px) {
    left: 85%;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 18%;
  top: 2%;
  height: 9rem;
  width: 9rem;
  border-radius: 100px;
  border: 5px solid rgb(0, 0, 0);
  
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    margin: 20px auto;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 60%;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const NameHeader = styled.h4`
  font-weight: bolder;
  color: rgb(0, 0, 0);
`;

const DetailContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0);
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const DetailParagraph = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DinosaurSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <StyledDinosaurSidePanel>
          <InnerContainer>
            <CloseButton onClick={() => setSidePanelStatus(false)}>{"<<"}</CloseButton>
            <ProfileImage src="./anonymous.jpg" alt="" />
          </InnerContainer>
          <InfoContainer>
            <NameHeader>박주헌 봉사자님</NameHeader>
            <DetailContainer>
              <DetailParagraph><FaEnvelope style={{ marginRight: '10px' }} />741u741@naver.com</DetailParagraph>
              <DetailParagraph><FaPhone style={{ marginRight: '10px' }} />010-2812-2515</DetailParagraph>
              <DetailParagraph><FaHome style={{ marginRight: '10px' }} />SSAFY 보듬 센터</DetailParagraph>
              <DetailParagraph><FaClock style={{ marginRight: '10px' }} />2024.01.24</DetailParagraph>
              <DetailParagraph><FaBirthdayCake style={{ marginRight: '10px' }} />1995.08.03</DetailParagraph>
            </DetailContainer>
          </InfoContainer>
        </StyledDinosaurSidePanel>
      );
    } else {
      return (
        <button style={{height: '25px', borderRadius: '25px', backgroundColor: 'rgb(255, 248, 223)', fontWeight: 'bold', color: 'rgb(240, 165, 8)', margin: '2rem', border: 'none' }} onClick={() => setSidePanelStatus(true)}>{">>"}</button>
      );
    }
  };

  return (
    renderSidePanel()
  );
};

export default DinosaurSidePanel;
