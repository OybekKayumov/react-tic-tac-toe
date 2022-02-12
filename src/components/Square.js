import React from 'react'

export default function Square(props) {
  return (
    <button className='btn' onClick={props.onClick}>{props.value}Sq</button>
  )
}
