import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'
import styled, { ThemeProvider } from 'styled-components';
import NormalNav from '../navs/NormalNav';
import CommonSidePanel from '../side_panels/CommonSidePanel';


const pink = 'pink';
const brown = 'brown';
const green = 'green';

const theme = {
  color: {
    pink: pink,
    brown: brown,
    green: green,
  },
};

const StyledCalendarNavigation = styled.div`
  background: ${({ theme }) => theme.color.pink};
  border-bottom: 4px solid ${({ theme }) => theme.color.brown};
  height: 90px;
  border-radius: 20px 20px 0 0;

  span {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.green};
  }

  button:disabled {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
  }

  button:enabled:hover,
  button:enabled:focus {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
  }
`;
// const ReactCalendar = () => {
//   const [value, onChange] = useState(new Date());

//   return (
//     <ThemeProvider theme={theme}>
//       <StyledCalendarNavigation>
//         <Calendar onChange={onChange} value={value} />
//       </StyledCalendarNavigation>
//     </ThemeProvider>
//   );
// };

// export default ReactCalendar;





// // 두번째 캘린더
// const yellow = yellow
// const green = green
// const brown = brown

// const theme = {
//   color: {
//     'yellow': yellow,
//     'brown': brown,
//     'green': green,
//   },
// };

// console.log(theme)

// const StyledCalendarNavigation = styled.div`
//   background: ${({ theme }) => theme.color.yellow};
//   border-bottom: 4px solid ${({ theme }) => theme.color.green};
//   height: 90px;
//   border-radius: 20px 20px 0 0;

//   span {
//     font-size: 24px;
//     font-weight: 600;
//     color: ${({ theme }) => theme.color.green};
//   }
// `;

// const StyledCalendarButton = styled.button`
//   background-color: ${({ theme }) => theme.color.yellow};
//   border-radius: 20px 20px 0 0;

//   &:disabled {
//     background-color: ${({ theme }) => theme.color.yellow};
//     border-radius: 20px 20px 0 0;
//   }

//   &:enabled:hover,
//   &:enabled:focus {
//     background-color: ${({ theme }) => theme.color.yellow};
//     border-radius: 20px 20px 0 0;
//   }
// `;



// const ReactCalendar = () => {
//   const [value, onChange] = useState(new Date());

//   return (
//     <StyledCalendarNavigation>
//       <StyledCalendarButton disabled>Styled Calendar Button</StyledCalendarButton>
//       <Calendar onChange={onChange} value={value} />
//     </StyledCalendarNavigation>
//   );
// };

// export default ReactCalendar;




// 첫번째 캘린더
// const ReactCalendar = () => {
//   const [value, onChange] = useState(new Date());
//   return (
//     <div>
//       <Calendar onChange={onchange} value={value} />
//     </div>
//   )
// }

// export default ReactCalendar


const StyledCommonSidePanel = styled.div`
  background-color: lightblue;

`;


const FlexContainer = styled.div`
  display: flex;
`;

// 세번째 캘린더 
const ReactCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초기값 = 현재 날짜

  return (
    <div>
      <NormalNav />
      <div>
      <ThemeProvider theme={theme}>
        <FlexContainer>
          <StyledCommonSidePanel />
          <StyledCalendarNavigation>
            <Calendar onChange={onChange} value={value} />
          </StyledCalendarNavigation>
        </FlexContainer>
      </ThemeProvider>
    </div>
    </div>
  );
}

export default ReactCalendar