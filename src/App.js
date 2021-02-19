import { Component } from 'react';
import Tooltip from './Tooltip';

class App extends Component {
  render() {
    return (
      <>
        <Tooltip
          tooltip={<p>Very cool and interesting</p>}
          position="top"
          hoverDurationThreshold={1000}
        >
          <button>I'm interesting</button>
        </Tooltip>
      </>
    );
  }
}

export default App;
