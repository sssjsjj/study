import React, { Component } from 'react';
import './ValidationSample.css'
import ScrollBox from './ScrollBox'

class ValidationSample extends Component {
  input = React.createRef()

  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === 'aaa'
    })

    this.input.current.focus()
  }

  render() {
    return (
      <main>
        <section>
          <h2>validation sample</h2>
          <input 
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
            ref={this.input}
            // ref={(ref) => this.input=ref}
          />
          <button onClick={this.handleButtonClick}>검증하기</button>
        </section>
        <section style={ {marginTop: '70px'} }>
          <h2>scroll box</h2>
          <ScrollBox ref={(ref) => {this.scrollBox=ref}}/>
          <button onClick={() => this.ScrollBox.scrollTopTop()}>최상단</button>
          <button onClick={() => this.ScrollBox.scrollTopBottom()}>최하단</button>
        </section>
      </main>
    )
  }
}

export default ValidationSample