import React from 'react';
import Container from '@material-ui/core/Container';
import ThoughtPad from './containers/ThoughtPad'

class App extends React.Component {
  render () {
    return (
      <Container>
        <ThoughtPad/>
      </Container>
    )
  }

}

export default App;
