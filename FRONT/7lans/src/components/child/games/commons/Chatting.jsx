import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BiCaretDown, BiCaretUp} from 'react-icons/bi'
import { addChat } from '../../../../store/chatSlice';



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
        <div style={{height: '70%', maxHeight: '140px', padding: '3%', marginBottom: '3%', overflowY: 'auto'}}>
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
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
                <div style={{height: '50%', display: 'flex'}}>
                    <div style={{width: '50%', backgroundColor: 'rgb(255, 248, 224)', margin: '5px', border: '5px solid black', borderRadius: '20px'}}></div>
                    <div style={{width: '50%', backgroundColor: 'rgb(255, 248, 224)', margin: '5px', border: '5px solid black', borderRadius: '20px'}}></div>
                </div>
                <div style={{height: '50%', backgroundColor: 'rgb(255, 248, 224)', margin: '5px', border: '5px solid black', borderRadius: '20px'}}>
                    <div className= 'shadow' style={{height: '75%', backgroundColor: 'rgb(255, 255, 255)', margin: '5px', borderRadius: '20px'}}>
                        <button style={{width: '30px', borderRadius: '20px', border: 'none', backgroundColor: 'rgb(255, 215, 3)', margin: '10px'}} onClick={() => setIsChat(!isChat)}><BiCaretDown/></button>
                        {renderChatList()}
                    </div>
                    <div>
                        <input className='shadow' type='text' style={{width: '98%', height: 45, marginLeft: '1%', border: 'none', borderRadius: '20px', padding: '5px'}} onKeyUp={handleChatListByEnter} onChange={(e) => setNowChat(e.target.value)} value={nowChat}></input>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
                <div style={{height: '45%', width: '100%', backgroundColor: 'rgb(255, 248, 224)', margin: '5px', border: '5px solid black', borderRadius: '20px'}}>

                </div>
                <div style={{height: '45%', width: '100%', backgroundColor: 'rgb(255, 248, 224)', margin: '5px', border: '5px solid black', borderRadius: '20px'}}>

                </div>
                <button style={{width: '30px', borderRadius: '20px', border: 'none', backgroundColor: 'rgb(255, 215, 3)', margin: '10px'}} onClick={() => setIsChat(!isChat)}><BiCaretUp/></button>
            </div>
        )
    }
  }

  return (
    renderSidePanel()
  )
}

export default Chat