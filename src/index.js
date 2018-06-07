import React from 'react';
import PropTypes from 'prop-types';

const FPS = 20;
const TIMEOUT = 1 / FPS * 1000;

class Marquee extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      animatedWidth: 0,
      overflowWidth: 0,
    }
  }

  componentDidMount() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  }

  componentDidUpdate(prevProps) {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }

    if (this.props.text.length !== prevProps.text.length) {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  }

  handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    }
    else if (this.state.overflowWidth > 0) {
      this._startAnimation();
    }
  }

  handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this._startAnimation();
    }
    else {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  }

  render() {
    const style = {
      position: 'relative',
      display: 'inline-block',
      transform: `translate3d(${-1 * this.state.animatedWidth}px, 0px, 0px)`,
      whiteSpace: 'nowrap'
    };

    return (
      <div className={this.props.className} style={{overflow: 'hidden'}}
           onMouseEnter={this.state.overflowWidth > 0 ? this.handleMouseEnter : null}
           onMouseLeave={this.state.overflowWidth > 0 ? this.handleMouseLeave : null}
           ref={(div) => {this.containerDiv = div}}
      >
        <span ref={(span) => { this.textSpan = span;}} style={style}>{this.props.text}</span>
      </div>
    );
  }

  _startAnimation() {
    clearTimeout(this._marqueeTimer);
    const isLeading = this.state.animatedWidth === 0;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    const animate = () => {
      const {overflowWidth} = this.state;
      let animatedWidth = this.state.animatedWidth + this.props.step;
      const isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth = -1 * overflowWidth;
        }
        else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        this._marqueeTimer = setTimeout(() => {
          this.setState({
            animatedWidth
          });

          this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, this.props.trailing);
      }
      else {
        this.setState({
          animatedWidth
        });

        this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this._marqueeTimer = setTimeout(animate, timeout);
  }

  _measureText() {
    const {forceAnimation} = this.props;
    if (this.containerDiv && this.textSpan) {
      const containerWidth = this.containerDiv.offsetWidth;
      const textWidth = this.textSpan.offsetWidth;
      const overflowWidth =
        forceAnimation ?
        (textWidth - containerWidth) > 0 ? (textWidth - containerWidth) : containerWidth
                       :
        Math.max(textWidth - containerWidth, 0);

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth,
        });
      }
    }
  }
}

Marquee.propTypes = {
  text: PropTypes.node,
  hoverToStop: PropTypes.bool,
  loop: PropTypes.bool,
  leading: PropTypes.number,
  trailing: PropTypes.number,
  className: PropTypes.string,
  step: PropTypes.number,
  forceAnimation: PropTypes.bool,
};

Marquee.defaultProps = {
  text: '',
  hoverToStop: false,
  loop: false,
  leading: 0,
  trailing: 0,
  step: 1,
  forceAnimation: false,
};

module.exports = Marquee;
