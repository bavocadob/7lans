import React, { useState } from 'react';

const Gugudan = () => {
  const [dan, setDan] = useState('none');

  const renderSpan = (danValue) => {
    return (
      <span
        style={{
          width: '10%',
          cursor: 'pointer',
          margin: '5%',
          fontSize: '30px',
          fontWeight: 'bold',
          transition: 'color 0.3s', // Added transition for a smooth effect
          color: dan === danValue ? 'blue' : 'black', // Highlight the selected dan
        }}
        onClick={() => setDan(danValue)}
      >
        {danValue}단
      </span>
    );
  };

  const danArray = Array.from({ length: 10 }, (_, index) => index + 1);

  const renderGugudan = () => {
    
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <h1 style={{ marginTop: '4%', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black' }}>
        몇 단을 출제하실 건가요??
      </h1>
      <div
        className='shadow'
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '5px solid black',
          borderRadius: '20px',
          width: '90%',
          flex: 1,
          margin: '2rem',
          backgroundColor: 'rgb(255, 250, 233)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgb(251, 243, 212)',
            height: '70%',
            margin: '3%',
            borderRadius: '10px',
            border: '5px solid black',
          }}
        >
          {danArray.map((danValue) => renderSpan(danValue))}
        </div>
        <button className='shadow' style={{width: '150px', alignSelf: 'center', fontWeight: 'bolder', fontSize: '20px', border: 'none', borderRadius: '20px', backgroundColor: 'rgb(255, 215, 3)'}}>선택 완료</button>
      </div>
    </div>
  );
};

export default Gugudan;
