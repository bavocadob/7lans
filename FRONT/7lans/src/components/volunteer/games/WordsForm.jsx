import PropTypes from 'prop-types';
import React from "react";
import styled from 'styled-components';

// For outer most wrapper that aligns form in center
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

// For showing form title
const FormTitle = styled.h1`
  margin-top: 4%;
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
`;

// For applying shadow effect
const Shadow = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid rgb(45, 45, 45);
  border-radius: 20px;
  width: 90%;
  flex: 1;
  margin: 2rem;
`;

// For wrapping input fields
const InputFieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(251, 243, 212);
  margin: 3%;
  margin-top: 40px;
  border-radius: 15px;
`;

const InputFieldsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
`;


// For styling each input field
const StyledInput = styled.input`
  border: 3px solid rgb(45, 45, 45);
  border-radius: 10px;
  padding: 5px;
  margin: 0.5rem;
  font-size: 20px;
`;

// For styling submit button
const SubmitButton = styled.button`
  width: 150px;
  height: 60px;
  align-self: center;
  font-weight: bolder;
  font-size: 25px;
  border: none;
  border-radius: 16px;
  background-color: rgb(255, 215, 3);
  margin-bottom: 20px;
`;

// the component itself
const WordsForm = ({submittedWord, setWord1, setWord2, setWord3, setWord4, reset, word1, word2, word3, word4}) => (
  <FormWrapper>
    <FormTitle>&quot;{submittedWord}&quot;을 포함한 문장을 만들어 보아요</FormTitle>
    <Shadow>
      <InputFieldsWrapper>
        <InputFieldsContainer>
          <StyledInput
            type="text"
            placeholder={setWord1 ? '' : '문장을 완성해 주세요'}
            value={word1}
            onChange={(e) => setWord1(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder={setWord2 ? '' : '문장을 완성해 주세요'}
            value={word2}
            onChange={(e) => setWord2(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder={setWord3 ? '' : '문장을 완성해 주세요'}
            value={word3}
            onChange={(e) => setWord3(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder={setWord4 ? '' : '문장을 완성해 주세요'}
            value={word4}
            onChange={(e) => setWord4(e.target.value)}
          />
        </InputFieldsContainer>
      </InputFieldsWrapper>
      <SubmitButton onClick={reset}>제출</SubmitButton>
    </Shadow>
  </FormWrapper>
)

// Prop validation
WordsForm.propTypes = {
  submittedWord: PropTypes.string.isRequired,
  setWord1: PropTypes.func.isRequired,
  setWord2: PropTypes.func.isRequired,
  setWord3: PropTypes.func.isRequired,
  setWord4: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  word1: PropTypes.string.isRequired,
  word2: PropTypes.string.isRequired,
  word3: PropTypes.string.isRequired,
  word4: PropTypes.string.isRequired,
};

export default WordsForm;