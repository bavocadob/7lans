import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';


const NavBar = styled.nav`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: rgb(255, 215, 3);
`;

const LogoImage = styled.img`
  height: 70px;
  margin: 15px;
`;


const NormalNav = ( ) => {
  return (
      <NavBar>
        <Link to="/main">
          <LogoImage src="./7lans_logo.png" alt="logo" />
        </Link>
      </NavBar>
  )
}

export default NormalNav