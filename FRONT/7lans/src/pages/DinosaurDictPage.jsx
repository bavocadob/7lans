import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DinosaurSidePanel from '../components/side_panels/DinosaurSidePanel';
import { Link } from 'react-router-dom';
import NormalNav from '../components/navs/NormalNav';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeDino } from '../store/dinoSlice';


const DinosaurDictPage = () => {
  const userDino = useSelector((state) => state.dino.value)
  const [userDinosaurList, setUserDinosaurList] = useState('')
  const userInfo = useSelector((state) => state.user.value);
  const [chooseDino, setChooseDino] = useState(userDino)
  const [hasDino , setHasDino] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const userDinosaursList = async () => {
      try {
        const res = await axios.get(`https://i10e103.p.ssafy.io/api/v1/dinosaurs/${userInfo.memberId}`)
        const userDinosaurInfo = res.data.dinosaurs
        const ownedDinosaurs = userDinosaurInfo.filter(dino => dino.owned === true)
        setHasDino(ownedDinosaurs)
        const temp = []
        for (let i = 0; i < ownedDinosaurs.length; i++) {
          temp.push((ownedDinosaurs[i].id))
        }
        setUserDinosaurList([...temp])
      } catch (err) {
        console.error(err)
      }
    }

    userDinosaursList()
  }, [userInfo.memberId])


  const renderChooseDino = (i) => {
    if (hasDino.length > 0) {

      const  renderDino = hasDino.filter(dino => dino.id === i)
      return (
        <div>
          {console.log(renderDino)}
          <p>No.{renderDino[0].id} {renderDino[0].name}</p>
          <p>몸무게: {renderDino[0].weight/100}kg    키: {renderDino[0].height/1000}m</p>
          <hr />
          <p>{renderDino[0].description}</p>
          <button onClick={() => changeMyDino(userInfo.memberId, chooseDino)}>함께하기</button>
        </div>
      )
    }
  }


  const changeMyDino = async (memberId, dinosaurId) => {
    try {
      const res = await axios.put(`https://i10e103.p.ssafy.io/api/v1/dinosaurs/change`, {
        memberId, dinosaurId
      })
      console.log(res)
      representDino(memberId)
    } catch (err) {
      console.error(err)
    }
  }
  
  const representDino = async (id) => {
    try {
      const res = await axios.get(`https://i10e103.p.ssafy.io/api/v1/dinosaurs/myDinosaur/${id}`)
      dispatch(changeDino(res.data.id))
      console.log(res.data.id)
    } catch (err) {
      console.error(err)
    }
  }

  const renderBody = () => {

    const dinoArr = Array.from({ length: 18 }, (_, index) => index + 1)

    return (
      <div style={{display: 'flex', flex: 1, margin: '2rem', border: '5px solid black', borderRadius: '20px'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '65%', height: '100%', backgroundColor: 'rgb(232, 225, 255)', borderRadius: '15px 0 0 15px'}}>
          <div style={{height: '20%'}}>
            <button onClick={() => console.log(userDinosaurList)}>+</button>
            <h3>공룡도감</h3>
            발견한 공룡 수 : {hasDino.length}
          </div>
          <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
            <span style={{border: '5px solid black', borderLeft: 'none', width: '8rem', padding: '0.5rem 0 0.5rem 0', borderRadius: '0 20px 20px 0', textAlign: 'center', fontSize: '25px', backgroundColor: 'rgb(208, 192, 237)', color: 'white', fontWeight: 'bolder'}}>목록</span>
            <div style={{border: '2.5px solid black', width: '100%'}}></div>
          </div>
          <div style={{flex: 1, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
            {dinoArr.map((num, index) => {
              return (
                <img style={{width: '100px', margin: '30px', cursor: 'pointer'}} onClick={() => userDinosaurList.includes(num) && setChooseDino(num)} key={index} src={userDinosaurList.includes(num)? `./dinosourImage/dinosaur${num}_basic.png` : `./dinosourImage/dinosaur${num}_sihouette.png`} alt="" />
              )
            })}
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, borderLeft: '5px solid black', borderRadius: '0 15px 15px 0', backgroundColor: 'rgb(208, 192, 237)'}}>
          <img style={{width: '300px'}} src={`./dinosourImage/dinosaur${chooseDino}_basic.png`} alt="" />
          {renderChooseDino(chooseDino)}
        </div>
      </div>
    )
  }

  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}>
      <NormalNav />
      <div style={{flex: 1, padding: '30px', backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{display: 'flex', height: '100%',borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
          <DinosaurSidePanel />
          {renderBody()}
        </div>
      </div>
    </div>
    </>
  );
};

export default DinosaurDictPage;
