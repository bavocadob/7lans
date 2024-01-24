import React, { useState } from 'react';
import styled from 'styled-components';

const SidePanelContainer = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 2rem;
  color: white;
  max-width: 300px;
  border-radius: 20px 0 0 20px;
  height: 100%;
  position: relative;
`;

const SidePanelContent = styled.div`
  position: absolute;
  left: 225px;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 225px;
  border-radius: 25px;
  background-color: rgb(255, 248, 223);
  font-weight: bold;
  color: rgb(240, 165, 8);
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 70px;
  top: 200px;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  border: 5px solid rgb(0, 0, 0);
`;

const DinosaurSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <SidePanelContainer>
          <SidePanelContent>
            <CloseButton onClick={() => setSidePanelStatus(false)}>{"<<"}</CloseButton>
            <ProfileImage src="./anonymous.jpg" alt="" />
          </SidePanelContent>
        </SidePanelContainer>
      );
    } else {
      return (
        <button
          style={{
            borderRadius: '25px',
            backgroundColor: 'rgb(255, 248, 223)',
            fontWeight: 'bold',
            color: 'rgb(240, 165, 8)',
            margin: '2rem',
          }}
          onClick={() => setSidePanelStatus(true)}
        >
          {">>"}
        </button>
      );
    }
  };

  return renderSidePanel();
};

export default DinosaurSidePanel;
