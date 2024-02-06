import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaClock,
  FaBirthdayCake,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { changecompo } from "../../store/changeCompoSlice";
import axios from "axios";
import { updateChildInfo } from "../../store/childSlice";

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

  overflow: auto;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Age = ({ birth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  //console.log(birth[0])
  //console.log(currentDate.getFullYear())

  return <div>나이 : {currentDate.getFullYear() - birth[0] + 1} 살</div>;
};

const Comment = ({ comment }) => {
  //console.log(comment);

  if (comment) {
    return <div>특이사항 : {comment}</div>;
  } else {
    return <div>특이사항 : 특이사항이 없습니다.</div>;
  }
};

const DetailParagraph = styled.div`
  border: 3px solid #523329;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ChildCommonSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);
  //const [children, setChildren] = useState([]);
  const [id, setId] = useState([]);
  const dispatch = useDispatch();

  const childInfo = useSelector((state) => state.child.value);
  const children = useSelector((state) => state.children.value);
  const userInfo = useSelector((state) => state.user.value);
  const urlInfo = useSelector((state) => state.url.value)
  console.log(userInfo.memberId);
  const userId = userInfo.memberId;
  console.log(children);
  // console.log(childInfo);

  useEffect(() => {
    axios
      .get(`${urlInfo}/child/list/${userId}`)
      .then((res) => {
        console.log(res, "여기서 아이들 리스트 정제하기");
      });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changecompo());
  };

  //console.log(children);

  const renderSidePanel = () => {
    const postData = (child) => {
      dispatch(updateChildInfo(child));
      //console.log(childInfo);
    };
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
            <NameHeader> {userInfo.childName} 학생</NameHeader>

            <DetailContainer>
              {children.length > 0 ? (
                children.map((el) => (
                  <DetailParagraph key={el.childId}>
                    <form onSubmit={onSubmit}>
                      <h3>{el.childName}</h3>
                      <Age birth={el.childBirth}></Age>
                      <div>소속기관: {el.childCenterName}</div>
                      <Comment comment={el.childSpecialContent}></Comment>
                      <button onClick={() => postData(el)}>선택하기</button>
                    </form>
                  </DetailParagraph>
                ))
              ) : (
                <h4>친구를 추가해주세요!</h4>
              )}
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

export default ChildCommonSidePanel;
