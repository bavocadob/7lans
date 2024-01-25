import React from "react";
import styled from "styled-components";

const WheaterDiv = styled.div`
  text-align: center;
  align-content: center;
`;

const Weather = () => {
  return (
    <WheaterDiv>
      <span role="img" aria-label="날씨">
        그때의 날씨 ☀️
      </span>{" "}
      {/* 날씨 이모티콘 */}
    </WheaterDiv>
  );
};

export default Weather;
