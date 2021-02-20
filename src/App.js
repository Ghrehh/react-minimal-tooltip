import { Component } from 'react';
import Tooltip from './Tooltip';

class App extends Component {
  render() {
    return (
      <>
        <div style={{ margin: 'auto', width: '200px', marginTop: '120px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltip={<p style={{ margin: '20px', padding: '12px', backgroundColor: 'gray' }}>Very cool and interesting</p>}
            position="top"
            hoverDurationThreshold={1000}
          >
            <button style={{ width: '100%' }}>Top Button</button>
          </Tooltip>
        </div>
        <div style={{ margin: 'auto', width: '200px', marginTop: '120px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltip={<p style={{ margin: '20px', padding: '12px', backgroundColor: 'gray' }}>Very cool and interesting</p>}
            position="right"
            hoverDurationThreshold={1000}
          >
            <button style={{ width: '100%' }}>Right Button</button>
          </Tooltip>
        </div>
        <div style={{ margin: 'auto', width: '200px', marginTop: '120px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltip={<p style={{ margin: '20px', padding: '12px', backgroundColor: 'gray' }}>Very cool and interesting</p>}
            position="bottom"
            hoverDurationThreshold={1000}
          >
            <button style={{ width: '100%' }}>Bottom Button</button>
          </Tooltip>
        </div>
        <div style={{ margin: 'auto', width: '200px', marginTop: '120px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltip={<p style={{ margin: '20px', padding: '12px', backgroundColor: 'gray' }}>Very cool and interesting</p>}
            position="left"
            hoverDurationThreshold={1000}
          >
            <button style={{ width: '100%' }}>Left Button</button>
          </Tooltip>
        </div>
      </>
    );
  }
}

export default App;
