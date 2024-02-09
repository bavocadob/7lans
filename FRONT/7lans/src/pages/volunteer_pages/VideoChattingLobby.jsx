import React from 'react';
import styled from "styled-components";
import {styled as muiStyled} from "@mui/material/styles";
import {Button} from "@mui/material";
import PropTypes from 'prop-types';
import {StreamManager} from "openvidu-browser";

const FlexCenterContainer = styled.div`
    flex: 1;
    background-color: rgb(255, 233, 156);
    display: flex;
    padding: 3rem;
    justify-content: space-between;
`;

const BorderBox = styled.div`
    width: 36vw;
    background-color: rgb(255, 248, 224);
    border: 5px solid black;
    border-radius: 20px;
`;

const CenteredBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 25vw;
`;

const ResponsiveImage = styled.img`
    max-width: 100%;
    max-height: 60%;
`;

const CenteredText = styled.p`
    text-align: center;
    font-size: 30px;;
`;

const StyledButton = styled.button`
background: linear-gradient(
    190deg,
    rgba(255, 184, 36, 1),
    rgba(255, 237, 140, 1));
font-size: 19px;
font-weight: bold;
border: 3px solid rgb(45,45,45);
border-radius: 50px;
margin: 0.5rem;
padding: 0.5rem;
height: 50px;
width: 130px;
margin-top: 7%;
margin-bottom: 0;
text-decoration-line: none;
 `;

const VideoChattingLobby = ({
                                renderUserVideoComponent, mainStreamManager, subscribers
                            }) => (
        <FlexCenterContainer>
            <BorderBox>
                {mainStreamManager && renderUserVideoComponent(mainStreamManager)}
            </BorderBox>
            <CenteredBox>
                <CenteredText>둘만의 화상채팅 공간이에요 하고싶은 놀이를 선택해주세요</CenteredText>
                <ResponsiveImage
                    src='https://www.creativefabrica.com/wp-content/uploads/2020/08/25/Cute-Dinosaur-Illustration-Graphics-5116630-1.png'
                    alt='CenterImage'/>
                <StyledButton>화상채팅 종료</StyledButton>
            </CenteredBox>
            <BorderBox>
                {subscribers.map((subscriber) => subscriber && renderUserVideoComponent(subscriber))}
            </BorderBox>
        </FlexCenterContainer>
    )

VideoChattingLobby.propTypes = {
    // 화면을 렌더링하는 method
    renderUserVideoComponent: PropTypes.func.isRequired,
    // 사용자의 화면을 관리하는 Stream
    mainStreamManager: PropTypes.instanceOf(StreamManager).isRequired,
    // 사용자의 Session에 참여하고 있는 Subscriber의 List
    subscribers: PropTypes.arrayOf(PropTypes.instanceOf(StreamManager)).isRequired,
}


export default VideoChattingLobby;