import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";
import EggFirst from "../../components/volunteer/eggs/EggsFirst";
import WhisperLetter from "../../components/volunteer/whisper/WhisperLetter";
import styled from "styled-components";
import axios from "axios";
import { tr } from "date-fns/locale";
import getEnv from "../../utils/getEnv";
import { Button, Modal, Form, Image } from "react-bootstrap";
import Audio from "../../components/Audio";

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
  padding-left: 55px;
`;
const ExpBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(255, 183, 58, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  border: 3px solid rgba(45,45,45);
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 9px;
  background-color: rgb(255, 183, 58, 0.9); /* 채우진 부분의 색상 */
`;

const RaiseEggPage = () => {
  const childInfo = useSelector((state) => state.child.value);
  const childrenInfo = useSelector((state) => state.children.value);
  const userDion = useSelector((state) => state.dino.value);
  const userInfo = useSelector((state) => state.user.value);
  const urlInfo = getEnv("API_URL");
  const [eggInfo, setEggInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [newEgg, setNewEgg] = useState(null);
  const [dinoState, setdinoState] = useState(false); //기본 상태, true == 행복한 상태 출력
  // const eggInfo = useRef(null)

  console.log(childInfo);
  console.log(childrenInfo);

  useEffect(() => {
    const egg = async () => {
      try {
        const res = await axios.get(`${urlInfo}/egg/${childInfo.relationId}`);
        console.log(res.data);
        // eggInfo.current = res.data
        setEggInfo(res.data);
      } catch (err) {
        console.error(err);
        console.log('egg엑시오스 에러')
      }
    };
    egg();
  }, []);

  const renderModal = () => {
    if (eggInfo?.childCheck === false && eggInfo?.volunteerCheck === true) {
      //아이는 아직 알을 안깐 경우
      return (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Dialog style={{ height: "100%", marginTop: "3rem" }}>
            <Modal.Header closeButton>
              <Modal.Title>
                {childInfo.childName} 학생이 아직 알을 열어보지 않았어요.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Image
                  type="image"
                  src={`./dinosourImage/dinosaur${userDion}_sad.png`}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "space-between" }}>
              <Button variant="secondary" onClick={() => setShow(false)}>
                확인
              </Button>
              {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      );
    } else if (eggInfo?.experience !== 100) {
      //경험치가 100이 아닌 경우
      return (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Dialog style={{ height: "100%", marginTop: "3rem" }}>
            <Modal.Header closeButton>
              <Modal.Title>
                아직 경험치가 {eggInfo?.experience || 0} % 에요.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Image
                  type="image"
                  src={`./dinosourImage/dinosaur${userDion}_sad.png`}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "space-between" }}>
              <Button variant="secondary" onClick={() => setShow(false)}>
                확인
              </Button>
              {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      );
    } else {
      return (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Dialog style={{ height: "100%", marginTop: "3rem" }}>
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
            <Modal.Footer style={{ justifyContent: "space-between" }}>
              <Button variant="secondary" onClick={() => setShow(false)}>
                확인
              </Button>
              {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      );
    }
  };

  const eggClick = () => {
    const eggHatch = async () => {
      try {
        const memberId = userInfo.memberId;
        const relationId = childInfo.relationId;
        const res = await axios.post(`${urlInfo}/dinosaurs/hatch`, {
          memberId,
          relationId,
        });
        console.log(res.data);
        setNewEgg(res.data);
        setShow(true);
      } catch (err) {
        console.error(err);
      }
    };
    eggHatch();
  };

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
          <CommonSidePanel />

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
                style={{ width: "140px", height: "150px", cursor: "pointer" }}
                src="./egg_img.png"
                alt=""
              />
              {!dinoState && (
                <img
                  style={{
                    // transform: "scaleX(-1)",
                    height: "300px",
                  }}
                  src={`./dinosourImage/dinosaur${userDion}_basic.png`}
                  alt=""
                />
              )}
              {dinoState && (
                <img
                  style={{
                    // transform: "scaleX(-1)", //사진 좌우반전
                    height: "300px",
                  }}
                  src={`./dinosourImage/dinosaur${userDion}_happy.png`}
                  alt=""
                />
              )}
              <div>
                <Audio dinoState={dinoState} setdinoState={setdinoState} />
              </div>
            </RowBox3>
          </RightSide>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <PostIt message={"/volunteer_video_chatting_start"} />
            <PostIt message={"/volunteer_active_doc"} />
            <PostIt message={"/volunteer_whispher"} />
            <SelectedPostit message={"/volunteer_raise_egg"} />
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

export default RaiseEggPage;
