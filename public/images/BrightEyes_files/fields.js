require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Example options:

// flags: 'progressive'
// flags: ['progressive']
// quality: 80
// crop: 'fit', 'fill'
// gravity: 'face'
// fetch_format: 'auto'
// width: 300
// height: 300
// effect: blur:200

var TYPES = [{ name: 'crop', prefix: 'c' }, { name: 'effect', prefix: 'e' }, { name: 'fetch_format', prefix: 'f' }, { name: 'flags', prefix: 'fl' }, { name: 'gravity', prefix: 'g' }, { name: 'height', prefix: 'h' }, { name: 'radius', prefix: 'r' }, { name: 'quality', prefix: 'q' }, { name: 'width', prefix: 'w' }];

module.exports = function (id, options) {
  if (!options) options = {};

  var scheme = options.secure ? 'https' : 'http';
  var cloud_name = options.cloud_name;
  if (!cloud_name) throw Error('Missing required options.cloud_name');

  var params = [];

  for (var i = 0; i < TYPES.length; i++) {
    var name = TYPES[i].name;
    var prefix = TYPES[i].prefix;

    if (Array.isArray(options[name])) {
      options[name].forEach(function (opt) {
        params.push(prefix + '_' + opt);
      });
    } else if (options[name] != null) {
      params.push(prefix + '_' + options[name]);
    }
  }

  var urlParams = params.length ? params.join(',') + '/' : '';
  return scheme + '://res.cloudinary.com/' + encodeURIComponent(options.cloud_name) + '/image/upload/' + urlParams + encodeURIComponent(id);
};

},{}],2:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.alert.color.danger,
	error: _theme2.default.alert.color.danger,
	info: _theme2.default.alert.color.info,
	success: _theme2.default.alert.color.success,
	warning: _theme2.default.alert.color.warning
};

},{"../../../theme":80}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

// clone children if a class exists for the tagname
var cloneWithClassnames = function cloneWithClassnames(c) {
	var type = c.type && c.type.displayName ? c.type.displayName : c.type || null;

	if (!type || !classes[type]) return c;

	return (0, _react.cloneElement)(c, {
		className: (0, _noImportant.css)(classes[type])
	});
};

function Alert(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    color = _ref.color,
	    Component = _ref.component,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'color', 'component']);

	props.className = (0, _noImportant.css)(classes.alert, classes[color], className);
	props.children = _react.Children.map(children, cloneWithClassnames);

	return _react2.default.createElement(Component, _extends({}, props, { 'data-alert-type': color }));
};

Alert.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)).isRequired,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string])
};
Alert.defaultProps = {
	component: 'div'
};

module.exports = Alert;

},{"./colors":2,"./styles":4,"aphrodite/no-important":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	colorVariants[color] = {
		backgroundColor: _colors2.default[color].background,
		borderColor: _colors2.default[color].border,
		color: _colors2.default[color].text
	};
});

// Prepare headings
var headingTagnames = {};
['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function (tag) {
	headingTagnames[tag] = { color: 'inherit' };
});

var linkStyles = {
	color: 'inherit',
	textDecoration: 'underline',

	':hover': { color: 'inherit' },
	':focus': { color: 'inherit' }
};

module.exports = _extends({
	alert: {
		borderColor: 'transparent',
		borderRadius: _theme2.default.alert.borderRadius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.alert.borderWidth,
		margin: _theme2.default.alert.margin,
		padding: _theme2.default.alert.padding
	},

	// tagnames
	a: linkStyles,
	Link: linkStyles,
	strong: {
		fontWeight: 500
	}

}, headingTagnames, colorVariants);

},{"../../../theme":80,"./colors":2}],5:[function(require,module,exports){
'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function BlankState(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    heading = _ref.heading,
	    Component = _ref.component,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'heading', 'component']);

	props.className = (0, _noImportant.css)(classes.container, className);

	return _react2.default.createElement(
		Component,
		props,
		!!heading && _react2.default.createElement(
			'h2',
			{ 'data-e2e-blank-state-heading': true, className: (0, _noImportant.css)(classes.heading) },
			heading
		),
		children
	);
};

BlankState.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	heading: _react.PropTypes.string
};
BlankState.defaultProps = {
	component: 'div'
};

/* eslint quote-props: ["error", "as-needed"] */

var classes = _noImportant.StyleSheet.create({
	container: {
		backgroundColor: _theme2.default.blankstate.background,
		borderRadius: _theme2.default.blankstate.borderRadius,
		color: _theme2.default.blankstate.color,
		paddingBottom: _theme2.default.blankstate.paddingVertical,
		paddingLeft: _theme2.default.blankstate.paddingHorizontal,
		paddingRight: _theme2.default.blankstate.paddingHorizontal,
		paddingTop: _theme2.default.blankstate.paddingVertical,
		textAlign: 'center'
	},

	heading: {
		color: 'inherit',

		':last-child': {
			marginBottom: 0
		}
	}
});

module.exports = BlankState;

},{"../../../theme":80,"aphrodite/no-important":undefined,"react":undefined}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commonClasses = _noImportant.StyleSheet.create(_styles2.default.common);
var stylesheetCache = {};
function getStyleSheet(variant, color) {
	var cacheKey = variant + '-' + color;
	if (!stylesheetCache[cacheKey]) {
		var variantStyles = _styles2.default[variant](color);
		stylesheetCache[cacheKey] = _noImportant.StyleSheet.create(variantStyles);
	}
	return stylesheetCache[cacheKey];
}

var BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
var BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
var BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];

// NOTE must NOT be functional component to allow `refs`

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    active = _props.active,
			    aphroditeStyles = _props.aphroditeStyles,
			    block = _props.block,
			    className = _props.className,
			    color = _props.color,
			    Tag = _props.component,
			    disabled = _props.disabled,
			    size = _props.size,
			    variant = _props.variant,
			    props = _objectWithoutProperties(_props, ['active', 'aphroditeStyles', 'block', 'className', 'color', 'component', 'disabled', 'size', 'variant']);

			// get the styles


			var variantClasses = getStyleSheet(variant, color);
			props.className = _noImportant.css.apply(undefined, [commonClasses.base, commonClasses[size], variantClasses.base, block ? commonClasses.block : null, disabled ? commonClasses.disabled : null, active ? variantClasses.active : null].concat(_toConsumableArray(aphroditeStyles)));
			if (className) {
				props.className += ' ' + className;
			}

			// return an anchor or button
			if (!Tag) {
				Tag = props.href ? 'a' : 'button';
			}
			// Ensure buttons don't submit by default
			if (Tag === 'button' && !props.type) {
				props.type = 'button';
			}

			return _react2.default.createElement(Tag, props);
		}
	}]);

	return Button;
}(_react.Component);

;

Button.propTypes = {
	active: _react.PropTypes.bool,
	aphroditeStyles: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	})),
	block: _react.PropTypes.bool,
	color: _react.PropTypes.oneOf(BUTTON_COLORS),
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	disabled: _react.PropTypes.bool,
	href: _react.PropTypes.string,
	size: _react.PropTypes.oneOf(BUTTON_SIZES),
	variant: _react.PropTypes.oneOf(BUTTON_VARIANTS)
};
Button.defaultProps = {
	aphroditeStyles: [],
	color: 'default',
	variant: 'fill'
};

module.exports = Button;

},{"./styles":7,"aphrodite/no-important":undefined,"react":undefined}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Button
// ==============================

var _css = require('../../../utils/css');

var _color = require('../../../utils/color');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Common Styles
// ----------------

exports.common = {
	// Base Button
	// ----------------
	base: {
		'appearance': 'none',
		'background': 'none',
		'borderWidth': _theme2.default.button.borderWidth,
		'borderStyle': 'solid',
		'borderColor': 'transparent',
		'borderRadius': _theme2.default.button.borderRadius,
		'cursor': 'pointer',
		'display': 'inline-block',
		'fontWeight': _theme2.default.button.font.weight,
		'height': _theme2.default.component.height,
		'lineHeight': _theme2.default.component.lineHeight,
		'marginBottom': 0,
		'padding': '0 ' + _theme2.default.button.paddingHorizontal,
		'outline': 0,
		'textAlign': 'center',
		'touchAction': 'manipulation',
		'userSelect': 'none',
		'verticalAlign': 'middle',
		'whiteSpace': 'nowrap',

		':hover': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		},
		':focus': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		}
	},
	// Block Display
	// ----------------
	block: {
		display: 'block',
		width: '100%'
	},
	// Disabled
	// ----------------
	disabled: {
		opacity: 0.4,
		pointerEvents: 'none'
	},
	// Sizes
	// ----------------
	large: {
		fontSize: _theme2.default.font.size.large
	},
	default: {
		fontSize: _theme2.default.font.size.default
	},
	small: {
		fontSize: _theme2.default.font.size.small
	},
	xsmall: {
		fontSize: _theme2.default.font.size.xsmall,
		lineHeight: '1.9',
		paddingLeft: '.66em',
		paddingRight: '.66em'
	}
};

// Fill Variant
// ----------------
function buttonFillVariant(textColor, bgColor) {
	var hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: (0, _color.darken)(bgColor, 5) + ' ' + (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 15),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: textColor,
		outline: 'none'
	});
	var focusStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: (0, _color.darken)(bgColor, 5) + ' ' + (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 15),
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(bgColor, 25),
		color: textColor,
		outline: 'none'
	});
	var activeStyles = {
		backgroundColor: (0, _color.darken)(bgColor, 10),
		backgroundImage: 'none',
		borderColor: (0, _color.darken)(bgColor, 25) + ' ' + (0, _color.darken)(bgColor, 15) + ' ' + (0, _color.darken)(bgColor, 10),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 5), (0, _color.darken)(bgColor, 10), bgColor), {
			'borderColor': (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 20) + ' ' + (0, _color.darken)(bgColor, 25),
			'boxShadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
			'color': textColor,
			'fontWeight': 400,
			'textShadow': '0 -1px 0 rgba(0, 0, 0, 0.25)',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}
// TODO: This is pretty hacky, needs to be consolidated with the Variant() method
// above (needs more theme variables to be implemented though)
function buttonFillDefault() {
	var borderColor = _theme2.default.input.border.color.default;
	var hoverStyles = _extends({}, (0, _css.gradientVertical)('#fff', '#eee'), {
		borderColor: (0, _color.darken)(borderColor, 5) + ' ' + (0, _color.darken)(borderColor, 5) + ' ' + (0, _color.darken)(borderColor, 10),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: _theme2.default.color.text
	});
	var focusStyles = {
		borderColor: _theme2.default.color.primary,
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(_theme2.default.color.primary, 10),
		color: _theme2.default.color.text,
		outline: 'none'
	};
	var activeStyles = {
		background: '#e6e6e6',
		borderColor: (0, _color.darken)(borderColor, 10),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: _theme2.default.color.text
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)('#fafafa', '#eaeaea'), {
			'borderColor': borderColor + ' ' + (0, _color.darken)(borderColor, 6) + ' ' + (0, _color.darken)(borderColor, 12),
			'color': _theme2.default.color.text,
			'textShadow': '0 1px 0 white',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),

		// gross hack
		active: _extends({}, activeStyles, {

			':hover': activeStyles,
			':focus': _extends({}, activeStyles, focusStyles, {
				boxShadow: '0 0 0 3px ' + (0, _color.fade)(_theme2.default.color.primary, 10) + ', inset 0 1px 2px rgba(0, 0, 0, 0.1)'
			}),
			':active': activeStyles
		})
	};
}
exports.fill = function (color) {
	switch (color) {
		case 'default':
			return buttonFillDefault();
		case 'cancel':
		case 'delete':
			return buttonFillVariant('white', _theme2.default.button.danger.bgColor);
		default:
			return buttonFillVariant('white', _theme2.default.button[color].bgColor);
	}
};

// Hollow Variant
// ----------------
function buttonHollowVariant(textColor, borderColor) {
	var focusAndHoverStyles = {
		backgroundImage: 'none',
		backgroundColor: (0, _color.fade)(borderColor, 15),
		borderColor: (0, _color.darken)(borderColor, 15),
		boxShadow: 'none',
		color: textColor,
		outline: 'none'
	};
	var focusOnlyStyles = {
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(borderColor, 10)
	};
	var activeStyles = {
		backgroundColor: (0, _color.fade)(borderColor, 35),
		borderColor: (0, _color.darken)(borderColor, 25),
		boxShadow: 'none'
	};

	return {
		base: {
			'background': 'none',
			'borderColor': borderColor,
			'color': textColor,

			':hover': focusAndHoverStyles,
			':focus ': _extends({}, focusAndHoverStyles, focusOnlyStyles),
			':active': activeStyles
		},
		active: activeStyles
	};
};
exports.hollow = function (color) {
	// TODO: better handling of cancel and delete colors
	if (color === 'cancel' || color === 'delete') color = 'danger';

	return buttonHollowVariant(_theme2.default.button[color].bgColor, _theme2.default.button[color].borderColor);
};

// Link Variant
// ----------------
function buttonLinkVariant(textColor, hoverColor) {
	var hoverStyles = {
		color: hoverColor,
		textDecoration: 'underline'
	};
	return {
		base: {
			'background': 'none',
			'border': 0,
			'boxShadow': 'none',
			'color': textColor,
			'fontWeight': 'normal',
			'outline': 'none',

			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': hoverStyles
		},
		active: hoverStyles
	};
};
function buttonLinkDelete() {
	var styles = buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
	var hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(_theme2.default.color.danger, 10), (0, _color.darken)(_theme2.default.color.danger, 10)), {
		backgroundColor: _theme2.default.color.danger,
		borderColor: (0, _color.darken)(_theme2.default.color.danger, 4) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 12),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: 'white',
		textDecoration: 'none'
	});
	var activeStyles = {
		backgroundColor: (0, _color.darken)(_theme2.default.color.danger, 4),
		backgroundImage: 'none',
		borderColor: (0, _color.darken)(_theme2.default.color.danger, 12) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: 'white'
	};
	return {
		base: _extends({}, styles.base, {
			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}

exports.link = function (color) {
	switch (color) {
		case 'default':
			return buttonLinkVariant(_theme2.default.color.link, _theme2.default.color.linkHover);
		case 'cancel':
			return buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
		case 'delete':
			return buttonLinkDelete();
		default:
			return buttonLinkVariant(_theme2.default.color[color], _theme2.default.color[color]);
	}
};

},{"../../../theme":80,"../../../utils/color":83,"../../../utils/css":85}],8:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function Center(_ref) {
	var className = _ref.className,
	    Component = _ref.component,
	    height = _ref.height,
	    style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'height', 'style']);

	props.className = (0, _noImportant.css)(classes.center, className);
	props.style = _extends({ height: height }, style);

	return _react2.default.createElement(Component, props);
};
Center.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
Center.defaultProps = {
	component: 'div',
	height: 'auto'
};

module.exports = Center;

},{"./styles":9,"aphrodite/no-important":undefined,"react":undefined}],9:[function(require,module,exports){
'use strict';

// ==============================
// Center
// ==============================

module.exports = {
	center: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

},{}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseColors = {};
['danger', 'info', 'primary', 'success', 'warning'].forEach(function (color) {
	baseColors[color] = {
		background: (0, _color.fade)(_theme2.default.color[color], 10),
		backgroundActive: (0, _color.fade)(_theme2.default.color[color], 20),
		backgroundHover: (0, _color.fade)(_theme2.default.color[color], 15),
		text: _theme2.default.color[color]
	};
});
var invertedColors = {};
['danger', 'info', 'primary', 'success', 'warning'].forEach(function (color) {
	invertedColors[color + '__inverted'] = {
		background: _theme2.default.color[color],
		backgroundActive: (0, _color.lighten)(_theme2.default.color[color], 5),
		backgroundHover: (0, _color.lighten)(_theme2.default.color[color], 15),
		text: 'white'
	};
});

module.exports = _extends({
	default: {
		background: _theme2.default.color.gray10,
		backgroundActive: _theme2.default.color.gray20,
		backgroundHover: _theme2.default.color.gray15,
		text: _theme2.default.color.gray60
	}
}, baseColors, {

	// inverted
	default__inverted: {
		background: _theme2.default.color.gray60,
		backgroundActive: (0, _color.lighten)(_theme2.default.color.gray60, 5),
		backgroundHover: (0, _color.lighten)(_theme2.default.color.gray60, 15),
		text: 'white'
	}
}, invertedColors);

},{"../../../theme":80,"../../../utils/color":83}],11:[function(require,module,exports){
'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function Chip(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    color = _ref.color,
	    inverted = _ref.inverted,
	    label = _ref.label,
	    onClear = _ref.onClear,
	    onClick = _ref.onClick,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'color', 'inverted', 'label', 'onClear', 'onClick']);

	props.className = (0, _noImportant.css)(classes.chip, className);
	var labelClassName = (0, _noImportant.css)(classes.button, classes.label, classes['button__' + color + (inverted ? '__inverted' : '')]);
	var clearClassName = (0, _noImportant.css)(classes.button, classes.clear, classes['button__' + color + (inverted ? '__inverted' : '')]);

	return _react2.default.createElement(
		'div',
		props,
		_react2.default.createElement(
			'button',
			{ type: 'button', onClick: onClick, className: labelClassName },
			label,
			children
		),
		!!onClear && _react2.default.createElement(
			'button',
			{ type: 'button', onClick: onClear, className: clearClassName },
			'\xD7'
		)
	);
};

Chip.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)).isRequired,
	inverted: _react.PropTypes.bool,
	label: _react2.default.PropTypes.string.isRequired,
	onClear: _react2.default.PropTypes.func,
	onClick: _react2.default.PropTypes.func
};
Chip.defaultProps = {
	color: 'default'
};

module.exports = Chip;

},{"./colors":10,"./styles":12,"aphrodite/no-important":undefined,"react":undefined}],12:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _css = require('../../../utils/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	var hoverStyles = {
		backgroundColor: _colors2.default[color].backgroundHover
	};

	colorVariants['button__' + color] = {
		backgroundColor: _colors2.default[color].background,
		color: _colors2.default[color].text,

		':hover': hoverStyles,
		':focus': hoverStyles,
		':active': {
			backgroundColor: _colors2.default[color].backgroundActive
		}
	};
});

module.exports = _extends({
	chip: {
		display: 'inline-block',
		fontSize: _theme2.default.font.size.small,
		fontWeight: 500,
		marginRight: '0.5em',
		overflow: 'hidden',
		lineHeight: '2.2em'
	},

	// tagnames
	button: {
		appearance: 'none',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		display: 'block',
		float: 'left',
		padding: '0 .9em',
		outline: 'none',

		// make pills - exaggerate the padding toward the radii so it looks even
		':first-child': _extends({}, (0, _css.borderLeftRadius)('3em'), {
			paddingLeft: '1.1em'
		}),
		':last-child': _extends({}, (0, _css.borderRightRadius)('3em'), {
			paddingRight: '1.1em'
		})
	},

	// provide separation between the label and clear buttons
	// floating stops the margins from collapsing into eaching

	label: { marginRight: 1 },
	clear: { marginLeft: 1 }

}, colorVariants);

},{"../../../theme":80,"../../../utils/css":85,"./colors":10}],13:[function(require,module,exports){
'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function Container(_ref) {
	var className = _ref.className,
	    clearFloatingChildren = _ref.clearFloatingChildren,
	    Component = _ref.component,
	    width = _ref.width,
	    props = _objectWithoutProperties(_ref, ['className', 'clearFloatingChildren', 'component', 'width']);

	props.className = (0, _noImportant.css)(classes.container, classes[width], clearFloatingChildren ? classes.clearfix : null, className);

	return _react2.default.createElement(Component, props);
};

Container.propTypes = {
	clearFloatingChildren: _react.PropTypes.bool,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	width: _react.PropTypes.oneOf(Object.keys(_sizes2.default)).isRequired
};
Container.defaultProps = {
	component: 'div',
	width: 'large'
};

module.exports = Container;

},{"./sizes":14,"./styles":15,"aphrodite/no-important":undefined,"react":undefined}],14:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.container.size.small,
	medium: _theme2.default.container.size.medium,
	large: _theme2.default.container.size.large
};

},{"../../../theme":80}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Container
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare sizes
var sizeVariants = {};
Object.keys(_sizes2.default).forEach(function (size) {
	sizeVariants[size] = {
		maxWidth: _sizes2.default[size]
	};
});

/*
	Micro clearfix hack
	1.	The space content is one way to avoid an Opera bug when the
			contenteditable attribute is included anywhere else in the document.
			Otherwise it causes space to appear at the top and bottom of elements
			that are clearfixed.
	2.	The use of `table` rather than `block` is only necessary if using
			`:before` to contain the top-margins of child elements.
*/
var clearfixStyles = {
	clear: 'both',
	content: '" "', // 1
	display: 'table' // 2
};

module.exports = _extends({
	container: {
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingLeft: _theme2.default.container.gutter,
		paddingRight: _theme2.default.container.gutter
	},

	// clear floating children
	clearfix: {
		':before': clearfixStyles,
		':after': clearfixStyles
	}

}, sizeVariants);

},{"../../../theme":80,"./sizes":14}],16:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function DropdownButton(_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		_Button2.default,
		props,
		children,
		_react2.default.createElement('span', { className: (0, _noImportant.css)(classes.arrow) })
	);
};

// NOTE
// 1: take advantage of `currentColor` by leaving border top color undefined
// 2: even though the arrow is vertically centered, visually it appears too low
//    because of lowercase characters beside it
var classes = _noImportant.StyleSheet.create({
	arrow: {
		borderLeft: '0.3em solid transparent',
		borderRight: '0.3em solid transparent',
		borderTop: '0.3em solid', // 1
		display: 'inline-block',
		height: 0,
		marginTop: '-0.125em', // 2
		verticalAlign: 'middle',
		width: 0,

		// add spacing
		':first-child': {
			marginRight: '0.5em'
		},
		':last-child': {
			marginLeft: '0.5em'
		}
	}
});

module.exports = DropdownButton;

},{"../Button":6,"aphrodite/no-important":undefined,"react":undefined}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

var Form = function (_Component) {
	_inherits(Form, _Component);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
	}

	_createClass(Form, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				formLayout: this.props.layout,
				labelWidth: this.props.labelWidth
			};
		}
	}, {
		key: 'render',
		value: function render() {
			// NOTE `labelWidth` is declared to remove it from `props`, though never used
			var _props = this.props,
			    className = _props.className,
			    Component = _props.component,
			    labelWidth = _props.labelWidth,
			    layout = _props.layout,
			    props = _objectWithoutProperties(_props, ['className', 'component', 'labelWidth', 'layout']);

			props.className = (0, _noImportant.css)(classes.Form, classes['Form__' + layout], className);

			return _react2.default.createElement(Component, props);
		}
	}]);

	return Form;
}(_react.Component);

;

Form.childContextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
Form.propTypes = {
	children: _react.PropTypes.node.isRequired,
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	layout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline'])
};
Form.defaultProps = {
	component: 'form',
	layout: 'basic'
};

module.exports = Form;

},{"./styles":18,"aphrodite/no-important":undefined,"react":undefined}],18:[function(require,module,exports){
"use strict";

// ==============================
// Form
// ==============================

module.exports = {
	Form: {}
};

},{}],19:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _FormLabel = require('../FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

var FormField = function (_Component) {
	_inherits(FormField, _Component);

	function FormField() {
		_classCallCheck(this, FormField);

		var _this = _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this));

		_this.formFieldId = generateId();
		return _this;
	}

	_createClass(FormField, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				formFieldId: this.formFieldId
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _context = this.context,
			    _context$formLayout = _context.formLayout,
			    formLayout = _context$formLayout === undefined ? 'basic' : _context$formLayout,
			    labelWidth = _context.labelWidth;

			var _props = this.props,
			    aphroditeStyles = _props.aphroditeStyles,
			    children = _props.children,
			    className = _props.className,
			    cropLabel = _props.cropLabel,
			    htmlFor = _props.htmlFor,
			    label = _props.label,
			    offsetAbsentLabel = _props.offsetAbsentLabel,
			    props = _objectWithoutProperties(_props, ['aphroditeStyles', 'children', 'className', 'cropLabel', 'htmlFor', 'label', 'offsetAbsentLabel']);

			props.className = (0, _noImportant.css)(classes.FormField, classes['FormField--form-layout-' + formLayout], offsetAbsentLabel ? classes['FormField--offset-absent-label'] : null, aphroditeStyles);
			if (className) {
				props.className += ' ' + className;
			}
			if (offsetAbsentLabel && labelWidth) {
				props.style = _extends({
					paddingLeft: labelWidth
				}, props.style);
			}

			// elements
			var componentLabel = label ? _react2.default.createElement(
				_FormLabel2.default,
				{ htmlFor: htmlFor, cropText: cropLabel },
				label
			) : null;

			return _react2.default.createElement(
				'div',
				_extends({}, props, { htmlFor: htmlFor }),
				componentLabel,
				children
			);
		}
	}]);

	return FormField;
}(_react.Component);

;

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormField.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
FormField.childContextTypes = {
	formFieldId: _react.PropTypes.string
};
FormField.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	children: _react.PropTypes.node,
	cropLabel: _react.PropTypes.bool,
	htmlFor: _react2.default.PropTypes.string,
	label: _react2.default.PropTypes.string,
	offsetAbsentLabel: _react2.default.PropTypes.bool
};

function generateId() {
	return Math.random().toString(36).substr(2, 9);
};

module.exports = FormField;

},{"../FormLabel":24,"./styles":20,"aphrodite/no-important":undefined,"react":undefined}],20:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // ==============================
// Form Field
// ==============================

module.exports = {
	'FormField': {
		marginBottom: '1em',
		position: 'relative'
	},

	// when inside a horizontal form

	'FormField--form-layout-horizontal': _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
		display: 'table',
		tableLayout: 'fixed',
		width: '100%'
	}),

	// inside horizontal form
	// typically for use with submit button inside
	'FormField--offset-absent-label': {
		paddingLeft: _theme2.default.form.label.width
	},

	// when inside an inline form

	'FormField--form-layout-inline': {
		'display': 'inline-block',
		'paddingLeft': '0.25em',
		'paddingRight': '0.25em',
		'verticalAlign': 'top',

		':first-child': { paddingLeft: 0 },
		':last-child': { paddingRight: 0 }
	}
};

},{"../../../theme":80}],21:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _concatClassnames = require('../../../utils/concatClassnames');

var _concatClassnames2 = _interopRequireDefault(_concatClassnames);

var _noedit = require('./noedit');

var _noedit2 = _interopRequireDefault(_noedit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

// NOTE must NOT be functional component to allow `refs`

var FormInput = function (_Component) {
	_inherits(FormInput, _Component);

	function FormInput() {
		_classCallCheck(this, FormInput);

		return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).apply(this, arguments));
	}

	_createClass(FormInput, [{
		key: 'blur',
		value: function blur() {
			this.target.blur();
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.target.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    aphroditeStyles = _props.aphroditeStyles,
			    className = _props.className,
			    disabled = _props.disabled,
			    id = _props.id,
			    multiline = _props.multiline,
			    noedit = _props.noedit,
			    size = _props.size,
			    props = _objectWithoutProperties(_props, ['aphroditeStyles', 'className', 'disabled', 'id', 'multiline', 'noedit', 'size']);

			// NOTE return a different component for `noedit`


			if (noedit) return _react2.default.createElement(_noedit2.default, this.props);

			var _context = this.context,
			    formFieldId = _context.formFieldId,
			    formLayout = _context.formLayout;


			props.id = id || formFieldId;
			props.className = _noImportant.css.apply(undefined, [classes.FormInput, classes['FormInput__size--' + size], disabled ? classes['FormInput--disabled'] : null, formLayout ? classes['FormInput--form-layout-' + formLayout] : null].concat(_toConsumableArray((0, _concatClassnames2.default)(aphroditeStyles))));
			if (className) {
				props.className += ' ' + className;
			}

			var setRef = function setRef(n) {
				return _this2.target = n;
			};
			var Tag = multiline ? 'textarea' : 'input';

			return _react2.default.createElement(Tag, _extends({
				ref: setRef,
				disabled: props.disabled
			}, props));
		}
	}]);

	return FormInput;
}(_react.Component);

;

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormInput.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	multiline: _react.PropTypes.bool,
	size: _react.PropTypes.oneOf(['default', 'small', 'large']),
	type: _react.PropTypes.string
};
FormInput.defaultProps = {
	size: 'default',
	type: 'text'
};
FormInput.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: _react.PropTypes.string
};

module.exports = FormInput;

},{"../../../utils/concatClassnames":84,"./noedit":22,"./styles":23,"aphrodite/no-important":undefined,"react":undefined}],22:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint quote-props: ["error", "as-needed"] */

function FormInputNoedit(_ref) {
	var className = _ref.className,
	    Component = _ref.component,
	    cropText = _ref.cropText,
	    multiline = _ref.multiline,
	    noedit = _ref.noedit,
	    type = _ref.type,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'cropText', 'multiline', 'noedit', 'type']);

	props.className = (0, _noImportant.css)(classes.noedit, cropText ? classes.cropText : null, multiline ? classes.multiline : null, props.href || props.onClick ? classes.anchor : null, className);

	return _react2.default.createElement(Component, props);
};

FormInputNoedit.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	cropText: _react.PropTypes.bool
};
FormInputNoedit.defaultProps = {
	component: 'span'
};

var anchorHoverAndFocusStyles = {
	backgroundColor: (0, _color.fade)(_theme2.default.color.link, 10),
	borderColor: (0, _color.fade)(_theme2.default.color.link, 10),
	color: _theme2.default.color.link,
	outline: 'none',
	textDecoration: 'underline'
};

var classes = _noImportant.StyleSheet.create({
	noedit: {
		appearance: 'none',
		backgroundColor: _theme2.default.input.background.noedit,
		backgroundImage: 'none',
		borderColor: _theme2.default.input.border.color.noedit,
		borderRadius: _theme2.default.input.border.radius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.input.border.width,
		color: _theme2.default.color.gray80,
		display: 'inline-block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight,
		padding: '0 ' + _theme2.default.input.paddingHorizontal,
		transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		verticalAlign: 'middle',

		// prevent empty inputs from collapsing by adding content
		':empty:before': {
			color: _theme2.default.color.gray40,
			content: '"(no value)"'
		}
	},

	multiline: {
		display: 'block',
		height: 'auto',
		lineHeight: '1.4',
		paddingBottom: '0.6em',
		paddingTop: '0.6em'
	},

	// indicate clickability when using an anchor
	anchor: {
		backgroundColor: (0, _color.fade)(_theme2.default.color.link, 5),
		borderColor: (0, _color.fade)(_theme2.default.color.link, 10),
		color: _theme2.default.color.link,
		marginRight: 5,
		minWidth: 0,
		textDecoration: 'none',

		':hover': anchorHoverAndFocusStyles,
		':focus': anchorHoverAndFocusStyles
	}
});

module.exports = FormInputNoedit;

},{"../../../theme":80,"../../../utils/color":83,"aphrodite/no-important":undefined,"react":undefined}],23:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	'FormInput': {
		'appearance': 'none',
		'backgroundColor': _theme2.default.input.background.default,
		'backgroundImage': 'none',
		'borderColor': _theme2.default.input.border.color.default,
		'borderRadius': _theme2.default.input.border.radius,
		'borderStyle': 'solid',
		'borderWidth': _theme2.default.input.border.width,
		'boxShadow': _theme2.default.input.boxShadow,
		'color': 'inherit', // FIXME
		'display': 'block',
		'height': _theme2.default.input.height,
		'lineHeight': _theme2.default.input.lineHeight,
		'padding': '0 ' + _theme2.default.input.paddingHorizontal,
		'transition': 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		'width': '100%',

		':hover': {
			borderColor: _theme2.default.input.border.color.hover,
			outline: 0
		},
		':focus': {
			borderColor: _theme2.default.input.border.color.focus,
			boxShadow: _theme2.default.input.boxShadowFocus,
			outline: 0
		}
	},
	'FormInput--disabled': {
		backgroundColor: _theme2.default.input.background.disabled,
		pointerEvents: 'none'
	},

	// sizes
	'FormInput__size--small': {
		fontSize: _theme2.default.font.size.small
	},
	'FormInput__size--large': {
		fontSize: _theme2.default.font.size.large
	}
}; // ==============================
// Form Input
// ==============================

},{"../../../theme":80}],24:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function FormLabel(_ref, _ref2) {
	var formFieldId = _ref2.formFieldId,
	    formLayout = _ref2.formLayout,
	    labelWidth = _ref2.labelWidth;

	var aphroditeStyles = _ref.aphroditeStyles,
	    className = _ref.className,
	    Component = _ref.component,
	    cropText = _ref.cropText,
	    htmlFor = _ref.htmlFor,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'className', 'component', 'cropText', 'htmlFor']);

	props.htmlFor = htmlFor || formFieldId;
	props.className = (0, _noImportant.css)(classes.FormLabel, formLayout ? classes['FormLabel--form-layout-' + formLayout] : null, cropText ? classes['FormLabel--crop-text'] : null, aphroditeStyles);
	if (className) {
		props.className += ' ' + className;
	}
	if (labelWidth) {
		props.style = _extends({
			width: labelWidth
		}, props.style);
	}

	return _react2.default.createElement(Component, props);
};

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormLabel.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	cropText: _react.PropTypes.bool
};
FormLabel.defaultProps = {
	component: 'label'
};
FormLabel.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: _react.PropTypes.string,
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

module.exports = FormLabel;

},{"./styles":25,"aphrodite/no-important":undefined,"react":undefined}],25:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // ==============================
// Form Label
// ==============================

module.exports = {
	'FormLabel': {
		color: _theme2.default.form.label.color,
		fontSize: _theme2.default.form.label.fontSize,
		fontWeight: _theme2.default.form.label.fontWeight,
		display: 'inline-block',
		marginBottom: '0.5em'
	},

	// when inside a horizontal form

	'FormLabel--form-layout-horizontal': _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
		display: 'table-cell',
		lineHeight: _theme2.default.component.lineHeight, // fix
		marginBottom: 0,
		paddingRight: 5,
		verticalAlign: 'top',
		width: _theme2.default.form.label.width
	}),

	// crop long text

	'FormLabel--crop-text': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	}
};

},{"../../../theme":80}],26:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function FormNote(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    Component = _ref.component,
	    html = _ref.html,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'component', 'html']);

	props.className = (0, _noImportant.css)(classes.note, className);

	// Property Violation
	if (children && html) {
		console.error('Warning: FormNote cannot render `children` and `html`. You must provide one or the other.');
	}

	return html ? _react2.default.createElement(Component, _extends({}, props, { dangerouslySetInnerHTML: { __html: html } })) : _react2.default.createElement(
		Component,
		props,
		children
	);
};
FormNote.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	html: _react.PropTypes.string
};
FormNote.defaultProps = {
	component: 'div'
};

module.exports = FormNote;

},{"./styles":27,"aphrodite/no-important":undefined,"react":undefined}],27:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	note: {
		color: _theme2.default.form.note.color,
		fontSize: _theme2.default.form.note.fontSize,
		marginTop: _theme2.default.spacing.small
	}
}; // ==============================
// Form Note
// ==============================

},{"../../../theme":80}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

