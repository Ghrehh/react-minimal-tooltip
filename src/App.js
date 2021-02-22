import { Component } from 'react';
import Tooltip from './Tooltip';
import styles from './app.module.css';

const ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const ButtonFour = () => (
  <div className={styles.buttonFourTooltip}>
    <h1>The Fourth Button</h1>
    <p>{ipsum}</p>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className={styles.page}>
        <div className={styles.buttonContainer}>
          <Tooltip tooltipChildren="The first button" tooltipPosition="bottom">
            <button>Button Number One</button>
          </Tooltip>
          <Tooltip tooltipChildren="The second button" tooltipPosition="bottom">
            <button>Button Number Two</button>
          </Tooltip>
          <Tooltip tooltipChildren={ipsum} tooltipPosition="bottom">
            <button>Button Number Three, the Wordy One</button>
          </Tooltip>
          <Tooltip tooltipChildren={<ButtonFour />} tooltipPosition="bottom">
            <button>Button Number Four, the Complex One</button>
          </Tooltip>
        </div>
        <br />
        <br />
        <br />
        <Tooltip tooltipChildren={ipsum} tooltipPosition="bottom">
          <p className={styles.paragraph}>Hover over me</p>
        </Tooltip>
        <br />
        <br />
        <br />
        <Tooltip tooltipChildren={ipsum} tooltipPosition="top">
          <p className={styles.paragraph}>Hover over me</p>
        </Tooltip>
      </div>
    );
  }
}

export default App;
