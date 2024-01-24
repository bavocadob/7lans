import React from "react";
import styled from "styled-components";
import DateTime from "../../components/volunteer/whisper/DateTime";
import Title from "../../components/volunteer/whisper/Title";
import Index from "../../components/volunteer/whisper/Index";
import Wheather from "../../components/volunteer/whisper/Wheather";
import WhisperLetter from "../../components/volunteer/whisper/WhisperLetter";

const WhisperPage = () => {
  return (
    <>
      <DateTime />
      <Title />
      <Index />
      <WhisperLetter />

      <div>
        <Wheather />
      </div>
    </>
  );
};

export default WhisperPage;