var FormSelect = function (_Component) {
	_inherits(FormSelect, _Component);

	function FormSelect() {
		_classCallCheck(this, FormSelect);

		return _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).apply(this, arguments));
	}

	_createClass(FormSelect, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    id = _props.id,
			    options = _props.options,
			    props = _objectWithoutProperties(_props, ['children', 'id', 'options']);

			var formFieldId = this.context.formFieldId;


			props.className = (0, _noImportant.css)(classes.select, props.disabled ? classes['select--disabled'] : null);
			props.id = id || formFieldId;

			// Property Violation
			if (options && children) {
				console.error('Warning: FormSelect cannot render `children` and `options`. You must provide one or the other.');
			}

			return _react2.default.createElement(
				'div',
				{ className: (0, _noImportant.css)(classes.container) },
				options ? _react2.default.createElement(
					'select',
					props,
					options.map(function (opt) {
						return _react2.default.createElement(
							'option',
							{ key: opt.value, value: opt.value },
							opt.label
						);
					})
				) : _react2.default.createElement(
					'select',
					props,
					children
				),
				_react2.default.createElement(
					'span',
					{ className: (0, _noImportant.css)(classes.arrows, props.disabled ? classes['arrows--disabled'] : null) },
					_react2.default.createElement('span', { className: (0, _noImportant.css)(classes.arrow, classes.arrowTop) }),
					_react2.default.createElement('span', { className: (0, _noImportant.css)(classes.arrow, classes.arrowBottom) })
				)
			);
		}
	}]);

	return FormSelect;
}(_react.Component);

;

FormSelect.contextTypes = {
	formFieldId: _react.PropTypes.string
};
FormSelect.propTypes = {
	onChange: _react.PropTypes.func.isRequired,
	options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		label: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	})),
	value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

module.exports = FormSelect;

},{"./styles":29,"aphrodite/no-important":undefined,"react":undefined}],29:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==============================
// Form Select
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

module.exports = {
	container: {
		position: 'relative'
	},

	// select node
	select: {
		appearance: 'none',
		backgroundColor: _theme2.default.input.background.default,
		backgroundImage: 'none',
		borderColor: _theme2.default.input.border.color.default,
		borderBottomColor: (0, _color.darken)(_theme2.default.input.border.color.default, 4),
		borderTopColor: (0, _color.lighten)(_theme2.default.input.border.color.default, 4),
		borderRadius: _theme2.default.input.border.radius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.input.border.width,
		boxShadow: _theme2.default.select.boxShadow,
		color: 'inherit', // FIXME
		display: 'block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight,
		padding: '0 ' + _theme2.default.input.paddingHorizontal,
		transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		width: '100%',

		':hover': {
			borderColor: _theme2.default.input.border.color.hover,
			outline: 0
		},
		':focus': {
			borderColor: _theme2.default.input.border.color.focus,
			boxShadow: _theme2.default.input.boxShadowFocus,
			outline: 0
		}
	},
	'select--disabled': {
		backgroundColor: _theme2.default.input.background.disabled,
		pointerEvents: 'none'
	},

	// arrows
	arrows: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		height: _theme2.default.input.height,
		justifyContent: 'center',
		pointerEvents: 'none',
		position: 'absolute',
		right: 0,
		top: 0,
		width: _theme2.default.input.height
	},
	arrow: {
		borderLeft: '0.3em solid transparent',
		borderRight: '0.3em solid transparent',
		display: 'inline-block',
		height: 0,
		verticalAlign: 'middle',
		width: 0,
		zIndex: 1
	},
	arrowTop: {
		borderBottom: '0.3em solid',
		marginBottom: '0.1em'
	},
	arrowBottom: {
		borderTop: '0.3em solid',
		marginTop: '0.1em'
	}
};

},{"../../../theme":80,"../../../utils/color":83}],30:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.glyph.color.danger,
	inherit: _theme2.default.glyph.color.inherit,
	inverted: _theme2.default.glyph.color.inverted,
	primary: _theme2.default.glyph.color.primary,
	success: _theme2.default.glyph.color.success,
	warning: _theme2.default.glyph.color.warning
};

},{"../../../theme":80}],31:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _octicons = require('./octicons');

var _octicons2 = _interopRequireDefault(_octicons);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

// FIXME static octicon classes leaning on Elemental to avoid duplicate
// font and CSS; inflating the project size

function Glyph(_ref) {
	var aphroditeStyles = _ref.aphroditeStyles,
	    className = _ref.className,
	    color = _ref.color,
	    Component = _ref.component,
	    name = _ref.name,
	    size = _ref.size,
	    style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'className', 'color', 'component', 'name', 'size', 'style']);

	var colorIsValidType = Object.keys(_colors2.default).includes(color);
	props.className = (0, _noImportant.css)(classes.glyph, colorIsValidType && classes['color__' + color], classes['size__' + size], aphroditeStyles) + (' ' + _octicons2.default[name]);
	if (className) {
		props.className += ' ' + className;
	}

	// support random color strings
	props.style = _extends({
		color: !colorIsValidType ? color : null
	}, style);

	return _react2.default.createElement(Component, props);
};

Glyph.propTypes = {
	aphroditeStyles: _react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	}),
	color: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(Object.keys(_colors2.default)), _react.PropTypes.string] // support random color strings
	),
	name: _react.PropTypes.oneOf(Object.keys(_octicons2.default)).isRequired,
	size: _react.PropTypes.oneOf(Object.keys(_sizes2.default))
};
Glyph.defaultProps = {
	component: 'i',
	color: 'inherit',
	size: 'small'
};

module.exports = Glyph;

},{"./colors":30,"./octicons":32,"./sizes":33,"./styles":34,"aphrodite/no-important":undefined,"react":undefined}],32:[function(require,module,exports){
'use strict';

/* eslint quote-props: ["error", "as-needed"] */

module.exports = {
	alert: 'octicon octicon-alert',
	'arrow-down': 'octicon octicon-arrow-down',
	'arrow-left': 'octicon octicon-arrow-left',
	'arrow-right': 'octicon octicon-arrow-right',
	'arrow-small-down': 'octicon octicon-arrow-small-down',
	'arrow-small-left': 'octicon octicon-arrow-small-left',
	'arrow-small-right': 'octicon octicon-arrow-small-right',
	'arrow-small-up': 'octicon octicon-arrow-small-up',
	'arrow-up': 'octicon octicon-arrow-up',
	microscope: 'octicon octicon-microscope',
	beaker: 'octicon octicon-beaker',
	bell: 'octicon octicon-bell',
	book: 'octicon octicon-book',
	bookmark: 'octicon octicon-bookmark',
	briefcase: 'octicon octicon-briefcase',
	broadcast: 'octicon octicon-broadcast',
	browser: 'octicon octicon-browser',
	bug: 'octicon octicon-bug',
	calendar: 'octicon octicon-calendar',
	check: 'octicon octicon-check',
	checklist: 'octicon octicon-checklist',
	'chevron-down': 'octicon octicon-chevron-down',
	'chevron-left': 'octicon octicon-chevron-left',
	'chevron-right': 'octicon octicon-chevron-right',
	'chevron-up': 'octicon octicon-chevron-up',
	'circle-slash': 'octicon octicon-circle-slash',
	'circuit-board': 'octicon octicon-circuit-board',
	clippy: 'octicon octicon-clippy',
	clock: 'octicon octicon-clock',
	'cloud-download': 'octicon octicon-cloud-download',
	'cloud-upload': 'octicon octicon-cloud-upload',
	code: 'octicon octicon-code',
	'color-mode': 'octicon octicon-color-mode',
	'comment-add': 'octicon octicon-comment-add',
	comment: 'octicon octicon-comment',
	'comment-discussion': 'octicon octicon-comment-discussion',
	'credit-card': 'octicon octicon-credit-card',
	dash: 'octicon octicon-dash',
	dashboard: 'octicon octicon-dashboard',
	database: 'octicon octicon-database',
	clone: 'octicon octicon-clone',
	'desktop-download': 'octicon octicon-desktop-download',
	'device-camera': 'octicon octicon-device-camera',
	'device-camera-video': 'octicon octicon-device-camera-video',
	'device-desktop': 'octicon octicon-device-desktop',
	'device-mobile': 'octicon octicon-device-mobile',
	diff: 'octicon octicon-diff',
	'diff-added': 'octicon octicon-diff-added',
	'diff-ignored': 'octicon octicon-diff-ignored',
	'diff-modified': 'octicon octicon-diff-modified',
	'diff-removed': 'octicon octicon-diff-removed',
	'diff-renamed': 'octicon octicon-diff-renamed',
	ellipsis: 'octicon octicon-ellipsis',
	'eye-unwatch': 'octicon octicon-eye-unwatch',
	'eye-watch': 'octicon octicon-eye-watch',
	eye: 'octicon octicon-eye',
	'file-binary': 'octicon octicon-file-binary',
	'file-code': 'octicon octicon-file-code',
	'file-directory': 'octicon octicon-file-directory',
	'file-media': 'octicon octicon-file-media',
	'file-pdf': 'octicon octicon-file-pdf',
	'file-submodule': 'octicon octicon-file-submodule',
	'file-symlink-directory': 'octicon octicon-file-symlink-directory',
	'file-symlink-file': 'octicon octicon-file-symlink-file',
	'file-text': 'octicon octicon-file-text',
	'file-zip': 'octicon octicon-file-zip',
	flame: 'octicon octicon-flame',
	fold: 'octicon octicon-fold',
	gear: 'octicon octicon-gear',
	gift: 'octicon octicon-gift',
	gist: 'octicon octicon-gist',
	'gist-secret': 'octicon octicon-gist-secret',
	'git-branch-create': 'octicon octicon-git-branch-create',
	'git-branch-delete': 'octicon octicon-git-branch-delete',
	'git-branch': 'octicon octicon-git-branch',
	'git-commit': 'octicon octicon-git-commit',
	'git-compare': 'octicon octicon-git-compare',
	'git-merge': 'octicon octicon-git-merge',
	'git-pull-request-abandoned': 'octicon octicon-git-pull-request-abandoned',
	'git-pull-request': 'octicon octicon-git-pull-request',
	globe: 'octicon octicon-globe',
	graph: 'octicon octicon-graph',
	heart: 'octicon octicon-heart',
	history: 'octicon octicon-history',
	home: 'octicon octicon-home',
	'horizontal-rule': 'octicon octicon-horizontal-rule',
	hubot: 'octicon octicon-hubot',
	inbox: 'octicon octicon-inbox',
	info: 'octicon octicon-info',
	'issue-closed': 'octicon octicon-issue-closed',
	'issue-opened': 'octicon octicon-issue-opened',
	'issue-reopened': 'octicon octicon-issue-reopened',
	jersey: 'octicon octicon-jersey',
	key: 'octicon octicon-key',
	keyboard: 'octicon octicon-keyboard',
	law: 'octicon octicon-law',
	'light-bulb': 'octicon octicon-light-bulb',
	link: 'octicon octicon-link',
	'link-external': 'octicon octicon-link-external',
	'list-ordered': 'octicon octicon-list-ordered',
	'list-unordered': 'octicon octicon-list-unordered',
	location: 'octicon octicon-location',
	'gist-private': 'octicon octicon-gist-private',
	'mirror-private': 'octicon octicon-mirror-private',
	'git-fork-private': 'octicon octicon-git-fork-private',
	lock: 'octicon octicon-lock',
	'logo-github': 'octicon octicon-logo-github',
	mail: 'octicon octicon-mail',
	'mail-read': 'octicon octicon-mail-read',
	'mail-reply': 'octicon octicon-mail-reply',
	'mark-github': 'octicon octicon-mark-github',
	markdown: 'octicon octicon-markdown',
	megaphone: 'octicon octicon-megaphone',
	mention: 'octicon octicon-mention',
	milestone: 'octicon octicon-milestone',
	'mirror-public': 'octicon octicon-mirror-public',
	mirror: 'octicon octicon-mirror',
	'mortar-board': 'octicon octicon-mortar-board',
	mute: 'octicon octicon-mute',
	'no-newline': 'octicon octicon-no-newline',
	octoface: 'octicon octicon-octoface',
	organization: 'octicon octicon-organization',
	package: 'octicon octicon-package',
	paintcan: 'octicon octicon-paintcan',
	pencil: 'octicon octicon-pencil',
	'person-add': 'octicon octicon-person-add',
	'person-follow': 'octicon octicon-person-follow',
	person: 'octicon octicon-person',
	pin: 'octicon octicon-pin',
	plug: 'octicon octicon-plug',
	'repo-create': 'octicon octicon-repo-create',
	'gist-new': 'octicon octicon-gist-new',
	'file-directory-create': 'octicon octicon-file-directory-create',
	'file-add': 'octicon octicon-file-add',
	plus: 'octicon octicon-plus',
	'primitive-dot': 'octicon octicon-primitive-dot',
	'primitive-square': 'octicon octicon-primitive-square',
	pulse: 'octicon octicon-pulse',
	question: 'octicon octicon-question',
	quote: 'octicon octicon-quote',
	'radio-tower': 'octicon octicon-radio-tower',
	'repo-delete': 'octicon octicon-repo-delete',
	repo: 'octicon octicon-repo',
	'repo-clone': 'octicon octicon-repo-clone',
	'repo-force-push': 'octicon octicon-repo-force-push',
	'gist-fork': 'octicon octicon-gist-fork',
	'repo-forked': 'octicon octicon-repo-forked',
	'repo-pull': 'octicon octicon-repo-pull',
	'repo-push': 'octicon octicon-repo-push',
	rocket: 'octicon octicon-rocket',
	rss: 'octicon octicon-rss',
	ruby: 'octicon octicon-ruby',
	'screen-full': 'octicon octicon-screen-full',
	'screen-normal': 'octicon octicon-screen-normal',
	'search-save': 'octicon octicon-search-save',
	search: 'octicon octicon-search',
	server: 'octicon octicon-server',
	settings: 'octicon octicon-settings',
	shield: 'octicon octicon-shield',
	'log-in': 'octicon octicon-log-in',
	'sign-in': 'octicon octicon-sign-in',
	'log-out': 'octicon octicon-log-out',
	'sign-out': 'octicon octicon-sign-out',
	squirrel: 'octicon octicon-squirrel',
	'star-add': 'octicon octicon-star-add',
	'star-delete': 'octicon octicon-star-delete',
	star: 'octicon octicon-star',
	stop: 'octicon octicon-stop',
	'repo-sync': 'octicon octicon-repo-sync',
	sync: 'octicon octicon-sync',
	'tag-remove': 'octicon octicon-tag-remove',
	'tag-add': 'octicon octicon-tag-add',
	tag: 'octicon octicon-tag',
	telescope: 'octicon octicon-telescope',
	terminal: 'octicon octicon-terminal',
	'three-bars': 'octicon octicon-three-bars',
	thumbsdown: 'octicon octicon-thumbsdown',
	thumbsup: 'octicon octicon-thumbsup',
	tools: 'octicon octicon-tools',
	trashcan: 'octicon octicon-trashcan',
	'triangle-down': 'octicon octicon-triangle-down',
	'triangle-left': 'octicon octicon-triangle-left',
	'triangle-right': 'octicon octicon-triangle-right',
	'triangle-up': 'octicon octicon-triangle-up',
	unfold: 'octicon octicon-unfold',
	unmute: 'octicon octicon-unmute',
	versions: 'octicon octicon-versions',
	watch: 'octicon octicon-watch',
	'remove-close': 'octicon octicon-remove-close',
	x: 'octicon octicon-x',
	zap: 'octicon octicon-zap'
};

},{}],33:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.glyph.size.small,
	medium: _theme2.default.glyph.size.medium,
	large: _theme2.default.glyph.size.large
};

},{"../../../theme":80}],34:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Glyph
// ==============================

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	colorVariants['color__' + color] = {
		color: _colors2.default[color]
	};
});

// Prepare sizes
var sizeVariants = {};
Object.keys(_sizes2.default).forEach(function (size) {
	sizeVariants['size__' + size] = {
		fontSize: _sizes2.default[size]
	};
});

module.exports = _extends({
	glyph: {}

}, colorVariants, sizeVariants);

},{"./colors":30,"./sizes":33}],35:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Glyph = require('../Glyph');

var _Glyph2 = _interopRequireDefault(_Glyph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function GlyphButton(_ref) {
	var children = _ref.children,
	    glyph = _ref.glyph,
	    glyphColor = _ref.glyphColor,
	    glyphSize = _ref.glyphSize,
	    glyphStyle = _ref.glyphStyle,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['children', 'glyph', 'glyphColor', 'glyphSize', 'glyphStyle', 'position']);

	var isDefault = position === 'default';
	var isLeft = position === 'left';
	var isRight = position === 'right';

	var offset = {};
	if (isLeft) offset.marginRight = '0.5em';
	if (isRight) offset.marginLeft = '0.5em';

	var glyphStyles = _extends({}, offset, glyphStyle);

	var icon = _react2.default.createElement(_Glyph2.default, {
		aphroditeStyles: classes.glyph,
		color: glyphColor,
		name: glyph,
		size: glyphSize,
		style: glyphStyles
	});

	return _react2.default.createElement(
		_Button2.default,
		props,
		(isDefault || isLeft) && icon,
		children,
		isRight && icon
	);
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
GlyphButton.propTypes = {
	glyph: _react.PropTypes.string,
	glyphColor: _react.PropTypes.string,
	glyphSize: _react.PropTypes.string,
	glyphStyle: _react.PropTypes.object,
	position: _react.PropTypes.oneOf(['default', 'left', 'right'])
};
GlyphButton.defaultProps = {
	glyphStyle: {},
	position: 'default' // no margin, assumes no children
};

var classes = _noImportant.StyleSheet.create({
	glyph: {
		display: 'inline-block',
		marginTop: '-0.125em', // fix icon alignment
		verticalAlign: 'middle'
	}
});

module.exports = GlyphButton;

},{"../Button":6,"../Glyph":31,"aphrodite/no-important":undefined,"react":undefined}],36:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Glyph = require('../Glyph');

var _Glyph2 = _interopRequireDefault(_Glyph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function GlyphField(_ref) {
	var children = _ref.children,
	    glyph = _ref.glyph,
	    glyphColor = _ref.glyphColor,
	    glyphSize = _ref.glyphSize,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['children', 'glyph', 'glyphColor', 'glyphSize', 'position']);

	var isLeft = position === 'left';
	var isRight = position === 'right';

	var glyphStyles = {};
	if (isLeft) glyphStyles.marginRight = '0.5em';
	if (isRight) glyphStyles.marginLeft = '0.5em';

	var icon = _react2.default.createElement(_Glyph2.default, {
		aphroditeStyles: classes.glyph,
		color: glyphColor,
		name: glyph,
		size: glyphSize,
		style: glyphStyles
	});

	return _react2.default.createElement(
		_FormField2.default,
		_extends({ aphroditeStyles: classes.wrapper }, props),
		isLeft && icon,
		children,
		isRight && icon
	);
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
GlyphField.propTypes = {
	glyph: _react.PropTypes.string,
	glyphColor: _react.PropTypes.string,
	glyphSize: _react.PropTypes.string,
	position: _react.PropTypes.oneOf(['left', 'right'])
};
GlyphField.defaultProps = {
	position: 'left'
};

var classes = _noImportant.StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		display: 'flex'
	},
	glyph: {
		display: 'inline-block',
		marginTop: '-0.125em', // fix icon alignment
		verticalAlign: 'middle'
	}
});

module.exports = GlyphField;

},{"../FormField":19,"../Glyph":31,"aphrodite/no-important":undefined,"react":undefined}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = exports.Col = undefined;

var _GridCol = require('../GridCol');

var _GridCol2 = _interopRequireDefault(_GridCol);

var _GridRow = require('../GridRow');

var _GridRow2 = _interopRequireDefault(_GridRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Col = _GridCol2.default;
exports.Row = _GridRow2.default;

},{"../GridCol":38,"../GridRow":39}],38:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WIDTHS = {
	'one-whole': '100%',
	'one-half': '50%',
	'one-third': '33.33%',
	'two-thirds': '66.66%',
	'one-quarter': '25%',
	'three-quarters': '75%',

	'one-fifth': '20%',
	'two-fifths': '40%',
	'three-fifths': '60%',
	'four-fifths': '80%',

	'one-sixth': '16.66%',
	'five-sixths': '83.33%'
};

var GridCol = function GridCol(props, context) {
	var gutter = props.gutter || context.gutter;
	var xsmall = props.xsmall || context.xsmall;
	var small = props.small || context.small;
	var medium = props.medium || context.medium;
	var large = props.large || context.large;

	var className = (0, _noImportant.css)(classes['xsmall-' + xsmall], classes['small-' + small], classes['medium-' + medium], classes['large-' + large]);

	var componentClassName = '' + className + (props.className ? ' ' + props.className : '');
	var componentStyles = gutter ? {
		paddingLeft: gutter / 2,
		paddingRight: gutter / 2
	} : {};

	return _react2.default.createElement(
		'div',
		{ className: componentClassName, style: componentStyles },
		props.children
	);
};

GridCol.contextTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridCol.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

var classes = _noImportant.StyleSheet.create(_extends({}, prepareWidths('xsmall', WIDTHS), prepareWidths('small', WIDTHS), prepareWidths('medium', WIDTHS), prepareWidths('large', WIDTHS)));

/* eslint-disable guard-for-in */
function prepareWidths(prefix, obj) {
	var classes = {};
	switch (prefix) {
		case 'small':
			for (var prop in obj) {
				classes[prefix + '-' + prop] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletPortraitMin + ')', {
					width: obj[prop]
				});
			}
			break;
		case 'medium':
			for (var _prop in obj) {
				classes[prefix + '-' + _prop] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
					width: obj[_prop]
				});
			}
			break;
		case 'large':
			for (var _prop2 in obj) {
				classes[prefix + '-' + _prop2] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.desktopMin + ')', {
					width: obj[_prop2]
				});
			}
			break;
		default:
			for (var _prop3 in obj) {
				classes[prefix + '-' + _prop3] = {
					width: obj[_prop3]
				};
			}

	}

	return classes;
};

module.exports = GridCol;

},{"../../../theme":80,"aphrodite/no-important":undefined,"react":undefined}],39:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRow = function (_Component) {
	_inherits(GridRow, _Component);

	function GridRow() {
		_classCallCheck(this, GridRow);

		return _possibleConstructorReturn(this, (GridRow.__proto__ || Object.getPrototypeOf(GridRow)).apply(this, arguments));
	}

	_createClass(GridRow, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				gutter: this.props.gutter,
				xsmall: this.props.xsmall,
				small: this.props.small,
				medium: this.props.medium,
				large: this.props.large
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    gutter = _props.gutter,
			    _props$styles = _props.styles,
			    styles = _props$styles === undefined ? {} : _props$styles;


			var componentClassName = '' + (0, _noImportant.css)(classes.grid) + (className ? ' ' + className : '');
			var componentStyles = _extends(styles, {
				marginLeft: gutter / -2,
				marginRight: gutter / -2
			});

			return _react2.default.createElement(
				'div',
				{ className: componentClassName, style: componentStyles },
				children
			);
		}
	}]);

	return GridRow;
}(_react.Component);

;

GridRow.childContextTypes = {
	gutter: _react.PropTypes.number,
	xsmall: _react.PropTypes.string,
	small: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	large: _react.PropTypes.string
};

GridRow.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridRow.defaultProps = {
	gutter: 0,
	xsmall: 'one-whole'
};

var classes = _noImportant.StyleSheet.create({
	grid: {
		display: 'flex',
		flexWrap: 'wrap'
	}
});

module.exports = GridRow;

},{"aphrodite/no-important":undefined,"react":undefined}],40:[function(require,module,exports){
'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE: only accepts InlineGroupSection as a single child

function InlineGroup(_ref) {
	var aphroditeStyles = _ref.aphroditeStyles,
	    block = _ref.block,
	    children = _ref.children,
	    className = _ref.className,
	    Component = _ref.component,
	    contiguous = _ref.contiguous,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'block', 'children', 'className', 'component', 'contiguous']);

	// prepare group className
	props.className = (0, _noImportant.css)(classes.group, !!block && classes.block, aphroditeStyles);
	if (className) {
		props.className += ' ' + className;
	}

	// convert children to an array and filter out falsey values
	var buttons = _react.Children.toArray(children).filter(function (i) {
		return i;
	});

	// normalize the count
	var count = buttons.length - 1;

	// clone children and apply classNames that aphrodite can target
	props.children = buttons.map(function (c, idx) {
		if (!c) return null;

		var isOnlyChild = !count;
		var isFirstChild = !isOnlyChild && idx === 0;
		var isLastChild = !isOnlyChild && idx === count;
		var isMiddleChild = !isOnlyChild && !isFirstChild && !isLastChild;

		var position = void 0;
		if (isOnlyChild) position = 'only';
		if (isFirstChild) position = 'first';
		if (isLastChild) position = 'last';
		if (isMiddleChild) position = 'middle';

		return (0, _react.cloneElement)(c, {
			contiguous: contiguous,
			position: position
		});
	});

	return _react2.default.createElement(Component, props);
};

InlineGroup.propTypes = {
	aphroditeStyles: _react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	}),
	block: _react.PropTypes.bool,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	contiguous: _react.PropTypes.bool
};
InlineGroup.defaultProps = {
	component: 'div'
};

var classes = _noImportant.StyleSheet.create({
	group: {
		display: 'inline-flex'
	},
	block: {
		display: 'flex'
	}
});

module.exports = InlineGroup;

},{"aphrodite/no-important":undefined,"react":undefined}],41:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

// NOTE: Inline Group Section accepts a single child

function InlineGroupSection(_ref) {
	var active = _ref.active,
	    aphroditeStyles = _ref.aphroditeStyles,
	    children = _ref.children,
	    className = _ref.className,
	    contiguous = _ref.contiguous,
	    grow = _ref.grow,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['active', 'aphroditeStyles', 'children', 'className', 'contiguous', 'grow', 'position']);

	// evaluate position
	var separate = position === 'last' || position === 'middle';

	// A `contiguous` section must manipulate it's child directly
	// A separate (default) section just wraps the child
	return contiguous ? (0, _react.cloneElement)(children, _extends({
		aphroditeStyles: [classes.contiguous, classes['contiguous__' + position], active ? classes.active : null, grow ? classes.grow : null, aphroditeStyles]
	}, props)) : _react2.default.createElement(
		'div',
		_extends({ className: (0, _noImportant.css)(!!grow && classes.grow, !!separate && classes.separate, aphroditeStyles) }, props),
		children
	);
};

InlineGroupSection.propTypes = {
	active: _react.PropTypes.bool, // buttons only
	children: _react.PropTypes.element.isRequired,
	contiguous: _react.PropTypes.bool,
	grow: _react.PropTypes.bool,
	position: _react.PropTypes.oneOf(['first', 'last', 'middle', 'only'])
};

module.exports = InlineGroupSection;

},{"./styles":42,"aphrodite/no-important":undefined,"react":undefined}],42:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Inline Group: Section
// ==============================

// Takes only FormInput and Button as children, rendering them as a
// tidy inline array

var _css = require('../../../utils/css');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	// pull active elements up
	active: {
		position: 'relative'
	},

	// stretch to fill available width
	grow: {
		flex: '1 1 0'
	},

	// separate applicable non-contiguous elements
	separate: {
		paddingLeft: '0.75em'
	},

	// Contiguous: manipulate children directly

	// pull focused contiguous elements up
	contiguous: {
		':focus': {
			position: 'relative',
			zIndex: 1
		}
	},

	// position
	contiguous__middle: {
		borderRadius: 0,
		marginLeft: _theme2.default.button.borderWidth * -1
	},
	contiguous__first: _extends({}, (0, _css.borderRightRadius)(0)),
	contiguous__last: _extends({}, (0, _css.borderLeftRadius)(0), {
		marginLeft: _theme2.default.button.borderWidth * -1
	})
};

},{"../../../theme":80,"../../../utils/css":85}],43:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function LabelledControl(_ref) {
	var className = _ref.className,
	    inline = _ref.inline,
	    label = _ref.label,
	    title = _ref.title,
	    props = _objectWithoutProperties(_ref, ['className', 'inline', 'label', 'title']);

	var labelClassName = (0, _noImportant.css)(classes.wrapper, inline && classes.wrapper__inline, className);

	return _react2.default.createElement(
		'label',
		{ title: title, className: labelClassName },
		_react2.default.createElement('input', _extends({}, props, { className: (0, _noImportant.css)(classes.control) })),
		_react2.default.createElement(
			'span',
			{ className: (0, _noImportant.css)(classes.label) },
			label
		)
	);
};

LabelledControl.propTypes = {
	inline: _react.PropTypes.bool,
	title: _react.PropTypes.string,
	type: _react.PropTypes.oneOf(['checkbox', 'radio']).isRequired
};

module.exports = LabelledControl;

},{"./styles":44,"aphrodite/no-important":undefined,"react":undefined}],44:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	wrapper: {
		display: 'block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight
	},
	wrapper__inline: {
		display: 'inline'
	},

	// checkbox or radio
	control: {
		marginRight: '0.5em'
	}
}; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

},{"../../../theme":80}],45:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function LoadingButton(_ref) {
	var children = _ref.children,
	    loading = _ref.loading,
	    props = _objectWithoutProperties(_ref, ['children', 'loading']);

	// determine the correct variant for the spinner,
	// fill is the default variant on Button
	var variant = props.variant || 'fill';

	// determine the correct color for the spinner,
	// cancel and delete alias to "danger"
	var color = void 0;
	if (props.color === 'cancel' || props.color === 'delete') color = 'danger';

	// merge all the variant/color together
	var formattedColor = variant === 'fill' && props.color !== 'default' ? 'inverted' : color;

	// render the spinner if required
	var spinner = loading && _react2.default.createElement(_Spinner2.default, {
		size: 'small',
		color: formattedColor
	});

	// slide the spinner in and out of view
	var spinnerStyles = {
		width: loading ? _theme2.default.spinner.size.small * 5 + _theme2.default.spacing.small : 0
	};

	// render all that shit
	return _react2.default.createElement(
		_Button2.default,
		props,
		_react2.default.createElement(
			'span',
			{ className: (0, _noImportant.css)(classes.spinner), style: spinnerStyles },
			spinner
		),
		children
	);
};

LoadingButton.propTypes = {
	loading: _react.PropTypes.bool
};
LoadingButton.defaultProps = {
	loading: false
};

var classes = _noImportant.StyleSheet.create({
	spinner: {
		display: 'inline-block',
		overflow: 'hidden',
		textAlign: 'left',
		transition: 'width 200ms ease-out',
		verticalAlign: 'middle'
	}
});

module.exports = LoadingButton;

},{"../../../theme":80,"../Button":6,"../Spinner":62,"aphrodite/no-important":undefined,"react":undefined}],46:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalBody(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	return _react2.default.createElement('div', _extends({
		className: (0, _noImportant.css)(classes.body, className)
	}, props));
};

var classes = _noImportant.StyleSheet.create({
	body: {
		paddingBottom: _theme2.default.modal.padding.body.vertical,
		paddingLeft: _theme2.default.modal.padding.body.horizontal,
		paddingRight: _theme2.default.modal.padding.body.horizontal,
		paddingTop: _theme2.default.modal.padding.body.vertical
	}
});

module.exports = ModalBody;

},{"../../../theme":80,"aphrodite/no-important":undefined,"react":undefined}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _ScrollLock = require('../ScrollLock');

var _ScrollLock2 = _interopRequireDefault(_ScrollLock);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ModalDialog = function (_Component) {
	_inherits(ModalDialog, _Component);

	function ModalDialog() {
		_classCallCheck(this, ModalDialog);

		var _this = _possibleConstructorReturn(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this));

		_this.handleBackdropClick = _this.handleBackdropClick.bind(_this);
		_this.handleKeyboardInput = _this.handleKeyboardInput.bind(_this);
		return _this;
	}

	_createClass(ModalDialog, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				onClose: this.props.onClose
			};
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!canUseDom) return;

			// add event listeners
			if (nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}

		// ==============================
		// Methods
		// ==============================

	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 27) this.props.onClose();

			return false;
		}
	}, {
		key: 'handleBackdropClick',
		value: function handleBackdropClick(e) {
			if (e.target !== this.refs.container) return;

			this.props.onClose();
		}

		// ==============================
		// Renderers
		// ==============================

	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _props = this.props,
			    backdropClosesModal = _props.backdropClosesModal,
			    children = _props.children,
			    isOpen = _props.isOpen,
			    width = _props.width;


			if (!isOpen) return _react2.default.createElement('span', { key: 'closed' });

			return _react2.default.createElement(
				'div',
				{
					className: (0, _noImportant.css)(classes.container),
					key: 'open',
					ref: 'container',
					onClick: !!backdropClosesModal && this.handleBackdropClick,
					onTouchEnd: !!backdropClosesModal && this.handleBackdropClick
				},
				_react2.default.createElement(
					'div',
					{ className: (0, _noImportant.css)(classes.dialog), style: { width: width }, 'data-screen-id': 'modal-dialog' },
					children
				),
				_react2.default.createElement(_ScrollLock2.default, null)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Portal2.default,
				null,
				this.renderDialog()
			);
		}
	}]);

	return ModalDialog;
}(_react.Component);

;

ModalDialog.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	enableKeyboardInput: _react.PropTypes.bool,
	isOpen: _react.PropTypes.bool,
	onClose: _react.PropTypes.func.isRequired,
	width: _react.PropTypes.number
};
ModalDialog.defaultProps = {
	enableKeyboardInput: true,
	width: 768
};
ModalDialog.childContextTypes = {
	onClose: _react.PropTypes.func.isRequired
};

var classes = _noImportant.StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: _theme2.default.modal.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: _theme2.default.modal.zIndex
	},
	dialog: {
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		paddingBottom: _theme2.default.modal.padding.dialog.vertical,
		paddingLeft: _theme2.default.modal.padding.dialog.horizontal,
		paddingRight: _theme2.default.modal.padding.dialog.horizontal,
		paddingTop: _theme2.default.modal.padding.dialog.vertical,
		position: 'relative'
	}
});

exports.default = ModalDialog;

},{"../../../theme":80,"../Portal":54,"../ScrollLock":57,"aphrodite/no-important":undefined,"react":undefined}],48:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalFooter(_ref) {
	var align = _ref.align,
	    className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['align', 'className']);

	return _react2.default.createElement('div', _extends({}, props, { className: (0, _noImportant.css)(classes.footer, classes['align__' + align], className) }));
};

ModalFooter.propTypes = {
	align: _react.PropTypes.oneOf(['center', 'left', 'right']),
	children: _react.PropTypes.node,
	onClose: _react.PropTypes.func,
	showCloseButton: _react.PropTypes.bool,
	text: _react.PropTypes.string
};
ModalFooter.defaultProps = {
	align: 'left'
};

var classes = _noImportant.StyleSheet.create({
	footer: {
		borderTop: '2px solid ' + _theme2.default.color.gray10,
		display: 'flex',
		paddingBottom: _theme2.default.modal.padding.footer.vertical,
		paddingLeft: _theme2.default.modal.padding.footer.horizontal,
		paddingRight: _theme2.default.modal.padding.footer.horizontal,
		paddingTop: _theme2.default.modal.padding.footer.vertical
	},

	// alignment
	align__left: {
		justifyContent: 'flex-start'
	},
	align__center: {
		justifyContent: 'center'
	},
	align__right: {
		justifyContent: 'flex-end'
	}
});

module.exports = ModalFooter;

},{"../../../theme":80,"aphrodite/no-important":undefined,"react":undefined}],49:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _GlyphButton = require('../GlyphButton');

