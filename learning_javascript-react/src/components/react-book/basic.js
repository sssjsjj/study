import React from 'react'
import PropTypes from 'prop-types'

// 함수로 지정하는 방법!
// const FreeTest = ({ name, children, favorites }) => {
//   return(
//     <main>
//       <h2>Basic</h2>
//       <p>부모에게서 받은 값: {name}</p>
//       <p>췰들원 값: {children}</p>
//       <p><strong>내가 좋아하는건 {favorites.join(', ')}</strong></p>
//     </main>
//   )
// }
// FreeTest.defaultProps = {
//   name: '받은 값이 없어서 default로'
// }

// FreeTest.propTypes = {
//   name: PropTypes.string,
//   favorites: PropTypes.array.isRequired
// }

// class로 지정하는 방법!
class FreeTest extends React.Component {
  static defaultProps = {
    name: '받은 값이 없어서 default로'
  }
  
  static propTypes = {
    name: PropTypes.string,
    favorites: PropTypes.array.isRequired
  }

  render(){
    const { name, children, favorites } = this.props
    return (
      <main>
        <h2>Basic</h2>
        <p>부모에게서 받은 값: {name}</p>
        <p>췰들원 값: {children}</p>
        <p><strong>내가 좋아하는건 {favorites.join(', ')}</strong></p>
      </main>
    )
  }


}



export default FreeTest