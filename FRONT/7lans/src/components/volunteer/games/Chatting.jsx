import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {BiCaretDown, BiCaretUp} from 'react-icons/bi';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import {Flipper, Flipped} from 'react-flip-toolkit';
import './Chatting.css';
import PropTypes from "prop-types";
import {StreamManager} from "openvidu-browser";
import {addChat} from '../../../store/chatSlice';

// Extracted common styles
const commonDivStyles = {
    backgroundColor: 'rgb(255, 248, 224)',
    margin: '5px',
    border: '5px solid rgb(45, 45, 45)',
    borderRadius: '20px'
};

const ChatInput = styled.input`
    width: 95%;
    margin-left: 2.5%;
    margin-top: 1%;
    border-radius: 20px;
    padding: 15px;
    border: 0.2px solid;
    box-shadow: 3px 3px 3px rgb(45,45,45);
`;

const Chat = ({
                  renderUserVideoComponent,
                  mainStreamManager,
                  subscribers,
                  session
              }) => {
    const [isChatVisible, setIsChatVisible] = useState(true)
    const [chatInput, setChatInput] = useState("");
    const dispatch = useDispatch();

    const direction = isChatVisible ? 'row' : 'column';
    const basis = isChatVisible ? '30%' : '100%';

    const chatList = useSelector((state) => state.chat.value)

    const bottomRef = useRef();

    useEffect(() => {
        // 채팅창이 업데이트 될 때마다 스크롤을 이동
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView(false);
        }
    }, [chatList]);

    const sendMessage = (chatData) => {
        const signalOptions = {
            data: chatData,
            type: 'chat'
        }

        console.log(`message 보냄 ${chatData}`);
        session.signal(signalOptions)
            .then(() => console.log('Message sent'))
            .catch(err => console.log(err));
    }


    const handleChatSubmission = event => {
        if (event.key === 'Enter' && chatInput.trim() !== "") {
            const userName = JSON.parse(mainStreamManager.stream.connection.data).clientData
            const data = {
                message: chatInput,
                writer: userName,
            }
            sendMessage(JSON.stringify(data));
            setChatInput("");
        }
    };


    useEffect(() => {
        const signalEventHandler = event => {
            const { data } = event;
            const chatData = JSON.parse(data);
            dispatch(addChat(chatData));
        };

        // 이벤트 리스너를 추가합니다.
        session.on('signal:chat', signalEventHandler);

        // 반환하는 함수에서 이벤트 리스너를 제거합니다.
        return () => {
            session.off('signal:chat', signalEventHandler);
        };

        // 의존성 배열에 session을 포함시킵니다. session 값이 변경될 때마다 이펙트가 재실행됩니다.
    }, [session, dispatch, chatList]);



    const ChatList = () => (
        <div style={{height: '70%', maxHeight: '270px', padding: '2%', overflowY: 'auto'}}>
            {chatList.map((chat, index) => (
                <p key={index}>
                    <strong>{chat.writer}</strong>: {chat.message}
                </p>
            ))}
            <div ref={bottomRef} style={{float: "left", clear: "both"}}/>
        </div>
    )



    return (
        <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '1rem'}}>
            {/*  비디오 컴포넌트 영역 */}
            <div className="video-panel" style={{flexBasis: basis}}>
                <Flipper flipKey={direction}>
                    <div style={{height: '100%', display: "flex", flexDirection: direction}}>
                        <Flipped flipId="content">
                            <div style={{...commonDivStyles, flexGrow: 1}}>
                                {mainStreamManager && renderUserVideoComponent(mainStreamManager)}
                            </div>
                        </Flipped>
                        <Flipped flipId="content">
                            <div style={{...commonDivStyles, flexGrow: 1}}>
                                {subscribers.map((subscriber) => subscriber && renderUserVideoComponent(subscriber))}
                            </div>
                        </Flipped>
                    </div>
                </Flipper>
            </div>
            {/*  비디오 컴포넌트 영역  */}
            {/*  채팅창 영역  */}
            <CSSTransition
                in={isChatVisible}
                timeout={300}
                classNames="chat"
                unmountOnExit
                onEnter={() => setIsChatVisible(true)}
                onExited={() => setIsChatVisible(false)}
            >
                <div style={{flexBasis: '60%', ...commonDivStyles}}>
                    <div className='shadow'
                         style={{
                             height: '70%',
                             width: '95%',
                             backgroundColor: 'rgb(255, 255, 255)',
                             margin: '5px',
                             marginLeft: '2.5%',
                             marginTop: '1em',
                             borderRadius: '20px',
                             border: '0.2px solid'
                         }}>
                        <button style={{
                            width: '30px', borderRadius: '20px', border: 'none',
                            backgroundColor: 'rgb(255, 215, 3)', margin: '10px'
                        }}
                                onClick={() => setIsChatVisible(!isChatVisible)}>
                            <BiCaretDown/>
                        </button>
                        <ChatList/>
                    </div>
                    <div>
                        <ChatInput
                            type="text"
                            placeholder="채팅 내용을 입력하세요"
                            onKeyUp={handleChatSubmission}
                            onChange={event => setChatInput(event.target.value)}
                            value={chatInput}
                        />
                    </div>
                </div>
            </CSSTransition>
            {/*  채팅창 영역  */}
            {!isChatVisible && (
                <button style={{
                    position: 'fixed',
                    left: '10px',
                    bottom: '10px',
                    width: '30px', borderRadius: '20px', border: 'none',
                    backgroundColor: 'rgb(255, 215, 3)', margin: '10px'
                }}
                        onClick={() => setIsChatVisible(!isChatVisible)}>
                    <BiCaretUp/>
                </button>
            )}
        </div>
    );
}


Chat.propTypes = {
    // 화면을 렌더링하는 method
    renderUserVideoComponent: PropTypes.func.isRequired,
    // 사용자의 화면을 관리하는 Stream
    mainStreamManager: PropTypes.instanceOf(StreamManager).isRequired,
    // 사용자의 Session에 참여하고 있는 Subscriber의 List
    subscribers: PropTypes.arrayOf(PropTypes.instanceOf(StreamManager)).isRequired,
}


export default Chat