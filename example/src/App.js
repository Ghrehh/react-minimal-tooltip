import { Component } from 'react';
import Tooltip from 'react-minimal-tooltip';
import styles from './app.module.css';

const ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const ButtonFour = () => (
  <div style={{ margin: '10px'}} className={styles.buttonFourTooltip}>
    <h1>The Fourth Button</h1>
    <p>{ipsum}</p>
  </div>
)

class App extends Component {
  render() {
    return (
      <>
      <header className={styles.header}>
        <Tooltip tooltipZIndex={100}tooltipChildren="The first button" tooltipPosition="bottom" tooltipPointerSize={20} tooltipSpacing={5}>
          <button>Sticky Header Button</button>
        </Tooltip>
      </header>
      <div className={styles.page}>
        <div className={styles.buttonContainer}>
          <Tooltip tooltipZIndex={100}tooltipChildren="The first button" tooltipPosition="bottom" tooltipPointerSize={20} tooltipSpacing={5}>
            <button>Button Number One</button>
          </Tooltip>
          <Tooltip tooltipChildren="The second button" tooltipPosition="bottom" tooltipFadeDuration="1s" tooltipFadeEasingFunction="linear">
            <button>Button Number Two</button>
          </Tooltip>
          <Tooltip tooltipChildren={ipsum} tooltipPosition="bottom" tooltipFade={false}>
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
          <p className={styles.paragraph}>Hover over me 1</p>
        </Tooltip>
        <br />
        <br />
        <br />
        <Tooltip tooltipChildren={ipsum} tooltipPosition="top" tooltipSpacing={10}>
          <p className={styles.paragraph}>Hover over me 2</p>
        </Tooltip>
      </div>
        </>
    );
  }
}

export default App;