var _GlyphButton2 = _interopRequireDefault(_GlyphButton);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalHeader(_ref, _ref2) {
	var onClose = _ref2.onClose;

	var children = _ref.children,
	    className = _ref.className,
	    showCloseButton = _ref.showCloseButton,
	    text = _ref.text,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'showCloseButton', 'text']);

	// Property Violation
	if (children && text) {
		console.error('Warning: ModalHeader cannot render `children` and `text`. You must provide one or the other.');
	}

	return _react2.default.createElement(
		'div',
		_extends({}, props, { className: (0, _noImportant.css)(classes.header, className) }),
		_react2.default.createElement(
			'div',
			{ className: (0, _noImportant.css)(classes.grow) },
			text ? _react2.default.createElement(
				'h4',
				{ className: (0, _noImportant.css)(classes.text) },
				text
			) : children
		),
		!!onClose && showCloseButton && _react2.default.createElement(_GlyphButton2.default, {
			aphroditeStyles: classes.close,
			color: 'cancel',
			glyph: 'x',
			onClick: onClose,
			variant: 'link'
		})
	);
};

ModalHeader.propTypes = {
	children: _react.PropTypes.node,
	onClose: _react.PropTypes.func,
	showCloseButton: _react.PropTypes.bool,
	text: _react.PropTypes.string
};
ModalHeader.contextTypes = {
	onClose: _react.PropTypes.func.isRequired
};

var classes = _noImportant.StyleSheet.create({
	header: {
		alignItems: 'center',
		borderBottom: '2px solid ' + _theme2.default.color.gray10,
		display: 'flex',
		paddingBottom: _theme2.default.modal.padding.header.vertical,
		paddingLeft: _theme2.default.modal.padding.header.horizontal,
		paddingRight: _theme2.default.modal.padding.header.horizontal,
		paddingTop: _theme2.default.modal.padding.header.vertical
	},

	// fill space to push the close button right
	grow: {
		flexGrow: 1
	},

	// title text
	text: {
		color: 'inherit',
		fontSize: 18,
		fontWeight: 500,
		lineHeight: 1,
		margin: 0
	}
});

module.exports = ModalHeader;

},{"../../../theme":80,"../GlyphButton":35,"aphrodite/no-important":undefined,"react":undefined}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Header = exports.Footer = exports.Dialog = exports.Body = undefined;

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Body = _body2.default;
exports.Dialog = _dialog2.default;
exports.Footer = _footer2.default;
exports.Header = _header2.default;

},{"./body":46,"./dialog":47,"./footer":48,"./header":49}],51:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
	_inherits(Pagination, _Component);

	function Pagination() {
		_classCallCheck(this, Pagination);

		return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
	}

	_createClass(Pagination, [{
		key: 'renderCount',
		value: function renderCount() {
			var count = '';
			var _props = this.props,
			    currentPage = _props.currentPage,
			    pageSize = _props.pageSize,
			    plural = _props.plural,
			    singular = _props.singular,
			    total = _props.total;

			if (!total) {
				count = 'No ' + (plural || 'records');
			} else if (total > pageSize) {
				var start = pageSize * (currentPage - 1) + 1;
				var end = Math.min(start + pageSize - 1, total);
				count = 'Showing ' + start + ' to ' + end + ' of ' + total;
			} else {
				count = 'Showing ' + total;
				if (total > 1 && plural) {
					count += ' ' + plural;
				} else if (total === 1 && singular) {
					count += ' ' + singular;
				}
			}
			return _react2.default.createElement(
				'div',
				{ className: (0, _noImportant.css)(classes.count), 'data-e2e-pagination-count': true },
				count
			);
		}
	}, {
		key: 'renderPages',
		value: function renderPages() {
			var _props2 = this.props,
			    currentPage = _props2.currentPage,
			    limit = _props2.limit,
			    onPageSelect = _props2.onPageSelect,
			    pageSize = _props2.pageSize,
			    total = _props2.total;


			if (total <= pageSize) return null;

			var pages = [];
			var totalPages = Math.ceil(total / pageSize);
			var minPage = 1;
			var maxPage = totalPages;

			if (limit && limit < totalPages) {
				var rightLimit = Math.floor(limit / 2);
				var leftLimit = rightLimit + limit % 2 - 1;
				minPage = currentPage - leftLimit;
				maxPage = currentPage + rightLimit;

				if (minPage < 1) {
					maxPage = limit;
					minPage = 1;
				}
				if (maxPage > totalPages) {
					minPage = totalPages - limit + 1;
					maxPage = totalPages;
				}
			}
			if (minPage > 1) {
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_start', onClick: function onClick() {
							return onPageSelect(1);
						} },
					'...'
				));
			}

			var _loop = function _loop(page) {
				var selected = page === currentPage;
				/* eslint-disable no-loop-func */
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_' + page, selected: selected, onClick: function onClick() {
							return onPageSelect(page);
						} },
					page
				));
				/* eslint-enable */
			};

			for (var page = minPage; page <= maxPage; page++) {
				_loop(page);
			}
			if (maxPage < totalPages) {
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_end', onClick: function onClick() {
							return onPageSelect(totalPages);
						} },
					'...'
				));
			}
			return _react2.default.createElement(
				'div',
				{ className: (0, _noImportant.css)(classes.list) },
				pages
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var className = (0, _noImportant.css)(classes.container, this.props.className);
			return _react2.default.createElement(
				'div',
				{ className: className, style: this.props.style },
				this.renderCount(),
				this.renderPages()
			);
		}
	}]);

	return Pagination;
}(_react.Component);

;

var classes = _noImportant.StyleSheet.create({
	container: {
		display: 'block',
		lineHeight: _theme2.default.component.lineHeight,
		marginBottom: '2em'
	},
	count: {
		display: 'inline-block',
		marginRight: '1em',
		verticalAlign: 'middle'
	},
	list: {
		display: 'inline-block',
		verticalAlign: 'middle'
	}
});

Pagination.propTypes = {
	className: _react.PropTypes.string,
	currentPage: _react.PropTypes.number.isRequired,
	limit: _react.PropTypes.number,
	onPageSelect: _react.PropTypes.func,
	pageSize: _react.PropTypes.number.isRequired,
	plural: _react.PropTypes.string,
	singular: _react.PropTypes.string,
	style: _react.PropTypes.object,
	total: _react.PropTypes.number.isRequired
};

module.exports = Pagination;

},{"../../../theme":80,"./page":52,"aphrodite/no-important":undefined,"react":undefined}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Page(_ref) {
	var disabled = _ref.disabled,
	    selected = _ref.selected,
	    props = _objectWithoutProperties(_ref, ['disabled', 'selected']);

	props.className = (0, _noImportant.css)(classes.page, !!disabled && classes.disabled, !!selected && classes.selected);
	return _react2.default.createElement('button', props);
};

Page.propTypes = {
	disabled: _react.PropTypes.bool,
	onClick: _react.PropTypes.func.isRequired,
	selected: _react.PropTypes.bool
};

/* eslint quote-props: ["error", "as-needed"] */

var selectedStyle = {
	backgroundColor: _theme2.default.pagination.selected.background,
	borderColor: _theme2.default.pagination.selected.border,
	color: _theme2.default.pagination.selected.color,
	cursor: 'default',
	zIndex: 2
};
var pseudoStyle = {
	backgroundColor: _theme2.default.pagination.hover.background,
	borderColor: _theme2.default.pagination.hover.border,
	color: _theme2.default.pagination.hover.color,
	outline: 'none'
};

var classes = _noImportant.StyleSheet.create({
	page: {
		appearance: 'none',
		background: 'none',
		border: '1px solid transparent',
		borderRadius: _theme2.default.borderRadius.default,
		color: _theme2.default.pagination.color,
		cursor: 'pointer',
		display: 'inline-block',
		float: 'left', // Collapse white-space
		marginRight: '0.25em',
		padding: '0 .7em',
		position: 'relative',
		textDecoration: 'none',

		// handle hover and focus
		':hover': pseudoStyle,
		':focus': pseudoStyle
	},

	// selected page
	selected: _extends({}, selectedStyle, {

		':hover': selectedStyle,
		':focus': selectedStyle
	}),

	// disabled page

	disabled: {
		backgroundColor: _theme2.default.pagination.disabled.background,
		borderColor: _theme2.default.pagination.disabled.background,
		color: _theme2.default.pagination.disabled.color,
		cursor: 'default'
	}
});

exports.default = Page;

},{"../../../theme":80,"aphrodite/no-important":undefined,"react":undefined}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Pass the Lightbox context through to the Portal's descendents
// StackOverflow discussion http://goo.gl/oclrJ9

var PassContext = function (_Component) {
	_inherits(PassContext, _Component);

	function PassContext() {
		_classCallCheck(this, PassContext);

		return _possibleConstructorReturn(this, (PassContext.__proto__ || Object.getPrototypeOf(PassContext)).apply(this, arguments));
	}

	_createClass(PassContext, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react.Children.only(this.props.children);
		}
	}]);

	return PassContext;
}(_react.Component);

;

PassContext.propTypes = {
	context: _react.PropTypes.object.isRequired
};
PassContext.childContextTypes = {
	onClose: _react.PropTypes.func
};

exports.default = PassContext;

},{"react":undefined}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactDom = require('react-dom');

var _PassContext = require('../PassContext');

var _PassContext2 = _interopRequireDefault(_PassContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = function (_Component) {
	_inherits(Portal, _Component);

	function Portal() {
		_classCallCheck(this, Portal);

		var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

		_this.portalElement = null;
		return _this;
	}

	_createClass(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var p = document.createElement('div');
			document.body.appendChild(p);
			this.portalElement = p;
			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// Animate fade on mount/unmount
			var duration = 200;
			var styles = '\n\t\t\t\t.fade-enter { opacity: 0.01; }\n\t\t\t\t.fade-enter.fade-enter-active { opacity: 1; transition: opacity ' + duration + 'ms; }\n\t\t\t\t.fade-leave { opacity: 1; }\n\t\t\t\t.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity ' + duration + 'ms; }\n\t\t';
			(0, _reactDom.render)(_react2.default.createElement(
				_PassContext2.default,
				{ context: this.context },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'style',
						null,
						styles
					),
					_react2.default.createElement(_reactAddonsCssTransitionGroup2.default, _extends({
						component: 'div',
						transitionName: 'fade',
						transitionEnterTimeout: duration,
						transitionLeaveTimeout: duration
					}, this.props))
				)
			), this.portalElement);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeChild(this.portalElement);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Portal;
}(_react.Component);

exports.default = Portal;


Portal.contextTypes = {
	onClose: _react.PropTypes.func
};

},{"../PassContext":53,"react":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Using window.innerWidth and state instead of CSS media breakpoints
// because we want to render null rather than an empty span. Allowing for
// CSS pseudo classes like :only-child to behave as expected.

// Return true if window + document
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ResponsiveText = function (_Component) {
	_inherits(ResponsiveText, _Component);

	function ResponsiveText() {
		_classCallCheck(this, ResponsiveText);

		var _this = _possibleConstructorReturn(this, (ResponsiveText.__proto__ || Object.getPrototypeOf(ResponsiveText)).call(this));

		_this.handleResize = _this.handleResize.bind(_this);
		_this.state = {
			windowWidth: canUseDOM ? window.innerWidth : 0
		};
		return _this;
	}

	_createClass(ResponsiveText, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (canUseDOM) {
				window.addEventListener('resize', this.handleResize);
				this.handleResize();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (canUseDOM) {
				window.removeEventListener('resize', this.handleResize);
			}
		}
	}, {
		key: 'handleResize',
		value: function handleResize() {
			this.setState({
				windowWidth: canUseDOM ? window.innerWidth : 0
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    Component = _props.component,
			    hiddenLG = _props.hiddenLG,
			    hiddenMD = _props.hiddenMD,
			    hiddenSM = _props.hiddenSM,
			    hiddenXS = _props.hiddenXS,
			    visibleLG = _props.visibleLG,
			    visibleMD = _props.visibleMD,
			    visibleSM = _props.visibleSM,
			    visibleXS = _props.visibleXS,
			    props = _objectWithoutProperties(_props, ['component', 'hiddenLG', 'hiddenMD', 'hiddenSM', 'hiddenXS', 'visibleLG', 'visibleMD', 'visibleSM', 'visibleXS']);

			var windowWidth = this.state.windowWidth;


			var text = void 0;

			// set text value from breakpoint; attempt XS --> LG
			if (windowWidth < _theme2.default.breakpointNumeric.mobile) {
				text = visibleXS || hiddenSM || hiddenMD || hiddenLG;
			} else if (windowWidth < _theme2.default.breakpointNumeric.tabletPortrait) {
				text = hiddenXS || visibleSM || hiddenMD || hiddenLG;
			} else if (windowWidth < _theme2.default.breakpointNumeric.tabletLandscape) {
				text = hiddenXS || hiddenSM || visibleMD || hiddenLG;
			} else {
				text = hiddenXS || hiddenSM || hiddenMD || visibleLG;
			}

			return text ? _react2.default.createElement(
				Component,
				props,
				text
			) : null;
		}
	}]);

	return ResponsiveText;
}(_react.Component);

;

ResponsiveText.propTypes = {
	hiddenLG: _react.PropTypes.string,
	hiddenMD: _react.PropTypes.string,
	hiddenSM: _react.PropTypes.string,
	hiddenXS: _react.PropTypes.string,
	visibleLG: _react.PropTypes.string,
	visibleMD: _react.PropTypes.string,
	visibleSM: _react.PropTypes.string,
	visibleXS: _react.PropTypes.string
};
ResponsiveText.defaultProps = {
	component: 'span'
};

module.exports = ResponsiveText;

},{"../../../theme":80,"react":undefined}],56:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ScreenReaderOnly(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _noImportant.css)(classes.srOnly, className);

	return _react2.default.createElement('span', props);
};

var classes = _noImportant.StyleSheet.create({
	srOnly: {
		border: 0,
		clip: 'rect(0,0,0,0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		width: 1
	}
});

module.exports = ScreenReaderOnly;

},{"aphrodite/no-important":undefined,"react":undefined}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollLock = function (_Component) {
	_inherits(ScrollLock, _Component);

	function ScrollLock() {
		_classCallCheck(this, ScrollLock);

		var _this = _possibleConstructorReturn(this, (ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call(this));

		_this.lockCount = 0;
		return _this;
	}

	_createClass(ScrollLock, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof window === 'undefined') return;

			this.lockCount++;
			if (this.lockCount > 1) return;

			//	FIXME iOS ignores overflow on body
			try {
				var scrollBarWidth = window.innerWidth - document.body.clientWidth;

				var target = document.body;

				target.style.paddingRight = scrollBarWidth + 'px';
				target.style.overflowY = 'hidden';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (typeof window === 'undefined' || this.lockCount === 0) return;

			this.lockCount--;
			if (this.lockCount > 0) return; // Still locked

			//	FIXME iOS ignores overflow on body
			try {
				var target = document.body;

				target.style.paddingRight = '';
				target.style.overflowY = '';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return ScrollLock;
}(_react.Component);

exports.default = ScrollLock;

},{"react":undefined}],58:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.color.danger,
	default: _theme2.default.color.gray80,
	error: _theme2.default.color.danger,
	info: _theme2.default.color.info,
	primary: _theme2.default.color.primary,
	success: _theme2.default.color.success,
	warning: _theme2.default.color.warning
};

},{"../../../theme":80}],59:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var classes = _noImportant.StyleSheet.create(_styles2.default);

function SegmentedControl(_ref) {
	var className = _ref.className,
	    color = _ref.color,
	    cropText = _ref.cropText,
	    equalWidthSegments = _ref.equalWidthSegments,
	    inline = _ref.inline,
	    onChange = _ref.onChange,
	    options = _ref.options,
	    value = _ref.value,
	    props = _objectWithoutProperties(_ref, ['className', 'color', 'cropText', 'equalWidthSegments', 'inline', 'onChange', 'options', 'value']);

	props.className = (0, _noImportant.css)(classes.control, inline ? classes.control__inline : null, className);

	return _react2.default.createElement(
		'div',
		props,
		options.map(function (opt) {
			var buttonClassName = (0, _noImportant.css)(classes.button, opt.disabled ? classes.button__disabled : null, opt.value === value ? classes['button__' + color] : null, cropText ? classes.button__cropText : null, equalWidthSegments ? classes.button__equalWidth : null);

			return _react2.default.createElement(
				'button',
				{
					className: buttonClassName,
					key: opt.value,
					onClick: !opt.disabled && function () {
						return onChange(opt.value);
					},
					type: 'button',
					title: cropText ? opt.label : null,
					tabIndex: opt.disabled ? '-1' : ''
				},
				opt.label
			);
		})
	);
};

var valuePropShape = [_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string];

SegmentedControl.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)),
	cropText: _react.PropTypes.bool, // when `inline && equalWidthSegments` crops to the next largest option length
	equalWidthSegments: _react.PropTypes.bool, // only relevant when `inline === false`
	inline: _react.PropTypes.bool,
	onChange: _react.PropTypes.func.isRequired,
	options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		disabled: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		value: _react.PropTypes.oneOfType(valuePropShape)
	})).isRequired,
	value: _react.PropTypes.oneOfType(valuePropShape)
};
SegmentedControl.defaultProps = {
	color: 'default'
};

module.exports = SegmentedControl;

},{"./colors":58,"./styles":60,"aphrodite/no-important":undefined,"react":undefined}],60:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Segmented Control
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	var pseudoStyles = {
		backgroundColor: _colors2.default[color],
		color: 'white'
	};
	colorVariants['button__' + color] = {
		backgroundColor: _colors2.default[color],
		color: 'white',

		':hover': pseudoStyles,
		':focus': pseudoStyles,
		':active': pseudoStyles
	};
});

module.exports = _extends({
	control: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: _theme2.default.input.border.color.default,
		borderRadius: '0.4em',
		display: 'flex',
		fontSize: _theme2.default.font.size.small,
		paddingLeft: 1,
		paddingRight: 1
	},
	control__inline: {
		display: 'inline-flex'
	},

	// buttons
	button: {
		background: 'none',
		border: 0,
		borderRadius: '0.25em',
		flexGrow: 1,
		margin: '2px 1px',
		padding: '0.3em 0.9em',
		outline: 0,

		':hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
		':focus': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
		':active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
	},
	button__equalWidth: {
		flex: '1 1 0'
	},
	button__cropText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	button__disabled: {
		opacity: 0.6,
		pointerEvents: 'none'
	}

}, colorVariants);

},{"../../../theme":80,"./colors":58}],61:[function(require,module,exports){
'use strict';

module.exports = ['danger', 'default', 'inverted', 'primary', 'success', 'warning'];

},{}],62:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _ScreenReaderOnly = require('../ScreenReaderOnly');

var _ScreenReaderOnly2 = _interopRequireDefault(_ScreenReaderOnly);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Spinner(_ref) {
	var className = _ref.className,
	    size = _ref.size,
	    color = _ref.color,
	    props = _objectWithoutProperties(_ref, ['className', 'size', 'color']);

	props.className = (0, _noImportant.css)(classes.base, classes[size], className);

	return _react2.default.createElement(
		'div',
		props,
		_react2.default.createElement('span', { className: '' + (0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__first) }),
		_react2.default.createElement('span', { className: '' + (0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__second) }),
		_react2.default.createElement('span', { className: '' + (0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__third) }),
		_react2.default.createElement(
			_ScreenReaderOnly2.default,
			null,
			'Loading...'
		)
	);
};

Spinner.propTypes = {
	color: _react.PropTypes.oneOf(_colors2.default),
	size: _react.PropTypes.oneOf(_sizes2.default)
};
Spinner.defaultProps = {
	size: 'medium',
	color: 'default'
};

var classes = _noImportant.StyleSheet.create(_styles2.default);

module.exports = Spinner;

},{"../ScreenReaderOnly":56,"./colors":61,"./sizes":63,"./styles":64,"aphrodite/no-important":undefined,"react":undefined}],63:[function(require,module,exports){
'use strict';

module.exports = ['small', 'medium', 'large'];

},{}],64:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Spinner
// ==============================

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
_colors2.default.forEach(function (color) {
	colorVariants['color__' + color] = {
		backgroundColor: _theme2.default.spinner.color[color]
	};
});

// Prepare sizes
var sizeVariants = {};
_sizes2.default.forEach(function (size) {
	sizeVariants['size__' + size] = {
		fontSize: _theme2.default.spinner.size[size]
	};
});

// Declare animation keyframes
var pulse = {
	'0%, 80%, 100%': { opacity: 0 },
	'40%': { opacity: 1 }
};

module.exports = _extends({
	base: {
		display: 'inline-block',
		lineHeight: 1,
		textAlign: 'center',
		verticalAlign: 'middle',
		width: '5em'
	},
	small: { fontSize: 4 },
	medium: { fontSize: 8 },
	large: { fontSize: 16 },

	// text
	text: {
		border: 0,
		clip: 'rect(0,0,0,0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		width: 1
	},

	// dots
	dot: {
		animationName: pulse,
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		borderRadius: '1em',
		display: 'inline-block',
		height: '1em',
		verticalAlign: 'top',
		width: '1em'
	},
	dot__second: {
		animationDelay: '160ms',
		marginLeft: '1em'
	},
	dot__third: {
		animationDelay: '320ms',
		marginLeft: '1em'
	}

}, colorVariants, sizeVariants);

},{"../../../theme":80,"./colors":61,"./sizes":63}],65:[function(require,module,exports){
'use strict';

module.exports = {
	Alert: require('./Alert'),
	BlankState: require('./BlankState'),
	Button: require('./Button'),
	Center: require('./Center'),
	Chip: require('./Chip'),
	Container: require('./Container'),
	DropdownButton: require('./DropdownButton'),
	Form: require('./Form'),
	FormField: require('./FormField'),
	FormInput: require('./FormInput'),
	FormLabel: require('./FormLabel'),
	FormNote: require('./FormNote'),
	FormSelect: require('./FormSelect'),
	Glyph: require('./Glyph'),
	GlyphButton: require('./GlyphButton'),
	GlyphField: require('./GlyphField'),
	Grid: require('./Grid'),
	InlineGroup: require('./InlineGroup'),
	InlineGroupSection: require('./InlineGroupSection'),
	LabelledControl: require('./LabelledControl'),
	LoadingButton: require('./LoadingButton'),
	Modal: require('./Modal'),
	Pagination: require('./Pagination'),
	ResponsiveText: require('./ResponsiveText'),
	ScreenReaderOnly: require('./ScreenReaderOnly'),
	SegmentedControl: require('./SegmentedControl'),
	Spinner: require('./Spinner')
};

},{"./Alert":3,"./BlankState":5,"./Button":6,"./Center":8,"./Chip":11,"./Container":13,"./DropdownButton":16,"./Form":17,"./FormField":19,"./FormInput":21,"./FormLabel":24,"./FormNote":26,"./FormSelect":28,"./Glyph":31,"./GlyphButton":35,"./GlyphField":36,"./Grid":37,"./InlineGroup":40,"./InlineGroupSection":41,"./LabelledControl":43,"./LoadingButton":45,"./Modal":50,"./Pagination":51,"./ResponsiveText":55,"./ScreenReaderOnly":56,"./SegmentedControl":59,"./Spinner":62}],66:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../elemental');

var _string = require('../../utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This renders alerts for API success and error responses.
 *   Error format: {
 *     error: 'validation errors' // The unique error type identifier
 *     detail: { ... } // Optional details specific to that error type
 *   }
 *   Success format: {
 *     success: 'item updated', // The unique success type identifier
 *     details: { ... } // Optional details specific to that success type
 *   }
 *   Eventually success and error responses should be handled individually
 *   based on their type. For example: validation errors should be displayed next
 *   to each invalid field and signin errors should promt the user to sign in.
 */
var AlertMessages = _react2.default.createClass({
	displayName: 'AlertMessages',
	propTypes: {
		alerts: _react2.default.PropTypes.shape({
			error: _react2.default.PropTypes.Object,
			success: _react2.default.PropTypes.Object
		})
	},
	getDefaultProps: function getDefaultProps() {
		return {
			alerts: {}
		};
	},
	renderValidationErrors: function renderValidationErrors() {
		var errors = this.props.alerts.error.detail;
		if (errors.name === 'ValidationError') {
			errors = errors.errors;
		}
		var errorCount = Object.keys(errors).length;
		var alertContent = void 0;
		var messages = Object.keys(errors).map(function (path) {
			if (errorCount > 1) {
				return _react2.default.createElement(
					'li',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			} else {
				return _react2.default.createElement(
					'div',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			}
		});

		if (errorCount > 1) {
			alertContent = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					null,
					'There were ',
					errorCount,
					' errors creating the new item:'
				),
				_react2.default.createElement(
					'ul',
					null,
					messages
				)
			);
		} else {
			alertContent = messages;
		}

		return _react2.default.createElement(
			_elemental.Alert,
			{ color: 'danger' },
			alertContent
		);
	},
	render: function render() {
		var _props$alerts = this.props.alerts,
		    error = _props$alerts.error,
		    success = _props$alerts.success;


		if (error) {
			// Render error alerts
			switch (error.error) {
				case 'validation errors':
					return this.renderValidationErrors();
				case 'error':
					if (error.detail.name === 'ValidationError') {
						return this.renderValidationErrors();
					} else {
						return _react2.default.createElement(
							_elemental.Alert,
							{ color: 'danger' },
							(0, _string.upcase)(error.error)
						);
					}
				default:
					return _react2.default.createElement(
						_elemental.Alert,
						{ color: 'danger' },
						(0, _string.upcase)(error.error)
					);
			}
		}

		if (success) {
			// Render success alerts
			return _react2.default.createElement(
				_elemental.Alert,
				{ color: 'success' },
				(0, _string.upcase)(success.success)
			);
		}

		return null; // No alerts, render nothing
	}
});

module.exports = AlertMessages;

},{"../../utils/string":87,"../elemental":65,"react":undefined}],67:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _AlertMessages = require('./AlertMessages');

var _AlertMessages2 = _interopRequireDefault(_AlertMessages);

var _FieldTypes = require('FieldTypes');

var _InvalidFieldType = require('./InvalidFieldType');

var _InvalidFieldType2 = _interopRequireDefault(_InvalidFieldType);

var _elemental = require('../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateForm = _react2.default.createClass({
	displayName: 'CreateForm',
	propTypes: {
		err: _react2.default.PropTypes.object,
		isOpen: _react2.default.PropTypes.bool,
		list: _react2.default.PropTypes.object,
		onCancel: _react2.default.PropTypes.func,
		onCreate: _react2.default.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			err: null,
			isOpen: false
		};
	},
	getInitialState: function getInitialState() {
		var _this = this;

		// Set the field values to their default values when first rendering the
		// form. (If they have a default value, that is)
		var values = {};
		Object.keys(this.props.list.fields).forEach(function (key) {
			var field = _this.props.list.fields[key];
			var FieldComponent = _FieldTypes.Fields[field.type];
			values[field.path] = FieldComponent.getDefaultValue(field);
		});
		return {
			values: values,
			alerts: {}
		};
	},
	componentDidMount: function componentDidMount() {
		document.body.addEventListener('keyup', this.handleKeyPress, false);
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeEventListener('keyup', this.handleKeyPress, false);
	},
	handleKeyPress: function handleKeyPress(evt) {
		if (_vkey2.default[evt.keyCode] === '<escape>') {
			this.props.onCancel();
		}
	},

	// Handle input change events
	handleChange: function handleChange(event) {
		var values = (0, _objectAssign2.default)({}, this.state.values);
		values[event.path] = event.value;
		this.setState({
			values: values
		});
	},

	// Set the props of a field
	getFieldProps: function getFieldProps(field) {
		var props = (0, _objectAssign2.default)({}, field);
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},

	// Create a new item when the form is submitted
	submitForm: function submitForm(event) {
		var _this2 = this;

		event.preventDefault();
		var createForm = event.target;
		var formData = new FormData(createForm);
		this.props.list.createItem(formData, function (err, data) {
			if (data) {
				if (_this2.props.onCreate) {
					_this2.props.onCreate(data);
				} else {
					// Clear form
					_this2.setState({
						values: {},
						alerts: {
							success: {
								success: 'Item created'
							}
						}
					});
				}
			} else {
				if (!err) {
					err = {
						error: 'connection error'
					};
				}
				// If we get a database error, show the database error message
				// instead of only saying "Database error"
				if (err.error === 'database error') {
					err.error = err.detail.errmsg;
				}
				_this2.setState({
					alerts: {
						error: err
					}
				});
			}
		});
	},

	// Render the form itself
	renderForm: function renderForm() {
		var _this3 = this;

		if (!this.props.isOpen) return;

		var form = [];
		var list = this.props.list;
		var nameField = this.props.list.nameField;
		var focusWasSet;

		// If the name field is an initial one, we need to render a proper
		// input for it
		if (list.nameIsInitial) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.autoFocus = focusWasSet = true;
			if (nameField.type === 'text') {
				nameFieldProps.className = 'item-name-field';
				nameFieldProps.placeholder = nameField.label;
				nameFieldProps.label = '';
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[nameField.type], nameFieldProps));
		}

		// Render inputs for all initial fields
		Object.keys(list.initialFields).forEach(function (key) {
			var field = list.fields[list.initialFields[key]];
			// If there's something weird passed in as field type, render the
			// invalid field type component
			if (typeof _FieldTypes.Fields[field.type] !== 'function') {
				form.push(_react2.default.createElement(_InvalidFieldType2.default, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			// Get the props for the input field
			var fieldProps = _this3.getFieldProps(field);
			// If there was no focusRef set previously, set the current field to
			// be the one to be focussed. Generally the first input field, if
			// there's an initial name field that takes precedence.
			if (!focusWasSet) {
				fieldProps.autoFocus = focusWasSet = true;
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[field.type], fieldProps));
		});

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal', onSubmit: this.submitForm },
			_react2.default.createElement(_elemental.Modal.Header, {
				text: 'Create a new ' + list.singular,
				showCloseButton: true
			}),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(_AlertMessages2.default, { alerts: this.state.alerts }),
				form
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ color: 'success', type: 'submit', 'data-button-type': 'submit' },
					'Create'
				),
				_react2.default.createElement(
					_elemental.Button,
					{
						variant: 'link',
						color: 'cancel',
						'data-button-type': 'cancel',
						onClick: this.props.onCancel
					},
					'Cancel'
				)
			)
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_elemental.Modal.Dialog,
			{
				isOpen: this.props.isOpen,
				onClose: this.props.onCancel,
				backdropClosesModal: true
			},
			this.renderForm()
		);
	}
}); /**
     * The form that's visible when "Create <ItemName>" is clicked on either the
     * List screen or the Item screen
     */

module.exports = CreateForm;

},{"../elemental":65,"./AlertMessages":66,"./InvalidFieldType":68,"FieldTypes":"FieldTypes","object-assign":143,"react":undefined,"vkey":undefined}],68:[function(require,module,exports){
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidFieldType = function InvalidFieldType(props) {
	return _react2.default.createElement(
		"div",
		{ className: "alert alert-danger" },
		"Invalid field type ",
		_react2.default.createElement(
			"strong",
			null,
			props.type
		),
		" at path ",
		_react2.default.createElement(
			"strong",
			null,
			props.path
		)
	);
}; /**
    * Renders an "Invalid Field Type" error
    */

InvalidFieldType.propTypes = {
	path: _react2.default.PropTypes.string,
	type: _react2.default.PropTypes.string
};

module.exports = InvalidFieldType;

},{"react":undefined}],69:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Kbd(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _noImportant.css)(classes.kbd);

	return _react2.default.createElement('kbd', props);
};

var classes = _noImportant.StyleSheet.create({
	kbd: {
		backgroundColor: _theme2.default.color.body,
		borderRadius: 3,
		border: '1px solid #ccc',
		borderBottomColor: (0, _color.darken)('#ccc', 4),
		borderTopColor: (0, _color.lighten)('#ccc', 4),
		boxShadow: '0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset',
		display: 'inline-block',
		fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
		fontSize: '0.85em',
		fontWeight: 700,
		lineHeight: 'inherit',
		padding: '1px 4px',
		whiteSpace: 'nowrap',

		// little hack to tweak "visual-middle" alignment
		position: 'relative',
		top: -1
	}
});

module.exports = Kbd;

},{"../../theme":80,"../../utils/color":83,"aphrodite/no-important":undefined,"react":undefined}],70:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render the body of a popout
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutBody = _react2.default.createClass({
	displayName: 'PopoutBody',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		scrollable: _react2.default.PropTypes.bool
	},
	render: function render() {
		var className = (0, _classnames2.default)('Popout__body', {
			'Popout__scrollable-area': this.props.scrollable
		}, this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className', 'scrollable');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutBody;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],71:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUTTON_BASE_CLASSNAME = 'Popout__footer__button Popout__footer__button--'; /**
                                                                                * Render a footer for a popout
                                                                                */

var PopoutFooter = _react2.default.createClass({
	displayName: 'PopoutFooter',
	propTypes: {
		children: _react2.default.PropTypes.node,
		primaryButtonAction: _react2.default.PropTypes.func,
		primaryButtonIsSubmit: _react2.default.PropTypes.bool,
		primaryButtonLabel: _react2.default.PropTypes.string,
		secondaryButtonAction: _react2.default.PropTypes.func,
		secondaryButtonLabel: _react2.default.PropTypes.string
	},
	// Render a primary button
	renderPrimaryButton: function renderPrimaryButton() {
		if (!this.props.primaryButtonLabel) return null;

		return _react2.default.createElement(
			'button',
			{
				type: this.props.primaryButtonIsSubmit ? 'submit' : 'button',
				className: BUTTON_BASE_CLASSNAME + 'primary',
				onClick: this.props.primaryButtonAction
			},
			this.props.primaryButtonLabel
		);
	},

	// Render a secondary button
	renderSecondaryButton: function renderSecondaryButton() {
		if (!this.props.secondaryButtonAction || !this.props.secondaryButtonLabel) return null;

		return _react2.default.createElement(
			'button',
			{
				type: 'button',
				className: BUTTON_BASE_CLASSNAME + 'secondary',
				onClick: this.props.secondaryButtonAction
			},
			this.props.secondaryButtonLabel
		);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'Popout__footer' },
			this.renderPrimaryButton(),
			this.renderSecondaryButton(),
			this.props.children
		);
	}
});

module.exports = PopoutFooter;

},{"react":undefined}],72:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render a header for a popout
 */

var PopoutHeader = _react2.default.createClass({
	displayName: 'PopoutHeader',
	propTypes: {
		leftAction: _react2.default.PropTypes.func,
		leftIcon: _react2.default.PropTypes.string,
		title: _react2.default.PropTypes.string.isRequired,
		transitionDirection: _react2.default.PropTypes.oneOf(['next', 'prev'])
	},
	render: function render() {
		// If we have a left action and a left icon, render a header button
		var headerButton = this.props.leftAction && this.props.leftIcon ? _react2.default.createElement('button', {
			key: 'button_' + this.props.transitionDirection,
			type: 'button',
			className: 'Popout__header__button octicon octicon-' + this.props.leftIcon,
			onClick: this.props.leftAction
		}) : null;
		// If we have a title, render it
		var headerTitle = this.props.title ? _react2.default.createElement(
			'span',
			{
				key: 'title_' + this.props.transitionDirection,
				className: 'Popout__header__label'
			},
			this.props.title
		) : null;

		return _react2.default.createElement(
			'div',
			{ className: 'Popout__header' },
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'react-transitiongroup-fade',
					transitionEnterTimeout: 190,
					transitionLeaveTimeout: 190
				},
				headerButton
			),
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'Popout__pane-' + this.props.transitionDirection,
					transitionEnterTimeout: 350,
					transitionLeaveTimeout: 350
				},
				headerTitle
			)
		);
	}
});

