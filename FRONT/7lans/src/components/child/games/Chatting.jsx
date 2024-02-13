import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {BiCaretDown, BiCaretUp} from 'react-icons/bi';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import {Flipper, Flipped} from 'react-flip-toolkit';
import {addChat} from '../../../store/chatSlice';
import './Chatting.css';


// Extracted common styles
const commonDivStyles = {
    backgroundColor: 'rgb(255, 248, 224)',
    margin: '5px',
    border: '5px solid rgb(45, 45, 45)',
    borderRadius: '20px',
    height: '182px'
};


const ChatInput = styled.input`
    width: 95%;
    margin-left: 2.5%;
    margin-top: 1%;
    border-radius: 20px;
    padding: 15px;
    border: 2px solid;
    box-shadow: 1px 1px 1px rgb(45,45,45);
`;

const ChattingBox = styled.div`
    background-color: rgb(255, 248, 224);
    margin: 5px;
    border: 5px solid rgb(45, 45, 45);
    border-radius: 20px;
    height: 400px;
`

const Chat = () => {
    const [isChatVisible, setIsChatVisible] = useState(true)
    const [chatInput, setChatInput] = useState("");
    const dispatch = useDispatch();

    const direction = isChatVisible ? 'row' : 'column';
    const basis = isChatVisible ? '30%' : '100%';

    const chatList = useSelector((state) => state.chat.value)

    const handleChatSubmission = event => {
        if (event.key === 'Enter' && chatInput.trim() !== "") {
            dispatch(addChat(chatInput));
            setChatInput("");
        }
    };


    const ChatList = () => (
        <div style={{height: '70%', maxHeight: '270px', padding: '3%', marginBottom: '3%', overflowY: 'auto'}}>
            {chatList.map((chat, index) => (
                <p key={index}>
                    {chat}
                </p>
            ))}
        </div>
    )

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '1rem'}}>
            {/*  비디오 컴포넌트 영역 */}
            <div className="video-panel" style={{height: '200px', width: '500px'}}>
                <Flipper flipKey={direction}>
                    <div style={{height: '100%', display: "flex", flexDirection: direction}}>
                        <Flipped flipId="content">
                            <div style={{...commonDivStyles, flexGrow: 1}}/>
                        </Flipped>
                        <Flipped flipId="content">
                            <div style={{...commonDivStyles, flexGrow: 1}}/>
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
                <ChattingBox>
                    <div className='shadow'
                         style={{
                             height: '75%',
                             width: '95%',
                             backgroundColor: 'rgb(255, 255, 255)',
                             margin: '5px',
                             marginLeft: '2.5%',
                             marginTop: '1em',
                             borderRadius: '15px',
                             border: '2px solid'
                         }}>
                        {/* <button style={{
                            width: '30px', borderRadius: '20px', border: 'none',
                            backgroundColor: 'rgb(255, 215, 3)', margin: '10px'
                        }}
                                onClick={() => setIsChatVisible(!isChatVisible)}>
                            <BiCaretDown/>
                        </button> */}
                        <ChatList/>
                    </div>
                    <div>
                        <ChatInput
                            placeholder="채팅 내용을 입력하세요"
                            onKeyUp={handleChatSubmission}
                            onChange={event => setChatInput(event.target.value)}
                            value={chatInput}
                        />
                    </div>
                </ChattingBox>
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

export default Chat