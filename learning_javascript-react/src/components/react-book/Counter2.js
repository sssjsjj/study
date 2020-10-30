import React, { useState, useEffect, useReducer } from 'react'

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch(action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT' :
      return { value: state.value - 1 }
    default:
      // 아무것도 해당되지 않을 때 기존 상태 변환
      return state
  }
}

function reducer2(state, action) {
  return{
    ...state,
    [action.name]: action.value
  }
}

const Counter = () => {
  const [value, setValue] = useState(0) //기본값 0
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  const [states, dispatches] = useReducer(reducer2, {
    name1: '',
    nickname1: ''
  }) 
  const { name1, nickname1 } = states
  const onChange = e => {
    dispatches(e.target)
  }

  useEffect(() => {// componentDidMount, componentDidUpdate를 합친 형태와 거의 같음
    console.log('effect!')
    console.log(name)
    return () => {
      console.log('cleanup')
      console.log(name)
    }
  }, []) //함수 두번째 파라미터로 비어있는 배열을 넣어주면. 처음 렌더링될때만 실행하고 업데이트될떄는 실행하지 않는다. 
  // 검사하고 싶은 값을 배열 안에 넣어주면 해당 값이 업데이트 되었을때만 작업이 실행된다.

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeNickName = e => {
    setNickname(e.target.value)
  }

  return (
    <div>
      <section>
        <h2 className="title-section">useState</h2>
        <p>
          현재 카운터 값은 <b>{value}</b>입니다.
        </p>
        <button onClick={() => setValue(value + 1)}>+ 1</button>
        <button onClick={() => setValue(value - 1)}>- 1</button>
      </section>
      <section>
        <h2 className="title-section">useReducer</h2>
        <p>
          현재 카운터 값은 <b>{state.value}</b>입니다.
        </p>
        <button onClick={() => dispatch( {type: 'INCREMENT' })}>+ 1</button>
        <button onClick={() => dispatch( {type: 'DECREMENT' })}>- 1</button>
      </section>
      <section>
        <h2 className="title-section">useEffect, cleanup</h2>
        <div>
          <label>이름
          <input value={name} onChange={onChangeName}/></label>
          <label>닉네임
          <input value={nickname} onChange={onChangeNickName}/></label>
        </div>
        <div>
          <div><b>이름: </b> {name}</div>
          <div><b>닉네임: </b> {nickname}</div>
        </div>
      </section>
      <section>
        <h2 className="title-section">useReducer2</h2>
        <div>
          <input name="name1" value={name1} onChange={onChange}/>
          <input name="nickname1" value={nickname1} onChange={onChange}/>
        </div>
        <div>
          <div><b>이름:</b> {name1}</div>
          <div><b>닉네임:</b> {nickname1}</div>
        </div>
      </section>
    </div>
  )
}

export default Counter