module.exports = PopoutHeader;

},{"react":undefined,"react-addons-css-transition-group":undefined}],73:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list. Can also use PopoutListItem and PopoutListHeading
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutList = _react2.default.createClass({
	displayName: 'PopoutList',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string
	},
	render: function render() {
		var className = (0, _classnames2.default)('PopoutList', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutList;

// expose the child to the top level export
module.exports.Item = require('./PopoutListItem');
module.exports.Heading = require('./PopoutListHeading');

},{"./PopoutListHeading":74,"./PopoutListItem":75,"blacklist":undefined,"classnames":undefined,"react":undefined}],74:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list heading
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutListHeading = _react2.default.createClass({
	displayName: 'PopoutListHeading',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string
	},
	render: function render() {
		var className = (0, _classnames2.default)('PopoutList__heading', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutListHeading;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],75:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list item
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutListItem = _react2.default.createClass({
	displayName: 'PopoutListItem',
	propTypes: {
		icon: _react2.default.PropTypes.string,
		iconHover: _react2.default.PropTypes.string,
		isSelected: _react2.default.PropTypes.bool,
		label: _react2.default.PropTypes.string.isRequired,
		onClick: _react2.default.PropTypes.func
	},
	getInitialState: function getInitialState() {
		return {
			hover: false
		};
	},
	hover: function hover() {
		this.setState({ hover: true });
	},
	unhover: function unhover() {
		this.setState({ hover: false });
	},

	// Render an icon
	renderIcon: function renderIcon() {
		if (!this.props.icon) return null;
		var icon = this.state.hover && this.props.iconHover ? this.props.iconHover : this.props.icon;
		var iconClassname = (0, _classnames2.default)('PopoutList__item__icon octicon', 'octicon-' + icon);

		return _react2.default.createElement('span', { className: iconClassname });
	},
	render: function render() {
		var itemClassname = (0, _classnames2.default)('PopoutList__item', {
			'is-selected': this.props.isSelected
		});
		var props = (0, _blacklist2.default)(this.props, 'className', 'icon', 'iconHover', 'isSelected', 'label');
		return _react2.default.createElement(
			'button',
			_extends({
				type: 'button',
				title: this.props.label,
				className: itemClassname,
				onFocus: this.hover,
				onBlur: this.unhover,
				onMouseOver: this.hover,
				onMouseOut: this.unhover
			}, props),
			this.renderIcon(),
			_react2.default.createElement(
				'span',
				{ className: 'PopoutList__item__label' },
				this.props.label
			)
		);
	}
});

module.exports = PopoutListItem;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],76:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout pane, calls props.onLayout when the component mounts
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutPane = _react2.default.createClass({
	displayName: 'PopoutPane',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		onLayout: _react2.default.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			onLayout: function onLayout() {}
		};
	},
	componentDidMount: function componentDidMount() {
		this.props.onLayout(this.refs.el.offsetHeight);
	},
	render: function render() {
		var className = (0, _classnames2.default)('Popout__pane', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className', 'onLayout');

		return _react2.default.createElement('div', _extends({ ref: 'el', className: className }, props));
	}
});

module.exports = PopoutPane;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],77:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZES = {
	arrowHeight: 12,
	arrowWidth: 16,
	horizontalMargin: 20
}; /**
    * A Popout component.
    * One can also add a Header (Popout/Header), a Footer
    * (Popout/Footer), a Body (Popout/Body) and a Pan (Popout/Pane).
    */

var Popout = _react2.default.createClass({
	displayName: 'Popout',
	propTypes: {
		isOpen: _react2.default.PropTypes.bool,
		onCancel: _react2.default.PropTypes.func,
		onSubmit: _react2.default.PropTypes.func,
		relativeToID: _react2.default.PropTypes.string.isRequired,
		width: _react2.default.PropTypes.number
	},
	getDefaultProps: function getDefaultProps() {
		return {
			width: 320
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (!this.props.isOpen && nextProps.isOpen) {
			window.addEventListener('resize', this.calculatePosition);
			this.calculatePosition(nextProps.isOpen);
		} else if (this.props.isOpen && !nextProps.isOpen) {
			window.removeEventListener('resize', this.calculatePosition);
		}
	},
	getPortalDOMNode: function getPortalDOMNode() {
		return this.refs.portal.getPortalDOMNode();
	},
	calculatePosition: function calculatePosition(isOpen) {
		if (!isOpen) return;
		var posNode = document.getElementById(this.props.relativeToID);

		var pos = {
			top: 0,
			left: 0,
			width: posNode.offsetWidth,
			height: posNode.offsetHeight
		};
		while (posNode.offsetParent) {
			pos.top += posNode.offsetTop;
			pos.left += posNode.offsetLeft;
			posNode = posNode.offsetParent;
		}

		var leftOffset = Math.max(pos.left + pos.width / 2 - this.props.width / 2, SIZES.horizontalMargin);
		var topOffset = pos.top + pos.height + SIZES.arrowHeight;

		var spaceOnRight = window.innerWidth - (leftOffset + this.props.width + SIZES.horizontalMargin);
		if (spaceOnRight < 0) {
			leftOffset = leftOffset + spaceOnRight;
		}

		var arrowLeftOffset = leftOffset === SIZES.horizontalMargin ? pos.left + pos.width / 2 - SIZES.arrowWidth / 2 - SIZES.horizontalMargin : null;

		var newStateAvaliable = this.state.leftOffset !== leftOffset || this.state.topOffset !== topOffset || this.state.arrowLeftOffset !== arrowLeftOffset;

		if (newStateAvaliable) {
			this.setState({
				leftOffset: leftOffset,
				topOffset: topOffset,
				arrowLeftOffset: arrowLeftOffset
			});
		}
	},
	renderPopout: function renderPopout() {
		if (!this.props.isOpen) return;

		var _state = this.state,
		    arrowLeftOffset = _state.arrowLeftOffset,
		    leftOffset = _state.leftOffset,
		    topOffset = _state.topOffset;


		var arrowStyles = arrowLeftOffset ? { left: 0, marginLeft: arrowLeftOffset } : null;

		return _react2.default.createElement(
			'div',
			{
				className: 'Popout',
				style: {
					left: leftOffset,
					top: topOffset,
					width: this.props.width
				}
			},
			_react2.default.createElement('span', { className: 'Popout__arrow', style: arrowStyles }),
			_react2.default.createElement(
				'div',
				{ className: 'Popout__inner' },
				this.props.children
			)
		);
	},
	renderBlockout: function renderBlockout() {
		if (!this.props.isOpen) return;
		return _react2.default.createElement('div', { className: 'blockout', onClick: this.props.onCancel });
	},
	render: function render() {
		return _react2.default.createElement(
			_Portal2.default,
			{ className: 'Popout-wrapper', ref: 'portal' },
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					className: 'Popout-animation',
					transitionEnterTimeout: 190,
					transitionLeaveTimeout: 190,
					transitionName: 'Popout',
					component: 'div'
				},
				this.renderPopout()
			),
			this.renderBlockout()
		);
	}
});

module.exports = Popout;

// expose the child to the top level export
module.exports.Header = require('./PopoutHeader');
module.exports.Body = require('./PopoutBody');
module.exports.Footer = require('./PopoutFooter');
module.exports.Pane = require('./PopoutPane');

},{"../Portal":78,"./PopoutBody":70,"./PopoutFooter":71,"./PopoutHeader":72,"./PopoutPane":76,"react":undefined,"react-addons-css-transition-group":undefined}],78:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used by the Popout component and the Lightbox component of the fields for
 * popouts. Renders a non-react DOM node.
 */

module.exports = _react2.default.createClass({
	displayName: 'Portal',
	portalElement: null, // eslint-disable-line react/sort-comp
	componentDidMount: function componentDidMount() {
		var el = document.createElement('div');
		document.body.appendChild(el);
		this.portalElement = el;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		_reactDom2.default.render(_react2.default.createElement('div', this.props), this.portalElement);
	},
	getPortalDOMNode: function getPortalDOMNode() {
		return this.portalElement;
	},
	render: function render() {
		return null;
	}
});

},{"react":undefined,"react-dom":undefined}],79:[function(require,module,exports){
'use strict';

/**
 * Constants
 */

// breakpoints
exports.breakpoint = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200
};

// border radii
exports.borderRadius = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 16,
	xl: 32
};

// color
exports.color = {
	appDanger: '#d64242',
	appInfo: '#56cdfc',
	appPrimary: '#1385e5',
	appSuccess: '#34c240',
	appWarning: '#fa9f47'
};

// spacing
exports.spacing = {
	xs: 5,
	sm: 10,
	md: 20,
	lg: 40,
	xl: 80
};

// table constants

exports.TABLE_CONTROL_COLUMN_WIDTH = 26; // icon + padding
exports.NETWORK_ERROR_RETRY_DELAY = 500; // in ms

},{}],80:[function(require,module,exports){
'use strict';

/* eslint-disable key-spacing */
var theme = {};

var _require = require('./utils/color'),
    blend = _require.blend,
    darken = _require.darken,
    fade = _require.fade,
    lighten = _require.lighten;

// ==============================
// COMMON
// ==============================

// breakpoint

theme.breakpointNumeric = {
	mobile: 480,
	tabletPortrait: 768,
	tabletLandscape: 992,
	desktop: 1200
};
theme.breakpoint = {
	tabletPortraitMin: theme.breakpointNumeric.mobile + 1 + 'px',
	tabletLandscapeMin: theme.breakpointNumeric.tabletPortrait + 1 + 'px',
	desktopMin: theme.breakpointNumeric.tabletLandscape + 1 + 'px',
	desktopLargeMin: theme.breakpointNumeric.desktop + 1 + 'px',

	mobileMax: theme.breakpointNumeric.mobile + 'px',
	tabletPortraitMax: theme.breakpointNumeric.tabletPortrait + 'px',
	tabletLandscapeMax: theme.breakpointNumeric.tabletLandscape + 'px',
	desktopMax: theme.breakpointNumeric.desktop + 'px'
};

// container

theme.container = {
	gutter: 20,
	size: {
		small: 750,
		medium: 970,
		large: 1170
	}
};

// color

theme.color = {
	body: '#fafafa',
	link: '#1385e5',
	linkHover: lighten('#1385e5', 10),
	text: '#1A1A1A',

	// contextual
	success: '#34c240',
	create: '#34c240', // alias for success
	primary: '#1385e5',
	info: '#1385e5', // alias for primary
	warning: '#FA3',
	danger: '#d64242',
	error: '#d64242', // alias for danger

	// neutrals
	gray90: '#1A1A1A',
	gray80: '#333',
	gray70: '#4D4D4D',
	gray60: '#666',
	gray50: '#7F7F7F',
	gray40: '#999',
	gray30: '#B3B3B3',
	gray20: '#CCC',
	gray15: '#D9D9D9',
	gray10: '#E5E5E5',
	gray05: '#F2F2F2',

	// social
	facebook: '#3B5998',
	google: '#DC4E41',
	instagram: '#3f729b',
	pinterest: '#bd081c',
	tumblr: '#35465c',
	twitter: '#55ACEE',
	youtube: '#cd201f',
	vimeo: '#1ab7ea'
};

// border radii

theme.borderRadius = {
	small: '0.125rem',
	default: '0.3rem',
	large: '0.5rem'
};

// spacing

theme.spacing = {
	xsmall: 5,
	small: 10,
	default: 20,
	large: 30,
	xlarge: 40,
	xxlarge: 60
};

// ==============================
// ELEMENTAL SPECIFIC
// ==============================

// button

theme.button = {
	borderRadius: theme.borderRadius.default,
	borderWidth: 1,
	font: {
		weight: 500
	},
	paddingHorizontal: '1em',
	default: {
		bgColor: theme.color.primary,
		borderColor: blend(theme.color.primary, theme.color.body, 60),
		textColor: theme.color.primary
	},
	primary: {
		bgColor: theme.color.primary,
		borderColor: blend(theme.color.primary, theme.color.body, 60),
		textColor: theme.color.primary
	},
	success: {
		bgColor: theme.color.success,
		borderColor: blend(theme.color.success, theme.color.body, 60),
		textColor: theme.color.success
	},
	warning: {
		bgColor: theme.color.warning,
		borderColor: blend(theme.color.warning, theme.color.body, 60),
		textColor: theme.color.warning
	},
	danger: {
		bgColor: theme.color.danger,
		borderColor: blend(theme.color.danger, theme.color.body, 60),
		textColor: theme.color.danger
	}
};

// blank state

theme.blankstate = {
	background: darken(theme.color.body, 4),
	borderRadius: theme.borderRadius.default,
	color: theme.color.gray40,
	paddingHorizontal: '2em',
	paddingVertical: '4em'
};

// font

theme.font = {
	family: {
		mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
		sansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
		serif: 'Georgia, Times New Roman, Times, serif'
	},
	size: {
		xxsmall: '0.65rem',
		xsmall: '0.75rem',
		small: '0.85rem',
		default: '1rem',
		medium: '1.2rem',
		large: '1.6rem',
		xlarge: '2.4rem',
		xxlarge: '3.2rem'
	}
};

// form

theme.form = {
	label: {
		color: theme.color.gray50,
		fontSize: '1rem',
		fontWeight: 'normal',
		width: 180
	},
	note: {
		color: theme.color.gray40,
		fontSize: '0.9em'
	}
};

// component

theme.component = {
	lineHeight: '2.3em',
	height: '2.4em',
	padding: '1em'
};

// input

theme.input = {
	background: {
		default: 'white',
		disabled: '#fafafa',
		noedit: darken(theme.color.body, 2)
	},
	placeholderColor: '#aaa',
	lineHeight: theme.component.lineHeight,
	height: theme.component.height,
	border: {
		color: {
			default: '#ccc',
			focus: theme.color.info,
			hover: '#bbb',
			noedit: darken(theme.color.body, 8)
		},
		radius: theme.borderRadius.default,
		width: 1
	},
	boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
	boxShadowFocus: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px ' + fade(theme.color.info, 10),
	paddingHorizontal: '.75em'
};

// select

theme.select = {
	boxShadow: '0 1px 1px rgba(0, 0, 0, 0.075)'
};

// alert

theme.alert = {
	padding: '0.75em  1em',
	margin: '0 0 1em',
	borderWidth: 1,
	borderRadius: theme.borderRadius.default,

	color: {
		danger: {
			background: fade(theme.color.danger, 10),
			border: fade(theme.color.danger, 10),
			text: theme.color.danger
		},
		info: {
			background: fade(theme.color.primary, 10),
			border: fade(theme.color.primary, 10),
			text: theme.color.primary
		},
		success: {
			background: fade(theme.color.success, 10),
			border: fade(theme.color.success, 10),
			text: theme.color.success
		},
		warning: {
			background: fade(theme.color.warning, 10),
			border: fade(theme.color.warning, 10),
			text: theme.color.warning
		}
	}
};

// glyph

theme.glyph = {
	color: {
		danger: theme.color.danger,
		inherit: 'inherit',
		inverted: 'white',
		primary: theme.color.primary,
		success: theme.color.success,
		warning: theme.color.warning
	},
	size: {
		small: 16,
		medium: 32,
		large: 64
	}
};

// modal

theme.modal = {
	background: 'rgba(0, 0, 0, 0.8)',
	zIndex: 100,
	padding: {
		dialog: {
			horizontal: '1em',
			vertical: 0
		},
		body: {
			horizontal: 0,
			vertical: '1em'
		},
		footer: {
			horizontal: 0,
			vertical: '1em'
		},
		header: {
			horizontal: 0,
			vertical: '0.6em'
		}
	}
};

// pagination

theme.pagination = {
	color: theme.color.gray60,

	hover: {
		background: 'white',
		border: 'rgba(0, 0, 0, 0.1)',
		color: theme.color.gray60
	},
	selected: {
		background: 'rgba(0, 0, 0, 0.05)',
		border: 'transparent',
		color: theme.color.gray60
	},
	disabled: {
		background: 'transparent',
		color: theme.color.gray40
	}
};

// spinner

theme.spinner = {
	color: {
		danger: theme.color.danger,
		default: theme.color.gray40,
		inverted: 'white',
		primary: theme.color.primary,
		success: theme.color.success,
		warning: theme.color.warning
	},
	size: {
		small: 4,
		medium: 8,
		large: 16
	}
};

module.exports = theme;

},{"./utils/color":83}],81:[function(require,module,exports){
'use strict';

/**
 * Helper method to handle List operations, e.g. creating items, deleting items,
 * getting information about those lists, etc.
 */

var listToArray = require('list-to-array');
var qs = require('qs');
var xhr = require('xhr');
var assign = require('object-assign');
// Filters for truthy elements in an array
var truthy = function truthy(i) {
	return i;
};

/**
 * Get the columns of a list, structured by fields and headings
 *
 * @param  {Object} list The list we want the columns of
 *
 * @return {Array}       The columns
 */
function getColumns(list) {
	return list.uiElements.map(function (col) {
		if (col.type === 'heading') {
			return { type: 'heading', content: col.content };
		} else {
			var field = list.fields[col.field];
			return field ? { type: 'field', field: field, title: field.label, path: field.path } : null;
		}
	}).filter(truthy);
}

/**
 * Make an array of filters an object keyed by the filtering path
 *
 * @param  {Array} filterArray The array of filters
 *
 * @return {Object}            The corrected filters, keyed by path
 */
function getFilters(filterArray) {
	var filters = {};
	filterArray.forEach(function (filter) {
		filters[filter.field.path] = filter.value;
	});
	return filters;
};

/**
 * Get the sorting string for the URI
 *
 * @param  {Array} sort.paths The paths we want to sort
 *
 * @return {String}           All the sorting queries we want as a string
 */
function getSortString(sort) {
	return sort.paths.map(function (i) {
		// If we want to sort inverted, we prefix a "-" before the sort path
		return i.invert ? '-' + i.path : i.path;
	}).filter(truthy).join(',');
};

/**
 * Build a query string from a bunch of options
 */
function buildQueryString(options) {
	var query = {};
	if (options.search) query.search = options.search;
	if (options.filters.length) query.filters = JSON.stringify(getFilters(options.filters));
	if (options.columns) query.fields = options.columns.map(function (i) {
		return i.path;
	}).join(',');
	if (options.page && options.page.size) query.limit = options.page.size;
	if (options.page && options.page.index > 1) query.skip = (options.page.index - 1) * options.page.size;
	if (options.sort) query.sort = getSortString(options.sort);
	query.expandRelationshipFields = true;
	return '?' + qs.stringify(query);
};

/**
 * The main list helper class
 *
 * @param {Object} options
 */
var List = function List(options) {
	// TODO these options are possibly unused
	assign(this, options);
	this.columns = getColumns(this);
	this.expandedDefaultColumns = this.expandColumns(this.defaultColumns);
	this.defaultColumnPaths = this.expandedDefaultColumns.map(function (i) {
		return i.path;
	}).join(',');
};

/**
 * Create an item via the API
 *
 * @param  {FormData} formData The submitted form data
 * @param  {Function} callback Called after the API call
 */
List.prototype.createItem = function (formData, callback) {
	xhr({
		url: Keystone.adminPath + '/api/' + this.path + '/create',
		responseType: 'json',
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		body: formData
	}, function (err, resp, data) {
		if (err) callback(err);
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			// NOTE: xhr callback will be called with an Error if
			//  there is an error in the browser that prevents
			//  sending the request. A HTTP 500 response is not
			//  going to cause an error to be returned.
			callback(data, null);
		}
	});
};

/**
 * Update a specific item
 *
 * @param  {String}   id       The id of the item we want to update
 * @param  {FormData} formData The submitted form data
 * @param  {Function} callback Called after the API call
 */
List.prototype.updateItem = function (id, formData, callback) {
	xhr({
		url: Keystone.adminPath + '/api/' + this.path + '/' + id,
		responseType: 'json',
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		body: formData
	}, function (err, resp, data) {
		if (err) return callback(err);
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

List.prototype.expandColumns = function (input) {
	var _this = this;

	var nameIncluded = false;
	var cols = listToArray(input).map(function (i) {
		var split = i.split('|');
		var path = split[0];
		var width = split[1];
		if (path === '__name__') {
			path = _this.namePath;
		}
		var field = _this.fields[path];
		if (!field) {
			// TODO: Support arbitary document paths
			if (!_this.hidden) {
				if (path === _this.namePath) {
					console.warn('List ' + _this.key + ' did not specify any default columns or a name field');
				} else {
					console.warn('List ' + _this.key + ' specified an invalid default column: ' + path);
				}
			}
			return;
		}
		if (path === _this.namePath) {
			nameIncluded = true;
		}
		return {
			field: field,
			label: field.label,
			path: field.path,
			type: field.type,
			width: width
		};
	}).filter(truthy);
	if (!nameIncluded) {
		cols.unshift({
			type: 'id',
			label: 'ID',
			path: 'id'
		});
	}
	return cols;
};

List.prototype.expandSort = function (input) {
	var _this2 = this;

	var sort = {
		rawInput: input || this.defaultSort,
		isDefaultSort: false
	};
	sort.input = sort.rawInput;
	if (sort.input === '__default__') {
		sort.isDefaultSort = true;
		sort.input = this.sortable ? 'sortOrder' : this.namePath;
	}
	sort.paths = listToArray(sort.input).map(function (path) {
		var invert = false;
		if (path.charAt(0) === '-') {
			invert = true;
			path = path.substr(1);
		} else if (path.charAt(0) === '+') {
			path = path.substr(1);
		}
		var field = _this2.fields[path];
		if (!field) {
			// TODO: Support arbitary document paths
			console.warn('Invalid Sort specified:', path);
			return;
		}
		return {
			field: field,
			type: field.type,
			label: field.label,
			path: field.path,
			invert: invert
		};
	}).filter(truthy);
	return sort;
};

/**
 * Load a specific item via the API
 *
 * @param  {String}   itemId   The id of the item we want to load
 * @param  {Object}   options
 * @param  {Function} callback
 */
List.prototype.loadItem = function (itemId, options, callback) {
	if (arguments.length === 2 && typeof options === 'function') {
		callback = options;
		options = null;
	}
	var url = Keystone.adminPath + '/api/' + this.path + '/' + itemId;
	var query = qs.stringify(options);
	if (query.length) url += '?' + query;
	xhr({
		url: url,
		responseType: 'json'
	}, function (err, resp, data) {
		if (err) return callback(err);
		// Pass the data as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

/**
 * Load all items of a list, optionally passing objects to build a query string
 * for sorting or searching
 *
 * @param  {Object}   options
 * @param  {Function} callback
 */
List.prototype.loadItems = function (options, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + buildQueryString(options);
	xhr({
		url: url,
		responseType: 'json'
	}, function (err, resp, data) {
		if (err) callback(err);
		// Pass the data as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

/**
 * Constructs a download URL to download a list with the current sorting, filtering,
 * selection and searching options
 *
 * @param  {Object} options
 *
 * @return {String}         The download URL
 */
List.prototype.getDownloadURL = function (options) {
	var url = Keystone.adminPath + '/api/' + this.path;
	var parts = [];
	if (options.format !== 'json') {
		options.format = 'csv';
	}
	parts.push(options.search ? 'search=' + options.search : '');
	parts.push(options.filters.length ? 'filters=' + JSON.stringify(getFilters(options.filters)) : '');
	parts.push(options.columns ? 'select=' + options.columns.map(function (i) {
		return i.path;
	}).join(',') : '');
	parts.push(options.sort ? 'sort=' + getSortString(options.sort) : '');
	parts.push('expandRelationshipFields=true');
	return url + '/export.' + options.format + '?' + parts.filter(truthy).join('&');
};

/**
 * Delete a specific item via the API
 *
 * @param  {String}   itemId   The id of the item we want to delete
 * @param  {Function} callback
 */
List.prototype.deleteItem = function (itemId, callback) {
	this.deleteItems([itemId], callback);
};

/**
 * Delete multiple items at once via the API
 *
 * @param  {Array}   itemIds  An array of ids of items we want to delete
 * @param  {Function} callback
 */
List.prototype.deleteItems = function (itemIds, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + '/delete';
	xhr({
		url: url,
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		json: {
			ids: itemIds
		}
	}, function (err, resp, body) {
		if (err) return callback(err);
		// Pass the body as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, body);
		} else {
			callback(body);
		}
	});
};

List.prototype.reorderItems = function (item, oldSortOrder, newSortOrder, pageOptions, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + '/' + item.id + '/sortOrder/' + oldSortOrder + '/' + newSortOrder + '/' + buildQueryString(pageOptions);
	xhr({
		url: url,
		method: 'POST',
		headers: assign({}, Keystone.csrf.header)
	}, function (err, resp, body) {
		if (err) return callback(err);
		try {
			body = JSON.parse(body);
		} catch (e) {
			console.log('Error parsing results json:', e, body);
			return callback(e);
		}
		// Pass the body as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, body);
		} else {
			callback(body);
		}
	});
};

module.exports = List;

},{"list-to-array":undefined,"object-assign":143,"qs":undefined,"xhr":undefined}],82:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cloudinaryMicrourl = require('cloudinary-microurl');

var _cloudinaryMicrourl2 = _interopRequireDefault(_cloudinaryMicrourl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOUD_NAME = window.Keystone.cloudinary.cloud_name;

/*
	Take a cloudinary public id + options object
	and return a url
*/
function cloudinaryResize(publicId) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (!publicId || !CLOUD_NAME) return false;

	return (0, _cloudinaryMicrourl2.default)(publicId, _extends({
		cloud_name: CLOUD_NAME, // single cloud for the admin UI
		quality: 80 }, options));
};

module.exports = cloudinaryResize;

},{"cloudinary-microurl":1}],83:[function(require,module,exports){
'use strict';

/**
	Validate Hex
	==============================

	@param {String} hex

	1. remove hash if present
	2. convert from 3 to 6 digit color code & ensure valid hex
*/

function validateHex(color) {
	var hex = color.replace('#', '');

	if (hex.length === 3) {
		return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid color value provided: "' + color + '"');
	}

	return hex;
};

/**
	Fade Color
	==============================

	Takes a hexidecimal color, converts it to RGB and applies an alpha value.

	@param {String} color
	@param {Number} opacity (0-100)

	1. convert hex to RGB
	2. combine and add alpha channel
*/

function fade(color) {
	var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

	var decimalFraction = opacity / 100;
	var hex = validateHex(color);

	// 1.
	var r = parseInt(hex.substring(0, 2), 16);
	var g = parseInt(hex.substring(2, 4), 16);
	var b = parseInt(hex.substring(4, 6), 16);

	// 2.
	var result = 'rgba(' + r + ',' + g + ',' + b + ',' + decimalFraction + ')';

	return result;
};

/**
	Shade Color
	==============================

	Takes a hexidecimal color, converts it to RGB and lightens or darkens

	@param {String} color
	@param {Number} opacity (0-100)

	1. do fancy RGB bitwise operations
	2. combine back into a hex value
*/

function shade(color, percent) {
	var decimalFraction = percent / 100;
	var hex = validateHex(color);

	// 1.
	var f = parseInt(hex, 16);
	var t = decimalFraction < 0 ? 0 : 255;
	var p = decimalFraction < 0 ? decimalFraction * -1 : decimalFraction;

	var R = f >> 16;
	var G = f >> 8 & 0x00FF;
	var B = f & 0x0000FF;

	// 2.
	return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

// shade helpers
var lighten = shade;
function darken(color, percent) {
	return shade(color, percent * -1);
};

/**
	Blend Color
	==============================

	Takes two hexidecimal colors and blend them together

	@param {String} color1
	@param {String} color2
	@param {Number} percent (0-100)

	1. do fancy RGB bitwise operations
	2. combine back into a hex value
*/

function blend(color1, color2, percent) {
	var decimalFraction = percent / 100;
	var hex1 = validateHex(color1);
	var hex2 = validateHex(color2);

	// 1.
	var f = parseInt(hex1, 16);
	var t = parseInt(hex2, 16);

	var R1 = f >> 16;
	var G1 = f >> 8 & 0x00FF;
	var B1 = f & 0x0000FF;

	var R2 = t >> 16;
	var G2 = t >> 8 & 0x00FF;
	var B2 = t & 0x0000FF;

	// 2.
	return '#' + (0x1000000 + (Math.round((R2 - R1) * decimalFraction) + R1) * 0x10000 + (Math.round((G2 - G1) * decimalFraction) + G1) * 0x100 + (Math.round((B2 - B1) * decimalFraction) + B1)).toString(16).slice(1);
}

module.exports = {
	blend: blend,
	darken: darken,
	fade: fade,
	lighten: lighten
};

},{}],84:[function(require,module,exports){
"use strict";

// ======================
// Concatenate Classnames
// ======================
//
// Support className as an array:
// force classname prop into an array (possibly of arrays) then flatten

/*
	// To use spread the new array into aphrodite's `css` function

	function Component ({ className, ...props }) {
		props.className = css(
			classes.component,
			...concatClassnames(className)
		);

		return <Component {...props} />;
	};
*/

module.exports = function concatClassnames(className) {
	return [className].reduce(function (a, b) {
		return a.concat(b);
	}, []);
};

},{}],85:[function(require,module,exports){
'use strict';

/**
	Linear Gradient
	==============================

	Short-hand helper for adding a linear gradient to your component.

	- @param {String} sideOrCorner
	- @param {String} top
	- @param {String} bottom
	- @param {String} base (optional)
	- @returns {Object} css linear gradient declaration

	Spread the declaration into your component class:
	------------------------------

	myComponentClass: {
		...linearGradient(red, blue),
	}
*/

function linearGradient(direction, top, bottom) {
	var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	return {
		background: 'linear-gradient(' + direction + ', ' + top + ' 0%, ' + bottom + ' 100%) ' + base
	};
}

// Vertical Gradient
function gradientVertical(top, bottom, base) {
	return linearGradient('to bottom', top, bottom, base);
}

// Horizontal Gradient
function gradientHorizontal(top, bottom, base) {
	return linearGradient('to right', top, bottom, base);
}

/**
	Border Radius
	==============================

	Short-hand helper for border radii
*/

// top
function borderTopRadius(radius) {
	return {
		borderTopLeftRadius: radius,
		borderTopRightRadius: radius
	};
}

// right
function borderRightRadius(radius) {
	return {
		borderBottomRightRadius: radius,
		borderTopRightRadius: radius
	};
}

// bottom
function borderBottomRadius(radius) {
	return {
		borderBottomLeftRadius: radius,
		borderBottomRightRadius: radius
	};
}

// left
function borderLeftRadius(radius) {
	return {
		borderBottomLeftRadius: radius,
		borderTopLeftRadius: radius
	};
}

// Return

module.exports = {
	borderTopRadius: borderTopRadius,
	borderRightRadius: borderRightRadius,
	borderBottomRadius: borderBottomRadius,
	borderLeftRadius: borderLeftRadius,

	gradientHorizontal: gradientHorizontal,
	gradientVertical: gradientVertical
};

},{}],86:[function(require,module,exports){
'use strict';

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.listsByKey = {}; /**
                          * Exports an object of lists, keyed with their key instead of their name and
                          * wrapped with the List helper (./List.js)
                          */

exports.listsByPath = {};

for (var key in Keystone.lists) {
	// Guard for-ins
	if ({}.hasOwnProperty.call(Keystone.lists, key)) {
		var list = new _List2.default(Keystone.lists[key]);
		exports.listsByKey[key] = list;
		exports.listsByPath[list.path] = list;
	}
}

},{"./List":81}],87:[function(require,module,exports){
'use strict';

var _i = require('i');

var _i2 = _interopRequireDefault(_i);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays the singular or plural of a string based on a number
 * or number of items in an array.
 *
 * If arity is 1, returns the plural form of the word.
 *
 * @param {String} count
 * @param {String} singular string
 * @param {String} plural string
 * @return {String} singular or plural, * is replaced with count
 * @api public
 */

/**
 * A few helper methods for strings
 */

exports.plural = function (count, sn, pl) {
  if (arguments.length === 1) {
    return _i2.default.pluralize(count);
  }
  if (typeof sn !== 'string') sn = '';
  if (!pl) {
    pl = _i2.default.pluralize(sn);
  }
  if (typeof count === 'string') {
    count = Number(count);
  } else if (typeof count !== 'number') {
    count = (0, _lodash.size)(count);
  }
  return (count === 1 ? sn : pl).replace('*', count);
};

/**
 * Converts the first letter in a string to uppercase
 *
 * @param {String} str
 * @return {String} Str
 * @api public
 */

exports.upcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

/**
 * Converts the first letter in a string to lowercase
 *
 * @param {String} Str
 * @return {String} str
 * @api public
 */

exports.downcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

/**
 * Converts a string to title case
 *
 * @param {String} str
 * @return {String} Title Case form of str
 * @api public
 */

exports.titlecase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  var parts = str.split(/\s|_|\-/);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
      parts[i] = exports.upcase(parts[i]);
    }
  }
  return (0, _lodash.compact)(parts).join(' ');
};

/**
 * Converts a string to camel case
 *
 * @param {String} str
 * @param {Boolean} lowercaseFirstWord
 * @return {String} camel-case form of str
 * @api public
 */

exports.camelcase = function (str, lc) {
  return _i2.default.camelize(str, !lc);
};

},{"i":undefined,"lodash":undefined}],88:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color = require('../../admin/client/utils/color');

var _constants = require('../../admin/client/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = _react2.default.createClass({
	displayName: 'Checkbox',
	propTypes: {
		checked: _react2.default.PropTypes.bool,
		component: _react2.default.PropTypes.node,
		onChange: _react2.default.PropTypes.func,
		readonly: _react2.default.PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			component: 'button'
		};
	},
	getInitialState: function getInitialState() {
		return {
			active: null,
			focus: null,
			hover: null
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('mouseup', this.handleMouseUp, false);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('mouseup', this.handleMouseUp, false);
	},
	getStyles: function getStyles() {
		var _props = this.props,
		    checked = _props.checked,
		    readonly = _props.readonly;
		var _state = this.state,
		    active = _state.active,
		    focus = _state.focus,
		    hover = _state.hover;


		var checkedColor = '#3999fc';

		var background = checked && !readonly ? checkedColor : 'white';
		var borderColor = checked && !readonly ? 'rgba(0,0,0,0.15) rgba(0,0,0,0.1) rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3) rgba(0,0,0,0.2) rgba(0,0,0,0.15)';
		var boxShadow = checked && !readonly ? '0 1px 0 rgba(255,255,255,0.33)' : 'inset 0 1px 0 rgba(0,0,0,0.06)';
		var color = checked && !readonly ? 'white' : '#bbb';
		var textShadow = checked && !readonly ? '0 1px 0 rgba(0,0,0,0.2)' : null;

		// pseudo state
		if (hover && !focus && !readonly) {
			borderColor = checked ? 'rgba(0,0,0,0.1) rgba(0,0,0,0.15) rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.35) rgba(0,0,0,0.3) rgba(0,0,0,0.25)';
		}
		if (active) {
			background = checked && !readonly ? (0, _color.darken)(checkedColor, 20) : '#eee';
			borderColor = checked && !readonly ? 'rgba(0,0,0,0.25) rgba(0,0,0,0.3) rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.4) rgba(0,0,0,0.35) rgba(0,0,0,0.3)';
			boxShadow = checked && !readonly ? '0 1px 0 rgba(255,255,255,0.33)' : 'inset 0 1px 3px rgba(0,0,0,0.2)';
		}
		if (focus && !active) {
			borderColor = checked && !readonly ? 'rgba(0,0,0,0.25) rgba(0,0,0,0.3) rgba(0,0,0,0.35)' : checkedColor;
			boxShadow = checked && !readonly ? '0 0 0 3px ' + (0, _color.fade)(checkedColor, 15) : 'inset 0 1px 2px rgba(0,0,0,0.15), 0 0 0 3px ' + (0, _color.fade)(checkedColor, 15);
		}

		// noedit
		if (readonly) {
			background = 'rgba(255,255,255,0.5)';
			borderColor = 'rgba(0,0,0,0.1)';
			boxShadow = 'none';
			color = checked ? checkedColor : '#bbb';
		}

		return {
			alignItems: 'center',
			background: background,
			border: '1px solid',
			borderColor: borderColor,
			borderRadius: _constants2.default.borderRadius.sm,
			boxShadow: boxShadow,
			color: color,
			display: 'inline-block',
			fontSize: 14,
			height: 16,
			lineHeight: '15px',
			outline: 'none',
			padding: 0,
			textAlign: 'center',
			textShadow: textShadow,
			verticalAlign: 'middle',
			width: 16,

			msTransition: 'all 120ms ease-out',
			MozTransition: 'all 120ms ease-out',
			WebkitTransition: 'all 120ms ease-out',
			transition: 'all 120ms ease-out'
		};
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode !== 32) return;
		this.toggleActive(true);
	},
	handleKeyUp: function handleKeyUp() {
		this.toggleActive(false);
	},
	handleMouseOver: function handleMouseOver() {
		this.toggleHover(true);
	},
	handleMouseDown: function handleMouseDown() {
		this.toggleActive(true);
		this.toggleFocus(true);
	},
	handleMouseUp: function handleMouseUp() {
		this.toggleActive(false);
	},
	handleMouseOut: function handleMouseOut() {
		this.toggleHover(false);
	},
	toggleActive: function toggleActive(pseudo) {
		this.setState({ active: pseudo });
	},
	toggleHover: function toggleHover(pseudo) {
		this.setState({ hover: pseudo });
	},
	toggleFocus: function toggleFocus(pseudo) {
		this.setState({ focus: pseudo });
	},
	handleChange: function handleChange() {
		this.props.onChange(!this.props.checked);
	},
	render: function render() {
		var _this = this;

		var _props2 = this.props,
		    checked = _props2.checked,
		    readonly = _props2.readonly;


		var props = (0, _blacklist2.default)(this.props, 'checked', 'component', 'onChange', 'readonly');
		props.style = this.getStyles();
		props.ref = 'checkbox';
		props.className = (0, _classnames2.default)('octicon', {
			'octicon-check': checked,
			'octicon-x': typeof checked === 'boolean' && !checked && readonly
		});
		props.type = readonly ? null : 'button';

		props.onKeyDown = this.handleKeyDown;
		props.onKeyUp = this.handleKeyUp;

		props.onMouseDown = this.handleMouseDown;
		props.onMouseUp = this.handleMouseUp;
		props.onMouseOver = this.handleMouseOver;
		props.onMouseOut = this.handleMouseOut;

		props.onClick = readonly ? null : this.handleChange;
		props.onFocus = readonly ? null : function () {
			return _this.toggleFocus(true);
		};
		props.onBlur = readonly ? null : function () {
			return _this.toggleFocus(false);
		};

		var node = readonly ? 'span' : this.props.component;

		return _react2.default.createElement(node, props);
	}
});

