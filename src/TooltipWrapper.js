import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class TooltipWrapper extends Component {
  // takes up the entire width of the screen
  outerRef = createRef();
  // shrinks and grows with tooltip content, if this is the same width as the outer ref then
  // there's no need for any horizontal positioning changes
  innerRef = createRef();
  // the pointy part of the speech bubble, it always needs to be moved to the center of the element
  decorationRef = createRef();
  portalTarget = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.portalTarget);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalTarget);
  }

  renderDecoration = (invert) => (
    <div
      ref={this.decorationRef}
      style={{
        height: '13px',
        width: '13px',
        position: 'relative',
        transform: invert ? 'scaleY(-1)' : 'none'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 121 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60.5 0L120.689 114.25H0.311234L60.5 0Z" fill={this.props.color}/>
      </svg>
    </div>
  )

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      if (!this.props.visible) return;

      const element = this.props.elementRef.current.getBoundingClientRect();
      const outer = this.outerRef.current.getBoundingClientRect();
      const decoration = this.decorationRef.current.getBoundingClientRect();
      const inner = this.innerRef.current.getBoundingClientRect();

      // move tooltip to above the element if ths position is top
      if (this.props.position === 'top') {
        const targetLocation = element.top;
        const currentLocation = decoration.bottom;
        const diff = currentLocation - targetLocation;
        this.innerRef.current.style.bottom = `${diff}px`;
        this.decorationRef.current.style.bottom = `${diff}px`;
      } else {
        const targetLocation = element.bottom;
        const currentLocation = decoration.top;
        const diff = currentLocation - targetLocation;
        this.innerRef.current.style.bottom = `${diff}px`;
        this.decorationRef.current.style.bottom = `${diff}px`;
      }

      // move the decoration to the center of the element
      const targetPosition = element.x + (element.width / 2);
      const decorationPosition = decoration.x + (decoration.width / 2);
      const decorationDiff = targetPosition - decorationPosition;
      this.decorationRef.current.style.left = `${decorationDiff}px`;

      // move the tooltip to the center of the element unless that would move it off screen,
      // in which case make it flush to the side.
      if (targetPosition + (inner.width / 2) > outer.right) {
        const innerDiff = outer.right - inner.right;
        this.innerRef.current.style.left = `${innerDiff}px`;
        return;
      }

      if (targetPosition - (inner.width / 2) < 0 ) return;

      const innerPosition = inner.x + (inner.width / 2);
      const innerDiff = targetPosition - innerPosition;

      this.innerRef.current.style.left = `${innerDiff}px`;
    }
  }

  render() {
    if (!this.props.visible) return null;

    return ReactDOM.createPortal(
      <div
        ref={this.outerRef}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          left: '10px',
          right: '10px',
          pointerEvents: 'none'
        }}
      >
        {this.props.position === 'bottom' && this.renderDecoration()}
        <div style={{ display: 'flex' }}>
          <div
            ref={this.innerRef}
            className={this.props.className}
            style={{
              position: 'relative',
              backgroundColor: this.props.color,
              ...this.props.style
            }}
          >
            {this.props.children}
          </div>
        </div>
        {this.props.position === 'top' && this.renderDecoration(true)}
      </div>,
      this.portalTarget
    );
  }
}

TooltipWrapper.propTypes = {
  // ref pointing to the element this tooltip is for
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};

export default TooltipWrapper;
