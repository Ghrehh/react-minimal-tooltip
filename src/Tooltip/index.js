import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';

const getPositioning = ({ position, tooltip, element }) => {
  const positioning = {
    top: 'initial',
    right: 'initial',
    bottom: 'initial',
    left: 'initial'
  };

  // horizontal centering
  if (position === 'top' || position === 'bottom') {
    positioning.left = (tooltip.width - element.width) / 2
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

class Tooltip extends Component {
  state = {
    hovering: false
  }

  hoverDetectorRef = createRef();
  // separate ref for the absolute positioned part of the tooltip. Even though we apply
  // the positioning to the relative portion the relative portion doesn't seem to include the
  // height of its child. The absolute part does however.
  tooltipWrapperOuterRef = createRef();
  tooltipWrapperInnerRef = createRef();

  componentDidUpdate(_, prevState) {
    if (prevState.hovering !== this.state.hovering) {
      if (this.state.hovering === false) {
        this.tooltipWrapperInnerRef.current.style.top = 'initial';
        this.tooltipWrapperInnerRef.current.style.right = 'initial';
        this.tooltipWrapperInnerRef.current.style.bottom = 'initial';
        this.tooltipWrapperInnerRef.current.style.left = 'initial';
      } else {

        if (this.props.position === 'top') {
          const elementHeight = this.hoverDetectorRef.current.offsetHeight;
          const outerTooltipHeight = this.tooltipWrapperOuterRef.current.offsetHeight;
          this.tooltipWrapperInnerRef.current.style.bottom = `${elementHeight + outerTooltipHeight}px`;

          const elementWidth = this.hoverDetectorRef.current.offsetWidth;
          const outerTooltipWidth = this.tooltipWrapperOuterRef.current.offsetWidth;
          const diff = elementWidth - outerTooltipWidth;
          this.tooltipWrapperInnerRef.current.style.left = `${diff / 2}px`;
        } else if (this.props.position === 'bottom') {
          const elementWidth = this.hoverDetectorRef.current.offsetWidth;
          const outerTooltipWidth = this.tooltipWrapperOuterRef.current.offsetWidth;
          const diff = elementWidth - outerTooltipWidth;
          this.tooltipWrapperInnerRef.current.style.left = `${diff / 2}px`;
        } else if (this.props.position === 'right') {
          const elementHeight = this.hoverDetectorRef.current.offsetHeight;
          const outerTooltipHeight = this.tooltipWrapperOuterRef.current.offsetHeight;
          const diff = elementHeight - outerTooltipHeight

          this.tooltipWrapperInnerRef.current.style.bottom = `${elementHeight - (diff / 2)}px`;
          this.tooltipWrapperInnerRef.current.style.right = `${this.tooltipWrapperOuterRef.current.offsetWidth}px`;
        } else if (this.props.position === 'left') {
          const elementHeight = this.hoverDetectorRef.current.offsetHeight;
          const outerTooltipHeight = this.tooltipWrapperOuterRef.current.offsetHeight;
          const diff = elementHeight - outerTooltipHeight

          this.tooltipWrapperInnerRef.current.style.bottom = `${elementHeight - (diff / 2)}px`;
          this.tooltipWrapperInnerRef.current.style.left = `${this.hoverDetectorRef.current.offsetWidth}px`;
        }



      }
    }
  }

  render() {
    const { position, hoverDurationThreshold, children, tooltip, ...remainingProps } = this.props;

    return (
      <HoverDetector
        {...remainingProps}
        divRef={this.hoverDetectorRef}
        hoverDurationThreshold={hoverDurationThreshold}
        onChange={hovering => this.setState({ hovering })}
      >
        <>
          {children}
          <div
            style={{ position: 'absolute', visibility: true ? 'visible' : 'hidden' }}
            ref={this.tooltipWrapperOuterRef}
          >
            <div ref={this.tooltipWrapperInnerRef} style={{ position: 'relative' }}>
              {tooltip}
            </div>
          </div>
        </>
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
