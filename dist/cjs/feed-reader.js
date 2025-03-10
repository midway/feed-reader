// feed-reader@5.0.1, by @ndaidong - built with esbuild at 2022-06-13T13:47:10.072Z - published under MIT license
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name2) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name2 + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name2) {
        if (name2[name2.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name2)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name2)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error2) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error2) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error2) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error2) {
        return "[UnexpectedJSONParseError]: " + error2.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error2) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name2, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name2} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name2 + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    var kindOf = function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray3(val) {
      return Array.isArray(val);
    }
    function isUndefined2(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined2(val) && val.constructor !== null && !isUndefined2(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString3(val) {
      return typeof val === "string";
    }
    function isNumber2(val) {
      return typeof val === "number";
    }
    function isObject3(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate2 = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction2(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject3(val) && isFunction2(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction2(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray3(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray3(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i = thing.length;
      if (isUndefined2(i))
        return null;
      var arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    }
    var isTypedArray = function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module2.exports = {
      isArray: isArray3,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString: isString3,
      isNumber: isNumber2,
      isObject: isObject3,
      isPlainObject,
      isUndefined: isUndefined2,
      isDate: isDate2,
      isFile,
      isBlob,
      isFunction: isFunction2,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name2) {
        if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name2];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error2, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error2, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error2.message, code, config, request, response);
      axiosError.name = error2.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module2.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module2) {
    "use strict";
    module2.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null)
          return "";
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value))
              return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils.endsWith(key, "{}")) {
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module2.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var AxiosError = require_AxiosError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError("Request failed with status code " + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name2, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name2 + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read2(name2) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name2) {
          this.write(name2, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read2() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module2) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module2.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module2) {
    "use strict";
    module2.exports = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug2;
    module2.exports = function() {
      if (!debug2) {
        try {
          debug2 = require_src()("follow-redirects");
        } catch (error2) {
        }
        if (typeof debug2 !== "function") {
          debug2 = function() {
          };
        }
      }
      debug2.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL2 = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug2 = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name2, value) {
      this._options.headers[name2] = value;
      this._currentRequest.setHeader(name2, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name2) {
      delete this._options.headers[name2];
      this._currentRequest.removeHeader(name2);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._currentUrl = this._options.path;
      if (this._isRedirect) {
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error2) {
          if (request === self._currentRequest) {
            if (error2) {
              self.emit("error", error2);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
        return;
      }
      debug2("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (typeof beforeRedirect === "function") {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL2(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL2 && input instanceof URL2) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug2("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        } else {
          this.message = defaultMessage + ": " + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module2) {
    module2.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var isHttps = /https:?/;
    var supportedProtocols = ["http:", "https:", "file:"];
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name2) {
          headerNames[name2.toLowerCase()] = name2;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
          Object.assign(headers, data.getHeaders());
        } else if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(new AxiosError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", AxiosError.ERR_BAD_REQUEST, config));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || supportedProtocols[0];
        if (supportedProtocols.indexOf(protocol) === -1) {
          return reject(new AxiosError("Unsupported protocol " + protocol, AxiosError.ERR_BAD_REQUEST, config));
        }
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          if (config.beforeRedirect) {
            options.beforeRedirect = config.beforeRedirect;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(new AxiosError("maxContentLength size of " + config.maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(new AxiosError("maxContentLength size of " + config.maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(AxiosError.from(err, null, config, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(AxiosError.from(err, null, config, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          reject(AxiosError.from(err, null, config, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(new AxiosError("error trying to parse `config.timeout` to int", AxiosError.ERR_BAD_OPTION_VALUE, config, req));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var transitional = config.transitional || transitionalDefaults;
            reject(new AxiosError("timeout of " + timeout + "ms exceeded", transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, req));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(AxiosError.from(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/delayed-stream/lib/delayed_stream.js"(exports, module2) {
    var Stream = require("stream").Stream;
    var util = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/combined-stream/lib/combined_stream.js"(exports, module2) {
    var util = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on("error", function(err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function")
        this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function")
        this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports, module2) {
    module2.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = /* @__PURE__ */ Object.create(null);
    exports.lookup = lookup;
    exports.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/asynckit/lib/defer.js"(exports, module2) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/asynckit/lib/async.js"(exports, module2) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/asynckit/lib/abort.js"(exports, module2) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/asynckit/lib/iterate.js"(exports, module2) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error2, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error2) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error2, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/asynckit/lib/state.js"(exports, module2) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/asynckit/lib/terminator.js"(exports, module2) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/asynckit/parallel.js"(exports, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error2, result) {
          if (error2) {
            callback(error2, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/asynckit/serialOrdered.js"(exports, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error2, result) {
        if (error2) {
          callback(error2, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/asynckit/serial.js"(exports, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/asynckit/index.js"(exports, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/form-data/lib/populate.js"(exports, module2) {
    module2.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/form-data/lib/form_data.js"(exports, module2) {
    var CombinedStream = require_combined_stream();
    var util = require("util");
    var path = require("path");
    var http = require("http");
    var https = require("https");
    var parseUrl = require("url").parse;
    var fs = require("fs");
    var Stream = require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var populate = require_populate();
    module2.exports = FormData2;
    util.inherits(FormData2, CombinedStream);
    function FormData2(options) {
      if (!(this instanceof FormData2)) {
        return new FormData2(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData2.LINE_BREAK = "\r\n";
    FormData2.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData2.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (util.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData2.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData2.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData2.prototype._lengthRetriever = function(value, callback) {
      if (value.hasOwnProperty("fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs.stat(value.path, function(err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (value.hasOwnProperty("httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (value.hasOwnProperty("httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData2.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop))
          continue;
        header = headers[prop];
        if (header == null) {
          continue;
        }
        if (!Array.isArray(header)) {
          header = [header];
        }
        if (header.length) {
          contents += prop + ": " + header.join("; ") + FormData2.LINE_BREAK;
        }
      }
      return "--" + this.getBoundary() + FormData2.LINE_BREAK + contents + FormData2.LINE_BREAK;
    };
    FormData2.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty("httpVersion")) {
        filename = path.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData2.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData2.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData2.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData2.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData2.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData2.LINE_BREAK;
    };
    FormData2.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData2.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };
    FormData2.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData2.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData2.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData2.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData2.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData2.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData2.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData2.prototype.submit = function(params, cb) {
      var request, options, defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error2, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error2, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData2.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData2.prototype.toString = function() {
      return "[object FormData]";
    };
  }
});

// node_modules/axios/lib/defaults/env/FormData.js
var require_FormData = __commonJS({
  "node_modules/axios/lib/defaults/env/FormData.js"(exports, module2) {
    module2.exports = require_form_data();
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_FormData()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error2) {
          onRejected(error2);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error2) {
        return Promise.reject(error2);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.CanceledError = require_CanceledError();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.VERSION = require_data().version;
    axios2.toFormData = require_toFormData();
    axios2.AxiosError = require_AxiosError();
    axios2.Cancel = axios2.CanceledError;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module2.exports = axios2;
    module2.exports.default = axios2;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/bellajs/dist/cjs/bella.js
var require_bella = __commonJS({
  "node_modules/bellajs/dist/cjs/bella.js"(exports, module2) {
    var S = Object.defineProperty;
    var U = Object.getOwnPropertyDescriptor;
    var q = Object.getOwnPropertyNames;
    var F = Object.prototype.hasOwnProperty;
    var R = (t, e) => {
      for (var r in e)
        S(t, r, { get: e[r], enumerable: true });
    };
    var z = (t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let o of q(e))
          !F.call(t, o) && o !== r && S(t, o, { get: () => e[o], enumerable: !(n = U(e, o)) || n.enumerable });
      return t;
    };
    var B = (t) => z(S({}, "__esModule", { value: true }), t);
    var at = {};
    R(at, { clone: () => M, compose: () => ct, copies: () => I, curry: () => st, equals: () => A, escapeHTML: () => Q, formatDateString: () => nt, formatTimeAgo: () => ot, genid: () => tt, hasProperty: () => a, isArray: () => u, isBoolean: () => $, isDate: () => h, isElement: () => X, isEmail: () => W, isEmpty: () => d, isFunction: () => V, isInteger: () => H, isLetter: () => G, isNil: () => _, isNull: () => E, isNumber: () => y, isObject: () => l, isString: () => p, isUndefined: () => N, maybe: () => b, pick: () => ft, pipe: () => it, randint: () => O, replaceAll: () => w, shuffle: () => P, slugify: () => et, sort: () => L, sortBy: () => pt, stripAccent: () => D, stripTags: () => K, truncate: () => J, ucfirst: () => T, ucwords: () => v, unescapeHTML: () => Z, unique: () => ut });
    module2.exports = B(at);
    var m = (t) => ({}).toString.call(t);
    var H = (t) => Number.isInteger(t);
    var u = (t) => Array.isArray(t);
    var p = (t) => String(t) === t;
    var y = (t) => Number(t) === t;
    var $ = (t) => Boolean(t) === t;
    var E = (t) => m(t) === "[object Null]";
    var N = (t) => m(t) === "[object Undefined]";
    var _ = (t) => N(t) || E(t);
    var V = (t) => m(t) === "[object Function]";
    var l = (t) => m(t) === "[object Object]" && !u(t);
    var h = (t) => t instanceof Date && !isNaN(t.valueOf());
    var X = (t) => m(t).match(/^\[object HTML\w*Element]$/) !== null;
    var G = (t) => {
      let e = /^[a-z]+$/i;
      return p(t) && e.test(t);
    };
    var W = (t) => {
      let e = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return p(t) && e.test(t);
    };
    var d = (t) => !t || _(t) || p(t) && t === "" || u(t) && t.length === 0 || l(t) && Object.keys(t).length === 0;
    var a = (t, e) => !t || !e ? false : Object.prototype.hasOwnProperty.call(t, e);
    var A = (t, e) => {
      if (d(t) && d(e))
        return true;
      if (h(t) && h(e))
        return t.getTime() === e.getTime();
      if (u(t) && u(e)) {
        if (t.length !== e.length)
          return false;
        let r = true;
        for (let n = 0; n < t.length; n++)
          if (!A(t[n], e[n])) {
            r = false;
            break;
          }
        return r;
      }
      if (l(t) && l(e)) {
        if (Object.keys(t).length !== Object.keys(e).length)
          return false;
        let r = true;
        for (let n in t)
          if (!a(e, n) || !A(t[n], e[n])) {
            r = false;
            break;
          }
        return r;
      }
      return t === e;
    };
    var Y = Number.MAX_SAFE_INTEGER;
    var O = (t, e) => {
      if ((!t || t < 0) && (t = 0), e || (e = Y), t === e)
        return e;
      t > e && (t = Math.min(t, e), e = Math.max(t, e));
      let r = t, n = e - t + 1;
      return Math.floor(Math.random() * n) + r;
    };
    var g = (t) => {
      let e = y(t) ? String(t) : t;
      if (!p(e))
        throw new Error("InvalidInput: String required.");
      return e;
    };
    var J = (t, e) => {
      let r = g(t), n = e || 140;
      if (r.length <= n)
        return r;
      let o = r.substring(0, n), s = o.split(" "), i = s.length, c = "";
      return i > 1 ? (s.pop(), c += s.join(" "), c.length < r.length && (c += "...")) : (o = o.substring(0, n - 3), c = o + "..."), c;
    };
    var K = (t) => g(t).replace(/<.*?>/gi, " ").replace(/\s\s+/g, " ").trim();
    var Q = (t) => g(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    var Z = (t) => g(t).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    var T = (t) => {
      let e = g(t).toLowerCase();
      return e.length > 1 ? e.charAt(0).toUpperCase() + e.slice(1) : e.toUpperCase();
    };
    var v = (t) => g(t).split(" ").map((e) => T(e)).join(" ");
    var w = (t, e, r) => {
      let n = g(t);
      if (y(e) && (e = String(e)), y(r) && (r = String(r)), p(e) && p(r))
        n = n.split(e).join(r);
      else if (u(e) && p(r))
        e.forEach((o) => {
          n = w(n, o, r);
        });
      else if (u(e) && u(r) && e.length === r.length) {
        let o = e.length;
        if (o > 0)
          for (let s = 0; s < o; s++) {
            let i = e[s], c = r[s];
            n = w(n, i, c);
          }
      }
      return n;
    };
    var D = (t) => {
      let e = g(t), r = { a: "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä", A: "Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ä", c: "ç", C: "Ç", d: "đ", D: "Đ", e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë", E: "É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ë", i: "í|ì|ỉ|ĩ|ị|ï|î", I: "Í|Ì|Ỉ|Ĩ|Ị|Ï|Î", o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö", O: "Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ô|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|Ö", u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û", U: "Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Û", y: "ý|ỳ|ỷ|ỹ|ỵ", Y: "Ý|Ỳ|Ỷ|Ỹ|Ỵ" }, n = (o, s) => {
        e = w(e, o, s);
      };
      for (let o in r)
        a(r, o) && r[o].split("|").forEach((i) => n(i, o));
      return e;
    };
    var tt = (t, e = "") => {
      let r = "abcdefghijklmnopqrstuvwxyz", n = r.toUpperCase(), s = [r, n, "0123456789"].join("").split("").sort(() => Math.random() > 0.5).join(""), i = s.length, c = Math.max(t || 32, e.length), f = e;
      for (; f.length < c; ) {
        let C = O(0, i);
        f += s.charAt(C) || "";
      }
      return f;
    };
    var et = (t, e = "-") => D(t).trim().toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ").replace(/\s/g, e);
    var k = { dateStyle: "medium", timeStyle: "long" };
    var j = { second: 1e3, minute: 60, hour: 60, day: 24, week: 7, month: 4, year: 12 };
    var rt = (t) => {
      try {
        return new Intl.Locale(t).language !== "";
      } catch {
        return false;
      }
    };
    var nt = (...t) => {
      let e = t[0], r = rt(t[1]) ? t[1] : "en", n = t.length >= 3 ? t[2] : t.length === 1 ? k : l(t[1]) ? t[1] : k;
      return new Intl.DateTimeFormat(r, n).format(new Date(e));
    };
    var ot = (t, e = "en", r = "just now") => {
      let n = new Date(t), o = Date.now() - n;
      if (o <= j.second)
        return r;
      let s = "second";
      for (let c in j) {
        if (o < j[c])
          break;
        s = c, o /= j[c];
      }
      return o = Math.floor(o), new Intl.RelativeTimeFormat(e).format(-o, s);
    };
    var st = (t) => {
      let e = t.length, r = (n, o) => n > 0 ? (...s) => r(n - s.length, [...o, ...s]) : t(...o);
      return r(e, []);
    };
    var ct = (...t) => t.reduce((e, r) => (n) => e(r(n)));
    var it = (...t) => t.reduce((e, r) => (n) => r(e(n)));
    var x = (t, e, r, n = {}) => {
      let { writable: o = false, configurable: s = false, enumerable: i = false } = n;
      Object.defineProperty(t, e, { value: r, writable: o, configurable: s, enumerable: i });
    };
    var b = (t) => {
      let e = t, r = () => e == null, n = () => e, o = (f) => b(e || f()), s = (f) => b(f(e) === true ? e : null), i = (f) => b(r() ? null : f(e)), c = /* @__PURE__ */ Object.create({});
      return x(c, "__value__", e, { enumerable: true }), x(c, "__type__", "Maybe", { enumerable: true }), x(c, "isNil", r), x(c, "value", n), x(c, "map", i), x(c, "if", s), x(c, "else", o), c;
    };
    var M = (t, e = null) => {
      let r = e || /* @__PURE__ */ new Set();
      if (r.has(t))
        return t;
      if (r.add(t), h(t))
        return new Date(t.valueOf());
      let n = (s) => {
        let i = /* @__PURE__ */ Object.create({});
        for (let c in s)
          a(s, c) && (i[c] = M(s[c], r));
        return i;
      }, o = (s) => [...s].map((i) => u(i) ? o(i) : l(i) ? n(i) : M(i, r));
      return u(t) ? o(t) : l(t) ? n(t) : t;
    };
    var I = (t, e, r = false, n = []) => {
      for (let o in t)
        if (!(n.length > 0 && n.includes(o)) && (!r || r && a(e, o))) {
          let s = t[o], i = e[o];
          l(i) && l(s) || u(i) && u(s) ? e[o] = I(s, e[o], r, n) : e[o] = M(s);
        }
      return e;
    };
    var ut = (t = []) => [...new Set(t)];
    var lt = (t, e) => t > e ? 1 : t < e ? -1 : 0;
    var L = (t = [], e = null) => {
      let r = [...t], n = e || lt;
      return r.sort(n), r;
    };
    var pt = (t = [], e = 1, r = "") => !p(r) || !a(t[0], r) ? t : L(t, (n, o) => n[r] > o[r] ? e : n[r] < o[r] ? -1 * e : 0);
    var P = (t = []) => {
      let e = [...t], r = [], n = e.length;
      for (; n > 0; ) {
        let o = Math.floor(Math.random() * n);
        r.push(e.splice(o, 1)[0]), n--;
      }
      return r;
    };
    var ft = (t = [], e = 1) => {
      let r = P(t), n = Math.max(1, e), o = Math.min(n, r.length - 1);
      return r.splice(0, o);
    };
  }
});

// node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "node_modules/fast-xml-parser/src/util.js"(exports) {
    "use strict";
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    var isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  }
});

// node_modules/fast-xml-parser/src/validator.js
var require_validator2 = __commonJS({
  "node_modules/fast-xml-parser/src/validator.js"(exports) {
    "use strict";
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false,
      unpairedTags: []
    };
    exports.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err)
            return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1) {
              } else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err)
                    return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    function isWhiteSpace(char) {
      return char === " " || char === "	" || char === "\n" || char === "\r";
    }
    function readPI(xmlData, i) {
      const start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          const tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
      }
      return true;
    }
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col
        }
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    function getLineNumberForPosition(xmlData, index) {
      const lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        col: lines[lines.length - 1].length + 1
      };
    }
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js"(exports) {
    var defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      allowBooleanAttributes: false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true
      },
      tagValueProcessor: function(tagName, val) {
        return val;
      },
      attributeValueProcessor: function(attrName, val) {
        return val;
      },
      stopNodes: [],
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false
    };
    var buildOptions = function(options) {
      return Object.assign({}, defaultOptions, options);
    };
    exports.buildOptions = buildOptions;
    exports.defaultOptions = defaultOptions;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/xmlNode.js"(exports, module2) {
    "use strict";
    var XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val) {
        this.child.push({ [key]: val });
      }
      addChild(node) {
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    module2.exports = XmlNode;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js"(exports, module2) {
    function readDocType(xmlData, i) {
      const entities = {};
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, entity = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") {
              i += 7;
              entity = true;
            } else if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") {
              i += 8;
            } else if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") {
              comment = true;
            } else {
              throw new Error("Invalid DOCTYPE");
            }
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
              } else {
                throw new Error(`Invalid XML comment in DOCTYPE`);
              }
            } else if (entity) {
              parseEntityExp(exp, entities);
              entity = false;
            }
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    var entityRegex = RegExp(`^\\s([a-zA-z0-0]+)[ 	](['"])([^&]+)\\2`);
    function parseEntityExp(exp, entities) {
      const match = entityRegex.exec(exp);
      if (match) {
        entities[match[1]] = {
          regx: RegExp(`&${match[1]};`, "g"),
          val: match[3]
        };
      }
    }
    module2.exports = readDocType;
  }
});

// node_modules/strnum/strnum.js
var require_strnum = __commonJS({
  "node_modules/strnum/strnum.js"(exports, module2) {
    var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    var numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    var consider = {
      hex: true,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
    };
    function toNumber(str, options = {}) {
      options = Object.assign({}, consider, options);
      if (!str || typeof str !== "string")
        return str;
      let trimmedStr = str.trim();
      if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr))
        return str;
      else if (options.hex && hexRegex.test(trimmedStr)) {
        return Number.parseInt(trimmedStr, 16);
      } else {
        const match = numRegex.exec(trimmedStr);
        if (match) {
          const sign = match[1];
          const leadingZeros = match[2];
          let numTrimmedByZeros = trimZeros(match[3]);
          const eNotation = match[4] || match[6];
          if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
            return str;
          else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
            return str;
          else {
            const num = Number(trimmedStr);
            const numStr = "" + num;
            if (numStr.search(/[eE]/) !== -1) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (eNotation) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (trimmedStr.indexOf(".") !== -1) {
              if (numStr === "0" && numTrimmedByZeros === "")
                return num;
              else if (numStr === numTrimmedByZeros)
                return num;
              else if (sign && numStr === "-" + numTrimmedByZeros)
                return num;
              else
                return str;
            }
            if (leadingZeros) {
              if (numTrimmedByZeros === numStr)
                return num;
              else if (sign + numTrimmedByZeros === numStr)
                return num;
              else
                return str;
            }
            if (trimmedStr === numStr)
              return num;
            else if (trimmedStr === sign + numStr)
              return num;
            return str;
          }
        } else {
          return str;
        }
      }
    }
    function trimZeros(numStr) {
      if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, "");
        if (numStr === ".")
          numStr = "0";
        else if (numStr[0] === ".")
          numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".")
          numStr = numStr.substr(0, numStr.length - 1);
        return numStr;
      }
      return numStr;
    }
    module2.exports = toNumber;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js"(exports, module2) {
    "use strict";
    var util = require_util();
    var xmlNode = require_xmlNode();
    var readDocType = require_DocTypeReader();
    var toNumber = require_strnum();
    var regx = "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util.nameRegexp);
    var OrderedObjParser = class {
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "amp": { regex: /&(amp|#38|#x26);/g, val: "&" },
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          "cent": { regex: /&(cent|#162);/g, val: "¢" },
          "pound": { regex: /&(pound|#163);/g, val: "£" },
          "yen": { regex: /&(yen|#165);/g, val: "¥" },
          "euro": { regex: /&(euro|#8364);/g, val: "€" },
          "copyright": { regex: /&(copy|#169);/g, val: "©" },
          "reg": { regex: /&(reg|#174);/g, val: "®" },
          "inr": { regex: /&(inr|#8377);/g, val: "₹" }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
      }
    };
    function addExternalEntities(externalEntities) {
      const entKeys = Object.keys(externalEntities);
      for (let i = 0; i < entKeys.length; i++) {
        const ent = entKeys[i];
        this.lastEntities[ent] = {
          regex: new RegExp("&" + ent + ";", "g"),
          val: externalEntities[ent]
        };
      }
    }
    function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
      if (val !== void 0) {
        if (this.options.trimValues && !dontTrim) {
          val = val.trim();
        }
        if (val.length > 0) {
          if (!escapeEntities)
            val = this.replaceEntitiesValue(val);
          const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
          if (newval === null || newval === void 0) {
            return val;
          } else if (typeof newval !== typeof val || newval !== val) {
            return newval;
          } else if (this.options.trimValues) {
            return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            const trimmedVal = val.trim();
            if (trimmedVal === val) {
              return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
              return val;
            }
          }
        }
      }
    }
    function resolveNameSpace(tagname) {
      if (this.options.removeNSPrefix) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function buildAttributesMap(attrStr, jPath) {
      if (!this.options.ignoreAttributes && typeof attrStr === "string") {
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = this.resolveNameSpace(matches[i][1]);
          let oldVal = matches[i][4];
          const aName = this.options.attributeNamePrefix + attrName;
          if (attrName.length) {
            if (oldVal !== void 0) {
              if (this.options.trimValues) {
                oldVal = oldVal.trim();
              }
              oldVal = this.replaceEntitiesValue(oldVal);
              const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
              if (newVal === null || newVal === void 0) {
                attrs[aName] = oldVal;
              } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                attrs[aName] = newVal;
              } else {
                attrs[aName] = parseValue(oldVal, this.options.parseAttributeValue, this.options.numberParseOptions);
              }
            } else if (this.options.allowBooleanAttributes) {
              attrs[aName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (this.options.attributesGroupName) {
          const attrCollection = {};
          attrCollection[this.options.attributesGroupName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    var parseXml = function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData)
              throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {
            } else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath);
              }
              currentNode.addChild(childNode);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true);
              if (val == void 0)
                val = "";
              currentNode.add(this.options.textNodeName, val);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, tagName, closeIndex + 1);
                if (!result2)
                  throw new Error(`Unexpected end of ${tagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              currentNode.addChild(childNode);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
                }
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
                currentNode.addChild(childNode);
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
                }
                currentNode.addChild(childNode);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    };
    var replaceEntitiesValue = function(val) {
      if (this.options.processEntities) {
        for (let entityName in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName];
          val = val.replace(entity.regx, entity.val);
        }
        for (let entityName in this.lastEntities) {
          const entity = this.lastEntities[entityName];
          val = val.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName in this.htmlEntities) {
            const entity = this.htmlEntities[entityName];
            val = val.replace(entity.regex, entity.val);
          }
        }
      }
      return val;
    };
    function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
      if (textData) {
        if (isLeafNode === void 0)
          isLeafNode = Object.keys(currentNode.child).length === 0;
        textData = this.parseTextData(textData, currentNode.tagname, jPath, false, currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false, isLeafNode);
        if (textData !== void 0 && textData !== "")
          currentNode.add(this.options.textNodeName, textData);
        textData = "";
      }
      return textData;
    }
    function isItStopNode(stopNodes, jPath, currentTagName) {
      const allNodesExp = "*." + currentTagName;
      for (const stopNodePath in stopNodes) {
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp)
          return true;
      }
      return false;
    }
    function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < xmlData.length; index++) {
        let ch = xmlData[index];
        if (attrBoundary) {
          if (ch === attrBoundary)
            attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === closingChar[0]) {
          if (closingChar[1]) {
            if (xmlData[index + 1] === closingChar[1]) {
              return {
                data: tagExp,
                index
              };
            }
          } else {
            return {
              data: tagExp,
              index
            };
          }
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
      const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
      if (!result)
        return;
      let tagExp = result.data;
      const closeIndex = result.index;
      const separatorIndex = tagExp.search(/\s/);
      let tagName = tagExp;
      let attrExpPresent = true;
      if (separatorIndex !== -1) {
        tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
        tagExp = tagExp.substr(separatorIndex + 1);
      }
      if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
          tagName = tagName.substr(colonIndex + 1);
          attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
      }
      return {
        tagName,
        tagExp,
        closeIndex,
        attrExpPresent
      };
    }
    function readStopNodeData(xmlData, tagName, i) {
      const startIndex = i;
      let openTagCount = 1;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
            if (closeTagName === tagName) {
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i: closeIndex
                };
              }
            }
            i = closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, ">");
            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName) {
                openTagCount++;
              }
              i = tagData.closeIndex;
            }
          }
        }
      }
    }
    function parseValue(val, shouldParse, options) {
      if (shouldParse && typeof val === "string") {
        const newval = val.trim();
        if (newval === "true")
          return true;
        else if (newval === "false")
          return false;
        else
          return toNumber(val, options);
      } else {
        if (util.isExist(val)) {
          return val;
        } else {
          return "";
        }
      }
    }
    module2.exports = OrderedObjParser;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/node2json.js"(exports) {
    "use strict";
    function prettify(node, options) {
      return compress(node, options);
    }
    function compress(arr, options, jPath) {
      let text;
      const compressedObj = {};
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === void 0)
          newJpath = property;
        else
          newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
          if (text === void 0)
            text = tagObj[property];
          else
            text += "" + tagObj[property];
        } else if (property === void 0) {
          continue;
        } else if (tagObj[property]) {
          let val = compress(tagObj[property], options, newJpath);
          const isLeaf = isLeafTag(val, options);
          if (tagObj[":@"]) {
            assignAttributes(val, tagObj[":@"], newJpath, options);
          } else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
            val = val[options.textNodeName];
          } else if (Object.keys(val).length === 0) {
            if (options.alwaysCreateTextNode)
              val[options.textNodeName] = "";
            else
              val = "";
          }
          if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
            if (!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [compressedObj[property]];
            }
            compressedObj[property].push(val);
          } else {
            if (options.isArray(property, newJpath, isLeaf)) {
              compressedObj[property] = [val];
            } else {
              compressedObj[property] = val;
            }
          }
        }
      }
      if (typeof text === "string") {
        if (text.length > 0)
          compressedObj[options.textNodeName] = text;
      } else if (text !== void 0)
        compressedObj[options.textNodeName] = text;
      return compressedObj;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@")
          return key;
      }
    }
    function assignAttributes(obj, attrMap, jpath, options) {
      if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          const atrrName = keys[i];
          if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
            obj[atrrName] = [attrMap[atrrName]];
          } else {
            obj[atrrName] = attrMap[atrrName];
          }
        }
      }
    }
    function isLeafTag(obj, options) {
      const propCount = Object.keys(obj).length;
      if (propCount === 0 || propCount === 1 && obj[options.textNodeName])
        return true;
      return false;
    }
    exports.prettify = prettify;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/XMLParser.js"(exports, module2) {
    var { buildOptions } = require_OptionsBuilder();
    var OrderedObjParser = require_OrderedObjParser();
    var { prettify } = require_node2json();
    var validator = require_validator2();
    var XMLParser2 = class {
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {
        } else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true)
            validationOption = {};
          const result = validator.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0)
          return orderedResult;
        else
          return prettify(orderedResult, this.options);
      }
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    module2.exports = XMLParser2;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js"(exports, module2) {
    var EOL = "\n";
    function toXml(jArray, options) {
      return arrToStr(jArray, options, "", 0);
    }
    function arrToStr(arr, options, jPath, level) {
      let xmlStr = "";
      let indentation = "";
      if (options.format && options.indentBy.length > 0) {
        indentation = EOL + "" + options.indentBy.repeat(level);
      }
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        let newJPath = "";
        if (jPath.length === 0)
          newJPath = tagName;
        else
          newJPath = `${jPath}.${tagName}`;
        if (tagName === options.textNodeName) {
          let tagText = tagObj[tagName];
          if (!isStopNode(newJPath, options)) {
            tagText = options.tagValueProcessor(tagName, tagText);
            tagText = replaceEntitiesValue(tagText, options);
          }
          xmlStr += indentation + tagText;
          continue;
        } else if (tagName === options.cdataPropName) {
          xmlStr += indentation + `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
          continue;
        } else if (tagName === options.commentPropName) {
          xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
          continue;
        } else if (tagName[0] === "?") {
          const attStr2 = attr_to_str(tagObj[":@"], options);
          const tempInd = tagName === "?xml" ? "" : indentation;
          let piTextNodeName = tagObj[tagName][0][options.textNodeName];
          piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
          xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
          continue;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        let tagStart = indentation + `<${tagName}${attStr}`;
        let tagValue = arrToStr(tagObj[tagName], options, newJPath, level + 1);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
          if (options.suppressUnpairedNode)
            xmlStr += tagStart + ">";
          else
            xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
          xmlStr += tagStart + "/>";
        } else {
          xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        }
      }
      return xmlStr;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@")
          return key;
      }
    }
    function attr_to_str(attrMap, options) {
      let attrStr = "";
      if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
          let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue(attrVal, options);
          if (attrVal === true && options.suppressBooleanAttributes) {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
          } else {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
          }
        }
      }
      return attrStr;
    }
    function isStopNode(jPath, options) {
      jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
      let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
      for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName)
          return true;
      }
      return false;
    }
    function replaceEntitiesValue(textValue, options) {
      if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
          const entity = options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    module2.exports = toXml;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js"(exports, module2) {
    "use strict";
    var buildFromOrderedJs = require_orderedJs2Xml();
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a) {
        return a;
      },
      attributeValueProcessor: function(attrName, a) {
        return a;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: []
    };
    function Builder(options) {
      this.options = Object.assign({}, defaultOptions, options);
      if (this.options.ignoreAttributes || this.options.attributesGroupName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      this.processTextOrObjNode = processTextOrObjNode;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
      if (this.options.suppressEmptyNode) {
        this.buildTextNode = buildEmptyTextNode;
        this.buildObjNode = buildEmptyObjNode;
      } else {
        this.buildTextNode = buildTextValNode;
        this.buildObjNode = buildObjectNode;
      }
      this.buildTextValNode = buildTextValNode;
      this.buildObjectNode = buildObjectNode;
      this.replaceEntitiesValue = replaceEntitiesValue;
      this.buildAttrPairStr = buildAttrPairStr;
    }
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val = "";
      for (let key in jObj) {
        if (typeof jObj[key] === "undefined") {
        } else if (jObj[key] === null) {
          if (key[0] === "?")
            val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          else
            val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        } else if (jObj[key] instanceof Date) {
          val += this.buildTextNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val += this.replaceEntitiesValue(newval);
            } else {
              val += this.buildTextNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined") {
            } else if (item === null) {
              if (key[0] === "?")
                val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else
                val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              val += this.processTextOrObjNode(item, key, level);
            } else {
              val += this.buildTextNode(item, key, "", level);
            }
          }
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val += this.processTextOrObjNode(jObj[key], key, level);
          }
        }
      }
      return { attrStr, val };
    };
    function buildAttrPairStr(attrName, val) {
      val = this.options.attributeValueProcessor(attrName, "" + val);
      val = this.replaceEntitiesValue(val);
      if (this.options.suppressBooleanAttributes && val === "true") {
        return " " + attrName;
      } else
        return " " + attrName + '="' + val + '"';
    }
    function processTextOrObjNode(object, key, level) {
      const result = this.j2x(object, level + 1);
      if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
        return this.buildTextNode(object[this.options.textNodeName], key, result.attrStr, level);
      } else {
        return this.buildObjNode(result.val, key, result.attrStr, level);
      }
    }
    function buildObjectNode(val, key, attrStr, level) {
      let tagEndExp = "</" + key + this.tagEndChar;
      let piClosingChar = "";
      if (key[0] === "?") {
        piClosingChar = "?";
        tagEndExp = "";
      }
      if (attrStr && val.indexOf("<") === -1) {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val + tagEndExp;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
        return this.indentate(level) + `<!--${val}-->` + this.newLine;
      } else {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val + this.indentate(level) + tagEndExp;
      }
    }
    function buildEmptyObjNode(val, key, attrStr, level) {
      if (val !== "") {
        return this.buildObjectNode(val, key, attrStr, level);
      } else {
        if (key[0] === "?")
          return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else
          return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
      }
    }
    function buildTextValNode(val, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val}-->` + this.newLine;
      } else {
        let textValue = this.options.tagValueProcessor(key, val);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "" && this.options.unpairedTags.indexOf(key) !== -1) {
          if (this.options.suppressUnpairedNode) {
            return this.indentate(level) + "<" + key + this.tagEndChar;
          } else {
            return this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          }
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    }
    function replaceEntitiesValue(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    function buildEmptyTextNode(val, key, attrStr, level) {
      if (val === "" && this.options.unpairedTags.indexOf(key) !== -1) {
        if (this.options.suppressUnpairedNode) {
          return this.indentate(level) + "<" + key + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        }
      } else if (val !== "") {
        return this.buildTextValNode(val, key, attrStr, level);
      } else {
        if (key[0] === "?")
          return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else
          return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
      }
    }
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    function isAttribute(name2) {
      if (name2.startsWith(this.options.attributeNamePrefix)) {
        return name2.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    module2.exports = Builder;
  }
});

// node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS({
  "node_modules/fast-xml-parser/src/fxp.js"(exports, module2) {
    "use strict";
    var validator = require_validator2();
    var XMLParser2 = require_XMLParser();
    var XMLBuilder = require_json2xml();
    module2.exports = {
      XMLParser: XMLParser2,
      XMLValidator: validator,
      XMLBuilder
    };
  }
});

// node_modules/html-entities/lib/named-references.js
var require_named_references = __commonJS({
  "node_modules/html-entities/lib/named-references.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bodyRegExps = { xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html4: /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html5: /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g };
    exports.namedReferences = { xml: { entities: { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&amp;": "&" }, characters: { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;", "&": "&amp;" } }, html4: { entities: { "&apos;": "'", "&nbsp": " ", "&nbsp;": " ", "&iexcl": "¡", "&iexcl;": "¡", "&cent": "¢", "&cent;": "¢", "&pound": "£", "&pound;": "£", "&curren": "¤", "&curren;": "¤", "&yen": "¥", "&yen;": "¥", "&brvbar": "¦", "&brvbar;": "¦", "&sect": "§", "&sect;": "§", "&uml": "¨", "&uml;": "¨", "&copy": "©", "&copy;": "©", "&ordf": "ª", "&ordf;": "ª", "&laquo": "«", "&laquo;": "«", "&not": "¬", "&not;": "¬", "&shy": "­", "&shy;": "­", "&reg": "®", "&reg;": "®", "&macr": "¯", "&macr;": "¯", "&deg": "°", "&deg;": "°", "&plusmn": "±", "&plusmn;": "±", "&sup2": "²", "&sup2;": "²", "&sup3": "³", "&sup3;": "³", "&acute": "´", "&acute;": "´", "&micro": "µ", "&micro;": "µ", "&para": "¶", "&para;": "¶", "&middot": "·", "&middot;": "·", "&cedil": "¸", "&cedil;": "¸", "&sup1": "¹", "&sup1;": "¹", "&ordm": "º", "&ordm;": "º", "&raquo": "»", "&raquo;": "»", "&frac14": "¼", "&frac14;": "¼", "&frac12": "½", "&frac12;": "½", "&frac34": "¾", "&frac34;": "¾", "&iquest": "¿", "&iquest;": "¿", "&Agrave": "À", "&Agrave;": "À", "&Aacute": "Á", "&Aacute;": "Á", "&Acirc": "Â", "&Acirc;": "Â", "&Atilde": "Ã", "&Atilde;": "Ã", "&Auml": "Ä", "&Auml;": "Ä", "&Aring": "Å", "&Aring;": "Å", "&AElig": "Æ", "&AElig;": "Æ", "&Ccedil": "Ç", "&Ccedil;": "Ç", "&Egrave": "È", "&Egrave;": "È", "&Eacute": "É", "&Eacute;": "É", "&Ecirc": "Ê", "&Ecirc;": "Ê", "&Euml": "Ë", "&Euml;": "Ë", "&Igrave": "Ì", "&Igrave;": "Ì", "&Iacute": "Í", "&Iacute;": "Í", "&Icirc": "Î", "&Icirc;": "Î", "&Iuml": "Ï", "&Iuml;": "Ï", "&ETH": "Ð", "&ETH;": "Ð", "&Ntilde": "Ñ", "&Ntilde;": "Ñ", "&Ograve": "Ò", "&Ograve;": "Ò", "&Oacute": "Ó", "&Oacute;": "Ó", "&Ocirc": "Ô", "&Ocirc;": "Ô", "&Otilde": "Õ", "&Otilde;": "Õ", "&Ouml": "Ö", "&Ouml;": "Ö", "&times": "×", "&times;": "×", "&Oslash": "Ø", "&Oslash;": "Ø", "&Ugrave": "Ù", "&Ugrave;": "Ù", "&Uacute": "Ú", "&Uacute;": "Ú", "&Ucirc": "Û", "&Ucirc;": "Û", "&Uuml": "Ü", "&Uuml;": "Ü", "&Yacute": "Ý", "&Yacute;": "Ý", "&THORN": "Þ", "&THORN;": "Þ", "&szlig": "ß", "&szlig;": "ß", "&agrave": "à", "&agrave;": "à", "&aacute": "á", "&aacute;": "á", "&acirc": "â", "&acirc;": "â", "&atilde": "ã", "&atilde;": "ã", "&auml": "ä", "&auml;": "ä", "&aring": "å", "&aring;": "å", "&aelig": "æ", "&aelig;": "æ", "&ccedil": "ç", "&ccedil;": "ç", "&egrave": "è", "&egrave;": "è", "&eacute": "é", "&eacute;": "é", "&ecirc": "ê", "&ecirc;": "ê", "&euml": "ë", "&euml;": "ë", "&igrave": "ì", "&igrave;": "ì", "&iacute": "í", "&iacute;": "í", "&icirc": "î", "&icirc;": "î", "&iuml": "ï", "&iuml;": "ï", "&eth": "ð", "&eth;": "ð", "&ntilde": "ñ", "&ntilde;": "ñ", "&ograve": "ò", "&ograve;": "ò", "&oacute": "ó", "&oacute;": "ó", "&ocirc": "ô", "&ocirc;": "ô", "&otilde": "õ", "&otilde;": "õ", "&ouml": "ö", "&ouml;": "ö", "&divide": "÷", "&divide;": "÷", "&oslash": "ø", "&oslash;": "ø", "&ugrave": "ù", "&ugrave;": "ù", "&uacute": "ú", "&uacute;": "ú", "&ucirc": "û", "&ucirc;": "û", "&uuml": "ü", "&uuml;": "ü", "&yacute": "ý", "&yacute;": "ý", "&thorn": "þ", "&thorn;": "þ", "&yuml": "ÿ", "&yuml;": "ÿ", "&quot": '"', "&quot;": '"', "&amp": "&", "&amp;": "&", "&lt": "<", "&lt;": "<", "&gt": ">", "&gt;": ">", "&OElig;": "Œ", "&oelig;": "œ", "&Scaron;": "Š", "&scaron;": "š", "&Yuml;": "Ÿ", "&circ;": "ˆ", "&tilde;": "˜", "&ensp;": " ", "&emsp;": " ", "&thinsp;": " ", "&zwnj;": "‌", "&zwj;": "‍", "&lrm;": "‎", "&rlm;": "‏", "&ndash;": "–", "&mdash;": "—", "&lsquo;": "‘", "&rsquo;": "’", "&sbquo;": "‚", "&ldquo;": "“", "&rdquo;": "”", "&bdquo;": "„", "&dagger;": "†", "&Dagger;": "‡", "&permil;": "‰", "&lsaquo;": "‹", "&rsaquo;": "›", "&euro;": "€", "&fnof;": "ƒ", "&Alpha;": "Α", "&Beta;": "Β", "&Gamma;": "Γ", "&Delta;": "Δ", "&Epsilon;": "Ε", "&Zeta;": "Ζ", "&Eta;": "Η", "&Theta;": "Θ", "&Iota;": "Ι", "&Kappa;": "Κ", "&Lambda;": "Λ", "&Mu;": "Μ", "&Nu;": "Ν", "&Xi;": "Ξ", "&Omicron;": "Ο", "&Pi;": "Π", "&Rho;": "Ρ", "&Sigma;": "Σ", "&Tau;": "Τ", "&Upsilon;": "Υ", "&Phi;": "Φ", "&Chi;": "Χ", "&Psi;": "Ψ", "&Omega;": "Ω", "&alpha;": "α", "&beta;": "β", "&gamma;": "γ", "&delta;": "δ", "&epsilon;": "ε", "&zeta;": "ζ", "&eta;": "η", "&theta;": "θ", "&iota;": "ι", "&kappa;": "κ", "&lambda;": "λ", "&mu;": "μ", "&nu;": "ν", "&xi;": "ξ", "&omicron;": "ο", "&pi;": "π", "&rho;": "ρ", "&sigmaf;": "ς", "&sigma;": "σ", "&tau;": "τ", "&upsilon;": "υ", "&phi;": "φ", "&chi;": "χ", "&psi;": "ψ", "&omega;": "ω", "&thetasym;": "ϑ", "&upsih;": "ϒ", "&piv;": "ϖ", "&bull;": "•", "&hellip;": "…", "&prime;": "′", "&Prime;": "″", "&oline;": "‾", "&frasl;": "⁄", "&weierp;": "℘", "&image;": "ℑ", "&real;": "ℜ", "&trade;": "™", "&alefsym;": "ℵ", "&larr;": "←", "&uarr;": "↑", "&rarr;": "→", "&darr;": "↓", "&harr;": "↔", "&crarr;": "↵", "&lArr;": "⇐", "&uArr;": "⇑", "&rArr;": "⇒", "&dArr;": "⇓", "&hArr;": "⇔", "&forall;": "∀", "&part;": "∂", "&exist;": "∃", "&empty;": "∅", "&nabla;": "∇", "&isin;": "∈", "&notin;": "∉", "&ni;": "∋", "&prod;": "∏", "&sum;": "∑", "&minus;": "−", "&lowast;": "∗", "&radic;": "√", "&prop;": "∝", "&infin;": "∞", "&ang;": "∠", "&and;": "∧", "&or;": "∨", "&cap;": "∩", "&cup;": "∪", "&int;": "∫", "&there4;": "∴", "&sim;": "∼", "&cong;": "≅", "&asymp;": "≈", "&ne;": "≠", "&equiv;": "≡", "&le;": "≤", "&ge;": "≥", "&sub;": "⊂", "&sup;": "⊃", "&nsub;": "⊄", "&sube;": "⊆", "&supe;": "⊇", "&oplus;": "⊕", "&otimes;": "⊗", "&perp;": "⊥", "&sdot;": "⋅", "&lceil;": "⌈", "&rceil;": "⌉", "&lfloor;": "⌊", "&rfloor;": "⌋", "&lang;": "〈", "&rang;": "〉", "&loz;": "◊", "&spades;": "♠", "&clubs;": "♣", "&hearts;": "♥", "&diams;": "♦" }, characters: { "'": "&apos;", " ": "&nbsp;", "¡": "&iexcl;", "¢": "&cent;", "£": "&pound;", "¤": "&curren;", "¥": "&yen;", "¦": "&brvbar;", "§": "&sect;", "¨": "&uml;", "©": "&copy;", "ª": "&ordf;", "«": "&laquo;", "¬": "&not;", "­": "&shy;", "®": "&reg;", "¯": "&macr;", "°": "&deg;", "±": "&plusmn;", "²": "&sup2;", "³": "&sup3;", "´": "&acute;", "µ": "&micro;", "¶": "&para;", "·": "&middot;", "¸": "&cedil;", "¹": "&sup1;", "º": "&ordm;", "»": "&raquo;", "¼": "&frac14;", "½": "&frac12;", "¾": "&frac34;", "¿": "&iquest;", "À": "&Agrave;", "Á": "&Aacute;", "Â": "&Acirc;", "Ã": "&Atilde;", "Ä": "&Auml;", "Å": "&Aring;", "Æ": "&AElig;", "Ç": "&Ccedil;", "È": "&Egrave;", "É": "&Eacute;", "Ê": "&Ecirc;", "Ë": "&Euml;", "Ì": "&Igrave;", "Í": "&Iacute;", "Î": "&Icirc;", "Ï": "&Iuml;", "Ð": "&ETH;", "Ñ": "&Ntilde;", "Ò": "&Ograve;", "Ó": "&Oacute;", "Ô": "&Ocirc;", "Õ": "&Otilde;", "Ö": "&Ouml;", "×": "&times;", "Ø": "&Oslash;", "Ù": "&Ugrave;", "Ú": "&Uacute;", "Û": "&Ucirc;", "Ü": "&Uuml;", "Ý": "&Yacute;", "Þ": "&THORN;", "ß": "&szlig;", "à": "&agrave;", "á": "&aacute;", "â": "&acirc;", "ã": "&atilde;", "ä": "&auml;", "å": "&aring;", "æ": "&aelig;", "ç": "&ccedil;", "è": "&egrave;", "é": "&eacute;", "ê": "&ecirc;", "ë": "&euml;", "ì": "&igrave;", "í": "&iacute;", "î": "&icirc;", "ï": "&iuml;", "ð": "&eth;", "ñ": "&ntilde;", "ò": "&ograve;", "ó": "&oacute;", "ô": "&ocirc;", "õ": "&otilde;", "ö": "&ouml;", "÷": "&divide;", "ø": "&oslash;", "ù": "&ugrave;", "ú": "&uacute;", "û": "&ucirc;", "ü": "&uuml;", "ý": "&yacute;", "þ": "&thorn;", "ÿ": "&yuml;", '"': "&quot;", "&": "&amp;", "<": "&lt;", ">": "&gt;", "Œ": "&OElig;", "œ": "&oelig;", "Š": "&Scaron;", "š": "&scaron;", "Ÿ": "&Yuml;", "ˆ": "&circ;", "˜": "&tilde;", " ": "&ensp;", " ": "&emsp;", " ": "&thinsp;", "‌": "&zwnj;", "‍": "&zwj;", "‎": "&lrm;", "‏": "&rlm;", "–": "&ndash;", "—": "&mdash;", "‘": "&lsquo;", "’": "&rsquo;", "‚": "&sbquo;", "“": "&ldquo;", "”": "&rdquo;", "„": "&bdquo;", "†": "&dagger;", "‡": "&Dagger;", "‰": "&permil;", "‹": "&lsaquo;", "›": "&rsaquo;", "€": "&euro;", "ƒ": "&fnof;", "Α": "&Alpha;", "Β": "&Beta;", "Γ": "&Gamma;", "Δ": "&Delta;", "Ε": "&Epsilon;", "Ζ": "&Zeta;", "Η": "&Eta;", "Θ": "&Theta;", "Ι": "&Iota;", "Κ": "&Kappa;", "Λ": "&Lambda;", "Μ": "&Mu;", "Ν": "&Nu;", "Ξ": "&Xi;", "Ο": "&Omicron;", "Π": "&Pi;", "Ρ": "&Rho;", "Σ": "&Sigma;", "Τ": "&Tau;", "Υ": "&Upsilon;", "Φ": "&Phi;", "Χ": "&Chi;", "Ψ": "&Psi;", "Ω": "&Omega;", "α": "&alpha;", "β": "&beta;", "γ": "&gamma;", "δ": "&delta;", "ε": "&epsilon;", "ζ": "&zeta;", "η": "&eta;", "θ": "&theta;", "ι": "&iota;", "κ": "&kappa;", "λ": "&lambda;", "μ": "&mu;", "ν": "&nu;", "ξ": "&xi;", "ο": "&omicron;", "π": "&pi;", "ρ": "&rho;", "ς": "&sigmaf;", "σ": "&sigma;", "τ": "&tau;", "υ": "&upsilon;", "φ": "&phi;", "χ": "&chi;", "ψ": "&psi;", "ω": "&omega;", "ϑ": "&thetasym;", "ϒ": "&upsih;", "ϖ": "&piv;", "•": "&bull;", "…": "&hellip;", "′": "&prime;", "″": "&Prime;", "‾": "&oline;", "⁄": "&frasl;", "℘": "&weierp;", "ℑ": "&image;", "ℜ": "&real;", "™": "&trade;", "ℵ": "&alefsym;", "←": "&larr;", "↑": "&uarr;", "→": "&rarr;", "↓": "&darr;", "↔": "&harr;", "↵": "&crarr;", "⇐": "&lArr;", "⇑": "&uArr;", "⇒": "&rArr;", "⇓": "&dArr;", "⇔": "&hArr;", "∀": "&forall;", "∂": "&part;", "∃": "&exist;", "∅": "&empty;", "∇": "&nabla;", "∈": "&isin;", "∉": "&notin;", "∋": "&ni;", "∏": "&prod;", "∑": "&sum;", "−": "&minus;", "∗": "&lowast;", "√": "&radic;", "∝": "&prop;", "∞": "&infin;", "∠": "&ang;", "∧": "&and;", "∨": "&or;", "∩": "&cap;", "∪": "&cup;", "∫": "&int;", "∴": "&there4;", "∼": "&sim;", "≅": "&cong;", "≈": "&asymp;", "≠": "&ne;", "≡": "&equiv;", "≤": "&le;", "≥": "&ge;", "⊂": "&sub;", "⊃": "&sup;", "⊄": "&nsub;", "⊆": "&sube;", "⊇": "&supe;", "⊕": "&oplus;", "⊗": "&otimes;", "⊥": "&perp;", "⋅": "&sdot;", "⌈": "&lceil;", "⌉": "&rceil;", "⌊": "&lfloor;", "⌋": "&rfloor;", "〈": "&lang;", "〉": "&rang;", "◊": "&loz;", "♠": "&spades;", "♣": "&clubs;", "♥": "&hearts;", "♦": "&diams;" } }, html5: { entities: { "&AElig": "Æ", "&AElig;": "Æ", "&AMP": "&", "&AMP;": "&", "&Aacute": "Á", "&Aacute;": "Á", "&Abreve;": "Ă", "&Acirc": "Â", "&Acirc;": "Â", "&Acy;": "А", "&Afr;": "𝔄", "&Agrave": "À", "&Agrave;": "À", "&Alpha;": "Α", "&Amacr;": "Ā", "&And;": "⩓", "&Aogon;": "Ą", "&Aopf;": "𝔸", "&ApplyFunction;": "⁡", "&Aring": "Å", "&Aring;": "Å", "&Ascr;": "𝒜", "&Assign;": "≔", "&Atilde": "Ã", "&Atilde;": "Ã", "&Auml": "Ä", "&Auml;": "Ä", "&Backslash;": "∖", "&Barv;": "⫧", "&Barwed;": "⌆", "&Bcy;": "Б", "&Because;": "∵", "&Bernoullis;": "ℬ", "&Beta;": "Β", "&Bfr;": "𝔅", "&Bopf;": "𝔹", "&Breve;": "˘", "&Bscr;": "ℬ", "&Bumpeq;": "≎", "&CHcy;": "Ч", "&COPY": "©", "&COPY;": "©", "&Cacute;": "Ć", "&Cap;": "⋒", "&CapitalDifferentialD;": "ⅅ", "&Cayleys;": "ℭ", "&Ccaron;": "Č", "&Ccedil": "Ç", "&Ccedil;": "Ç", "&Ccirc;": "Ĉ", "&Cconint;": "∰", "&Cdot;": "Ċ", "&Cedilla;": "¸", "&CenterDot;": "·", "&Cfr;": "ℭ", "&Chi;": "Χ", "&CircleDot;": "⊙", "&CircleMinus;": "⊖", "&CirclePlus;": "⊕", "&CircleTimes;": "⊗", "&ClockwiseContourIntegral;": "∲", "&CloseCurlyDoubleQuote;": "”", "&CloseCurlyQuote;": "’", "&Colon;": "∷", "&Colone;": "⩴", "&Congruent;": "≡", "&Conint;": "∯", "&ContourIntegral;": "∮", "&Copf;": "ℂ", "&Coproduct;": "∐", "&CounterClockwiseContourIntegral;": "∳", "&Cross;": "⨯", "&Cscr;": "𝒞", "&Cup;": "⋓", "&CupCap;": "≍", "&DD;": "ⅅ", "&DDotrahd;": "⤑", "&DJcy;": "Ђ", "&DScy;": "Ѕ", "&DZcy;": "Џ", "&Dagger;": "‡", "&Darr;": "↡", "&Dashv;": "⫤", "&Dcaron;": "Ď", "&Dcy;": "Д", "&Del;": "∇", "&Delta;": "Δ", "&Dfr;": "𝔇", "&DiacriticalAcute;": "´", "&DiacriticalDot;": "˙", "&DiacriticalDoubleAcute;": "˝", "&DiacriticalGrave;": "`", "&DiacriticalTilde;": "˜", "&Diamond;": "⋄", "&DifferentialD;": "ⅆ", "&Dopf;": "𝔻", "&Dot;": "¨", "&DotDot;": "⃜", "&DotEqual;": "≐", "&DoubleContourIntegral;": "∯", "&DoubleDot;": "¨", "&DoubleDownArrow;": "⇓", "&DoubleLeftArrow;": "⇐", "&DoubleLeftRightArrow;": "⇔", "&DoubleLeftTee;": "⫤", "&DoubleLongLeftArrow;": "⟸", "&DoubleLongLeftRightArrow;": "⟺", "&DoubleLongRightArrow;": "⟹", "&DoubleRightArrow;": "⇒", "&DoubleRightTee;": "⊨", "&DoubleUpArrow;": "⇑", "&DoubleUpDownArrow;": "⇕", "&DoubleVerticalBar;": "∥", "&DownArrow;": "↓", "&DownArrowBar;": "⤓", "&DownArrowUpArrow;": "⇵", "&DownBreve;": "̑", "&DownLeftRightVector;": "⥐", "&DownLeftTeeVector;": "⥞", "&DownLeftVector;": "↽", "&DownLeftVectorBar;": "⥖", "&DownRightTeeVector;": "⥟", "&DownRightVector;": "⇁", "&DownRightVectorBar;": "⥗", "&DownTee;": "⊤", "&DownTeeArrow;": "↧", "&Downarrow;": "⇓", "&Dscr;": "𝒟", "&Dstrok;": "Đ", "&ENG;": "Ŋ", "&ETH": "Ð", "&ETH;": "Ð", "&Eacute": "É", "&Eacute;": "É", "&Ecaron;": "Ě", "&Ecirc": "Ê", "&Ecirc;": "Ê", "&Ecy;": "Э", "&Edot;": "Ė", "&Efr;": "𝔈", "&Egrave": "È", "&Egrave;": "È", "&Element;": "∈", "&Emacr;": "Ē", "&EmptySmallSquare;": "◻", "&EmptyVerySmallSquare;": "▫", "&Eogon;": "Ę", "&Eopf;": "𝔼", "&Epsilon;": "Ε", "&Equal;": "⩵", "&EqualTilde;": "≂", "&Equilibrium;": "⇌", "&Escr;": "ℰ", "&Esim;": "⩳", "&Eta;": "Η", "&Euml": "Ë", "&Euml;": "Ë", "&Exists;": "∃", "&ExponentialE;": "ⅇ", "&Fcy;": "Ф", "&Ffr;": "𝔉", "&FilledSmallSquare;": "◼", "&FilledVerySmallSquare;": "▪", "&Fopf;": "𝔽", "&ForAll;": "∀", "&Fouriertrf;": "ℱ", "&Fscr;": "ℱ", "&GJcy;": "Ѓ", "&GT": ">", "&GT;": ">", "&Gamma;": "Γ", "&Gammad;": "Ϝ", "&Gbreve;": "Ğ", "&Gcedil;": "Ģ", "&Gcirc;": "Ĝ", "&Gcy;": "Г", "&Gdot;": "Ġ", "&Gfr;": "𝔊", "&Gg;": "⋙", "&Gopf;": "𝔾", "&GreaterEqual;": "≥", "&GreaterEqualLess;": "⋛", "&GreaterFullEqual;": "≧", "&GreaterGreater;": "⪢", "&GreaterLess;": "≷", "&GreaterSlantEqual;": "⩾", "&GreaterTilde;": "≳", "&Gscr;": "𝒢", "&Gt;": "≫", "&HARDcy;": "Ъ", "&Hacek;": "ˇ", "&Hat;": "^", "&Hcirc;": "Ĥ", "&Hfr;": "ℌ", "&HilbertSpace;": "ℋ", "&Hopf;": "ℍ", "&HorizontalLine;": "─", "&Hscr;": "ℋ", "&Hstrok;": "Ħ", "&HumpDownHump;": "≎", "&HumpEqual;": "≏", "&IEcy;": "Е", "&IJlig;": "Ĳ", "&IOcy;": "Ё", "&Iacute": "Í", "&Iacute;": "Í", "&Icirc": "Î", "&Icirc;": "Î", "&Icy;": "И", "&Idot;": "İ", "&Ifr;": "ℑ", "&Igrave": "Ì", "&Igrave;": "Ì", "&Im;": "ℑ", "&Imacr;": "Ī", "&ImaginaryI;": "ⅈ", "&Implies;": "⇒", "&Int;": "∬", "&Integral;": "∫", "&Intersection;": "⋂", "&InvisibleComma;": "⁣", "&InvisibleTimes;": "⁢", "&Iogon;": "Į", "&Iopf;": "𝕀", "&Iota;": "Ι", "&Iscr;": "ℐ", "&Itilde;": "Ĩ", "&Iukcy;": "І", "&Iuml": "Ï", "&Iuml;": "Ï", "&Jcirc;": "Ĵ", "&Jcy;": "Й", "&Jfr;": "𝔍", "&Jopf;": "𝕁", "&Jscr;": "𝒥", "&Jsercy;": "Ј", "&Jukcy;": "Є", "&KHcy;": "Х", "&KJcy;": "Ќ", "&Kappa;": "Κ", "&Kcedil;": "Ķ", "&Kcy;": "К", "&Kfr;": "𝔎", "&Kopf;": "𝕂", "&Kscr;": "𝒦", "&LJcy;": "Љ", "&LT": "<", "&LT;": "<", "&Lacute;": "Ĺ", "&Lambda;": "Λ", "&Lang;": "⟪", "&Laplacetrf;": "ℒ", "&Larr;": "↞", "&Lcaron;": "Ľ", "&Lcedil;": "Ļ", "&Lcy;": "Л", "&LeftAngleBracket;": "⟨", "&LeftArrow;": "←", "&LeftArrowBar;": "⇤", "&LeftArrowRightArrow;": "⇆", "&LeftCeiling;": "⌈", "&LeftDoubleBracket;": "⟦", "&LeftDownTeeVector;": "⥡", "&LeftDownVector;": "⇃", "&LeftDownVectorBar;": "⥙", "&LeftFloor;": "⌊", "&LeftRightArrow;": "↔", "&LeftRightVector;": "⥎", "&LeftTee;": "⊣", "&LeftTeeArrow;": "↤", "&LeftTeeVector;": "⥚", "&LeftTriangle;": "⊲", "&LeftTriangleBar;": "⧏", "&LeftTriangleEqual;": "⊴", "&LeftUpDownVector;": "⥑", "&LeftUpTeeVector;": "⥠", "&LeftUpVector;": "↿", "&LeftUpVectorBar;": "⥘", "&LeftVector;": "↼", "&LeftVectorBar;": "⥒", "&Leftarrow;": "⇐", "&Leftrightarrow;": "⇔", "&LessEqualGreater;": "⋚", "&LessFullEqual;": "≦", "&LessGreater;": "≶", "&LessLess;": "⪡", "&LessSlantEqual;": "⩽", "&LessTilde;": "≲", "&Lfr;": "𝔏", "&Ll;": "⋘", "&Lleftarrow;": "⇚", "&Lmidot;": "Ŀ", "&LongLeftArrow;": "⟵", "&LongLeftRightArrow;": "⟷", "&LongRightArrow;": "⟶", "&Longleftarrow;": "⟸", "&Longleftrightarrow;": "⟺", "&Longrightarrow;": "⟹", "&Lopf;": "𝕃", "&LowerLeftArrow;": "↙", "&LowerRightArrow;": "↘", "&Lscr;": "ℒ", "&Lsh;": "↰", "&Lstrok;": "Ł", "&Lt;": "≪", "&Map;": "⤅", "&Mcy;": "М", "&MediumSpace;": " ", "&Mellintrf;": "ℳ", "&Mfr;": "𝔐", "&MinusPlus;": "∓", "&Mopf;": "𝕄", "&Mscr;": "ℳ", "&Mu;": "Μ", "&NJcy;": "Њ", "&Nacute;": "Ń", "&Ncaron;": "Ň", "&Ncedil;": "Ņ", "&Ncy;": "Н", "&NegativeMediumSpace;": "​", "&NegativeThickSpace;": "​", "&NegativeThinSpace;": "​", "&NegativeVeryThinSpace;": "​", "&NestedGreaterGreater;": "≫", "&NestedLessLess;": "≪", "&NewLine;": "\n", "&Nfr;": "𝔑", "&NoBreak;": "⁠", "&NonBreakingSpace;": " ", "&Nopf;": "ℕ", "&Not;": "⫬", "&NotCongruent;": "≢", "&NotCupCap;": "≭", "&NotDoubleVerticalBar;": "∦", "&NotElement;": "∉", "&NotEqual;": "≠", "&NotEqualTilde;": "≂̸", "&NotExists;": "∄", "&NotGreater;": "≯", "&NotGreaterEqual;": "≱", "&NotGreaterFullEqual;": "≧̸", "&NotGreaterGreater;": "≫̸", "&NotGreaterLess;": "≹", "&NotGreaterSlantEqual;": "⩾̸", "&NotGreaterTilde;": "≵", "&NotHumpDownHump;": "≎̸", "&NotHumpEqual;": "≏̸", "&NotLeftTriangle;": "⋪", "&NotLeftTriangleBar;": "⧏̸", "&NotLeftTriangleEqual;": "⋬", "&NotLess;": "≮", "&NotLessEqual;": "≰", "&NotLessGreater;": "≸", "&NotLessLess;": "≪̸", "&NotLessSlantEqual;": "⩽̸", "&NotLessTilde;": "≴", "&NotNestedGreaterGreater;": "⪢̸", "&NotNestedLessLess;": "⪡̸", "&NotPrecedes;": "⊀", "&NotPrecedesEqual;": "⪯̸", "&NotPrecedesSlantEqual;": "⋠", "&NotReverseElement;": "∌", "&NotRightTriangle;": "⋫", "&NotRightTriangleBar;": "⧐̸", "&NotRightTriangleEqual;": "⋭", "&NotSquareSubset;": "⊏̸", "&NotSquareSubsetEqual;": "⋢", "&NotSquareSuperset;": "⊐̸", "&NotSquareSupersetEqual;": "⋣", "&NotSubset;": "⊂⃒", "&NotSubsetEqual;": "⊈", "&NotSucceeds;": "⊁", "&NotSucceedsEqual;": "⪰̸", "&NotSucceedsSlantEqual;": "⋡", "&NotSucceedsTilde;": "≿̸", "&NotSuperset;": "⊃⃒", "&NotSupersetEqual;": "⊉", "&NotTilde;": "≁", "&NotTildeEqual;": "≄", "&NotTildeFullEqual;": "≇", "&NotTildeTilde;": "≉", "&NotVerticalBar;": "∤", "&Nscr;": "𝒩", "&Ntilde": "Ñ", "&Ntilde;": "Ñ", "&Nu;": "Ν", "&OElig;": "Œ", "&Oacute": "Ó", "&Oacute;": "Ó", "&Ocirc": "Ô", "&Ocirc;": "Ô", "&Ocy;": "О", "&Odblac;": "Ő", "&Ofr;": "𝔒", "&Ograve": "Ò", "&Ograve;": "Ò", "&Omacr;": "Ō", "&Omega;": "Ω", "&Omicron;": "Ο", "&Oopf;": "𝕆", "&OpenCurlyDoubleQuote;": "“", "&OpenCurlyQuote;": "‘", "&Or;": "⩔", "&Oscr;": "𝒪", "&Oslash": "Ø", "&Oslash;": "Ø", "&Otilde": "Õ", "&Otilde;": "Õ", "&Otimes;": "⨷", "&Ouml": "Ö", "&Ouml;": "Ö", "&OverBar;": "‾", "&OverBrace;": "⏞", "&OverBracket;": "⎴", "&OverParenthesis;": "⏜", "&PartialD;": "∂", "&Pcy;": "П", "&Pfr;": "𝔓", "&Phi;": "Φ", "&Pi;": "Π", "&PlusMinus;": "±", "&Poincareplane;": "ℌ", "&Popf;": "ℙ", "&Pr;": "⪻", "&Precedes;": "≺", "&PrecedesEqual;": "⪯", "&PrecedesSlantEqual;": "≼", "&PrecedesTilde;": "≾", "&Prime;": "″", "&Product;": "∏", "&Proportion;": "∷", "&Proportional;": "∝", "&Pscr;": "𝒫", "&Psi;": "Ψ", "&QUOT": '"', "&QUOT;": '"', "&Qfr;": "𝔔", "&Qopf;": "ℚ", "&Qscr;": "𝒬", "&RBarr;": "⤐", "&REG": "®", "&REG;": "®", "&Racute;": "Ŕ", "&Rang;": "⟫", "&Rarr;": "↠", "&Rarrtl;": "⤖", "&Rcaron;": "Ř", "&Rcedil;": "Ŗ", "&Rcy;": "Р", "&Re;": "ℜ", "&ReverseElement;": "∋", "&ReverseEquilibrium;": "⇋", "&ReverseUpEquilibrium;": "⥯", "&Rfr;": "ℜ", "&Rho;": "Ρ", "&RightAngleBracket;": "⟩", "&RightArrow;": "→", "&RightArrowBar;": "⇥", "&RightArrowLeftArrow;": "⇄", "&RightCeiling;": "⌉", "&RightDoubleBracket;": "⟧", "&RightDownTeeVector;": "⥝", "&RightDownVector;": "⇂", "&RightDownVectorBar;": "⥕", "&RightFloor;": "⌋", "&RightTee;": "⊢", "&RightTeeArrow;": "↦", "&RightTeeVector;": "⥛", "&RightTriangle;": "⊳", "&RightTriangleBar;": "⧐", "&RightTriangleEqual;": "⊵", "&RightUpDownVector;": "⥏", "&RightUpTeeVector;": "⥜", "&RightUpVector;": "↾", "&RightUpVectorBar;": "⥔", "&RightVector;": "⇀", "&RightVectorBar;": "⥓", "&Rightarrow;": "⇒", "&Ropf;": "ℝ", "&RoundImplies;": "⥰", "&Rrightarrow;": "⇛", "&Rscr;": "ℛ", "&Rsh;": "↱", "&RuleDelayed;": "⧴", "&SHCHcy;": "Щ", "&SHcy;": "Ш", "&SOFTcy;": "Ь", "&Sacute;": "Ś", "&Sc;": "⪼", "&Scaron;": "Š", "&Scedil;": "Ş", "&Scirc;": "Ŝ", "&Scy;": "С", "&Sfr;": "𝔖", "&ShortDownArrow;": "↓", "&ShortLeftArrow;": "←", "&ShortRightArrow;": "→", "&ShortUpArrow;": "↑", "&Sigma;": "Σ", "&SmallCircle;": "∘", "&Sopf;": "𝕊", "&Sqrt;": "√", "&Square;": "□", "&SquareIntersection;": "⊓", "&SquareSubset;": "⊏", "&SquareSubsetEqual;": "⊑", "&SquareSuperset;": "⊐", "&SquareSupersetEqual;": "⊒", "&SquareUnion;": "⊔", "&Sscr;": "𝒮", "&Star;": "⋆", "&Sub;": "⋐", "&Subset;": "⋐", "&SubsetEqual;": "⊆", "&Succeeds;": "≻", "&SucceedsEqual;": "⪰", "&SucceedsSlantEqual;": "≽", "&SucceedsTilde;": "≿", "&SuchThat;": "∋", "&Sum;": "∑", "&Sup;": "⋑", "&Superset;": "⊃", "&SupersetEqual;": "⊇", "&Supset;": "⋑", "&THORN": "Þ", "&THORN;": "Þ", "&TRADE;": "™", "&TSHcy;": "Ћ", "&TScy;": "Ц", "&Tab;": "	", "&Tau;": "Τ", "&Tcaron;": "Ť", "&Tcedil;": "Ţ", "&Tcy;": "Т", "&Tfr;": "𝔗", "&Therefore;": "∴", "&Theta;": "Θ", "&ThickSpace;": "  ", "&ThinSpace;": " ", "&Tilde;": "∼", "&TildeEqual;": "≃", "&TildeFullEqual;": "≅", "&TildeTilde;": "≈", "&Topf;": "𝕋", "&TripleDot;": "⃛", "&Tscr;": "𝒯", "&Tstrok;": "Ŧ", "&Uacute": "Ú", "&Uacute;": "Ú", "&Uarr;": "↟", "&Uarrocir;": "⥉", "&Ubrcy;": "Ў", "&Ubreve;": "Ŭ", "&Ucirc": "Û", "&Ucirc;": "Û", "&Ucy;": "У", "&Udblac;": "Ű", "&Ufr;": "𝔘", "&Ugrave": "Ù", "&Ugrave;": "Ù", "&Umacr;": "Ū", "&UnderBar;": "_", "&UnderBrace;": "⏟", "&UnderBracket;": "⎵", "&UnderParenthesis;": "⏝", "&Union;": "⋃", "&UnionPlus;": "⊎", "&Uogon;": "Ų", "&Uopf;": "𝕌", "&UpArrow;": "↑", "&UpArrowBar;": "⤒", "&UpArrowDownArrow;": "⇅", "&UpDownArrow;": "↕", "&UpEquilibrium;": "⥮", "&UpTee;": "⊥", "&UpTeeArrow;": "↥", "&Uparrow;": "⇑", "&Updownarrow;": "⇕", "&UpperLeftArrow;": "↖", "&UpperRightArrow;": "↗", "&Upsi;": "ϒ", "&Upsilon;": "Υ", "&Uring;": "Ů", "&Uscr;": "𝒰", "&Utilde;": "Ũ", "&Uuml": "Ü", "&Uuml;": "Ü", "&VDash;": "⊫", "&Vbar;": "⫫", "&Vcy;": "В", "&Vdash;": "⊩", "&Vdashl;": "⫦", "&Vee;": "⋁", "&Verbar;": "‖", "&Vert;": "‖", "&VerticalBar;": "∣", "&VerticalLine;": "|", "&VerticalSeparator;": "❘", "&VerticalTilde;": "≀", "&VeryThinSpace;": " ", "&Vfr;": "𝔙", "&Vopf;": "𝕍", "&Vscr;": "𝒱", "&Vvdash;": "⊪", "&Wcirc;": "Ŵ", "&Wedge;": "⋀", "&Wfr;": "𝔚", "&Wopf;": "𝕎", "&Wscr;": "𝒲", "&Xfr;": "𝔛", "&Xi;": "Ξ", "&Xopf;": "𝕏", "&Xscr;": "𝒳", "&YAcy;": "Я", "&YIcy;": "Ї", "&YUcy;": "Ю", "&Yacute": "Ý", "&Yacute;": "Ý", "&Ycirc;": "Ŷ", "&Ycy;": "Ы", "&Yfr;": "𝔜", "&Yopf;": "𝕐", "&Yscr;": "𝒴", "&Yuml;": "Ÿ", "&ZHcy;": "Ж", "&Zacute;": "Ź", "&Zcaron;": "Ž", "&Zcy;": "З", "&Zdot;": "Ż", "&ZeroWidthSpace;": "​", "&Zeta;": "Ζ", "&Zfr;": "ℨ", "&Zopf;": "ℤ", "&Zscr;": "𝒵", "&aacute": "á", "&aacute;": "á", "&abreve;": "ă", "&ac;": "∾", "&acE;": "∾̳", "&acd;": "∿", "&acirc": "â", "&acirc;": "â", "&acute": "´", "&acute;": "´", "&acy;": "а", "&aelig": "æ", "&aelig;": "æ", "&af;": "⁡", "&afr;": "𝔞", "&agrave": "à", "&agrave;": "à", "&alefsym;": "ℵ", "&aleph;": "ℵ", "&alpha;": "α", "&amacr;": "ā", "&amalg;": "⨿", "&amp": "&", "&amp;": "&", "&and;": "∧", "&andand;": "⩕", "&andd;": "⩜", "&andslope;": "⩘", "&andv;": "⩚", "&ang;": "∠", "&ange;": "⦤", "&angle;": "∠", "&angmsd;": "∡", "&angmsdaa;": "⦨", "&angmsdab;": "⦩", "&angmsdac;": "⦪", "&angmsdad;": "⦫", "&angmsdae;": "⦬", "&angmsdaf;": "⦭", "&angmsdag;": "⦮", "&angmsdah;": "⦯", "&angrt;": "∟", "&angrtvb;": "⊾", "&angrtvbd;": "⦝", "&angsph;": "∢", "&angst;": "Å", "&angzarr;": "⍼", "&aogon;": "ą", "&aopf;": "𝕒", "&ap;": "≈", "&apE;": "⩰", "&apacir;": "⩯", "&ape;": "≊", "&apid;": "≋", "&apos;": "'", "&approx;": "≈", "&approxeq;": "≊", "&aring": "å", "&aring;": "å", "&ascr;": "𝒶", "&ast;": "*", "&asymp;": "≈", "&asympeq;": "≍", "&atilde": "ã", "&atilde;": "ã", "&auml": "ä", "&auml;": "ä", "&awconint;": "∳", "&awint;": "⨑", "&bNot;": "⫭", "&backcong;": "≌", "&backepsilon;": "϶", "&backprime;": "‵", "&backsim;": "∽", "&backsimeq;": "⋍", "&barvee;": "⊽", "&barwed;": "⌅", "&barwedge;": "⌅", "&bbrk;": "⎵", "&bbrktbrk;": "⎶", "&bcong;": "≌", "&bcy;": "б", "&bdquo;": "„", "&becaus;": "∵", "&because;": "∵", "&bemptyv;": "⦰", "&bepsi;": "϶", "&bernou;": "ℬ", "&beta;": "β", "&beth;": "ℶ", "&between;": "≬", "&bfr;": "𝔟", "&bigcap;": "⋂", "&bigcirc;": "◯", "&bigcup;": "⋃", "&bigodot;": "⨀", "&bigoplus;": "⨁", "&bigotimes;": "⨂", "&bigsqcup;": "⨆", "&bigstar;": "★", "&bigtriangledown;": "▽", "&bigtriangleup;": "△", "&biguplus;": "⨄", "&bigvee;": "⋁", "&bigwedge;": "⋀", "&bkarow;": "⤍", "&blacklozenge;": "⧫", "&blacksquare;": "▪", "&blacktriangle;": "▴", "&blacktriangledown;": "▾", "&blacktriangleleft;": "◂", "&blacktriangleright;": "▸", "&blank;": "␣", "&blk12;": "▒", "&blk14;": "░", "&blk34;": "▓", "&block;": "█", "&bne;": "=⃥", "&bnequiv;": "≡⃥", "&bnot;": "⌐", "&bopf;": "𝕓", "&bot;": "⊥", "&bottom;": "⊥", "&bowtie;": "⋈", "&boxDL;": "╗", "&boxDR;": "╔", "&boxDl;": "╖", "&boxDr;": "╓", "&boxH;": "═", "&boxHD;": "╦", "&boxHU;": "╩", "&boxHd;": "╤", "&boxHu;": "╧", "&boxUL;": "╝", "&boxUR;": "╚", "&boxUl;": "╜", "&boxUr;": "╙", "&boxV;": "║", "&boxVH;": "╬", "&boxVL;": "╣", "&boxVR;": "╠", "&boxVh;": "╫", "&boxVl;": "╢", "&boxVr;": "╟", "&boxbox;": "⧉", "&boxdL;": "╕", "&boxdR;": "╒", "&boxdl;": "┐", "&boxdr;": "┌", "&boxh;": "─", "&boxhD;": "╥", "&boxhU;": "╨", "&boxhd;": "┬", "&boxhu;": "┴", "&boxminus;": "⊟", "&boxplus;": "⊞", "&boxtimes;": "⊠", "&boxuL;": "╛", "&boxuR;": "╘", "&boxul;": "┘", "&boxur;": "└", "&boxv;": "│", "&boxvH;": "╪", "&boxvL;": "╡", "&boxvR;": "╞", "&boxvh;": "┼", "&boxvl;": "┤", "&boxvr;": "├", "&bprime;": "‵", "&breve;": "˘", "&brvbar": "¦", "&brvbar;": "¦", "&bscr;": "𝒷", "&bsemi;": "⁏", "&bsim;": "∽", "&bsime;": "⋍", "&bsol;": "\\", "&bsolb;": "⧅", "&bsolhsub;": "⟈", "&bull;": "•", "&bullet;": "•", "&bump;": "≎", "&bumpE;": "⪮", "&bumpe;": "≏", "&bumpeq;": "≏", "&cacute;": "ć", "&cap;": "∩", "&capand;": "⩄", "&capbrcup;": "⩉", "&capcap;": "⩋", "&capcup;": "⩇", "&capdot;": "⩀", "&caps;": "∩︀", "&caret;": "⁁", "&caron;": "ˇ", "&ccaps;": "⩍", "&ccaron;": "č", "&ccedil": "ç", "&ccedil;": "ç", "&ccirc;": "ĉ", "&ccups;": "⩌", "&ccupssm;": "⩐", "&cdot;": "ċ", "&cedil": "¸", "&cedil;": "¸", "&cemptyv;": "⦲", "&cent": "¢", "&cent;": "¢", "&centerdot;": "·", "&cfr;": "𝔠", "&chcy;": "ч", "&check;": "✓", "&checkmark;": "✓", "&chi;": "χ", "&cir;": "○", "&cirE;": "⧃", "&circ;": "ˆ", "&circeq;": "≗", "&circlearrowleft;": "↺", "&circlearrowright;": "↻", "&circledR;": "®", "&circledS;": "Ⓢ", "&circledast;": "⊛", "&circledcirc;": "⊚", "&circleddash;": "⊝", "&cire;": "≗", "&cirfnint;": "⨐", "&cirmid;": "⫯", "&cirscir;": "⧂", "&clubs;": "♣", "&clubsuit;": "♣", "&colon;": ":", "&colone;": "≔", "&coloneq;": "≔", "&comma;": ",", "&commat;": "@", "&comp;": "∁", "&compfn;": "∘", "&complement;": "∁", "&complexes;": "ℂ", "&cong;": "≅", "&congdot;": "⩭", "&conint;": "∮", "&copf;": "𝕔", "&coprod;": "∐", "&copy": "©", "&copy;": "©", "&copysr;": "℗", "&crarr;": "↵", "&cross;": "✗", "&cscr;": "𝒸", "&csub;": "⫏", "&csube;": "⫑", "&csup;": "⫐", "&csupe;": "⫒", "&ctdot;": "⋯", "&cudarrl;": "⤸", "&cudarrr;": "⤵", "&cuepr;": "⋞", "&cuesc;": "⋟", "&cularr;": "↶", "&cularrp;": "⤽", "&cup;": "∪", "&cupbrcap;": "⩈", "&cupcap;": "⩆", "&cupcup;": "⩊", "&cupdot;": "⊍", "&cupor;": "⩅", "&cups;": "∪︀", "&curarr;": "↷", "&curarrm;": "⤼", "&curlyeqprec;": "⋞", "&curlyeqsucc;": "⋟", "&curlyvee;": "⋎", "&curlywedge;": "⋏", "&curren": "¤", "&curren;": "¤", "&curvearrowleft;": "↶", "&curvearrowright;": "↷", "&cuvee;": "⋎", "&cuwed;": "⋏", "&cwconint;": "∲", "&cwint;": "∱", "&cylcty;": "⌭", "&dArr;": "⇓", "&dHar;": "⥥", "&dagger;": "†", "&daleth;": "ℸ", "&darr;": "↓", "&dash;": "‐", "&dashv;": "⊣", "&dbkarow;": "⤏", "&dblac;": "˝", "&dcaron;": "ď", "&dcy;": "д", "&dd;": "ⅆ", "&ddagger;": "‡", "&ddarr;": "⇊", "&ddotseq;": "⩷", "&deg": "°", "&deg;": "°", "&delta;": "δ", "&demptyv;": "⦱", "&dfisht;": "⥿", "&dfr;": "𝔡", "&dharl;": "⇃", "&dharr;": "⇂", "&diam;": "⋄", "&diamond;": "⋄", "&diamondsuit;": "♦", "&diams;": "♦", "&die;": "¨", "&digamma;": "ϝ", "&disin;": "⋲", "&div;": "÷", "&divide": "÷", "&divide;": "÷", "&divideontimes;": "⋇", "&divonx;": "⋇", "&djcy;": "ђ", "&dlcorn;": "⌞", "&dlcrop;": "⌍", "&dollar;": "$", "&dopf;": "𝕕", "&dot;": "˙", "&doteq;": "≐", "&doteqdot;": "≑", "&dotminus;": "∸", "&dotplus;": "∔", "&dotsquare;": "⊡", "&doublebarwedge;": "⌆", "&downarrow;": "↓", "&downdownarrows;": "⇊", "&downharpoonleft;": "⇃", "&downharpoonright;": "⇂", "&drbkarow;": "⤐", "&drcorn;": "⌟", "&drcrop;": "⌌", "&dscr;": "𝒹", "&dscy;": "ѕ", "&dsol;": "⧶", "&dstrok;": "đ", "&dtdot;": "⋱", "&dtri;": "▿", "&dtrif;": "▾", "&duarr;": "⇵", "&duhar;": "⥯", "&dwangle;": "⦦", "&dzcy;": "џ", "&dzigrarr;": "⟿", "&eDDot;": "⩷", "&eDot;": "≑", "&eacute": "é", "&eacute;": "é", "&easter;": "⩮", "&ecaron;": "ě", "&ecir;": "≖", "&ecirc": "ê", "&ecirc;": "ê", "&ecolon;": "≕", "&ecy;": "э", "&edot;": "ė", "&ee;": "ⅇ", "&efDot;": "≒", "&efr;": "𝔢", "&eg;": "⪚", "&egrave": "è", "&egrave;": "è", "&egs;": "⪖", "&egsdot;": "⪘", "&el;": "⪙", "&elinters;": "⏧", "&ell;": "ℓ", "&els;": "⪕", "&elsdot;": "⪗", "&emacr;": "ē", "&empty;": "∅", "&emptyset;": "∅", "&emptyv;": "∅", "&emsp13;": " ", "&emsp14;": " ", "&emsp;": " ", "&eng;": "ŋ", "&ensp;": " ", "&eogon;": "ę", "&eopf;": "𝕖", "&epar;": "⋕", "&eparsl;": "⧣", "&eplus;": "⩱", "&epsi;": "ε", "&epsilon;": "ε", "&epsiv;": "ϵ", "&eqcirc;": "≖", "&eqcolon;": "≕", "&eqsim;": "≂", "&eqslantgtr;": "⪖", "&eqslantless;": "⪕", "&equals;": "=", "&equest;": "≟", "&equiv;": "≡", "&equivDD;": "⩸", "&eqvparsl;": "⧥", "&erDot;": "≓", "&erarr;": "⥱", "&escr;": "ℯ", "&esdot;": "≐", "&esim;": "≂", "&eta;": "η", "&eth": "ð", "&eth;": "ð", "&euml": "ë", "&euml;": "ë", "&euro;": "€", "&excl;": "!", "&exist;": "∃", "&expectation;": "ℰ", "&exponentiale;": "ⅇ", "&fallingdotseq;": "≒", "&fcy;": "ф", "&female;": "♀", "&ffilig;": "ﬃ", "&fflig;": "ﬀ", "&ffllig;": "ﬄ", "&ffr;": "𝔣", "&filig;": "ﬁ", "&fjlig;": "fj", "&flat;": "♭", "&fllig;": "ﬂ", "&fltns;": "▱", "&fnof;": "ƒ", "&fopf;": "𝕗", "&forall;": "∀", "&fork;": "⋔", "&forkv;": "⫙", "&fpartint;": "⨍", "&frac12": "½", "&frac12;": "½", "&frac13;": "⅓", "&frac14": "¼", "&frac14;": "¼", "&frac15;": "⅕", "&frac16;": "⅙", "&frac18;": "⅛", "&frac23;": "⅔", "&frac25;": "⅖", "&frac34": "¾", "&frac34;": "¾", "&frac35;": "⅗", "&frac38;": "⅜", "&frac45;": "⅘", "&frac56;": "⅚", "&frac58;": "⅝", "&frac78;": "⅞", "&frasl;": "⁄", "&frown;": "⌢", "&fscr;": "𝒻", "&gE;": "≧", "&gEl;": "⪌", "&gacute;": "ǵ", "&gamma;": "γ", "&gammad;": "ϝ", "&gap;": "⪆", "&gbreve;": "ğ", "&gcirc;": "ĝ", "&gcy;": "г", "&gdot;": "ġ", "&ge;": "≥", "&gel;": "⋛", "&geq;": "≥", "&geqq;": "≧", "&geqslant;": "⩾", "&ges;": "⩾", "&gescc;": "⪩", "&gesdot;": "⪀", "&gesdoto;": "⪂", "&gesdotol;": "⪄", "&gesl;": "⋛︀", "&gesles;": "⪔", "&gfr;": "𝔤", "&gg;": "≫", "&ggg;": "⋙", "&gimel;": "ℷ", "&gjcy;": "ѓ", "&gl;": "≷", "&glE;": "⪒", "&gla;": "⪥", "&glj;": "⪤", "&gnE;": "≩", "&gnap;": "⪊", "&gnapprox;": "⪊", "&gne;": "⪈", "&gneq;": "⪈", "&gneqq;": "≩", "&gnsim;": "⋧", "&gopf;": "𝕘", "&grave;": "`", "&gscr;": "ℊ", "&gsim;": "≳", "&gsime;": "⪎", "&gsiml;": "⪐", "&gt": ">", "&gt;": ">", "&gtcc;": "⪧", "&gtcir;": "⩺", "&gtdot;": "⋗", "&gtlPar;": "⦕", "&gtquest;": "⩼", "&gtrapprox;": "⪆", "&gtrarr;": "⥸", "&gtrdot;": "⋗", "&gtreqless;": "⋛", "&gtreqqless;": "⪌", "&gtrless;": "≷", "&gtrsim;": "≳", "&gvertneqq;": "≩︀", "&gvnE;": "≩︀", "&hArr;": "⇔", "&hairsp;": " ", "&half;": "½", "&hamilt;": "ℋ", "&hardcy;": "ъ", "&harr;": "↔", "&harrcir;": "⥈", "&harrw;": "↭", "&hbar;": "ℏ", "&hcirc;": "ĥ", "&hearts;": "♥", "&heartsuit;": "♥", "&hellip;": "…", "&hercon;": "⊹", "&hfr;": "𝔥", "&hksearow;": "⤥", "&hkswarow;": "⤦", "&hoarr;": "⇿", "&homtht;": "∻", "&hookleftarrow;": "↩", "&hookrightarrow;": "↪", "&hopf;": "𝕙", "&horbar;": "―", "&hscr;": "𝒽", "&hslash;": "ℏ", "&hstrok;": "ħ", "&hybull;": "⁃", "&hyphen;": "‐", "&iacute": "í", "&iacute;": "í", "&ic;": "⁣", "&icirc": "î", "&icirc;": "î", "&icy;": "и", "&iecy;": "е", "&iexcl": "¡", "&iexcl;": "¡", "&iff;": "⇔", "&ifr;": "𝔦", "&igrave": "ì", "&igrave;": "ì", "&ii;": "ⅈ", "&iiiint;": "⨌", "&iiint;": "∭", "&iinfin;": "⧜", "&iiota;": "℩", "&ijlig;": "ĳ", "&imacr;": "ī", "&image;": "ℑ", "&imagline;": "ℐ", "&imagpart;": "ℑ", "&imath;": "ı", "&imof;": "⊷", "&imped;": "Ƶ", "&in;": "∈", "&incare;": "℅", "&infin;": "∞", "&infintie;": "⧝", "&inodot;": "ı", "&int;": "∫", "&intcal;": "⊺", "&integers;": "ℤ", "&intercal;": "⊺", "&intlarhk;": "⨗", "&intprod;": "⨼", "&iocy;": "ё", "&iogon;": "į", "&iopf;": "𝕚", "&iota;": "ι", "&iprod;": "⨼", "&iquest": "¿", "&iquest;": "¿", "&iscr;": "𝒾", "&isin;": "∈", "&isinE;": "⋹", "&isindot;": "⋵", "&isins;": "⋴", "&isinsv;": "⋳", "&isinv;": "∈", "&it;": "⁢", "&itilde;": "ĩ", "&iukcy;": "і", "&iuml": "ï", "&iuml;": "ï", "&jcirc;": "ĵ", "&jcy;": "й", "&jfr;": "𝔧", "&jmath;": "ȷ", "&jopf;": "𝕛", "&jscr;": "𝒿", "&jsercy;": "ј", "&jukcy;": "є", "&kappa;": "κ", "&kappav;": "ϰ", "&kcedil;": "ķ", "&kcy;": "к", "&kfr;": "𝔨", "&kgreen;": "ĸ", "&khcy;": "х", "&kjcy;": "ќ", "&kopf;": "𝕜", "&kscr;": "𝓀", "&lAarr;": "⇚", "&lArr;": "⇐", "&lAtail;": "⤛", "&lBarr;": "⤎", "&lE;": "≦", "&lEg;": "⪋", "&lHar;": "⥢", "&lacute;": "ĺ", "&laemptyv;": "⦴", "&lagran;": "ℒ", "&lambda;": "λ", "&lang;": "⟨", "&langd;": "⦑", "&langle;": "⟨", "&lap;": "⪅", "&laquo": "«", "&laquo;": "«", "&larr;": "←", "&larrb;": "⇤", "&larrbfs;": "⤟", "&larrfs;": "⤝", "&larrhk;": "↩", "&larrlp;": "↫", "&larrpl;": "⤹", "&larrsim;": "⥳", "&larrtl;": "↢", "&lat;": "⪫", "&latail;": "⤙", "&late;": "⪭", "&lates;": "⪭︀", "&lbarr;": "⤌", "&lbbrk;": "❲", "&lbrace;": "{", "&lbrack;": "[", "&lbrke;": "⦋", "&lbrksld;": "⦏", "&lbrkslu;": "⦍", "&lcaron;": "ľ", "&lcedil;": "ļ", "&lceil;": "⌈", "&lcub;": "{", "&lcy;": "л", "&ldca;": "⤶", "&ldquo;": "“", "&ldquor;": "„", "&ldrdhar;": "⥧", "&ldrushar;": "⥋", "&ldsh;": "↲", "&le;": "≤", "&leftarrow;": "←", "&leftarrowtail;": "↢", "&leftharpoondown;": "↽", "&leftharpoonup;": "↼", "&leftleftarrows;": "⇇", "&leftrightarrow;": "↔", "&leftrightarrows;": "⇆", "&leftrightharpoons;": "⇋", "&leftrightsquigarrow;": "↭", "&leftthreetimes;": "⋋", "&leg;": "⋚", "&leq;": "≤", "&leqq;": "≦", "&leqslant;": "⩽", "&les;": "⩽", "&lescc;": "⪨", "&lesdot;": "⩿", "&lesdoto;": "⪁", "&lesdotor;": "⪃", "&lesg;": "⋚︀", "&lesges;": "⪓", "&lessapprox;": "⪅", "&lessdot;": "⋖", "&lesseqgtr;": "⋚", "&lesseqqgtr;": "⪋", "&lessgtr;": "≶", "&lesssim;": "≲", "&lfisht;": "⥼", "&lfloor;": "⌊", "&lfr;": "𝔩", "&lg;": "≶", "&lgE;": "⪑", "&lhard;": "↽", "&lharu;": "↼", "&lharul;": "⥪", "&lhblk;": "▄", "&ljcy;": "љ", "&ll;": "≪", "&llarr;": "⇇", "&llcorner;": "⌞", "&llhard;": "⥫", "&lltri;": "◺", "&lmidot;": "ŀ", "&lmoust;": "⎰", "&lmoustache;": "⎰", "&lnE;": "≨", "&lnap;": "⪉", "&lnapprox;": "⪉", "&lne;": "⪇", "&lneq;": "⪇", "&lneqq;": "≨", "&lnsim;": "⋦", "&loang;": "⟬", "&loarr;": "⇽", "&lobrk;": "⟦", "&longleftarrow;": "⟵", "&longleftrightarrow;": "⟷", "&longmapsto;": "⟼", "&longrightarrow;": "⟶", "&looparrowleft;": "↫", "&looparrowright;": "↬", "&lopar;": "⦅", "&lopf;": "𝕝", "&loplus;": "⨭", "&lotimes;": "⨴", "&lowast;": "∗", "&lowbar;": "_", "&loz;": "◊", "&lozenge;": "◊", "&lozf;": "⧫", "&lpar;": "(", "&lparlt;": "⦓", "&lrarr;": "⇆", "&lrcorner;": "⌟", "&lrhar;": "⇋", "&lrhard;": "⥭", "&lrm;": "‎", "&lrtri;": "⊿", "&lsaquo;": "‹", "&lscr;": "𝓁", "&lsh;": "↰", "&lsim;": "≲", "&lsime;": "⪍", "&lsimg;": "⪏", "&lsqb;": "[", "&lsquo;": "‘", "&lsquor;": "‚", "&lstrok;": "ł", "&lt": "<", "&lt;": "<", "&ltcc;": "⪦", "&ltcir;": "⩹", "&ltdot;": "⋖", "&lthree;": "⋋", "&ltimes;": "⋉", "&ltlarr;": "⥶", "&ltquest;": "⩻", "&ltrPar;": "⦖", "&ltri;": "◃", "&ltrie;": "⊴", "&ltrif;": "◂", "&lurdshar;": "⥊", "&luruhar;": "⥦", "&lvertneqq;": "≨︀", "&lvnE;": "≨︀", "&mDDot;": "∺", "&macr": "¯", "&macr;": "¯", "&male;": "♂", "&malt;": "✠", "&maltese;": "✠", "&map;": "↦", "&mapsto;": "↦", "&mapstodown;": "↧", "&mapstoleft;": "↤", "&mapstoup;": "↥", "&marker;": "▮", "&mcomma;": "⨩", "&mcy;": "м", "&mdash;": "—", "&measuredangle;": "∡", "&mfr;": "𝔪", "&mho;": "℧", "&micro": "µ", "&micro;": "µ", "&mid;": "∣", "&midast;": "*", "&midcir;": "⫰", "&middot": "·", "&middot;": "·", "&minus;": "−", "&minusb;": "⊟", "&minusd;": "∸", "&minusdu;": "⨪", "&mlcp;": "⫛", "&mldr;": "…", "&mnplus;": "∓", "&models;": "⊧", "&mopf;": "𝕞", "&mp;": "∓", "&mscr;": "𝓂", "&mstpos;": "∾", "&mu;": "μ", "&multimap;": "⊸", "&mumap;": "⊸", "&nGg;": "⋙̸", "&nGt;": "≫⃒", "&nGtv;": "≫̸", "&nLeftarrow;": "⇍", "&nLeftrightarrow;": "⇎", "&nLl;": "⋘̸", "&nLt;": "≪⃒", "&nLtv;": "≪̸", "&nRightarrow;": "⇏", "&nVDash;": "⊯", "&nVdash;": "⊮", "&nabla;": "∇", "&nacute;": "ń", "&nang;": "∠⃒", "&nap;": "≉", "&napE;": "⩰̸", "&napid;": "≋̸", "&napos;": "ŉ", "&napprox;": "≉", "&natur;": "♮", "&natural;": "♮", "&naturals;": "ℕ", "&nbsp": " ", "&nbsp;": " ", "&nbump;": "≎̸", "&nbumpe;": "≏̸", "&ncap;": "⩃", "&ncaron;": "ň", "&ncedil;": "ņ", "&ncong;": "≇", "&ncongdot;": "⩭̸", "&ncup;": "⩂", "&ncy;": "н", "&ndash;": "–", "&ne;": "≠", "&neArr;": "⇗", "&nearhk;": "⤤", "&nearr;": "↗", "&nearrow;": "↗", "&nedot;": "≐̸", "&nequiv;": "≢", "&nesear;": "⤨", "&nesim;": "≂̸", "&nexist;": "∄", "&nexists;": "∄", "&nfr;": "𝔫", "&ngE;": "≧̸", "&nge;": "≱", "&ngeq;": "≱", "&ngeqq;": "≧̸", "&ngeqslant;": "⩾̸", "&nges;": "⩾̸", "&ngsim;": "≵", "&ngt;": "≯", "&ngtr;": "≯", "&nhArr;": "⇎", "&nharr;": "↮", "&nhpar;": "⫲", "&ni;": "∋", "&nis;": "⋼", "&nisd;": "⋺", "&niv;": "∋", "&njcy;": "њ", "&nlArr;": "⇍", "&nlE;": "≦̸", "&nlarr;": "↚", "&nldr;": "‥", "&nle;": "≰", "&nleftarrow;": "↚", "&nleftrightarrow;": "↮", "&nleq;": "≰", "&nleqq;": "≦̸", "&nleqslant;": "⩽̸", "&nles;": "⩽̸", "&nless;": "≮", "&nlsim;": "≴", "&nlt;": "≮", "&nltri;": "⋪", "&nltrie;": "⋬", "&nmid;": "∤", "&nopf;": "𝕟", "&not": "¬", "&not;": "¬", "&notin;": "∉", "&notinE;": "⋹̸", "&notindot;": "⋵̸", "&notinva;": "∉", "&notinvb;": "⋷", "&notinvc;": "⋶", "&notni;": "∌", "&notniva;": "∌", "&notnivb;": "⋾", "&notnivc;": "⋽", "&npar;": "∦", "&nparallel;": "∦", "&nparsl;": "⫽⃥", "&npart;": "∂̸", "&npolint;": "⨔", "&npr;": "⊀", "&nprcue;": "⋠", "&npre;": "⪯̸", "&nprec;": "⊀", "&npreceq;": "⪯̸", "&nrArr;": "⇏", "&nrarr;": "↛", "&nrarrc;": "⤳̸", "&nrarrw;": "↝̸", "&nrightarrow;": "↛", "&nrtri;": "⋫", "&nrtrie;": "⋭", "&nsc;": "⊁", "&nsccue;": "⋡", "&nsce;": "⪰̸", "&nscr;": "𝓃", "&nshortmid;": "∤", "&nshortparallel;": "∦", "&nsim;": "≁", "&nsime;": "≄", "&nsimeq;": "≄", "&nsmid;": "∤", "&nspar;": "∦", "&nsqsube;": "⋢", "&nsqsupe;": "⋣", "&nsub;": "⊄", "&nsubE;": "⫅̸", "&nsube;": "⊈", "&nsubset;": "⊂⃒", "&nsubseteq;": "⊈", "&nsubseteqq;": "⫅̸", "&nsucc;": "⊁", "&nsucceq;": "⪰̸", "&nsup;": "⊅", "&nsupE;": "⫆̸", "&nsupe;": "⊉", "&nsupset;": "⊃⃒", "&nsupseteq;": "⊉", "&nsupseteqq;": "⫆̸", "&ntgl;": "≹", "&ntilde": "ñ", "&ntilde;": "ñ", "&ntlg;": "≸", "&ntriangleleft;": "⋪", "&ntrianglelefteq;": "⋬", "&ntriangleright;": "⋫", "&ntrianglerighteq;": "⋭", "&nu;": "ν", "&num;": "#", "&numero;": "№", "&numsp;": " ", "&nvDash;": "⊭", "&nvHarr;": "⤄", "&nvap;": "≍⃒", "&nvdash;": "⊬", "&nvge;": "≥⃒", "&nvgt;": ">⃒", "&nvinfin;": "⧞", "&nvlArr;": "⤂", "&nvle;": "≤⃒", "&nvlt;": "<⃒", "&nvltrie;": "⊴⃒", "&nvrArr;": "⤃", "&nvrtrie;": "⊵⃒", "&nvsim;": "∼⃒", "&nwArr;": "⇖", "&nwarhk;": "⤣", "&nwarr;": "↖", "&nwarrow;": "↖", "&nwnear;": "⤧", "&oS;": "Ⓢ", "&oacute": "ó", "&oacute;": "ó", "&oast;": "⊛", "&ocir;": "⊚", "&ocirc": "ô", "&ocirc;": "ô", "&ocy;": "о", "&odash;": "⊝", "&odblac;": "ő", "&odiv;": "⨸", "&odot;": "⊙", "&odsold;": "⦼", "&oelig;": "œ", "&ofcir;": "⦿", "&ofr;": "𝔬", "&ogon;": "˛", "&ograve": "ò", "&ograve;": "ò", "&ogt;": "⧁", "&ohbar;": "⦵", "&ohm;": "Ω", "&oint;": "∮", "&olarr;": "↺", "&olcir;": "⦾", "&olcross;": "⦻", "&oline;": "‾", "&olt;": "⧀", "&omacr;": "ō", "&omega;": "ω", "&omicron;": "ο", "&omid;": "⦶", "&ominus;": "⊖", "&oopf;": "𝕠", "&opar;": "⦷", "&operp;": "⦹", "&oplus;": "⊕", "&or;": "∨", "&orarr;": "↻", "&ord;": "⩝", "&order;": "ℴ", "&orderof;": "ℴ", "&ordf": "ª", "&ordf;": "ª", "&ordm": "º", "&ordm;": "º", "&origof;": "⊶", "&oror;": "⩖", "&orslope;": "⩗", "&orv;": "⩛", "&oscr;": "ℴ", "&oslash": "ø", "&oslash;": "ø", "&osol;": "⊘", "&otilde": "õ", "&otilde;": "õ", "&otimes;": "⊗", "&otimesas;": "⨶", "&ouml": "ö", "&ouml;": "ö", "&ovbar;": "⌽", "&par;": "∥", "&para": "¶", "&para;": "¶", "&parallel;": "∥", "&parsim;": "⫳", "&parsl;": "⫽", "&part;": "∂", "&pcy;": "п", "&percnt;": "%", "&period;": ".", "&permil;": "‰", "&perp;": "⊥", "&pertenk;": "‱", "&pfr;": "𝔭", "&phi;": "φ", "&phiv;": "ϕ", "&phmmat;": "ℳ", "&phone;": "☎", "&pi;": "π", "&pitchfork;": "⋔", "&piv;": "ϖ", "&planck;": "ℏ", "&planckh;": "ℎ", "&plankv;": "ℏ", "&plus;": "+", "&plusacir;": "⨣", "&plusb;": "⊞", "&pluscir;": "⨢", "&plusdo;": "∔", "&plusdu;": "⨥", "&pluse;": "⩲", "&plusmn": "±", "&plusmn;": "±", "&plussim;": "⨦", "&plustwo;": "⨧", "&pm;": "±", "&pointint;": "⨕", "&popf;": "𝕡", "&pound": "£", "&pound;": "£", "&pr;": "≺", "&prE;": "⪳", "&prap;": "⪷", "&prcue;": "≼", "&pre;": "⪯", "&prec;": "≺", "&precapprox;": "⪷", "&preccurlyeq;": "≼", "&preceq;": "⪯", "&precnapprox;": "⪹", "&precneqq;": "⪵", "&precnsim;": "⋨", "&precsim;": "≾", "&prime;": "′", "&primes;": "ℙ", "&prnE;": "⪵", "&prnap;": "⪹", "&prnsim;": "⋨", "&prod;": "∏", "&profalar;": "⌮", "&profline;": "⌒", "&profsurf;": "⌓", "&prop;": "∝", "&propto;": "∝", "&prsim;": "≾", "&prurel;": "⊰", "&pscr;": "𝓅", "&psi;": "ψ", "&puncsp;": " ", "&qfr;": "𝔮", "&qint;": "⨌", "&qopf;": "𝕢", "&qprime;": "⁗", "&qscr;": "𝓆", "&quaternions;": "ℍ", "&quatint;": "⨖", "&quest;": "?", "&questeq;": "≟", "&quot": '"', "&quot;": '"', "&rAarr;": "⇛", "&rArr;": "⇒", "&rAtail;": "⤜", "&rBarr;": "⤏", "&rHar;": "⥤", "&race;": "∽̱", "&racute;": "ŕ", "&radic;": "√", "&raemptyv;": "⦳", "&rang;": "⟩", "&rangd;": "⦒", "&range;": "⦥", "&rangle;": "⟩", "&raquo": "»", "&raquo;": "»", "&rarr;": "→", "&rarrap;": "⥵", "&rarrb;": "⇥", "&rarrbfs;": "⤠", "&rarrc;": "⤳", "&rarrfs;": "⤞", "&rarrhk;": "↪", "&rarrlp;": "↬", "&rarrpl;": "⥅", "&rarrsim;": "⥴", "&rarrtl;": "↣", "&rarrw;": "↝", "&ratail;": "⤚", "&ratio;": "∶", "&rationals;": "ℚ", "&rbarr;": "⤍", "&rbbrk;": "❳", "&rbrace;": "}", "&rbrack;": "]", "&rbrke;": "⦌", "&rbrksld;": "⦎", "&rbrkslu;": "⦐", "&rcaron;": "ř", "&rcedil;": "ŗ", "&rceil;": "⌉", "&rcub;": "}", "&rcy;": "р", "&rdca;": "⤷", "&rdldhar;": "⥩", "&rdquo;": "”", "&rdquor;": "”", "&rdsh;": "↳", "&real;": "ℜ", "&realine;": "ℛ", "&realpart;": "ℜ", "&reals;": "ℝ", "&rect;": "▭", "&reg": "®", "&reg;": "®", "&rfisht;": "⥽", "&rfloor;": "⌋", "&rfr;": "𝔯", "&rhard;": "⇁", "&rharu;": "⇀", "&rharul;": "⥬", "&rho;": "ρ", "&rhov;": "ϱ", "&rightarrow;": "→", "&rightarrowtail;": "↣", "&rightharpoondown;": "⇁", "&rightharpoonup;": "⇀", "&rightleftarrows;": "⇄", "&rightleftharpoons;": "⇌", "&rightrightarrows;": "⇉", "&rightsquigarrow;": "↝", "&rightthreetimes;": "⋌", "&ring;": "˚", "&risingdotseq;": "≓", "&rlarr;": "⇄", "&rlhar;": "⇌", "&rlm;": "‏", "&rmoust;": "⎱", "&rmoustache;": "⎱", "&rnmid;": "⫮", "&roang;": "⟭", "&roarr;": "⇾", "&robrk;": "⟧", "&ropar;": "⦆", "&ropf;": "𝕣", "&roplus;": "⨮", "&rotimes;": "⨵", "&rpar;": ")", "&rpargt;": "⦔", "&rppolint;": "⨒", "&rrarr;": "⇉", "&rsaquo;": "›", "&rscr;": "𝓇", "&rsh;": "↱", "&rsqb;": "]", "&rsquo;": "’", "&rsquor;": "’", "&rthree;": "⋌", "&rtimes;": "⋊", "&rtri;": "▹", "&rtrie;": "⊵", "&rtrif;": "▸", "&rtriltri;": "⧎", "&ruluhar;": "⥨", "&rx;": "℞", "&sacute;": "ś", "&sbquo;": "‚", "&sc;": "≻", "&scE;": "⪴", "&scap;": "⪸", "&scaron;": "š", "&sccue;": "≽", "&sce;": "⪰", "&scedil;": "ş", "&scirc;": "ŝ", "&scnE;": "⪶", "&scnap;": "⪺", "&scnsim;": "⋩", "&scpolint;": "⨓", "&scsim;": "≿", "&scy;": "с", "&sdot;": "⋅", "&sdotb;": "⊡", "&sdote;": "⩦", "&seArr;": "⇘", "&searhk;": "⤥", "&searr;": "↘", "&searrow;": "↘", "&sect": "§", "&sect;": "§", "&semi;": ";", "&seswar;": "⤩", "&setminus;": "∖", "&setmn;": "∖", "&sext;": "✶", "&sfr;": "𝔰", "&sfrown;": "⌢", "&sharp;": "♯", "&shchcy;": "щ", "&shcy;": "ш", "&shortmid;": "∣", "&shortparallel;": "∥", "&shy": "­", "&shy;": "­", "&sigma;": "σ", "&sigmaf;": "ς", "&sigmav;": "ς", "&sim;": "∼", "&simdot;": "⩪", "&sime;": "≃", "&simeq;": "≃", "&simg;": "⪞", "&simgE;": "⪠", "&siml;": "⪝", "&simlE;": "⪟", "&simne;": "≆", "&simplus;": "⨤", "&simrarr;": "⥲", "&slarr;": "←", "&smallsetminus;": "∖", "&smashp;": "⨳", "&smeparsl;": "⧤", "&smid;": "∣", "&smile;": "⌣", "&smt;": "⪪", "&smte;": "⪬", "&smtes;": "⪬︀", "&softcy;": "ь", "&sol;": "/", "&solb;": "⧄", "&solbar;": "⌿", "&sopf;": "𝕤", "&spades;": "♠", "&spadesuit;": "♠", "&spar;": "∥", "&sqcap;": "⊓", "&sqcaps;": "⊓︀", "&sqcup;": "⊔", "&sqcups;": "⊔︀", "&sqsub;": "⊏", "&sqsube;": "⊑", "&sqsubset;": "⊏", "&sqsubseteq;": "⊑", "&sqsup;": "⊐", "&sqsupe;": "⊒", "&sqsupset;": "⊐", "&sqsupseteq;": "⊒", "&squ;": "□", "&square;": "□", "&squarf;": "▪", "&squf;": "▪", "&srarr;": "→", "&sscr;": "𝓈", "&ssetmn;": "∖", "&ssmile;": "⌣", "&sstarf;": "⋆", "&star;": "☆", "&starf;": "★", "&straightepsilon;": "ϵ", "&straightphi;": "ϕ", "&strns;": "¯", "&sub;": "⊂", "&subE;": "⫅", "&subdot;": "⪽", "&sube;": "⊆", "&subedot;": "⫃", "&submult;": "⫁", "&subnE;": "⫋", "&subne;": "⊊", "&subplus;": "⪿", "&subrarr;": "⥹", "&subset;": "⊂", "&subseteq;": "⊆", "&subseteqq;": "⫅", "&subsetneq;": "⊊", "&subsetneqq;": "⫋", "&subsim;": "⫇", "&subsub;": "⫕", "&subsup;": "⫓", "&succ;": "≻", "&succapprox;": "⪸", "&succcurlyeq;": "≽", "&succeq;": "⪰", "&succnapprox;": "⪺", "&succneqq;": "⪶", "&succnsim;": "⋩", "&succsim;": "≿", "&sum;": "∑", "&sung;": "♪", "&sup1": "¹", "&sup1;": "¹", "&sup2": "²", "&sup2;": "²", "&sup3": "³", "&sup3;": "³", "&sup;": "⊃", "&supE;": "⫆", "&supdot;": "⪾", "&supdsub;": "⫘", "&supe;": "⊇", "&supedot;": "⫄", "&suphsol;": "⟉", "&suphsub;": "⫗", "&suplarr;": "⥻", "&supmult;": "⫂", "&supnE;": "⫌", "&supne;": "⊋", "&supplus;": "⫀", "&supset;": "⊃", "&supseteq;": "⊇", "&supseteqq;": "⫆", "&supsetneq;": "⊋", "&supsetneqq;": "⫌", "&supsim;": "⫈", "&supsub;": "⫔", "&supsup;": "⫖", "&swArr;": "⇙", "&swarhk;": "⤦", "&swarr;": "↙", "&swarrow;": "↙", "&swnwar;": "⤪", "&szlig": "ß", "&szlig;": "ß", "&target;": "⌖", "&tau;": "τ", "&tbrk;": "⎴", "&tcaron;": "ť", "&tcedil;": "ţ", "&tcy;": "т", "&tdot;": "⃛", "&telrec;": "⌕", "&tfr;": "𝔱", "&there4;": "∴", "&therefore;": "∴", "&theta;": "θ", "&thetasym;": "ϑ", "&thetav;": "ϑ", "&thickapprox;": "≈", "&thicksim;": "∼", "&thinsp;": " ", "&thkap;": "≈", "&thksim;": "∼", "&thorn": "þ", "&thorn;": "þ", "&tilde;": "˜", "&times": "×", "&times;": "×", "&timesb;": "⊠", "&timesbar;": "⨱", "&timesd;": "⨰", "&tint;": "∭", "&toea;": "⤨", "&top;": "⊤", "&topbot;": "⌶", "&topcir;": "⫱", "&topf;": "𝕥", "&topfork;": "⫚", "&tosa;": "⤩", "&tprime;": "‴", "&trade;": "™", "&triangle;": "▵", "&triangledown;": "▿", "&triangleleft;": "◃", "&trianglelefteq;": "⊴", "&triangleq;": "≜", "&triangleright;": "▹", "&trianglerighteq;": "⊵", "&tridot;": "◬", "&trie;": "≜", "&triminus;": "⨺", "&triplus;": "⨹", "&trisb;": "⧍", "&tritime;": "⨻", "&trpezium;": "⏢", "&tscr;": "𝓉", "&tscy;": "ц", "&tshcy;": "ћ", "&tstrok;": "ŧ", "&twixt;": "≬", "&twoheadleftarrow;": "↞", "&twoheadrightarrow;": "↠", "&uArr;": "⇑", "&uHar;": "⥣", "&uacute": "ú", "&uacute;": "ú", "&uarr;": "↑", "&ubrcy;": "ў", "&ubreve;": "ŭ", "&ucirc": "û", "&ucirc;": "û", "&ucy;": "у", "&udarr;": "⇅", "&udblac;": "ű", "&udhar;": "⥮", "&ufisht;": "⥾", "&ufr;": "𝔲", "&ugrave": "ù", "&ugrave;": "ù", "&uharl;": "↿", "&uharr;": "↾", "&uhblk;": "▀", "&ulcorn;": "⌜", "&ulcorner;": "⌜", "&ulcrop;": "⌏", "&ultri;": "◸", "&umacr;": "ū", "&uml": "¨", "&uml;": "¨", "&uogon;": "ų", "&uopf;": "𝕦", "&uparrow;": "↑", "&updownarrow;": "↕", "&upharpoonleft;": "↿", "&upharpoonright;": "↾", "&uplus;": "⊎", "&upsi;": "υ", "&upsih;": "ϒ", "&upsilon;": "υ", "&upuparrows;": "⇈", "&urcorn;": "⌝", "&urcorner;": "⌝", "&urcrop;": "⌎", "&uring;": "ů", "&urtri;": "◹", "&uscr;": "𝓊", "&utdot;": "⋰", "&utilde;": "ũ", "&utri;": "▵", "&utrif;": "▴", "&uuarr;": "⇈", "&uuml": "ü", "&uuml;": "ü", "&uwangle;": "⦧", "&vArr;": "⇕", "&vBar;": "⫨", "&vBarv;": "⫩", "&vDash;": "⊨", "&vangrt;": "⦜", "&varepsilon;": "ϵ", "&varkappa;": "ϰ", "&varnothing;": "∅", "&varphi;": "ϕ", "&varpi;": "ϖ", "&varpropto;": "∝", "&varr;": "↕", "&varrho;": "ϱ", "&varsigma;": "ς", "&varsubsetneq;": "⊊︀", "&varsubsetneqq;": "⫋︀", "&varsupsetneq;": "⊋︀", "&varsupsetneqq;": "⫌︀", "&vartheta;": "ϑ", "&vartriangleleft;": "⊲", "&vartriangleright;": "⊳", "&vcy;": "в", "&vdash;": "⊢", "&vee;": "∨", "&veebar;": "⊻", "&veeeq;": "≚", "&vellip;": "⋮", "&verbar;": "|", "&vert;": "|", "&vfr;": "𝔳", "&vltri;": "⊲", "&vnsub;": "⊂⃒", "&vnsup;": "⊃⃒", "&vopf;": "𝕧", "&vprop;": "∝", "&vrtri;": "⊳", "&vscr;": "𝓋", "&vsubnE;": "⫋︀", "&vsubne;": "⊊︀", "&vsupnE;": "⫌︀", "&vsupne;": "⊋︀", "&vzigzag;": "⦚", "&wcirc;": "ŵ", "&wedbar;": "⩟", "&wedge;": "∧", "&wedgeq;": "≙", "&weierp;": "℘", "&wfr;": "𝔴", "&wopf;": "𝕨", "&wp;": "℘", "&wr;": "≀", "&wreath;": "≀", "&wscr;": "𝓌", "&xcap;": "⋂", "&xcirc;": "◯", "&xcup;": "⋃", "&xdtri;": "▽", "&xfr;": "𝔵", "&xhArr;": "⟺", "&xharr;": "⟷", "&xi;": "ξ", "&xlArr;": "⟸", "&xlarr;": "⟵", "&xmap;": "⟼", "&xnis;": "⋻", "&xodot;": "⨀", "&xopf;": "𝕩", "&xoplus;": "⨁", "&xotime;": "⨂", "&xrArr;": "⟹", "&xrarr;": "⟶", "&xscr;": "𝓍", "&xsqcup;": "⨆", "&xuplus;": "⨄", "&xutri;": "△", "&xvee;": "⋁", "&xwedge;": "⋀", "&yacute": "ý", "&yacute;": "ý", "&yacy;": "я", "&ycirc;": "ŷ", "&ycy;": "ы", "&yen": "¥", "&yen;": "¥", "&yfr;": "𝔶", "&yicy;": "ї", "&yopf;": "𝕪", "&yscr;": "𝓎", "&yucy;": "ю", "&yuml": "ÿ", "&yuml;": "ÿ", "&zacute;": "ź", "&zcaron;": "ž", "&zcy;": "з", "&zdot;": "ż", "&zeetrf;": "ℨ", "&zeta;": "ζ", "&zfr;": "𝔷", "&zhcy;": "ж", "&zigrarr;": "⇝", "&zopf;": "𝕫", "&zscr;": "𝓏", "&zwj;": "‍", "&zwnj;": "‌" }, characters: { "Æ": "&AElig;", "&": "&amp;", "Á": "&Aacute;", "Ă": "&Abreve;", "Â": "&Acirc;", "А": "&Acy;", "𝔄": "&Afr;", "À": "&Agrave;", "Α": "&Alpha;", "Ā": "&Amacr;", "⩓": "&And;", "Ą": "&Aogon;", "𝔸": "&Aopf;", "⁡": "&af;", "Å": "&angst;", "𝒜": "&Ascr;", "≔": "&coloneq;", "Ã": "&Atilde;", "Ä": "&Auml;", "∖": "&ssetmn;", "⫧": "&Barv;", "⌆": "&doublebarwedge;", "Б": "&Bcy;", "∵": "&because;", "ℬ": "&bernou;", "Β": "&Beta;", "𝔅": "&Bfr;", "𝔹": "&Bopf;", "˘": "&breve;", "≎": "&bump;", "Ч": "&CHcy;", "©": "&copy;", "Ć": "&Cacute;", "⋒": "&Cap;", "ⅅ": "&DD;", "ℭ": "&Cfr;", "Č": "&Ccaron;", "Ç": "&Ccedil;", "Ĉ": "&Ccirc;", "∰": "&Cconint;", "Ċ": "&Cdot;", "¸": "&cedil;", "·": "&middot;", "Χ": "&Chi;", "⊙": "&odot;", "⊖": "&ominus;", "⊕": "&oplus;", "⊗": "&otimes;", "∲": "&cwconint;", "”": "&rdquor;", "’": "&rsquor;", "∷": "&Proportion;", "⩴": "&Colone;", "≡": "&equiv;", "∯": "&DoubleContourIntegral;", "∮": "&oint;", "ℂ": "&complexes;", "∐": "&coprod;", "∳": "&awconint;", "⨯": "&Cross;", "𝒞": "&Cscr;", "⋓": "&Cup;", "≍": "&asympeq;", "⤑": "&DDotrahd;", "Ђ": "&DJcy;", "Ѕ": "&DScy;", "Џ": "&DZcy;", "‡": "&ddagger;", "↡": "&Darr;", "⫤": "&DoubleLeftTee;", "Ď": "&Dcaron;", "Д": "&Dcy;", "∇": "&nabla;", "Δ": "&Delta;", "𝔇": "&Dfr;", "´": "&acute;", "˙": "&dot;", "˝": "&dblac;", "`": "&grave;", "˜": "&tilde;", "⋄": "&diamond;", "ⅆ": "&dd;", "𝔻": "&Dopf;", "¨": "&uml;", "⃜": "&DotDot;", "≐": "&esdot;", "⇓": "&dArr;", "⇐": "&lArr;", "⇔": "&iff;", "⟸": "&xlArr;", "⟺": "&xhArr;", "⟹": "&xrArr;", "⇒": "&rArr;", "⊨": "&vDash;", "⇑": "&uArr;", "⇕": "&vArr;", "∥": "&spar;", "↓": "&downarrow;", "⤓": "&DownArrowBar;", "⇵": "&duarr;", "̑": "&DownBreve;", "⥐": "&DownLeftRightVector;", "⥞": "&DownLeftTeeVector;", "↽": "&lhard;", "⥖": "&DownLeftVectorBar;", "⥟": "&DownRightTeeVector;", "⇁": "&rightharpoondown;", "⥗": "&DownRightVectorBar;", "⊤": "&top;", "↧": "&mapstodown;", "𝒟": "&Dscr;", "Đ": "&Dstrok;", "Ŋ": "&ENG;", "Ð": "&ETH;", "É": "&Eacute;", "Ě": "&Ecaron;", "Ê": "&Ecirc;", "Э": "&Ecy;", "Ė": "&Edot;", "𝔈": "&Efr;", "È": "&Egrave;", "∈": "&isinv;", "Ē": "&Emacr;", "◻": "&EmptySmallSquare;", "▫": "&EmptyVerySmallSquare;", "Ę": "&Eogon;", "𝔼": "&Eopf;", "Ε": "&Epsilon;", "⩵": "&Equal;", "≂": "&esim;", "⇌": "&rlhar;", "ℰ": "&expectation;", "⩳": "&Esim;", "Η": "&Eta;", "Ë": "&Euml;", "∃": "&exist;", "ⅇ": "&exponentiale;", "Ф": "&Fcy;", "𝔉": "&Ffr;", "◼": "&FilledSmallSquare;", "▪": "&squf;", "𝔽": "&Fopf;", "∀": "&forall;", "ℱ": "&Fscr;", "Ѓ": "&GJcy;", ">": "&gt;", "Γ": "&Gamma;", "Ϝ": "&Gammad;", "Ğ": "&Gbreve;", "Ģ": "&Gcedil;", "Ĝ": "&Gcirc;", "Г": "&Gcy;", "Ġ": "&Gdot;", "𝔊": "&Gfr;", "⋙": "&ggg;", "𝔾": "&Gopf;", "≥": "&geq;", "⋛": "&gtreqless;", "≧": "&geqq;", "⪢": "&GreaterGreater;", "≷": "&gtrless;", "⩾": "&ges;", "≳": "&gtrsim;", "𝒢": "&Gscr;", "≫": "&gg;", "Ъ": "&HARDcy;", "ˇ": "&caron;", "^": "&Hat;", "Ĥ": "&Hcirc;", "ℌ": "&Poincareplane;", "ℋ": "&hamilt;", "ℍ": "&quaternions;", "─": "&boxh;", "Ħ": "&Hstrok;", "≏": "&bumpeq;", "Е": "&IEcy;", "Ĳ": "&IJlig;", "Ё": "&IOcy;", "Í": "&Iacute;", "Î": "&Icirc;", "И": "&Icy;", "İ": "&Idot;", "ℑ": "&imagpart;", "Ì": "&Igrave;", "Ī": "&Imacr;", "ⅈ": "&ii;", "∬": "&Int;", "∫": "&int;", "⋂": "&xcap;", "⁣": "&ic;", "⁢": "&it;", "Į": "&Iogon;", "𝕀": "&Iopf;", "Ι": "&Iota;", "ℐ": "&imagline;", "Ĩ": "&Itilde;", "І": "&Iukcy;", "Ï": "&Iuml;", "Ĵ": "&Jcirc;", "Й": "&Jcy;", "𝔍": "&Jfr;", "𝕁": "&Jopf;", "𝒥": "&Jscr;", "Ј": "&Jsercy;", "Є": "&Jukcy;", "Х": "&KHcy;", "Ќ": "&KJcy;", "Κ": "&Kappa;", "Ķ": "&Kcedil;", "К": "&Kcy;", "𝔎": "&Kfr;", "𝕂": "&Kopf;", "𝒦": "&Kscr;", "Љ": "&LJcy;", "<": "&lt;", "Ĺ": "&Lacute;", "Λ": "&Lambda;", "⟪": "&Lang;", "ℒ": "&lagran;", "↞": "&twoheadleftarrow;", "Ľ": "&Lcaron;", "Ļ": "&Lcedil;", "Л": "&Lcy;", "⟨": "&langle;", "←": "&slarr;", "⇤": "&larrb;", "⇆": "&lrarr;", "⌈": "&lceil;", "⟦": "&lobrk;", "⥡": "&LeftDownTeeVector;", "⇃": "&downharpoonleft;", "⥙": "&LeftDownVectorBar;", "⌊": "&lfloor;", "↔": "&leftrightarrow;", "⥎": "&LeftRightVector;", "⊣": "&dashv;", "↤": "&mapstoleft;", "⥚": "&LeftTeeVector;", "⊲": "&vltri;", "⧏": "&LeftTriangleBar;", "⊴": "&trianglelefteq;", "⥑": "&LeftUpDownVector;", "⥠": "&LeftUpTeeVector;", "↿": "&upharpoonleft;", "⥘": "&LeftUpVectorBar;", "↼": "&lharu;", "⥒": "&LeftVectorBar;", "⋚": "&lesseqgtr;", "≦": "&leqq;", "≶": "&lg;", "⪡": "&LessLess;", "⩽": "&les;", "≲": "&lsim;", "𝔏": "&Lfr;", "⋘": "&Ll;", "⇚": "&lAarr;", "Ŀ": "&Lmidot;", "⟵": "&xlarr;", "⟷": "&xharr;", "⟶": "&xrarr;", "𝕃": "&Lopf;", "↙": "&swarrow;", "↘": "&searrow;", "↰": "&lsh;", "Ł": "&Lstrok;", "≪": "&ll;", "⤅": "&Map;", "М": "&Mcy;", " ": "&MediumSpace;", "ℳ": "&phmmat;", "𝔐": "&Mfr;", "∓": "&mp;", "𝕄": "&Mopf;", "Μ": "&Mu;", "Њ": "&NJcy;", "Ń": "&Nacute;", "Ň": "&Ncaron;", "Ņ": "&Ncedil;", "Н": "&Ncy;", "​": "&ZeroWidthSpace;", "\n": "&NewLine;", "𝔑": "&Nfr;", "⁠": "&NoBreak;", " ": "&nbsp;", "ℕ": "&naturals;", "⫬": "&Not;", "≢": "&nequiv;", "≭": "&NotCupCap;", "∦": "&nspar;", "∉": "&notinva;", "≠": "&ne;", "≂̸": "&nesim;", "∄": "&nexists;", "≯": "&ngtr;", "≱": "&ngeq;", "≧̸": "&ngeqq;", "≫̸": "&nGtv;", "≹": "&ntgl;", "⩾̸": "&nges;", "≵": "&ngsim;", "≎̸": "&nbump;", "≏̸": "&nbumpe;", "⋪": "&ntriangleleft;", "⧏̸": "&NotLeftTriangleBar;", "⋬": "&ntrianglelefteq;", "≮": "&nlt;", "≰": "&nleq;", "≸": "&ntlg;", "≪̸": "&nLtv;", "⩽̸": "&nles;", "≴": "&nlsim;", "⪢̸": "&NotNestedGreaterGreater;", "⪡̸": "&NotNestedLessLess;", "⊀": "&nprec;", "⪯̸": "&npreceq;", "⋠": "&nprcue;", "∌": "&notniva;", "⋫": "&ntriangleright;", "⧐̸": "&NotRightTriangleBar;", "⋭": "&ntrianglerighteq;", "⊏̸": "&NotSquareSubset;", "⋢": "&nsqsube;", "⊐̸": "&NotSquareSuperset;", "⋣": "&nsqsupe;", "⊂⃒": "&vnsub;", "⊈": "&nsubseteq;", "⊁": "&nsucc;", "⪰̸": "&nsucceq;", "⋡": "&nsccue;", "≿̸": "&NotSucceedsTilde;", "⊃⃒": "&vnsup;", "⊉": "&nsupseteq;", "≁": "&nsim;", "≄": "&nsimeq;", "≇": "&ncong;", "≉": "&napprox;", "∤": "&nsmid;", "𝒩": "&Nscr;", "Ñ": "&Ntilde;", "Ν": "&Nu;", "Œ": "&OElig;", "Ó": "&Oacute;", "Ô": "&Ocirc;", "О": "&Ocy;", "Ő": "&Odblac;", "𝔒": "&Ofr;", "Ò": "&Ograve;", "Ō": "&Omacr;", "Ω": "&ohm;", "Ο": "&Omicron;", "𝕆": "&Oopf;", "“": "&ldquo;", "‘": "&lsquo;", "⩔": "&Or;", "𝒪": "&Oscr;", "Ø": "&Oslash;", "Õ": "&Otilde;", "⨷": "&Otimes;", "Ö": "&Ouml;", "‾": "&oline;", "⏞": "&OverBrace;", "⎴": "&tbrk;", "⏜": "&OverParenthesis;", "∂": "&part;", "П": "&Pcy;", "𝔓": "&Pfr;", "Φ": "&Phi;", "Π": "&Pi;", "±": "&pm;", "ℙ": "&primes;", "⪻": "&Pr;", "≺": "&prec;", "⪯": "&preceq;", "≼": "&preccurlyeq;", "≾": "&prsim;", "″": "&Prime;", "∏": "&prod;", "∝": "&vprop;", "𝒫": "&Pscr;", "Ψ": "&Psi;", '"': "&quot;", "𝔔": "&Qfr;", "ℚ": "&rationals;", "𝒬": "&Qscr;", "⤐": "&drbkarow;", "®": "&reg;", "Ŕ": "&Racute;", "⟫": "&Rang;", "↠": "&twoheadrightarrow;", "⤖": "&Rarrtl;", "Ř": "&Rcaron;", "Ŗ": "&Rcedil;", "Р": "&Rcy;", "ℜ": "&realpart;", "∋": "&niv;", "⇋": "&lrhar;", "⥯": "&duhar;", "Ρ": "&Rho;", "⟩": "&rangle;", "→": "&srarr;", "⇥": "&rarrb;", "⇄": "&rlarr;", "⌉": "&rceil;", "⟧": "&robrk;", "⥝": "&RightDownTeeVector;", "⇂": "&downharpoonright;", "⥕": "&RightDownVectorBar;", "⌋": "&rfloor;", "⊢": "&vdash;", "↦": "&mapsto;", "⥛": "&RightTeeVector;", "⊳": "&vrtri;", "⧐": "&RightTriangleBar;", "⊵": "&trianglerighteq;", "⥏": "&RightUpDownVector;", "⥜": "&RightUpTeeVector;", "↾": "&upharpoonright;", "⥔": "&RightUpVectorBar;", "⇀": "&rightharpoonup;", "⥓": "&RightVectorBar;", "ℝ": "&reals;", "⥰": "&RoundImplies;", "⇛": "&rAarr;", "ℛ": "&realine;", "↱": "&rsh;", "⧴": "&RuleDelayed;", "Щ": "&SHCHcy;", "Ш": "&SHcy;", "Ь": "&SOFTcy;", "Ś": "&Sacute;", "⪼": "&Sc;", "Š": "&Scaron;", "Ş": "&Scedil;", "Ŝ": "&Scirc;", "С": "&Scy;", "𝔖": "&Sfr;", "↑": "&uparrow;", "Σ": "&Sigma;", "∘": "&compfn;", "𝕊": "&Sopf;", "√": "&radic;", "□": "&square;", "⊓": "&sqcap;", "⊏": "&sqsubset;", "⊑": "&sqsubseteq;", "⊐": "&sqsupset;", "⊒": "&sqsupseteq;", "⊔": "&sqcup;", "𝒮": "&Sscr;", "⋆": "&sstarf;", "⋐": "&Subset;", "⊆": "&subseteq;", "≻": "&succ;", "⪰": "&succeq;", "≽": "&succcurlyeq;", "≿": "&succsim;", "∑": "&sum;", "⋑": "&Supset;", "⊃": "&supset;", "⊇": "&supseteq;", "Þ": "&THORN;", "™": "&trade;", "Ћ": "&TSHcy;", "Ц": "&TScy;", "	": "&Tab;", "Τ": "&Tau;", "Ť": "&Tcaron;", "Ţ": "&Tcedil;", "Т": "&Tcy;", "𝔗": "&Tfr;", "∴": "&therefore;", "Θ": "&Theta;", "  ": "&ThickSpace;", " ": "&thinsp;", "∼": "&thksim;", "≃": "&simeq;", "≅": "&cong;", "≈": "&thkap;", "𝕋": "&Topf;", "⃛": "&tdot;", "𝒯": "&Tscr;", "Ŧ": "&Tstrok;", "Ú": "&Uacute;", "↟": "&Uarr;", "⥉": "&Uarrocir;", "Ў": "&Ubrcy;", "Ŭ": "&Ubreve;", "Û": "&Ucirc;", "У": "&Ucy;", "Ű": "&Udblac;", "𝔘": "&Ufr;", "Ù": "&Ugrave;", "Ū": "&Umacr;", _: "&lowbar;", "⏟": "&UnderBrace;", "⎵": "&bbrk;", "⏝": "&UnderParenthesis;", "⋃": "&xcup;", "⊎": "&uplus;", "Ų": "&Uogon;", "𝕌": "&Uopf;", "⤒": "&UpArrowBar;", "⇅": "&udarr;", "↕": "&varr;", "⥮": "&udhar;", "⊥": "&perp;", "↥": "&mapstoup;", "↖": "&nwarrow;", "↗": "&nearrow;", "ϒ": "&upsih;", "Υ": "&Upsilon;", "Ů": "&Uring;", "𝒰": "&Uscr;", "Ũ": "&Utilde;", "Ü": "&Uuml;", "⊫": "&VDash;", "⫫": "&Vbar;", "В": "&Vcy;", "⊩": "&Vdash;", "⫦": "&Vdashl;", "⋁": "&xvee;", "‖": "&Vert;", "∣": "&smid;", "|": "&vert;", "❘": "&VerticalSeparator;", "≀": "&wreath;", " ": "&hairsp;", "𝔙": "&Vfr;", "𝕍": "&Vopf;", "𝒱": "&Vscr;", "⊪": "&Vvdash;", "Ŵ": "&Wcirc;", "⋀": "&xwedge;", "𝔚": "&Wfr;", "𝕎": "&Wopf;", "𝒲": "&Wscr;", "𝔛": "&Xfr;", "Ξ": "&Xi;", "𝕏": "&Xopf;", "𝒳": "&Xscr;", "Я": "&YAcy;", "Ї": "&YIcy;", "Ю": "&YUcy;", "Ý": "&Yacute;", "Ŷ": "&Ycirc;", "Ы": "&Ycy;", "𝔜": "&Yfr;", "𝕐": "&Yopf;", "𝒴": "&Yscr;", "Ÿ": "&Yuml;", "Ж": "&ZHcy;", "Ź": "&Zacute;", "Ž": "&Zcaron;", "З": "&Zcy;", "Ż": "&Zdot;", "Ζ": "&Zeta;", "ℨ": "&zeetrf;", "ℤ": "&integers;", "𝒵": "&Zscr;", "á": "&aacute;", "ă": "&abreve;", "∾": "&mstpos;", "∾̳": "&acE;", "∿": "&acd;", "â": "&acirc;", "а": "&acy;", "æ": "&aelig;", "𝔞": "&afr;", "à": "&agrave;", "ℵ": "&aleph;", "α": "&alpha;", "ā": "&amacr;", "⨿": "&amalg;", "∧": "&wedge;", "⩕": "&andand;", "⩜": "&andd;", "⩘": "&andslope;", "⩚": "&andv;", "∠": "&angle;", "⦤": "&ange;", "∡": "&measuredangle;", "⦨": "&angmsdaa;", "⦩": "&angmsdab;", "⦪": "&angmsdac;", "⦫": "&angmsdad;", "⦬": "&angmsdae;", "⦭": "&angmsdaf;", "⦮": "&angmsdag;", "⦯": "&angmsdah;", "∟": "&angrt;", "⊾": "&angrtvb;", "⦝": "&angrtvbd;", "∢": "&angsph;", "⍼": "&angzarr;", "ą": "&aogon;", "𝕒": "&aopf;", "⩰": "&apE;", "⩯": "&apacir;", "≊": "&approxeq;", "≋": "&apid;", "'": "&apos;", "å": "&aring;", "𝒶": "&ascr;", "*": "&midast;", "ã": "&atilde;", "ä": "&auml;", "⨑": "&awint;", "⫭": "&bNot;", "≌": "&bcong;", "϶": "&bepsi;", "‵": "&bprime;", "∽": "&bsim;", "⋍": "&bsime;", "⊽": "&barvee;", "⌅": "&barwedge;", "⎶": "&bbrktbrk;", "б": "&bcy;", "„": "&ldquor;", "⦰": "&bemptyv;", "β": "&beta;", "ℶ": "&beth;", "≬": "&twixt;", "𝔟": "&bfr;", "◯": "&xcirc;", "⨀": "&xodot;", "⨁": "&xoplus;", "⨂": "&xotime;", "⨆": "&xsqcup;", "★": "&starf;", "▽": "&xdtri;", "△": "&xutri;", "⨄": "&xuplus;", "⤍": "&rbarr;", "⧫": "&lozf;", "▴": "&utrif;", "▾": "&dtrif;", "◂": "&ltrif;", "▸": "&rtrif;", "␣": "&blank;", "▒": "&blk12;", "░": "&blk14;", "▓": "&blk34;", "█": "&block;", "=⃥": "&bne;", "≡⃥": "&bnequiv;", "⌐": "&bnot;", "𝕓": "&bopf;", "⋈": "&bowtie;", "╗": "&boxDL;", "╔": "&boxDR;", "╖": "&boxDl;", "╓": "&boxDr;", "═": "&boxH;", "╦": "&boxHD;", "╩": "&boxHU;", "╤": "&boxHd;", "╧": "&boxHu;", "╝": "&boxUL;", "╚": "&boxUR;", "╜": "&boxUl;", "╙": "&boxUr;", "║": "&boxV;", "╬": "&boxVH;", "╣": "&boxVL;", "╠": "&boxVR;", "╫": "&boxVh;", "╢": "&boxVl;", "╟": "&boxVr;", "⧉": "&boxbox;", "╕": "&boxdL;", "╒": "&boxdR;", "┐": "&boxdl;", "┌": "&boxdr;", "╥": "&boxhD;", "╨": "&boxhU;", "┬": "&boxhd;", "┴": "&boxhu;", "⊟": "&minusb;", "⊞": "&plusb;", "⊠": "&timesb;", "╛": "&boxuL;", "╘": "&boxuR;", "┘": "&boxul;", "└": "&boxur;", "│": "&boxv;", "╪": "&boxvH;", "╡": "&boxvL;", "╞": "&boxvR;", "┼": "&boxvh;", "┤": "&boxvl;", "├": "&boxvr;", "¦": "&brvbar;", "𝒷": "&bscr;", "⁏": "&bsemi;", "\\": "&bsol;", "⧅": "&bsolb;", "⟈": "&bsolhsub;", "•": "&bullet;", "⪮": "&bumpE;", "ć": "&cacute;", "∩": "&cap;", "⩄": "&capand;", "⩉": "&capbrcup;", "⩋": "&capcap;", "⩇": "&capcup;", "⩀": "&capdot;", "∩︀": "&caps;", "⁁": "&caret;", "⩍": "&ccaps;", "č": "&ccaron;", "ç": "&ccedil;", "ĉ": "&ccirc;", "⩌": "&ccups;", "⩐": "&ccupssm;", "ċ": "&cdot;", "⦲": "&cemptyv;", "¢": "&cent;", "𝔠": "&cfr;", "ч": "&chcy;", "✓": "&checkmark;", "χ": "&chi;", "○": "&cir;", "⧃": "&cirE;", "ˆ": "&circ;", "≗": "&cire;", "↺": "&olarr;", "↻": "&orarr;", "Ⓢ": "&oS;", "⊛": "&oast;", "⊚": "&ocir;", "⊝": "&odash;", "⨐": "&cirfnint;", "⫯": "&cirmid;", "⧂": "&cirscir;", "♣": "&clubsuit;", ":": "&colon;", ",": "&comma;", "@": "&commat;", "∁": "&complement;", "⩭": "&congdot;", "𝕔": "&copf;", "℗": "&copysr;", "↵": "&crarr;", "✗": "&cross;", "𝒸": "&cscr;", "⫏": "&csub;", "⫑": "&csube;", "⫐": "&csup;", "⫒": "&csupe;", "⋯": "&ctdot;", "⤸": "&cudarrl;", "⤵": "&cudarrr;", "⋞": "&curlyeqprec;", "⋟": "&curlyeqsucc;", "↶": "&curvearrowleft;", "⤽": "&cularrp;", "∪": "&cup;", "⩈": "&cupbrcap;", "⩆": "&cupcap;", "⩊": "&cupcup;", "⊍": "&cupdot;", "⩅": "&cupor;", "∪︀": "&cups;", "↷": "&curvearrowright;", "⤼": "&curarrm;", "⋎": "&cuvee;", "⋏": "&cuwed;", "¤": "&curren;", "∱": "&cwint;", "⌭": "&cylcty;", "⥥": "&dHar;", "†": "&dagger;", "ℸ": "&daleth;", "‐": "&hyphen;", "⤏": "&rBarr;", "ď": "&dcaron;", "д": "&dcy;", "⇊": "&downdownarrows;", "⩷": "&eDDot;", "°": "&deg;", "δ": "&delta;", "⦱": "&demptyv;", "⥿": "&dfisht;", "𝔡": "&dfr;", "♦": "&diams;", "ϝ": "&gammad;", "⋲": "&disin;", "÷": "&divide;", "⋇": "&divonx;", "ђ": "&djcy;", "⌞": "&llcorner;", "⌍": "&dlcrop;", $: "&dollar;", "𝕕": "&dopf;", "≑": "&eDot;", "∸": "&minusd;", "∔": "&plusdo;", "⊡": "&sdotb;", "⌟": "&lrcorner;", "⌌": "&drcrop;", "𝒹": "&dscr;", "ѕ": "&dscy;", "⧶": "&dsol;", "đ": "&dstrok;", "⋱": "&dtdot;", "▿": "&triangledown;", "⦦": "&dwangle;", "џ": "&dzcy;", "⟿": "&dzigrarr;", "é": "&eacute;", "⩮": "&easter;", "ě": "&ecaron;", "≖": "&eqcirc;", "ê": "&ecirc;", "≕": "&eqcolon;", "э": "&ecy;", "ė": "&edot;", "≒": "&fallingdotseq;", "𝔢": "&efr;", "⪚": "&eg;", "è": "&egrave;", "⪖": "&eqslantgtr;", "⪘": "&egsdot;", "⪙": "&el;", "⏧": "&elinters;", "ℓ": "&ell;", "⪕": "&eqslantless;", "⪗": "&elsdot;", "ē": "&emacr;", "∅": "&varnothing;", " ": "&emsp13;", " ": "&emsp14;", " ": "&emsp;", "ŋ": "&eng;", " ": "&ensp;", "ę": "&eogon;", "𝕖": "&eopf;", "⋕": "&epar;", "⧣": "&eparsl;", "⩱": "&eplus;", "ε": "&epsilon;", "ϵ": "&varepsilon;", "=": "&equals;", "≟": "&questeq;", "⩸": "&equivDD;", "⧥": "&eqvparsl;", "≓": "&risingdotseq;", "⥱": "&erarr;", "ℯ": "&escr;", "η": "&eta;", "ð": "&eth;", "ë": "&euml;", "€": "&euro;", "!": "&excl;", "ф": "&fcy;", "♀": "&female;", "ﬃ": "&ffilig;", "ﬀ": "&fflig;", "ﬄ": "&ffllig;", "𝔣": "&ffr;", "ﬁ": "&filig;", fj: "&fjlig;", "♭": "&flat;", "ﬂ": "&fllig;", "▱": "&fltns;", "ƒ": "&fnof;", "𝕗": "&fopf;", "⋔": "&pitchfork;", "⫙": "&forkv;", "⨍": "&fpartint;", "½": "&half;", "⅓": "&frac13;", "¼": "&frac14;", "⅕": "&frac15;", "⅙": "&frac16;", "⅛": "&frac18;", "⅔": "&frac23;", "⅖": "&frac25;", "¾": "&frac34;", "⅗": "&frac35;", "⅜": "&frac38;", "⅘": "&frac45;", "⅚": "&frac56;", "⅝": "&frac58;", "⅞": "&frac78;", "⁄": "&frasl;", "⌢": "&sfrown;", "𝒻": "&fscr;", "⪌": "&gtreqqless;", "ǵ": "&gacute;", "γ": "&gamma;", "⪆": "&gtrapprox;", "ğ": "&gbreve;", "ĝ": "&gcirc;", "г": "&gcy;", "ġ": "&gdot;", "⪩": "&gescc;", "⪀": "&gesdot;", "⪂": "&gesdoto;", "⪄": "&gesdotol;", "⋛︀": "&gesl;", "⪔": "&gesles;", "𝔤": "&gfr;", "ℷ": "&gimel;", "ѓ": "&gjcy;", "⪒": "&glE;", "⪥": "&gla;", "⪤": "&glj;", "≩": "&gneqq;", "⪊": "&gnapprox;", "⪈": "&gneq;", "⋧": "&gnsim;", "𝕘": "&gopf;", "ℊ": "&gscr;", "⪎": "&gsime;", "⪐": "&gsiml;", "⪧": "&gtcc;", "⩺": "&gtcir;", "⋗": "&gtrdot;", "⦕": "&gtlPar;", "⩼": "&gtquest;", "⥸": "&gtrarr;", "≩︀": "&gvnE;", "ъ": "&hardcy;", "⥈": "&harrcir;", "↭": "&leftrightsquigarrow;", "ℏ": "&plankv;", "ĥ": "&hcirc;", "♥": "&heartsuit;", "…": "&mldr;", "⊹": "&hercon;", "𝔥": "&hfr;", "⤥": "&searhk;", "⤦": "&swarhk;", "⇿": "&hoarr;", "∻": "&homtht;", "↩": "&larrhk;", "↪": "&rarrhk;", "𝕙": "&hopf;", "―": "&horbar;", "𝒽": "&hscr;", "ħ": "&hstrok;", "⁃": "&hybull;", "í": "&iacute;", "î": "&icirc;", "и": "&icy;", "е": "&iecy;", "¡": "&iexcl;", "𝔦": "&ifr;", "ì": "&igrave;", "⨌": "&qint;", "∭": "&tint;", "⧜": "&iinfin;", "℩": "&iiota;", "ĳ": "&ijlig;", "ī": "&imacr;", "ı": "&inodot;", "⊷": "&imof;", "Ƶ": "&imped;", "℅": "&incare;", "∞": "&infin;", "⧝": "&infintie;", "⊺": "&intercal;", "⨗": "&intlarhk;", "⨼": "&iprod;", "ё": "&iocy;", "į": "&iogon;", "𝕚": "&iopf;", "ι": "&iota;", "¿": "&iquest;", "𝒾": "&iscr;", "⋹": "&isinE;", "⋵": "&isindot;", "⋴": "&isins;", "⋳": "&isinsv;", "ĩ": "&itilde;", "і": "&iukcy;", "ï": "&iuml;", "ĵ": "&jcirc;", "й": "&jcy;", "𝔧": "&jfr;", "ȷ": "&jmath;", "𝕛": "&jopf;", "𝒿": "&jscr;", "ј": "&jsercy;", "є": "&jukcy;", "κ": "&kappa;", "ϰ": "&varkappa;", "ķ": "&kcedil;", "к": "&kcy;", "𝔨": "&kfr;", "ĸ": "&kgreen;", "х": "&khcy;", "ќ": "&kjcy;", "𝕜": "&kopf;", "𝓀": "&kscr;", "⤛": "&lAtail;", "⤎": "&lBarr;", "⪋": "&lesseqqgtr;", "⥢": "&lHar;", "ĺ": "&lacute;", "⦴": "&laemptyv;", "λ": "&lambda;", "⦑": "&langd;", "⪅": "&lessapprox;", "«": "&laquo;", "⤟": "&larrbfs;", "⤝": "&larrfs;", "↫": "&looparrowleft;", "⤹": "&larrpl;", "⥳": "&larrsim;", "↢": "&leftarrowtail;", "⪫": "&lat;", "⤙": "&latail;", "⪭": "&late;", "⪭︀": "&lates;", "⤌": "&lbarr;", "❲": "&lbbrk;", "{": "&lcub;", "[": "&lsqb;", "⦋": "&lbrke;", "⦏": "&lbrksld;", "⦍": "&lbrkslu;", "ľ": "&lcaron;", "ļ": "&lcedil;", "л": "&lcy;", "⤶": "&ldca;", "⥧": "&ldrdhar;", "⥋": "&ldrushar;", "↲": "&ldsh;", "≤": "&leq;", "⇇": "&llarr;", "⋋": "&lthree;", "⪨": "&lescc;", "⩿": "&lesdot;", "⪁": "&lesdoto;", "⪃": "&lesdotor;", "⋚︀": "&lesg;", "⪓": "&lesges;", "⋖": "&ltdot;", "⥼": "&lfisht;", "𝔩": "&lfr;", "⪑": "&lgE;", "⥪": "&lharul;", "▄": "&lhblk;", "љ": "&ljcy;", "⥫": "&llhard;", "◺": "&lltri;", "ŀ": "&lmidot;", "⎰": "&lmoustache;", "≨": "&lneqq;", "⪉": "&lnapprox;", "⪇": "&lneq;", "⋦": "&lnsim;", "⟬": "&loang;", "⇽": "&loarr;", "⟼": "&xmap;", "↬": "&rarrlp;", "⦅": "&lopar;", "𝕝": "&lopf;", "⨭": "&loplus;", "⨴": "&lotimes;", "∗": "&lowast;", "◊": "&lozenge;", "(": "&lpar;", "⦓": "&lparlt;", "⥭": "&lrhard;", "‎": "&lrm;", "⊿": "&lrtri;", "‹": "&lsaquo;", "𝓁": "&lscr;", "⪍": "&lsime;", "⪏": "&lsimg;", "‚": "&sbquo;", "ł": "&lstrok;", "⪦": "&ltcc;", "⩹": "&ltcir;", "⋉": "&ltimes;", "⥶": "&ltlarr;", "⩻": "&ltquest;", "⦖": "&ltrPar;", "◃": "&triangleleft;", "⥊": "&lurdshar;", "⥦": "&luruhar;", "≨︀": "&lvnE;", "∺": "&mDDot;", "¯": "&strns;", "♂": "&male;", "✠": "&maltese;", "▮": "&marker;", "⨩": "&mcomma;", "м": "&mcy;", "—": "&mdash;", "𝔪": "&mfr;", "℧": "&mho;", "µ": "&micro;", "⫰": "&midcir;", "−": "&minus;", "⨪": "&minusdu;", "⫛": "&mlcp;", "⊧": "&models;", "𝕞": "&mopf;", "𝓂": "&mscr;", "μ": "&mu;", "⊸": "&mumap;", "⋙̸": "&nGg;", "≫⃒": "&nGt;", "⇍": "&nlArr;", "⇎": "&nhArr;", "⋘̸": "&nLl;", "≪⃒": "&nLt;", "⇏": "&nrArr;", "⊯": "&nVDash;", "⊮": "&nVdash;", "ń": "&nacute;", "∠⃒": "&nang;", "⩰̸": "&napE;", "≋̸": "&napid;", "ŉ": "&napos;", "♮": "&natural;", "⩃": "&ncap;", "ň": "&ncaron;", "ņ": "&ncedil;", "⩭̸": "&ncongdot;", "⩂": "&ncup;", "н": "&ncy;", "–": "&ndash;", "⇗": "&neArr;", "⤤": "&nearhk;", "≐̸": "&nedot;", "⤨": "&toea;", "𝔫": "&nfr;", "↮": "&nleftrightarrow;", "⫲": "&nhpar;", "⋼": "&nis;", "⋺": "&nisd;", "њ": "&njcy;", "≦̸": "&nleqq;", "↚": "&nleftarrow;", "‥": "&nldr;", "𝕟": "&nopf;", "¬": "&not;", "⋹̸": "&notinE;", "⋵̸": "&notindot;", "⋷": "&notinvb;", "⋶": "&notinvc;", "⋾": "&notnivb;", "⋽": "&notnivc;", "⫽⃥": "&nparsl;", "∂̸": "&npart;", "⨔": "&npolint;", "↛": "&nrightarrow;", "⤳̸": "&nrarrc;", "↝̸": "&nrarrw;", "𝓃": "&nscr;", "⊄": "&nsub;", "⫅̸": "&nsubseteqq;", "⊅": "&nsup;", "⫆̸": "&nsupseteqq;", "ñ": "&ntilde;", "ν": "&nu;", "#": "&num;", "№": "&numero;", " ": "&numsp;", "⊭": "&nvDash;", "⤄": "&nvHarr;", "≍⃒": "&nvap;", "⊬": "&nvdash;", "≥⃒": "&nvge;", ">⃒": "&nvgt;", "⧞": "&nvinfin;", "⤂": "&nvlArr;", "≤⃒": "&nvle;", "<⃒": "&nvlt;", "⊴⃒": "&nvltrie;", "⤃": "&nvrArr;", "⊵⃒": "&nvrtrie;", "∼⃒": "&nvsim;", "⇖": "&nwArr;", "⤣": "&nwarhk;", "⤧": "&nwnear;", "ó": "&oacute;", "ô": "&ocirc;", "о": "&ocy;", "ő": "&odblac;", "⨸": "&odiv;", "⦼": "&odsold;", "œ": "&oelig;", "⦿": "&ofcir;", "𝔬": "&ofr;", "˛": "&ogon;", "ò": "&ograve;", "⧁": "&ogt;", "⦵": "&ohbar;", "⦾": "&olcir;", "⦻": "&olcross;", "⧀": "&olt;", "ō": "&omacr;", "ω": "&omega;", "ο": "&omicron;", "⦶": "&omid;", "𝕠": "&oopf;", "⦷": "&opar;", "⦹": "&operp;", "∨": "&vee;", "⩝": "&ord;", "ℴ": "&oscr;", "ª": "&ordf;", "º": "&ordm;", "⊶": "&origof;", "⩖": "&oror;", "⩗": "&orslope;", "⩛": "&orv;", "ø": "&oslash;", "⊘": "&osol;", "õ": "&otilde;", "⨶": "&otimesas;", "ö": "&ouml;", "⌽": "&ovbar;", "¶": "&para;", "⫳": "&parsim;", "⫽": "&parsl;", "п": "&pcy;", "%": "&percnt;", ".": "&period;", "‰": "&permil;", "‱": "&pertenk;", "𝔭": "&pfr;", "φ": "&phi;", "ϕ": "&varphi;", "☎": "&phone;", "π": "&pi;", "ϖ": "&varpi;", "ℎ": "&planckh;", "+": "&plus;", "⨣": "&plusacir;", "⨢": "&pluscir;", "⨥": "&plusdu;", "⩲": "&pluse;", "⨦": "&plussim;", "⨧": "&plustwo;", "⨕": "&pointint;", "𝕡": "&popf;", "£": "&pound;", "⪳": "&prE;", "⪷": "&precapprox;", "⪹": "&prnap;", "⪵": "&prnE;", "⋨": "&prnsim;", "′": "&prime;", "⌮": "&profalar;", "⌒": "&profline;", "⌓": "&profsurf;", "⊰": "&prurel;", "𝓅": "&pscr;", "ψ": "&psi;", " ": "&puncsp;", "𝔮": "&qfr;", "𝕢": "&qopf;", "⁗": "&qprime;", "𝓆": "&qscr;", "⨖": "&quatint;", "?": "&quest;", "⤜": "&rAtail;", "⥤": "&rHar;", "∽̱": "&race;", "ŕ": "&racute;", "⦳": "&raemptyv;", "⦒": "&rangd;", "⦥": "&range;", "»": "&raquo;", "⥵": "&rarrap;", "⤠": "&rarrbfs;", "⤳": "&rarrc;", "⤞": "&rarrfs;", "⥅": "&rarrpl;", "⥴": "&rarrsim;", "↣": "&rightarrowtail;", "↝": "&rightsquigarrow;", "⤚": "&ratail;", "∶": "&ratio;", "❳": "&rbbrk;", "}": "&rcub;", "]": "&rsqb;", "⦌": "&rbrke;", "⦎": "&rbrksld;", "⦐": "&rbrkslu;", "ř": "&rcaron;", "ŗ": "&rcedil;", "р": "&rcy;", "⤷": "&rdca;", "⥩": "&rdldhar;", "↳": "&rdsh;", "▭": "&rect;", "⥽": "&rfisht;", "𝔯": "&rfr;", "⥬": "&rharul;", "ρ": "&rho;", "ϱ": "&varrho;", "⇉": "&rrarr;", "⋌": "&rthree;", "˚": "&ring;", "‏": "&rlm;", "⎱": "&rmoustache;", "⫮": "&rnmid;", "⟭": "&roang;", "⇾": "&roarr;", "⦆": "&ropar;", "𝕣": "&ropf;", "⨮": "&roplus;", "⨵": "&rotimes;", ")": "&rpar;", "⦔": "&rpargt;", "⨒": "&rppolint;", "›": "&rsaquo;", "𝓇": "&rscr;", "⋊": "&rtimes;", "▹": "&triangleright;", "⧎": "&rtriltri;", "⥨": "&ruluhar;", "℞": "&rx;", "ś": "&sacute;", "⪴": "&scE;", "⪸": "&succapprox;", "š": "&scaron;", "ş": "&scedil;", "ŝ": "&scirc;", "⪶": "&succneqq;", "⪺": "&succnapprox;", "⋩": "&succnsim;", "⨓": "&scpolint;", "с": "&scy;", "⋅": "&sdot;", "⩦": "&sdote;", "⇘": "&seArr;", "§": "&sect;", ";": "&semi;", "⤩": "&tosa;", "✶": "&sext;", "𝔰": "&sfr;", "♯": "&sharp;", "щ": "&shchcy;", "ш": "&shcy;", "­": "&shy;", "σ": "&sigma;", "ς": "&varsigma;", "⩪": "&simdot;", "⪞": "&simg;", "⪠": "&simgE;", "⪝": "&siml;", "⪟": "&simlE;", "≆": "&simne;", "⨤": "&simplus;", "⥲": "&simrarr;", "⨳": "&smashp;", "⧤": "&smeparsl;", "⌣": "&ssmile;", "⪪": "&smt;", "⪬": "&smte;", "⪬︀": "&smtes;", "ь": "&softcy;", "/": "&sol;", "⧄": "&solb;", "⌿": "&solbar;", "𝕤": "&sopf;", "♠": "&spadesuit;", "⊓︀": "&sqcaps;", "⊔︀": "&sqcups;", "𝓈": "&sscr;", "☆": "&star;", "⊂": "&subset;", "⫅": "&subseteqq;", "⪽": "&subdot;", "⫃": "&subedot;", "⫁": "&submult;", "⫋": "&subsetneqq;", "⊊": "&subsetneq;", "⪿": "&subplus;", "⥹": "&subrarr;", "⫇": "&subsim;", "⫕": "&subsub;", "⫓": "&subsup;", "♪": "&sung;", "¹": "&sup1;", "²": "&sup2;", "³": "&sup3;", "⫆": "&supseteqq;", "⪾": "&supdot;", "⫘": "&supdsub;", "⫄": "&supedot;", "⟉": "&suphsol;", "⫗": "&suphsub;", "⥻": "&suplarr;", "⫂": "&supmult;", "⫌": "&supsetneqq;", "⊋": "&supsetneq;", "⫀": "&supplus;", "⫈": "&supsim;", "⫔": "&supsub;", "⫖": "&supsup;", "⇙": "&swArr;", "⤪": "&swnwar;", "ß": "&szlig;", "⌖": "&target;", "τ": "&tau;", "ť": "&tcaron;", "ţ": "&tcedil;", "т": "&tcy;", "⌕": "&telrec;", "𝔱": "&tfr;", "θ": "&theta;", "ϑ": "&vartheta;", "þ": "&thorn;", "×": "&times;", "⨱": "&timesbar;", "⨰": "&timesd;", "⌶": "&topbot;", "⫱": "&topcir;", "𝕥": "&topf;", "⫚": "&topfork;", "‴": "&tprime;", "▵": "&utri;", "≜": "&trie;", "◬": "&tridot;", "⨺": "&triminus;", "⨹": "&triplus;", "⧍": "&trisb;", "⨻": "&tritime;", "⏢": "&trpezium;", "𝓉": "&tscr;", "ц": "&tscy;", "ћ": "&tshcy;", "ŧ": "&tstrok;", "⥣": "&uHar;", "ú": "&uacute;", "ў": "&ubrcy;", "ŭ": "&ubreve;", "û": "&ucirc;", "у": "&ucy;", "ű": "&udblac;", "⥾": "&ufisht;", "𝔲": "&ufr;", "ù": "&ugrave;", "▀": "&uhblk;", "⌜": "&ulcorner;", "⌏": "&ulcrop;", "◸": "&ultri;", "ū": "&umacr;", "ų": "&uogon;", "𝕦": "&uopf;", "υ": "&upsilon;", "⇈": "&uuarr;", "⌝": "&urcorner;", "⌎": "&urcrop;", "ů": "&uring;", "◹": "&urtri;", "𝓊": "&uscr;", "⋰": "&utdot;", "ũ": "&utilde;", "ü": "&uuml;", "⦧": "&uwangle;", "⫨": "&vBar;", "⫩": "&vBarv;", "⦜": "&vangrt;", "⊊︀": "&vsubne;", "⫋︀": "&vsubnE;", "⊋︀": "&vsupne;", "⫌︀": "&vsupnE;", "в": "&vcy;", "⊻": "&veebar;", "≚": "&veeeq;", "⋮": "&vellip;", "𝔳": "&vfr;", "𝕧": "&vopf;", "𝓋": "&vscr;", "⦚": "&vzigzag;", "ŵ": "&wcirc;", "⩟": "&wedbar;", "≙": "&wedgeq;", "℘": "&wp;", "𝔴": "&wfr;", "𝕨": "&wopf;", "𝓌": "&wscr;", "𝔵": "&xfr;", "ξ": "&xi;", "⋻": "&xnis;", "𝕩": "&xopf;", "𝓍": "&xscr;", "ý": "&yacute;", "я": "&yacy;", "ŷ": "&ycirc;", "ы": "&ycy;", "¥": "&yen;", "𝔶": "&yfr;", "ї": "&yicy;", "𝕪": "&yopf;", "𝓎": "&yscr;", "ю": "&yucy;", "ÿ": "&yuml;", "ź": "&zacute;", "ž": "&zcaron;", "з": "&zcy;", "ż": "&zdot;", "ζ": "&zeta;", "𝔷": "&zfr;", "ж": "&zhcy;", "⇝": "&zigrarr;", "𝕫": "&zopf;", "𝓏": "&zscr;", "‍": "&zwj;", "‌": "&zwnj;" } } };
  }
});

// node_modules/html-entities/lib/numeric-unicode-map.js
var require_numeric_unicode_map = __commonJS({
  "node_modules/html-entities/lib/numeric-unicode-map.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.numericUnicodeMap = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
  }
});

// node_modules/html-entities/lib/surrogate-pairs.js
var require_surrogate_pairs = __commonJS({
  "node_modules/html-entities/lib/surrogate-pairs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromCodePoint = String.fromCodePoint || function(astralCodePoint) {
      return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
    };
    exports.getCodePoint = String.prototype.codePointAt ? function(input, position) {
      return input.codePointAt(position);
    } : function(input, position) {
      return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
    };
    exports.highSurrogateFrom = 55296;
    exports.highSurrogateTo = 56319;
  }
});

// node_modules/html-entities/lib/index.js
var require_lib = __commonJS({
  "node_modules/html-entities/lib/index.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var named_references_1 = require_named_references();
    var numeric_unicode_map_1 = require_numeric_unicode_map();
    var surrogate_pairs_1 = require_surrogate_pairs();
    var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
    var encodeRegExps = {
      specialChars: /[<>'"&]/g,
      nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
      nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
      extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
    };
    var defaultEncodeOptions = {
      mode: "specialChars",
      level: "all",
      numeric: "decimal"
    };
    function encode(text, _a) {
      var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? "specialChars" : _c, _d = _b.numeric, numeric = _d === void 0 ? "decimal" : _d, _e = _b.level, level = _e === void 0 ? "all" : _e;
      if (!text) {
        return "";
      }
      var encodeRegExp = encodeRegExps[mode];
      var references = allNamedReferences[level].characters;
      var isHex = numeric === "hexadecimal";
      encodeRegExp.lastIndex = 0;
      var _b = encodeRegExp.exec(text);
      var _c;
      if (_b) {
        _c = "";
        var _d = 0;
        do {
          if (_d !== _b.index) {
            _c += text.substring(_d, _b.index);
          }
          var _e = _b[0];
          var result_1 = references[_e];
          if (!result_1) {
            var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
            result_1 = (isHex ? "&#x" + code_1.toString(16) : "&#" + code_1) + ";";
          }
          _c += result_1;
          _d = _b.index + _e.length;
        } while (_b = encodeRegExp.exec(text));
        if (_d !== text.length) {
          _c += text.substring(_d);
        }
      } else {
        _c = text;
      }
      return _c;
    }
    exports.encode = encode;
    var defaultDecodeOptions = {
      scope: "body",
      level: "all"
    };
    var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
    var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
    var baseDecodeRegExps = {
      xml: {
        strict,
        attribute,
        body: named_references_1.bodyRegExps.xml
      },
      html4: {
        strict,
        attribute,
        body: named_references_1.bodyRegExps.html4
      },
      html5: {
        strict,
        attribute,
        body: named_references_1.bodyRegExps.html5
      }
    };
    var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
    var fromCharCode = String.fromCharCode;
    var outOfBoundsChar = fromCharCode(65533);
    var defaultDecodeEntityOptions = {
      level: "all"
    };
    function decodeEntity(entity, _a) {
      var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? "all" : _b;
      if (!entity) {
        return "";
      }
      var _b = entity;
      var decodeEntityLastChar_1 = entity[entity.length - 1];
      if (false) {
        _b = entity;
      } else if (false) {
        _b = entity;
      } else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
          _b = decodeResultByReference_1;
        } else if (entity[0] === "&" && entity[1] === "#") {
          var decodeSecondChar_1 = entity[2];
          var decodeCode_1 = decodeSecondChar_1 == "x" || decodeSecondChar_1 == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
          _b = decodeCode_1 >= 1114111 ? outOfBoundsChar : decodeCode_1 > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode_1) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
      }
      return _b;
    }
    exports.decodeEntity = decodeEntity;
    function decode2(text, _a) {
      var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? "all" : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === "xml" ? "strict" : "body" : _b;
      if (!text) {
        return "";
      }
      var decodeRegExp = decodeRegExps[level][scope];
      var references = allNamedReferences[level].entities;
      var isAttribute = scope === "attribute";
      var isStrict = scope === "strict";
      decodeRegExp.lastIndex = 0;
      var replaceMatch_1 = decodeRegExp.exec(text);
      var replaceResult_1;
      if (replaceMatch_1) {
        replaceResult_1 = "";
        var replaceLastIndex_1 = 0;
        do {
          if (replaceLastIndex_1 !== replaceMatch_1.index) {
            replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
          }
          var replaceInput_1 = replaceMatch_1[0];
          var decodeResult_1 = replaceInput_1;
          var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
          if (isAttribute && decodeEntityLastChar_2 === "=") {
            decodeResult_1 = replaceInput_1;
          } else if (isStrict && decodeEntityLastChar_2 !== ";") {
            decodeResult_1 = replaceInput_1;
          } else {
            var decodeResultByReference_2 = references[replaceInput_1];
            if (decodeResultByReference_2) {
              decodeResult_1 = decodeResultByReference_2;
            } else if (replaceInput_1[0] === "&" && replaceInput_1[1] === "#") {
              var decodeSecondChar_2 = replaceInput_1[2];
              var decodeCode_2 = decodeSecondChar_2 == "x" || decodeSecondChar_2 == "X" ? parseInt(replaceInput_1.substr(3), 16) : parseInt(replaceInput_1.substr(2));
              decodeResult_1 = decodeCode_2 >= 1114111 ? outOfBoundsChar : decodeCode_2 > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode_2) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
            }
          }
          replaceResult_1 += decodeResult_1;
          replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while (replaceMatch_1 = decodeRegExp.exec(text));
        if (replaceLastIndex_1 !== text.length) {
          replaceResult_1 += text.substring(replaceLastIndex_1);
        }
      } else {
        replaceResult_1 = text;
      }
      return replaceResult_1;
    }
    exports.decode = decode2;
  }
});

// src/main.js
var main_exports = {};
__export(main_exports, {
  getRequestOptions: () => getRequestOptions,
  read: () => read,
  setRequestOptions: () => setRequestOptions
});
module.exports = __toCommonJS(main_exports);

// src/utils/logger.js
var import_src = __toESM(require_src(), 1);
var name = "feed-reader";
var info = (0, import_src.default)(`${name}:info`);
var error = (0, import_src.default)(`${name}:error`);
var warning = (0, import_src.default)(`${name}:warning`);
var logger_default = {
  info: (0, import_src.default)(`${name}:info`),
  error: (0, import_src.default)(`${name}:error`),
  warning: (0, import_src.default)(`${name}:warning`)
};

// src/utils/retrieve.js
var import_axios = __toESM(require_axios2(), 1);

// src/config.js
var import_bellajs = __toESM(require_bella(), 1);
var requestOptions = {
  headers: {
    "user-agent": "Mozilla/5.0 (X11; Linux i686; rv:100.0) Gecko/20100101 Firefox/100.0"
  },
  responseType: "text",
  responseEncoding: "utf8",
  timeout: 6e4,
  maxRedirects: 3
};
var getRequestOptions = () => {
  return (0, import_bellajs.clone)(requestOptions);
};
var setRequestOptions = (opts) => {
  (0, import_bellajs.copies)(opts, requestOptions);
};

// src/utils/retrieve.js
var retrieve_default = async (url) => {
  try {
    const res = await import_axios.default.get(url, getRequestOptions());
    const contentType = res.headers["content-type"] || "";
    if (!contentType || !contentType.includes("xml")) {
      logger_default.error(`Got invalid content-type (${contentType}) from "${url}"`);
      return null;
    }
    const result = {
      url,
      xml: res.data
    };
    return result;
  } catch (err) {
    logger_default.error(err.message || err);
    return null;
  }
};

// src/utils/xml2obj.js
var import_fxp = __toESM(require_fxp(), 1);
var xml2obj_default = (xml = "") => {
  const options = {
    ignoreAttributes: false
  };
  info("Parsing XML data...");
  const parser = new import_fxp.XMLParser(options);
  const jsonObj = parser.parse(xml);
  return jsonObj;
};

// src/utils/parser.js
var import_html_entities = __toESM(require_lib(), 1);
var import_bellajs2 = __toESM(require_bella(), 1);

// src/utils/purifyUrl.js
var blacklistKeys = [
  "CNDID",
  "__twitter_impression",
  "_hsenc",
  "_openstat",
  "action_object_map",
  "action_ref_map",
  "action_type_map",
  "amp",
  "fb_action_ids",
  "fb_action_types",
  "fb_ref",
  "fb_source",
  "fbclid",
  "ga_campaign",
  "ga_content",
  "ga_medium",
  "ga_place",
  "ga_source",
  "ga_term",
  "gs_l",
  "hmb_campaign",
  "hmb_medium",
  "hmb_source",
  "mbid",
  "mc_cid",
  "mc_eid",
  "mkt_tok",
  "referrer",
  "spJobID",
  "spMailingID",
  "spReportId",
  "spUserID",
  "utm_brand",
  "utm_campaign",
  "utm_cid",
  "utm_content",
  "utm_int",
  "utm_mailing",
  "utm_medium",
  "utm_name",
  "utm_place",
  "utm_pubreferrer",
  "utm_reader",
  "utm_social",
  "utm_source",
  "utm_swu",
  "utm_term",
  "utm_userid",
  "utm_viz_id",
  "wt_mc_o",
  "yclid",
  "WT.mc_id",
  "WT.mc_ev",
  "WT.srch",
  "pk_source",
  "pk_medium",
  "pk_campaign"
];
var purifyUrl_default = (url) => {
  try {
    const pureUrl = new URL(url);
    blacklistKeys.forEach((key) => {
      pureUrl.searchParams.delete(key);
    });
    return pureUrl.toString().replace(pureUrl.hash, "");
  } catch (err) {
    return null;
  }
};

// src/utils/parser.js
var toISODateString = (dstr) => {
  try {
    return new Date(dstr).toISOString();
  } catch (err) {
    return "";
  }
};
var toDate = (val) => {
  return val ? toISODateString(val) : "";
};
var toText = (val) => {
  const txt = (0, import_bellajs2.isObject)(val) ? val._text || val["#text"] || val._cdata || val.$t : val;
  return txt ? (0, import_html_entities.decode)(String(txt).trim()) : "";
};
var toDesc = (val) => {
  const txt = toText(val);
  const stripped = (0, import_bellajs2.stripTags)(txt);
  return (0, import_bellajs2.truncate)(stripped, 240);
};
var toLink = (val) => {
  const getEntryLink = (links) => {
    const link = links.find((item) => {
      return item.rel === "alternate";
    });
    return link ? toText(link.href) : "";
  };
  return (0, import_bellajs2.isString)(val) ? toText(val) : (0, import_bellajs2.isObject)(val) && (0, import_bellajs2.hasProperty)(val, "href") ? toText(val.href) : (0, import_bellajs2.isObject)(val) && (0, import_bellajs2.hasProperty)(val, "@_href") ? toText(val["@_href"]) : (0, import_bellajs2.isObject)(val) && (0, import_bellajs2.hasProperty)(val, "_attributes") ? toText(val._attributes.href) : (0, import_bellajs2.isArray)(val) ? toLink(val[0]) : getEntryLink(val);
};
var nomalizeRssItem = (entry) => {
  return {
    title: toText(entry.title),
    link: purifyUrl_default(toLink(entry.link)),
    description: toDesc(entry.description),
    published: toDate(toText(entry.pubDate))
  };
};
var nomalizeAtomItem = (entry) => {
  const author_count = Object.entries(entry.author).length;
  const authors = Object.entries(entry.author).map((x) => x[1].name).join(", ");
  const categories = Object.entries(entry.category).map((x) => x[1]["@_term"]).join(", ");
  return {
    title: toText(entry.title).replaceAll("\n", ""),
    link: purifyUrl_default(toLink(entry.link)),
    id: entry.id,
    description: (entry.summary || entry.description || entry.content).replaceAll("\n", ""),
    published: toDate(toText(entry.updated || entry.published)),
    author_count,
    authors,
    primary_category: entry["arxiv:primary_category"]["@_term"],
    categories,
    comment: entry["arxiv:comment"] ? entry["arxiv:comment"]["#text"] : ""
  };
};
var parseRSS = (xmldata) => {
  const { rss = {} } = xmldata;
  const { channel = {} } = rss;
  const {
    title = "",
    link = "",
    description = "",
    generator = "",
    language = "",
    lastBuildDate = "",
    item = []
  } = channel;
  const entries = (0, import_bellajs2.isArray)(item) ? item.map(nomalizeRssItem) : [nomalizeRssItem(item)];
  return {
    title,
    link: purifyUrl_default(link),
    description,
    generator,
    language,
    published: toDate(lastBuildDate),
    entries
  };
};
var parseAtom = (xmldata) => {
  const { feed = {} } = xmldata;
  const {
    title = "",
    link = "",
    subtitle = "",
    generator = "",
    language = "",
    updated = "",
    entry = []
  } = feed;
  const entries = (0, import_bellajs2.isArray)(entry) ? entry.map(nomalizeAtomItem) : [nomalizeAtomItem(entry)];
  return {
    title: toText(title),
    link: purifyUrl_default(toLink(link)),
    description: subtitle,
    generator,
    language,
    published: toDate(updated),
    entries,
    totalResults: feed["opensearch:totalResults"]["#text"],
    startIndex: feed["opensearch:startIndex"]["#text"],
    itemsPerPage: feed["opensearch:itemsPerPage"]["#text"]
  };
};

// src/utils/validator.js
var import_bellajs3 = __toESM(require_bella(), 1);
var import_fast_xml_parser = __toESM(require_fxp(), 1);
var isRSS = (data = {}) => {
  return (0, import_bellajs3.hasProperty)(data, "rss") && (0, import_bellajs3.hasProperty)(data.rss, "channel");
};
var isAtom = (data = {}) => {
  return (0, import_bellajs3.hasProperty)(data, "feed") && (0, import_bellajs3.hasProperty)(data.feed, "entry");
};
var validate = (xml = "") => {
  const result = import_fast_xml_parser.XMLValidator.validate(xml);
  return result === true;
};

// src/main.js
var read = async (url) => {
  const xmldata = await retrieve_default(url);
  if (!xmldata) {
    throw new Error(`Could not fetch XML content from "${url}"`);
  }
  const { xml } = xmldata;
  if (!validate(xml)) {
    throw new Error(`Failed while validating XML format from "${url}"`);
  }
  info("Parsing XML data...");
  const jsonObj = xml2obj_default(xml);
  return isRSS(jsonObj) ? parseRSS(jsonObj) : isAtom(jsonObj) ? parseAtom(jsonObj) : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRequestOptions,
  read,
  setRequestOptions
});
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