module.exports = Checkbox;

},{"../../admin/client/constants":79,"../../admin/client/utils/color":83,"blacklist":undefined,"classnames":undefined,"react":undefined}],89:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE marginBottom of 1px stops things jumping around
// TODO find out why this is necessary

function CollapsedFieldLabel(_ref) {
	var style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['style']);

	var __style__ = _extends({
		marginBottom: 1,
		paddingLeft: 0,
		paddingRight: 0
	}, style);

	return _react2.default.createElement(_elemental.Button, _extends({ variant: 'link', style: __style__ }, props));
};

module.exports = CollapsedFieldLabel;

},{"../../admin/client/App/elemental":65,"react":undefined}],90:[function(require,module,exports){
'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Popout = require('../../admin/client/App/shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _elemental = require('../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastId = 0;

module.exports = _react2.default.createClass({
	displayName: 'DateInput',
	propTypes: {
		format: _react2.default.PropTypes.string,
		name: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			format: 'YYYY-MM-DD'
		};
	},
	getInitialState: function getInitialState() {
		var id = ++lastId;
		var month = new Date();
		var _props = this.props,
		    format = _props.format,
		    value = _props.value;

		if ((0, _moment2.default)(value, format, true).isValid()) {
			month = (0, _moment2.default)(value, format).toDate();
		}
		return {
			id: '_DateInput_' + id,
			month: month,
			pickerIsOpen: false,
			inputValue: value
		};
	},
	componentDidMount: function componentDidMount() {
		this.showCurrentMonth();
	},

	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (newProps.value === this.props.value) return;
		this.setState({
			month: (0, _moment2.default)(newProps.value, this.props.format).toDate(),
			inputValue: newProps.value
		}, this.showCurrentMonth);
	},
	focus: function focus() {
		if (!this.refs.input) return;
		(0, _reactDom.findDOMNode)(this.refs.input).focus();
	},
	handleInputChange: function handleInputChange(e) {
		var value = e.target.value;

		this.setState({ inputValue: value }, this.showCurrentMonth);
	},
	handleKeyPress: function handleKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// If the date is strictly equal to the format string, dispatch onChange
			if ((0, _moment2.default)(this.state.inputValue, this.props.format, true).isValid()) {
				this.props.onChange({ value: this.state.inputValue });
				// If the date is not strictly equal, only change the tab that is displayed
			} else if ((0, _moment2.default)(this.state.inputValue, this.props.format).isValid()) {
				this.setState({
					month: (0, _moment2.default)(this.state.inputValue, this.props.format).toDate()
				}, this.showCurrentMonth);
			}
		}
	},
	handleDaySelect: function handleDaySelect(e, date, modifiers) {
		if (modifiers && modifiers.disabled) return;

		var value = (0, _moment2.default)(date).format(this.props.format);

		this.props.onChange({ value: value });
		this.setState({
			pickerIsOpen: false,
			month: date,
			inputValue: value
		});
	},
	showPicker: function showPicker() {
		this.setState({ pickerIsOpen: true }, this.showCurrentMonth);
	},
	showCurrentMonth: function showCurrentMonth() {
		if (!this.refs.picker) return;
		this.refs.picker.showMonth(this.state.month);
	},
	handleFocus: function handleFocus(e) {
		if (this.state.pickerIsOpen) return;
		this.showPicker();
	},
	handleCancel: function handleCancel() {
		this.setState({ pickerIsOpen: false });
	},
	handleBlur: function handleBlur(e) {
		var rt = e.relatedTarget || e.nativeEvent.explicitOriginalTarget;
		var popout = this.refs.popout.getPortalDOMNode();
		while (rt) {
			if (rt === popout) return;
			rt = rt.parentNode;
		}
		this.setState({
			pickerIsOpen: false
		});
	},
	render: function render() {
		var _this = this;

		var selectedDay = this.props.value;
		// react-day-picker adds a class to the selected day based on this
		var modifiers = {
			selected: function selected(day) {
				return (0, _moment2.default)(day).format(_this.props.format) === selectedDay;
			}
		};

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_elemental.FormInput, {
				autoComplete: 'off',
				id: this.state.id,
				name: this.props.name,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleFocus,
				onKeyPress: this.handleKeyPress,
				placeholder: this.props.format,
				ref: 'input',
				value: this.state.inputValue
			}),
			_react2.default.createElement(
				_Popout2.default,
				{
					isOpen: this.state.pickerIsOpen,
					onCancel: this.handleCancel,
					ref: 'popout',
					relativeToID: this.state.id,
					width: 260
				},
				_react2.default.createElement(_reactDayPicker2.default, {
					modifiers: modifiers,
					onDayClick: this.handleDaySelect,
					ref: 'picker',
					tabIndex: -1
				})
			)
		);
	}
});

},{"../../admin/client/App/elemental":65,"../../admin/client/App/shared/Popout":77,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],91:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

var _color = require('../../admin/client/utils/color');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FileChangeMessage(_ref) {
	var style = _ref.style,
	    color = _ref.color,
	    props = _objectWithoutProperties(_ref, ['style', 'color']);

	var styles = _extends({
		marginRight: 10,
		minWidth: 0
	}, style);

	if (color !== 'default') {
		styles.backgroundColor = (0, _color.fade)(_theme2.default.color[color], 10);
		styles.borderColor = (0, _color.fade)(_theme2.default.color[color], 30);
		styles.color = _theme2.default.color[color];
	}

	return _react2.default.createElement(_elemental.FormInput, _extends({
		noedit: true,
		style: styles
	}, props));
};

FileChangeMessage.propTypes = {
	color: _react.PropTypes.oneOf(['danger', 'default', 'success'])
};
FileChangeMessage.defaultProps = {
	color: 'default'
};

module.exports = FileChangeMessage;

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":80,"../../admin/client/utils/color":83,"react":undefined}],92:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
	Expose internal ref to parent
	=============================

	Field.create({
		triggerFileBrowser () {
			this.refs.fileInput.clickDomNode();
		},
		render () {
			<HiddenFileInput ref="fileInput" />
		}
	});
*/

var HiddenFileInput = function (_Component) {
	_inherits(HiddenFileInput, _Component);

	function HiddenFileInput() {
		_classCallCheck(this, HiddenFileInput);

		var _this = _possibleConstructorReturn(this, (HiddenFileInput.__proto__ || Object.getPrototypeOf(HiddenFileInput)).call(this));

		_this.clearValue = _this.clearValue.bind(_this);
		_this.clickDomNode = _this.clickDomNode.bind(_this);
		_this.hasValue = _this.hasValue.bind(_this);
		return _this;
	}

	_createClass(HiddenFileInput, [{
		key: 'clearValue',
		value: function clearValue() {
			this.target.value = '';
		}
	}, {
		key: 'clickDomNode',
		value: function clickDomNode() {
			this.target.click();
		}
	}, {
		key: 'hasValue',
		value: function hasValue() {
			return !!this.target.value;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    style = _props.style,
			    props = _objectWithoutProperties(_props, ['style']);

			var setRef = function setRef(n) {
				return _this2.target = n;
			};
			var styles = _extends({
				left: -9999,
				position: 'absolute'
			}, style);

			return _react2.default.createElement('input', _extends({}, props, {
				style: styles,
				ref: setRef,
				tabIndex: '-1',
				type: 'file'
			}));
		}
	}]);

	return HiddenFileInput;
}(_react.Component);

;

HiddenFileInput.propTypes = {
	onChange: _react.PropTypes.func.isRequired
};

module.exports = HiddenFileInput;

},{"react":undefined}],93:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// FIXME static octicon classes leaning on Elemental to avoid duplicate
// font and CSS; inflating the project size

var ICON_MAP = {
	loading: '',
	remove: 'mega-octicon octicon-trashcan',
	upload: 'mega-octicon octicon-cloud-upload'
};

function ImageThumbnail(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    component = _ref.component,
	    mask = _ref.mask,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'component', 'mask']);

	var maskUI = mask ? _react2.default.createElement(
		'div',
		{ className: (0, _noImportant.css)(classes.mask) + (' ' + ICON_MAP[mask]) },
		mask === 'loading' ? _react2.default.createElement(_elemental.Spinner, { color: 'inverted' }) : null
	) : null;

	// apply hover and focus styles only when using an anchor
	props.className = (0, _noImportant.css)(classes.base, component === 'a' ? classes.anchor : null, className);

	// append the mask UI to children
	props.children = [].concat(children, [maskUI]);

	return _react2.default.createElement(component, props);
};

ImageThumbnail.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	mask: _react.PropTypes.oneOf(['loading', 'remove', 'upload'])
};
ImageThumbnail.defaultProps = {
	component: 'span'
};

/* eslint quote-props: ["error", "as-needed"] */
var GUTTER_WIDTH = 4;
var hoverAndFocusStyles = {
	borderColor: _theme2.default.input.border.color.focus,
	outline: 'none'
};
var classes = _noImportant.StyleSheet.create({
	base: {
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		border: '1px solid ' + _theme2.default.input.border.color.default,
		display: 'inline-block',
		height: 'auto',
		lineHeight: '1',
		maxWidth: '100%',
		padding: GUTTER_WIDTH,
		position: 'relative'
	},
	anchor: {
		':hover': hoverAndFocusStyles,
		':focus': _extends({}, hoverAndFocusStyles, {
			boxShadow: _theme2.default.input.boxShadowFocus
		})
	},

	// mask
	mask: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		bottom: GUTTER_WIDTH,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		left: GUTTER_WIDTH,
		lineHeight: 90,
		overflow: 'hidden',
		position: 'absolute',
		right: GUTTER_WIDTH,
		textAlign: 'center',
		top: GUTTER_WIDTH
	}
});

module.exports = ImageThumbnail;

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":80,"aphrodite/no-important":undefined,"react":undefined}],94:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ItemsTableCell(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _classnames2.default)('ItemList__col', className);

	return _react2.default.createElement('td', props);
};

module.exports = ItemsTableCell;

},{"classnames":undefined,"react":undefined}],95:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ItemsTableValue(_ref) {
	var className = _ref.className,
	    component = _ref.component,
	    empty = _ref.empty,
	    exterior = _ref.exterior,
	    field = _ref.field,
	    href = _ref.href,
	    interior = _ref.interior,
	    padded = _ref.padded,
	    to = _ref.to,
	    truncate = _ref.truncate,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'empty', 'exterior', 'field', 'href', 'interior', 'padded', 'to', 'truncate']);

	// TODO remove in the next release
	if (href) {
		console.warn('ItemsTableValue: `href` will be deprecated in the next release, use `to`.');
	}
	var linkRef = to || href;
	var Component = linkRef ? _reactRouter.Link : component;

	props.className = (0, _classnames2.default)('ItemList__value', field ? 'ItemList__value--' + field : null, {
		'ItemList__link--empty': empty,
		'ItemList__link--exterior': linkRef && exterior,
		'ItemList__link--interior': linkRef && interior,
		'ItemList__link--padded': linkRef && padded,
		'ItemList__value--truncate': truncate
	}, className);
	props.to = linkRef;

	return _react2.default.createElement(Component, props);
};

ItemsTableValue.propTypes = {
	component: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func]),
	empty: _react.PropTypes.bool,
	exterior: _react.PropTypes.bool, // FIXME this should be "external" e.g. an external link
	field: _react.PropTypes.string,
	href: _react.PropTypes.string, // TODO remove in next release
	interior: _react.PropTypes.bool, // FIXME this should be "internal" e.g. an internal link
	padded: _react.PropTypes.bool,
	to: _react.PropTypes.string,
	truncate: _react.PropTypes.bool
};
ItemsTableValue.defaultProps = {
	component: 'div',
	truncate: true
};

module.exports = ItemsTableValue;

},{"classnames":undefined,"react":undefined,"react-router":undefined}],96:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGE_SIZE = 18;

var linkStyle = {
	marginRight: 8
};
var boxStyle = {
	borderRadius: 3,
	display: 'inline-block',
	height: IMAGE_SIZE,
	overflow: 'hidden',
	verticalAlign: 'middle',
	width: IMAGE_SIZE
};
var imageStyle = {
	display: 'block',
	height: IMAGE_SIZE,
	left: '50%',
	position: 'relative',

	WebkitTransform: 'translateX(-50%)',
	MozTransform: 'translateX(-50%)',
	msTransform: 'translateX(-50%)',
	transform: 'translateX(-50%)'
};
var textStyle = {
	color: '#888',
	display: 'inline-block',
	fontSize: '.8rem',
	marginLeft: 8,
	verticalAlign: 'middle'
};

var CloudinaryImageSummary = _react2.default.createClass({
	displayName: 'CloudinaryImageSummary',
	propTypes: {
		image: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.oneOf(['dimensions', 'publicId'])
	},
	renderLabel: function renderLabel() {
		if (!this.props.label) return;

		var _props = this.props,
		    label = _props.label,
		    image = _props.image;


		var text = void 0;
		if (label === 'dimensions') {
			text = image.width + ' \xD7 ' + image.height;
		} else {
			text = image.public_id + '.' + image.format;
		}

		return _react2.default.createElement(
			'span',
			{ style: textStyle },
			text
		);
	},
	renderImageThumbnail: function renderImageThumbnail() {
		if (!this.props.image) return;
		var url = this.props.image.url.replace(/image\/upload/, 'image/upload/c_thumb,g_face,h_' + IMAGE_SIZE + ',w_' + IMAGE_SIZE);
		return _react2.default.createElement('img', { src: url, style: imageStyle, className: 'img-load' });
	},
	render: function render() {
		return _react2.default.createElement(
			'span',
			{ style: linkStyle },
			_react2.default.createElement(
				'span',
				{ style: boxStyle },
				this.renderImageThumbnail()
			),
			this.renderLabel()
		);
	}
});

module.exports = CloudinaryImageSummary;

},{"react":undefined}],97:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdColumn = _react2.default.createClass({
	displayName: 'IdColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.id;
		if (!value) return null;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ padded: true, interior: true, title: value, to: Keystone.adminPath + '/' + this.props.list.path + '/' + value, field: this.props.col.type },
			value
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = IdColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],98:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidColumn = _react2.default.createClass({
	displayName: 'InvalidColumn',
	propTypes: {
		col: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			'(Invalid Type: ',
			this.props.col.type,
			')'
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = InvalidColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],99:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _evalDependsOn = require('../utils/evalDependsOn.js');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../admin/client/App/elemental');

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _CollapsedFieldLabel = require('../components/CollapsedFieldLabel');

var _CollapsedFieldLabel2 = _interopRequireDefault(_CollapsedFieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(arg) {
	return Object.prototype.toString.call(arg) === '[object Object]';
}

function validateSpec(spec) {
	if (!spec) spec = {};
	if (!isObject(spec.supports)) {
		spec.supports = {};
	}
	if (!spec.focusTargetRef) {
		spec.focusTargetRef = 'focusTarget';
	}
	return spec;
}

var Base = module.exports.Base = {
	getInitialState: function getInitialState() {
		return {};
	},
	getDefaultProps: function getDefaultProps() {
		return {
			adminPath: Keystone.adminPath,
			inputProps: {},
			labelProps: {},
			valueProps: {},
			size: 'full'
		};
	},
	getInputName: function getInputName(path) {
		// This correctly creates the path for field inputs, and supports the
		// inputNamePrefix prop that is required for nested fields to work
		return this.props.inputNamePrefix ? this.props.inputNamePrefix + '[' + path + ']' : path;
	},
	valueChanged: function valueChanged(event) {
		this.props.onChange({
			path: this.props.path,
			value: event.target.value
		});
	},
	shouldCollapse: function shouldCollapse() {
		return this.props.collapse && !this.props.value;
	},
	shouldRenderField: function shouldRenderField() {
		if (this.props.mode === 'create') return true;
		return !this.props.noedit;
	},
	focus: function focus() {
		if (!this.refs[this.spec.focusTargetRef]) return;
		(0, _reactDom.findDOMNode)(this.refs[this.spec.focusTargetRef]).focus();
	},
	renderNote: function renderNote() {
		if (!this.props.note) return null;

		return _react2.default.createElement(_elemental.FormNote, { html: this.props.note });
	},
	renderField: function renderField() {
		var _props = this.props,
		    autoFocus = _props.autoFocus,
		    value = _props.value,
		    inputProps = _props.inputProps;

		return _react2.default.createElement(_elemental.FormInput, _extends({}, inputProps, {
			autoFocus: autoFocus,
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			value: value
		}));
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.props.value
		);
	},
	renderUI: function renderUI() {
		var wrapperClassName = (0, _classnames2.default)('field-type-' + this.props.type, this.props.className, { 'field-monospace': this.props.monospace });
		return _react2.default.createElement(
			_elemental.FormField,
			{ htmlFor: this.props.path, label: this.props.label, className: wrapperClassName, cropLabel: true },
			_react2.default.createElement(
				'div',
				{ className: 'FormField__inner field-size-' + this.props.size },
				this.shouldRenderField() ? this.renderField() : this.renderValue()
			),
			this.renderNote()
		);
	}
};

var Mixins = module.exports.Mixins = {
	Collapse: {
		componentWillMount: function componentWillMount() {
			this.setState({
				isCollapsed: this.shouldCollapse()
			});
		},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			if (prevState.isCollapsed && !this.state.isCollapsed) {
				this.focus();
			}
		},
		uncollapse: function uncollapse() {
			this.setState({
				isCollapsed: false
			});
		},
		renderCollapse: function renderCollapse() {
			if (!this.shouldRenderField()) return null;
			return _react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(
					_CollapsedFieldLabel2.default,
					{ onClick: this.uncollapse },
					'+ Add ',
					this.props.label.toLowerCase()
				)
			);
		}
	}
};

module.exports.create = function (spec) {

	spec = validateSpec(spec);

	var field = {
		spec: spec,
		displayName: spec.displayName,
		mixins: [Mixins.Collapse],
		statics: {
			getDefaultValue: function getDefaultValue(field) {
				return field.defaultValue || '';
			}
		},
		render: function render() {
			if (!(0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
				return null;
			}
			if (this.state.isCollapsed) {
				return this.renderCollapse();
			}
			return this.renderUI();
		}
	};

	if (spec.statics) {
		_extends(field.statics, spec.statics);
	}

	var excludeBaseMethods = {};
	if (spec.mixins) {
		spec.mixins.forEach(function (mixin) {
			Object.keys(mixin).forEach(function (name) {
				if (Base[name]) {
					excludeBaseMethods[name] = true;
				}
			});
		});
	}

	_extends(field, (0, _blacklist2.default)(Base, excludeBaseMethods));
	_extends(field, (0, _blacklist2.default)(spec, 'mixins', 'statics'));

	if (Array.isArray(spec.mixins)) {
		field.mixins = field.mixins.concat(spec.mixins);
	}

	return _react2.default.createClass(field);
};

},{"../../admin/client/App/elemental":65,"../components/CollapsedFieldLabel":89,"../utils/evalDependsOn.js":142,"blacklist":undefined,"classnames":undefined,"react":undefined,"react-dom":undefined}],100:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanColumn = _react2.default.createClass({
	displayName: 'BooleanColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ truncate: false, field: this.props.col.type },
			_react2.default.createElement(_Checkbox2.default, { readonly: true, checked: this.props.data.fields[this.props.col.path] })
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = BooleanColumn;

},{"../../components/Checkbox":88,"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],101:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Checkbox = require('../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOOP = function NOOP() {};

module.exports = _Field2.default.create({
	displayName: 'BooleanField',
	statics: {
		type: 'Boolean'
	},
	propTypes: {
		indent: _react2.default.PropTypes.bool,
		label: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string.isRequired,
		value: _react2.default.PropTypes.bool
	},

	valueChanged: function valueChanged(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	renderFormInput: function renderFormInput() {
		if (!this.shouldRenderField()) return;

		return _react2.default.createElement('input', {
			name: this.getInputName(this.props.path),
			type: 'hidden',
			value: !!this.props.value
		});
	},
	renderUI: function renderUI() {
		var _props = this.props,
		    indent = _props.indent,
		    value = _props.value,
		    label = _props.label,
		    path = _props.path;


		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'boolean' },
			_react2.default.createElement(
				_elemental.FormField,
				{ offsetAbsentLabel: indent },
				_react2.default.createElement(
					'label',
					{ style: { height: '2.3em' } },
					this.renderFormInput(),
					_react2.default.createElement(_Checkbox2.default, {
						checked: value,
						onChange: this.shouldRenderField() && this.valueChanged || NOOP,
						readonly: !this.shouldRenderField()
					}),
					_react2.default.createElement(
						'span',
						{ style: { marginLeft: '.75em' } },
						label
					)
				),
				this.renderNote()
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/Checkbox":88,"../Field":99,"react":undefined}],102:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALUE_OPTIONS = [{ label: 'Is Checked', value: true }, { label: 'Is NOT Checked', value: false }];

function getDefaultValue() {
	return {
		value: true
	};
}

var BooleanFilter = _react2.default.createClass({
	displayName: 'BooleanFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			value: _react2.default.PropTypes.bool
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	updateValue: function updateValue(value) {
		this.props.onChange({ value: value });
	},
	render: function render() {
		return _react2.default.createElement(_elemental.SegmentedControl, { equalWidthSegments: true, options: VALUE_OPTIONS, value: this.props.filter.value, onChange: this.updateValue });
	}
});

module.exports = BooleanFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],103:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CloudinaryImageSummary = require('../../components/columns/CloudinaryImageSummary');

var _CloudinaryImageSummary2 = _interopRequireDefault(_CloudinaryImageSummary);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CloudinaryImageColumn = _react2.default.createClass({
	displayName: 'CloudinaryImageColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !Object.keys(value).length) return;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			_react2.default.createElement(_CloudinaryImageSummary2.default, { label: 'dimensions', image: value })
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = CloudinaryImageColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"../../components/columns/CloudinaryImageSummary":96,"react":undefined}],104:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _cloudinaryResize = require('../../../admin/client/utils/cloudinaryResize');

var _cloudinaryResize2 = _interopRequireDefault(_cloudinaryResize);

var _elemental = require('../../../admin/client/App/elemental');

var _ImageThumbnail = require('../../components/ImageThumbnail');

var _ImageThumbnail2 = _interopRequireDefault(_ImageThumbnail);

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

var _HiddenFileInput = require('../../components/HiddenFileInput');

var _HiddenFileInput2 = _interopRequireDefault(_HiddenFileInput);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
TODO: CloudinaryImageType actally supports 'remove' and 'reset' actions, but
this field will only submit `""` when 'remove' is clicked. @jossmac we need to
work out whether we're going to support deleting through the UI.
*/

var SUPPORTED_TYPES = ['image/*', 'application/pdf', 'application/postscript'];
var SUPPORTED_REGEX = new RegExp(/^image\/|application\/pdf|application\/postscript/g);

var uploadInc = 1000;

var buildInitialState = function buildInitialState(props) {
	return {
		removeExisting: false,
		uploadFieldPath: 'CloudinaryImage-' + props.path + '-' + ++uploadInc,
		userSelectedFile: null
	};
};

module.exports = _Field2.default.create({
	propTypes: {
		collapse: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		note: _react.PropTypes.string,
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.shape({
			format: _react.PropTypes.string,
			height: _react.PropTypes.number,
			public_id: _react.PropTypes.string,
			resource_type: _react.PropTypes.string,
			secure_url: _react.PropTypes.string,
			signature: _react.PropTypes.string,
			url: _react.PropTypes.string,
			version: _react.PropTypes.number,
			width: _react.PropTypes.number
		})
	},
	displayName: 'CloudinaryImageField',
	statics: {
		type: 'CloudinaryImage',
		getDefaultValue: function getDefaultValue() {
			return {};
		}
	},
	getInitialState: function getInitialState() {
		return buildInitialState(this.props);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		// console.log('CloudinaryImageField nextProps:', nextProps);
	},
	componentWillUpdate: function componentWillUpdate(nextProps) {
		// Reset the action state when the value changes
		// TODO: We should add a check for a new item ID in the store
		if (this.props.value.public_id !== nextProps.value.public_id) {
			this.setState({
				removeExisting: false,
				userSelectedFile: null
			});
		}
	},


	// ==============================
	// HELPERS
	// ==============================

	hasLocal: function hasLocal() {
		return !!this.state.userSelectedFile;
	},
	hasExisting: function hasExisting() {
		return !!(this.props.value && this.props.value.url);
	},
	hasImage: function hasImage() {
		return this.hasExisting() || this.hasLocal();
	},
	getFilename: function getFilename() {
		var _props$value = this.props.value,
		    format = _props$value.format,
		    height = _props$value.height,
		    public_id = _props$value.public_id,
		    width = _props$value.width;


		return this.state.userSelectedFile ? this.state.userSelectedFile.name : public_id + '.' + format + ' (' + width + '\xD7' + height + ')';
	},
	getImageSource: function getImageSource() {
		var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

		// TODO: This lets really wide images break the layout
		var src = void 0;
		if (this.hasLocal()) {
			src = this.state.dataUri;
		} else if (this.hasExisting()) {
			src = (0, _cloudinaryResize2.default)(this.props.value.public_id, {
				crop: 'fit',
				height: height,
				format: 'jpg'
			});
		}

		return src;
	},


	// ==============================
	// METHODS
	// ==============================

	triggerFileBrowser: function triggerFileBrowser() {
		this.refs.fileInput.clickDomNode();
	},
	handleFileChange: function handleFileChange(event) {
		var userSelectedFile = event.target.files[0];

		this.setState({ userSelectedFile: userSelectedFile });
	},


	// Toggle the lightbox
	openLightbox: function openLightbox(event) {
		event.preventDefault();
		this.setState({
			lightboxIsVisible: true
		});
	},
	closeLightbox: function closeLightbox() {
		this.setState({
			lightboxIsVisible: false
		});
	},


	// Handle image selection in file browser
	handleImageChange: function handleImageChange(e) {
		var _this = this;

		if (!window.FileReader) {
			return alert('File reader not supported by browser.');
		}

		var reader = new FileReader();
		var file = e.target.files[0];
		if (!file) return;

		if (!file.type.match(SUPPORTED_REGEX)) {
			return alert('Unsupported file type. Supported formats are: GIF, PNG, JPG, BMP, ICO, PDF, TIFF, EPS, PSD, SVG');
		}

		reader.readAsDataURL(file);

		reader.onloadstart = function () {
			_this.setState({
				loading: true
			});
		};
		reader.onloadend = function (upload) {
			_this.setState({
				dataUri: upload.target.result,
				loading: false,
				userSelectedFile: file
			});
			_this.props.onChange({ file: file });
		};
	},


	// If we have a local file added then remove it and reset the file field.
	handleRemove: function handleRemove(e) {
		var state = {};

		if (this.state.userSelectedFile) {
			state.userSelectedFile = null;
		} else if (this.hasExisting()) {
			state.removeExisting = true;
		}

		this.setState(state);
	},
	undoRemove: function undoRemove() {
		this.setState(buildInitialState(this.props));
	},


	// ==============================
	// RENDERERS
	// ==============================

	renderLightbox: function renderLightbox() {
		var value = this.props.value;


		if (!value || !value.public_id) return;

		return _react2.default.createElement(_reactImages2.default, {
			currentImage: 0,
			images: [{ src: this.getImageSource(600) }],
			isOpen: this.state.lightboxIsVisible,
			onClose: this.closeLightbox,
			showImageCount: false
		});
	},
	renderImagePreview: function renderImagePreview() {
		var value = this.props.value;

		// render icon feedback for intent

		var mask = void 0;
		if (this.hasLocal()) mask = 'upload';else if (this.state.removeExisting) mask = 'remove';else if (this.state.loading) mask = 'loading';

		var shouldOpenLightbox = value.format !== 'pdf';

		return _react2.default.createElement(
			_ImageThumbnail2.default,
			{
				component: 'a',
				href: this.getImageSource(600),
				onClick: shouldOpenLightbox && this.openLightbox,
				mask: mask,
				target: '__blank',
				style: { float: 'left', marginRight: '1em' }
			},
			_react2.default.createElement('img', { src: this.getImageSource(), style: { height: 90 } })
		);
	},
	renderFileNameAndOptionalMessage: function renderFileNameAndOptionalMessage() {
		var showChangeMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		return _react2.default.createElement(
			'div',
			null,
			this.hasImage() ? _react2.default.createElement(
				_FileChangeMessage2.default,
				null,
				this.getFilename()
			) : null,
			showChangeMessage && this.renderChangeMessage()
		);
	},
	renderChangeMessage: function renderChangeMessage() {
		if (this.state.userSelectedFile) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'success' },
				'Save to Upload'
			);
		} else if (this.state.removeExisting) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'danger' },
				'Save to Remove'
			);
		} else {
			return null;
		}
	},


	// Output [cancel/remove/undo] button
	renderClearButton: function renderClearButton() {
		var clearText = this.hasLocal() ? 'Cancel' : 'Remove Image';

		return this.state.removeExisting ? _react2.default.createElement(
			_elemental.Button,
			{ variant: 'link', onClick: this.undoRemove },
			'Undo Remove'
		) : _react2.default.createElement(
			_elemental.Button,
			{ variant: 'link', color: 'cancel', onClick: this.handleRemove },
			clearText
		);
	},
	renderImageToolbar: function renderImageToolbar() {
		return _react2.default.createElement(
			'div',
			{ key: this.props.path + '_toolbar', className: 'image-toolbar' },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.triggerFileBrowser },
				this.hasImage() ? 'Change' : 'Upload',
				' Image'
			),
			this.hasImage() ? this.renderClearButton() : null
		);
	},
	renderFileInput: function renderFileInput() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement(_HiddenFileInput2.default, {
			accept: SUPPORTED_TYPES.join(),
			ref: 'fileInput',
			name: this.state.uploadFieldPath,
			onChange: this.handleImageChange
		});
	},
	renderActionInput: function renderActionInput() {
		if (!this.shouldRenderField()) return null;

		if (this.state.userSelectedFile || this.state.removeExisting) {
			var value = this.state.userSelectedFile ? 'upload:' + this.state.uploadFieldPath : '';
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				type: 'hidden',
				value: value
			});
		} else {
			return null;
		}
	},
	renderUI: function renderUI() {
		var _props = this.props,
		    label = _props.label,
		    note = _props.note,
		    path = _props.path;


		var imageContainer = _react2.default.createElement(
			'div',
			{ style: this.hasImage() ? { marginBottom: '1em' } : null },
			this.hasImage() && this.renderImagePreview(),
			this.hasImage() && this.renderFileNameAndOptionalMessage(this.shouldRenderField())
		);

		var toolbar = this.shouldRenderField() ? this.renderImageToolbar() : _react2.default.createElement(_elemental.FormInput, { noedit: true });

		return _react2.default.createElement(
			_elemental.FormField,
			{ label: label, className: 'field-type-cloudinaryimage', htmlFor: path },
			imageContainer,
			toolbar,
			!!note && _react2.default.createElement(_elemental.FormNote, { note: note }),
			this.renderLightbox(),
			this.renderFileInput(),
			this.renderActionInput()
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../../admin/client/utils/cloudinaryResize":82,"../../components/FileChangeMessage":91,"../../components/HiddenFileInput":92,"../../components/ImageThumbnail":93,"../Field":99,"react":undefined,"react-images":undefined}],105:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = [{ label: 'Is Set', value: true }, { label: 'Is NOT Set', value: false }];

function getDefaultValue() {
	return {
		exists: true
	};
}

var CloudinaryImageFilter = _react2.default.createClass({
	displayName: 'CloudinaryImageFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			exists: _react2.default.PropTypes.oneOf(OPTIONS.map(function (i) {
				return i.value;
			}))
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	toggleExists: function toggleExists(value) {
		this.props.onChange({ exists: value });
	},
	render: function render() {
		var filter = this.props.filter;


		return _react2.default.createElement(_elemental.SegmentedControl, {
			equalWidthSegments: true,
			onChange: this.toggleExists,
			options: OPTIONS,
			value: filter.exists
		});
	}
});

module.exports = CloudinaryImageFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],106:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CloudinaryImageSummary = require('../../components/columns/CloudinaryImageSummary');

var _CloudinaryImageSummary2 = _interopRequireDefault(_CloudinaryImageSummary);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moreIndicatorStyle = {
	color: '#888',
	fontSize: '.8rem'
};

var CloudinaryImagesColumn = _react2.default.createClass({
	displayName: 'CloudinaryImagesColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderMany: function renderMany(value) {
		if (!value || !value.length) return;
		var items = [];
		for (var i = 0; i < 3; i++) {
			if (!value[i]) break;
			items.push(_react2.default.createElement(_CloudinaryImageSummary2.default, { key: 'image' + i, image: value[i] }));
		}
		if (value.length > 3) {
			items.push(_react2.default.createElement(
				'span',
				{ key: 'more', style: moreIndicatorStyle },
				'[...',
				value.length - 3,
				' more]'
			));
		}
		return items;
	},
	renderValue: function renderValue(value) {
		if (!value || !Object.keys(value).length) return;

		return _react2.default.createElement(_CloudinaryImageSummary2.default, { image: value });
	},
	render: function render() {
		var value = this.props.data.fields[this.props.col.path];
		var many = value.length > 1;

		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type },
				many ? this.renderMany(value) : this.renderValue(value[0])
			)
		);
	}
});

