import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.ends-with";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import 'core-js/stable';
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

var iframeStyle = {
  display: "none",
  // width: '100%',
  height: '100%'
};

var JotformEmbed = /*#__PURE__*/function (_React$Component) {
  _inherits(JotformEmbed, _React$Component);

  var _super = _createSuper(JotformEmbed);

  function JotformEmbed(props) {
    var _this;

    _classCallCheck(this, JotformEmbed);

    _this = _super.call(this, props);
    _this.handleIframeMessage = _this.handleIframeMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JotformEmbed, [{
    key: "handleIframeMessage",
    value: function handleIframeMessage(e) {
      console.log("handleIframeMessage", e)
      var props = this.props;
      
      if (!e.data.split) {
        return;
      }
      
      var args = e.data.split(':');
      var formId = args[2];
      var iframe = ReactDOM.findDOMNode(this.refs.iframe);

      if (!!iframe && (!formId || props.src.split('?')[0].endsWith(formId))) {
        switch (args[0]) {
          case 'scrollIntoView':
            iframe.scrollIntoView();
            break;

          // case 'setHeight':
          //   iframe.style.height = "".concat(args[1], "px");
          //   break;

          case 'collapseErrorPage':
            if (iframe.clientHeight > globalThis.innerHeight) {
              iframe.style.height = "".concat(globalThis.innerHeight, "px");
            }

            break;

          case 'reloadPage':
            globalThis.location.reload();
            break;
        }

        var isJotForm = e.origin.indexOf('jotform') > -1;

        if (isJotForm && 'contentWindow' in iframe && 'postMessage' in iframe.contentWindow) {
          var urls = {
            'docurl': encodeURIComponent(globalThis.document.URL),
            'referrer': encodeURIComponent(globalThis.document.referrer)
          };
          iframe.contentWindow.postMessage(JSON.stringify({
            'type': 'urls',
            'value': urls
          }), '*');
        }
      }

      const origin = e.origin || e.originalEvent.origin;
      if (origin === "https://submit.jotform.com") {
        // make the iframe height to 0 to hide the iframe
        iframe.style.height = "0px";
        // remove the iframe after 1 second
        // setTimeout(() => {
        //   iframe.parentNode.removeChild(iframe);
        // }
        // , 1000);
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (globalThis.addEventListener) {
        globalThis.addEventListener('message', this.handleIframeMessage, false);
      } else if (globalThis.attachEvent) {
        globalThis.attachEvent('onmessage', this.handleIframeMessage);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (globalThis.removeEventListener) {
        globalThis.removeEventListener('message', this.handleIframeMessage, false);
      } else if (globalThis.detachEvent) {
        globalThis.detachEvent('onmessage', this.handleIframeMessage);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return /*#__PURE__*/React.createElement("iframe", {
        ref: "iframe",
        style: iframeStyle,
        className: props.className,
        src: props.src,
        frameBorder: 0,
        scrolling: props.scrolling ? 'yes' : 'no'
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      return props.src !== nextProps.src || props.className !== nextProps.className || props.scrolling !== nextProps.scrolling;
    }
  }]);
  return JotformEmbed;
}(React.Component);

_defineProperty(JotformEmbed, "propTypes", {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  scrolling: PropTypes.bool
});

export default JotformEmbed;