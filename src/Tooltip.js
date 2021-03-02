import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';
import TooltipWrapper from 'TooltipWrapper';

const Tooltip = (props) => {
  const {
    devMode,
    tooltipPosition,
    hoverDurationUntilVisible,
    children,
    tooltipChildren,
    tooltipColor,
    tooltipStyle,
    tooltipClassName,
    tooltipZIndex,
    tooltipPointerSize,
    tooltipSpacing,
    tooltipFade,
    tooltipFadeDuration,
    tooltipFadeEasingFunction,
    ...remainingProps
  } = props;

  return (
    <HoverDetector
      {...remainingProps}
      hoverDurationThreshold={hoverDurationUntilVisible}
    >
      {({ thresholdReached, internalDivRef }) => (
        <Fragment>
          {children}
          <TooltipWrapper
            devMode={devMode}
            position={tooltipPosition}
            visible={thresholdReached}
            elementRef={internalDivRef}
            color={tooltipColor}
            style={tooltipStyle}
            className={tooltipClassName}
            zIndex={tooltipZIndex}
            pointerSize={tooltipPointerSize}
            spacing={tooltipSpacing}
            fade={tooltipFade}
            fadeDuration={tooltipFadeDuration}
            fadeEasingFunction={tooltipFadeEasingFunction}
          >
            {tooltipChildren}
          </TooltipWrapper>
        </Fragment>
      )}
    </HoverDetector>
  );
}

Tooltip.propTypes = {
  devMode: PropTypes.bool,
  hoverDurationUntilVisible: PropTypes.number,
  children: PropTypes.node.isRequired,
  tooltipChildren: PropTypes.node.isRequired,
  tooltipPosition: PropTypes.string, tooltipColor: PropTypes.string,
  tooltipStyle: PropTypes.object,
  tooltipClassName: PropTypes.string,
  tooltipZIndex: PropTypes.number,
  tooltipPointerSize: PropTypes.number,
  tooltipSpacing: PropTypes.number,
  tooltipFade: PropTypes.bool,
  tooptipFadeDuration: PropTypes.string,
  tooltipFadeEasingFunction: PropTypes.string,
};

Tooltip.defaultProps = {
  devMode: false,
  tooltipPosition: 'top',
  hoverDurationUntilVisible: 500,
  tooltipColor: '#d1d1d1',
  tooltipStyle: {},
  tooltipClassName: '',
  tooltipZIndex: 1,
  tooltipPointerSize: 12,
  tooltipSpacing: 0,
  tooltipFade: true,
  tooltipFadeDuration: '0.2s',
  tooltipFadeEasingFunction: 'ease-in-out'
};

export default Tooltip;
