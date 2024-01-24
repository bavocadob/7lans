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
  width: 40%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 20px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const WhisperLetter = () => {
  const onChange = () => {};
  const onSubmit = () => {};

  return (
    <Letter onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        placeholder="편지를 작성해주세요"
      />
    </Letter>
  );
};

export default WhisperLetter;
