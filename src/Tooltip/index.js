import { Component } from 'react';
import PropTypes from 'prop-types';
import TooltipWrapper from 'TooltipWrapper';
import HoverDetector from 'HoverDetector';

class Tooltip extends Component {
  render() {
    const { hoverDurationThreshold, children, tooltip, ...remainingProps } = this.props;
    return (
      <HoverDetector {...remainingProps} hoverDurationThreshold={hoverDurationThreshold}>
        {(active) => (
          <>
            {children}
            {active && (<TooltipWrapper>{tooltip}</TooltipWrapper>)}
          </>
        )}
      </HoverDetector>
    );
  }
}

Tooltip.propTypes = {
  hoverDurationThreshold: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.node.isRequired,
  position: PropTypes.string
};

Tooltip.defaultProps = {
  position: null
};

export default Tooltip;
