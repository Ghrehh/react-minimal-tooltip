import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';
import TooltipWrapper from 'TooltipWrapper';

class Tooltip extends Component {
  render() {
    const {
      tooltipPosition,
      hoverDurationUntilVisible,
      children,
      tooltipChildren,
      tooltipColor,
      tooltipStyle,
      tooltipClassName,
      tooltipZIndex,
      ...remainingProps
    } = this.props;

    return (
      <HoverDetector
        {...remainingProps}
        hoverDurationThreshold={hoverDurationUntilVisible}
      >
        {({ thresholdReached, internalDivRef }) => (
          <Fragment>
            {children}
            <TooltipWrapper
              position={tooltipPosition}
              visible={thresholdReached}
              elementRef={internalDivRef}
              color={tooltipColor}
              style={tooltipStyle}
              className={tooltipClassName}
              zIndex={tooltipZIndex}
            >
              {tooltipChildren}
            </TooltipWrapper>
          </Fragment>
        )}
      </HoverDetector>
    );
  }
}

Tooltip.propTypes = {
  hoverDurationUntilVisible: PropTypes.number,
  children: PropTypes.node.isRequired,
  tooltipChildren: PropTypes.node.isRequired,
  tooltipPosition: PropTypes.string,
  tooltipColor: PropTypes.string,
  tooltipStyle: PropTypes.object,
  tooltipClassName: PropTypes.string,
  tooltipZIndex: PropTypes.number
};

Tooltip.defaultProps = {
  tooltipPosition: 'top',
  hoverDurationUntilVisible: 500,
  tooltipColor: '#d1d1d1',
  tooltipStyle: {},
  tooltipClassName: '',
  tooltipZIndex: 1
};

export default Tooltip;
