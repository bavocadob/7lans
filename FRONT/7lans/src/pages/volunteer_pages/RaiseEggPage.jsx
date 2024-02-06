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

const MainPanel = styled.div`
  flex: 1;
  border-radius: 0 20px 20px 0;
  background-color: #ffedaa;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const ExpBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin-top: 10px;
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #4caf50; /* 채우진 부분의 색상 */
`;

const RaiseEggPage = () => {
  const childInfo = useSelector((state) => state.child.value)
  const childrenInfo = useSelector((state) => state.children.value)
  const userDion = useSelector((state) => state.dino.value)
  const userInfo = useSelector((state) => state.user.value)
  const urlInfo = useSelector((state) => state.url.value)
  const [eggInfo, setEggInfo] = useState(null)
  // const eggInfo = useRef(null)

  console.log(childInfo)
  console.log(childrenInfo)

  useEffect(() => {
    const egg = async () => {
      try {
        const res = await axios.get(`${urlInfo}/egg/${childInfo.relationId}`);
        console.log(res.data)
        // eggInfo.current = res.data
        setEggInfo(res.data)
      } 
      catch (err) {
        console.error(err);
      }
    };
    egg()
  }, [])
  
  const eggClick = () => {
    if (eggInfo.experience === 100) {
      const eggHatch = async () => {
        try {
          const memberId = userInfo.memberId
          const relationId = childInfo.relationId
          const res = await axios.post(`${urlInfo}/dinosaurs/hatch`, {memberId, relationId})
          console.log(res.data)
        }
        catch (err) {
          console.error(err)
        }
      }
      eggHatch()
    }
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
      <NormalNav />
      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "rgb(255, 226, 123)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <CommonSidePanel />

          <MainPanel
            style={{
              width: "90%",
              flex: 1,
              borderRadius: "0 20px 20px 0",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div>
                {childInfo.childName} 학생과의 알
              </div>
              <div style={{display: 'flex'}}>
                <div style={{width: '30%'}}>
                  <img style={{transform: 'scaleX(-1)', height: '30%'}} src={`./dinosourImage/dinosaur${userDion}_basic.png`} alt="" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <div>
                    알에서 뭐가 나올까?
                    추억을 쌓으면 알이 열려요
                  </div>
                  <div>
                    <div>
                      exp: {eggInfo?.experience} %
                      <ExpBar>
                        <FilledExp style={{ width: `${eggInfo?.experience || 0}%` }} />
                      </ExpBar>
                    </div>
                  </div>
                </div>
                <div style={{width: '30%', height: '80%'}}>
                  <img onClick={eggClick} style={{width: '70%', cursor: 'pointer'}} src="./egg_img.png" alt="" />
                </div>
              </div>
            </div>
          </MainPanel>

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
    </div>
  );
};

export default RaiseEggPage;
