import React, { useState, useMemo, useCallback, useRef } from 'react'
import styles from './CSSModule.module.css'
const getAverage = numbers => {
  console.log('평균값 계산 중..')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')
  const inputEl = useRef(null)

  // const onChange = e => {
  //   setNumber(e.target.value)
  // }
  // const onInsert = e => {
  //   const nextList = list.concat(parseInt(number))
  //   setList(nextList)
  //   setNumber('')
  // }
  // 위 함수들을 useCallback함수 사용하여 최적화
  const onChange = useCallback(e => {
    setNumber(e.target.value)
  },[]) //컴포넌트가 처음 렌더링될 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number))
    setList(nextList)
    setNumber('')
    inputEl.current.focus()
  },[number, list])//number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list])

// 렌더링과 관련 없는 변수
  const id = useRef(1)
  console.log(id)
  const setId = (n) => {
    id.current = n
  }
  const printId = () => {
    console.log(id.current)
  }
  return (
    <main>      
      <div>
        refsample
        {id.current}
      </div>
      <h3>useMemo</h3>
      <input type="number" value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div className={styles.wrapper}>
        <b>평균값:</b> <span className="something">{avg}</span>
      </div>
    </main>
  )
}

export default Average