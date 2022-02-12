import React from 'react';
import Board from './Board';

export default function Game() {
  const status = "Next player is X";
  const moves = ( <li><button>Start the Game</button></li> );
  const squares = Array(9).fill(null);

  return (
    <div>
      <div className='gameBoard'>
        <Board squares={squares}></Board>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ul>{moves}</ul>

      </div>
    </div>
  )
}
