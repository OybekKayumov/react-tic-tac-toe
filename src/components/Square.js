import React from 'react'

export default function Square(props) {
  return (
    // <button className='btn' onClick={props.onClick}>{props.value}Sq</button>
    // <button className='btn' onClick={props.onClick}>{props.value}</button>
    
    //todo: when we click button, after that we cannot click on this button
    <button className={props.value ? 'btn disabled' : 'btn'} onClick={props.onClick}>{props.value}</button>
  )
}
