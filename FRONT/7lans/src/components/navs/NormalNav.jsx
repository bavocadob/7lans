import React, { useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from "../../store/userSlice";

import Logo from "../../images/7lans_logo.png";

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
  margin-left: 40px;
  margin-top: 15px;
`;

const ChildInfo = styled.div`
  font-size: 40px;
  padding-top: 20px;
`


const NormalNav = () => {
  const userInfo = useSelector((state) => state.user.value)
  const childInfo = useSelector((state) => state.child.value)
  const volInfo = useSelector((state) => state.vol.value)
  const userType = useRef('')
  const location = useLocation()
  const dispatch = useDispatch()

  const resetData = () => {
    dispatch(updateUserInfo(""));
  };
  
  userType.current = userInfo.memberType
  if (userType.current === 'CHILD') {
    return (
      <NavBar className="shadow">
        <Link to="/child_main">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>
              {location.pathname !== '/child_dinosaur_dict' ? 
                <div>
                  {volInfo? <p>{volInfo.volunteerName} 선생님과의 공간입니다</p> : ''}
                </div>
                :''}
        </ChildInfo>
      </NavBar>
    );
  }
  else if (userType.current === 'VOLUNTEER') {
    return (
      <NavBar className="shadow">
        <Link to="/volunteer_main">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>
              {location.pathname !== '/dinosaur_dict' ? 
                <div>
                  {childInfo && (location.pathname !== '/active_docs')? <p>{childInfo.childName} 학생과의 공간입니다.</p> : '' }
                </div>
                :''}
        </ChildInfo>
      </NavBar>
    );
  }
  else if (userType.current === 'MANAGER') {
    return (
      <NavBar className="shadow">
        <Link to="/admin_main_page">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>
              {/* {childInfo.childName} 학생과의 공간입니다 */}
        </ChildInfo>
        <Link 
          to="/" 
          style={{
            alignSelf: 'center', 
            fontSize: "23px", 
            textDecorationLine: "none", 
            color: 'black', 
            fontWeight: 'bolder',
            position: 'fixed',
            right: '100px'
          }}
        >
              로그아웃
        </Link>
      </NavBar>
    );
  }
  else {
    return (
    <NavBar className="shadow">
      <LogoImage src={Logo} alt="logo" />
    </NavBar>
    )
  }
};

export default NormalNav;
