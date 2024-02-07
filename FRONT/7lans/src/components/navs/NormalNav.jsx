import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: rgb(255, 215, 3);
  padding-right: 15%;
  top: 0;
  display: flex;
  gap: 35%;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 50px;
  margin-top: 15px;
`;

const ChildInfo = styled.div`
  font-size: 40px;
  padding-top: 20px;
`


const NormalNav = () => {
  const userInfo = useSelector((state) => state.user.value)
  const childInfo = useSelector((state) => state.child.value)
  const userType = useRef('')
  
  userType.current = userInfo.memberType
  if (userType.current === 'CHILD') {
    return (
      <NavBar className="shadow">
        <Link to="/child_main">
          <LogoImage src="./7lans_logo.png" alt="logo" />
        </Link>
        <ChildInfo>
              {childInfo.childName} 학생과의 공간입니다
        </ChildInfo>
      </NavBar>
    );
  }
  else if (userType.current === 'VOLUNTEER') {
    return (
      <NavBar className="shadow">
        <Link to="/volunteer_main">
          <LogoImage src="./7lans_logo.png" alt="logo" />
        </Link>
        <ChildInfo>
              {childInfo.childName} 학생과의 공간입니다
        </ChildInfo>
      </NavBar>
    );
  }
  else if (userType.current === 'MANAGER') {
    return (
      <NavBar className="shadow">
        <Link to="/admin_main_page">
          <LogoImage src="./7lans_logo.png" alt="logo" />
        </Link>
        <ChildInfo>
              {childInfo.childName} 학생과의 공간입니다
        </ChildInfo>
      </NavBar>
    );
  }
  else {
    return (
    <NavBar className="shadow">
      <LogoImage src="./7lans_logo.png" alt="logo" />
    </NavBar>
    )
  }
};

export default NormalNav;
