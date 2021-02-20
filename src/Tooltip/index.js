import { Component } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';
import TooltipWrapper from 'TooltipWrapper';

const formatPositioning = (positioning) => {
  const formattedPositioning = {};

  Object.keys(positioning).forEach(key => {
    const value = positioning[key];
    if (value === null) {
      formattedPositioning[key] = 'initial';
    } else {
      formattedPositioning[key] = `${value}px`;
    }
  });

  return formattedPositioning;
}

class Tooltip extends Component {
  render() {
    const { position, hoverDurationThreshold, children, tooltip, ...remainingProps } = this.props;

    return (
      <HoverDetector
        {...remainingProps}
        hoverDurationThreshold={hoverDurationThreshold}
      >
        {({ thresholdReached, internalDivRef }) => (
          <>
            {children}
            <TooltipWrapper
              position={position}
              visible={thresholdReached}
              elementRef={internalDivRef}
            >
              {tooltip}
            </TooltipWrapper>
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
