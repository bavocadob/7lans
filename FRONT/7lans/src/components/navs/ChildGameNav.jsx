import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';


const NavBar = styled.nav`
  position: relative;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: rgb(255, 215, 3);
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;


const ChildGameNav = () => {
  return (
      <NavBar className='shadow'>
        <Link to="/child_main">
          <LogoImage src="./7lans_logo.png" alt="logo" />
        </Link>
      </NavBar>
  )
}

export default ChildGameNav