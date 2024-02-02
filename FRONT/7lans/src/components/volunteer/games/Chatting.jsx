import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'
import { addChat } from '../../../store/chatSlice';

const Chat = () => {

  const [isChat, setIsChat] = useState(true)
  const [nowChat, setNowChat] = useState('')

  const dispatch = useDispatch()

  const chatList = useSelector((state) => state.chat.value)

  const handleChatListByEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        dispatch(addChat(nowChat) || '')
        setNowChat('')
        }
    }

  const renderChatList = () => {
    return(
        // 채팅리스트 보이는 화면 div
        <div style={{height: '70%', 
                    maxHeight: '270px', 
                    padding: '3%', 
                    marginBottom: '3%', 
                    overflowY: 'auto'}}>
            {chatList.map((chat, index) => (
                <p key={index}>
                    {chat}
                </p>
            ))}
        </div>
    )
  }

  const renderSidePanel = () => {
    if (isChat) {
        return(
            <div style={{height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        padding: '1rem'}}>
                <div style={{height: '50%', display: 'flex'}}>
                    {/* 얼굴 보이는 화상화면 1 */}
                    <div style={{width: '50%', 
                                backgroundColor: 'rgb(255, 248, 224)', 
                                margin: '5px', 
                                border: '5px solid rgb(45, 45, 45)', 
                                borderRadius: '20px'}}>
                    </div>
                    {/* 얼굴 보이는 화상화면 2 */}
                    <div style={{width: '50%',
                                backgroundColor: 'rgb(255, 248, 224)', 
                                margin: '5px', 
                                border: '5px solid rgb(45, 45, 45)',
                                borderRadius: '20px'}}>
                    </div>
                </div>
                <div style={{height: '60%', 
                            backgroundColor: 'rgb(255, 248, 224)', 
                            margin: '5px', 
                            border: '5px solid rgb(45, 45, 45)', 
                            borderRadius: '20px'}}>
                    {/* 채팅 보이는 창 */}
                    <div className= 'shadow' 
                            style={{height: '70%', 
                                    width: '95%', 
                                    backgroundColor: 'rgb(255, 255, 255)', 
                                    margin: '5px', 
                                    marginLeft: '2.5%',
                                    marginTop: '1em',
                                    borderRadius: '20px',
                                    border: '0.2px solid'}}>
                        <button style={{width: '30px', 
                                        borderRadius: '20px', 
                                        border: 'none', 
                                        backgroundColor: 'rgb(255, 215, 3)', 
                                        margin: '10px'}} 
                                        onClick={() => setIsChat(!isChat)}>
                                {/* 채팅 닫기 버튼 */}
                                <BiCaretDown/>
                        </button>
                        {renderChatList()}
                    </div>
                    <div>
                        {/* 채팅 입력 창 */}
                        <input className='shadow' type='text' 
                                style={{width: '95%', 
                                        // height: 45,
                                        marginLeft: '2.5%',
                                        marginTop: '1%', 
                                        border: 'none', 
                                        borderRadius: '20px', 
                                        padding: '15px',
                                        border: '0.2px solid'
                                        }} 
                                onKeyUp={handleChatListByEnter}
                                placeholder="채팅 내용을 입력하세요"
                                onChange={(e) => setNowChat(e.target.value)} 
                                value={nowChat}></input>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
                <div style={{height: '45%', 
                            width: '100%', 
                            backgroundColor: 'rgb(255, 248, 224)', 
                            margin: '5px', 
                            border: '5px solid rgb(45, 45, 45)', 
                            borderRadius: '20px'}}>

                </div>
                <div style={{height: '45%', 
                            width: '100%', 
                            backgroundColor: 'rgb(255, 248, 224)', 
                            margin: '5px', 
                            border: '5px solid rgb(45, 45, 45)', 
                            borderRadius: '20px'}}>

                </div>
                <button style={{width: '30px', 
                                borderRadius: '20px', 
                                border: 'none', 
                                backgroundColor: 'rgb(255, 215, 3)', 
                                margin: '10px'}} 
                        onClick={() => setIsChat(!isChat)}><BiCaretUp/></button>
            </div>
        )
    }
  }

  return (
    renderSidePanel()
  )
}

export default Chat