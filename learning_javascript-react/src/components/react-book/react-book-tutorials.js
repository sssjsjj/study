import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
//====================================

import Basic from './basic'
import Counter from './Counter'
import Say from './Say'
import EventPractice from './EventPractice'

function App(){
  return (
    <Router>
      <main>
        <nav>
          <ol className='menu-sub'>
            <li>
              <Link to='/react-book/basic'>BASIC</Link>
            </li>
            <li>
              <Link to='/react-book/counter'>Counter</Link>
            </li>
            <li>
              <Link to='/react-book/say'>Say</Link>
            </li>
            <li>
              <Link to='/react-book/eventPractice'>EventPractice</Link>
            </li>
          </ol>
        </nav>

        <Switch>
          <Route path='/react-book/eventPractice'>
            <EventPractice />
          </Route>
          <Route path='/react-book/say'>
            <Say />
          </Route>
          <Route path='/react-book/counter'>
            <Counter />
          </Route>
          <Route path='/react-book/basic'>
            <Basic
              name="수진"
              favorites={['사진찍기', '게임', '영화', '드라마', '맥주', '진솔한 대화', '옷', '수공예', '꾸미기', '커피', '군것질', '어렵지만 새로운 일', '햇빛', '잎', '나무']}
            >
              나는 컴포넌트 사이에 있는 내용이얌
            </Basic>
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App