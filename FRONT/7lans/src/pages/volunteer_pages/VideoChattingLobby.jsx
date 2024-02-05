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
    font-size: 1.2rem;
`;

const StyledButton = muiStyled(Button)({
    fontFamily: 'inherit', // inherit body's font
    fontWeight: 'bold', // set font weight to bold
    backgroundColor: '#FFE27C',
    color: 'black',
    border: '3px solid #B08B57', // add darker border
    boxShadow: '2px 2px 0px 0px #B08B57', // move the border bottom-right to create shadow effect
    borderRadius: '30px',
});

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