import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cx from 'classnames';

const styles = {
  root: {
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: '100%',
    animation: props => [`reduce ${props.timeout}s linear ${props.delay}s 1 ${props.direction}`],
    '&:hover, &:hover $inner': {
      animationPlayState: 'paused',
    },
  },
  inner: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: props => [`scroll ${props.timeout}s linear ${props.delay}s 1 ${props.direction}`],
  },
  '@keyframes reduce': {
    to: {
      paddingLeft: 0,
    }
  },
  '@keyframes scroll': {
    to: {
      transform: 'translateX(-100%)',
    }
  },
  loop: {
    '&, & $inner': {
      animationIterationCount: 'infinite',
    }
  },
};

class Marquee extends React.PureComponent {
  render() {
    return (
      <div className={cx(this.props.classes.root, this.props.className, {[this.props.classes.loop]: this.props.loop})}>
        <span className={cx(this.props.classes.inner, this.props.classInner)}>{this.props.text}</span>
      </div>
    );
  }
}

Marquee.propTypes = {
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
  classInner: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse', 'initial', 'inherit']),
  loop: PropTypes.bool,
  timeout: PropTypes.number,
};

Marquee.defaultProps = {
  text: '',
  timeout: 40,
  loop: false,
  delay: 0,
  direction: 'normal'
};

module.exports = injectSheet(styles)(Marquee);
