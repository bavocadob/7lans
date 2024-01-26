import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";
import WhisperFirst from "../../components/volunteer/whisper/WhisperFirst";
import styled from "styled-components";

const MainPanel = styled.div`
  flex: 1;
  border-radius: 0 20px 20px 0;
  background-color: #ffedaa;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const WhisperPage = () => {
  // const testValue = useSele
  const testValue = useSelector((state) => state.test.value);

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
            {/* 사이드패널에서 프로필카드를 누른다면 WhisperFirst페이지가 해당 ID를 가진 WisperLetter 페이지로 이동. */}
            <WhisperFirst />
            {testValue}
          </MainPanel>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <PostIt message={"/volunteer_video_chatting_start"} />
            <PostIt message={"/volunteer_active_doc"} />
            <SelectedPostit message={"/volunteer_whispher"} />
            <PostIt message={"/volunteer_raise_egg"} />
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
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default WhisperPage;
