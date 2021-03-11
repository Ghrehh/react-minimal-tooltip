import { Component, createRef } from 'react';
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
    document.body.prepend(this.portalTarget);
    window.addEventListener('scroll', this.position)
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalTarget);
    window.removeEventListener('scroll', this.position)
  }

  renderDecoration = (invert) => (
    <div
      ref={this.decorationRef}
      style={{
        height: `${this.props.pointerSize}px`,
        width: `${this.props.pointerSize}px`,
        position: 'relative',
        transform: invert ? 'scaleY(-1)' : 'none'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 92 80"
        style={{
          display: 'block',
          position: 'relative',
          top: '2px'
        }}
      >
        <g width="100%" height="100%">
          <polygon id="Polygon" fill={this.props.color} points="46 0 91.8993464 79.5 0.100653599 79.5" />
        </g>
      </svg>
    </div>
  )

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.position();
    }
  }

  position = () => {
    // early return so non-visible tooltips don't reposition
    if (!this.props.visible) return;
    this.outerRef.current.style.top = 'initial';
    this.innerRef.current.style.left = 'initial';
    this.decorationRef.current.style.left = 'initial';

    const element = this.props.elementRef.current.getBoundingClientRect();
    const outer = this.outerRef.current.getBoundingClientRect();
    const decoration = this.decorationRef.current.getBoundingClientRect();
    const inner = this.innerRef.current.getBoundingClientRect();

    // move tooltip to above the element if ths position is top
    if (this.props.position === 'top') {
      this.outerRef.current.style.top = `${element.top - outer.height - this.props.spacing}px`;
    } else {
      this.outerRef.current.style.top = `${element.bottom + this.props.spacing}px`;
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

  render() {
    return ReactDOM.createPortal(
      <div
        ref={this.outerRef}
        style={{
          zIndex: this.props.zIndex,
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          left: '10px',
          right: '10px',
          pointerEvents: 'none',
          transition: this.props.fade ? `opacity ${this.props.fadeDuration} ${this.props.fadeEasingFunction}` : 'none',
          opacity: this.props.visible || this.props.devMode ? '1' : '0'
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
  className: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
  pointerSize: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  fade: PropTypes.bool.isRequired,
  fadeDuration: PropTypes.string.isRequired,
  fadeEasingFunction: PropTypes.string.isRequired
};

export default TooltipWrapper;
