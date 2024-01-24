import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import styled, { ThemeProvider } from 'styled-components';

// 두번째 캘린더
// const theme = {
//   color: {
//     'yellow': yellow,
//     'brown': brown,
//   },
// };

// console.log(theme)

// const StyledCalendarNavigation = styled.div`
//   background: ${({ theme }) => theme.color.yellow};
//   border-bottom: 4px solid ${({ theme }) => theme.color.brown};
//   height: 90px;
//   border-radius: 20px 20px 0 0;

//   span {
//     font-size: 24px;
//     font-weight: 600;
//     color: ${({ theme }) => theme.color.brown};
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
//       <span>Styled Calendar Navigation</span>
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


// 세번째 캘린더 
const ReactCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar