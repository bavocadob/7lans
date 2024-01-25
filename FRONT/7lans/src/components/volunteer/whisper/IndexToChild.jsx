import React from "react";
import styled from "styled-components";

const Index = styled.div`
  background-color: #7aff7a;
  border-radius: 10%;
  align-content: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const IndexToChild = () => {
  return <Index>학생이 보내온 속닥속닥</Index>;
};

export default IndexToChild;
