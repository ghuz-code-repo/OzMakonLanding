import React from 'react';

const DebugComponent = ({ name }) => {
  console.log(`DebugComponent: ${name} is rendering`);
  return (
    <div style={{
      background: 'rgba(255, 0, 0, 0.3)',
      padding: '10px',
      margin: '5px',
      border: '2px solid red',
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      DEBUG: {name} компонент отрендерился
    </div>
  );
};

export default DebugComponent;
