import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
//====================================

import './index.css';
import Game from './components/tutorial-react'
import Basic from './components/react-book/basic'
import Counter from './components/react-book/Counter'
import Say from './components/react-book/Say'
import EventPractice from './components/react-book/EventPractice'
import ValidationSample from './components/react-book/ValidationSample'
import IterationSample from './components/react-book/IterationSample'
import LifeCycleSample from './components/react-book/LifeCycleSample'
import ErrorBoundary from './components/react-book/ErrorBoundary'
import Counter2 from './components/react-book/Counter2'
import Average from './components/react-book/Average'

function App(){
  const [color, setColor] = useState('#000')
  const [visible, setVisible] = useState()
  const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)
  const handleClick = () => {
    setColor(getRandomColor())
  }

  return (
    <Router>
      <div>
        <header>
          <h1><span>learning</span> <span>React</span></h1>
          <ul>
            <li>
              <Link to='/tutorial-react'>React Tutorial <span className="word-break">(공식 사이트)</span></Link>
            </li>
            <li>
              <Link to='/react-book/basic'><strong>★hot</strong> React book tutorials</Link>
              <ul>
                <li><Link to='/react-book/Basic'>BASIC</Link></li>
                <li><Link to='/react-book/Counter'>Counter</Link></li>
                <li><Link to='/react-book/Say'>Say</Link></li>
                <li><Link to='/react-book/EventPractice'>EventPractice <span className="word-break">(class형, 함수형 컴포넌트)</span></Link></li>
                <li><Link to='/react-book/ValidationSample'>ValidationSample <span className="word-break">(Dom 조작)</span></Link></li>
                <li><Link to='/react-book/IterationSample'>Iteration <span className="word-break">(반복되는 컴포넌트)</span></Link></li>
                <li><Link to='/react-book/LifeCycleSample'>Life Cycle Sample</Link></li>
                <li>
                  <Link to='/react-book/Counter2'>hooks - Counter2</Link>
                  <button
                    onClick={() => {
                      setVisible(!visible)
                  }}>
                    {visible ? '숨기기' : '보이기'}
                  </button>
                  {visible && <Counter2 />}
                </li>
                <li><Link to='/react-book/Average'>Average</Link></li>
              </ul>
            </li>
          </ul>
        </header>

        <Switch>
          <Route path='/react-book/Average'>
            <Average />
          </Route>
          <Route path='/react-book/Counter2'>
            <Counter2 />
          </Route>
          <Route path='/react-book/LifeCycleSample'>
            <main>
              <button onClick={handleClick}>랜덤컬러</button>
              <ErrorBoundary>
                <LifeCycleSample color={color}/>
              </ErrorBoundary>
            </main>
          </Route>
          <Route path='/react-book/IterationSample'>
            <IterationSample />
          </Route>
          <Route path='/react-book/ValidationSample'>
            <ValidationSample />
          </Route>
          <Route path='/react-book/EventPractice'>
            <EventPractice />
          </Route>
          <Route path='/react-book/Say'>
            <Say />
          </Route>
          <Route path='/react-book/Counter'>
            <Counter />
          </Route>
          <Route path='/react-book/Basic'>
            <Basic
              name="수진"
              favorites={['사진찍기', '게임', '영화', '드라마', '맥주', '진솔한 대화', '옷', '수공예', '꾸미기', '커피', '군것질', '어렵지만 새로운 일', '햇빛', '잎', '나무']}
            >
              나는 컴포넌트 사이에 있는 내용이얌
            </Basic>
          </Route>
          <Route path='/tutorial-react'>
            <main>
              <Game />
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

//====================================
ReactDOM.render(
  <App />,
  document.getElementById('root')
)