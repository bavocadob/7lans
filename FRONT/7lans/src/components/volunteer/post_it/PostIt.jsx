import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 10vh;
  background-image: url('/post_it.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 25px;
  color: black;
  margin: 2rem 0 2rem 0;
`;

const PostIt = (props) => {

  const navigate = {
    '/volunteer_video_chatting_start': '화상채팅',
    '/volunteer_active_doc':' 활동일지',
    '/volunteer_whispher': '속닥속닥',
    '/volunteer_raise_egg': '알키우기',
  }
  const valounteerAddress = props.message

  return (
    <Link to={valounteerAddress} style={{textDecorationLine: 'none'}}>
      <Container>
        {navigate[valounteerAddress]}
      </Container>
    </Link>
  )
}

export default PostIt