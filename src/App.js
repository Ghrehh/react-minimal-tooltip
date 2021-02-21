import { Component } from 'react';
import Tooltip from './Tooltip';

class App extends Component {
  render() {
    return (
      <>
        <div style={{ margin: 'auto', width: '200px', marginTop: '150px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltipChildren={<p style={{ margin: '20px', padding: '12px' }}>Very cool and interesting and some longer stuff</p>}
            tooltipPosition="top"
            hoverDurationUntilVisible={1000}
          >
            <button style={{ width: '100%' }}>Top Button</button>
          </Tooltip>
        </div>
        <div style={{ margin: 'auto', width: '200px', marginTop: '50px'}}>
          <Tooltip
            style={{ width: '128px' }}
            tooltipChildren={<p style={{ margin: '20px', padding: '12px' }}>Very cool and interesting and some longer stuff</p>}
            tooltipPosition="bottom"
            hoverDurationUntilVisible={1000}
          >
            <button style={{ width: '100%' }}>Bottom Button</button>
          </Tooltip>
        </div>
      </>
    );
  }
}

export default App;
