import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const HoverDetector = (props) => {
  const [thresholdReached, setThresholdReached] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const divRef = useRef();

  const handleEnter = (e) => {
    const timeoutId = setTimeout(
      handleThresholdReached,
      props.hoverDurationThreshold
    );

    setTimeoutId(timeoutId);

    props.onMouseEnter(e);
  };

  const handleLeave = (e) => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(null);
    setThresholdReached(false);

    props.onMouseLeave(e);
  };

  const handleThresholdReached = () => {
    setThresholdReached(true);
  };

  const { hoverDurationThreshold, ...remainingProps } = props;

  return (
    <div
      {...remainingProps}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={divRef}
    >
      {props.children({
        thresholdReached,
        internalDivRef: divRef,
      })}
    </div>
  );
};

HoverDetector.propTypes = {
  children: PropTypes.func.isRequired,
  hoverDurationThreshold: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

HoverDetector.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default HoverDetector;
