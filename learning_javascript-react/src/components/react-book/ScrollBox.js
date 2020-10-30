import React, { Component } from 'react'

class ScrollBox extends Component {
  state = {

  }
  
  scrollTopBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /*
      const scrollHeight = this.box.scrollHeight
      const clientHeight = this.box.clientHeight
    */
   this.box.scrollTop = scrollHeight - clientHeight
  }
  scrollTopTop = () => {
    this.box.scrollTop = 0
  }

  render(){
    const style = {
      border: '1px solid #ccc',
      height: '300px',
      width: '380px',
      overflow: 'auto',
      position: 'relative'
    }

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, #ff0)'
    }

    return(
      <div>
        <div
          style={style}
          ref={(ref) => {this.box=ref}}>
          <div style={innerStyle} />
        </div>
      </div>
    )
  }
}

export default ScrollBox