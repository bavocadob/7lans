import React from 'react'

import styled from 'styled-components';

// Styled components
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 250, 231);
    width: 90%;
    height: 93%;
    border-radius: 20px;
    border: 5px solid rgb(45, 45, 45);
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4%;
`;

const InputTitle = styled.span`
  font-size: 50px;
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
  margin-right: 10px;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  padding: 0 10px 0 10px;
  width: 500px;
  border: none;
  border-radius: 10px;
  background-color: rgb(255, 250, 231);
  margin-top: 12px;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 65%;
  width: 100%;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  height: 90%;
  background-color: rgb(251, 243, 212);
  border: 5px solid rgb(45, 45, 45);
  border-radius: 10px;
  margin: 30px;
`;

const StyledButton = styled.button`
  font-size: 200px;
  margin: 0 45px 0 45px;
  border: none;
  font-weight: bolder;
  background-color: rgb(251, 243, 212);
  color: ${props => props.isSelected ? 'rgb(240, 165, 8)' : 'rgb(45, 45, 45)'};
`;

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

/* More styled components... */

function QuizProblemSetup({ans, setAns, nowProblem, setNowProblem, submitProblem}) {
    return (
        <Container>
            <InnerContainer>
                <InputContainer>
                    <InputTitle>문제 :</InputTitle>
                    <StyledInput
                        type="text"
                        placeholder='문제를 입력하고 답을 선택해주세요'
                        onChange={(e) => setNowProblem(e.target.value)}
                        value={nowProblem}
                    />
                </InputContainer>

                <ChoiceContainer>
                    <OptionContainer>
                        <StyledButton isSelected={ans === 'O'} onClick={() => setAns('O')}>
                            O
                        </StyledButton>
                    </OptionContainer>

                    <OptionContainer>
                        <StyledButton isSelected={ans === 'X'} onClick={() => setAns('X')}>
                            X
                        </StyledButton>
                    </OptionContainer>
                </ChoiceContainer>

                <SubmitButton onClick={submitProblem}>
                    입력 완료
                </SubmitButton>
            </InnerContainer>
        </Container>
    );
}

export default QuizProblemSetup;