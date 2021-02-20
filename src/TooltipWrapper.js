import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
  // takes up the entire width of the screen
  outerRef = createRef();
  // shrinks and grows with tooltip content, if this is the same width as the outer ref then
  // there's no need for any horizontal positioning changes
  innerRef = createRef();
  // the pointy part of the speech bubble, it always needs to be moved to the center of the element
  decorationRef = createRef();

  renderDecoration = () => (
    <div
      ref={this.decorationRef}
      style={{ position: 'relative', width: '7px', height: '7px', backgroundColor: 'blue' }}
    />
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
      const decoration = this.decorationRef.current.getBoundingClientRect();
      const targetPosition = element.x + (element.width / 2);
      let currentPosition = decoration.x + (decoration.width / 2);
      let diff = targetPosition - currentPosition;
      Object.assign(this.decorationRef.current.style, { left: `${diff}px` })

      const inner = this.innerRef.current.getBoundingClientRect();

      if (targetPosition + (inner.width / 2) > document.documentElement.clientWidth ) {
        diff = document.documentElement.clientWidth - inner.right;
        Object.assign(this.innerRef.current.style, { left: `${diff}px` })
        return;

      }

      if (targetPosition - (inner.width / 2) < 0 ) {
        return;
      }


      currentPosition = inner.x + (inner.width / 2);
      diff = targetPosition - currentPosition;

      //if targetPos + half of inner width > screenwidth == flush to right side
      Object.assign(this.innerRef.current.style, { left: `${diff}px` })
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
          left: 0,
          right: 0
        }}
      >
        {this.props.position === 'bottom' && this.renderDecoration()}
        <div style={{ display: 'flex' }}>
          <div
            ref={this.innerRef}
            style={{
              overflow: 'auto',
              position: 'relative',
              backgroundColor: 'purple'
            }}
          >
            {this.props.children}
          </div>
        </div>
        {this.props.position === 'top' && this.renderDecoration()}
      </div>
    );
  }
}

Tooltip.propTypes = {
  // ref pointing to the element this tooltip is for
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Tooltip;