module.exports = CloudinaryImagesColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"../../components/columns/CloudinaryImageSummary":96,"react":undefined}],107:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  TODO: This component manages thumbnails using some wacky internal state.
                                                                                                                                                                                                                                                                  It works, but would really benefit from a cleanup/rewrite. It may not behave
                                                                                                                                                                                                                                                                  as expected in different situations (i.e. does not report updated value
                                                                                                                                                                                                                                                                  to props.onChange correctly as the user interacts with it)
                                                                                                                                                                                                                                                                  */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _cloudinaryResize = require('../../../admin/client/utils/cloudinaryResize');

var _cloudinaryResize2 = _interopRequireDefault(_cloudinaryResize);

var _CloudinaryImagesThumbnail = require('./CloudinaryImagesThumbnail');

var _CloudinaryImagesThumbnail2 = _interopRequireDefault(_CloudinaryImagesThumbnail);

var _HiddenFileInput = require('../../components/HiddenFileInput');

var _HiddenFileInput2 = _interopRequireDefault(_HiddenFileInput);

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SUPPORTED_TYPES = ['image/*', 'application/pdf', 'application/postscript'];
var SUPPORTED_REGEX = new RegExp(/^image\/|application\/pdf|application\/postscript/g);
var RESIZE_DEFAULTS = {
	crop: 'fit',
	format: 'jpg'
};

var uploadInc = 1000;

module.exports = _Field2.default.create({
	displayName: 'CloudinaryImagesField',
	statics: {
		type: 'CloudinaryImages',
		getDefaultValue: function getDefaultValue() {
			return [];
		}
	},
	getInitialState: function getInitialState() {
		return this.buildInitialState(this.props);
	},
	componentWillUpdate: function componentWillUpdate(nextProps) {
		// Reset the thumbnails and upload ID when the item value changes
		// TODO: We should add a check for a new item ID in the store
		var value = _lodash2.default.map(this.props.value, 'public_id').join();
		var nextValue = _lodash2.default.map(nextProps.value, 'public_id').join();
		if (value !== nextValue) {
			this.setState(this.buildInitialState(nextProps));
		}
	},
	buildInitialState: function buildInitialState(props) {
		var _this = this;

		var uploadFieldPath = 'CloudinaryImages-' + props.path + '-' + ++uploadInc;
		var thumbnails = props.value ? props.value.map(function (img, index) {
			return _this.getThumbnail({
				value: img,
				imageSourceSmall: (0, _cloudinaryResize2.default)(img.public_id, _extends({}, RESIZE_DEFAULTS, {
					height: 90
				})),
				imageSourceLarge: (0, _cloudinaryResize2.default)(img.public_id, _extends({}, RESIZE_DEFAULTS, {
					height: 600,
					width: 900
				}))
			}, index);
		}) : [];
		return { thumbnails: thumbnails, uploadFieldPath: uploadFieldPath };
	},
	getThumbnail: function getThumbnail(props, index) {
		var _this2 = this;

		return _react2.default.createElement(_CloudinaryImagesThumbnail2.default, _extends({
			key: 'thumbnail-' + index,
			inputName: this.getInputName(this.props.path),
			openLightbox: function openLightbox(e) {
				return _this2.openLightbox(e, index);
			},
			shouldRenderActionButton: this.shouldRenderField(),
			toggleDelete: this.removeImage.bind(this, index)
		}, props));
	},


	// ==============================
	// HELPERS
	// ==============================

	triggerFileBrowser: function triggerFileBrowser() {
		this.refs.fileInput.clickDomNode();
	},
	hasFiles: function hasFiles() {
		return this.refs.fileInput && this.refs.fileInput.hasValue();
	},
	openLightbox: function openLightbox(event, index) {
		event.preventDefault();
		this.setState({
			lightboxIsVisible: true,
			lightboxImageIndex: index
		});
	},
	closeLightbox: function closeLightbox() {
		this.setState({
			lightboxIsVisible: false,
			lightboxImageIndex: null
		});
	},
	lightboxPrevious: function lightboxPrevious() {
		this.setState({
			lightboxImageIndex: this.state.lightboxImageIndex - 1
		});
	},
	lightboxNext: function lightboxNext() {
		this.setState({
			lightboxImageIndex: this.state.lightboxImageIndex + 1
		});
	},


	// ==============================
	// METHODS
	// ==============================

	removeImage: function removeImage(index) {
		var newThumbnails = [].concat(_toConsumableArray(this.state.thumbnails));
		var target = newThumbnails[index];

		// Use splice + clone to toggle the isDeleted prop
		newThumbnails.splice(index, 1, (0, _react.cloneElement)(target, {
			isDeleted: !target.props.isDeleted
		}));

		this.setState({ thumbnails: newThumbnails });
	},
	getCount: function getCount(key) {
		var count = 0;

		this.state.thumbnails.forEach(function (thumb) {
			if (thumb && thumb.props[key]) count++;
		});

		return count;
	},
	clearFiles: function clearFiles() {
		this.refs.fileInput.clearValue();

		this.setState({
			thumbnails: this.state.thumbnails.filter(function (thumb) {
				return !thumb.props.isQueued;
			})
		});
	},
	uploadFile: function uploadFile(event) {
		var _this3 = this;

		if (!window.FileReader) {
			return alert('File reader not supported by browser.');
		}

		// FileList not a real Array; process it into one and check the types
		var files = [];
		for (var i = 0; i < event.target.files.length; i++) {
			var f = event.target.files[i];
			if (!f.type.match(SUPPORTED_REGEX)) {
				return alert('Unsupported file type. Supported formats are: GIF, PNG, JPG, BMP, ICO, PDF, TIFF, EPS, PSD, SVG');
			}
			files.push(f);
		}

		var index = this.state.thumbnails.length;
		_async2.default.mapSeries(files, function (file, callback) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
				callback(null, _this3.getThumbnail({
					isQueued: true,
					imageSourceSmall: e.target.result
				}, index++));
			};
		}, function (err, thumbnails) {
			_this3.setState({
				thumbnails: [].concat(_toConsumableArray(_this3.state.thumbnails), _toConsumableArray(thumbnails))
			});
		});
	},


	// ==============================
	// RENDERERS
	// ==============================

	renderFileInput: function renderFileInput() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement(_HiddenFileInput2.default, {
			accept: SUPPORTED_TYPES.join(),
			key: this.state.uploadFieldPath,
			multiple: true,
			name: this.state.uploadFieldPath,
			onChange: this.uploadFile,
			ref: 'fileInput'
		});
	},
	renderValueInput: function renderValueInput() {
		if (!this.shouldRenderField()) return null;

		// This renders an input with either the upload field reference, or an
		// empty value to reset the field if all images have been removed
		if (this.hasFiles()) {
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				value: 'upload:' + this.state.uploadFieldPath,
				type: 'hidden'
			});
		} else if (this.getCount('isDeleted') === this.props.value.length) {
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				value: '',
				type: 'hidden'
			});
		}
	},
	renderLightbox: function renderLightbox() {
		var value = this.props.value;

		if (!value || !value.length) return;

		var images = value.map(function (image) {
			return {
				src: (0, _cloudinaryResize2.default)(image.public_id, _extends({}, RESIZE_DEFAULTS, {
					height: 600,
					width: 900
				}))
			};
		});

		return _react2.default.createElement(_reactImages2.default, {
			images: images,
			currentImage: this.state.lightboxImageIndex,
			isOpen: this.state.lightboxIsVisible,
			onClickPrev: this.lightboxPrevious,
			onClickNext: this.lightboxNext,
			onClose: this.closeLightbox
		});
	},
	renderToolbar: function renderToolbar() {
		if (!this.shouldRenderField()) return null;

		var uploadCount = this.getCount('isQueued');
		var deleteCount = this.getCount('isDeleted');

		// provide a gutter for the change message
		// only required when no cancel button, which has equiv. padding
		var uploadButtonStyles = !this.hasFiles() ? { marginRight: 10 } : {};

		// prepare the change message
		var changeMessage = uploadCount || deleteCount ? _react2.default.createElement(
			_FileChangeMessage2.default,
			null,
			uploadCount && deleteCount ? uploadCount + ' added and ' + deleteCount + ' removed' : null,
			uploadCount && !deleteCount ? uploadCount + ' image added' : null,
			!uploadCount && deleteCount ? deleteCount + ' image removed' : null
		) : null;

		// prepare the save message
		var saveMessage = uploadCount || deleteCount ? _react2.default.createElement(
			_FileChangeMessage2.default,
			{ color: !deleteCount ? 'success' : 'danger' },
			'Save to ',
			!deleteCount ? 'Upload' : 'Confirm'
		) : null;

		// clear floating images above
		var toolbarStyles = {
			clear: 'both'
		};

		return _react2.default.createElement(
			'div',
			{ style: toolbarStyles },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.triggerFileBrowser, style: uploadButtonStyles, 'data-e2e-upload-button': 'true' },
				'Upload Images'
			),
			this.hasFiles() && _react2.default.createElement(
				_elemental.Button,
				{ variant: 'link', color: 'cancel', onClick: this.clearFiles },
				'Clear selection'
			),
			changeMessage,
			saveMessage
		);
	},
	renderUI: function renderUI() {
		var _props = this.props,
		    label = _props.label,
		    note = _props.note,
		    path = _props.path;
		var thumbnails = this.state.thumbnails;


		return _react2.default.createElement(
			_elemental.FormField,
			{ label: label, className: 'field-type-cloudinaryimages', htmlFor: path },
			_react2.default.createElement(
				'div',
				null,
				thumbnails
			),
			this.renderValueInput(),
			this.renderFileInput(),
			this.renderToolbar(),
			!!note && _react2.default.createElement(_elemental.FormNote, { note: note }),
			this.renderLightbox()
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../../admin/client/utils/cloudinaryResize":82,"../../components/FileChangeMessage":91,"../../components/HiddenFileInput":92,"../Field":99,"./CloudinaryImagesThumbnail":109,"async":undefined,"lodash":undefined,"react":undefined,"react-images":undefined}],108:[function(require,module,exports){
'use strict';

module.exports = require('../cloudinaryimage/CloudinaryImageFilter');

},{"../cloudinaryimage/CloudinaryImageFilter":105}],109:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _ImageThumbnail = require('../../components/ImageThumbnail');

var _ImageThumbnail2 = _interopRequireDefault(_ImageThumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function CloudinaryImagesThumbnail(_ref) {
	var isDeleted = _ref.isDeleted,
	    imageSourceLarge = _ref.imageSourceLarge,
	    imageSourceSmall = _ref.imageSourceSmall,
	    inputName = _ref.inputName,
	    isQueued = _ref.isQueued,
	    openLightbox = _ref.openLightbox,
	    shouldRenderActionButton = _ref.shouldRenderActionButton,
	    toggleDelete = _ref.toggleDelete,
	    value = _ref.value,
	    props = _objectWithoutProperties(_ref, ['isDeleted', 'imageSourceLarge', 'imageSourceSmall', 'inputName', 'isQueued', 'openLightbox', 'shouldRenderActionButton', 'toggleDelete', 'value']);

	// render icon feedback for intent
	var mask = void 0;
	if (isQueued) mask = 'upload';else if (isDeleted) mask = 'remove';

	// action button
	var actionButton = shouldRenderActionButton && !isQueued ? _react2.default.createElement(
		_elemental.Button,
		{ variant: 'link', color: isDeleted ? 'default' : 'cancel', block: true, onClick: toggleDelete },
		isDeleted ? 'Undo' : 'Remove'
	) : null;

	var input = !isQueued && !isDeleted && value ? _react2.default.createElement('input', { type: 'hidden', name: inputName, value: JSON.stringify(value) }) : null;

	// provide gutter for the images
	var imageStyles = {
		float: 'left',
		marginBottom: 10,
		marginRight: 10
	};

	return _react2.default.createElement(
		'div',
		{ style: imageStyles },
		_react2.default.createElement(
			_ImageThumbnail2.default,
			{
				component: imageSourceLarge ? 'a' : 'span',
				href: !!imageSourceLarge && imageSourceLarge,
				onClick: !!imageSourceLarge && openLightbox,
				mask: mask,
				target: !!imageSourceLarge && '__blank'
			},
			_react2.default.createElement('img', { src: imageSourceSmall, style: { height: 90 } })
		),
		actionButton,
		input
	);
};

CloudinaryImagesThumbnail.propTypes = {
	imageSourceLarge: _react.PropTypes.string,
	imageSourceSmall: _react.PropTypes.string.isRequired,
	isDeleted: _react.PropTypes.bool,
	isQueued: _react.PropTypes.bool,
	openLightbox: _react.PropTypes.func.isRequired,
	shouldRenderActionButton: _react.PropTypes.bool,
	toggleDelete: _react.PropTypes.func.isRequired
};

module.exports = CloudinaryImagesThumbnail;

},{"../../../admin/client/App/elemental":65,"../../components/ImageThumbnail":93,"react":undefined}],110:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateColumn = _react2.default.createClass({
	displayName: 'DateColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return null;

		var format = this.props.col.type === 'datetime' ? 'MMMM Do YYYY, h:mm:ss a' : 'MMMM Do YYYY';
		return (0, _moment2.default)(value).format(format);
	},
	render: function render() {
		var value = this.getValue();
		var empty = !value && this.props.linkTo ? true : false;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type, to: this.props.linkTo, empty: empty },
				value
			)
		);
	}
});

module.exports = DateColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"moment":undefined,"react":undefined}],111:[function(require,module,exports){
'use strict';

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
TODO: Implement yearRange Prop, or deprecate for max / min values (better)
*/

var DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD';
var DEFAULT_FORMAT_STRING = 'Do MMM YYYY';

module.exports = _Field2.default.create({
	displayName: 'DateField',
	statics: {
		type: 'Date'
	},
	propTypes: {
		formatString: _react2.default.PropTypes.string,
		inputFormat: _react2.default.PropTypes.string,
		label: _react2.default.PropTypes.string,
		note: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			formatString: DEFAULT_FORMAT_STRING,
			inputFormat: DEFAULT_INPUT_FORMAT
		};
	},
	valueChanged: function valueChanged(_ref) {
		var value = _ref.value;

		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	moment: function moment(value) {
		var m = (0, _moment3.default)(value);
		if (this.props.isUTC) m.utc();
		return m;
	},
	isValid: function isValid(value) {
		return this.moment(value, this.inputFormat).isValid();
	},
	format: function format(value) {
		return value ? this.moment(value).format(this.props.formatString) : '';
	},
	setToday: function setToday() {
		this.valueChanged({
			value: this.moment(new Date()).format(this.props.inputFormat)
		});
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.format(this.props.value)
		);
	},
	renderField: function renderField() {
		var value = this.moment(this.props.value);
		value = this.props.value && value.isValid() ? value.format(this.props.inputFormat) : this.props.value;
		return _react2.default.createElement(
			_elemental.InlineGroup,
			null,
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_DateInput2.default, {
					format: this.props.inputFormat,
					name: this.getInputName(this.props.path),
					onChange: this.valueChanged,
					ref: 'dateInput',
					value: value
				})
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.setToday },
					'Today'
				)
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":90,"../Field":99,"moment":undefined,"react":undefined}],112:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

var MODE_OPTIONS = [{ label: 'On', value: 'on' }, { label: 'After', value: 'after' }, { label: 'Before', value: 'before' }, { label: 'Between', value: 'between' }];

var DayPickerIndicator = function DayPickerIndicator(_ref) {
	var activeInputField = _ref.activeInputField;

	var style = activeInputField === 'before' ? { left: '11rem' } : null;

	return _react2.default.createElement(
		'span',
		{ className: 'DayPicker-Indicator', style: style },
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__border' }),
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__bg' })
	);
};

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		inverted: INVERTED_OPTIONS[0].value,
		value: (0, _moment2.default)(0, 'HH').format(),
		before: (0, _moment2.default)(0, 'HH').format(),
		after: (0, _moment2.default)(0, 'HH').format()
	};
}

var DateFilter = _react2.default.createClass({
	displayName: 'DateFilter',
	propTypes: {
		filter: _react.PropTypes.shape({
			mode: _react.PropTypes.oneOf(MODE_OPTIONS.map(function (i) {
				return i.value;
			})),
			inverted: _react.PropTypes.boolean
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			format: 'DD-MM-YYYY',
			filter: getDefaultValue(),
			value: (0, _moment2.default)().startOf('day').toDate()
		};
	},
	getInitialState: function getInitialState() {
		return {
			activeInputField: 'after',
			month: new Date() // The month to display in the calendar
		};
	},
	componentDidMount: function componentDidMount() {
		this.__isMounted = true;
	},
	componentWillUnmount: function componentWillUnmount() {
		this.__isMounted = false;
	},


	// ==============================
	// METHODS
	// ==============================

	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	toggleInverted: function toggleInverted(value) {
		this.updateFilter({ inverted: value });
		this.setFocus(this.props.filter.mode);
	},
	selectMode: function selectMode(e) {
		var mode = e.target.value;
		this.updateFilter({ mode: mode });
		this.setFocus(mode);
	},
	setFocus: function setFocus(mode) {
		var _this = this;

		// give the UI a moment to render
		if (mode === 'between') {
			setTimeout(function () {
				(0, _reactDom.findDOMNode)(_this.refs[_this.state.activeInputField]).focus();
			}, 50);
		} else {
			setTimeout(function () {
				_this.refs.input.focus();
			}, 50);
		}
	},
	handleInputChange: function handleInputChange(e) {
		// TODO @jedwatson
		// Entering virtually any value will return an "Invalid date", so I'm
		// temporarily disabling user entry. This entire component needs review.

		// const { value } = e.target;
		// let { month } = this.state;
		// // Change the current month only if the value entered by the user is a valid
		// // date, according to the `L` format
		// if (moment(value, 'L', true).isValid()) {
		// 	month = moment(value, 'L').toDate();
		// }
		// this.updateFilter({ value: value });
		// this.setState({ month }, this.showCurrentDate);
	},
	setActiveField: function setActiveField(field) {
		this.setState({
			activeInputField: field
		});
	},
	switchBetweenActiveInputFields: function switchBetweenActiveInputFields(e, day, modifiers) {
		var _this2 = this;

		if (modifiers && modifiers.disabled) return;

		var activeInputField = this.state.activeInputField;

		var send = {};
		var newActiveField = activeInputField === 'before' ? 'after' : 'before';
		send[activeInputField] = day;
		this.updateFilter(send);
		this.setState({ activeInputField: newActiveField }, function () {
			(0, _reactDom.findDOMNode)(_this2.refs[newActiveField]).focus();
		});
	},
	selectDay: function selectDay(e, day, modifiers) {
		if (modifiers && modifiers.disabled) return;
		this.updateFilter({ value: day });
	},
	showCurrentDate: function showCurrentDate() {
		var _this3 = this;

		// give the UI a moment to render
		setTimeout(function () {
			_this3.refs.daypicker.showMonth(_this3.state.month);
		}, 50);
	},


	// ==============================
	// RENDERERS
	// ==============================

	renderToggle: function renderToggle() {
		var filter = this.props.filter;

		return _react2.default.createElement(
			'div',
			{ style: { marginBottom: '1em' } },
			_react2.default.createElement(_elemental.SegmentedControl, {
				equalWidthSegments: true,
				onChange: this.toggleInverted,
				options: INVERTED_OPTIONS,
				value: filter.inverted
			})
		);
	},
	renderControls: function renderControls() {
		var _this4 = this;

		var controls = void 0;
		var activeInputField = this.state.activeInputField;
		var _props = this.props,
		    field = _props.field,
		    filter = _props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		var placeholder = field.label + ' is ' + mode.label.toLowerCase() + '...';

		// DayPicker Modifiers - Selected Day
		var modifiers = filter.mode === 'between' ? {
			selected: function selected(day) {
				return (0, _moment2.default)(filter[activeInputField]).isSame(day);
			}
		} : {
			selected: function selected(day) {
				return (0, _moment2.default)(filter.value).isSame(day);
			}
		};

		if (mode.value === 'between') {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(
						_elemental.Grid.Row,
						{ xsmall: 'one-half', gutter: 10 },
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, {
								autoFocus: true,
								ref: 'after',
								placeholder: 'From',
								onChange: this.handleInputChange,
								onFocus: function onFocus() {
									return _this4.setActiveField('after');
								},
								value: (0, _moment2.default)(filter.after).format(this.props.format)
							})
						),
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, {
								ref: 'before',
								placeholder: 'To',
								onChange: this.handleInputChange,
								onFocus: function onFocus() {
									return _this4.setActiveField('before');
								},
								value: (0, _moment2.default)(filter.before).format(this.props.format)
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.switchBetweenActiveInputFields
					}),
					_react2.default.createElement(DayPickerIndicator, { activeInputField: activeInputField })
				)
			);
		} else {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(_elemental.FormInput, {
						autoFocus: true,
						ref: 'input',
						placeholder: placeholder,
						value: (0, _moment2.default)(filter.value).format(this.props.format),
						onChange: this.handleInputChange,
						onFocus: this.showCurrentDate
					})
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						ref: 'daypicker',
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.selectDay
					}),
					_react2.default.createElement(DayPickerIndicator, null)
				)
			);
		}

		return controls;
	},
	render: function render() {
		var filter = this.props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		return _react2.default.createElement(
			'div',
			null,
			this.renderToggle(),
			_react2.default.createElement(
				'div',
				{ style: { marginBottom: '1em' } },
				_react2.default.createElement(_elemental.FormSelect, {
					options: MODE_OPTIONS,
					onChange: this.selectMode,
					value: mode.value
				})
			),
			this.renderControls()
		);
	}
});

module.exports = DateFilter;

},{"../../../admin/client/App/elemental":65,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],113:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateColumn');

},{"../date/DateColumn":110}],114:[function(require,module,exports){
'use strict';

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'DatetimeField',
	statics: {
		type: 'Datetime'
	},

	focusTargetRef: 'dateInput',

	// default input formats
	dateInputFormat: 'YYYY-MM-DD',
	timeInputFormat: 'h:mm:ss a',
	tzOffsetInputFormat: 'Z',

	// parse formats (duplicated from lib/fieldTypes/datetime.js)
	parseFormats: ['YYYY-MM-DD', 'YYYY-MM-DD h:m:s a', 'YYYY-MM-DD h:m a', 'YYYY-MM-DD H:m:s', 'YYYY-MM-DD H:m'],

	getInitialState: function getInitialState() {
		return {
			dateValue: this.props.value && this.moment(this.props.value).format(this.dateInputFormat),
			timeValue: this.props.value && this.moment(this.props.value).format(this.timeInputFormat),
			tzOffsetValue: this.props.value ? this.moment(this.props.value).format(this.tzOffsetInputFormat) : this.moment().format(this.tzOffsetInputFormat)
		};
	},
	getDefaultProps: function getDefaultProps() {
		return {
			formatString: 'Do MMM YYYY, h:mm:ss a'
		};
	},
	moment: function moment() {
		if (this.props.isUTC) return _moment3.default.utc.apply(_moment3.default, arguments);else return _moment3.default.apply(undefined, arguments);
	},


	// TODO: Move isValid() so we can share with server-side code
	isValid: function isValid(value) {
		return this.moment(value, this.parseFormats).isValid();
	},


	// TODO: Move format() so we can share with server-side code
	format: function format(value, _format) {
		_format = _format || this.dateInputFormat + ' ' + this.timeInputFormat;
		return value ? this.moment(value).format(_format) : '';
	},
	handleChange: function handleChange(dateValue, timeValue, tzOffsetValue) {
		var value = dateValue + ' ' + timeValue;
		var datetimeFormat = this.dateInputFormat + ' ' + this.timeInputFormat;

		// if the change included a timezone offset, include that in the calculation (so NOW works correctly during DST changes)
		if (typeof tzOffsetValue !== 'undefined') {
			value += ' ' + tzOffsetValue;
			datetimeFormat += ' ' + this.tzOffsetInputFormat;
		}
		// if not, calculate the timezone offset based on the date (respect different DST values)
		else {
				this.setState({ tzOffsetValue: this.moment(value, datetimeFormat).format(this.tzOffsetInputFormat) });
			}

		this.props.onChange({
			path: this.props.path,
			value: this.isValid(value) ? this.moment(value, datetimeFormat).toISOString() : null
		});
	},
	dateChanged: function dateChanged(_ref) {
		var value = _ref.value;

		this.setState({ dateValue: value });
		this.handleChange(value, this.state.timeValue);
	},
	timeChanged: function timeChanged(evt) {
		this.setState({ timeValue: evt.target.value });
		this.handleChange(this.state.dateValue, evt.target.value);
	},
	setNow: function setNow() {
		var dateValue = this.moment().format(this.dateInputFormat);
		var timeValue = this.moment().format(this.timeInputFormat);
		var tzOffsetValue = this.moment().format(this.tzOffsetInputFormat);
		this.setState({
			dateValue: dateValue,
			timeValue: timeValue,
			tzOffsetValue: tzOffsetValue
		});
		this.handleChange(dateValue, timeValue, tzOffsetValue);
	},
	renderNote: function renderNote() {
		if (!this.props.note) return null;
		return _react2.default.createElement(_elemental.FormNote, { note: this.props.note });
	},
	renderUI: function renderUI() {
		var input;
		if (this.shouldRenderField()) {
			input = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.InlineGroup,
					null,
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_DateInput2.default, {
							format: this.dateInputFormat,
							name: this.getInputName(this.props.paths.date),
							onChange: this.dateChanged,
							ref: 'dateInput',
							value: this.state.dateValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_elemental.FormInput, {
							autoComplete: 'off',
							name: this.getInputName(this.props.paths.time),
							onChange: this.timeChanged,
							placeholder: 'HH:MM:SS am/pm',
							value: this.state.timeValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						null,
						_react2.default.createElement(
							_elemental.Button,
							{ onClick: this.setNow },
							'Now'
						)
					)
				),
				_react2.default.createElement('input', {
					name: this.getInputName(this.props.paths.tzOffset),
					type: 'hidden',
					value: this.state.tzOffsetValue
				})
			);
		} else {
			input = _react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true },
				this.format(this.props.value, this.props.formatString)
			);
		}
		return _react2.default.createElement(
			_elemental.FormField,
			{ label: this.props.label, className: 'field-type-datetime', htmlFor: this.getInputName(this.props.path) },
			input,
			this.renderNote()
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":90,"../Field":99,"moment":undefined,"react":undefined}],115:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateFilter');

},{"../date/DateFilter":112}],116:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailColumn = _react2.default.createClass({
	displayName: 'EmailColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ to: 'mailto:' + value, padded: true, exterior: true, field: this.props.col.type },
			value
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = EmailColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],117:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	TODO:
	- gravatar
	- validate email address
 */

module.exports = _Field2.default.create({
	displayName: 'EmailField',
	propTypes: {
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.string
	},
	statics: {
		type: 'Email'
	},
	renderField: function renderField() {
		return _react2.default.createElement(_elemental.FormInput, {
			name: this.getInputName(this.props.path),
			ref: 'focusTarget',
			value: this.props.value,
			onChange: this.valueChanged,
			autoComplete: 'off',
			type: 'email'
		});
	},
	renderValue: function renderValue() {
		return this.props.value ? _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true, component: 'a', href: 'mailto:' + this.props.value },
			this.props.value
		) : _react2.default.createElement(_elemental.FormInput, { noedit: true });
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],118:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":140}],119:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextColumn');

},{"../text/TextColumn":138}],120:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinymce = (typeof window !== "undefined" ? window['tinymce'] : typeof global !== "undefined" ? global['tinymce'] : null);

var _tinymce2 = _interopRequireDefault(_tinymce);

var _elemental = require('../../../admin/client/App/elemental');

var _evalDependsOn = require('../../utils/evalDependsOn');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Remove dependency on underscore
 */

var lastId = 0;

function getId() {
	return 'keystone-html-' + lastId++;
}

// Workaround for #2834 found here https://github.com/tinymce/tinymce/issues/794#issuecomment-203701329
function removeTinyMCEInstance(editor) {
	var oldLength = _tinymce2.default.editors.length;
	_tinymce2.default.remove(editor);
	if (oldLength === _tinymce2.default.editors.length) {
		_tinymce2.default.editors.remove(editor);
	}
}

module.exports = _Field2.default.create({

	displayName: 'HtmlField',
	statics: {
		type: 'Html'
	},

	getInitialState: function getInitialState() {
		return {
			id: getId(),
			isFocused: false,
			wysiwygActive: false
		};
	},
	initWysiwyg: function initWysiwyg() {
		if (!this.props.wysiwyg) return;

		var self = this;
		var opts = this.getOptions();

		opts.setup = function (editor) {
			self.editor = editor;
			editor.on('change', self.valueChanged);
			editor.on('focus', self.focusChanged.bind(self, true));
			editor.on('blur', self.focusChanged.bind(self, false));
		};

		this._currentValue = this.props.value;
		_tinymce2.default.init(opts);
		if ((0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
			this.setState({ wysiwygActive: true });
		}
	},
	removeWysiwyg: function removeWysiwyg(state) {
		removeTinyMCEInstance(_tinymce2.default.get(state.id));
		this.setState({ wysiwygActive: false });
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		if (prevState.isCollapsed && !this.state.isCollapsed) {
			this.initWysiwyg();
		}

		if (this.props.wysiwyg) {
			if ((0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
				if (!this.state.wysiwygActive) {
					this.initWysiwyg();
				}
			} else if (this.state.wysiwygActive) {
				this.removeWysiwyg(prevState);
			}
		}
	},
	componentDidMount: function componentDidMount() {
		this.initWysiwyg();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.editor && this._currentValue !== nextProps.value) {
			this.editor.setContent(nextProps.value);
		}
	},
	focusChanged: function focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
	},
	valueChanged: function valueChanged(event) {
		var content;
		if (this.editor) {
			content = this.editor.getContent();
		} else {
			content = event.target.value;
		}

		this._currentValue = content;
		this.props.onChange({
			path: this.props.path,
			value: content
		});
	},
	getOptions: function getOptions() {
		var plugins = ['code', 'link'];
		var options = _extends({}, Keystone.wysiwyg.options, this.props.wysiwyg);
		var toolbar = options.overrideToolbar ? '' : 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | removeformat | link ';
		var i;

		if (options.enableImages) {
			plugins.push('image');
			toolbar += ' | image';
		}

		if (options.enableCloudinaryUploads || options.enableS3Uploads) {
			plugins.push('uploadimage');
			toolbar += options.enableImages ? ' uploadimage' : ' | uploadimage';
		}

		if (options.additionalButtons) {
			var additionalButtons = options.additionalButtons.split(',');
			for (i = 0; i < additionalButtons.length; i++) {
				toolbar += ' | ' + additionalButtons[i];
			}
		}
		if (options.additionalPlugins) {
			var additionalPlugins = options.additionalPlugins.split(',');
			for (i = 0; i < additionalPlugins.length; i++) {
				plugins.push(additionalPlugins[i]);
			}
		}
		if (options.importcss) {
			plugins.push('importcss');
			var importcssOptions = {
				content_css: options.importcss,
				importcss_append: true,
				importcss_merge_classes: true
			};

			_extends(options.additionalOptions, importcssOptions);
		}

		if (!options.overrideToolbar) {
			toolbar += ' | code';
		}

		var opts = {
			selector: '#' + this.state.id,
			toolbar: toolbar,
			plugins: plugins,
			menubar: options.menubar || false,
			skin: options.skin || 'keystone'
		};

		if (this.shouldRenderField()) {
			opts.uploadimage_form_url = options.enableS3Uploads ? Keystone.adminPath + '/api/s3/upload' : Keystone.adminPath + '/api/cloudinary/upload';
		} else {
			_extends(opts, {
				mode: 'textareas',
				readonly: true,
				menubar: false,
				toolbar: 'code',
				statusbar: false
			});
		}

		if (options.additionalOptions) {
			_extends(opts, options.additionalOptions);
		}

		return opts;
	},
	renderField: function renderField() {
		var className = this.state.isFocused ? 'is-focused' : '';
		var style = {
			height: this.props.height
		};
		return _react2.default.createElement(
			'div',
			{ className: className },
			_react2.default.createElement(_elemental.FormInput, {
				id: this.state.id,
				multiline: true,
				name: this.getInputName(this.props.path),
				onChange: this.valueChanged,
				className: this.props.wysiwyg ? 'wysiwyg' : 'code',
				style: style,
				value: this.props.value
			})
		);
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ multiline: true, noedit: true },
			this.props.value
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../admin/client/App/elemental":65,"../../utils/evalDependsOn":142,"../Field":99,"react":undefined}],121:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":140}],122:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownColumn = _react2.default.createClass({
	displayName: 'MarkdownColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		return value && Object.keys(value).length ? value.md.substr(0, 100) : null;
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type },
				this.renderValue()
			)
		);
	}
});

