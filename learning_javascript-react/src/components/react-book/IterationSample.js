import React, { useState } from 'react'
import './Buttons.css'

const IterationSample = () => {  
  // states
  const [names, setNames] = useState([
    {id: 1, text: '눈사람'},
    {id: 2, text: '얼음'},
    {id: 3, text: '눈'},
    {id: 4, text: '바람'},
  ])  
  const [inputText, setInputText] = useState('')
  const [nextId, setNextId] = useState(5) //새로운 항목을 추가할 때 사용할 id
  const [histories, setHistory] = useState([])

  // method
  const onDelete = id => {
    const nextHistories = histories.concat([names])
    setHistory(nextHistories)
    const nextNames = names.filter( name => name.id !== id )
    setNames(nextNames)
  }

  const nameList = names.map((name) => {
    return (
      <li key={name.id}>
        {name.text} 
        <span className="wrap-btn-editable">
          <button className='btn-delete' onClick={() => onDelete(name.id)}>delete</button>
        </span>
      </li>
      )
  })

  const onChange = e => {
    setInputText(e.target.value)
  }
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText
    })
    setNextId(nextId + 1)
    setNames(nextNames)
    setInputText('')    
  }
  const onKeyDown = e => {
    (e.key === 'Enter') && onClick()
  }
  const onHistoryBack = () => {
    console.log(histories)
    setNames(histories[histories.length - 1])
    setHistory(histories.filter(history => history !== histories[histories.length - 1]))
  }

  return (
    <main>
      <input value={inputText} onChange={onChange} onKeyDown={onKeyDown}/>
      <button onClick={onClick} className='btn-block'>리스트 추가</button>
      <ul className='list-editable'>
        {nameList}
      </ul>
      {histories.length > 0 && <button onClick={onHistoryBack} className='btn-block'>되돌리기</button>}      
    </main>
  )
}

export default IterationSample