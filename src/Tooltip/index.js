import { Component } from 'react';
import TooltipWrapper from 'TooltipWrapper';
import HoverDetector from 'HoverDetector';

class Tooltip extends Component {
  render() {
    return (
      <HoverDetector hoverDurationThreshold={this.props.hoverDurationThreshold}>
        {(active) => (
          <>
            {this.props.children}
            {active && (<TooltipWrapper>{this.props.tooltip}</TooltipWrapper>)}
          </>
        )}
      </HoverDetector>
    );
  }
}

export default Tooltip;