module.exports = MarkdownColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],123:[function(require,module,exports){
(function (global){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Remove dependency on jQuery
 */

// Scope jQuery and the bootstrap-markdown editor so it will mount
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
require('./lib/bootstrap-markdown');

// Append/remove ### surround the selection
// Source: https://github.com/toopay/bootstrap-markdown/blob/master/js/bootstrap-markdown.js#L909
var toggleHeading = function toggleHeading(e, level) {
	var chunk;
	var cursor;
	var selected = e.getSelection();
	var content = e.getContent();
	var pointer;
	var prevChar;

	if (selected.length === 0) {
		// Give extra word
		chunk = e.__localize('heading text');
	} else {
		chunk = selected.text + '\n';
	}

	// transform selection and set the cursor into chunked text
	if ((pointer = level.length + 1, content.substr(selected.start - pointer, pointer) === level + ' ') || (pointer = level.length, content.substr(selected.start - pointer, pointer) === level)) {
		e.setSelection(selected.start - pointer, selected.end);
		e.replaceSelection(chunk);
		cursor = selected.start - pointer;
	} else if (selected.start > 0 && (prevChar = content.substr(selected.start - 1, 1), !!prevChar && prevChar !== '\n')) {
		e.replaceSelection('\n\n' + level + ' ' + chunk);
		cursor = selected.start + level.length + 3;
	} else {
		// Empty string before element
		e.replaceSelection(level + ' ' + chunk);
		cursor = selected.start + level.length + 1;
	}

	// Set the cursor
	e.setSelection(cursor, cursor + chunk.length);
};

var renderMarkdown = function renderMarkdown(component) {
	// dependsOn means that sometimes the component is mounted as a null, so account for that & noop
	if (!component.refs.markdownTextarea) {
		return;
	}

	var options = {
		autofocus: false,
		savable: false,
		resize: 'vertical',
		height: component.props.height,
		hiddenButtons: ['Heading'],

		// Heading buttons
		additionalButtons: [{
			name: 'groupHeaders',
			data: [{
				name: 'cmdH1',
				title: 'Heading 1',
				btnText: 'H1',
				callback: function callback(e) {
					toggleHeading(e, '#');
				}
			}, {
				name: 'cmdH2',
				title: 'Heading 2',
				btnText: 'H2',
				callback: function callback(e) {
					toggleHeading(e, '##');
				}
			}, {
				name: 'cmdH3',
				title: 'Heading 3',
				btnText: 'H3',
				callback: function callback(e) {
					toggleHeading(e, '###');
				}
			}, {
				name: 'cmdH4',
				title: 'Heading 4',
				btnText: 'H4',
				callback: function callback(e) {
					toggleHeading(e, '####');
				}
			}]
		}],

		// Insert Header buttons into the toolbar
		reorderButtonGroups: ['groupFont', 'groupHeaders', 'groupLink', 'groupMisc', 'groupUtil']
	};

	if (component.props.toolbarOptions.hiddenButtons) {
		var hiddenButtons = typeof component.props.toolbarOptions.hiddenButtons === 'string' ? component.props.toolbarOptions.hiddenButtons.split(',') : component.props.toolbarOptions.hiddenButtons;

		options.hiddenButtons = options.hiddenButtons.concat(hiddenButtons);
	}

	$(component.refs.markdownTextarea).markdown(options);
};

module.exports = _Field2.default.create({
	displayName: 'MarkdownField',
	statics: {
		type: 'Markdown',
		getDefaultValue: function getDefaultValue() {
			return {};
		}
	},

	// override `shouldCollapse` to check the markdown field correctly
	shouldCollapse: function shouldCollapse() {
		return this.props.collapse && !this.props.value.md;
	},


	// only have access to `refs` once component is mounted
	componentDidMount: function componentDidMount() {
		if (this.props.wysiwyg) {
			renderMarkdown(this);
		}
	},


	// only have access to `refs` once component is mounted
	componentDidUpdate: function componentDidUpdate() {
		if (this.props.wysiwyg) {
			renderMarkdown(this);
		}
	},
	renderField: function renderField() {
		var styles = {
			padding: 8,
			height: this.props.height
		};
		var defaultValue = this.props.value !== undefined && this.props.value.md !== undefined ? this.props.value.md : '';

		return _react2.default.createElement('textarea', {
			className: 'md-editor__input code',
			defaultValue: defaultValue,
			name: this.getInputName(this.props.paths.md),
			ref: 'markdownTextarea',
			style: styles
		});
	},
	renderValue: function renderValue() {
		// TODO: victoriafrench - is this the correct way to do this? the object
		// should be creating a default md where one does not exist imo.

		var innerHtml = this.props.value !== undefined && this.props.value.md !== undefined ? this.props.value.md.replace(/\n/g, '<br />') : '';

		return _react2.default.createElement(_elemental.FormInput, {
			dangerouslySetInnerHTML: { __html: innerHtml },
			multiline: true,
			noedit: true
		});
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../admin/client/App/elemental":65,"../Field":99,"./lib/bootstrap-markdown":125,"react":undefined}],124:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":140}],125:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ===================================================
* bootstrap-markdown.js v2.7.0
* http://github.com/toopay/bootstrap-markdown
* ===================================================
* Copyright 2013-2014 Taufan Aditya
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ========================================================== */

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var marked = require('marked');

/* MARKDOWN CLASS DEFINITION
 * ========================== */

var Markdown = function Markdown(element, options) {
	// Class Properties
	this.$ns = 'bootstrap-markdown';
	this.$element = $(element);
	this.$editable = { el: null, type: null, attrKeys: [], attrValues: [], content: null };
	this.$options = $.extend(true, {}, $.fn.markdown.defaults, options, this.$element.data(), this.$element.data('options'));
	this.$oldContent = null;
	this.$isPreview = false;
	this.$isFullscreen = false;
	this.$editor = null;
	this.$textarea = null;
	this.$handler = [];
	this.$callback = [];
	this.$nextTab = [];

	this.showEditor();
};

Markdown.prototype = {

	constructor: Markdown,

	__alterButtons: function __alterButtons(name, alter) {
		var handler = this.$handler,
		    isAll = name == 'all',
		    that = this;

		$.each(handler, function (k, v) {
			var halt = true;
			if (isAll) {
				halt = false;
			} else {
				halt = v.indexOf(name) < 0;
			}

			if (halt == false) {
				alter(that.$editor.find('button[data-handler="' + v + '"]'));
			}
		});
	},

	__buildButtons: function __buildButtons(buttonsArray, container) {
		var i,
		    ns = this.$ns,
		    handler = this.$handler,
		    callback = this.$callback;

		for (i = 0; i < buttonsArray.length; i++) {
			// Build each group container
			var y,
			    btnGroups = buttonsArray[i];
			for (y = 0; y < btnGroups.length; y++) {
				// Build each button group
				var z,
				    buttons = btnGroups[y].data,
				    btnGroupContainer = $('<div/>', {
					'class': 'md-editor__btn-group'
				});

				for (z = 0; z < buttons.length; z++) {
					var button = buttons[z],
					    buttonContainer,
					    buttonIconContainer,
					    buttonHandler = ns + '-' + button.name,
					    buttonIcon = this.__getIcon(button.icon),
					    btnText = button.btnText ? button.btnText : '',
					    btnClass = button.btnClass ? button.btnClass : 'md-editor__btn',
					    tabIndex = button.tabIndex ? button.tabIndex : '-1',
					    hotkey = typeof button.hotkey !== 'undefined' ? button.hotkey : '',
					    hotkeyCaption = typeof jQuery.hotkeys !== 'undefined' && hotkey !== '' ? ' (' + hotkey + ')' : '';

					// Construct the button object
					buttonContainer = $('<button></button>');
					buttonContainer.text(' ' + this.__localize(btnText)).addClass('md-editor__btn').addClass(btnClass);
					if (btnClass.match(/md-editor__btn\--(primary|success|info|warning|danger|link)/)) {
						buttonContainer.removeClass('md-editor__btn');
					}
					buttonContainer.attr({
						'type': 'button',
						'title': this.__localize(button.title) + hotkeyCaption,
						'tabindex': tabIndex,
						'data-provider': ns,
						'data-handler': buttonHandler,
						'data-hotkey': hotkey
					});
					if (button.toggle == true) {
						buttonContainer.attr('data-toggle', 'button');
					}
					buttonIconContainer = $('<span/>');
					buttonIconContainer.addClass(buttonIcon);
					buttonIconContainer.prependTo(buttonContainer);

					// Attach the button object
					btnGroupContainer.append(buttonContainer);

					// Register handler and callback
					handler.push(buttonHandler);
					callback.push(button.callback);
				}

				// Attach the button group into container dom
				container.append(btnGroupContainer);
			}
		}

		return container;
	},
	__setListener: function __setListener() {
		// Set size and resizable Properties
		var hasRows = typeof this.$textarea.attr('rows') != 'undefined',
		    maxRows = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : '5',
		    rowsVal = hasRows ? this.$textarea.attr('rows') : maxRows;

		this.$textarea.attr('rows', rowsVal);
		if (this.$options.resize) {
			this.$textarea.css('resize', this.$options.resize);
		}

		this.$textarea.on('focus', $.proxy(this.focus, this)).on('keypress', $.proxy(this.keypress, this)).on('keyup', $.proxy(this.keyup, this)).on('change', $.proxy(this.change, this));

		if (this.eventSupported('keydown')) {
			this.$textarea.on('keydown', $.proxy(this.keydown, this));
		}

		// Re-attach markdown data
		this.$textarea.data('markdown', this);
	},

	__handle: function __handle(e) {
		var target = $(e.currentTarget),
		    handler = this.$handler,
		    callback = this.$callback,
		    handlerName = target.attr('data-handler'),
		    callbackIndex = handler.indexOf(handlerName),
		    callbackHandler = callback[callbackIndex];

		// Trigger the focusin
		$(e.currentTarget).focus();

		callbackHandler(this);

		// Trigger onChange for each button handle
		this.change(this);

		// Unless it was the save handler,
		// focusin the textarea
		if (handlerName.indexOf('cmdSave') < 0) {
			this.$textarea.focus();
		}

		e.preventDefault();
	},

	__localize: function __localize(string) {
		var messages = $.fn.markdown.messages,
		    language = this.$options.language;
		if (typeof messages !== 'undefined' && typeof messages[language] !== 'undefined' && typeof messages[language][string] !== 'undefined') {
			return messages[language][string];
		}
		return string;
	},

	__getIcon: function __getIcon(src) {
		return (typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' ? src[this.$options.iconlibrary] : src;
	},

	setFullscreen: function setFullscreen(mode) {
		var $editor = this.$editor,
		    $textarea = this.$textarea;

		if (mode === true) {
			$editor.addClass('md-fullscreen-mode');
			$('body').addClass('md-editor--no-overflow');
			this.$options.onFullscreen(this);
		} else {
			$editor.removeClass('md-fullscreen-mode');
			$('body').removeClass('md-editor--no-overflow');
		}

		this.$isFullscreen = mode;
		$textarea.focus();
	},

	showEditor: function showEditor() {
		var instance = this,
		    textarea,
		    ns = this.$ns,
		    container = this.$element,
		    originalHeigth = container.css('height'),
		    originalWidth = container.css('width'),
		    editable = this.$editable,
		    handler = this.$handler,
		    callback = this.$callback,
		    options = this.$options,
		    editor = $('<div/>', {
			'class': 'md-editor',
			click: function click() {
				instance.focus();
			}
		});

		// Prepare the editor
		if (this.$editor == null) {
			// Create the panel
			var editorHeader = $('<div/>', {
				'class': 'md-editor__header btn-toolbar'
			});

			// Merge the main & additional button groups together
			var allBtnGroups = [];
			if (options.buttons.length > 0) allBtnGroups = allBtnGroups.concat(options.buttons[0]);
			if (options.additionalButtons.length > 0) allBtnGroups = allBtnGroups.concat(options.additionalButtons[0]);

			// Reduce and/or reorder the button groups
			if (options.reorderButtonGroups.length > 0) {
				allBtnGroups = allBtnGroups.filter(function (btnGroup) {
					return options.reorderButtonGroups.indexOf(btnGroup.name) > -1;
				}).sort(function (a, b) {
					if (options.reorderButtonGroups.indexOf(a.name) < options.reorderButtonGroups.indexOf(b.name)) return -1;
					if (options.reorderButtonGroups.indexOf(a.name) > options.reorderButtonGroups.indexOf(b.name)) return 1;
					return 0;
				});
			}

			// Build the buttons
			if (allBtnGroups.length > 0) {
				editorHeader = this.__buildButtons([allBtnGroups], editorHeader);
			}

			if (options.fullscreen.enable) {
				editorHeader.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="javascript:;" tabIndex="-1"><span class="' + this.__getIcon(options.fullscreen.icons.fullscreenOn) + '"></span></a></div>').on('click', '.md-control-fullscreen', function (e) {
					e.preventDefault();
					instance.setFullscreen(true);
				});
			}

			editor.append(editorHeader);

			// Wrap the textarea
			if (container.is('textarea')) {
				container.before(editor);
				textarea = container;
				textarea.addClass('md-input');
				editor.append(textarea);
			} else {
				var rawContent = typeof toMarkdown == 'function' ? toMarkdown(container.html()) : container.html(),
				    currentContent = $.trim(rawContent);

				// This is some arbitrary content that could be edited
				textarea = $('<textarea/>', {
					'class': 'md-input',
					'val': currentContent
				});

				editor.append(textarea);

				// Save the editable
				editable.el = container;
				editable.type = container.prop('tagName').toLowerCase();
				editable.content = container.html();

				$(container[0].attributes).each(function () {
					editable.attrKeys.push(this.nodeName);
					editable.attrValues.push(this.nodeValue);
				});

				// Set editor to blocked the original container
				container.replaceWith(editor);
			}

			var editorFooter = $('<div/>', {
				'class': 'md-footer'
			}),
			    createFooter = false,
			    footer = '';
			// Create the footer if savable
			if (options.savable) {
				createFooter = true;
				var saveHandler = 'cmdSave';

				// Register handler and callback
				handler.push(saveHandler);
				callback.push(options.onSave);

				editorFooter.append('<button class="btn btn-success" data-provider="' + ns + '" data-handler="' + saveHandler + '"><i class="icon icon-white icon-ok"></i> ' + this.__localize('Save') + '</button>');
			}

			footer = typeof options.footer === 'function' ? options.footer(this) : options.footer;

			if ($.trim(footer) !== '') {
				createFooter = true;
				editorFooter.append(footer);
			}

			if (createFooter) editor.append(editorFooter);

			// Set width
			if (options.width && options.width !== 'inherit') {
				if (jQuery.isNumeric(options.width)) {
					editor.css('display', 'table');
					textarea.css('width', options.width + 'px');
				} else {
					editor.addClass(options.width);
				}
			}

			// Set height
			if (options.height && options.height !== 'inherit') {
				if (jQuery.isNumeric(options.height)) {
					var height = options.height;
					if (editorHeader) height = Math.max(0, height - editorHeader.outerHeight());
					if (editorFooter) height = Math.max(0, height - editorFooter.outerHeight());
					textarea.css('height', height + 'px');
				} else {
					editor.addClass(options.height);
				}
			}

			// Reference
			this.$editor = editor;
			this.$textarea = textarea;
			this.$editable = editable;
			this.$oldContent = this.getContent();

			this.__setListener();

			// Set editor attributes, data short-hand API and listener
			this.$editor.attr('id', new Date().getTime());
			this.$editor.on('click', '[data-provider="bootstrap-markdown"]', $.proxy(this.__handle, this));

			if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
				this.$editor.addClass('md-editor-disabled');
				this.disableButtons('all');
			}

			if (this.eventSupported('keydown') && _typeof(jQuery.hotkeys) === 'object') {
				editorHeader.find('[data-provider="bootstrap-markdown"]').each(function () {
					var $button = $(this),
					    hotkey = $button.attr('data-hotkey');
					if (hotkey.toLowerCase() !== '') {
						textarea.bind('keydown', hotkey, function () {
							$button.trigger('click');
							return false;
						});
					}
				});
			}

			if (options.initialstate === 'preview') {
				this.showPreview();
			} else if (options.initialstate === 'fullscreen' && options.fullscreen.enable) {
				this.setFullscreen(true);
			}
		} else {
			this.$editor.show();
		}

		if (options.autofocus) {
			this.$textarea.focus();
			this.$editor.addClass('active');
		}

		if (options.fullscreen.enable && options.fullscreen !== false) {
			this.$editor.append('\
				<div class="md-fullscreen-controls">\
					<a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="' + this.__getIcon(options.fullscreen.icons.fullscreenOff) + '"></span></a>\
				</div>');

			this.$editor.on('click', '.exit-fullscreen', function (e) {
				e.preventDefault();
				instance.setFullscreen(false);
			});
		}

		// hide hidden buttons from options
		this.hideButtons(options.hiddenButtons);

		// disable disabled buttons from options
		this.disableButtons(options.disabledButtons);

		// Trigger the onShow hook
		options.onShow(this);

		return this;
	},

	parseContent: function parseContent() {
		var content,
		    callbackContent = this.$options.onPreview(this); // Try to get the content from callback

		if (typeof callbackContent == 'string') {
			// Set the content based by callback content
			content = callbackContent;
		} else {
			// Set the content
			var val = this.$textarea.val();
			if ((typeof markdown === 'undefined' ? 'undefined' : _typeof(markdown)) == 'object') {
				content = markdown.toHTML(val);
			} else if (typeof marked == 'function') {
				content = marked(val);
			} else {
				content = val;
			}
		}

		return content;
	},

	showPreview: function showPreview() {
		var options = this.$options,
		    container = this.$textarea,
		    afterContainer = container.next(),
		    replacementContainer = $('<div/>', { 'class': 'md-editor__preview', 'data-provider': 'markdown-preview' }),
		    content;

		// Give flag that tell the editor enter preview mode
		this.$isPreview = true;
		// Disable all buttons
		this.disableButtons('all').enableButtons('cmdPreview');

		content = this.parseContent();

		// Build preview element
		replacementContainer.html(content);

		if (afterContainer && afterContainer.attr('class') == 'md-footer') {
			// If there is footer element, insert the preview container before it
			replacementContainer.insertBefore(afterContainer);
		} else {
			// Otherwise, just append it after textarea
			container.parent().append(replacementContainer);
		}

		// Set the preview element dimensions
		replacementContainer.css({
			width: container.outerWidth() + 'px',
			height: container.outerHeight() + 'px'
		});

		if (this.$options.resize) {
			replacementContainer.css('resize', this.$options.resize);
		}

		// Hide the last-active textarea
		container.hide();

		// Attach the editor instances
		replacementContainer.data('markdown', this);

		if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
			this.$editor.addClass('md-editor-disabled');
			this.disableButtons('all');
		}

		return this;
	},

	hidePreview: function hidePreview() {
		// Give flag that tell the editor quit preview mode
		this.$isPreview = false;

		// Obtain the preview container
		var container = this.$editor.find('div[data-provider="markdown-preview"]');

		// Remove the preview container
		container.remove();

		// Enable all buttons
		this.enableButtons('all');
		// Disable configured disabled buttons
		this.disableButtons(this.$options.disabledButtons);

		// Back to the editor
		this.$textarea.show();
		this.__setListener();

		return this;
	},

	isDirty: function isDirty() {
		return this.$oldContent != this.getContent();
	},

	getContent: function getContent() {
		return this.$textarea.val();
	},

	setContent: function setContent(content) {
		this.$textarea.val(content);

		return this;
	},

	findSelection: function findSelection(chunk) {
		var content = this.getContent(),
		    startChunkPosition;

		if (startChunkPosition = content.indexOf(chunk), startChunkPosition >= 0 && chunk.length > 0) {
			var oldSelection = this.getSelection(),
			    selection;

			this.setSelection(startChunkPosition, startChunkPosition + chunk.length);
			selection = this.getSelection();

			this.setSelection(oldSelection.start, oldSelection.end);

			return selection;
		} else {
			return null;
		}
	},

	getSelection: function getSelection() {

		var e = this.$textarea[0];

		return ('selectionStart' in e && function () {
			var l = e.selectionEnd - e.selectionStart;
			return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
		} ||

		/* browser not supported */
		function () {
			return null;
		})();
	},

	setSelection: function setSelection(start, end) {

		var e = this.$textarea[0];

		return ('selectionStart' in e && function () {
			e.selectionStart = start;
			e.selectionEnd = end;
			return;
		} ||

		/* browser not supported */
		function () {
			return null;
		})();
	},

	replaceSelection: function replaceSelection(text) {

		var e = this.$textarea[0];

		return ('selectionStart' in e && function () {
			e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
			// Set cursor to the last replacement end
			e.selectionStart = e.value.length;
			return this;
		} ||

		/* browser not supported */
		function () {
			e.value += text;
			return jQuery(e);
		})();
	},

	getNextTab: function getNextTab() {
		// Shift the nextTab
		if (this.$nextTab.length == 0) {
			return null;
		} else {
			var nextTab,
			    tab = this.$nextTab.shift();

			if (typeof tab == 'function') {
				nextTab = tab();
			} else if ((typeof tab === 'undefined' ? 'undefined' : _typeof(tab)) == 'object' && tab.length > 0) {
				nextTab = tab;
			}

			return nextTab;
		}
	},

	setNextTab: function setNextTab(start, end) {
		// Push new selection into nextTab collections
		if (typeof start == 'string') {
			var that = this;
			this.$nextTab.push(function () {
				return that.findSelection(start);
			});
		} else if (typeof start == 'number' && typeof end == 'number') {
			var oldSelection = this.getSelection();

			this.setSelection(start, end);
			this.$nextTab.push(this.getSelection());

			this.setSelection(oldSelection.start, oldSelection.end);
		}

		return;
	},

	__parseButtonNameParam: function __parseButtonNameParam(nameParam) {
		var buttons = [];

		if (typeof nameParam == 'string') {
			buttons.push(nameParam);
		} else {
			buttons = nameParam;
		}

		return buttons;
	},

	enableButtons: function enableButtons(name) {
		var buttons = this.__parseButtonNameParam(name),
		    that = this;

		$.each(buttons, function (i, v) {
			that.__alterButtons(buttons[i], function (el) {
				el.removeAttr('disabled');
			});
		});

		return this;
	},

	disableButtons: function disableButtons(name) {
		var buttons = this.__parseButtonNameParam(name),
		    that = this;

		$.each(buttons, function (i, v) {
			that.__alterButtons(buttons[i], function (el) {
				el.attr('disabled', 'disabled');
			});
		});

		return this;
	},

	hideButtons: function hideButtons(name) {
		var buttons = this.__parseButtonNameParam(name),
		    that = this;

		$.each(buttons, function (i, v) {
			that.__alterButtons(buttons[i], function (el) {
				el.addClass('hidden');
			});
		});

		return this;
	},

	showButtons: function showButtons(name) {
		var buttons = this.__parseButtonNameParam(name),
		    that = this;

		$.each(buttons, function (i, v) {
			that.__alterButtons(buttons[i], function (el) {
				el.removeClass('hidden');
			});
		});

		return this;
	},

	eventSupported: function eventSupported(eventName) {
		var isSupported = eventName in this.$element;
		if (!isSupported) {
			this.$element.setAttribute(eventName, 'return;');
			isSupported = typeof this.$element[eventName] === 'function';
		}
		return isSupported;
	},

	keyup: function keyup(e) {
		var blocked = false;
		switch (e.keyCode) {
			case 40: // down arrow
			case 38: // up arrow
			case 16: // shift
			case 17: // ctrl
			case 18:
				// alt
				break;

			case 9:
				// tab
				var nextTab;
				if (nextTab = this.getNextTab(), nextTab != null) {
					// Get the nextTab if exists
					var that = this;
					setTimeout(function () {
						that.setSelection(nextTab.start, nextTab.end);
					}, 500);

					blocked = true;
				} else {
					// The next tab memory contains nothing...
					// check the cursor position to determine tab action
					var cursor = this.getSelection();

					if (cursor.start == cursor.end && cursor.end == this.getContent().length) {
						// The cursor already reach the end of the content
						blocked = false;
					} else {
						// Put the cursor to the end
						this.setSelection(this.getContent().length, this.getContent().length);

						blocked = true;
					}
				}

				break;

			case 13:
				// enter
				blocked = false;
				break;
			case 27:
				// escape
				if (this.$isFullscreen) this.setFullscreen(false);
				blocked = false;
				break;

			default:
				blocked = false;
		}

		if (blocked) {
			e.stopPropagation();
			e.preventDefault();
		}

		this.$options.onChange(this);
	},

	change: function change(e) {
		this.$options.onChange(this);
		return this;
	},

	focus: function focus(e) {
		var options = this.$options,
		    isHideable = options.hideable,
		    editor = this.$editor;

		editor.addClass('active');

		// Blur other markdown(s)
		$(document).find('.md-editor').each(function () {
			if ($(this).attr('id') != editor.attr('id')) {
				var attachedMarkdown;

				if (attachedMarkdown = $(this).find('textarea').data('markdown'), attachedMarkdown == null) {
					attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
				}

				if (attachedMarkdown) {
					attachedMarkdown.blur();
				}
			}
		});

		// Trigger the onFocus hook
		options.onFocus(this);

		return this;
	},

	blur: function blur(e) {
		var options = this.$options,
		    isHideable = options.hideable,
		    editor = this.$editor,
		    editable = this.$editable;

		if (editor.hasClass('active') || this.$element.parent().length == 0) {
			editor.removeClass('active');

			if (isHideable) {

				// Check for editable elements
				if (editable.el != null) {
					// Build the original element
					var oldElement = $('<' + editable.type + '/>'),
					    content = this.getContent(),
					    currentContent = (typeof markdown === 'undefined' ? 'undefined' : _typeof(markdown)) == 'object' ? markdown.toHTML(content) : content;

					$(editable.attrKeys).each(function (k, v) {
						oldElement.attr(editable.attrKeys[k], editable.attrValues[k]);
					});

					// Get the editor content
					oldElement.html(currentContent);

					editor.replaceWith(oldElement);
				} else {
					editor.hide();
				}
			}

			// Trigger the onBlur hook
			options.onBlur(this);
		}

		return this;
	}

	/* MARKDOWN PLUGIN DEFINITION
 * ========================== */

};var old = $.fn.markdown;

$.fn.markdown = function (option) {
	return this.each(function () {
		var $this = $(this),
		    data = $this.data('markdown'),
		    options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;
		if (!data) $this.data('markdown', data = new Markdown(this, options));
	});
};

$.fn.markdown.messages = {};

$.fn.markdown.defaults = {
	/* Editor Properties */
	autofocus: false,
	hideable: false,
	savable: false,
	width: 'inherit',
	height: 'inherit',
	resize: 'none',
	iconlibrary: 'glyph',
	language: 'en',
	initialstate: 'editor',

	/* Buttons Properties */
	buttons: [[{
		name: 'groupFont',
		data: [{
			name: 'cmdBold',
			hotkey: 'Ctrl+B',
			title: 'Bold',
			icon: { glyph: 'mce-ico mce-i-bold', fa: 'fa fa-bold', 'fa-3': 'icon-bold' },
			callback: function callback(e) {
				// Give/remove ** surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('strong text');
				} else {
					chunk = selected.text;
				}

				// transform selection and set the cursor into chunked text
				if (content.substr(selected.start - 2, 2) == '**' && content.substr(selected.end, 2) == '**') {
					e.setSelection(selected.start - 2, selected.end + 2);
					e.replaceSelection(chunk);
					cursor = selected.start - 2;
				} else {
					e.replaceSelection('**' + chunk + '**');
					cursor = selected.start + 2;
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}, {
			name: 'cmdItalic',
			title: 'Italic',
			hotkey: 'Ctrl+I',
			icon: { glyph: 'mce-ico mce-i-italic', fa: 'fa fa-italic', 'fa-3': 'icon-italic' },
			callback: function callback(e) {
				// Give/remove * surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('emphasized text');
				} else {
					chunk = selected.text;
				}

				// transform selection and set the cursor into chunked text
				if (content.substr(selected.start - 1, 1) == '_' && content.substr(selected.end, 1) == '_') {
					e.setSelection(selected.start - 1, selected.end + 1);
					e.replaceSelection(chunk);
					cursor = selected.start - 1;
				} else {
					e.replaceSelection('_' + chunk + '_');
					cursor = selected.start + 1;
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}]
	}, {
		name: 'groupLink',
		data: [{
			name: 'cmdUrl',
			title: 'URL/Link',
			hotkey: 'Ctrl+L',
			icon: { glyph: 'mce-ico mce-i-link', fa: 'fa fa-link', 'fa-3': 'icon-link' },
			callback: function callback(e) {
				// Give [] surround the selection and prepend the link
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent(),
				    link;

				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('enter link description here');
				} else {
					chunk = selected.text;
				}

				link = prompt(e.__localize('Insert Hyperlink'), 'http://');

				if (link != null && link != '' && link != 'http://' && link.substr(0, 4) == 'http') {
					var sanitizedLink = $('<div>' + link + '</div>').text();

					// transform selection and set the cursor into chunked text
					e.replaceSelection('[' + chunk + '](' + sanitizedLink + ')');
					cursor = selected.start + 1;

					// Set the cursor
					e.setSelection(cursor, cursor + chunk.length);
				}
			}
		}, {
			name: 'cmdImage',
			title: 'Image',
			hotkey: 'Ctrl+G',
			icon: { glyph: 'mce-ico mce-i-image', fa: 'fa fa-picture-o', 'fa-3': 'icon-picture' },
			callback: function callback(e) {
				// Give ![] surround the selection and prepend the image link
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent(),
				    link;

				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('enter image description here');
				} else {
					chunk = selected.text;
				}

				link = prompt(e.__localize('Insert Image Hyperlink'), 'http://');

				if (link != null && link != '' && link != 'http://' && link.substr(0, 4) == 'http') {
					var sanitizedLink = $('<div>' + link + '</div>').text();

					// transform selection and set the cursor into chunked text
					e.replaceSelection('![' + chunk + '](' + sanitizedLink + ' "' + e.__localize('enter image title here') + '")');
					cursor = selected.start + 2;

					// Set the next tab
					e.setNextTab(e.__localize('enter image title here'));

					// Set the cursor
					e.setSelection(cursor, cursor + chunk.length);
				}
			}
		}]
	}, {
		name: 'groupMisc',
		data: [{
			name: 'cmdList',
			hotkey: 'Ctrl+U',
			title: 'Unordered List',
			icon: { glyph: 'mce-ico mce-i-bullist', fa: 'fa fa-list', 'fa-3': 'icon-list-ul' },
			callback: function callback(e) {
				// Prepend/Give - surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				// transform selection and set the cursor into chunked text
				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('list text here');

					e.replaceSelection('- ' + chunk);
					// Set the cursor
					cursor = selected.start + 2;
				} else {
					if (selected.text.indexOf('\n') < 0) {
						chunk = selected.text;

						e.replaceSelection('- ' + chunk);

						// Set the cursor
						cursor = selected.start + 2;
					} else {
						var list = [];

						list = selected.text.split('\n');
						chunk = list[0];

						$.each(list, function (k, v) {
							list[k] = '- ' + v;
						});

						e.replaceSelection('\n\n' + list.join('\n'));

						// Set the cursor
						cursor = selected.start + 4;
					}
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}, {
			name: 'cmdListO',
			hotkey: 'Ctrl+O',
			title: 'Ordered List',
			icon: { glyph: 'mce-ico mce-i-numlist', fa: 'fa fa-list-ol', 'fa-3': 'icon-list-ol' },
			callback: function callback(e) {

				// Prepend/Give - surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				// transform selection and set the cursor into chunked text
				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('list text here');
					e.replaceSelection('1. ' + chunk);
					// Set the cursor
					cursor = selected.start + 3;
				} else {
					if (selected.text.indexOf('\n') < 0) {
						chunk = selected.text;

						e.replaceSelection('1. ' + chunk);

						// Set the cursor
						cursor = selected.start + 3;
					} else {
						var list = [];

						list = selected.text.split('\n');
						chunk = list[0];

						$.each(list, function (k, v) {
							list[k] = '1. ' + v;
						});

						e.replaceSelection('\n\n' + list.join('\n'));

						// Set the cursor
						cursor = selected.start + 5;
					}
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}, {
			name: 'cmdQuote',
			hotkey: 'Ctrl+Q',
			title: 'Quote',
			icon: { glyph: 'mce-ico mce-i-indent', fa: 'fa fa-quote-left', 'fa-3': 'icon-quote-left' },
			callback: function callback(e) {
				// Prepend/Give - surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				// transform selection and set the cursor into chunked text
				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('quote here');
					e.replaceSelection('> ' + chunk);
					// Set the cursor
					cursor = selected.start + 2;
				} else {
					if (selected.text.indexOf('\n') < 0) {
						chunk = selected.text;

						e.replaceSelection('> ' + chunk);

						// Set the cursor
						cursor = selected.start + 2;
					} else {
						var list = [];

						list = selected.text.split('\n');
						chunk = list[0];

						$.each(list, function (k, v) {
							list[k] = '> ' + v;
						});

						e.replaceSelection('\n\n' + list.join('\n'));

						// Set the cursor
						cursor = selected.start + 4;
					}
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}, {
			name: 'cmdCode',
			hotkey: 'Ctrl+K',
			title: 'Code',
			icon: { glyph: 'mce-ico mce-i-code', fa: 'fa fa-code', 'fa-3': 'icon-code' },
			callback: function callback(e) {

				// Give/remove ** surround the selection
				var chunk,
				    cursor,
				    selected = e.getSelection(),
				    content = e.getContent();

				if (selected.length == 0) {
					// Give extra word
					chunk = e.__localize('code text here');
				} else {
					chunk = selected.text;
				}

				// transform selection and set the cursor into chunked text
				if (content.substr(selected.start - 1, 1) == '`' && content.substr(selected.end, 1) == '`') {
					e.setSelection(selected.start - 1, selected.end + 1);
					e.replaceSelection(chunk);
					cursor = selected.start - 1;
				} else {
					e.replaceSelection('`' + chunk + '`');
					cursor = selected.start + 1;
				}

				// Set the cursor
				e.setSelection(cursor, cursor + chunk.length);
			}
		}]
	}, {
		name: 'groupUtil',
		data: [{
			name: 'cmdPreview',
			toggle: true,
			hotkey: 'Ctrl+P',
			title: 'Preview',
			btnText: 'Preview',
			btnClass: 'btn btn-sm',
			icon: { glyph: 'glyphicon glyphicon-search', fa: 'fa fa-search', 'fa-3': 'icon-search' },
			callback: function callback(e) {
				// Check the preview mode and toggle based on this flag
				var isPreview = e.$isPreview,
				    content;

				if (isPreview == false) {
					// Give flag that tell the editor enter preview mode
					e.showPreview();
				} else {
					e.hidePreview();
				}
			}
		}]
	}]],
	additionalButtons: [], // Place to hook more buttons by code
	reorderButtonGroups: [],
	hiddenButtons: [], // Default hidden buttons
	disabledButtons: [], // Default disabled buttons
	footer: '',
	fullscreen: {
		enable: true,
		icons: {
			fullscreenOn: {
				fa: 'fa fa-expand',
				glyph: 'glyphicon glyphicon-fullscreen',
				'fa-3': 'icon-resize-full'
			},
			fullscreenOff: {
				fa: 'fa fa-compress',
				glyph: 'glyphicon glyphicon-fullscreen',
				'fa-3': 'icon-resize-small'
			}
		}
	},

	/* Events hook */
	onShow: function onShow(e) {},
	onPreview: function onPreview(e) {},
	onSave: function onSave(e) {},
	onBlur: function onBlur(e) {},
	onFocus: function onFocus(e) {},
	onChange: function onChange(e) {},
	onFullscreen: function onFullscreen(e) {}
};

$.fn.markdown.Constructor = Markdown;

/* MARKDOWN NO CONFLICT
* ==================== */

$.fn.markdown.noConflict = function () {
	$.fn.markdown = old;
	return this;
};

/* MARKDOWN GLOBAL FUNCTION & DATA-API
* ==================================== */
var initMarkdown = function initMarkdown(el) {
	var $this = el;

	if ($this.data('markdown')) {
		$this.data('markdown').showEditor();
		return;
	}

	$this.markdown();
};

var analyzeMarkdown = function analyzeMarkdown(e) {
	var blurred = false,
	    el,
	    $docEditor = $(e.currentTarget);

	// Check whether it was editor childs or not
	if ((e.type == 'focusin' || e.type == 'click') && $docEditor.length == 1 && _typeof($docEditor[0]) == 'object') {
		el = $docEditor[0].activeElement;
		if (!$(el).data('markdown')) {
			if (typeof $(el).parent().parent().parent().attr('class') == "undefined" || $(el).parent().parent().parent().attr('class').indexOf('md-editor') < 0) {
				if (typeof $(el).parent().parent().attr('class') == "undefined" || $(el).parent().parent().attr('class').indexOf('md-editor') < 0) {

					blurred = true;
				}
			} else {
				blurred = false;
			}
		}

		if (blurred) {
			// Blur event
			$(document).find('.md-editor').each(function () {
				var parentMd = $(el).parent();

				if ($(this).attr('id') != parentMd.attr('id')) {
					var attachedMarkdown;

					if (attachedMarkdown = $(this).find('textarea').data('markdown'), attachedMarkdown == null) {
						attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
					}

					if (attachedMarkdown) {
						attachedMarkdown.blur();
					}
				}
			});
		}

		e.stopPropagation();
	}
};

$(document).on('click.markdown.data-api', '[data-provide="markdown-editable"]', function (e) {
	initMarkdown($(this));
	e.preventDefault();
}).on('click', function (e) {
	analyzeMarkdown(e);
}).on('focusin', function (e) {
	analyzeMarkdown(e);
}).ready(function () {
	$('textarea[data-provide="markdown"]').each(function () {
		initMarkdown($(this));
	});
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"marked":undefined}],126:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

var _displayName = require('display-name');

var _displayName2 = _interopRequireDefault(_displayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NameColumn = _react2.default.createClass({
	displayName: 'NameColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.first && !value.last) return '(no name)';
		return (0, _displayName2.default)(value.first, value.last);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ to: this.props.linkTo, padded: true, interior: true, field: this.props.col.type },
				this.renderValue()
			)
		);
	}
});

module.exports = NameColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"display-name":undefined,"react":undefined}],127:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME_SHAPE = {
	first: _react.PropTypes.string,
	last: _react.PropTypes.string
};

