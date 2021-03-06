'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: '100%',
    animation: function animation(props) {
      return ['reduce ' + props.timeout + 's linear ' + props.delay + 's 1 ' + props.direction];
    },
    '&:hover, &:hover $inner': {
      animationPlayState: 'paused'
    }
  },
  inner: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: function animation(props) {
      return ['scroll ' + props.timeout + 's linear ' + props.delay + 's 1 ' + props.direction];
    }
  },
  '@keyframes reduce': {
    to: {
      paddingLeft: 0
    }
  },
  '@keyframes scroll': {
    to: {
      transform: 'translateX(-100%)'
    }
  },
  loop: {
    '&, & $inner': {
      animationIterationCount: 'infinite'
    }
  }
};

var Marquee = function (_React$PureComponent) {
  _inherits(Marquee, _React$PureComponent);

  function Marquee() {
    _classCallCheck(this, Marquee);

    return _possibleConstructorReturn(this, (Marquee.__proto__ || Object.getPrototypeOf(Marquee)).apply(this, arguments));
  }

  _createClass(Marquee, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.props.classes.root, this.props.className, _defineProperty({}, this.props.classes.loop, this.props.loop)) },
        _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)(this.props.classes.inner, this.props.classInner) },
          this.props.text
        )
      );
    }
  }]);

  return Marquee;
}(_react2.default.PureComponent);

Marquee.propTypes = {
  text: _propTypes2.default.node,
  className: _propTypes2.default.string,
  timeout: _propTypes2.default.number,
  classes: _propTypes2.default.object,
  classInner: _propTypes2.default.string,
  loop: _propTypes2.default.bool,
  delay: _propTypes2.default.number,
  direction: _propTypes2.default.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse', 'initial', 'inherit'])
};

Marquee.defaultProps = {
  text: '',
  timeout: 40,
  loop: false,
  delay: 0,
  direction: 'normal'
};

module.exports = (0, _reactJss2.default)(styles)(Marquee);