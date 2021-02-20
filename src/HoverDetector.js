import { Component } from 'react';
import PropTypes from 'prop-types';

class HoverDetector extends Component {
  state = {
    timeoutId: null,
  }

  handleEnter = (e) => {
    const timeoutId = setTimeout(this.thresholdReached, this.props.hoverDurationThreshold);

    this.setState({ timeoutId });

    this.props.onMouseEnter(e);
  }

  handleLeave = (e) => {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
    this.setState({ timeoutId: null });

    this.props.onChange(false);
    this.props.onMouseLeave(e);
  }

  thresholdReached = () => {
    this.props.onChange(true);
  }

  render() {
    const { hoverDurationThreshold, divRef, ...remainingProps } = this.props;

    return (
      <div
        {...remainingProps}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        ref={divRef}
      >
        {this.props.children}
      </div>
    )
  }
}

HoverDetector.propTypes = {
  children: PropTypes.node.isRequired,
  hoverDurationThreshold: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

HoverDetector.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {}
}

export default HoverDetector;
