import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaClock,
  FaBirthdayCake,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { changecompo } from "../../store/changeCompoSlice";

const StyledCommonSidePanel = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 2rem;
  color: white;
  width: 350px;
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
  left: 25%;
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
  color: #007bff;
  text-decoration: none;
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

const DetailParagraph = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommonSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);

  const [id, setId] = useState(" ");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changecompo());
  };

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <StyledCommonSidePanel>
          <InnerContainer>
            <CloseButton onClick={() => setSidePanelStatus(false)}>
              {"<<"}
            </CloseButton>
            <ProfileImage src="./anonymous.jpg" alt="" />
          </InnerContainer>
          <InfoContainer>
            <NameHeader>박주헌 봉사자님</NameHeader>
            <DetailContainer>
              <DetailParagraph>
                <form onSubmit={onSubmit}>
                  옥세훈 프로필 카드
                  <input type="submit" value="move" />
                </form>
              </DetailParagraph>
            </DetailContainer>
          </InfoContainer>
        </StyledCommonSidePanel>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <button
            style={{
              height: "25px",
              borderRadius: "25px",
              backgroundColor: "rgb(255, 248, 223)",
              fontWeight: "bold",
              color: "rgb(240, 165, 8)",
              margin: "2rem",
              border: "none",
            }}
            onClick={() => setSidePanelStatus(true)}
          >
            {">>"}
          </button>
        </div>
      );
    }
  };

  return renderSidePanel();
};

export default CommonSidePanel;
