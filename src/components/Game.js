import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useReducer } from 'react';
import Board from './Board';

const reducer = (state, action) => {
  switch( action.type) {
    case 'JUMP':
      return{...state,
      xIsNext: action.payload.step%2 === 0,
      history: state.history.slice(0, action.payload.step +1),
    };
    case 'MOVE': return {...state, history: state.history.concat({
      squares: action.payload.squares,
    }),
    xIsNext: !state.xIsNext,
    };
    default: 
      return state;
  }
}

export default function Game() {
  //reducer
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{squares: Array(9).fill(null)}]
  });
  const {xIsNext, history} = state;
  
  const jumpTo = (step) => {
    dispatch({type: 'JUMP', payload: {step} })

  }

  // handle click index (i) of square 
  const handleClick = (i) => {
    const current = history[history.length -1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {  // should not continue when we have winner or square is occupied
      return;
    } 
    // continue game
    squares[i] = xIsNext ? 'X' : '0';
    dispatch({type: 'MOVE', payload:{squares}});
  }

  const current = history[history.length -1];
  const winner = calculateWinner(current.squares);

  // const status = "Next player is X";
  const status = winner ? winner === 'D' ? 'Draw' : "Winner is " + '"' + winner + '"' : ' Next player is ' + (xIsNext ? 'X' : 'O'); // if it is true, put X,  otherwise put 'O'

  // const moves = ( <li><button>Start the Game</button></li> );
  // make real

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to #' + move : 'Start the Game';
    return <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {desc}
              </button>
            </li>
  })
  // const squares = Array(9).fill(null);

  return (
    // <div className='game'>
    //todo after winner, buttons should be disabled
    
    <div className={winner ? 'game disabled' : 'game' }>
      <div className='game-board'>
        {/* <Board squares={squares}></Board> */}
        <Board onClick={(i) => handleClick(i)} squares={current.squares}></Board>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ul>{moves}</ul>

      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  // return null;

  // if a player occupy this lines, he is a winner
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = true;
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] ) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c] ) { // if square index a b c are null there is no draw
      isDraw = false // continue 
    }
  }
  if (isDraw) return 'D';
  return null;  // there is no winner and no Draw
};