import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";
import ActiveDocs from "../../components/volunteer/active_docs/AcitveDocs";
import ActivityCalendar from "../../components/volunteer/calendar/ActivityCalendar";

const ActiveDoc = () => {
  return (
    <>
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
            <div
              style={{
                width: "90%",
                flex: 1,
                borderRadius: "0 20px 20px 0",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            >
              {/* 활동일지 */}
              {/* <ActiveDocs /> */}
              <ActivityCalendar/>
            </div>
            <div
              style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}
            >
              <PostIt message={"/volunteer_video_chatting_start"} />
              <SelectedPostit message={"/volunteer_active_doc"} />
              <PostIt message={"/volunteer_whispher"} />
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
          ></div>
        </div>
      </div>
    </>
  );
};

export default ActiveDoc;
