import { Component } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';
import TooltipWrapper from 'TooltipWrapper';

const getPositioning = ({ position, tooltip, element }) => {
  const positioning = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };

  // horizontal centering
  if (position === 'top' || position === 'bottom') {
    positioning.left = (element.width - tooltip.width) / 2
  }

  // vertical centering
  if (position === 'right' || position === 'left') {
    positioning.bottom = element.height - ((element.height - tooltip.height) / 2)
  }

  if (position === 'top') {
    positioning.bottom = element.height + tooltip.height;
  } else if (position === 'right') {
    positioning.left = element.width;
  } else if (position === 'bottom') {
    // nothing
  } else if (position === 'left') {
    positioning.right = tooltip.width;
  }

  return positioning;
}

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
