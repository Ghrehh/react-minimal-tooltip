import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class HoverDetector extends Component {
  state = {
    thresholdReached: false,
    timeoutId: null,
  }

  divRef = createRef();

  handleEnter = (e) => {
    const timeoutId = setTimeout(this.thresholdReached, this.props.hoverDurationThreshold);

    this.setState({ timeoutId });

    this.props.onMouseEnter(e);
  }

  handleLeave = (e) => {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
    this.setState({ timeoutId: null, thresholdReached: false });

    this.props.onMouseLeave(e);
  }

  thresholdReached = () => {
    this.setState({ thresholdReached: true });
  }

  render() {
    const { hoverDurationThreshold, ...remainingProps } = this.props;

    return (
      <div
        {...remainingProps}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        ref={this.divRef}
      >
        {
          this.props.children({
            thresholdReached: this.state.thresholdReached,
            internalDivRef: this.divRef
          })
        }
      </div>
    )
  }
}

HoverDetector.propTypes = {
  children: PropTypes.func.isRequired,
  hoverDurationThreshold: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

HoverDetector.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {}
}

export default HoverDetector;
