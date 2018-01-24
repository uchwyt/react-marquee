'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FPS = 20;
var TIMEOUT = 1 / FPS * 1000;

var Marquee = function (_React$Component) {
    _inherits(Marquee, _React$Component);

    function Marquee(props, context) {
        _classCallCheck(this, Marquee);

        var _this = _possibleConstructorReturn(this, (Marquee.__proto__ || Object.getPrototypeOf(Marquee)).call(this, props, context));

        _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);

        _this.state = {
            animatedWidth: 0,
            overflowWidth: 0
        };
        return _this;
    }

    _createClass(Marquee, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._measureText();

            if (this.props.hoverToStop) {
                this._startAnimation();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._measureText();

            if (this.props.hoverToStop) {
                this._startAnimation();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this._marqueeTimer);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.text.length !== nextProps.text.length) {
                clearTimeout(this._marqueeTimer);
                this.setState({
                    animatedWidth: 0
                });
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            if (this.props.hoverToStop) {
                clearTimeout(this._marqueeTimer);
            } else if (this.state.overflowWidth > 0) {
                this._startAnimation();
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            if (this.props.hoverToStop && this.state.overflowWidth > 0) {
                this._startAnimation();
            } else {
                clearTimeout(this._marqueeTimer);
                this.setState({
                    animatedWidth: 0
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = {
                position: 'relative',
                display: 'inline-block',
                transform: 'translate3d(-' + this.state.animatedWidth + 'px, 0px, 0px)',
                whiteSpace: 'nowrap'
            };

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('ui-marquee', this.props.className), style: { overflow: 'hidden' },
                    onMouseEnter: this.state.overflowWidth < 0 ? this.handleMouseEnter : null,
                    onMouseLeave: this.state.overflowWidth < 0 ? this.handleMouseLeave : null,
                    ref: function ref(div) {
                        _this2.containerDiv = div;
                    }
                },
                _react2.default.createElement(
                    'span',
                    { ref: function ref(span) {
                            _this2.textSpan = span;
                        }, style: style },
                    this.props.text
                )
            );
        }
    }, {
        key: '_startAnimation',
        value: function _startAnimation() {
            var _this3 = this;

            clearTimeout(this._marqueeTimer);
            var isLeading = this.state.animatedWidth === 0;
            var timeout = isLeading ? this.props.leading : TIMEOUT;

            var animate = function animate() {
                var overflowWidth = _this3.state.overflowWidth;

                var animatedWidth = _this3.state.animatedWidth + _this3.props.step;
                var isRoundOver = animatedWidth > overflowWidth;

                if (isRoundOver) {
                    if (_this3.props.loop) {
                        animatedWidth = 0;
                    } else {
                        return;
                    }
                }

                if (isRoundOver && _this3.props.trailing) {
                    _this3._marqueeTimer = setTimeout(function () {
                        _this3.setState({
                            animatedWidth: animatedWidth
                        });

                        _this3._marqueeTimer = setTimeout(animate, TIMEOUT);
                    }, _this3.props.trailing);
                } else {
                    _this3.setState({
                        animatedWidth: animatedWidth
                    });

                    _this3._marqueeTimer = setTimeout(animate, TIMEOUT);
                }
            };

            this._marqueeTimer = setTimeout(animate, timeout);
        }
    }, {
        key: '_measureText',
        value: function _measureText() {
            var forceAnimation = this.props.forceAnimation;

            if (this.containerDiv && this.textSpan) {
                var containerWidth = this.containerDiv.offsetWidth;
                var textWidth = this.textSpan.offsetWidth;
                var overflowWidth = forceAnimation ? textWidth - containerWidth > 0 ? textWidth - containerWidth : containerWidth : Math.max(textWidth - containerWidth, 0);

                if (overflowWidth !== this.state.overflowWidth) {
                    this.setState({
                        overflowWidth: overflowWidth
                    });
                }
            }
        }
    }]);

    return Marquee;
}(_react2.default.Component);

Marquee.propTypes = {
    text: _propTypes2.default.node,
    hoverToStop: _propTypes2.default.bool,
    loop: _propTypes2.default.bool,
    leading: _propTypes2.default.number,
    trailing: _propTypes2.default.number,
    className: _propTypes2.default.string,
    step: _propTypes2.default.number,
    forceAnimation: _propTypes2.default.bool
};

Marquee.defaultProps = {
    text: '',
    hoverToStop: false,
    loop: false,
    leading: 0,
    trailing: 0,
    step: 1,
    forceAnimation: false
};

module.exports = Marquee;