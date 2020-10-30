import React, { useState } from 'react';

const Say = () => {
  const [text, setText] = useState('오!.');
  const onClickEnter = () => setText('안녕하세요!');
  const onClickLeave = () => setText('안녕히 가세요!');

  const [color, setColor] = useState('black')
  return(
    <main>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h2 style={{color}}>{text}</h2>      
      <button style={{color: 'red'}} onClick={() => setColor('red')}>빨간색</button>
      <button style={{color: 'green'}} onClick={() => setColor('green')}>초록색</button>
      <button style={{color: 'blue'}} onClick={() => setColor('blue')}>파란색</button>
      {/* 이렇게 되어야 하는거 아닌가.
      color는 그저 string일 뿐 아닌가.
      왜 위 구문은 정상 작동 하는가.
      <h2 style={{'color': color}}>{text}</h2>      
      <button style={{'color': 'red'}} onClick={() => setColor('red')}>빨간색</button>
      <button style={{'color': 'green'}} onClick={() => setColor('green')}>초록색</button>
      <button style={{'color': 'blue'}} onClick={() => setColor('blue')}>파란색</button> */}
    </main>
  )
}

export default Say