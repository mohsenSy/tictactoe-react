import '../css/square.css';
import React from 'react';

function Square(props) {
  return (
    <button className='btn btn-outline-primary square'
      onClick={props.onClick}
    >
    {props.value}
    </button>
  );
}

export default Square;
