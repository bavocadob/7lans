import React from "react";
import styled from "styled-components";

const Letter = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #060606;
  background-color: #f9f8f8;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px; /* 플레이스홀더 글자 크기 수정 */
  }
  &:focus {
    outline: none;
    border-color: #1df095;
  }
`;

const WhisperLetterToChild = () => {
  const onChange = () => {};
  const onSubmit = () => {};

  return (
    <Letter onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        placeholder="편지를 작성해 주세요"
      />
    </Letter>
  );
};

export default WhisperLetterToChild;
