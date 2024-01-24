import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 10vh;
  width: 160px;
  background-image: url('/post_it.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  `

const PostIt = () => {
  return (
    <Container></Container>
  )
}

export default PostIt