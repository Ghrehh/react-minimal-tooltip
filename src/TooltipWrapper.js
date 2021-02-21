import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class TooltipWrapper extends Component {
  // takes up the entire width of the screen
  outerRef = createRef();
  // shrinks and grows with tooltip content, if this is the same width as the outer ref then
  // there's no need for any horizontal positioning changes
  innerRef = createRef();
  // the pointy part of the speech bubble, it always needs to be moved to the center of the element
  decorationRef = createRef();

  renderDecoration = (invert) => (
    <div
      ref={this.decorationRef}
      style={{
        height: '20px',
        width: '20px',
        position: 'relative',
        transform: invert ? 'scaleY(-1)' : 'none'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 121 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60.5 0L120.689 114.25H0.311234L60.5 0Z" fill="purple"/>
      </svg>
    </div>
  )

  componentDidUpdate(prevProps) {
    const defaultPositioning = {
      top: 'initial', right: 'initial', bottom: 'initial', left: 'initial'
    };

    if (prevProps.visible !== this.props.visible) {
      if (!this.props.visible) {
        Object.assign(this.innerRef.current.style, defaultPositioning)
        Object.assign(this.decorationRef.current.style, defaultPositioning)
        return;
      }

      const element = this.props.elementRef.current.getBoundingClientRect();
      const outer = this.outerRef.current.getBoundingClientRect();

      // move tooltip to above the element if ths position is top
      if (this.props.position === 'top') {
        this.innerRef.current.style.bottom = `${element.height + outer.height}px`;
        this.decorationRef.current.style.bottom = `${element.height + outer.height}px`;
      }

      // move the decoration to the center of the element
      const decoration = this.decorationRef.current.getBoundingClientRect();
      const targetPosition = element.x + (element.width / 2);
      const decorationPosition = decoration.x + (decoration.width / 2);
      const decorationDiff = targetPosition - decorationPosition;
      this.decorationRef.current.style.left = `${decorationDiff}px`;

      const inner = this.innerRef.current.getBoundingClientRect();

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
    return (
      <div
        ref={this.outerRef}
        style={{
          position: 'absolute',
          visibility: this.props.visible ? 'visible' : 'hidden',
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
            style={{
              overflow: 'auto',
              position: 'relative',
              backgroundColor: 'purple',
              borderRadius: '3px'
            }}
          >
            {this.props.children}
          </div>
        </div>
        {this.props.position === 'top' && this.renderDecoration(true)}
      </div>
    );
  }
}

TooltipWrapper.propTypes = {
  // ref pointing to the element this tooltip is for
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
};

export default TooltipWrapper;
