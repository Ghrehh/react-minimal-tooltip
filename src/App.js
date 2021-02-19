import { Component } from 'react';
import Tooltip from './Tooltip';

class App extends Component {
  render() {
    return (
      <div style={{ margin: 'auto', width: '200px', marginTop: '500px'}}>
        <Tooltip
          tooltip={<p style={{ padding: '12px', backgroundColor: 'gray' }}>Very cool and interesting</p>}
          position="top"
          hoverDurationThreshold={1000}
        >
          <button>I'm interesting</button>
        </Tooltip>
      </div>
    );
  }
}

export default App;
