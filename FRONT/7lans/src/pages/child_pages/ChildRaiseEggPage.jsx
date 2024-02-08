import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChildCommonSidePanel from "../../components/side_panels/ChildCommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import EggFirst from "../../components/volunteer/eggs/EggsFirst";
import WhisperLetter from "../../components/volunteer/whisper/WhisperLetter";
import styled from "styled-components";
import axios from "axios";
import { tr } from "date-fns/locale";
import getEnv from "../../utils/getEnv";
import { Button, Modal, Form, Image } from "react-bootstrap";
import Audio from "../../components/Audio"
import ChildPostit from "../../components/volunteer/post_it/ChildPostit";
import SelectedChildPostit from "../../components/volunteer/post_it/SelectedChildPostit";

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255, 255, 255, 0.5);
`;

const RowBox1 = styled.div`
  width: 90%;
  height: 5%;
  font-size: 30px;
  font-weight: bold;
  margin-top: 3%;
`;

const RowBox2 = styled.div`
  width: 90%;
  height: 20%;
  font-size: 30px;
  font-weight: bold;
  margin-top: 3%;
`;

const RowBox3 = styled.div`
  width: 90%;
  height: 50%;
  font-size: 20px;
  display: flex;
  align-items: end;
`
const ExpBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(255, 183, 58, 0.5);
  border-radius: 10px;
  margin-top: 10px;
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 40px;
  background-color: rgb(255, 183, 58, 0.8); /* 채우진 부분의 색상 */
`;


const ChildRaiseEggPage = () => {
  const volInfo = useSelector((state) => state.vol.value)
  const volsInfo = useSelector((state) => state.vols.value)
  const userDion = useSelector((state) => state.dino.value)
  const userInfo = useSelector((state) => state.user.value)
  const urlInfo = getEnv('API_URL');
  const [eggInfo, setEggInfo] = useState(null)
  const [show, setShow] = useState(false)
  const [newEgg, setNewEgg] = useState(null)
  const [dinoState, setdinoState] = useState(false) //기본 상태, true == 행복한 상태 출력
  // const eggInfo = useRef(null)

  useEffect(() => {
    const egg = async () => {
      try {
        const res = await axios.get(`${urlInfo}/egg/${volInfo.relationId}`);
        console.log(res.data);
        // eggInfo.current = res.data
        setEggInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    egg()
  }, [])
  
  const renderModal = () => {
    if (eggInfo?.volunteerCheck === false && eggInfo?.childCheck === true) {
      //아이는 아직 알을 안깐 경우
      return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        >
          <Modal.Dialog style={{height: '100%', marginTop:'3rem'}}>
          <Modal.Header closeButton>
            <Modal.Title>{volInfo.volunteerName} 선생님이 아직 알을 열어보지 않았어요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Image
                type="image"
                src={`./dinosourImage/dinosaur${userDion}_sad.png`}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: 'space-between'}}>
            <Button variant="secondary" onClick={() => setShow(false)}>
              확인
            </Button>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )
    }
    else if (eggInfo?.experience !== 100) {
      //경험치가 100이 아닌 경우
      return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        >
          <Modal.Dialog style={{height: '100%', marginTop:'3rem'}}>
          <Modal.Header closeButton>
            <Modal.Title>아직 경험치가 {eggInfo?.experience || 0} % 에요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Image
                type="image"
                src={`./dinosourImage/dinosaur${userDion}_sad.png`}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: 'space-between'}}>
            <Button variant="secondary" onClick={() => setShow(false)}>
              확인
            </Button>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )
    }
    else {
      return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        >
          <Modal.Dialog style={{height: '100%', marginTop:'3rem'}}>
          <Modal.Header closeButton>
            <Modal.Title>나와 함께 하게 된걸 축하해!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Image
                type="image"
                src={`./dinosourImage/dinosaur${newEgg?.id}_basic.png`}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: 'space-between'}}>
            <Button variant="secondary" onClick={() => setShow(false)}>
              확인
            </Button>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )
    }
  } 

  const eggClick = () => {

    const eggHatch = async () => {
      try {
        const memberId = userInfo.memberId
        const relationId = volInfo.relationId
        const res = await axios.post(`${urlInfo}/dinosaurs/hatch`, {memberId, relationId})
        console.log(res.data)
        setNewEgg(res.data)
        setShow(true)
      }
      catch (err) {
        console.error(err)
      }
    }
    eggHatch()
    
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {console.log(eggInfo)}
      {console.log("이거")}
      <NormalNav />
      <div style={{ marginTop: "5.7%" }}></div>
      <div
        style={{
          height: "650px",
          padding: "30px",
          paddingBottom: "20px",
          backgroundColor: "rgb(255, 226, 123)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <ChildCommonSidePanel />

          <RightSide>
            <RowBox2>
              <p>알에서 뭐가 나올까? 추억을 쌓으면 알이 열려요</p>
              <div>
                exp: {eggInfo?.experience || 0} %
                <ExpBar>
                  <FilledExp
                    style={{ width: `${eggInfo?.experience || 0}%` }}
                  />
                </ExpBar>
              </div>
            </RowBox2>
            <RowBox3>
               <img
                onClick={eggClick}
                style={{ width: "140px",height: "150px", cursor: "pointer" }}
                src="./egg_img.png"
                alt=""
              />
              {!dinoState && (
              <img
                style={{ 
                    // transform: "scaleX(-1)", 
                    height: "300px" }}
                src={`./dinosourImage/dinosaur${userDion}_basic.png`}
                alt=""
              />
              )}
              {dinoState && (
              <img
                style={{ 
                    // transform: "scaleX(-1)", //사진 좌우반전
                    height: "300px" }}
                src={`./dinosourImage/dinosaur${userDion}_happy.png`}
                alt=""
              />
              )}
             {/* <div>여기 말하는 톰!</div> */}
             <Audio
              dinoState={dinoState}
              setdinoState={setdinoState}
             />
            </RowBox3>
          </RightSide>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <ChildPostit message={"/child_video_chatting_start"} />
            <ChildPostit message={"/child_whispher"} />
            <SelectedChildPostit message={"/child_raise_egg"} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: "2%",
            top: "10rem",
          }}
        ></div>
      </div>
      {renderModal()}
    </div>
  );
};

export default ChildRaiseEggPage;
