import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      fixedNumber: 0
    }
  }
  render() {
    const { number, fixedNumber } = this.state;
    return(
      <main>
        <h1>{ number }</h1>
        <h2>고정값 { fixedNumber }</h2>
        <button
          onClick={() => {
            this.setState((prevState) => ({number: prevState.number + 1}))
            this.setState((prevState) => ({number: prevState.number + 1}),
            () => {
              console.log('setState 끝')
            })
          }}
        >
          +1
        </button>
      </main>
    )
  }
}

export default Counter