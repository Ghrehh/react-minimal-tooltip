import { Component } from 'react';

class HoverDetector extends Component {
  state = {
    timeoutId: null,
    showTooltip: false,
  }

  handleLeave = () => {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
    this.setState({ timeoutId: null, showTooltip: false });
  }

  handleEnter = () => {
    const timeoutId = setTimeout(this.showTooltip, this.props.hoverDurationThreshold);

    this.setState({ timeoutId });
  }

  showTooltip = () => {
    this.setState({ showTooltip: true });
  }

  render() {
    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        {this.props.children(this.state.showTooltip)}
      </div>
    )
  }
}

export default HoverDetector;