module.exports = _Field2.default.create({
	displayName: 'NameField',
	statics: {
		type: 'Name',
		getDefaultValue: function getDefaultValue() {
			return {
				first: '',
				last: ''
			};
		}
	},
	propTypes: {
		onChange: _react.PropTypes.func.isRequired,
		path: _react.PropTypes.string.isRequired,
		paths: _react.PropTypes.shape(NAME_SHAPE).isRequired,
		value: _react.PropTypes.shape(NAME_SHAPE).isRequired
	},

	valueChanged: function valueChanged(which, event) {
		var _props = this.props,
		    _props$value = _props.value,
		    value = _props$value === undefined ? {} : _props$value,
		    path = _props.path,
		    onChange = _props.onChange;

		onChange({
			path: path,
			value: _extends({}, value, _defineProperty({}, which, event.target.value))
		});
	},
	changeFirst: function changeFirst(event) {
		return this.valueChanged('first', event);
	},
	changeLast: function changeLast(event) {
		return this.valueChanged('last', event);
	},
	renderValue: function renderValue() {
		var inputStyle = { width: '100%' };
		var _props$value2 = this.props.value,
		    value = _props$value2 === undefined ? {} : _props$value2;


		return _react2.default.createElement(
			_elemental.Grid.Row,
			{ small: 'one-half', gutter: 10 },
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true, style: inputStyle },
					value.first
				)
			),
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true, style: inputStyle },
					value.last
				)
			)
		);
	},
	renderField: function renderField() {
		var _props2 = this.props,
		    _props2$value = _props2.value,
		    value = _props2$value === undefined ? {} : _props2$value,
		    paths = _props2.paths,
		    autoFocus = _props2.autoFocus;

		return _react2.default.createElement(
			_elemental.Grid.Row,
			{ small: 'one-half', gutter: 10 },
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoFocus: autoFocus,
					autoComplete: 'off',
					name: this.getInputName(paths.first),
					onChange: this.changeFirst,
					placeholder: 'First name',
					value: value.first
				})
			),
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(paths.last),
					onChange: this.changeLast,
					placeholder: 'Last name',
					value: value.last
				})
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],128:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":140}],129:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordColumn = _react2.default.createClass({
	displayName: 'PasswordColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		return value ? '********' : '';
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type },
				this.renderValue()
			)
		);
	}
});

module.exports = PasswordColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],130:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'PasswordField',
	statics: {
		type: 'Password'
	},

	getInitialState: function getInitialState() {
		return {
			passwordIsSet: this.props.value ? true : false,
			showChangeUI: this.props.mode === 'create' ? true : false,
			password: '',
			confirm: ''
		};
	},
	valueChanged: function valueChanged(which, event) {
		var newState = {};
		newState[which] = event.target.value;
		this.setState(newState);
	},
	showChangeUI: function showChangeUI() {
		var _this = this;

		this.setState({
			showChangeUI: true
		}, function () {
			return _this.focus();
		});
	},
	onCancel: function onCancel() {
		var _this2 = this;

		this.setState({
			showChangeUI: false
		}, function () {
			return _this2.focus();
		});
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.props.value ? 'Password Set' : ''
		);
	},
	renderField: function renderField() {
		return this.state.showChangeUI ? this.renderFields() : this.renderChangeButton();
	},
	renderFields: function renderFields() {
		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ block: true },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(this.props.path),
					onChange: this.valueChanged.bind(this, 'password'),
					placeholder: 'New password',
					ref: 'focusTarget',
					type: 'password',
					value: this.state.password
				})
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(this.props.paths.confirm),
					onChange: this.valueChanged.bind(this, 'confirm'),
					placeholder: 'Confirm new password', value: this.state.confirm,
					type: 'password'
				})
			),
			this.state.passwordIsSet ? _react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.onCancel },
					'Cancel'
				)
			) : null
		);
	},
	renderChangeButton: function renderChangeButton() {
		var label = this.state.passwordIsSet ? 'Change Password' : 'Set Password';

		return _react2.default.createElement(
			_elemental.Button,
			{ ref: 'focusTarget', onClick: this.showChangeUI },
			label
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],131:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXISTS_OPTIONS = [{ label: 'Is Set', value: true }, { label: 'Is NOT Set', value: false }];

function getDefaultValue() {
	return {
		exists: true
	};
}

var PasswordFilter = _react2.default.createClass({
	displayName: 'PasswordFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			exists: _react2.default.PropTypes.oneOf(EXISTS_OPTIONS.map(function (i) {
				return i.value;
			}))
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	toggleExists: function toggleExists(value) {
		this.props.onChange({ exists: value });
	},
	render: function render() {
		var filter = this.props.filter;


		return _react2.default.createElement(_elemental.SegmentedControl, {
			equalWidthSegments: true,
			onChange: this.toggleExists,
			options: EXISTS_OPTIONS,
			value: filter.exists
		});
	}
});

module.exports = PasswordFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],132:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moreIndicatorStyle = {
	color: '#bbb',
	fontSize: '.8rem',
	fontWeight: 500,
	marginLeft: 8
};

var RelationshipColumn = _react2.default.createClass({
	displayName: 'RelationshipColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderMany: function renderMany(value) {
		if (!value || !value.length) return;
		var refList = this.props.col.field.refList;
		var items = [];
		for (var i = 0; i < 3; i++) {
			if (!value[i]) break;
			if (i) {
				items.push(_react2.default.createElement(
					'span',
					{ key: 'comma' + i },
					', '
				));
			}
			items.push(_react2.default.createElement(
				_ItemsTableValue2.default,
				{ interior: true, truncate: false, key: 'anchor' + i, to: Keystone.adminPath + '/' + refList.path + '/' + value[i].id },
				value[i].name
			));
		}
		if (value.length > 3) {
			items.push(_react2.default.createElement(
				'span',
				{ key: 'more', style: moreIndicatorStyle },
				'[...',
				value.length - 3,
				' more]'
			));
		}
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			items
		);
	},
	renderValue: function renderValue(value) {
		if (!value) return;
		var refList = this.props.col.field.refList;
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ to: Keystone.adminPath + '/' + refList.path + '/' + value.id, padded: true, interior: true, field: this.props.col.type },
			value.name
		);
	},
	render: function render() {
		var value = this.props.data.fields[this.props.col.path];
		var many = this.props.col.field.many;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			many ? this.renderMany(value) : this.renderValue(value)
		);
	}
});

module.exports = RelationshipColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],133:[function(require,module,exports){
'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _lists = require('../../../admin/client/utils/lists');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _elemental = require('../../../admin/client/App/elemental');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compareValues(current, next) {
	var currentLength = current ? current.length : 0;
	var nextLength = next ? next.length : 0;
	if (currentLength !== nextLength) return false;
	for (var i = 0; i < currentLength; i++) {
		if (current[i] !== next[i]) return false;
	}
	return true;
}

module.exports = _Field2.default.create({

	displayName: 'RelationshipField',
	statics: {
		type: 'Relationship'
	},

	getInitialState: function getInitialState() {
		return {
			value: null,
			createIsOpen: false
		};
	},
	componentDidMount: function componentDidMount() {
		this._itemsCache = {};
		this.loadValue(this.props.value);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.value === this.props.value || nextProps.many && compareValues(this.props.value, nextProps.value)) return;
		this.loadValue(nextProps.value);
	},
	shouldCollapse: function shouldCollapse() {
		if (this.props.many) {
			// many:true relationships have an Array for a value
			return this.props.collapse && !this.props.value.length;
		}
		return this.props.collapse && !this.props.value;
	},
	buildFilters: function buildFilters() {
		var _this = this;

		var filters = {};

		_lodash2.default.forEach(this.props.filters, function (value, key) {
			if (typeof value === 'string' && value[0] === ':') {
				var fieldName = value.slice(1);

				var val = _this.props.values[fieldName];
				if (val) {
					filters[key] = val;
					return;
				}

				// check if filtering by id and item was already saved
				if (fieldName === ':_id' && Keystone.item) {
					filters[key] = Keystone.item.id;
					return;
				}
			} else {
				filters[key] = value;
			}
		}, this);

		var parts = [];

		_lodash2.default.forEach(filters, function (val, key) {
			parts.push('filters[' + key + '][value]=' + encodeURIComponent(val));
		});

		return parts.join('&');
	},
	cacheItem: function cacheItem(item) {
		item.href = Keystone.adminPath + '/' + this.props.refList.path + '/' + item.id;
		this._itemsCache[item.id] = item;
	},
	loadValue: function loadValue(values) {
		var _this2 = this;

		if (!values) {
			return this.setState({
				loading: false,
				value: null
			});
		};
		values = Array.isArray(values) ? values : values.split(',');
		var cachedValues = values.map(function (i) {
			return _this2._itemsCache[i];
		}).filter(function (i) {
			return i;
		});
		if (cachedValues.length === values.length) {
			this.setState({
				loading: false,
				value: this.props.many ? cachedValues : cachedValues[0]
			});
			return;
		}
		this.setState({
			loading: true,
			value: null
		});
		_async2.default.map(values, function (value, done) {
			(0, _xhr2.default)({
				url: Keystone.adminPath + '/api/' + _this2.props.refList.path + '/' + value + '?basic',
				responseType: 'json'
			}, function (err, resp, data) {
				if (err || !data) return done(err);
				_this2.cacheItem(data);
				done(err, data);
			});
		}, function (err, expanded) {
			if (!_this2.isMounted()) return;
			_this2.setState({
				loading: false,
				value: _this2.props.many ? expanded : expanded[0]
			});
		});
	},


	// NOTE: this seems like the wrong way to add options to the Select
	loadOptionsCallback: {},
	loadOptions: function loadOptions(input, callback) {
		var _this3 = this;

		// NOTE: this seems like the wrong way to add options to the Select
		this.loadOptionsCallback = callback;
		var filters = this.buildFilters();
		(0, _xhr2.default)({
			url: Keystone.adminPath + '/api/' + this.props.refList.path + '?basic&search=' + input + '&' + filters,
			responseType: 'json'
		}, function (err, resp, data) {
			if (err) {
				console.error('Error loading items:', err);
				return callback(null, []);
			}
			data.results.forEach(_this3.cacheItem);
			callback(null, {
				options: data.results,
				complete: data.results.length === data.count
			});
		});
	},
	valueChanged: function valueChanged(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	openCreate: function openCreate() {
		this.setState({
			createIsOpen: true
		});
	},
	closeCreate: function closeCreate() {
		this.setState({
			createIsOpen: false
		});
	},
	onCreate: function onCreate(item) {
		var _this4 = this;

		this.cacheItem(item);
		if (Array.isArray(this.state.value)) {
			// For many relationships, append the new item to the end
			var values = this.state.value.map(function (item) {
				return item.id;
			});
			values.push(item.id);
			this.valueChanged(values.join(','));
		} else {
			this.valueChanged(item.id);
		}

		// NOTE: this seems like the wrong way to add options to the Select
		this.loadOptionsCallback(null, {
			complete: true,
			options: Object.keys(this._itemsCache).map(function (k) {
				return _this4._itemsCache[k];
			})
		});
		this.closeCreate();
	},
	renderSelect: function renderSelect(noedit) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('input', { type: 'text', style: { position: 'absolute', width: 1, height: 1, zIndex: -1, opacity: 0 }, tabIndex: '-1' }),
			_react2.default.createElement(_reactSelect2.default.Async, {
				multi: this.props.many,
				disabled: noedit,
				loadOptions: this.loadOptions,
				labelKey: 'name',
				name: this.getInputName(this.props.path),
				onChange: this.valueChanged,
				simpleValue: true,
				value: this.state.value,
				valueKey: 'id'
			})
		);
	},
	renderInputGroup: function renderInputGroup() {
		// TODO: find better solution
		//   when importing the CreateForm using: import CreateForm from '../../../admin/client/App/shared/CreateForm';
		//   CreateForm was imported as a blank object. This stack overflow post suggested lazilly requiring it:
		// http://stackoverflow.com/questions/29807664/cyclic-dependency-returns-empty-object-in-react-native
		// TODO: Implement this somewhere higher in the app, it breaks the encapsulation of the RelationshipField component
		var CreateForm = require('../../../admin/client/App/shared/CreateForm');
		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ block: true },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				this.renderSelect()
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.openCreate },
					'+'
				)
			),
			_react2.default.createElement(CreateForm, {
				list: _lists.listsByKey[this.props.refList.key],
				isOpen: this.state.createIsOpen,
				onCreate: this.onCreate,
				onCancel: this.closeCreate })
		);
	},
	renderValue: function renderValue() {
		var many = this.props.many;
		var value = this.state.value;

		var props = {
			children: value ? value.name : null,
			component: value ? 'a' : 'span',
			href: value ? value.href : null,
			noedit: true
		};

		return many ? this.renderSelect(true) : _react2.default.createElement(_elemental.FormInput, props);
	},
	renderField: function renderField() {
		if (this.props.createInline) {
			return this.renderInputGroup();
		} else {
			return this.renderSelect();
		}
	}
});

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/CreateForm":67,"../../../admin/client/utils/lists":86,"../Field":99,"async":undefined,"lodash":undefined,"react":undefined,"react-select":undefined,"xhr":undefined}],134:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _elemental = require('../../../admin/client/App/elemental');

var _PopoutList = require('../../../admin/client/App/shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Linked To', value: false }, { label: 'NOT Linked To', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		value: []
	};
}

var RelationshipFilter = _react2.default.createClass({
	displayName: 'RelationshipFilter',

	propTypes: {
		field: _react2.default.PropTypes.object,
		filter: _react2.default.PropTypes.shape({
			inverted: _react2.default.PropTypes.bool,
			value: _react2.default.PropTypes.array
		}),
		onHeightChange: _react2.default.PropTypes.func
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	getInitialState: function getInitialState() {
		return {
			searchIsLoading: false,
			searchResults: [],
			searchString: '',
			selectedItems: [],
			valueIsLoading: true
		};
	},
	componentDidMount: function componentDidMount() {
		this._itemsCache = {};
		this.loadSearchResults(true);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.filter.value !== this.props.filter.value) {
			this.populateValue(nextProps.filter.value);
		}
	},
	isLoading: function isLoading() {
		return this.state.searchIsLoading || this.state.valueIsLoading;
	},
	populateValue: function populateValue(value) {
		var _this = this;

		_async2.default.map(value, function (id, next) {
			if (_this._itemsCache[id]) return next(null, _this._itemsCache[id]);
			(0, _xhr2.default)({
				url: Keystone.adminPath + '/api/' + _this.props.field.refList.path + '/' + id + '?basic',
				responseType: 'json'
			}, function (err, resp, data) {
				if (err || !data) return next(err);
				_this.cacheItem(data);
				next(err, data);
			});
		}, function (err, items) {
			if (err) {
				// TODO: Handle errors better
				console.error('Error loading items:', err);
			}
			_this.setState({
				valueIsLoading: false,
				selectedItems: items || []
			}, function () {
				(0, _reactDom.findDOMNode)(_this.refs.focusTarget).focus();
			});
		});
	},
	cacheItem: function cacheItem(item) {
		this._itemsCache[item.id] = item;
	},
	buildFilters: function buildFilters() {
		var filters = {};
		_lodash2.default.forEach(this.props.field.filters, function (value, key) {
			if (value[0] === ':') return;
			filters[key] = value;
		}, this);

		var parts = [];
		_lodash2.default.forEach(filters, function (val, key) {
			parts.push('filters[' + key + '][value]=' + encodeURIComponent(val));
		});

		return parts.join('&');
	},
	loadSearchResults: function loadSearchResults(thenPopulateValue) {
		var _this2 = this;

		var searchString = this.state.searchString;
		var filters = this.buildFilters();
		(0, _xhr2.default)({
			url: Keystone.adminPath + '/api/' + this.props.field.refList.path + '?basic&search=' + searchString + '&' + filters,
			responseType: 'json'
		}, function (err, resp, data) {
			if (err) {
				// TODO: Handle errors better
				console.error('Error loading items:', err);
				_this2.setState({
					searchIsLoading: false
				});
				return;
			}
			data.results.forEach(_this2.cacheItem);
			if (thenPopulateValue) {
				_this2.populateValue(_this2.props.filter.value);
			}
			if (searchString !== _this2.state.searchString) return;
			_this2.setState({
				searchIsLoading: false,
				searchResults: data.results
			}, _this2.updateHeight);
		});
	},
	updateHeight: function updateHeight() {
		if (this.props.onHeightChange) {
			this.props.onHeightChange(this.refs.container.offsetHeight);
		}
	},
	toggleInverted: function toggleInverted(inverted) {
		this.updateFilter({ inverted: inverted });
	},
	updateSearch: function updateSearch(e) {
		this.setState({ searchString: e.target.value }, this.loadSearchResults);
	},
	selectItem: function selectItem(item) {
		var value = this.props.filter.value.concat(item.id);
		this.updateFilter({ value: value });
	},
	removeItem: function removeItem(item) {
		var value = this.props.filter.value.filter(function (i) {
			return i !== item.id;
		});
		this.updateFilter({ value: value });
	},
	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	renderItems: function renderItems(items, selected) {
		var _this3 = this;

		var itemIconHover = selected ? 'x' : 'check';

		return items.map(function (item, i) {
			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'item-' + i + '-' + item.id,
				icon: 'dash',
				iconHover: itemIconHover,
				label: item.name,
				onClick: function onClick() {
					if (selected) _this3.removeItem(item);else _this3.selectItem(item);
				}
			});
		});
	},
	render: function render() {
		var _this4 = this;

		var selectedItems = this.state.selectedItems;
		var searchResults = this.state.searchResults.filter(function (i) {
			return _this4.props.filter.value.indexOf(i.id) === -1;
		});
		var placeholder = this.isLoading() ? 'Loading...' : 'Find a ' + this.props.field.label + '...';
		return _react2.default.createElement(
			'div',
			{ ref: 'container' },
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, { equalWidthSegments: true, options: INVERTED_OPTIONS, value: this.props.filter.inverted, onChange: this.toggleInverted })
			),
			_react2.default.createElement(
				_elemental.FormField,
				{ style: { borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '1em' } },
				_react2.default.createElement(_elemental.FormInput, { autoFocus: true, ref: 'focusTarget', value: this.state.searchString, onChange: this.updateSearch, placeholder: placeholder })
			),
			selectedItems.length ? _react2.default.createElement(
				_PopoutList2.default,
				null,
				_react2.default.createElement(
					_PopoutList2.default.Heading,
					null,
					'Selected'
				),
				this.renderItems(selectedItems, true)
			) : null,
			searchResults.length ? _react2.default.createElement(
				_PopoutList2.default,
				null,
				_react2.default.createElement(
					_PopoutList2.default.Heading,
					{ style: selectedItems.length ? { marginTop: '2em' } : null },
					'Items'
				),
				this.renderItems(searchResults)
			) : null
		);
	}
});

module.exports = RelationshipFilter;

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Popout/PopoutList":73,"async":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined,"xhr":undefined}],135:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectColumn = _react2.default.createClass({
	displayName: 'SelectColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		var value = this.props.data.fields[this.props.col.path];
		var option = this.props.col.field.ops.filter(function (i) {
			return i.value === value;
		})[0];

		return option ? option.label : null;
	},
	render: function render() {
		var value = this.getValue();
		var empty = !value && this.props.linkTo ? true : false;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type, to: this.props.linkTo, empty: empty },
				value
			)
		);
	}
});

module.exports = SelectColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],136:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Custom path support
 */

module.exports = _Field2.default.create({

	displayName: 'SelectField',
	statics: {
		type: 'Select'
	},

	valueChanged: function valueChanged(newValue) {
		// TODO: This should be natively handled by the Select component
		if (this.props.numeric && typeof newValue === 'string') {
			newValue = newValue ? Number(newValue) : undefined;
		}
		this.props.onChange({
			path: this.props.path,
			value: newValue
		});
	},
	renderValue: function renderValue() {
		var _props = this.props,
		    ops = _props.ops,
		    value = _props.value;

		var selected = ops.find(function (opt) {
			return opt.value === value;
		});

		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			selected ? selected.label : null
		);
	},
	renderField: function renderField() {
		var _props2 = this.props,
		    numeric = _props2.numeric,
		    ops = _props2.ops,
		    path = _props2.path,
		    val = _props2.value;

		// TODO: This should be natively handled by the Select component

		var options = numeric ? ops.map(function (i) {
			return { label: i.label, value: String(i.value) };
		}) : ops;
		var value = typeof val === 'number' ? String(val) : val;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('input', { type: 'text', style: { position: 'absolute', width: 1, height: 1, zIndex: -1, opacity: 0 }, tabIndex: '-1' }),
			_react2.default.createElement(_reactSelect2.default, {
				simpleValue: true,
				name: this.getInputName(path),
				value: value,
				options: options,
				onChange: this.valueChanged
			})
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined,"react-select":undefined}],137:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _elemental = require('../../../admin/client/App/elemental');

var _PopoutList = require('../../../admin/client/App/shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _Kbd = require('../../../admin/client/App/shared/Kbd');

var _Kbd2 = _interopRequireDefault(_Kbd);

var _bindFunctions = require('../../utils/bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		value: []
	};
}

var FilterOption = function (_Component) {
	_inherits(FilterOption, _Component);

	function FilterOption() {
		_classCallCheck(this, FilterOption);

		var _this = _possibleConstructorReturn(this, (FilterOption.__proto__ || Object.getPrototypeOf(FilterOption)).call(this));

		_bindFunctions2.default.call(_this, ['handleClick']);
		return _this;
	}

	_createClass(FilterOption, [{
		key: 'handleClick',
		value: function handleClick() {
			var _props = this.props,
			    option = _props.option,
			    selected = _props.selected;

			this.props.onClick(option, selected);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    option = _props2.option,
			    selected = _props2.selected;

			return _react2.default.createElement(_PopoutList2.default.Item, {
				icon: selected ? 'check' : 'dash',
				isSelected: selected,
				label: option.label,
				onClick: this.handleClick
			});
		}
	}]);

	return FilterOption;
}(_react.Component);

var SelectFilter = function (_Component2) {
	_inherits(SelectFilter, _Component2);

	function SelectFilter() {
		_classCallCheck(this, SelectFilter);

		var _this2 = _possibleConstructorReturn(this, (SelectFilter.__proto__ || Object.getPrototypeOf(SelectFilter)).call(this));

		_bindFunctions2.default.call(_this2, ['detectOS', 'handleClick', 'handleKeyDown', 'handleKeyUp', 'removeOption', 'selectOption', 'toggleAllOptions', 'toggleInverted', 'updateFilter']);

		_this2.state = { metaDown: false };
		return _this2;
	}

	_createClass(SelectFilter, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.detectOS();
			document.body.addEventListener('keydown', this.handleKeyDown, false);
			document.body.addEventListener('keyup', this.handleKeyUp, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeEventListener('keydown', this.handleKeyDown);
			document.body.removeEventListener('keyup', this.handleKeyUp);
		}

		// ==============================
		// METHODS
		// ==============================

		// TODO this should probably be moved to the main App component and stored
		// in context for other components to subscribe to when required

	}, {
		key: 'detectOS',
		value: function detectOS() {
			var osName = 'Unknown OS';

			if (navigator.appVersion.includes('Win')) osName = 'Windows';
			if (navigator.appVersion.includes('Mac')) osName = 'MacOS';
			if (navigator.appVersion.includes('X11')) osName = 'UNIX';
			if (navigator.appVersion.includes('Linux')) osName = 'Linux';

			this.setState({ osName: osName });
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {
			if (_vkey2.default[e.keyCode] !== '<meta>') return;

			this.setState({ metaDown: true });
		}
	}, {
		key: 'handleKeyUp',
		value: function handleKeyUp(e) {
			if (_vkey2.default[e.keyCode] !== '<meta>') return;

			this.setState({ metaDown: false });
		}
	}, {
		key: 'toggleInverted',
		value: function toggleInverted(inverted) {
			this.updateFilter({ inverted: inverted });
		}
	}, {
		key: 'toggleAllOptions',
		value: function toggleAllOptions() {
			var _props3 = this.props,
			    field = _props3.field,
			    filter = _props3.filter;


			if (filter.value.length < field.ops.length) {
				this.updateFilter({ value: field.ops.map(function (i) {
						return i.value;
					}) });
			} else {
				this.updateFilter({ value: [] });
			}
		}
	}, {
		key: 'selectOption',
		value: function selectOption(option) {
			var value = this.state.metaDown ? this.props.filter.value.concat(option.value) : [option.value];

			this.updateFilter({ value: value });
		}
	}, {
		key: 'removeOption',
		value: function removeOption(option) {
			var value = this.state.metaDown ? this.props.filter.value.filter(function (i) {
				return i !== option.value;
			}) : [option.value];

			this.updateFilter({ value: value });
		}
	}, {
		key: 'handleClick',
		value: function handleClick(option, selected) {
			selected ? this.removeOption(option) : this.selectOption(option);
		}
	}, {
		key: 'updateFilter',
		value: function updateFilter(value) {
			this.props.onChange(_extends({}, this.props.filter, value));
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var _this3 = this;

			return this.props.field.ops.map(function (option, i) {
				var selected = _this3.props.filter.value.indexOf(option.value) > -1;
				return _react2.default.createElement(FilterOption, {
					key: 'item-' + i + '-' + option.value,
					option: option,
					selected: selected,
					onClick: _this3.handleClick
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    field = _props4.field,
			    filter = _props4.filter;

			var indeterminate = filter.value.length < field.ops.length;

			var metaKeyLabel = this.state.osName === 'MacOS' ? 'cmd' : 'ctrl';

			var fieldStyles = {
				alignItems: 'center',
				borderBottom: '1px dashed rgba(0,0,0,0.1)',
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: '1em',
				paddingBottom: '1em'
			};

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.FormField,
					null,
					_react2.default.createElement(_elemental.SegmentedControl, {
						equalWidthSegments: true,
						onChange: this.toggleInverted,
						options: INVERTED_OPTIONS,
						value: filter.inverted
					})
				),
				_react2.default.createElement(
					'div',
					{ style: fieldStyles },
					_react2.default.createElement(
						_elemental.Button,
						{ size: 'xsmall', onClick: this.toggleAllOptions, style: { padding: 0, width: 50 } },
						indeterminate ? 'All' : 'None'
					),
					_react2.default.createElement(
						_elemental.FormNote,
						{ style: { margin: 0 } },
						'Hold ',
						_react2.default.createElement(
							_Kbd2.default,
							null,
							metaKeyLabel
						),
						' to select multiple options'
					)
				),
				this.renderOptions()
			);
		}
	}]);

	return SelectFilter;
}(_react.Component);

;

SelectFilter.propTypes = {
	field: _react.PropTypes.object,
	filter: _react.PropTypes.shape({
		inverted: _react.PropTypes.boolean,
		value: _react.PropTypes.array
	})
};
SelectFilter.getDefaultValue = getDefaultValue;
SelectFilter.defaultProps = {
	filter: getDefaultValue()
};

module.exports = SelectFilter;

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Kbd":69,"../../../admin/client/App/shared/Popout/PopoutList":73,"../../utils/bindFunctions":141,"react":undefined,"vkey":undefined}],138:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextColumn = _react2.default.createClass({
	displayName: 'TextColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		// cropping text is important for textarea, which uses this column
		var value = this.props.data.fields[this.props.col.path];
		return value ? value.substr(0, 100) : null;
	},
	render: function render() {
		var value = this.getValue();
		var empty = !value && this.props.linkTo ? true : false;
		var className = this.props.col.field.monospace ? 'ItemList__value--monospace' : undefined;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ className: className, to: this.props.linkTo, empty: empty, padded: true, interior: true, field: this.props.col.type },
				value
			)
		);
	}
});

module.exports = TextColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],139:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'TextField',
	statics: {
		type: 'Text'
	}
});

},{"../Field":99}],140:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

var MODE_OPTIONS = [{ label: 'Contains', value: 'contains' }, { label: 'Exactly', value: 'exactly' }, { label: 'Begins with', value: 'beginsWith' }, { label: 'Ends with', value: 'endsWith' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		inverted: INVERTED_OPTIONS[0].value,
		value: ''
	};
}

var TextFilter = _react2.default.createClass({
	displayName: 'TextFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(function (i) {
				return i.value;
			})),
			inverted: _react2.default.PropTypes.boolean,
			value: _react2.default.PropTypes.string
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	selectMode: function selectMode(e) {
		var mode = e.target.value;
		this.updateFilter({ mode: mode });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	toggleInverted: function toggleInverted(inverted) {
		this.updateFilter({ inverted: inverted });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	updateValue: function updateValue(e) {
		this.updateFilter({ value: e.target.value });
	},
	render: function render() {
		var _props = this.props,
		    field = _props.field,
		    filter = _props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		var placeholder = field.label + ' ' + mode.label.toLowerCase() + '...';

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, {
					equalWidthSegments: true,
					onChange: this.toggleInverted,
					options: INVERTED_OPTIONS,
					value: filter.inverted
				})
			),
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectMode,
					options: MODE_OPTIONS,
					value: mode.value
				})
			),
			_react2.default.createElement(_elemental.FormInput, {
				autoFocus: true,
				onChange: this.updateValue,
				placeholder: placeholder,
				ref: 'focusTarget',
				value: this.props.filter.value
			})
		);
	}
});

module.exports = TextFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],141:[function(require,module,exports){
"use strict";

/*
	Tidier binding for component methods to Classes
	===============================================

	constructor() {
		super();
		bindFunctions.call(this, ['handleClick', 'handleOther']);
	}
*/
module.exports = function bindFunctions(functions) {
	var _this = this;

	functions.forEach(function (f) {
		return _this[f] = _this[f].bind(_this);
	});
};

},{}],142:[function(require,module,exports){
'use strict';

var ExMatch = require('expression-match'); // Matches objects with expressions

/**
 * Checks if something is an object
 *
 * @param  {Any} arg   The something we want to check the type of
 * @return {Boolean} If arg is an object or not
 */
function isObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Object]';
};

/**
 * Evaluates the visibility of a field based on its dependencies and their values
 *
 * @param  {Object|Any} dependsOn The dependsOn variable we get from the field
 * @param  {Object}		values    The values currently in the fields
 * @return {Boolean}			  If the current field should be displayed based
 *                          	  on it's dependencies and their values
 */
module.exports = function evalDependsOn(dependsOn, values) {
  if (!isObject(dependsOn) || !Object.keys(dependsOn).length) {
    return true;
  }

  // Checks if the current field should be displayed, based on the values of
  // other fields and the dependsOn configuration of this field
  var Match = new ExMatch(dependsOn, values, false);
  return Match.match();
};

},{"expression-match":undefined}],143:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],"FieldTypes":[function(require,module,exports){
"use strict";

exports.Columns = {
  name: require("../../fields/types/name/NameColumn"),
  email: require("../../fields/types/email/EmailColumn"),
  text: require("../../fields/types/text/TextColumn"),
  select: require("../../fields/types/select/SelectColumn"),
  markdown: require("../../fields/types/markdown/MarkdownColumn"),
  datetime: require("../../fields/types/datetime/DatetimeColumn"),
  cloudinaryimages: require("../../fields/types/cloudinaryimages/CloudinaryImagesColumn"),
  date: require("../../fields/types/date/DateColumn"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageColumn"),
  html: require("../../fields/types/html/HtmlColumn"),
  relationship: require("../../fields/types/relationship/RelationshipColumn"),
  password: require("../../fields/types/password/PasswordColumn"),
  boolean: require("../../fields/types/boolean/BooleanColumn"),
  id: require("../../fields/components/columns/IdColumn"),
  __unrecognised__: require("../../fields/components/columns/InvalidColumn")
};
exports.Fields = {
  name: require("../../fields/types/name/NameField"),
  email: require("../../fields/types/email/EmailField"),
  text: require("../../fields/types/text/TextField"),
  select: require("../../fields/types/select/SelectField"),
  markdown: require("../../fields/types/markdown/MarkdownField"),
  datetime: require("../../fields/types/datetime/DatetimeField"),
  cloudinaryimages: require("../../fields/types/cloudinaryimages/CloudinaryImagesField"),
  date: require("../../fields/types/date/DateField"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageField"),
  html: require("../../fields/types/html/HtmlField"),
  relationship: require("../../fields/types/relationship/RelationshipField"),
  password: require("../../fields/types/password/PasswordField"),
  boolean: require("../../fields/types/boolean/BooleanField")
};
exports.Filters = {
  name: require("../../fields/types/name/NameFilter"),
  email: require("../../fields/types/email/EmailFilter"),
  text: require("../../fields/types/text/TextFilter"),
  select: require("../../fields/types/select/SelectFilter"),
  markdown: require("../../fields/types/markdown/MarkdownFilter"),
  datetime: require("../../fields/types/datetime/DatetimeFilter"),
  cloudinaryimages: require("../../fields/types/cloudinaryimages/CloudinaryImagesFilter"),
  date: require("../../fields/types/date/DateFilter"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageFilter"),
  html: require("../../fields/types/html/HtmlFilter"),
  relationship: require("../../fields/types/relationship/RelationshipFilter"),
  password: require("../../fields/types/password/PasswordFilter"),
  boolean: require("../../fields/types/boolean/BooleanFilter")
};

},{"../../fields/components/columns/IdColumn":97,"../../fields/components/columns/InvalidColumn":98,"../../fields/types/boolean/BooleanColumn":100,"../../fields/types/boolean/BooleanField":101,"../../fields/types/boolean/BooleanFilter":102,"../../fields/types/cloudinaryimage/CloudinaryImageColumn":103,"../../fields/types/cloudinaryimage/CloudinaryImageField":104,"../../fields/types/cloudinaryimage/CloudinaryImageFilter":105,"../../fields/types/cloudinaryimages/CloudinaryImagesColumn":106,"../../fields/types/cloudinaryimages/CloudinaryImagesField":107,"../../fields/types/cloudinaryimages/CloudinaryImagesFilter":108,"../../fields/types/date/DateColumn":110,"../../fields/types/date/DateField":111,"../../fields/types/date/DateFilter":112,"../../fields/types/datetime/DatetimeColumn":113,"../../fields/types/datetime/DatetimeField":114,"../../fields/types/datetime/DatetimeFilter":115,"../../fields/types/email/EmailColumn":116,"../../fields/types/email/EmailField":117,"../../fields/types/email/EmailFilter":118,"../../fields/types/html/HtmlColumn":119,"../../fields/types/html/HtmlField":120,"../../fields/types/html/HtmlFilter":121,"../../fields/types/markdown/MarkdownColumn":122,"../../fields/types/markdown/MarkdownField":123,"../../fields/types/markdown/MarkdownFilter":124,"../../fields/types/name/NameColumn":126,"../../fields/types/name/NameField":127,"../../fields/types/name/NameFilter":128,"../../fields/types/password/PasswordColumn":129,"../../fields/types/password/PasswordField":130,"../../fields/types/password/PasswordFilter":131,"../../fields/types/relationship/RelationshipColumn":132,"../../fields/types/relationship/RelationshipField":133,"../../fields/types/relationship/RelationshipFilter":134,"../../fields/types/select/SelectColumn":135,"../../fields/types/select/SelectField":136,"../../fields/types/select/SelectFilter":137,"../../fields/types/text/TextColumn":138,"../../fields/types/text/TextField":139,"../../fields/types/text/TextFilter":140}]},{},[]);
