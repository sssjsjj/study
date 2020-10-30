import React, {
  Component
} from 'react'

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  }

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log(`constructor`)
  }

  // props로 받아온 값을 state에 동기화 시키는 용도. 컴포넌트가 마운트될 때와 업데이트될 때 호출됨.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('-------------------------getDerivedStateFromProps')
    if (nextProps.color !== prevState.color) {
      return {
        color: nextProps.color
      }
    }
    return null
  }

  // 컴포넌트 만들고 첫 렌더링을 다 마친 후 실행. (비동기 작업 주로 처리)
  componentDidMount() {
    console.log('componentDidMount')
  }

  // props 또는 state 변경했을 때, 리렌더링을 시작할지 여부 지정. true나 false값을 반환해야함
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    //숫자의 마지막 자리가 4면 리렌더링 ㄴ
    return nextState.number % 10 !== 4
  }

  // 컴포넌트를 Dom에서 제거할 때 실행
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  // render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출.
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('getSnapshotBeforeUpdate')
    if(prevProps.color !== this.props.color){
      return this.myRef.style.color
    }
    return null
  }

  // 리렌더링 완료 직후 실행
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('componentDidUpdate', prevProps, prevState)
    if(snapshot) {
      console.log('업데이트되기 직전 색상: ', snapshot)
    }
  }

  render(){
    console.log('render')

    const style = {
      color: this.props.color
    }

    return(
      <div>
        <h1 style={style} ref={ref => this.myRef=ref}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>
          더하기
        </button>
      </div>
    )
  }
}

export default LifeCycleSample