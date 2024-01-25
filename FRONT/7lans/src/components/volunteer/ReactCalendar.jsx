// import React, { useState } from 'react'
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'
// import './Calendar.css'
// import styled, { ThemeProvider } from 'styled-components';
// import NormalNav from '../navs/NormalNav';
// import CommonSidePanel from '../side_panels/CommonSidePanel';


// const pink = 'pink';
// const brown = 'brown';
// const green = 'green';

// const theme = {
//   color: {
//     pink: pink,
//     brown: brown,
//     green: green,
//   },
// };

// const StyledCalendarNavigation = styled.div`
//   background: ${({ theme }) => theme.color.pink};
//   border-bottom: 4px solid ${({ theme }) => theme.color.brown};
//   height: 90px;
//   border-radius: 20px 20px 0 0;

//   span {
//     font-size: 24px;
//     font-weight: 600;
//     color: ${({ theme }) => theme.color.green};
//   }

//   button:disabled {
//     background-color: ${({ theme }) => theme.color.pink};
//     border-radius: 20px 20px 0 0;
//   }

//   button:enabled:hover,
//   button:enabled:focus {
//     background-color: ${({ theme }) => theme.color.pink};
//     border-radius: 20px 20px 0 0;
//   }
// `;
// // const ReactCalendar = () => {
// //   const [value, onChange] = useState(new Date());

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <StyledCalendarNavigation>
// //         <Calendar onChange={onChange} value={value} />
// //       </StyledCalendarNavigation>
// //     </ThemeProvider>
// //   );
// // };

// // export default ReactCalendar;





// // // 두번째 캘린더
// // const yellow = yellow
// // const green = green
// // const brown = brown

// // const theme = {
// //   color: {
// //     'yellow': yellow,
// //     'brown': brown,
// //     'green': green,
// //   },
// // };

// // console.log(theme)

// // const StyledCalendarNavigation = styled.div`
// //   background: ${({ theme }) => theme.color.yellow};
// //   border-bottom: 4px solid ${({ theme }) => theme.color.green};
// //   height: 90px;
// //   border-radius: 20px 20px 0 0;

// //   span {
// //     font-size: 24px;
// //     font-weight: 600;
// //     color: ${({ theme }) => theme.color.green};
// //   }
// // `;

// // const StyledCalendarButton = styled.button`
// //   background-color: ${({ theme }) => theme.color.yellow};
// //   border-radius: 20px 20px 0 0;

// //   &:disabled {
// //     background-color: ${({ theme }) => theme.color.yellow};
// //     border-radius: 20px 20px 0 0;
// //   }

// //   &:enabled:hover,
// //   &:enabled:focus {
// //     background-color: ${({ theme }) => theme.color.yellow};
// //     border-radius: 20px 20px 0 0;
// //   }
// // `;



// // const ReactCalendar = () => {
// //   const [value, onChange] = useState(new Date());

// //   return (
// //     <StyledCalendarNavigation>
// //       <StyledCalendarButton disabled>Styled Calendar Button</StyledCalendarButton>
// //       <Calendar onChange={onChange} value={value} />
// //     </StyledCalendarNavigation>
// //   );
// // };

// // export default ReactCalendar;




// // 첫번째 캘린더
// // const ReactCalendar = () => {
// //   const [value, onChange] = useState(new Date());
// //   return (
// //     <div>
// //       <Calendar onChange={onchange} value={value} />
// //     </div>
// //   )
// // }

// // export default ReactCalendar


// const StyledCommonSidePanel = styled.div`
//   background-color: lightblue;

// `;


// const FlexContainer = styled.div`
//   display: flex;
// `;

// // 세번째 캘린더 
// const ReactCalendar = () => {
//   const [value, onChange] = useState(new Date()); // 초기값 = 현재 날짜

//   return (
//     <div>
//       <NormalNav />
//       <div>
//       <ThemeProvider theme={theme}>
//         <FlexContainer>
//           <StyledCommonSidePanel />
//           <StyledCalendarNavigation>
//             <Calendar onChange={onChange} value={value} />
//           </StyledCalendarNavigation>
//         </FlexContainer>
//       </ThemeProvider>
//     </div>
//     </div>
//   );
// }

// export default ReactCalendar


import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const ReactCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};

export default ReactCalendar;