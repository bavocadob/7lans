import React from "react";
import styled from "styled-components";

const Index = styled.div`
  border: 2px solid green;
  border-radius: 10%;
`;

const IndexToChild = () => {
  return <Index>학생에게 보낼 속닥속닥</Index>;
};

export default IndexToChild;
