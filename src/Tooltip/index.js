import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import HoverDetector from 'HoverDetector';

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
      // default case when hovering is not active
      let positioning = getPositioning({});

      if (this.state.hovering) {
        positioning = getPositioning({
          position: this.props.position,
          element: {
            height: this.hoverDetectorRef.current.offsetHeight,
            width: this.hoverDetectorRef.current.offsetWidth
          },
          tooltip: {
            height: this.tooltipWrapperOuterRef.current.offsetHeight,
            width: this.tooltipWrapperOuterRef.current.offsetWidth
          }
        });
      }
      Object.assign(this.tooltipWrapperInnerRef.current.style, formatPositioning(positioning))
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
