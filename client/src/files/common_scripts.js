/*
POPPER.MIN.JS
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = window.getComputedStyle(e, null);
    return t ? o[t] : o;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName))
      return window.document.body;
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }
  function r(e) {
    var o = e && e.offsetParent,
      i = o && o.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TD", "TABLE"].indexOf(o.nodeName) &&
        "static" === t(o, "position")
        ? r(o)
        : o
      : window.document.documentElement;
  }
  function p(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
  }
  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }
  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType)
      return window.document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = o ? e : t,
      n = o ? t : e,
      a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var f = a.commonAncestorContainer;
    if ((e !== f && t !== f) || i.contains(n)) return p(f) ? f : r(f);
    var l = s(e);
    return l.host ? d(l.host, t) : d(e, s(t).host);
  }
  function a(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      i = e.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var n = window.document.documentElement,
        r = window.document.scrollingElement || n;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      i = a(t, "top"),
      n = a(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += i * r),
      (e.bottom += i * r),
      (e.left += n * r),
      (e.right += n * r),
      e
    );
  }
  function l(e, t) {
    var o = "x" === t ? "Left" : "Top",
      i = "Left" == o ? "Right" : "Bottom";
    return (
      +e["border" + o + "Width"].split("px")[0] +
      +e["border" + i + "Width"].split("px")[0]
    );
  }
  function m(e, t, o, i) {
    return _(
      t["offset" + e],
      o["client" + e],
      o["offset" + e],
      ie()
        ? o["offset" + e] +
            i["margin" + ("Height" === e ? "Top" : "Left")] +
            i["margin" + ("Height" === e ? "Bottom" : "Right")]
        : 0
    );
  }
  function h() {
    var e = window.document.body,
      t = window.document.documentElement,
      o = ie() && window.getComputedStyle(t);
    return { height: m("Height", e, t, o), width: m("Width", e, t, o) };
  }
  function c(e) {
    return se({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function g(e) {
    var o = {};
    if (ie())
      try {
        o = e.getBoundingClientRect();
        var i = a(e, "top"),
          n = a(e, "left");
        (o.top += i), (o.left += n), (o.bottom += i), (o.right += n);
      } catch (e) {}
    else o = e.getBoundingClientRect();
    var r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      p = "HTML" === e.nodeName ? h() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      f = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (f || m) {
      var g = t(e);
      (f -= l(g, "x")), (m -= l(g, "y")), (r.width -= f), (r.height -= m);
    }
    return c(r);
  }
  function u(e, o) {
    var i = ie(),
      r = "HTML" === o.nodeName,
      p = g(e),
      s = g(o),
      d = n(e),
      a = t(o),
      l = +a.borderTopWidth.split("px")[0],
      m = +a.borderLeftWidth.split("px")[0],
      h = c({
        top: p.top - s.top - l,
        left: p.left - s.left - m,
        width: p.width,
        height: p.height,
      });
    if (((h.marginTop = 0), (h.marginLeft = 0), !i && r)) {
      var u = +a.marginTop.split("px")[0],
        b = +a.marginLeft.split("px")[0];
      (h.top -= l - u),
        (h.bottom -= l - u),
        (h.left -= m - b),
        (h.right -= m - b),
        (h.marginTop = u),
        (h.marginLeft = b);
    }
    return (
      (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) && (h = f(h, o)), h
    );
  }
  function b(e) {
    var t = window.document.documentElement,
      o = u(e, t),
      i = _(t.clientWidth, window.innerWidth || 0),
      n = _(t.clientHeight, window.innerHeight || 0),
      r = a(t),
      p = a(t, "left"),
      s = {
        top: r - o.top + o.marginTop,
        left: p - o.left + o.marginLeft,
        width: i,
        height: n,
      };
    return c(s);
  }
  function y(e) {
    var i = e.nodeName;
    return "BODY" === i || "HTML" === i
      ? !1
      : "fixed" === t(e, "position") || y(o(e));
  }
  function w(e, t, i, r) {
    var p = { top: 0, left: 0 },
      s = d(e, t);
    if ("viewport" === r) p = b(s);
    else {
      var a;
      "scrollParent" === r
        ? ((a = n(o(e))),
          "BODY" === a.nodeName && (a = window.document.documentElement))
        : "window" === r
        ? (a = window.document.documentElement)
        : (a = r);
      var f = u(a, s);
      if ("HTML" === a.nodeName && !y(s)) {
        var l = h(),
          m = l.height,
          c = l.width;
        (p.top += f.top - f.marginTop),
          (p.bottom = m + f.top),
          (p.left += f.left - f.marginLeft),
          (p.right = c + f.left);
      } else p = f;
    }
    return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p;
  }
  function v(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function E(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = w(o, i, r, n),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height },
      },
      d = Object.keys(s)
        .map(function (e) {
          return se({ key: e }, s[e], { area: v(s[e]) });
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function (e) {
        var t = e.width,
          i = e.height;
        return t >= o.clientWidth && i >= o.clientHeight;
      }),
      f = 0 < a.length ? a[0].key : d[0].key,
      l = e.split("-")[1];
    return f + (l ? "-" + l : "");
  }
  function x(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }
  function O(e) {
    var t = window.getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      n = { width: e.offsetWidth + i, height: e.offsetHeight + o };
    return n;
  }
  function L(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function S(e, t, o) {
    o = o.split("-")[0];
    var i = O(e),
      n = { width: i.width, height: i.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (n[p] = t[p] + t[d] / 2 - i[d] / 2),
      (n[s] = o === s ? t[s] - i[a] : t[L(s)]),
      n
    );
  }
  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function C(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function (e) {
        return e[t] === o;
      });
    var i = T(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }
  function N(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, C(t, "name", i));
    return (
      n.forEach(function (t) {
        t.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var i = t.function || t.fn;
        t.enabled &&
          e(i) &&
          ((o.offsets.popper = c(o.offsets.popper)),
          (o.offsets.reference = c(o.offsets.reference)),
          (o = i(o, t)));
      }),
      o
    );
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = x(this.state, this.popper, this.reference)),
        (e.placement = E(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.offsets.popper = S(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = "absolute"),
        (e = N(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
        i = e.enabled;
      return i && o === t;
    });
  }
  function B(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length - 1;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof window.document.body.style[r]) return r;
    }
    return null;
  }
  function D() {
    return (
      (this.state.isDestroyed = !0),
      W(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.left = ""),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style[B("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function H(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? window : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || H(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function P(e, t, o, i) {
    (o.updateBound = i),
      window.addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      H(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function A() {
    this.state.eventsEnabled ||
      (this.state = P(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function M(e, t) {
    return (
      window.removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function I() {
    this.state.eventsEnabled &&
      (window.cancelAnimationFrame(this.scheduleUpdate),
      (this.state = M(this.reference, this.state)));
  }
  function R(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function U(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        R(t[o]) &&
        (i = "px"),
        (e.style[o] = t[o] + i);
    });
  }
  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function F(e, t, o) {
    var i = T(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      n =
        !!i &&
        e.some(function (e) {
          return e.name === o && e.enabled && e.order < i.order;
        });
    if (!n) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return n;
  }
  function j(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function K(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = ae.indexOf(e),
      i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }
  function q(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +n[1],
      p = n[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = i;
      }
      var d = c(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? _(document.documentElement.clientHeight, window.innerHeight || 0)
            : _(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function G(e, t, o, i) {
    var n = [0, 0],
      r = -1 !== ["right", "left"].indexOf(i),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(
        T(p, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1)),
            ];
    return (
      (a = a.map(function (e, i) {
        var n = (1 === i ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return q(e, n, t, o);
          });
      })),
      a.forEach(function (e, t) {
        e.forEach(function (o, i) {
          R(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
        });
      }),
      n
    );
  }
  for (
    var z = Math.min,
      V = Math.floor,
      _ = Math.max,
      X = ["native code", "[object MutationObserverConstructor]"],
      Q = function (e) {
        return X.some(function (t) {
          return -1 < (e || "").toString().indexOf(t);
        });
      },
      J = "undefined" != typeof window,
      Z = ["Edge", "Trident", "Firefox"],
      $ = 0,
      ee = 0;
    ee < Z.length;
    ee += 1
  )
    if (J && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  var i,
    te = J && Q(window.MutationObserver),
    oe = te
      ? function (e) {
          var t = !1,
            o = 0,
            i = document.createElement("span"),
            n = new MutationObserver(function () {
              e(), (t = !1);
            });
          return (
            n.observe(i, { attributes: !0 }),
            function () {
              t || ((t = !0), i.setAttribute("x-index", o), ++o);
            }
          );
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, $));
          };
        },
    ie = function () {
      return (
        void 0 == i && (i = -1 !== navigator.appVersion.indexOf("MSIE 10")), i
      );
    },
    ne = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    re = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function (t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
      };
    })(),
    pe = function (e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = o),
        e
      );
    },
    se =
      Object.assign ||
      function (e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var i in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      },
    de = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    ae = de.slice(3),
    fe = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    le = (function () {
      function t(o, i) {
        var n = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        ne(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(n.update);
          }),
          (this.update = oe(this.update.bind(this))),
          (this.options = se({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o.jquery ? o[0] : o),
          (this.popper = i.jquery ? i[0] : i),
          (this.options.modifiers = {}),
          Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function (e) {
              n.options.modifiers[e] = se(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return se({ name: e }, n.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(n.reference, n.popper, n.options, t, n.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        re(t, [
          {
            key: "update",
            value: function () {
              return k.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return D.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return A.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return I.call(this);
            },
          },
        ]),
        t
      );
    })();
  return (
    (le.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (le.placements = de),
    (le.Defaults = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = t.split("-")[1];
            if (i) {
              var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                f = {
                  start: pe({}, d, r[d]),
                  end: pe({}, d, r[d] + r[a] - p[a]),
                };
              e.offsets.popper = se({}, p, f[i]);
            }
            return e;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (e, t) {
            var o,
              i = t.offset,
              n = e.placement,
              r = e.offsets,
              p = r.popper,
              s = r.reference,
              d = n.split("-")[0];
            return (
              (o = R(+i) ? [+i, 0] : G(i, p, s, d)),
              "left" === d
                ? ((p.top += o[0]), (p.left -= o[1]))
                : "right" === d
                ? ((p.top += o[0]), (p.left += o[1]))
                : "top" === d
                ? ((p.left += o[0]), (p.top -= o[1]))
                : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
              (e.popper = p),
              e
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, t) {
            var o = t.boundariesElement || r(e.instance.popper);
            e.instance.reference === o && (o = r(o));
            var i = w(e.instance.popper, e.instance.reference, t.padding, o);
            t.boundaries = i;
            var n = t.priority,
              p = e.offsets.popper,
              s = {
                primary: function (e) {
                  var o = p[e];
                  return (
                    p[e] < i[e] &&
                      !t.escapeWithReference &&
                      (o = _(p[e], i[e])),
                    pe({}, e, o)
                  );
                },
                secondary: function (e) {
                  var o = "right" === e ? "left" : "top",
                    n = p[o];
                  return (
                    p[e] > i[e] &&
                      !t.escapeWithReference &&
                      (n = z(
                        p[o],
                        i[e] - ("right" === e ? p.width : p.height)
                      )),
                    pe({}, o, n)
                  );
                },
              };
            return (
              n.forEach(function (e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                p = se({}, p, s[t](e));
              }),
              (e.offsets.popper = p),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split("-")[0],
              r = V,
              p = -1 !== ["top", "bottom"].indexOf(n),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
              o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, t) {
            if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var o = t.element;
            if ("string" == typeof o) {
              if (((o = e.instance.popper.querySelector(o)), !o)) return e;
            } else if (!e.instance.popper.contains(o))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var i = e.placement.split("-")[0],
              n = e.offsets,
              r = n.popper,
              p = n.reference,
              s = -1 !== ["left", "right"].indexOf(i),
              d = s ? "height" : "width",
              a = s ? "top" : "left",
              f = s ? "left" : "top",
              l = s ? "bottom" : "right",
              m = O(o)[d];
            p[l] - m < r[a] && (e.offsets.popper[a] -= r[a] - (p[l] - m)),
              p[a] + m > r[l] && (e.offsets.popper[a] += p[a] + m - r[l]);
            var h = p[a] + p[d] / 2 - m / 2,
              g = h - c(e.offsets.popper)[a];
            return (
              (g = _(z(r[d] - m, g), 0)),
              (e.arrowElement = o),
              (e.offsets.arrow = {}),
              (e.offsets.arrow[a] = Math.round(g)),
              (e.offsets.arrow[f] = ""),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, t) {
            if (W(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = w(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement
              ),
              i = e.placement.split("-")[0],
              n = L(i),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case fe.FLIP:
                p = [i, n];
                break;
              case fe.CLOCKWISE:
                p = K(i);
                break;
              case fe.COUNTERCLOCKWISE:
                p = K(i, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function (s, d) {
                if (i !== s || p.length === d + 1) return e;
                (i = e.placement.split("-")[0]), (n = L(i));
                var a = e.offsets.popper,
                  f = e.offsets.reference,
                  l = V,
                  m =
                    ("left" === i && l(a.right) > l(f.left)) ||
                    ("right" === i && l(a.left) < l(f.right)) ||
                    ("top" === i && l(a.bottom) > l(f.top)) ||
                    ("bottom" === i && l(a.top) < l(f.bottom)),
                  h = l(a.left) < l(o.left),
                  c = l(a.right) > l(o.right),
                  g = l(a.top) < l(o.top),
                  u = l(a.bottom) > l(o.bottom),
                  b =
                    ("left" === i && h) ||
                    ("right" === i && c) ||
                    ("top" === i && g) ||
                    ("bottom" === i && u),
                  y = -1 !== ["top", "bottom"].indexOf(i),
                  w =
                    !!t.flipVariations &&
                    ((y && "start" === r && h) ||
                      (y && "end" === r && c) ||
                      (!y && "start" === r && g) ||
                      (!y && "end" === r && u));
                (m || b || w) &&
                  ((e.flipped = !0),
                  (m || b) && (i = p[d + 1]),
                  w && (r = j(r)),
                  (e.placement = i + (r ? "-" + r : "")),
                  (e.offsets.popper = se(
                    {},
                    e.offsets.popper,
                    S(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = N(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (n[p ? "left" : "top"] =
                r[t] - (s ? n[p ? "width" : "height"] : 0)),
              (e.placement = L(t)),
              (e.offsets.popper = c(n)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== p &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              f = r(e.instance.popper),
              l = g(f),
              m = { position: n.position },
              h = {
                left: V(n.left),
                top: V(n.top),
                bottom: V(n.bottom),
                right: V(n.right),
              },
              c = "bottom" === o ? "top" : "bottom",
              u = "right" === i ? "left" : "right",
              b = B("transform");
            if (
              ((d = "bottom" == c ? -l.height + h.bottom : h.top),
              (s = "right" == u ? -l.width + h.right : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[u] = 0),
                (m.willChange = "transform");
            else {
              var y = "bottom" == c ? -1 : 1,
                w = "right" == u ? -1 : 1;
              (m[c] = d * y), (m[u] = s * w), (m.willChange = c + ", " + u);
            }
            var v = { "x-placement": e.placement };
            return (
              (e.attributes = se({}, v, e.attributes)),
              (e.styles = se({}, m, e.styles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            return (
              U(e.instance.popper, e.styles),
              Y(e.instance.popper, e.attributes),
              e.offsets.arrow && U(e.arrowElement, e.offsets.arrow),
              e
            );
          },
          onLoad: function (e, t, o, i, n) {
            var r = x(n, t, e),
              p = E(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              U(t, { position: "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    le
  );
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v4.1.3 (https://getbootstrap.com/)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e((t.bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, e, h) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function l(r) {
    for (var t = 1; t < arguments.length; t++) {
      var o = null != arguments[t] ? arguments[t] : {},
        e = Object.keys(o);
      "function" == typeof Object.getOwnPropertySymbols &&
        (e = e.concat(
          Object.getOwnPropertySymbols(o).filter(function (t) {
            return Object.getOwnPropertyDescriptor(o, t).enumerable;
          })
        )),
        e.forEach(function (t) {
          var e, n, i;
          (e = r),
            (i = o[(n = t)]),
            n in e
              ? Object.defineProperty(e, n, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = i);
        });
    }
    return r;
  }
  (e = e && e.hasOwnProperty("default") ? e.default : e),
    (h = h && h.hasOwnProperty("default") ? h.default : h);
  var r,
    n,
    o,
    a,
    c,
    u,
    f,
    d,
    g,
    _,
    m,
    p,
    v,
    y,
    E,
    C,
    T,
    b,
    S,
    I,
    A,
    D,
    w,
    N,
    O,
    k,
    P,
    j,
    H,
    L,
    R,
    x,
    W,
    U,
    q,
    F,
    K,
    M,
    Q,
    B,
    V,
    Y,
    z,
    J,
    Z,
    G,
    $,
    X,
    tt,
    et,
    nt,
    it,
    rt,
    ot,
    st,
    at,
    lt,
    ct,
    ht,
    ut,
    ft,
    dt,
    gt,
    _t,
    mt,
    pt,
    vt,
    yt,
    Et,
    Ct,
    Tt,
    bt,
    St,
    It,
    At,
    Dt,
    wt,
    Nt,
    Ot,
    kt,
    Pt,
    jt,
    Ht,
    Lt,
    Rt,
    xt,
    Wt,
    Ut,
    qt,
    Ft,
    Kt,
    Mt,
    Qt,
    Bt,
    Vt,
    Yt,
    zt,
    Jt,
    Zt,
    Gt,
    $t,
    Xt,
    te,
    ee,
    ne,
    ie,
    re,
    oe,
    se,
    ae,
    le,
    ce,
    he,
    ue,
    fe,
    de,
    ge,
    _e,
    me,
    pe,
    ve,
    ye,
    Ee,
    Ce,
    Te,
    be,
    Se,
    Ie,
    Ae,
    De,
    we,
    Ne,
    Oe,
    ke,
    Pe,
    je,
    He,
    Le,
    Re,
    xe,
    We,
    Ue,
    qe,
    Fe,
    Ke,
    Me,
    Qe,
    Be,
    Ve,
    Ye,
    ze,
    Je,
    Ze,
    Ge,
    $e,
    Xe,
    tn,
    en,
    nn,
    rn,
    on,
    sn,
    an,
    ln,
    cn,
    hn,
    un,
    fn,
    dn,
    gn,
    _n,
    mn,
    pn,
    vn,
    yn,
    En,
    Cn,
    Tn,
    bn,
    Sn,
    In,
    An,
    Dn,
    wn,
    Nn,
    On,
    kn,
    Pn,
    jn,
    Hn,
    Ln,
    Rn,
    xn,
    Wn,
    Un,
    qn,
    Fn = (function (i) {
      var e = "transitionend";
      function t(t) {
        var e = this,
          n = !1;
        return (
          i(this).one(l.TRANSITION_END, function () {
            n = !0;
          }),
          setTimeout(function () {
            n || l.triggerTransitionEnd(e);
          }, t),
          this
        );
      }
      var l = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
          for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
          return t;
        },
        getSelectorFromElement: function (t) {
          var e = t.getAttribute("data-target");
          (e && "#" !== e) || (e = t.getAttribute("href") || "");
          try {
            return document.querySelector(e) ? e : null;
          } catch (t) {
            return null;
          }
        },
        getTransitionDurationFromElement: function (t) {
          if (!t) return 0;
          var e = i(t).css("transition-duration");
          return parseFloat(e)
            ? ((e = e.split(",")[0]), 1e3 * parseFloat(e))
            : 0;
        },
        reflow: function (t) {
          return t.offsetHeight;
        },
        triggerTransitionEnd: function (t) {
          i(t).trigger(e);
        },
        supportsTransitionEnd: function () {
          return Boolean(e);
        },
        isElement: function (t) {
          return (t[0] || t).nodeType;
        },
        typeCheckConfig: function (t, e, n) {
          for (var i in n)
            if (Object.prototype.hasOwnProperty.call(n, i)) {
              var r = n[i],
                o = e[i],
                s =
                  o && l.isElement(o)
                    ? "element"
                    : ((a = o),
                      {}.toString
                        .call(a)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase());
              if (!new RegExp(r).test(s))
                throw new Error(
                  t.toUpperCase() +
                    ': Option "' +
                    i +
                    '" provided type "' +
                    s +
                    '" but expected type "' +
                    r +
                    '".'
                );
            }
          var a;
        },
      };
      return (
        (i.fn.emulateTransitionEnd = t),
        (i.event.special[l.TRANSITION_END] = {
          bindType: e,
          delegateType: e,
          handle: function (t) {
            if (i(t.target).is(this))
              return t.handleObj.handler.apply(this, arguments);
          },
        }),
        l
      );
    })(e),
    Kn =
      ((n = "alert"),
      (a = "." + (o = "bs.alert")),
      (c = (r = e).fn[n]),
      (u = {
        CLOSE: "close" + a,
        CLOSED: "closed" + a,
        CLICK_DATA_API: "click" + a + ".data-api",
      }),
      (f = "alert"),
      (d = "fade"),
      (g = "show"),
      (_ = (function () {
        function i(t) {
          this._element = t;
        }
        var t = i.prototype;
        return (
          (t.close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
              this._triggerCloseEvent(e).isDefaultPrevented() ||
                this._removeElement(e);
          }),
          (t.dispose = function () {
            r.removeData(this._element, o), (this._element = null);
          }),
          (t._getRootElement = function (t) {
            var e = Fn.getSelectorFromElement(t),
              n = !1;
            return (
              e && (n = document.querySelector(e)),
              n || (n = r(t).closest("." + f)[0]),
              n
            );
          }),
          (t._triggerCloseEvent = function (t) {
            var e = r.Event(u.CLOSE);
            return r(t).trigger(e), e;
          }),
          (t._removeElement = function (e) {
            var n = this;
            if ((r(e).removeClass(g), r(e).hasClass(d))) {
              var t = Fn.getTransitionDurationFromElement(e);
              r(e)
                .one(Fn.TRANSITION_END, function (t) {
                  return n._destroyElement(e, t);
                })
                .emulateTransitionEnd(t);
            } else this._destroyElement(e);
          }),
          (t._destroyElement = function (t) {
            r(t).detach().trigger(u.CLOSED).remove();
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = r(this),
                e = t.data(o);
              e || ((e = new i(this)), t.data(o, e)),
                "close" === n && e[n](this);
            });
          }),
          (i._handleDismiss = function (e) {
            return function (t) {
              t && t.preventDefault(), e.close(this);
            };
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
          ]),
          i
        );
      })()),
      r(document).on(
        u.CLICK_DATA_API,
        '[data-dismiss="alert"]',
        _._handleDismiss(new _())
      ),
      (r.fn[n] = _._jQueryInterface),
      (r.fn[n].Constructor = _),
      (r.fn[n].noConflict = function () {
        return (r.fn[n] = c), _._jQueryInterface;
      }),
      _),
    Mn =
      ((p = "button"),
      (y = "." + (v = "bs.button")),
      (E = ".data-api"),
      (C = (m = e).fn[p]),
      (T = "active"),
      (b = "btn"),
      (I = '[data-toggle^="button"]'),
      (A = '[data-toggle="buttons"]'),
      (D = "input"),
      (w = ".active"),
      (N = ".btn"),
      (O = {
        CLICK_DATA_API: "click" + y + E,
        FOCUS_BLUR_DATA_API: (S = "focus") + y + E + " blur" + y + E,
      }),
      (k = (function () {
        function n(t) {
          this._element = t;
        }
        var t = n.prototype;
        return (
          (t.toggle = function () {
            var t = !0,
              e = !0,
              n = m(this._element).closest(A)[0];
            if (n) {
              var i = this._element.querySelector(D);
              if (i) {
                if ("radio" === i.type)
                  if (i.checked && this._element.classList.contains(T)) t = !1;
                  else {
                    var r = n.querySelector(w);
                    r && m(r).removeClass(T);
                  }
                if (t) {
                  if (
                    i.hasAttribute("disabled") ||
                    n.hasAttribute("disabled") ||
                    i.classList.contains("disabled") ||
                    n.classList.contains("disabled")
                  )
                    return;
                  (i.checked = !this._element.classList.contains(T)),
                    m(i).trigger("change");
                }
                i.focus(), (e = !1);
              }
            }
            e &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains(T)
              ),
              t && m(this._element).toggleClass(T);
          }),
          (t.dispose = function () {
            m.removeData(this._element, v), (this._element = null);
          }),
          (n._jQueryInterface = function (e) {
            return this.each(function () {
              var t = m(this).data(v);
              t || ((t = new n(this)), m(this).data(v, t)),
                "toggle" === e && t[e]();
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
          ]),
          n
        );
      })()),
      m(document)
        .on(O.CLICK_DATA_API, I, function (t) {
          t.preventDefault();
          var e = t.target;
          m(e).hasClass(b) || (e = m(e).closest(N)),
            k._jQueryInterface.call(m(e), "toggle");
        })
        .on(O.FOCUS_BLUR_DATA_API, I, function (t) {
          var e = m(t.target).closest(N)[0];
          m(e).toggleClass(S, /^focus(in)?$/.test(t.type));
        }),
      (m.fn[p] = k._jQueryInterface),
      (m.fn[p].Constructor = k),
      (m.fn[p].noConflict = function () {
        return (m.fn[p] = C), k._jQueryInterface;
      }),
      k),
    Qn =
      ((j = "carousel"),
      (L = "." + (H = "bs.carousel")),
      (R = ".data-api"),
      (x = (P = e).fn[j]),
      (W = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
      }),
      (U = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
      }),
      (q = "next"),
      (F = "prev"),
      (K = "left"),
      (M = "right"),
      (Q = {
        SLIDE: "slide" + L,
        SLID: "slid" + L,
        KEYDOWN: "keydown" + L,
        MOUSEENTER: "mouseenter" + L,
        MOUSELEAVE: "mouseleave" + L,
        TOUCHEND: "touchend" + L,
        LOAD_DATA_API: "load" + L + R,
        CLICK_DATA_API: "click" + L + R,
      }),
      (B = "carousel"),
      (V = "active"),
      (Y = "slide"),
      (z = "carousel-item-right"),
      (J = "carousel-item-left"),
      (Z = "carousel-item-next"),
      (G = "carousel-item-prev"),
      ($ = ".active"),
      (X = ".active.carousel-item"),
      (tt = ".carousel-item"),
      (et = ".carousel-item-next, .carousel-item-prev"),
      (nt = ".carousel-indicators"),
      (it = "[data-slide], [data-slide-to]"),
      (rt = '[data-ride="carousel"]'),
      (ot = (function () {
        function o(t, e) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this._config = this._getConfig(e)),
            (this._element = P(t)[0]),
            (this._indicatorsElement = this._element.querySelector(nt)),
            this._addEventListeners();
        }
        var t = o.prototype;
        return (
          (t.next = function () {
            this._isSliding || this._slide(q);
          }),
          (t.nextWhenVisible = function () {
            !document.hidden &&
              P(this._element).is(":visible") &&
              "hidden" !== P(this._element).css("visibility") &&
              this.next();
          }),
          (t.prev = function () {
            this._isSliding || this._slide(F);
          }),
          (t.pause = function (t) {
            t || (this._isPaused = !0),
              this._element.querySelector(et) &&
                (Fn.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (t.cycle = function (t) {
            t || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                ));
          }),
          (t.to = function (t) {
            var e = this;
            this._activeElement = this._element.querySelector(X);
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                P(this._element).one(Q.SLID, function () {
                  return e.to(t);
                });
              else {
                if (n === t) return this.pause(), void this.cycle();
                var i = n < t ? q : F;
                this._slide(i, this._items[t]);
              }
          }),
          (t.dispose = function () {
            P(this._element).off(L),
              P.removeData(this._element, H),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (t._getConfig = function (t) {
            return (t = l({}, W, t)), Fn.typeCheckConfig(j, t, U), t;
          }),
          (t._addEventListeners = function () {
            var e = this;
            this._config.keyboard &&
              P(this._element).on(Q.KEYDOWN, function (t) {
                return e._keydown(t);
              }),
              "hover" === this._config.pause &&
                (P(this._element)
                  .on(Q.MOUSEENTER, function (t) {
                    return e.pause(t);
                  })
                  .on(Q.MOUSELEAVE, function (t) {
                    return e.cycle(t);
                  }),
                "ontouchstart" in document.documentElement &&
                  P(this._element).on(Q.TOUCHEND, function () {
                    e.pause(),
                      e.touchTimeout && clearTimeout(e.touchTimeout),
                      (e.touchTimeout = setTimeout(function (t) {
                        return e.cycle(t);
                      }, 500 + e._config.interval));
                  }));
          }),
          (t._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (t._getItemIndex = function (t) {
            return (
              (this._items =
                t && t.parentNode
                  ? [].slice.call(t.parentNode.querySelectorAll(tt))
                  : []),
              this._items.indexOf(t)
            );
          }),
          (t._getItemByDirection = function (t, e) {
            var n = t === q,
              i = t === F,
              r = this._getItemIndex(e),
              o = this._items.length - 1;
            if (((i && 0 === r) || (n && r === o)) && !this._config.wrap)
              return e;
            var s = (r + (t === F ? -1 : 1)) % this._items.length;
            return -1 === s
              ? this._items[this._items.length - 1]
              : this._items[s];
          }),
          (t._triggerSlideEvent = function (t, e) {
            var n = this._getItemIndex(t),
              i = this._getItemIndex(this._element.querySelector(X)),
              r = P.Event(Q.SLIDE, {
                relatedTarget: t,
                direction: e,
                from: i,
                to: n,
              });
            return P(this._element).trigger(r), r;
          }),
          (t._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
              var e = [].slice.call(
                this._indicatorsElement.querySelectorAll($)
              );
              P(e).removeClass(V);
              var n = this._indicatorsElement.children[this._getItemIndex(t)];
              n && P(n).addClass(V);
            }
          }),
          (t._slide = function (t, e) {
            var n,
              i,
              r,
              o = this,
              s = this._element.querySelector(X),
              a = this._getItemIndex(s),
              l = e || (s && this._getItemByDirection(t, s)),
              c = this._getItemIndex(l),
              h = Boolean(this._interval);
            if (
              (t === q
                ? ((n = J), (i = Z), (r = K))
                : ((n = z), (i = G), (r = M)),
              l && P(l).hasClass(V))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(l, r).isDefaultPrevented() &&
              s &&
              l
            ) {
              (this._isSliding = !0),
                h && this.pause(),
                this._setActiveIndicatorElement(l);
              var u = P.Event(Q.SLID, {
                relatedTarget: l,
                direction: r,
                from: a,
                to: c,
              });
              if (P(this._element).hasClass(Y)) {
                P(l).addClass(i),
                  Fn.reflow(l),
                  P(s).addClass(n),
                  P(l).addClass(n);
                var f = Fn.getTransitionDurationFromElement(s);
                P(s)
                  .one(Fn.TRANSITION_END, function () {
                    P(l)
                      .removeClass(n + " " + i)
                      .addClass(V),
                      P(s).removeClass(V + " " + i + " " + n),
                      (o._isSliding = !1),
                      setTimeout(function () {
                        return P(o._element).trigger(u);
                      }, 0);
                  })
                  .emulateTransitionEnd(f);
              } else
                P(s).removeClass(V),
                  P(l).addClass(V),
                  (this._isSliding = !1),
                  P(this._element).trigger(u);
              h && this.cycle();
            }
          }),
          (o._jQueryInterface = function (i) {
            return this.each(function () {
              var t = P(this).data(H),
                e = l({}, W, P(this).data());
              "object" == typeof i && (e = l({}, e, i));
              var n = "string" == typeof i ? i : e.slide;
              if (
                (t || ((t = new o(this, e)), P(this).data(H, t)),
                "number" == typeof i)
              )
                t.to(i);
              else if ("string" == typeof n) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              } else e.interval && (t.pause(), t.cycle());
            });
          }),
          (o._dataApiClickHandler = function (t) {
            var e = Fn.getSelectorFromElement(this);
            if (e) {
              var n = P(e)[0];
              if (n && P(n).hasClass(B)) {
                var i = l({}, P(n).data(), P(this).data()),
                  r = this.getAttribute("data-slide-to");
                r && (i.interval = !1),
                  o._jQueryInterface.call(P(n), i),
                  r && P(n).data(H).to(r),
                  t.preventDefault();
              }
            }
          }),
          s(o, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return W;
              },
            },
          ]),
          o
        );
      })()),
      P(document).on(Q.CLICK_DATA_API, it, ot._dataApiClickHandler),
      P(window).on(Q.LOAD_DATA_API, function () {
        for (
          var t = [].slice.call(document.querySelectorAll(rt)),
            e = 0,
            n = t.length;
          e < n;
          e++
        ) {
          var i = P(t[e]);
          ot._jQueryInterface.call(i, i.data());
        }
      }),
      (P.fn[j] = ot._jQueryInterface),
      (P.fn[j].Constructor = ot),
      (P.fn[j].noConflict = function () {
        return (P.fn[j] = x), ot._jQueryInterface;
      }),
      ot),
    Bn =
      ((at = "collapse"),
      (ct = "." + (lt = "bs.collapse")),
      (ht = (st = e).fn[at]),
      (ut = { toggle: !0, parent: "" }),
      (ft = { toggle: "boolean", parent: "(string|element)" }),
      (dt = {
        SHOW: "show" + ct,
        SHOWN: "shown" + ct,
        HIDE: "hide" + ct,
        HIDDEN: "hidden" + ct,
        CLICK_DATA_API: "click" + ct + ".data-api",
      }),
      (gt = "show"),
      (_t = "collapse"),
      (mt = "collapsing"),
      (pt = "collapsed"),
      (vt = "width"),
      (yt = "height"),
      (Et = ".show, .collapsing"),
      (Ct = '[data-toggle="collapse"]'),
      (Tt = (function () {
        function a(e, t) {
          (this._isTransitioning = !1),
            (this._element = e),
            (this._config = this._getConfig(t)),
            (this._triggerArray = st.makeArray(
              document.querySelectorAll(
                '[data-toggle="collapse"][href="#' +
                  e.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  e.id +
                  '"]'
              )
            ));
          for (
            var n = [].slice.call(document.querySelectorAll(Ct)),
              i = 0,
              r = n.length;
            i < r;
            i++
          ) {
            var o = n[i],
              s = Fn.getSelectorFromElement(o),
              a = [].slice
                .call(document.querySelectorAll(s))
                .filter(function (t) {
                  return t === e;
                });
            null !== s &&
              0 < a.length &&
              ((this._selector = s), this._triggerArray.push(o));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var t = a.prototype;
        return (
          (t.toggle = function () {
            st(this._element).hasClass(gt) ? this.hide() : this.show();
          }),
          (t.show = function () {
            var t,
              e,
              n = this;
            if (
              !this._isTransitioning &&
              !st(this._element).hasClass(gt) &&
              (this._parent &&
                0 ===
                  (t = [].slice
                    .call(this._parent.querySelectorAll(Et))
                    .filter(function (t) {
                      return t.getAttribute("data-parent") === n._config.parent;
                    })).length &&
                (t = null),
              !(
                t &&
                (e = st(t).not(this._selector).data(lt)) &&
                e._isTransitioning
              ))
            ) {
              var i = st.Event(dt.SHOW);
              if ((st(this._element).trigger(i), !i.isDefaultPrevented())) {
                t &&
                  (a._jQueryInterface.call(st(t).not(this._selector), "hide"),
                  e || st(t).data(lt, null));
                var r = this._getDimension();
                st(this._element).removeClass(_t).addClass(mt),
                  (this._element.style[r] = 0),
                  this._triggerArray.length &&
                    st(this._triggerArray)
                      .removeClass(pt)
                      .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var o = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                  s = Fn.getTransitionDurationFromElement(this._element);
                st(this._element)
                  .one(Fn.TRANSITION_END, function () {
                    st(n._element).removeClass(mt).addClass(_t).addClass(gt),
                      (n._element.style[r] = ""),
                      n.setTransitioning(!1),
                      st(n._element).trigger(dt.SHOWN);
                  })
                  .emulateTransitionEnd(s),
                  (this._element.style[r] = this._element[o] + "px");
              }
            }
          }),
          (t.hide = function () {
            var t = this;
            if (!this._isTransitioning && st(this._element).hasClass(gt)) {
              var e = st.Event(dt.HIDE);
              if ((st(this._element).trigger(e), !e.isDefaultPrevented())) {
                var n = this._getDimension();
                (this._element.style[n] =
                  this._element.getBoundingClientRect()[n] + "px"),
                  Fn.reflow(this._element),
                  st(this._element)
                    .addClass(mt)
                    .removeClass(_t)
                    .removeClass(gt);
                var i = this._triggerArray.length;
                if (0 < i)
                  for (var r = 0; r < i; r++) {
                    var o = this._triggerArray[r],
                      s = Fn.getSelectorFromElement(o);
                    if (null !== s)
                      st([].slice.call(document.querySelectorAll(s))).hasClass(
                        gt
                      ) || st(o).addClass(pt).attr("aria-expanded", !1);
                  }
                this.setTransitioning(!0);
                this._element.style[n] = "";
                var a = Fn.getTransitionDurationFromElement(this._element);
                st(this._element)
                  .one(Fn.TRANSITION_END, function () {
                    t.setTransitioning(!1),
                      st(t._element)
                        .removeClass(mt)
                        .addClass(_t)
                        .trigger(dt.HIDDEN);
                  })
                  .emulateTransitionEnd(a);
              }
            }
          }),
          (t.setTransitioning = function (t) {
            this._isTransitioning = t;
          }),
          (t.dispose = function () {
            st.removeData(this._element, lt),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (t._getConfig = function (t) {
            return (
              ((t = l({}, ut, t)).toggle = Boolean(t.toggle)),
              Fn.typeCheckConfig(at, t, ft),
              t
            );
          }),
          (t._getDimension = function () {
            return st(this._element).hasClass(vt) ? vt : yt;
          }),
          (t._getParent = function () {
            var n = this,
              t = null;
            Fn.isElement(this._config.parent)
              ? ((t = this._config.parent),
                "undefined" != typeof this._config.parent.jquery &&
                  (t = this._config.parent[0]))
              : (t = document.querySelector(this._config.parent));
            var e =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]',
              i = [].slice.call(t.querySelectorAll(e));
            return (
              st(i).each(function (t, e) {
                n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
              }),
              t
            );
          }),
          (t._addAriaAndCollapsedClass = function (t, e) {
            if (t) {
              var n = st(t).hasClass(gt);
              e.length && st(e).toggleClass(pt, !n).attr("aria-expanded", n);
            }
          }),
          (a._getTargetFromElement = function (t) {
            var e = Fn.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null;
          }),
          (a._jQueryInterface = function (i) {
            return this.each(function () {
              var t = st(this),
                e = t.data(lt),
                n = l({}, ut, t.data(), "object" == typeof i && i ? i : {});
              if (
                (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
                e || ((e = new a(this, n)), t.data(lt, e)),
                "string" == typeof i)
              ) {
                if ("undefined" == typeof e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              }
            });
          }),
          s(a, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return ut;
              },
            },
          ]),
          a
        );
      })()),
      st(document).on(dt.CLICK_DATA_API, Ct, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = st(this),
          e = Fn.getSelectorFromElement(this),
          i = [].slice.call(document.querySelectorAll(e));
        st(i).each(function () {
          var t = st(this),
            e = t.data(lt) ? "toggle" : n.data();
          Tt._jQueryInterface.call(t, e);
        });
      }),
      (st.fn[at] = Tt._jQueryInterface),
      (st.fn[at].Constructor = Tt),
      (st.fn[at].noConflict = function () {
        return (st.fn[at] = ht), Tt._jQueryInterface;
      }),
      Tt),
    Vn =
      ((St = "dropdown"),
      (At = "." + (It = "bs.dropdown")),
      (Dt = ".data-api"),
      (wt = (bt = e).fn[St]),
      (Nt = new RegExp("38|40|27")),
      (Ot = {
        HIDE: "hide" + At,
        HIDDEN: "hidden" + At,
        SHOW: "show" + At,
        SHOWN: "shown" + At,
        CLICK: "click" + At,
        CLICK_DATA_API: "click" + At + Dt,
        KEYDOWN_DATA_API: "keydown" + At + Dt,
        KEYUP_DATA_API: "keyup" + At + Dt,
      }),
      (kt = "disabled"),
      (Pt = "show"),
      (jt = "dropup"),
      (Ht = "dropright"),
      (Lt = "dropleft"),
      (Rt = "dropdown-menu-right"),
      (xt = "position-static"),
      (Wt = '[data-toggle="dropdown"]'),
      (Ut = ".dropdown form"),
      (qt = ".dropdown-menu"),
      (Ft = ".navbar-nav"),
      (Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"),
      (Mt = "top-start"),
      (Qt = "top-end"),
      (Bt = "bottom-start"),
      (Vt = "bottom-end"),
      (Yt = "right-start"),
      (zt = "left-start"),
      (Jt = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
      }),
      (Zt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
      }),
      (Gt = (function () {
        function c(t, e) {
          (this._element = t),
            (this._popper = null),
            (this._config = this._getConfig(e)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var t = c.prototype;
        return (
          (t.toggle = function () {
            if (!this._element.disabled && !bt(this._element).hasClass(kt)) {
              var t = c._getParentFromElement(this._element),
                e = bt(this._menu).hasClass(Pt);
              if ((c._clearMenus(), !e)) {
                var n = { relatedTarget: this._element },
                  i = bt.Event(Ot.SHOW, n);
                if ((bt(t).trigger(i), !i.isDefaultPrevented())) {
                  if (!this._inNavbar) {
                    if ("undefined" == typeof h)
                      throw new TypeError(
                        "Bootstrap dropdown require Popper.js (https://popper.js.org)"
                      );
                    var r = this._element;
                    "parent" === this._config.reference
                      ? (r = t)
                      : Fn.isElement(this._config.reference) &&
                        ((r = this._config.reference),
                        "undefined" != typeof this._config.reference.jquery &&
                          (r = this._config.reference[0])),
                      "scrollParent" !== this._config.boundary &&
                        bt(t).addClass(xt),
                      (this._popper = new h(
                        r,
                        this._menu,
                        this._getPopperConfig()
                      ));
                  }
                  "ontouchstart" in document.documentElement &&
                    0 === bt(t).closest(Ft).length &&
                    bt(document.body).children().on("mouseover", null, bt.noop),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    bt(this._menu).toggleClass(Pt),
                    bt(t).toggleClass(Pt).trigger(bt.Event(Ot.SHOWN, n));
                }
              }
            }
          }),
          (t.dispose = function () {
            bt.removeData(this._element, It),
              bt(this._element).off(At),
              (this._element = null),
              (this._menu = null) !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (t.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (t._addEventListeners = function () {
            var e = this;
            bt(this._element).on(Ot.CLICK, function (t) {
              t.preventDefault(), t.stopPropagation(), e.toggle();
            });
          }),
          (t._getConfig = function (t) {
            return (
              (t = l(
                {},
                this.constructor.Default,
                bt(this._element).data(),
                t
              )),
              Fn.typeCheckConfig(St, t, this.constructor.DefaultType),
              t
            );
          }),
          (t._getMenuElement = function () {
            if (!this._menu) {
              var t = c._getParentFromElement(this._element);
              t && (this._menu = t.querySelector(qt));
            }
            return this._menu;
          }),
          (t._getPlacement = function () {
            var t = bt(this._element.parentNode),
              e = Bt;
            return (
              t.hasClass(jt)
                ? ((e = Mt), bt(this._menu).hasClass(Rt) && (e = Qt))
                : t.hasClass(Ht)
                ? (e = Yt)
                : t.hasClass(Lt)
                ? (e = zt)
                : bt(this._menu).hasClass(Rt) && (e = Vt),
              e
            );
          }),
          (t._detectNavbar = function () {
            return 0 < bt(this._element).closest(".navbar").length;
          }),
          (t._getPopperConfig = function () {
            var e = this,
              t = {};
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      e._config.offset(t.offsets) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this._config.offset);
            var n = {
              placement: this._getPlacement(),
              modifiers: {
                offset: t,
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (n.modifiers.applyStyle = { enabled: !1 }),
              n
            );
          }),
          (c._jQueryInterface = function (e) {
            return this.each(function () {
              var t = bt(this).data(It);
              if (
                (t ||
                  ((t = new c(this, "object" == typeof e ? e : null)),
                  bt(this).data(It, t)),
                "string" == typeof e)
              ) {
                if ("undefined" == typeof t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          (c._clearMenus = function (t) {
            if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
              for (
                var e = [].slice.call(document.querySelectorAll(Wt)),
                  n = 0,
                  i = e.length;
                n < i;
                n++
              ) {
                var r = c._getParentFromElement(e[n]),
                  o = bt(e[n]).data(It),
                  s = { relatedTarget: e[n] };
                if ((t && "click" === t.type && (s.clickEvent = t), o)) {
                  var a = o._menu;
                  if (
                    bt(r).hasClass(Pt) &&
                    !(
                      t &&
                      (("click" === t.type &&
                        /input|textarea/i.test(t.target.tagName)) ||
                        ("keyup" === t.type && 9 === t.which)) &&
                      bt.contains(r, t.target)
                    )
                  ) {
                    var l = bt.Event(Ot.HIDE, s);
                    bt(r).trigger(l),
                      l.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          bt(document.body)
                            .children()
                            .off("mouseover", null, bt.noop),
                        e[n].setAttribute("aria-expanded", "false"),
                        bt(a).removeClass(Pt),
                        bt(r).removeClass(Pt).trigger(bt.Event(Ot.HIDDEN, s)));
                  }
                }
              }
          }),
          (c._getParentFromElement = function (t) {
            var e,
              n = Fn.getSelectorFromElement(t);
            return n && (e = document.querySelector(n)), e || t.parentNode;
          }),
          (c._dataApiKeydownHandler = function (t) {
            if (
              (/input|textarea/i.test(t.target.tagName)
                ? !(
                    32 === t.which ||
                    (27 !== t.which &&
                      ((40 !== t.which && 38 !== t.which) ||
                        bt(t.target).closest(qt).length))
                  )
                : Nt.test(t.which)) &&
              (t.preventDefault(),
              t.stopPropagation(),
              !this.disabled && !bt(this).hasClass(kt))
            ) {
              var e = c._getParentFromElement(this),
                n = bt(e).hasClass(Pt);
              if (
                (n || (27 === t.which && 32 === t.which)) &&
                (!n || (27 !== t.which && 32 !== t.which))
              ) {
                var i = [].slice.call(e.querySelectorAll(Kt));
                if (0 !== i.length) {
                  var r = i.indexOf(t.target);
                  38 === t.which && 0 < r && r--,
                    40 === t.which && r < i.length - 1 && r++,
                    r < 0 && (r = 0),
                    i[r].focus();
                }
              } else {
                if (27 === t.which) {
                  var o = e.querySelector(Wt);
                  bt(o).trigger("focus");
                }
                bt(this).trigger("click");
              }
            }
          }),
          s(c, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return Jt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Zt;
              },
            },
          ]),
          c
        );
      })()),
      bt(document)
        .on(Ot.KEYDOWN_DATA_API, Wt, Gt._dataApiKeydownHandler)
        .on(Ot.KEYDOWN_DATA_API, qt, Gt._dataApiKeydownHandler)
        .on(Ot.CLICK_DATA_API + " " + Ot.KEYUP_DATA_API, Gt._clearMenus)
        .on(Ot.CLICK_DATA_API, Wt, function (t) {
          t.preventDefault(),
            t.stopPropagation(),
            Gt._jQueryInterface.call(bt(this), "toggle");
        })
        .on(Ot.CLICK_DATA_API, Ut, function (t) {
          t.stopPropagation();
        }),
      (bt.fn[St] = Gt._jQueryInterface),
      (bt.fn[St].Constructor = Gt),
      (bt.fn[St].noConflict = function () {
        return (bt.fn[St] = wt), Gt._jQueryInterface;
      }),
      Gt),
    Yn =
      ((Xt = "modal"),
      (ee = "." + (te = "bs.modal")),
      (ne = ($t = e).fn[Xt]),
      (ie = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
      (re = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      }),
      (oe = {
        HIDE: "hide" + ee,
        HIDDEN: "hidden" + ee,
        SHOW: "show" + ee,
        SHOWN: "shown" + ee,
        FOCUSIN: "focusin" + ee,
        RESIZE: "resize" + ee,
        CLICK_DISMISS: "click.dismiss" + ee,
        KEYDOWN_DISMISS: "keydown.dismiss" + ee,
        MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
        CLICK_DATA_API: "click" + ee + ".data-api",
      }),
      (se = "modal-scrollbar-measure"),
      (ae = "modal-backdrop"),
      (le = "modal-open"),
      (ce = "fade"),
      (he = "show"),
      (ue = ".modal-dialog"),
      (fe = '[data-toggle="modal"]'),
      (de = '[data-dismiss="modal"]'),
      (ge = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"),
      (_e = ".sticky-top"),
      (me = (function () {
        function r(t, e) {
          (this._config = this._getConfig(e)),
            (this._element = t),
            (this._dialog = t.querySelector(ue)),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._scrollbarWidth = 0);
        }
        var t = r.prototype;
        return (
          (t.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t);
          }),
          (t.show = function (t) {
            var e = this;
            if (!this._isTransitioning && !this._isShown) {
              $t(this._element).hasClass(ce) && (this._isTransitioning = !0);
              var n = $t.Event(oe.SHOW, { relatedTarget: t });
              $t(this._element).trigger(n),
                this._isShown ||
                  n.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  $t(document.body).addClass(le),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  $t(this._element).on(oe.CLICK_DISMISS, de, function (t) {
                    return e.hide(t);
                  }),
                  $t(this._dialog).on(oe.MOUSEDOWN_DISMISS, function () {
                    $t(e._element).one(oe.MOUSEUP_DISMISS, function (t) {
                      $t(t.target).is(e._element) &&
                        (e._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return e._showElement(t);
                  }));
            }
          }),
          (t.hide = function (t) {
            var e = this;
            if (
              (t && t.preventDefault(), !this._isTransitioning && this._isShown)
            ) {
              var n = $t.Event(oe.HIDE);
              if (
                ($t(this._element).trigger(n),
                this._isShown && !n.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var i = $t(this._element).hasClass(ce);
                if (
                  (i && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  $t(document).off(oe.FOCUSIN),
                  $t(this._element).removeClass(he),
                  $t(this._element).off(oe.CLICK_DISMISS),
                  $t(this._dialog).off(oe.MOUSEDOWN_DISMISS),
                  i)
                ) {
                  var r = Fn.getTransitionDurationFromElement(this._element);
                  $t(this._element)
                    .one(Fn.TRANSITION_END, function (t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(r);
                } else this._hideModal();
              }
            }
          }),
          (t.dispose = function () {
            $t.removeData(this._element, te),
              $t(window, document, this._element, this._backdrop).off(ee),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._scrollbarWidth = null);
          }),
          (t.handleUpdate = function () {
            this._adjustDialog();
          }),
          (t._getConfig = function (t) {
            return (t = l({}, ie, t)), Fn.typeCheckConfig(Xt, t, re), t;
          }),
          (t._showElement = function (t) {
            var e = this,
              n = $t(this._element).hasClass(ce);
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              (this._element.scrollTop = 0),
              n && Fn.reflow(this._element),
              $t(this._element).addClass(he),
              this._config.focus && this._enforceFocus();
            var i = $t.Event(oe.SHOWN, { relatedTarget: t }),
              r = function () {
                e._config.focus && e._element.focus(),
                  (e._isTransitioning = !1),
                  $t(e._element).trigger(i);
              };
            if (n) {
              var o = Fn.getTransitionDurationFromElement(this._element);
              $t(this._dialog)
                .one(Fn.TRANSITION_END, r)
                .emulateTransitionEnd(o);
            } else r();
          }),
          (t._enforceFocus = function () {
            var e = this;
            $t(document)
              .off(oe.FOCUSIN)
              .on(oe.FOCUSIN, function (t) {
                document !== t.target &&
                  e._element !== t.target &&
                  0 === $t(e._element).has(t.target).length &&
                  e._element.focus();
              });
          }),
          (t._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard
              ? $t(this._element).on(oe.KEYDOWN_DISMISS, function (t) {
                  27 === t.which && (t.preventDefault(), e.hide());
                })
              : this._isShown || $t(this._element).off(oe.KEYDOWN_DISMISS);
          }),
          (t._setResizeEvent = function () {
            var e = this;
            this._isShown
              ? $t(window).on(oe.RESIZE, function (t) {
                  return e.handleUpdate(t);
                })
              : $t(window).off(oe.RESIZE);
          }),
          (t._hideModal = function () {
            var t = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                $t(document.body).removeClass(le),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  $t(t._element).trigger(oe.HIDDEN);
              });
          }),
          (t._removeBackdrop = function () {
            this._backdrop &&
              ($t(this._backdrop).remove(), (this._backdrop = null));
          }),
          (t._showBackdrop = function (t) {
            var e = this,
              n = $t(this._element).hasClass(ce) ? ce : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = ae),
                n && this._backdrop.classList.add(n),
                $t(this._backdrop).appendTo(document.body),
                $t(this._element).on(oe.CLICK_DISMISS, function (t) {
                  e._ignoreBackdropClick
                    ? (e._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      ("static" === e._config.backdrop
                        ? e._element.focus()
                        : e.hide());
                }),
                n && Fn.reflow(this._backdrop),
                $t(this._backdrop).addClass(he),
                !t)
              )
                return;
              if (!n) return void t();
              var i = Fn.getTransitionDurationFromElement(this._backdrop);
              $t(this._backdrop)
                .one(Fn.TRANSITION_END, t)
                .emulateTransitionEnd(i);
            } else if (!this._isShown && this._backdrop) {
              $t(this._backdrop).removeClass(he);
              var r = function () {
                e._removeBackdrop(), t && t();
              };
              if ($t(this._element).hasClass(ce)) {
                var o = Fn.getTransitionDurationFromElement(this._backdrop);
                $t(this._backdrop)
                  .one(Fn.TRANSITION_END, r)
                  .emulateTransitionEnd(o);
              } else r();
            } else t && t();
          }),
          (t._adjustDialog = function () {
            var t =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !t &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + "px");
          }),
          (t._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (t._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (t._setScrollbar = function () {
            var r = this;
            if (this._isBodyOverflowing) {
              var t = [].slice.call(document.querySelectorAll(ge)),
                e = [].slice.call(document.querySelectorAll(_e));
              $t(t).each(function (t, e) {
                var n = e.style.paddingRight,
                  i = $t(e).css("padding-right");
                $t(e)
                  .data("padding-right", n)
                  .css(
                    "padding-right",
                    parseFloat(i) + r._scrollbarWidth + "px"
                  );
              }),
                $t(e).each(function (t, e) {
                  var n = e.style.marginRight,
                    i = $t(e).css("margin-right");
                  $t(e)
                    .data("margin-right", n)
                    .css(
                      "margin-right",
                      parseFloat(i) - r._scrollbarWidth + "px"
                    );
                });
              var n = document.body.style.paddingRight,
                i = $t(document.body).css("padding-right");
              $t(document.body)
                .data("padding-right", n)
                .css(
                  "padding-right",
                  parseFloat(i) + this._scrollbarWidth + "px"
                );
            }
          }),
          (t._resetScrollbar = function () {
            var t = [].slice.call(document.querySelectorAll(ge));
            $t(t).each(function (t, e) {
              var n = $t(e).data("padding-right");
              $t(e).removeData("padding-right"),
                (e.style.paddingRight = n || "");
            });
            var e = [].slice.call(document.querySelectorAll("" + _e));
            $t(e).each(function (t, e) {
              var n = $t(e).data("margin-right");
              "undefined" != typeof n &&
                $t(e).css("margin-right", n).removeData("margin-right");
            });
            var n = $t(document.body).data("padding-right");
            $t(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = n || "");
          }),
          (t._getScrollbarWidth = function () {
            var t = document.createElement("div");
            (t.className = se), document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (r._jQueryInterface = function (n, i) {
            return this.each(function () {
              var t = $t(this).data(te),
                e = l(
                  {},
                  ie,
                  $t(this).data(),
                  "object" == typeof n && n ? n : {}
                );
              if (
                (t || ((t = new r(this, e)), $t(this).data(te, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n](i);
              } else e.show && t.show(i);
            });
          }),
          s(r, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return ie;
              },
            },
          ]),
          r
        );
      })()),
      $t(document).on(oe.CLICK_DATA_API, fe, function (t) {
        var e,
          n = this,
          i = Fn.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var r = $t(e).data(te)
          ? "toggle"
          : l({}, $t(e).data(), $t(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
        var o = $t(e).one(oe.SHOW, function (t) {
          t.isDefaultPrevented() ||
            o.one(oe.HIDDEN, function () {
              $t(n).is(":visible") && n.focus();
            });
        });
        me._jQueryInterface.call($t(e), r, this);
      }),
      ($t.fn[Xt] = me._jQueryInterface),
      ($t.fn[Xt].Constructor = me),
      ($t.fn[Xt].noConflict = function () {
        return ($t.fn[Xt] = ne), me._jQueryInterface;
      }),
      me),
    zn =
      ((ve = "tooltip"),
      (Ee = "." + (ye = "bs.tooltip")),
      (Ce = (pe = e).fn[ve]),
      (Te = "bs-tooltip"),
      (be = new RegExp("(^|\\s)" + Te + "\\S+", "g")),
      (Ae = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !(Ie = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left",
        }),
        selector: !(Se = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)",
        }),
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
      }),
      (we = "out"),
      (Ne = {
        HIDE: "hide" + Ee,
        HIDDEN: "hidden" + Ee,
        SHOW: (De = "show") + Ee,
        SHOWN: "shown" + Ee,
        INSERTED: "inserted" + Ee,
        CLICK: "click" + Ee,
        FOCUSIN: "focusin" + Ee,
        FOCUSOUT: "focusout" + Ee,
        MOUSEENTER: "mouseenter" + Ee,
        MOUSELEAVE: "mouseleave" + Ee,
      }),
      (Oe = "fade"),
      (ke = "show"),
      (Pe = ".tooltip-inner"),
      (je = ".arrow"),
      (He = "hover"),
      (Le = "focus"),
      (Re = "click"),
      (xe = "manual"),
      (We = (function () {
        function i(t, e) {
          if ("undefined" == typeof h)
            throw new TypeError(
              "Bootstrap tooltips require Popper.js (https://popper.js.org)"
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ""),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = t),
            (this.config = this._getConfig(e)),
            (this.tip = null),
            this._setListeners();
        }
        var t = i.prototype;
        return (
          (t.enable = function () {
            this._isEnabled = !0;
          }),
          (t.disable = function () {
            this._isEnabled = !1;
          }),
          (t.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (t.toggle = function (t) {
            if (this._isEnabled)
              if (t) {
                var e = this.constructor.DATA_KEY,
                  n = pe(t.currentTarget).data(e);
                n ||
                  ((n = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  pe(t.currentTarget).data(e, n)),
                  (n._activeTrigger.click = !n._activeTrigger.click),
                  n._isWithActiveTrigger()
                    ? n._enter(null, n)
                    : n._leave(null, n);
              } else {
                if (pe(this.getTipElement()).hasClass(ke))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (t.dispose = function () {
            clearTimeout(this._timeout),
              pe.removeData(this.element, this.constructor.DATA_KEY),
              pe(this.element).off(this.constructor.EVENT_KEY),
              pe(this.element).closest(".modal").off("hide.bs.modal"),
              this.tip && pe(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null) !== this._popper &&
                this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (t.show = function () {
            var e = this;
            if ("none" === pe(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var t = pe.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              pe(this.element).trigger(t);
              var n = pe.contains(
                this.element.ownerDocument.documentElement,
                this.element
              );
              if (t.isDefaultPrevented() || !n) return;
              var i = this.getTipElement(),
                r = Fn.getUID(this.constructor.NAME);
              i.setAttribute("id", r),
                this.element.setAttribute("aria-describedby", r),
                this.setContent(),
                this.config.animation && pe(i).addClass(Oe);
              var o =
                  "function" == typeof this.config.placement
                    ? this.config.placement.call(this, i, this.element)
                    : this.config.placement,
                s = this._getAttachment(o);
              this.addAttachmentClass(s);
              var a =
                !1 === this.config.container
                  ? document.body
                  : pe(document).find(this.config.container);
              pe(i).data(this.constructor.DATA_KEY, this),
                pe.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || pe(i).appendTo(a),
                pe(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new h(this.element, i, {
                  placement: s,
                  modifiers: {
                    offset: { offset: this.config.offset },
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: je },
                    preventOverflow: {
                      boundariesElement: this.config.boundary,
                    },
                  },
                  onCreate: function (t) {
                    t.originalPlacement !== t.placement &&
                      e._handlePopperPlacementChange(t);
                  },
                  onUpdate: function (t) {
                    e._handlePopperPlacementChange(t);
                  },
                })),
                pe(i).addClass(ke),
                "ontouchstart" in document.documentElement &&
                  pe(document.body).children().on("mouseover", null, pe.noop);
              var l = function () {
                e.config.animation && e._fixTransition();
                var t = e._hoverState;
                (e._hoverState = null),
                  pe(e.element).trigger(e.constructor.Event.SHOWN),
                  t === we && e._leave(null, e);
              };
              if (pe(this.tip).hasClass(Oe)) {
                var c = Fn.getTransitionDurationFromElement(this.tip);
                pe(this.tip).one(Fn.TRANSITION_END, l).emulateTransitionEnd(c);
              } else l();
            }
          }),
          (t.hide = function (t) {
            var e = this,
              n = this.getTipElement(),
              i = pe.Event(this.constructor.Event.HIDE),
              r = function () {
                e._hoverState !== De &&
                  n.parentNode &&
                  n.parentNode.removeChild(n),
                  e._cleanTipClass(),
                  e.element.removeAttribute("aria-describedby"),
                  pe(e.element).trigger(e.constructor.Event.HIDDEN),
                  null !== e._popper && e._popper.destroy(),
                  t && t();
              };
            if ((pe(this.element).trigger(i), !i.isDefaultPrevented())) {
              if (
                (pe(n).removeClass(ke),
                "ontouchstart" in document.documentElement &&
                  pe(document.body).children().off("mouseover", null, pe.noop),
                (this._activeTrigger[Re] = !1),
                (this._activeTrigger[Le] = !1),
                (this._activeTrigger[He] = !1),
                pe(this.tip).hasClass(Oe))
              ) {
                var o = Fn.getTransitionDurationFromElement(n);
                pe(n).one(Fn.TRANSITION_END, r).emulateTransitionEnd(o);
              } else r();
              this._hoverState = "";
            }
          }),
          (t.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (t.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (t.addAttachmentClass = function (t) {
            pe(this.getTipElement()).addClass(Te + "-" + t);
          }),
          (t.getTipElement = function () {
            return (
              (this.tip = this.tip || pe(this.config.template)[0]), this.tip
            );
          }),
          (t.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(pe(t.querySelectorAll(Pe)), this.getTitle()),
              pe(t).removeClass(Oe + " " + ke);
          }),
          (t.setElementContent = function (t, e) {
            var n = this.config.html;
            "object" == typeof e && (e.nodeType || e.jquery)
              ? n
                ? pe(e).parent().is(t) || t.empty().append(e)
                : t.text(pe(e).text())
              : t[n ? "html" : "text"](e);
          }),
          (t.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return (
              t ||
                (t =
                  "function" == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title),
              t
            );
          }),
          (t._getAttachment = function (t) {
            return Ie[t.toUpperCase()];
          }),
          (t._setListeners = function () {
            var i = this;
            this.config.trigger.split(" ").forEach(function (t) {
              if ("click" === t)
                pe(i.element).on(
                  i.constructor.Event.CLICK,
                  i.config.selector,
                  function (t) {
                    return i.toggle(t);
                  }
                );
              else if (t !== xe) {
                var e =
                    t === He
                      ? i.constructor.Event.MOUSEENTER
                      : i.constructor.Event.FOCUSIN,
                  n =
                    t === He
                      ? i.constructor.Event.MOUSELEAVE
                      : i.constructor.Event.FOCUSOUT;
                pe(i.element)
                  .on(e, i.config.selector, function (t) {
                    return i._enter(t);
                  })
                  .on(n, i.config.selector, function (t) {
                    return i._leave(t);
                  });
              }
              pe(i.element)
                .closest(".modal")
                .on("hide.bs.modal", function () {
                  return i.hide();
                });
            }),
              this.config.selector
                ? (this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: "",
                  }))
                : this._fixTitle();
          }),
          (t._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== t) &&
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
              this.element.setAttribute("title", ""));
          }),
          (t._enter = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || pe(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              pe(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusin" === t.type ? Le : He] = !0),
              pe(e.getTipElement()).hasClass(ke) || e._hoverState === De
                ? (e._hoverState = De)
                : (clearTimeout(e._timeout),
                  (e._hoverState = De),
                  e.config.delay && e.config.delay.show
                    ? (e._timeout = setTimeout(function () {
                        e._hoverState === De && e.show();
                      }, e.config.delay.show))
                    : e.show());
          }),
          (t._leave = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || pe(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              pe(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusout" === t.type ? Le : He] = !1),
              e._isWithActiveTrigger() ||
                (clearTimeout(e._timeout),
                (e._hoverState = we),
                e.config.delay && e.config.delay.hide
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === we && e.hide();
                    }, e.config.delay.hide))
                  : e.hide());
          }),
          (t._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (t._getConfig = function (t) {
            return (
              "number" ==
                typeof (t = l(
                  {},
                  this.constructor.Default,
                  pe(this.element).data(),
                  "object" == typeof t && t ? t : {}
                )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              "number" == typeof t.title && (t.title = t.title.toString()),
              "number" == typeof t.content &&
                (t.content = t.content.toString()),
              Fn.typeCheckConfig(ve, t, this.constructor.DefaultType),
              t
            );
          }),
          (t._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (t._cleanTipClass = function () {
            var t = pe(this.getTipElement()),
              e = t.attr("class").match(be);
            null !== e && e.length && t.removeClass(e.join(""));
          }),
          (t._handlePopperPlacementChange = function (t) {
            var e = t.instance;
            (this.tip = e.popper),
              this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (t._fixTransition = function () {
            var t = this.getTipElement(),
              e = this.config.animation;
            null === t.getAttribute("x-placement") &&
              (pe(t).removeClass(Oe),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = e));
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = pe(this).data(ye),
                e = "object" == typeof n && n;
              if (
                (t || !/dispose|hide/.test(n)) &&
                (t || ((t = new i(this, e)), pe(this).data(ye, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              }
            });
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return Ae;
              },
            },
            {
              key: "NAME",
              get: function () {
                return ve;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return ye;
              },
            },
            {
              key: "Event",
              get: function () {
                return Ne;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Ee;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Se;
              },
            },
          ]),
          i
        );
      })()),
      (pe.fn[ve] = We._jQueryInterface),
      (pe.fn[ve].Constructor = We),
      (pe.fn[ve].noConflict = function () {
        return (pe.fn[ve] = Ce), We._jQueryInterface;
      }),
      We),
    Jn =
      ((qe = "popover"),
      (Ke = "." + (Fe = "bs.popover")),
      (Me = (Ue = e).fn[qe]),
      (Qe = "bs-popover"),
      (Be = new RegExp("(^|\\s)" + Qe + "\\S+", "g")),
      (Ve = l({}, zn.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      })),
      (Ye = l({}, zn.DefaultType, { content: "(string|element|function)" })),
      (ze = "fade"),
      (Ze = ".popover-header"),
      (Ge = ".popover-body"),
      ($e = {
        HIDE: "hide" + Ke,
        HIDDEN: "hidden" + Ke,
        SHOW: (Je = "show") + Ke,
        SHOWN: "shown" + Ke,
        INSERTED: "inserted" + Ke,
        CLICK: "click" + Ke,
        FOCUSIN: "focusin" + Ke,
        FOCUSOUT: "focusout" + Ke,
        MOUSEENTER: "mouseenter" + Ke,
        MOUSELEAVE: "mouseleave" + Ke,
      }),
      (Xe = (function (t) {
        var e, n;
        function i() {
          return t.apply(this, arguments) || this;
        }
        (n = t),
          ((e = i).prototype = Object.create(n.prototype)),
          ((e.prototype.constructor = e).__proto__ = n);
        var r = i.prototype;
        return (
          (r.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (r.addAttachmentClass = function (t) {
            Ue(this.getTipElement()).addClass(Qe + "-" + t);
          }),
          (r.getTipElement = function () {
            return (
              (this.tip = this.tip || Ue(this.config.template)[0]), this.tip
            );
          }),
          (r.setContent = function () {
            var t = Ue(this.getTipElement());
            this.setElementContent(t.find(Ze), this.getTitle());
            var e = this._getContent();
            "function" == typeof e && (e = e.call(this.element)),
              this.setElementContent(t.find(Ge), e),
              t.removeClass(ze + " " + Je);
          }),
          (r._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (r._cleanTipClass = function () {
            var t = Ue(this.getTipElement()),
              e = t.attr("class").match(Be);
            null !== e && 0 < e.length && t.removeClass(e.join(""));
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = Ue(this).data(Fe),
                e = "object" == typeof n ? n : null;
              if (
                (t || !/destroy|hide/.test(n)) &&
                (t || ((t = new i(this, e)), Ue(this).data(Fe, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              }
            });
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return Ve;
              },
            },
            {
              key: "NAME",
              get: function () {
                return qe;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return Fe;
              },
            },
            {
              key: "Event",
              get: function () {
                return $e;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Ke;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Ye;
              },
            },
          ]),
          i
        );
      })(zn)),
      (Ue.fn[qe] = Xe._jQueryInterface),
      (Ue.fn[qe].Constructor = Xe),
      (Ue.fn[qe].noConflict = function () {
        return (Ue.fn[qe] = Me), Xe._jQueryInterface;
      }),
      Xe),
    Zn =
      ((en = "scrollspy"),
      (rn = "." + (nn = "bs.scrollspy")),
      (on = (tn = e).fn[en]),
      (sn = { offset: 10, method: "auto", target: "" }),
      (an = { offset: "number", method: "string", target: "(string|element)" }),
      (ln = {
        ACTIVATE: "activate" + rn,
        SCROLL: "scroll" + rn,
        LOAD_DATA_API: "load" + rn + ".data-api",
      }),
      (cn = "dropdown-item"),
      (hn = "active"),
      (un = '[data-spy="scroll"]'),
      (fn = ".active"),
      (dn = ".nav, .list-group"),
      (gn = ".nav-link"),
      (_n = ".nav-item"),
      (mn = ".list-group-item"),
      (pn = ".dropdown"),
      (vn = ".dropdown-item"),
      (yn = ".dropdown-toggle"),
      (En = "offset"),
      (Cn = "position"),
      (Tn = (function () {
        function n(t, e) {
          var n = this;
          (this._element = t),
            (this._scrollElement = "BODY" === t.tagName ? window : t),
            (this._config = this._getConfig(e)),
            (this._selector =
              this._config.target +
              " " +
              gn +
              "," +
              this._config.target +
              " " +
              mn +
              "," +
              this._config.target +
              " " +
              vn),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            tn(this._scrollElement).on(ln.SCROLL, function (t) {
              return n._process(t);
            }),
            this.refresh(),
            this._process();
        }
        var t = n.prototype;
        return (
          (t.refresh = function () {
            var e = this,
              t = this._scrollElement === this._scrollElement.window ? En : Cn,
              r = "auto" === this._config.method ? t : this._config.method,
              o = r === Cn ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              [].slice
                .call(document.querySelectorAll(this._selector))
                .map(function (t) {
                  var e,
                    n = Fn.getSelectorFromElement(t);
                  if ((n && (e = document.querySelector(n)), e)) {
                    var i = e.getBoundingClientRect();
                    if (i.width || i.height) return [tn(e)[r]().top + o, n];
                  }
                  return null;
                })
                .filter(function (t) {
                  return t;
                })
                .sort(function (t, e) {
                  return t[0] - e[0];
                })
                .forEach(function (t) {
                  e._offsets.push(t[0]), e._targets.push(t[1]);
                });
          }),
          (t.dispose = function () {
            tn.removeData(this._element, nn),
              tn(this._scrollElement).off(rn),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (t._getConfig = function (t) {
            if (
              "string" !=
              typeof (t = l({}, sn, "object" == typeof t && t ? t : {})).target
            ) {
              var e = tn(t.target).attr("id");
              e || ((e = Fn.getUID(en)), tn(t.target).attr("id", e)),
                (t.target = "#" + e);
            }
            return Fn.typeCheckConfig(en, t, an), t;
          }),
          (t._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (t._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (t._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (t._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
              var i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var r = this._offsets.length; r--; ) {
                this._activeTarget !== this._targets[r] &&
                  t >= this._offsets[r] &&
                  ("undefined" == typeof this._offsets[r + 1] ||
                    t < this._offsets[r + 1]) &&
                  this._activate(this._targets[r]);
              }
            }
          }),
          (t._activate = function (e) {
            (this._activeTarget = e), this._clear();
            var t = this._selector.split(",");
            t = t.map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            });
            var n = tn([].slice.call(document.querySelectorAll(t.join(","))));
            n.hasClass(cn)
              ? (n.closest(pn).find(yn).addClass(hn), n.addClass(hn))
              : (n.addClass(hn),
                n
                  .parents(dn)
                  .prev(gn + ", " + mn)
                  .addClass(hn),
                n.parents(dn).prev(_n).children(gn).addClass(hn)),
              tn(this._scrollElement).trigger(ln.ACTIVATE, {
                relatedTarget: e,
              });
          }),
          (t._clear = function () {
            var t = [].slice.call(document.querySelectorAll(this._selector));
            tn(t).filter(fn).removeClass(hn);
          }),
          (n._jQueryInterface = function (e) {
            return this.each(function () {
              var t = tn(this).data(nn);
              if (
                (t ||
                  ((t = new n(this, "object" == typeof e && e)),
                  tn(this).data(nn, t)),
                "string" == typeof e)
              ) {
                if ("undefined" == typeof t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return sn;
              },
            },
          ]),
          n
        );
      })()),
      tn(window).on(ln.LOAD_DATA_API, function () {
        for (
          var t = [].slice.call(document.querySelectorAll(un)), e = t.length;
          e--;

        ) {
          var n = tn(t[e]);
          Tn._jQueryInterface.call(n, n.data());
        }
      }),
      (tn.fn[en] = Tn._jQueryInterface),
      (tn.fn[en].Constructor = Tn),
      (tn.fn[en].noConflict = function () {
        return (tn.fn[en] = on), Tn._jQueryInterface;
      }),
      Tn),
    Gn =
      ((In = "." + (Sn = "bs.tab")),
      (An = (bn = e).fn.tab),
      (Dn = {
        HIDE: "hide" + In,
        HIDDEN: "hidden" + In,
        SHOW: "show" + In,
        SHOWN: "shown" + In,
        CLICK_DATA_API: "click" + In + ".data-api",
      }),
      (wn = "dropdown-menu"),
      (Nn = "active"),
      (On = "disabled"),
      (kn = "fade"),
      (Pn = "show"),
      (jn = ".dropdown"),
      (Hn = ".nav, .list-group"),
      (Ln = ".active"),
      (Rn = "> li > .active"),
      (xn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'),
      (Wn = ".dropdown-toggle"),
      (Un = "> .dropdown-menu .active"),
      (qn = (function () {
        function i(t) {
          this._element = t;
        }
        var t = i.prototype;
        return (
          (t.show = function () {
            var n = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  bn(this._element).hasClass(Nn)) ||
                bn(this._element).hasClass(On)
              )
            ) {
              var t,
                i,
                e = bn(this._element).closest(Hn)[0],
                r = Fn.getSelectorFromElement(this._element);
              if (e) {
                var o = "UL" === e.nodeName ? Rn : Ln;
                i = (i = bn.makeArray(bn(e).find(o)))[i.length - 1];
              }
              var s = bn.Event(Dn.HIDE, { relatedTarget: this._element }),
                a = bn.Event(Dn.SHOW, { relatedTarget: i });
              if (
                (i && bn(i).trigger(s),
                bn(this._element).trigger(a),
                !a.isDefaultPrevented() && !s.isDefaultPrevented())
              ) {
                r && (t = document.querySelector(r)),
                  this._activate(this._element, e);
                var l = function () {
                  var t = bn.Event(Dn.HIDDEN, { relatedTarget: n._element }),
                    e = bn.Event(Dn.SHOWN, { relatedTarget: i });
                  bn(i).trigger(t), bn(n._element).trigger(e);
                };
                t ? this._activate(t, t.parentNode, l) : l();
              }
            }
          }),
          (t.dispose = function () {
            bn.removeData(this._element, Sn), (this._element = null);
          }),
          (t._activate = function (t, e, n) {
            var i = this,
              r = (
                "UL" === e.nodeName ? bn(e).find(Rn) : bn(e).children(Ln)
              )[0],
              o = n && r && bn(r).hasClass(kn),
              s = function () {
                return i._transitionComplete(t, r, n);
              };
            if (r && o) {
              var a = Fn.getTransitionDurationFromElement(r);
              bn(r).one(Fn.TRANSITION_END, s).emulateTransitionEnd(a);
            } else s();
          }),
          (t._transitionComplete = function (t, e, n) {
            if (e) {
              bn(e).removeClass(Pn + " " + Nn);
              var i = bn(e.parentNode).find(Un)[0];
              i && bn(i).removeClass(Nn),
                "tab" === e.getAttribute("role") &&
                  e.setAttribute("aria-selected", !1);
            }
            if (
              (bn(t).addClass(Nn),
              "tab" === t.getAttribute("role") &&
                t.setAttribute("aria-selected", !0),
              Fn.reflow(t),
              bn(t).addClass(Pn),
              t.parentNode && bn(t.parentNode).hasClass(wn))
            ) {
              var r = bn(t).closest(jn)[0];
              if (r) {
                var o = [].slice.call(r.querySelectorAll(Wn));
                bn(o).addClass(Nn);
              }
              t.setAttribute("aria-expanded", !0);
            }
            n && n();
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = bn(this),
                e = t.data(Sn);
              if (
                (e || ((e = new i(this)), t.data(Sn, e)), "string" == typeof n)
              ) {
                if ("undefined" == typeof e[n])
                  throw new TypeError('No method named "' + n + '"');
                e[n]();
              }
            });
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
          ]),
          i
        );
      })()),
      bn(document).on(Dn.CLICK_DATA_API, xn, function (t) {
        t.preventDefault(), qn._jQueryInterface.call(bn(this), "show");
      }),
      (bn.fn.tab = qn._jQueryInterface),
      (bn.fn.tab.Constructor = qn),
      (bn.fn.tab.noConflict = function () {
        return (bn.fn.tab = An), qn._jQueryInterface;
      }),
      qn);
  !(function (t) {
    if ("undefined" == typeof t)
      throw new TypeError(
        "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
      );
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (
      (e[0] < 2 && e[1] < 9) ||
      (1 === e[0] && 9 === e[1] && e[2] < 1) ||
      4 <= e[0]
    )
      throw new Error(
        "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
      );
  })(e),
    (t.Util = Fn),
    (t.Alert = Kn),
    (t.Button = Mn),
    (t.Carousel = Qn),
    (t.Collapse = Bn),
    (t.Dropdown = Vn),
    (t.Modal = Yn),
    (t.Popover = Jn),
    (t.Scrollspy = Zn),
    (t.Tab = Gn),
    (t.Tooltip = zn),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=bootstrap.min.js.map

/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/ (function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.createEvent = function (a, b, c, d) {
        var e;
        return (
          null == b && (b = !1),
          null == c && (c = !1),
          null == d && (d = null),
          null != document.createEvent
            ? ((e = document.createEvent("CustomEvent")),
              e.initCustomEvent(a, b, c, d))
            : null != document.createEventObject
            ? ((e = document.createEventObject()), (e.eventType = a))
            : (e.eventName = a),
          e
        );
      }),
      (a.prototype.emitEvent = function (a, b) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(b)
          : b in (null != a)
          ? a[b]()
          : "on" + b in (null != a)
          ? a["on" + b]()
          : void 0;
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a, b) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          null != a.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer
            )),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass));
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      var c, d, e, f, g;
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        (f = b[c]),
                          g.push(
                            function () {
                              var a, b, c, d;
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                (e = c[a]), d.push(this.doSync(e));
                              return d;
                            }.call(a)
                          );
                      return g;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler
            ),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function (b) {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.resetAnimation = function (a) {
          var b;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          d = [];
          for (c in b)
            (e = b[c]),
              (a["" + c] = e),
              d.push(
                function () {
                  var b, d, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    (f = g[b]),
                      h.push(
                        (a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                          e)
                      );
                  return h;
                }.call(this)
              );
          return d;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
          return g;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}).call(this);

/* ============================================================
 * retina-replace.min.js v1.0
 * http://github.com/leonsmith/retina-replace-js
 * ============================================================
 * Author: Leon Smith
 * Twitter: @nullUK
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
 * ============================================================ */
(function (a) {
  var e = function (d, c) {
    this.options = c;
    var b = a(d),
      g = b.is("img"),
      f = g ? b.attr("src") : b.backgroundImageUrl(),
      f = this.options.generateUrl(b, f);
    a("<img/>")
      .attr("src", f)
      .load(function () {
        g
          ? b.attr("src", a(this).attr("src"))
          : (b.backgroundImageUrl(a(this).attr("src")),
            b.backgroundSize(a(this)[0].width, a(this)[0].height));
        b.attr("data-retina", "complete");
      });
  };
  e.prototype = { constructor: e };
  a.fn.retinaReplace = function (d) {
    var c;
    c = void 0 === window.devicePixelRatio ? 1 : window.devicePixelRatio;
    return 1 >= c
      ? this
      : this.each(function () {
          var b = a(this),
            c = b.data("retinaReplace"),
            f = a.extend(
              {},
              a.fn.retinaReplace.defaults,
              b.data(),
              "object" == typeof d && d
            );
          c || b.data("retinaReplace", (c = new e(this, f)));
          if ("string" == typeof d) c[d]();
        });
  };
  a.fn.retinaReplace.defaults = {
    suffix: "_2x",
    generateUrl: function (a, c) {
      var b = c.lastIndexOf("."),
        e = c.substr(b + 1);
      return c.substr(0, b) + this.suffix + "." + e;
    },
  };
  a.fn.retinaReplace.Constructor = e;
  a.fn.backgroundImageUrl = function (d) {
    return d
      ? this.each(function () {
          a(this).css("background-image", 'url("' + d + '")');
        })
      : a(this)
          .css("background-image")
          .replace(/url\(|\)|"|'/g, "");
  };
  a.fn.backgroundSize = function (d, c) {
    var b = Math.floor(d / 2) + "px " + Math.floor(c / 2) + "px";
    a(this).css("background-size", b);
    a(this).css("-webkit-background-size", b);
  };
  a(function () {
    a("[data-retina='true']").retinaReplace();
  });
})(window.jQuery);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g--; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.settings.center &&
              (this.$stage.children(".center").removeClass("center"),
              this.$stage.children().eq(this.current()).addClass("center"));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var b, c, e;
        (b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && e <= 0 && this.preloadAutoWidthImages(b);
      }
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = a(
          "<" +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(":visible")
          ? this.refresh()
          : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(":visible") &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            g,
            a.proxy(function (a, h) {
              return (
                "left" === c && b > h - e && b < h + e
                  ? (d = a)
                  : "right" === c && b > h - f - e && b < h - f + e
                  ? (d = a + 1)
                  : this.op(b, "<", h) &&
                    this.op(b, ">", g[a + 1] || h - f) &&
                    (d = "left" === c ? a + 1 : a),
                d === -1
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", g[this.minimum()])
            ? (d = b = this.minimum())
            : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())),
        d
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        for (
          b = this._items.length,
            c = this._items[--b].width(),
            d = this.$element.width();
          b-- &&
          ((c += this._items[b].width() + this.settings.margin), !(c > d));

        );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.$element.is(":visible") && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        this.settings.responsive !== !1 &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && a.namespace.indexOf("owl") !== -1)
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(":visible")),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              )
                for (
                  var c = this._core.settings,
                    e = (c.center && Math.ceil(c.items / 2)) || c.items,
                    f = (c.center && e * -1) || 0,
                    g =
                      (b.property && b.property.value !== d
                        ? b.property.value
                        : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function (a, b) {
                      this.load(b);
                    }, this);
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.$stage.children().toArray().slice(b, c),
          e = [],
          f = 0;
        a.each(d, function (b, c) {
          e.push(a(c).height());
        }),
          (f = Math.max.apply(null, e)),
          this._core.$stage
            .parent()
            .height(f)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          "youtube" === f.type
            ? (c =
                '<iframe width="' +
                g +
                '" height="' +
                h +
                '" src="//www.youtube.com/embed/' +
                f.id +
                "?autoplay=1&rel=0&v=" +
                f.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : "vimeo" === f.type
            ? (c =
                '<iframe src="//player.vimeo.com/video/' +
                f.id +
                '?autoplay=1" width="' +
                g +
                '" height="' +
                h +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : "vzaar" === f.type &&
              (c =
                '<iframe frameborder="0"height="' +
                h +
                '"width="' +
                g +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                f.id +
                '/player?autoplay=true"></iframe>'),
          a('<div class="owl-video-frame">' + c + "</div>").insertAfter(
            e.find(".owl-video")
          ),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype.play = function (a, b) {
        (this._paused = !1),
          this._core.is("rotating") ||
            (this._core.enter("rotating"), this._setAutoPlayInterval());
      }),
      (e.prototype._getNextTimeout = function (d, e) {
        return (
          this._timeout && b.clearTimeout(this._timeout),
          b.setTimeout(
            a.proxy(function () {
              this._paused ||
                this._core.is("busy") ||
                this._core.is("interacting") ||
                c.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed);
            }, this),
            d || this._core.settings.autoplayTimeout
          )
        );
      }),
      (e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout();
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          (b.clearTimeout(this._timeout), this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a("<div>")
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */
!(function (s) {
  "use strict";
  function e(s) {
    return new RegExp("(^|\\s+)" + s + "(\\s+|$)");
  }
  function n(s, e) {
    (a(s, e) ? c : t)(s, e);
  }
  var a, t, c;
  "classList" in document.documentElement
    ? ((a = function (s, e) {
        return s.classList.contains(e);
      }),
      (t = function (s, e) {
        s.classList.add(e);
      }),
      (c = function (s, e) {
        s.classList.remove(e);
      }))
    : ((a = function (s, n) {
        return e(n).test(s.className);
      }),
      (t = function (s, e) {
        a(s, e) || (s.className = s.className + " " + e);
      }),
      (c = function (s, n) {
        s.className = s.className.replace(e(n), " ");
      }));
  var i = {
    hasClass: a,
    addClass: t,
    removeClass: c,
    toggleClass: n,
    has: a,
    add: t,
    remove: c,
    toggle: n,
  };
  "function" == typeof define && define.amd ? define(i) : (s.classie = i);
})(window);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

/**
RESIZESENSOR.JS
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
!(function () {
  var e = function (t, i) {
    function s() {
      (this.q = []),
        (this.add = function (e) {
          this.q.push(e);
        });
      var e, t;
      this.call = function () {
        for (e = 0, t = this.q.length; e < t; e++) this.q[e].call();
      };
    }
    function o(e, t) {
      return e.currentStyle
        ? e.currentStyle[t]
        : window.getComputedStyle
        ? window.getComputedStyle(e, null).getPropertyValue(t)
        : e.style[t];
    }
    function n(e, t) {
      if (e.resizedAttached) {
        if (e.resizedAttached) return void e.resizedAttached.add(t);
      } else (e.resizedAttached = new s()), e.resizedAttached.add(t);
      (e.resizeSensor = document.createElement("div")),
        (e.resizeSensor.className = "resize-sensor");
      var i =
          "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
        n = "position: absolute; left: 0; top: 0; transition: 0s;";
      (e.resizeSensor.style.cssText = i),
        (e.resizeSensor.innerHTML =
          '<div class="resize-sensor-expand" style="' +
          i +
          '"><div style="' +
          n +
          '"></div></div><div class="resize-sensor-shrink" style="' +
          i +
          '"><div style="' +
          n +
          ' width: 200%; height: 200%"></div></div>'),
        e.appendChild(e.resizeSensor),
        { fixed: 1, absolute: 1 }[o(e, "position")] ||
          (e.style.position = "relative");
      var d,
        r,
        l = e.resizeSensor.childNodes[0],
        c = l.childNodes[0],
        h = e.resizeSensor.childNodes[1],
        a =
          (h.childNodes[0],
          function () {
            (c.style.width = l.offsetWidth + 10 + "px"),
              (c.style.height = l.offsetHeight + 10 + "px"),
              (l.scrollLeft = l.scrollWidth),
              (l.scrollTop = l.scrollHeight),
              (h.scrollLeft = h.scrollWidth),
              (h.scrollTop = h.scrollHeight),
              (d = e.offsetWidth),
              (r = e.offsetHeight);
          });
      a();
      var f = function () {
          e.resizedAttached && e.resizedAttached.call();
        },
        u = function (e, t, i) {
          e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i);
        },
        p = function () {
          (e.offsetWidth == d && e.offsetHeight == r) || f(), a();
        };
      u(l, "scroll", p), u(h, "scroll", p);
    }
    var d = Object.prototype.toString.call(t),
      r =
        "[object Array]" === d ||
        "[object NodeList]" === d ||
        "[object HTMLCollection]" === d ||
        ("undefined" != typeof jQuery && t instanceof jQuery) ||
        ("undefined" != typeof Elements && t instanceof Elements);
    if (r) for (var l = 0, c = t.length; l < c; l++) n(t[l], i);
    else n(t, i);
    this.detach = function () {
      if (r) for (var i = 0, s = t.length; i < s; i++) e.detach(t[i]);
      else e.detach(t);
    };
  };
  (e.detach = function (e) {
    e.resizeSensor &&
      (e.removeChild(e.resizeSensor),
      delete e.resizeSensor,
      delete e.resizedAttached);
  }),
    "undefined" != typeof module && "undefined" != typeof module.exports
      ? (module.exports = e)
      : (window.ResizeSensor = e);
})();
//# sourceMappingURL=maps/ResizeSensor.min.js.map

/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

!(function (i) {
  i.fn.theiaStickySidebar = function (t) {
    function e(t, e) {
      return (
        !0 === t.initialized ||
        (!(i("body").width() < t.minWidth) && (o(t, e), !0))
      );
    }
    function o(t, e) {
      (t.initialized = !0),
        0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length &&
          i("head").append(
            i(
              '<style id="theia-sticky-sidebar-stylesheet-' +
                t.namespace +
                '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
            )
          ),
        e.each(function () {
          function e() {
            (n.fixedScrollTop = 0),
              n.sidebar.css({ "min-height": "1px" }),
              n.stickySidebar.css({
                position: "static",
                width: "",
                transform: "none",
              });
          }
          function o(t) {
            var e = t.height();
            return (
              t.children().each(function () {
                e = Math.max(e, i(this).height());
              }),
              e
            );
          }
          var n = {};
          if (
            ((n.sidebar = i(this)),
            (n.options = t || {}),
            (n.container = i(n.options.containerSelector)),
            0 == n.container.length && (n.container = n.sidebar.parent()),
            n.sidebar
              .parents(":not(.theia-exception)")
              .css("-webkit-transform", "none"),
            n.sidebar.css({
              position: n.options.defaultPosition,
              overflow: "visible",
              "-webkit-box-sizing": "border-box",
              "-moz-box-sizing": "border-box",
              "box-sizing": "border-box",
            }),
            (n.stickySidebar = n.sidebar.find(".theiaStickySidebar")),
            0 == n.stickySidebar.length)
          ) {
            var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
            n.sidebar
              .find("script")
              .filter(function (i, t) {
                return 0 === t.type.length || t.type.match(s);
              })
              .remove(),
              (n.stickySidebar = i("<div>")
                .addClass("theiaStickySidebar")
                .append(n.sidebar.children())),
              n.sidebar.append(n.stickySidebar);
          }
          (n.marginBottom = parseInt(n.sidebar.css("margin-bottom"))),
            (n.paddingTop = parseInt(n.sidebar.css("padding-top"))),
            (n.paddingBottom = parseInt(n.sidebar.css("padding-bottom")));
          var d = n.stickySidebar.offset().top,
            r = n.stickySidebar.outerHeight();
          n.stickySidebar.css("padding-top", 1),
            n.stickySidebar.css("padding-bottom", 1),
            (d -= n.stickySidebar.offset().top),
            (r = n.stickySidebar.outerHeight() - r - d),
            0 == d
              ? (n.stickySidebar.css("padding-top", 0),
                (n.stickySidebarPaddingTop = 0))
              : (n.stickySidebarPaddingTop = 1),
            0 == r
              ? (n.stickySidebar.css("padding-bottom", 0),
                (n.stickySidebarPaddingBottom = 0))
              : (n.stickySidebarPaddingBottom = 1),
            (n.previousScrollTop = null),
            (n.fixedScrollTop = 0),
            e(),
            (n.onScroll = function (n) {
              if (n.stickySidebar.is(":visible"))
                if (i("body").width() < n.options.minWidth) e();
                else if (
                  n.options.disableOnResponsiveLayouts &&
                  n.sidebar.outerWidth("none" == n.sidebar.css("float")) + 50 >
                    n.container.width()
                )
                  e();
                else {
                  var s = i(document).scrollTop(),
                    d = "static";
                  if (
                    s >=
                    n.sidebar.offset().top +
                      (n.paddingTop - n.options.additionalMarginTop)
                  ) {
                    var r,
                      c = n.paddingTop + t.additionalMarginTop,
                      p =
                        n.paddingBottom +
                        n.marginBottom +
                        t.additionalMarginBottom,
                      b = n.sidebar.offset().top,
                      l = n.sidebar.offset().top + o(n.container),
                      f = 0 + t.additionalMarginTop;
                    r =
                      n.stickySidebar.outerHeight() + c + p < i(window).height()
                        ? f + n.stickySidebar.outerHeight()
                        : i(window).height() -
                          n.marginBottom -
                          n.paddingBottom -
                          t.additionalMarginBottom;
                    var h = b - s + n.paddingTop,
                      g = l - s - n.paddingBottom - n.marginBottom,
                      u = n.stickySidebar.offset().top - s,
                      S = n.previousScrollTop - s;
                    "fixed" == n.stickySidebar.css("position") &&
                      "modern" == n.options.sidebarBehavior &&
                      (u += S),
                      "stick-to-top" == n.options.sidebarBehavior &&
                        (u = t.additionalMarginTop),
                      "stick-to-bottom" == n.options.sidebarBehavior &&
                        (u = r - n.stickySidebar.outerHeight()),
                      (u =
                        S > 0
                          ? Math.min(u, f)
                          : Math.max(u, r - n.stickySidebar.outerHeight())),
                      (u = Math.max(u, h)),
                      (u = Math.min(u, g - n.stickySidebar.outerHeight()));
                    var m =
                      n.container.height() == n.stickySidebar.outerHeight();
                    d =
                      (m || u != f) &&
                      (m || u != r - n.stickySidebar.outerHeight())
                        ? s + u - n.sidebar.offset().top - n.paddingTop <=
                          t.additionalMarginTop
                          ? "static"
                          : "absolute"
                        : "fixed";
                  }
                  if ("fixed" == d) {
                    var y = i(document).scrollLeft();
                    n.stickySidebar.css({
                      position: "fixed",
                      width: a(n.stickySidebar) + "px",
                      transform: "translateY(" + u + "px)",
                      left:
                        n.sidebar.offset().left +
                        parseInt(n.sidebar.css("padding-left")) -
                        y +
                        "px",
                      top: "0px",
                    });
                  } else if ("absolute" == d) {
                    var k = {};
                    "absolute" != n.stickySidebar.css("position") &&
                      ((k.position = "absolute"),
                      (k.transform =
                        "translateY(" +
                        (s +
                          u -
                          n.sidebar.offset().top -
                          n.stickySidebarPaddingTop -
                          n.stickySidebarPaddingBottom) +
                        "px)"),
                      (k.top = "0px")),
                      (k.width = a(n.stickySidebar) + "px"),
                      (k.left = ""),
                      n.stickySidebar.css(k);
                  } else "static" == d && e();
                  "static" != d &&
                    1 == n.options.updateSidebarHeight &&
                    n.sidebar.css({
                      "min-height":
                        n.stickySidebar.outerHeight() +
                        n.stickySidebar.offset().top -
                        n.sidebar.offset().top +
                        n.paddingBottom,
                    }),
                    (n.previousScrollTop = s);
                }
            }),
            n.onScroll(n),
            i(document).on(
              "scroll." + n.options.namespace,
              (function (i) {
                return function () {
                  i.onScroll(i);
                };
              })(n)
            ),
            i(window).on(
              "resize." + n.options.namespace,
              (function (i) {
                return function () {
                  i.stickySidebar.css({ position: "static" }), i.onScroll(i);
                };
              })(n)
            ),
            "undefined" != typeof ResizeSensor &&
              new ResizeSensor(
                n.stickySidebar[0],
                (function (i) {
                  return function () {
                    i.onScroll(i);
                  };
                })(n)
              );
        });
    }
    function a(i) {
      var t;
      try {
        t = i[0].getBoundingClientRect().width;
      } catch (i) {}
      return void 0 === t && (t = i.width()), t;
    }
    var n = {
      containerSelector: "",
      additionalMarginTop: 0,
      additionalMarginBottom: 0,
      updateSidebarHeight: !0,
      minWidth: 0,
      disableOnResponsiveLayouts: !0,
      sidebarBehavior: "modern",
      defaultPosition: "relative",
      namespace: "TSS",
    };
    return (
      (t = i.extend(n, t)),
      (t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
      (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
      (function (t, o) {
        e(t, o) ||
          (console.log(
            "TSS: Body width smaller than options.minWidth. Init is delayed."
          ),
          i(document).on(
            "scroll." + t.namespace,
            (function (t, o) {
              return function (a) {
                e(t, o) && i(this).unbind(a);
              };
            })(t, o)
          ),
          i(window).on(
            "resize." + t.namespace,
            (function (t, o) {
              return function (a) {
                e(t, o) && i(this).unbind(a);
              };
            })(t, o)
          ));
      })(t, this),
      this
    );
  };
})(jQuery);
//# sourceMappingURL=maps/theia-sticky-sidebar.min.js.map

/*!
 * jQuery Selectbox plugin 0.2
 *
 * Copyright 2011-2012, Dimitar Ivanov (http://www.bulgaria-web-developers.com/projects/javascript/selectbox/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Date: Tue Jul 17 19:58:36 2012 +0300
 */
!(function (e, s) {
  function t() {
    (this._state = []),
      (this._defaults = {
        classHolder: "sbHolder",
        classHolderDisabled: "sbHolderDisabled",
        classSelector: "sbSelector",
        classOptions: "sbOptions",
        classGroup: "sbGroup",
        classSub: "sbSub",
        classDisabled: "sbDisabled",
        classToggleOpen: "sbToggleOpen",
        classToggle: "sbToggle",
        classFocus: "sbFocus",
        speed: 200,
        effect: "slide",
        onChange: null,
        onOpen: null,
        onClose: null,
      });
  }
  var i = !0;
  e.extend(t.prototype, {
    _isOpenSelectbox: function (e) {
      return !!e && this._getInst(e).isOpen;
    },
    _isDisabledSelectbox: function (e) {
      return !!e && this._getInst(e).isDisabled;
    },
    _attachSelectbox: function (s, t) {
      function a() {
        var s,
          t,
          i = this.attr("id").split("_")[1];
        for (s in u._state)
          s !== i &&
            u._state.hasOwnProperty(s) &&
            (t = e("select[sb='" + s + "']")[0]) &&
            u._closeSelectbox(t);
      }
      function n() {
        var t = !(!arguments[1] || !arguments[1].sub),
          a = !(!arguments[1] || !arguments[1].disabled);
        arguments[0].each(function (n) {
          var l,
            r = e(this),
            g = e("<li>");
          r.is(":selected") && (o.text(r.text()), (p = i)),
            n === f - 1 && g.addClass("last"),
            r.is(":disabled") || a
              ? ((l = e("<span>", { text: r.text() }).addClass(
                  b.settings.classDisabled
                )),
                t && l.addClass(b.settings.classSub),
                l.appendTo(g))
              : ((l = e("<a>", { href: "#" + r.val(), rel: r.val() })
                  .text(r.text())
                  .bind("click.sb", function (t) {
                    t && t.preventDefault && t.preventDefault();
                    var i = c,
                      a = e(this);
                    i.attr("id").split("_")[1];
                    u._changeSelectbox(s, a.attr("rel"), a.text()),
                      u._closeSelectbox(s);
                  })
                  .bind("mouseover.sb", function () {
                    var s = e(this);
                    s
                      .parent()
                      .siblings()
                      .find("a")
                      .removeClass(b.settings.classFocus),
                      s.addClass(b.settings.classFocus);
                  })
                  .bind("mouseout.sb", function () {
                    e(this).removeClass(b.settings.classFocus);
                  })),
                t && l.addClass(b.settings.classSub),
                r.is(":selected") && l.addClass(b.settings.classFocus),
                l.appendTo(g)),
            g.appendTo(d);
        });
      }
      if (this._getInst(s)) return !1;
      var l,
        o,
        c,
        d,
        r = e(s),
        u = this,
        b = u._newInst(r),
        p = !1,
        g = (r.find("optgroup"), r.find("option")),
        f = g.length;
      r.attr("sb", b.uid),
        e.extend(b.settings, u._defaults, t),
        (u._state[b.uid] = !1),
        r.hide(),
        (l = e("<div>", {
          id: "sbHolder_" + b.uid,
          class: b.settings.classHolder,
          tabindex: r.attr("tabindex"),
        })),
        (o = e("<a>", {
          id: "sbSelector_" + b.uid,
          href: "#",
          class: b.settings.classSelector,
          click: function (t) {
            t.preventDefault(), a.apply(e(this), []);
            var i = e(this).attr("id").split("_")[1];
            u._state[i] ? u._closeSelectbox(s) : u._openSelectbox(s);
          },
        })),
        (c = e("<a>", {
          id: "sbToggle_" + b.uid,
          href: "#",
          class: b.settings.classToggle,
          click: function (t) {
            t.preventDefault(), a.apply(e(this), []);
            var i = e(this).attr("id").split("_")[1];
            u._state[i] ? u._closeSelectbox(s) : u._openSelectbox(s);
          },
        })).appendTo(l),
        (d = e("<ul>", {
          id: "sbOptions_" + b.uid,
          class: b.settings.classOptions,
          css: { display: "none" },
        })),
        r.children().each(function (s) {
          var t,
            i = e(this),
            a = {};
          i.is("option")
            ? n(i)
            : i.is("optgroup") &&
              ((t = e("<li>")),
              e("<span>", { text: i.attr("label") })
                .addClass(b.settings.classGroup)
                .appendTo(t),
              t.appendTo(d),
              i.is(":disabled") && (a.disabled = !0),
              (a.sub = !0),
              n(i.find("option"), a));
        }),
        p || o.text(g.first().text()),
        e.data(s, "selectbox", b),
        l
          .data("uid", b.uid)
          .bind("keydown.sb", function (s) {
            var t = s.charCode ? s.charCode : s.keyCode ? s.keyCode : 0,
              i = e(this),
              a = i.data("uid"),
              n = i.siblings("select[sb='" + a + "']").data("selectbox"),
              l = i.siblings(["select[sb='", a, "']"].join("")).get(0),
              o = i.find("ul").find("a." + n.settings.classFocus);
            switch (t) {
              case 37:
              case 38:
                if (o.length > 0) {
                  e("a", i).removeClass(n.settings.classFocus),
                    (c = o.parent().prevAll("li:has(a)").eq(0).find("a"))
                      .length > 0 &&
                      (c.addClass(n.settings.classFocus).focus(),
                      e("#sbSelector_" + a).text(c.text()));
                }
                break;
              case 39:
              case 40:
                var c;
                e("a", i).removeClass(n.settings.classFocus),
                  (c =
                    o.length > 0
                      ? o.parent().nextAll("li:has(a)").eq(0).find("a")
                      : i.find("ul").find("a").eq(0)).length > 0 &&
                    (c.addClass(n.settings.classFocus).focus(),
                    e("#sbSelector_" + a).text(c.text()));
                break;
              case 13:
                o.length > 0 && u._changeSelectbox(l, o.attr("rel"), o.text()),
                  u._closeSelectbox(l);
                break;
              case 9:
                l &&
                  (n = u._getInst(l)) &&
                  (o.length > 0 &&
                    u._changeSelectbox(l, o.attr("rel"), o.text()),
                  u._closeSelectbox(l));
                var d = parseInt(i.attr("tabindex"), 10);
                s.shiftKey ? d-- : d++, e("*[tabindex='" + d + "']").focus();
                break;
              case 27:
                u._closeSelectbox(l);
            }
            return s.stopPropagation(), !1;
          })
          .delegate("a", "mouseover", function (s) {
            e(this).addClass(b.settings.classFocus);
          })
          .delegate("a", "mouseout", function (s) {
            e(this).removeClass(b.settings.classFocus);
          }),
        o.appendTo(l),
        d.appendTo(l),
        l.insertAfter(r),
        e(
          [".", b.settings.classHolder, ", .", b.settings.classSelector].join(
            ""
          )
        ).mousedown(function (e) {
          e.stopPropagation();
        });
    },
    _detachSelectbox: function (s) {
      var t = this._getInst(s);
      if (!t) return !1;
      e("#sbHolder_" + t.uid).remove(),
        e.data(s, "selectbox", null),
        e(s).show();
    },
    _changeSelectbox: function (s, t, a) {
      var n,
        l = this._getInst(s);
      l && ((n = this._get(l, "onChange")), e("#sbSelector_" + l.uid).text(a)),
        (t = t.replace(/\'/g, "\\'")),
        e(s)
          .find("option[value='" + t + "']")
          .attr("selected", i),
        l && n
          ? n.apply(l.input ? l.input[0] : null, [t, l])
          : l && l.input && l.input.trigger("change");
    },
    _enableSelectbox: function (s) {
      var t = this._getInst(s);
      if (!t || !t.isDisabled) return !1;
      e("#sbHolder_" + t.uid).removeClass(t.settings.classHolderDisabled),
        (t.isDisabled = !1),
        e.data(s, "selectbox", t);
    },
    _disableSelectbox: function (s) {
      var t = this._getInst(s);
      if (!t || t.isDisabled) return !1;
      e("#sbHolder_" + t.uid).addClass(t.settings.classHolderDisabled),
        (t.isDisabled = i),
        e.data(s, "selectbox", t);
    },
    _optionSelectbox: function (s, t, i) {
      var a = this._getInst(s);
      if (!a) return !1;
      (a[t] = i), e.data(s, "selectbox", a);
    },
    _openSelectbox: function (s) {
      var t = this._getInst(s);
      if (t && !t.isOpen && !t.isDisabled) {
        var a = e("#sbOptions_" + t.uid),
          n = parseInt(e(window).height(), 10),
          l = e("#sbHolder_" + t.uid).offset(),
          o = e(window).scrollTop(),
          c = a.prev().height(),
          d = n - (l.top - o) - c / 2,
          r = this._get(t, "onOpen");
        a.css({ top: c + "px", maxHeight: d - c + "px" }),
          "fade" === t.settings.effect
            ? a.fadeIn(t.settings.speed)
            : a.slideDown(t.settings.speed),
          e("#sbToggle_" + t.uid).addClass(t.settings.classToggleOpen),
          (this._state[t.uid] = i),
          (t.isOpen = i),
          r && r.apply(t.input ? t.input[0] : null, [t]),
          e.data(s, "selectbox", t);
      }
    },
    _closeSelectbox: function (s) {
      var t = this._getInst(s);
      if (t && t.isOpen) {
        var i = this._get(t, "onClose");
        "fade" === t.settings.effect
          ? e("#sbOptions_" + t.uid).fadeOut(t.settings.speed)
          : e("#sbOptions_" + t.uid).slideUp(t.settings.speed),
          e("#sbToggle_" + t.uid).removeClass(t.settings.classToggleOpen),
          (this._state[t.uid] = !1),
          (t.isOpen = !1),
          i && i.apply(t.input ? t.input[0] : null, [t]),
          e.data(s, "selectbox", t);
      }
    },
    _newInst: function (e) {
      return {
        id: e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
        input: e,
        uid: Math.floor(99999999 * Math.random()),
        isOpen: !1,
        isDisabled: !1,
        settings: {},
      };
    },
    _getInst: function (s) {
      try {
        return e.data(s, "selectbox");
      } catch (e) {
        throw "Missing instance data for this selectbox";
      }
    },
    _get: function (e, s) {
      return void 0 !== e.settings[s] ? e.settings[s] : this._defaults[s];
    },
  }),
    (e.fn.selectbox = function (s) {
      var t = Array.prototype.slice.call(arguments, 1);
      return "string" == typeof s && "isDisabled" == s
        ? e.selectbox["_" + s + "Selectbox"].apply(
            e.selectbox,
            [this[0]].concat(t)
          )
        : "option" == s &&
          2 == arguments.length &&
          "string" == typeof arguments[1]
        ? e.selectbox["_" + s + "Selectbox"].apply(
            e.selectbox,
            [this[0]].concat(t)
          )
        : this.each(function () {
            "string" == typeof s
              ? e.selectbox["_" + s + "Selectbox"].apply(
                  e.selectbox,
                  [this].concat(t)
                )
              : e.selectbox._attachSelectbox(this, s);
          });
    }),
    (e.selectbox = new t()),
    (e.selectbox.version = "0.2");
})(jQuery);

// Generated by CoffeeScript 1.12.3

/**
@license Sticky-kit v1.1.4 | MIT | Leaf Corcoran 2015 | http://leafo.net
 */
(function () {
  var S, T, W;
  (S = window.jQuery),
    (W = S(window)),
    (T = S(document)),
    (S.fn.stick_in_parent = function (t) {
      var _, i, x, o, e, P, s, V, F, C, z, I, A, M;
      for (
        null == t && (t = {}),
          A = t.sticky_class,
          P = t.inner_scrolling,
          I = t.recalc_every,
          z = t.parent,
          F = t.offset_top,
          V = t.spacer,
          x = t.bottoming,
          M = W.height(),
          _ = T.height(),
          null == F && (F = 0),
          null == z && (z = void 0),
          null == P && (P = !0),
          null == A && (A = "is_stuck"),
          null == x && (x = !0),
          C = function (t) {
            var i, o;
            return window.getComputedStyle
              ? (t[0],
                (i = window.getComputedStyle(t[0])),
                (o =
                  parseFloat(i.getPropertyValue("width")) +
                  parseFloat(i.getPropertyValue("margin-left")) +
                  parseFloat(i.getPropertyValue("margin-right"))),
                "border-box" !== i.getPropertyValue("box-sizing") &&
                  (o +=
                    parseFloat(i.getPropertyValue("border-left-width")) +
                    parseFloat(i.getPropertyValue("border-right-width")) +
                    parseFloat(i.getPropertyValue("padding-left")) +
                    parseFloat(i.getPropertyValue("padding-right"))),
                o)
              : t.outerWidth(!0);
          },
          o = function (r, n, l, a, c, p, d, u) {
            var f, t, g, h, k, y, m, v, i, b, w, e;
            if (!r.data("sticky_kit")) {
              if (
                (r.data("sticky_kit", !0),
                (k = _),
                (m = r.parent()),
                null != z && (m = m.closest(z)),
                !m.length)
              )
                throw "failed to find stick parent";
              if (
                ((f = g = !1),
                (w = null != V ? V && r.closest(V) : S("<div />")) &&
                  w.css("position", r.css("position")),
                (v = function () {
                  var t, i, o;
                  if (!u)
                    return (
                      (M = W.height()),
                      (_ = T.height()),
                      (k = _),
                      (t = parseInt(m.css("border-top-width"), 10)),
                      (i = parseInt(m.css("padding-top"), 10)),
                      (n = parseInt(m.css("padding-bottom"), 10)),
                      (l = m.offset().top + t + i),
                      (a = m.height()),
                      g &&
                        ((f = g = !1),
                        null == V && (r.insertAfter(w), w.detach()),
                        r
                          .css({ position: "", top: "", width: "", bottom: "" })
                          .removeClass(A),
                        (o = !0)),
                      (c =
                        r.offset().top -
                        (parseInt(r.css("margin-top"), 10) || 0) -
                        F),
                      (p = r.outerHeight(!0)),
                      (d = r.css("float")),
                      w &&
                        w.css({
                          width: C(r),
                          height: p,
                          display: r.css("display"),
                          "vertical-align": r.css("vertical-align"),
                          float: d,
                        }),
                      o ? e() : void 0
                    );
                })(),
                p !== a)
              )
                return (
                  (h = void 0),
                  (y = F),
                  (b = I),
                  (e = function () {
                    var t, i, o, e, s;
                    if (!u)
                      return (
                        (o = !1),
                        null != b && (b -= 1) <= 0 && ((b = I), v(), (o = !0)),
                        o || _ === k || (v(), (o = !0)),
                        (e = W.scrollTop()),
                        null != h && (i = e - h),
                        (h = e),
                        g
                          ? (x &&
                              ((s = a + l < e + p + y),
                              f &&
                                !s &&
                                ((f = !1),
                                r
                                  .css({
                                    position: "fixed",
                                    bottom: "",
                                    top: y,
                                  })
                                  .trigger("sticky_kit:unbottom"))),
                            e < c &&
                              ((g = !1),
                              (y = F),
                              null == V &&
                                (("left" !== d && "right" !== d) ||
                                  r.insertAfter(w),
                                w.detach()),
                              (t = { position: "", width: "", top: "" }),
                              r
                                .css(t)
                                .removeClass(A)
                                .trigger("sticky_kit:unstick")),
                            P &&
                              M < p + F &&
                              (f ||
                                ((y -= i),
                                (y = Math.max(M - p, y)),
                                (y = Math.min(F, y)),
                                g && r.css({ top: y + "px" }))))
                          : c < e &&
                            ((g = !0),
                            ((t = { position: "fixed", top: y }).width =
                              "border-box" === r.css("box-sizing")
                                ? r.outerWidth() + "px"
                                : r.width() + "px"),
                            r.css(t).addClass(A),
                            null == V &&
                              (r.after(w),
                              ("left" !== d && "right" !== d) || w.append(r)),
                            r.trigger("sticky_kit:stick")),
                        g &&
                        x &&
                        (null == s && (s = a + l < e + p + y), !f && s)
                          ? ((f = !0),
                            "static" === m.css("position") &&
                              m.css({ position: "relative" }),
                            r
                              .css({
                                position: "absolute",
                                bottom: n,
                                top: "auto",
                              })
                              .trigger("sticky_kit:bottom"))
                          : void 0
                      );
                  }),
                  (i = function () {
                    return v(), e();
                  }),
                  (t = function () {
                    if (
                      ((u = !0),
                      W.off("touchmove", e),
                      W.off("scroll", e),
                      W.off("resize", i),
                      S(document.body).off("sticky_kit:recalc", i),
                      r.off("sticky_kit:detach", t),
                      r.removeData("sticky_kit"),
                      r.css({ position: "", bottom: "", top: "", width: "" }),
                      m.position("position", ""),
                      g)
                    )
                      return (
                        null == V &&
                          (("left" !== d && "right" !== d) || r.insertAfter(w),
                          w.remove()),
                        r.removeClass(A)
                      );
                  }),
                  W.on("touchmove", e),
                  W.on("scroll", e),
                  W.on("resize", i),
                  S(document.body).on("sticky_kit:recalc", i),
                  r.on("sticky_kit:detach", t),
                  setTimeout(e, 0)
                );
            }
          },
          e = 0,
          s = this.length;
        e < s;
        e++
      )
        (i = this[e]), o(S(i));
      return this;
    });
}).call(this);

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function (f) {
  function A(a, b, d) {
    var c = a[0],
      g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k,
      e =
        d == _update
          ? {
              checked: c[k],
              disabled: c[n],
              indeterminate:
                "true" == a.attr(_indeterminate) ||
                "false" == a.attr(_determinate),
            }
          : c[g];
    if (/^(ch|di|in)/.test(d) && !e) x(a, g);
    else if (/^(un|en|de)/.test(d) && e) q(a, g);
    else if (d == _update) for (var f in e) e[f] ? x(a, f, !0) : q(a, f, !0);
    else if (!b || "toggle" == d) {
      if (!b) a[_callback]("ifClicked");
      e ? c[_type] !== r && q(a, g) : x(a, g);
    }
  }
  function x(a, b, d) {
    var c = a[0],
      g = a.parent(),
      e = b == k,
      u = b == _indeterminate,
      v = b == n,
      s = u ? _determinate : e ? y : "enabled",
      F = l(a, s + t(c[_type])),
      B = l(a, b + t(c[_type]));
    if (!0 !== c[b]) {
      if (!d && b == k && c[_type] == r && c.name) {
        var w = a.closest("form"),
          p = 'input[name="' + c.name + '"]',
          p = w.length ? w.find(p) : f(p);
        p.each(function () {
          this !== c && f(this).data(m) && q(f(this), b);
        });
      }
      u
        ? ((c[b] = !0), c[k] && q(a, k, "force"))
        : (d || (c[b] = !0),
          e && c[_indeterminate] && q(a, _indeterminate, !1));
      D(a, e, b, d);
    }
    c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");
    g[_add](B || l(a, b) || "");
    g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");
    g[_remove](F || l(a, s) || "");
  }
  function q(a, b, d) {
    var c = a[0],
      g = a.parent(),
      e = b == k,
      f = b == _indeterminate,
      m = b == n,
      s = f ? _determinate : e ? y : "enabled",
      q = l(a, s + t(c[_type])),
      r = l(a, b + t(c[_type]));
    if (!1 !== c[b]) {
      if (f || !d || "force" == d) c[b] = !1;
      D(a, e, s, d);
    }
    !c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");
    g[_remove](r || l(a, b) || "");
    g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");
    g[_add](q || l(a, s) || "");
  }
  function E(a, b) {
    if (a.data(m)) {
      a.parent().html(a.attr("style", a.data(m).s || ""));
      if (b) a[_callback](b);
      a.off(".i").unwrap();
      f(_label + '[for="' + a[0].id + '"]')
        .add(a.closest(_label))
        .off(".i");
    }
  }
  function l(a, b, f) {
    if (a.data(m)) return a.data(m).o[b + (f ? "" : "Class")];
  }
  function t(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }
  function D(a, b, f, c) {
    if (!c) {
      if (b) a[_callback]("ifToggled");
      a[_callback]("ifChanged")[_callback]("if" + t(f));
    }
  }
  var m = "iCheck",
    C = m + "-helper",
    r = "radio",
    k = "checked",
    y = "un" + k,
    n = "disabled";
  _determinate = "determinate";
  _indeterminate = "in" + _determinate;
  _update = "update";
  _type = "type";
  _click = "click";
  _touch = "touchbegin.i touchend.i";
  _add = "addClass";
  _remove = "removeClass";
  _callback = "trigger";
  _label = "label";
  _cursor = "cursor";
  _mobile =
    /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(
      navigator.userAgent
    );
  f.fn[m] = function (a, b) {
    var d = 'input[type="checkbox"], input[type="' + r + '"]',
      c = f(),
      g = function (a) {
        a.each(function () {
          var a = f(this);
          c = a.is(d) ? c.add(a) : c.add(a.find(d));
        });
      };
    if (
      /^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(
        a
      )
    )
      return (
        (a = a.toLowerCase()),
        g(this),
        c.each(function () {
          var c = f(this);
          "destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);
          f.isFunction(b) && b();
        })
      );
    if ("object" != typeof a && a) return this;
    var e = f.extend(
        {
          checkedClass: k,
          disabledClass: n,
          indeterminateClass: _indeterminate,
          labelHover: !0,
        },
        a
      ),
      l = e.handle,
      v = e.hoverClass || "hover",
      s = e.focusClass || "focus",
      t = e.activeClass || "active",
      B = !!e.labelHover,
      w = e.labelHoverClass || "hover",
      p = ("" + e.increaseArea).replace("%", "") | 0;
    if ("checkbox" == l || l == r) d = 'input[type="' + l + '"]';
    -50 > p && (p = -50);
    g(this);
    return c.each(function () {
      var a = f(this);
      E(a);
      var c = this,
        b = c.id,
        g = -p + "%",
        d = 100 + 2 * p + "%",
        d = {
          position: "absolute",
          top: g,
          left: g,
          display: "block",
          width: d,
          height: d,
          margin: 0,
          padding: 0,
          background: "#fff",
          border: 0,
          opacity: 0,
        },
        g = _mobile
          ? { position: "absolute", visibility: "hidden" }
          : p
          ? d
          : { position: "absolute", opacity: 0 },
        l =
          "checkbox" == c[_type]
            ? e.checkboxClass || "icheckbox"
            : e.radioClass || "i" + r,
        z = f(_label + '[for="' + b + '"]').add(a.closest(_label)),
        u = !!e.aria,
        y = m + "-" + Math.random().toString(36).substr(2, 6),
        h = '<div class="' + l + '" ' + (u ? 'role="' + c[_type] + '" ' : "");
      u &&
        z.each(function () {
          h += 'aria-labelledby="';
          this.id ? (h += this.id) : ((this.id = y), (h += y));
          h += '"';
        });
      h = a
        .wrap(h + "/>")
        [_callback]("ifCreated")
        .parent()
        .append(e.insert);
      d = f('<ins class="' + C + '"/>')
        .css(d)
        .appendTo(h);
      a.data(m, { o: e, s: a.attr("style") }).css(g);
      e.inheritClass && h[_add](c.className || "");
      e.inheritID && b && h.attr("id", m + "-" + b);
      "static" == h.css("position") && h.css("position", "relative");
      A(a, !0, _update);
      if (z.length)
        z.on(_click + ".i mouseover.i mouseout.i " + _touch, function (b) {
          var d = b[_type],
            e = f(this);
          if (!c[n]) {
            if (d == _click) {
              if (f(b.target).is("a")) return;
              A(a, !1, !0);
            } else
              B &&
                (/ut|nd/.test(d)
                  ? (h[_remove](v), e[_remove](w))
                  : (h[_add](v), e[_add](w)));
            if (_mobile) b.stopPropagation();
            else return !1;
          }
        });
      a.on(
        _click + ".i focus.i blur.i keyup.i keydown.i keypress.i",
        function (b) {
          var d = b[_type];
          b = b.keyCode;
          if (d == _click) return !1;
          if ("keydown" == d && 32 == b)
            return (c[_type] == r && c[k]) || (c[k] ? q(a, k) : x(a, k)), !1;
          if ("keyup" == d && c[_type] == r) !c[k] && x(a, k);
          else if (/us|ur/.test(d)) h["blur" == d ? _remove : _add](s);
        }
      );
      d.on(
        _click + " mousedown mouseup mouseover mouseout " + _touch,
        function (b) {
          var d = b[_type],
            e = /wn|up/.test(d) ? t : v;
          if (!c[n]) {
            if (d == _click) A(a, !1, !0);
            else {
              if (/wn|er|in/.test(d)) h[_add](e);
              else h[_remove](e + " " + t);
              if (z.length && B && e == v)
                z[/ut|nd/.test(d) ? _remove : _add](w);
            }
            if (_mobile) b.stopPropagation();
            else return !1;
          }
        }
      );
    });
  };
})(window.jQuery || window.Zepto);

/*
 Search overlay
*/
$(".search-overlay-menu-btn").on("click", function (a) {
  $(".search-overlay-menu").addClass("open"),
    $('.search-overlay-menu > form > input[type="search"]').focus();
}),
  $(".search-overlay-close").on("click", function (a) {
    $(".search-overlay-menu").removeClass("open");
  }),
  $(".search-overlay-menu, .search-overlay-menu .search-overlay-close").on(
    "click keyup",
    function (a) {
      (a.target == this ||
        "search-overlay-close" == a.target.className ||
        27 == a.keyCode) &&
        $(this).removeClass("open");
    }
  );

/*
 * jQuery mmenu v6.1.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jquery_mmenu_all_js = factory(root.jQuery);
  }
})(this, function (jQuery) {
  !(function (e) {
    function t() {
      e[n].glbl ||
        ((r = {
          $wndw: e(window),
          $docu: e(document),
          $html: e("html"),
          $body: e("body"),
        }),
        (s = {}),
        (a = {}),
        (o = {}),
        e.each([s, a, o], function (e, t) {
          t.add = function (e) {
            e = e.split(" ");
            for (var n = 0, i = e.length; n < i; n++) t[e[n]] = t.mm(e[n]);
          };
        }),
        (s.mm = function (e) {
          return "mm-" + e;
        }),
        s.add(
          "wrapper menu panels panel nopanel highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen noanimation"
        ),
        (s.umm = function (e) {
          return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
        }),
        (a.mm = function (e) {
          return "mm-" + e;
        }),
        a.add("parent child"),
        (o.mm = function (e) {
          return e + ".mm";
        }),
        o.add(
          "transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"
        ),
        (e[n]._c = s),
        (e[n]._d = a),
        (e[n]._e = o),
        (e[n].glbl = r));
    }
    var n = "mmenu",
      i = "6.1.8";
    if (!(e[n] && e[n].version > i)) {
      (e[n] = function (e, t, n) {
        return (
          (this.$menu = e),
          (this._api = [
            "bind",
            "getInstance",
            "initPanels",
            "openPanel",
            "closePanel",
            "closeAllPanels",
            "setSelected",
          ]),
          (this.opts = t),
          (this.conf = n),
          (this.vars = {}),
          (this.cbck = {}),
          (this.mtch = {}),
          "function" == typeof this.___deprecated && this.___deprecated(),
          this._initAddons(),
          this._initExtensions(),
          this._initMenu(),
          this._initPanels(),
          this._initOpened(),
          this._initAnchors(),
          this._initMatchMedia(),
          "function" == typeof this.___debug && this.___debug(),
          this
        );
      }),
        (e[n].version = i),
        (e[n].addons = {}),
        (e[n].uniqueId = 0),
        (e[n].defaults = {
          extensions: [],
          initMenu: function () {},
          initPanels: function () {},
          navbar: { add: !0, title: "Menu", titleLink: "parent" },
          onClick: { setSelected: !0 },
          slidingSubmenus: !0,
        }),
        (e[n].configuration = {
          classNames: {
            divider: "Divider",
            inset: "Inset",
            nolistview: "NoListview",
            nopanel: "NoPanel",
            panel: "Panel",
            selected: "Selected",
            spacer: "Spacer",
            vertical: "Vertical",
          },
          clone: !1,
          openingInterval: 25,
          panelNodetype: "ul, ol, div",
          transitionDuration: 400,
        }),
        (e[n].prototype = {
          getInstance: function () {
            return this;
          },
          initPanels: function (e) {
            this._initPanels(e);
          },
          openPanel: function (t, i) {
            if (
              (this.trigger("openPanel:before", t),
              t &&
                t.length &&
                (t.is("." + s.panel) || (t = t.closest("." + s.panel)),
                t.is("." + s.panel)))
            ) {
              var o = this;
              if (("boolean" != typeof i && (i = !0), t.hasClass(s.vertical)))
                t
                  .add(t.parents("." + s.vertical))
                  .removeClass(s.hidden)
                  .parent("li")
                  .addClass(s.opened),
                  this.openPanel(
                    t
                      .parents("." + s.panel)
                      .not("." + s.vertical)
                      .first()
                  ),
                  this.trigger("openPanel:start", t),
                  this.trigger("openPanel:finish", t);
              else {
                if (t.hasClass(s.opened)) return;
                var r = this.$pnls.children("." + s.panel),
                  l = r.filter("." + s.opened);
                if (!e[n].support.csstransitions)
                  return (
                    l.addClass(s.hidden).removeClass(s.opened),
                    t.removeClass(s.hidden).addClass(s.opened),
                    this.trigger("openPanel:start", t),
                    void this.trigger("openPanel:finish", t)
                  );
                r.not(t).removeClass(s.subopened);
                for (var d = t.data(a.parent); d; )
                  (d = d.closest("." + s.panel)),
                    d.is("." + s.vertical) || d.addClass(s.subopened),
                    (d = d.data(a.parent));
                r.removeClass(s.highest).not(l).not(t).addClass(s.hidden),
                  t.removeClass(s.hidden),
                  (this.openPanelStart = function () {
                    l.removeClass(s.opened),
                      t.addClass(s.opened),
                      t.hasClass(s.subopened)
                        ? (l.addClass(s.highest), t.removeClass(s.subopened))
                        : (l.addClass(s.subopened), t.addClass(s.highest)),
                      this.trigger("openPanel:start", t);
                  }),
                  (this.openPanelFinish = function () {
                    l.removeClass(s.highest).addClass(s.hidden),
                      t.removeClass(s.highest),
                      this.trigger("openPanel:finish", t);
                  }),
                  i && !t.hasClass(s.noanimation)
                    ? setTimeout(function () {
                        o.__transitionend(
                          t,
                          function () {
                            o.openPanelFinish.call(o);
                          },
                          o.conf.transitionDuration
                        ),
                          o.openPanelStart.call(o);
                      }, o.conf.openingInterval)
                    : (this.openPanelStart.call(this),
                      this.openPanelFinish.call(this));
              }
              this.trigger("openPanel:after", t);
            }
          },
          closePanel: function (e) {
            this.trigger("closePanel:before", e);
            var t = e.parent();
            t.hasClass(s.vertical) &&
              (t.removeClass(s.opened), this.trigger("closePanel", e)),
              this.trigger("closePanel:after", e);
          },
          closeAllPanels: function (e) {
            this.trigger("closeAllPanels:before"),
              this.$pnls
                .find("." + s.listview)
                .children()
                .removeClass(s.selected)
                .filter("." + s.vertical)
                .removeClass(s.opened);
            var t = this.$pnls.children("." + s.panel),
              n = e && e.length ? e : t.first();
            this.$pnls
              .children("." + s.panel)
              .not(n)
              .removeClass(s.subopened)
              .removeClass(s.opened)
              .removeClass(s.highest)
              .addClass(s.hidden),
              this.openPanel(n, !1),
              this.trigger("closeAllPanels:after");
          },
          togglePanel: function (e) {
            var t = e.parent();
            t.hasClass(s.vertical) &&
              this[t.hasClass(s.opened) ? "closePanel" : "openPanel"](e);
          },
          setSelected: function (e) {
            this.trigger("setSelected:before", e),
              this.$menu
                .find("." + s.listview)
                .children("." + s.selected)
                .removeClass(s.selected),
              e.addClass(s.selected),
              this.trigger("setSelected:after", e);
          },
          bind: function (e, t) {
            (this.cbck[e] = this.cbck[e] || []), this.cbck[e].push(t);
          },
          trigger: function () {
            var e = this,
              t = Array.prototype.slice.call(arguments),
              n = t.shift();
            if (this.cbck[n])
              for (var i = 0, s = this.cbck[n].length; i < s; i++)
                this.cbck[n][i].apply(e, t);
          },
          matchMedia: function (e, t, n) {
            var i = { yes: t, no: n };
            (this.mtch[e] = this.mtch[e] || []), this.mtch[e].push(i);
          },
          _initAddons: function () {
            this.trigger("initAddons:before");
            var t;
            for (t in e[n].addons)
              e[n].addons[t].add.call(this),
                (e[n].addons[t].add = function () {});
            for (t in e[n].addons) e[n].addons[t].setup.call(this);
            this.trigger("initAddons:after");
          },
          _initExtensions: function () {
            this.trigger("initExtensions:before");
            var e = this;
            this.opts.extensions.constructor === Array &&
              (this.opts.extensions = { all: this.opts.extensions });
            for (var t in this.opts.extensions)
              (this.opts.extensions[t] = this.opts.extensions[t].length
                ? "mm-" + this.opts.extensions[t].join(" mm-")
                : ""),
                this.opts.extensions[t] &&
                  !(function (t) {
                    e.matchMedia(
                      t,
                      function () {
                        this.$menu.addClass(this.opts.extensions[t]);
                      },
                      function () {
                        this.$menu.removeClass(this.opts.extensions[t]);
                      }
                    );
                  })(t);
            this.trigger("initExtensions:after");
          },
          _initMenu: function () {
            this.trigger("initMenu:before");
            this.conf.clone &&
              ((this.$orig = this.$menu),
              (this.$menu = this.$orig.clone()),
              this.$menu
                .add(this.$menu.find("[id]"))
                .filter("[id]")
                .each(function () {
                  e(this).attr("id", s.mm(e(this).attr("id")));
                })),
              this.opts.initMenu.call(this, this.$menu, this.$orig),
              this.$menu.attr(
                "id",
                this.$menu.attr("id") || this.__getUniqueId()
              ),
              (this.$pnls = e('<div class="' + s.panels + '" />')
                .append(this.$menu.children(this.conf.panelNodetype))
                .prependTo(this.$menu));
            var t = [s.menu];
            this.opts.slidingSubmenus || t.push(s.vertical),
              this.$menu.addClass(t.join(" ")).parent().addClass(s.wrapper),
              this.trigger("initMenu:after");
          },
          _initPanels: function (t) {
            this.trigger("initPanels:before", t),
              (t = t || this.$pnls.children(this.conf.panelNodetype));
            var n = e(),
              i = this,
              a = function (t) {
                t.filter(this.conf.panelNodetype).each(function () {
                  var t = i._initPanel(e(this));
                  if (t) {
                    i._initNavbar(t), i._initListview(t), (n = n.add(t));
                    var o = t
                      .children("." + s.listview)
                      .children("li")
                      .children(i.conf.panelNodeType)
                      .add(t.children("." + i.conf.classNames.panel));
                    o.length && a.call(i, o);
                  }
                });
              };
            a.call(this, t),
              this.opts.initPanels.call(this, n),
              this.trigger("initPanels:after", n);
          },
          _initPanel: function (e) {
            this.trigger("initPanel:before", e);
            if (e.hasClass(s.panel)) return e;
            if (
              (this.__refactorClass(e, this.conf.classNames.panel, "panel"),
              this.__refactorClass(e, this.conf.classNames.nopanel, "nopanel"),
              this.__refactorClass(
                e,
                this.conf.classNames.vertical,
                "vertical"
              ),
              this.__refactorClass(e, this.conf.classNames.inset, "inset"),
              e.filter("." + s.inset).addClass(s.nopanel),
              e.hasClass(s.nopanel))
            )
              return !1;
            var t = e.hasClass(s.vertical) || !this.opts.slidingSubmenus;
            e.removeClass(s.vertical);
            var n = e.attr("id") || this.__getUniqueId();
            e.removeAttr("id"),
              e.is("ul, ol") && (e.wrap("<div />"), (e = e.parent())),
              e.addClass(s.panel + " " + s.hidden).attr("id", n);
            var i = e.parent("li");
            return (
              t ? e.add(i).addClass(s.vertical) : e.appendTo(this.$pnls),
              i.length && (i.data(a.child, e), e.data(a.parent, i)),
              this.trigger("initPanel:after", e),
              e
            );
          },
          _initNavbar: function (t) {
            if (
              (this.trigger("initNavbar:before", t),
              !t.children("." + s.navbar).length)
            ) {
              var i = t.data(a.parent),
                o = e('<div class="' + s.navbar + '" />'),
                r = e[n].i18n(this.opts.navbar.title),
                l = "";
              if (i && i.length) {
                if (i.hasClass(s.vertical)) return;
                if (i.parent().is("." + s.listview))
                  var d = i.children("a, span").not("." + s.next);
                else
                  var d = i
                    .closest("." + s.panel)
                    .find('a[href="#' + t.attr("id") + '"]');
                (d = d.first()), (i = d.closest("." + s.panel));
                var c = i.attr("id");
                switch (((r = d.text()), this.opts.navbar.titleLink)) {
                  case "anchor":
                    l = d.attr("href");
                    break;
                  case "parent":
                    l = "#" + c;
                }
                o.append(
                  '<a class="' + s.btn + " " + s.prev + '" href="#' + c + '" />'
                );
              } else if (!this.opts.navbar.title) return;
              this.opts.navbar.add && t.addClass(s.hasnavbar),
                o
                  .append(
                    '<a class="' +
                      s.title +
                      '"' +
                      (l.length ? ' href="' + l + '"' : "") +
                      ">" +
                      r +
                      "</a>"
                  )
                  .prependTo(t),
                this.trigger("initNavbar:after", t);
            }
          },
          _initListview: function (t) {
            this.trigger("initListview:before", t);
            var n = this.__childAddBack(t, "ul, ol");
            this.__refactorClass(
              n,
              this.conf.classNames.nolistview,
              "nolistview"
            ),
              n.filter("." + this.conf.classNames.inset).addClass(s.nolistview);
            var i = n
              .not("." + s.nolistview)
              .addClass(s.listview)
              .children();
            this.__refactorClass(i, this.conf.classNames.selected, "selected"),
              this.__refactorClass(i, this.conf.classNames.divider, "divider"),
              this.__refactorClass(i, this.conf.classNames.spacer, "spacer");
            var o = t.data(a.parent);
            if (
              o &&
              o.parent().is("." + s.listview) &&
              !o.children("." + s.next).length
            ) {
              var r = o.children("a, span").first(),
                l = e(
                  '<a class="' + s.next + '" href="#' + t.attr("id") + '" />'
                ).insertBefore(r);
              r.is("span") && l.addClass(s.fullsubopen);
            }
            this.trigger("initListview:after", t);
          },
          _initOpened: function () {
            this.trigger("initOpened:before");
            var e = this.$pnls
                .find("." + s.listview)
                .children("." + s.selected)
                .removeClass(s.selected)
                .last()
                .addClass(s.selected),
              t = e.length
                ? e.closest("." + s.panel)
                : this.$pnls.children("." + s.panel).first();
            this.openPanel(t, !1), this.trigger("initOpened:after");
          },
          _initAnchors: function () {
            var t = this;
            r.$body.on(o.click + "-oncanvas", "a[href]", function (i) {
              var a = e(this),
                o = !1,
                r = t.$menu.find(a).length;
              for (var l in e[n].addons)
                if (e[n].addons[l].clickAnchor.call(t, a, r)) {
                  o = !0;
                  break;
                }
              var d = a.attr("href");
              if (!o && r && d.length > 1 && "#" == d.slice(0, 1))
                try {
                  var c = e(d, t.$menu);
                  c.is("." + s.panel) &&
                    ((o = !0),
                    t[
                      a.parent().hasClass(s.vertical)
                        ? "togglePanel"
                        : "openPanel"
                    ](c));
                } catch (h) {}
              if (
                (o && i.preventDefault(),
                !o &&
                  r &&
                  a.is("." + s.listview + " > li > a") &&
                  !a.is('[rel="external"]') &&
                  !a.is('[target="_blank"]'))
              ) {
                t.__valueOrFn(t.opts.onClick.setSelected, a) &&
                  t.setSelected(e(i.target).parent());
                var f = t.__valueOrFn(
                  t.opts.onClick.preventDefault,
                  a,
                  "#" == d.slice(0, 1)
                );
                f && i.preventDefault(),
                  t.__valueOrFn(t.opts.onClick.close, a, f) &&
                    t.opts.offCanvas &&
                    "function" == typeof t.close &&
                    t.close();
              }
            });
          },
          _initMatchMedia: function () {
            var e = this;
            this._fireMatchMedia(),
              r.$wndw.on(o.resize, function (t) {
                e._fireMatchMedia();
              });
          },
          _fireMatchMedia: function () {
            for (var e in this.mtch)
              for (
                var t =
                    window.matchMedia && window.matchMedia(e).matches
                      ? "yes"
                      : "no",
                  n = 0;
                n < this.mtch[e].length;
                n++
              )
                this.mtch[e][n][t].call(this);
          },
          _getOriginalMenuId: function () {
            var e = this.$menu.attr("id");
            return this.conf.clone && e && e.length && (e = s.umm(e)), e;
          },
          __api: function () {
            var t = this,
              n = {};
            return (
              e.each(this._api, function (e) {
                var i = this;
                n[i] = function () {
                  var e = t[i].apply(t, arguments);
                  return "undefined" == typeof e ? n : e;
                };
              }),
              n
            );
          },
          __valueOrFn: function (e, t, n) {
            return "function" == typeof e
              ? e.call(t[0])
              : "undefined" == typeof e && "undefined" != typeof n
              ? n
              : e;
          },
          __refactorClass: function (e, t, n) {
            return e
              .filter("." + t)
              .removeClass(t)
              .addClass(s[n]);
          },
          __findAddBack: function (e, t) {
            return e.find(t).add(e.filter(t));
          },
          __childAddBack: function (e, t) {
            return e.children(t).add(e.filter(t));
          },
          __filterListItems: function (e) {
            return e.not("." + s.divider).not("." + s.hidden);
          },
          __filterListItemAnchors: function (e) {
            return this.__filterListItems(e)
              .children("a")
              .not("." + s.next);
          },
          __transitionend: function (e, t, n) {
            var i = !1,
              s = function (n) {
                ("undefined" != typeof n && n.target != e[0]) ||
                  (i ||
                    (e.off(o.transitionend),
                    e.off(o.webkitTransitionEnd),
                    t.call(e[0])),
                  (i = !0));
              };
            e.on(o.transitionend, s),
              e.on(o.webkitTransitionEnd, s),
              setTimeout(s, 1.1 * n);
          },
          __getUniqueId: function () {
            return s.mm(e[n].uniqueId++);
          },
        }),
        (e.fn[n] = function (i, s) {
          t(),
            (i = e.extend(!0, {}, e[n].defaults, i)),
            (s = e.extend(!0, {}, e[n].configuration, s));
          var a = e();
          return (
            this.each(function () {
              var t = e(this);
              if (!t.data(n)) {
                var o = new e[n](t, i, s);
                o.$menu.data(n, o.__api()), (a = a.add(o.$menu));
              }
            }),
            a
          );
        }),
        (e[n].i18n = (function () {
          var t = {};
          return function (n) {
            switch (typeof n) {
              case "object":
                return e.extend(t, n), t;
              case "string":
                return t[n] || n;
              case "undefined":
              default:
                return t;
            }
          };
        })()),
        (e[n].support = {
          touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
          csstransitions: (function () {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransitions ||
              Modernizr.csstransitions
            );
          })(),
          csstransforms: (function () {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransforms ||
              Modernizr.csstransforms
            );
          })(),
          csstransforms3d: (function () {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransforms3d ||
              Modernizr.csstransforms3d
            );
          })(),
        });
      var s, a, o, r;
    }
  })(jQuery),
    /*
     * jQuery mmenu offCanvas add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    (function (e) {
      var t = "mmenu",
        n = "offCanvas";
      (e[t].addons[n] = {
        setup: function () {
          if (this.opts[n]) {
            var s = this,
              a = this.opts[n],
              r = this.conf[n];
            (o = e[t].glbl),
              (this._api = e.merge(this._api, ["open", "close", "setPage"])),
              "object" != typeof a && (a = {}),
              ("top" != a.position && "bottom" != a.position) ||
                (a.zposition = "front"),
              (a = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], a)),
              "string" != typeof r.pageSelector &&
                (r.pageSelector = "> " + r.pageNodetype),
              (this.vars.opened = !1);
            var l = [i.offcanvas];
            "left" != a.position && l.push(i.mm(a.position)),
              "back" != a.zposition && l.push(i.mm(a.zposition)),
              e[t].support.csstransforms || l.push(i["no-csstransforms"]),
              e[t].support.csstransforms3d || l.push(i["no-csstransforms3d"]),
              this.bind("initMenu:after", function () {
                var e = this;
                this.setPage(o.$page),
                  this._initBlocker(),
                  this["_initWindow_" + n](),
                  this.$menu
                    .addClass(l.join(" "))
                    .parent("." + i.wrapper)
                    .removeClass(i.wrapper),
                  this.$menu[r.menuInsertMethod](r.menuInsertSelector);
                var t = window.location.hash;
                if (t) {
                  var s = this._getOriginalMenuId();
                  s &&
                    s == t.slice(1) &&
                    setTimeout(function () {
                      e.open();
                    }, 1e3);
                }
              }),
              this.bind("initExtensions:after", function () {
                for (
                  var e = [i.mm("widescreen"), i.mm("iconbar")], t = 0;
                  t < e.length;
                  t++
                )
                  for (var n in this.opts.extensions)
                    if (this.opts.extensions[n].indexOf(e[t]) > -1) {
                      !(function (t, n) {
                        s.matchMedia(
                          t,
                          function () {
                            o.$html.addClass(e[n]);
                          },
                          function () {
                            o.$html.removeClass(e[n]);
                          }
                        );
                      })(n, t);
                      break;
                    }
              }),
              this.bind("open:start:sr-aria", function () {
                this.__sr_aria(this.$menu, "hidden", !1);
              }),
              this.bind("close:finish:sr-aria", function () {
                this.__sr_aria(this.$menu, "hidden", !0);
              }),
              this.bind("initMenu:after:sr-aria", function () {
                this.__sr_aria(this.$menu, "hidden", !0);
              });
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add(
              "offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"
            ),
            s.add("style");
        },
        clickAnchor: function (e, t) {
          var s = this;
          if (this.opts[n]) {
            var a = this._getOriginalMenuId();
            if (a && e.is('[href="#' + a + '"]')) {
              if (t) return !0;
              var r = e.closest("." + i.menu);
              if (r.length) {
                var l = r.data("mmenu");
                if (l && l.close)
                  return (
                    l.close(),
                    s.__transitionend(
                      r,
                      function () {
                        s.open();
                      },
                      s.conf.transitionDuration
                    ),
                    !0
                  );
              }
              return this.open(), !0;
            }
            if (o.$page)
              return (
                (a = o.$page.first().attr("id")),
                a && e.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0
              );
          }
        },
      }),
        (e[t].defaults[n] = {
          position: "left",
          zposition: "back",
          blockUI: !0,
          moveBackground: !0,
        }),
        (e[t].configuration[n] = {
          pageNodetype: "div",
          pageSelector: null,
          noPageSelector: [],
          wrapPageIfNeeded: !0,
          menuInsertMethod: "prependTo",
          menuInsertSelector: "body",
        }),
        (e[t].prototype.open = function () {
          if ((this.trigger("open:before"), !this.vars.opened)) {
            var e = this;
            this._openSetup(),
              setTimeout(function () {
                e._openFinish();
              }, this.conf.openingInterval),
              this.trigger("open:after");
          }
        }),
        (e[t].prototype._openSetup = function () {
          var t = this,
            r = this.opts[n];
          this.closeAllOthers(),
            o.$page.each(function () {
              e(this).data(s.style, e(this).attr("style") || "");
            }),
            o.$wndw.trigger(a.resize + "-" + n, [!0]);
          var l = [i.opened];
          r.blockUI && l.push(i.blocking),
            "modal" == r.blockUI && l.push(i.modal),
            r.moveBackground && l.push(i.background),
            "left" != r.position && l.push(i.mm(this.opts[n].position)),
            "back" != r.zposition && l.push(i.mm(this.opts[n].zposition)),
            o.$html.addClass(l.join(" ")),
            setTimeout(function () {
              t.vars.opened = !0;
            }, this.conf.openingInterval),
            this.$menu.addClass(i.opened);
        }),
        (e[t].prototype._openFinish = function () {
          var e = this;
          this.__transitionend(
            o.$page.first(),
            function () {
              e.trigger("open:finish");
            },
            this.conf.transitionDuration
          ),
            this.trigger("open:start"),
            o.$html.addClass(i.opening);
        }),
        (e[t].prototype.close = function () {
          if ((this.trigger("close:before"), this.vars.opened)) {
            var t = this;
            this.__transitionend(
              o.$page.first(),
              function () {
                t.$menu.removeClass(i.opened);
                var a = [
                  i.opened,
                  i.blocking,
                  i.modal,
                  i.background,
                  i.mm(t.opts[n].position),
                  i.mm(t.opts[n].zposition),
                ];
                o.$html.removeClass(a.join(" ")),
                  o.$page.each(function () {
                    e(this).attr("style", e(this).data(s.style));
                  }),
                  (t.vars.opened = !1),
                  t.trigger("close:finish");
              },
              this.conf.transitionDuration
            ),
              this.trigger("close:start"),
              o.$html.removeClass(i.opening),
              this.trigger("close:after");
          }
        }),
        (e[t].prototype.closeAllOthers = function () {
          o.$body
            .find("." + i.menu + "." + i.offcanvas)
            .not(this.$menu)
            .each(function () {
              var n = e(this).data(t);
              n && n.close && n.close();
            });
        }),
        (e[t].prototype.setPage = function (t) {
          this.trigger("setPage:before", t);
          var s = this,
            a = this.conf[n];
          (t && t.length) ||
            ((t = o.$body.find(a.pageSelector)),
            a.noPageSelector.length && (t = t.not(a.noPageSelector.join(", "))),
            t.length > 1 &&
              a.wrapPageIfNeeded &&
              (t = t
                .wrapAll("<" + this.conf[n].pageNodetype + " />")
                .parent())),
            t.each(function () {
              e(this).attr("id", e(this).attr("id") || s.__getUniqueId());
            }),
            t.addClass(i.page + " " + i.slideout),
            (o.$page = t),
            this.trigger("setPage:after", t);
        }),
        (e[t].prototype["_initWindow_" + n] = function () {
          o.$wndw
            .off(a.keydown + "-" + n)
            .on(a.keydown + "-" + n, function (e) {
              if (o.$html.hasClass(i.opened) && 9 == e.keyCode)
                return e.preventDefault(), !1;
            });
          var e = 0;
          o.$wndw
            .off(a.resize + "-" + n)
            .on(a.resize + "-" + n, function (t, n) {
              if (1 == o.$page.length && (n || o.$html.hasClass(i.opened))) {
                var s = o.$wndw.height();
                (n || s != e) && ((e = s), o.$page.css("minHeight", s));
              }
            });
        }),
        (e[t].prototype._initBlocker = function () {
          var t = this;
          this.opts[n].blockUI &&
            (o.$blck ||
              (o.$blck = e(
                '<div id="' + i.blocker + '" class="' + i.slideout + '" />'
              )),
            o.$blck
              .appendTo(o.$body)
              .off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n)
              .on(
                a.touchstart + "-" + n + " " + a.touchmove + "-" + n,
                function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    o.$blck.trigger(a.mousedown + "-" + n);
                }
              )
              .off(a.mousedown + "-" + n)
              .on(a.mousedown + "-" + n, function (e) {
                e.preventDefault(),
                  o.$html.hasClass(i.modal) || (t.closeAllOthers(), t.close());
              }));
        });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu scrollBugFix add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "scrollBugFix";
      (e[t].addons[n] = {
        setup: function () {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            e[t].support.touch &&
              this.opts.offCanvas &&
              this.opts.offCanvas.blockUI &&
              ("boolean" == typeof s && (s = { fix: s }),
              "object" != typeof s && (s = {}),
              (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
              s.fix &&
                (this.bind("open:start", function () {
                  this.$pnls.children("." + i.opened).scrollTop(0);
                }),
                this.bind("initMenu:after", function () {
                  this["_initWindow_" + n]();
                })));
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e);
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { fix: !0 }),
        (e[t].prototype["_initWindow_" + n] = function () {
          var t = this;
          o.$docu
            .off(a.touchmove + "-" + n)
            .on(a.touchmove + "-" + n, function (e) {
              o.$html.hasClass(i.opened) && e.preventDefault();
            });
          var s = !1;
          o.$body
            .off(a.touchstart + "-" + n)
            .on(
              a.touchstart + "-" + n,
              "." + i.panels + "> ." + i.panel,
              function (e) {
                o.$html.hasClass(i.opened) &&
                  (s ||
                    ((s = !0),
                    0 === e.currentTarget.scrollTop
                      ? (e.currentTarget.scrollTop = 1)
                      : e.currentTarget.scrollHeight ===
                          e.currentTarget.scrollTop +
                            e.currentTarget.offsetHeight &&
                        (e.currentTarget.scrollTop -= 1),
                    (s = !1)));
              }
            )
            .off(a.touchmove + "-" + n)
            .on(
              a.touchmove + "-" + n,
              "." + i.panels + "> ." + i.panel,
              function (t) {
                o.$html.hasClass(i.opened) &&
                  e(this)[0].scrollHeight > e(this).innerHeight() &&
                  t.stopPropagation();
              }
            ),
            o.$wndw
              .off(a.orientationchange + "-" + n)
              .on(a.orientationchange + "-" + n, function () {
                t.$pnls
                  .children("." + i.opened)
                  .scrollTop(0)
                  .css({ "-webkit-overflow-scrolling": "auto" })
                  .css({ "-webkit-overflow-scrolling": "touch" });
              });
        });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu screenReader add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "screenReader";
      (e[t].addons[n] = {
        setup: function () {
          var a = this,
            r = this.opts[n],
            l = this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof r && (r = { aria: r, text: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            r.aria &&
              (this.bind("initAddons:after", function () {
                this.bind("initMenu:after", function () {
                  this.trigger("initMenu:after:sr-aria");
                }),
                  this.bind("initNavbar:after", function () {
                    this.trigger("initNavbar:after:sr-aria", arguments[0]);
                  }),
                  this.bind("openPanel:start", function () {
                    this.trigger("openPanel:start:sr-aria", arguments[0]);
                  }),
                  this.bind("close:start", function () {
                    this.trigger("close:start:sr-aria");
                  }),
                  this.bind("close:finish", function () {
                    this.trigger("close:finish:sr-aria");
                  }),
                  this.bind("open:start", function () {
                    this.trigger("open:start:sr-aria");
                  }),
                  this.bind("open:finish", function () {
                    this.trigger("open:finish:sr-aria");
                  });
              }),
              this.bind("updateListview", function () {
                this.$pnls
                  .find("." + i.listview)
                  .children()
                  .each(function () {
                    a.__sr_aria(e(this), "hidden", e(this).is("." + i.hidden));
                  });
              }),
              this.bind("openPanel:start", function (e) {
                var t = this.$menu
                    .find("." + i.panel)
                    .not(e)
                    .not(e.parents("." + i.panel)),
                  n = e.add(
                    e
                      .find("." + i.vertical + "." + i.opened)
                      .children("." + i.panel)
                  );
                this.__sr_aria(t, "hidden", !0),
                  this.__sr_aria(n, "hidden", !1);
              }),
              this.bind("closePanel", function (e) {
                this.__sr_aria(e, "hidden", !0);
              }),
              this.bind("initPanels:after", function (t) {
                var n = t.find("." + i.prev + ", ." + i.next).each(function () {
                  a.__sr_aria(
                    e(this),
                    "owns",
                    e(this).attr("href").replace("#", "")
                  );
                });
                this.__sr_aria(n, "haspopup", !0);
              }),
              this.bind("initNavbar:after", function (e) {
                var t = e.children("." + i.navbar);
                this.__sr_aria(t, "hidden", !e.hasClass(i.hasnavbar));
              }),
              r.text &&
                (this.bind("initlistview:after", function (e) {
                  var t = e
                    .find("." + i.listview)
                    .find("." + i.fullsubopen)
                    .parent()
                    .children("span");
                  this.__sr_aria(t, "hidden", !0);
                }),
                "parent" == this.opts.navbar.titleLink &&
                  this.bind("initNavbar:after", function (e) {
                    var t = e.children("." + i.navbar),
                      n = !!t.children("." + i.prev).length;
                    this.__sr_aria(t.children("." + i.title), "hidden", n);
                  }))),
            r.text &&
              (this.bind("initAddons:after", function () {
                this.bind("setPage:after", function () {
                  this.trigger("setPage:after:sr-text", arguments[0]);
                });
              }),
              this.bind("initNavbar:after", function (n) {
                var s = n.children("." + i.navbar),
                  a = s.children("." + i.title).text(),
                  o = e[t].i18n(l.text.closeSubmenu);
                a && (o += " (" + a + ")"),
                  s.children("." + i.prev).html(this.__sr_text(o));
              }),
              this.bind("initListview:after", function (n) {
                var o = n.data(s.parent);
                if (o && o.length) {
                  var r = o.children("." + i.next),
                    d = r.nextAll("span, a").first().text(),
                    c = e[t].i18n(
                      l.text[
                        r.parent().is("." + i.vertical)
                          ? "toggleSubmenu"
                          : "openSubmenu"
                      ]
                    );
                  d && (c += " (" + d + ")"), r.html(a.__sr_text(c));
                }
              }));
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("sronly");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { aria: !0, text: !0 }),
        (e[t].configuration[n] = {
          text: {
            closeMenu: "Close menu",
            closeSubmenu: "Close submenu",
            openSubmenu: "Open submenu",
            toggleSubmenu: "Toggle submenu",
          },
        }),
        (e[t].prototype.__sr_aria = function (e, t, n) {
          e.prop("aria-" + t, n)[n ? "attr" : "removeAttr"]("aria-" + t, n);
        }),
        (e[t].prototype.__sr_text = function (e) {
          return '<span class="' + i.sronly + '">' + e + "</span>";
        });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu autoHeight add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "autoHeight";
      (e[t].addons[n] = {
        setup: function () {
          var s = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof s && s && (s = { height: "auto" }),
            "string" == typeof s && (s = { height: s }),
            "object" != typeof s && (s = {}),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            "auto" == s.height || "highest" == s.height)
          ) {
            this.bind("initMenu:after", function () {
              this.$menu.addClass(i.autoheight);
            });
            var a = function (t) {
              if (!this.opts.offCanvas || this.vars.opened) {
                var n = Math.max(parseInt(this.$pnls.css("top"), 10), 0) || 0,
                  a = Math.max(parseInt(this.$pnls.css("bottom"), 10), 0) || 0,
                  o = 0;
                this.$menu.addClass(i.measureheight),
                  "auto" == s.height
                    ? ((t = t || this.$pnls.children("." + i.opened)),
                      t.is("." + i.vertical) &&
                        (t = t.parents("." + i.panel).not("." + i.vertical)),
                      t.length || (t = this.$pnls.children("." + i.panel)),
                      (o = t.first().outerHeight()))
                    : "highest" == s.height &&
                      this.$pnls.children().each(function () {
                        var t = e(this);
                        t.is("." + i.vertical) &&
                          (t = t
                            .parents("." + i.panel)
                            .not("." + i.vertical)
                            .first()),
                          (o = Math.max(o, t.outerHeight()));
                      }),
                  this.$menu.height(o + n + a).removeClass(i.measureheight);
              }
            };
            this.opts.offCanvas && this.bind("open:start", a),
              "highest" == s.height && this.bind("initPanels:after", a),
              "auto" == s.height &&
                (this.bind("updateListview", a),
                this.bind("openPanel:start", a),
                this.bind("closePanel", a));
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("autoheight measureheight"),
            a.add("resize");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { height: "default" });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu backButton add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "backButton";
      (e[t].addons[n] = {
        setup: function () {
          if (this.opts.offCanvas) {
            var s = this,
              a = this.opts[n];
            this.conf[n];
            if (
              ((o = e[t].glbl),
              "boolean" == typeof a && (a = { close: a }),
              "object" != typeof a && (a = {}),
              (a = e.extend(!0, {}, e[t].defaults[n], a)),
              a.close)
            ) {
              var r = "#" + s.$menu.attr("id");
              this.bind("open:finish", function (e) {
                location.hash != r &&
                  history.pushState(null, document.title, r);
              }),
                e(window).on("popstate", function (e) {
                  o.$html.hasClass(i.opened)
                    ? (e.stopPropagation(), s.close())
                    : location.hash == r && (e.stopPropagation(), s.open());
                });
            }
          }
        },
        add: function () {
          return window.history && window.history.pushState
            ? ((i = e[t]._c), (s = e[t]._d), void (a = e[t]._e))
            : void (e[t].addons[n].setup = function () {});
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { close: !1 });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu counters add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "counters";
      (e[t].addons[n] = {
        setup: function () {
          var a = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r, update: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initListview:after", function (t) {
              this.__refactorClass(
                e("em", t),
                this.conf.classNames[n].counter,
                "counter"
              );
            }),
            r.add &&
              this.bind("initListview:after", function (t) {
                var n;
                switch (r.addTo) {
                  case "panels":
                    n = t;
                    break;
                  default:
                    n = t.filter(r.addTo);
                }
                n.each(function () {
                  var t = e(this).data(s.parent);
                  t &&
                    (t.children("em." + i.counter).length ||
                      t.prepend(e('<em class="' + i.counter + '" />')));
                });
              }),
            r.update)
          ) {
            var l = function (t) {
              (t = t || this.$pnls.children("." + i.panel)),
                t.each(function () {
                  var t = e(this),
                    n = t.data(s.parent);
                  if (n) {
                    var o = n.children("em." + i.counter);
                    o.length &&
                      ((t = t.children("." + i.listview)),
                      t.length &&
                        o.html(a.__filterListItems(t.children()).length));
                  }
                });
            };
            this.bind("initListview:after", l), this.bind("updateListview", l);
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("counter search noresultsmsg");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { add: !1, addTo: "panels", count: !1 }),
        (e[t].configuration.classNames[n] = { counter: "Counter" });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu columns add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "columns";
      (e[t].addons[n] = {
        setup: function () {
          var s = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof s && (s = { add: s }),
            "number" == typeof s && (s = { add: !0, visible: s }),
            "object" != typeof s && (s = {}),
            "number" == typeof s.visible &&
              (s.visible = { min: s.visible, max: s.visible }),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            s.add)
          ) {
            (s.visible.min = Math.max(1, Math.min(6, s.visible.min))),
              (s.visible.max = Math.max(
                s.visible.min,
                Math.min(6, s.visible.max)
              ));
            for (
              var a = this.opts.offCanvas
                  ? this.$menu.add(o.$html)
                  : this.$menu,
                r = "",
                l = 0;
              l <= s.visible.max;
              l++
            )
              r += " " + i.columns + "-" + l;
            r.length && (r = r.slice(1));
            var d = function (e) {
                var t = this.$pnls.children("." + i.subopened).length;
                e && !e.hasClass(i.subopened) && t++,
                  (t = Math.min(s.visible.max, Math.max(s.visible.min, t))),
                  a.removeClass(r).addClass(i.columns + "-" + t);
              },
              c = function (t) {
                (t = t || this.$pnls.children("." + i.opened)),
                  this.$pnls
                    .children("." + i.panel)
                    .removeClass(r)
                    .filter("." + i.subopened)
                    .add(t)
                    .slice(-s.visible.max)
                    .each(function (t) {
                      e(this).addClass(i.columns + "-" + t);
                    });
              };
            this.bind("initMenu:after", function () {
              this.$menu.addClass(i.columns);
            }),
              this.bind("openPanel:start", d),
              this.bind("openPanel:start", c);
          }
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("columns");
        },
        clickAnchor: function (t, s) {
          if (!this.opts[n].add) return !1;
          if (s) {
            var a = t.attr("href");
            if (a.length > 1 && "#" == a.slice(0, 1))
              try {
                var o = e(a, this.$menu);
                if (o.is("." + i.panel))
                  for (
                    var r =
                      parseInt(
                        t
                          .closest("." + i.panel)
                          .attr("class")
                          .split(i.columns + "-")[1]
                          .split(" ")[0],
                        10
                      ) + 1;
                    r > 0;

                  ) {
                    var l = this.$pnls.children("." + i.columns + "-" + r);
                    if (!l.length) {
                      r = -1;
                      break;
                    }
                    r++,
                      l
                        .removeClass(i.subopened)
                        .removeClass(i.opened)
                        .removeClass(i.highest)
                        .addClass(i.hidden);
                  }
              } catch (d) {}
          }
        },
      }),
        (e[t].defaults[n] = { add: !1, visible: { min: 1, max: 3 } });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu dividers add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "dividers";
      (e[t].addons[n] = {
        setup: function () {
          var s = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r, fixed: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initListview:after", function (e) {
              this.__refactorClass(
                e.find("li"),
                this.conf.classNames[n].collapsed,
                "collapsed"
              );
            }),
            r.add &&
              this.bind("initListview:after", function (t) {
                var n;
                switch (r.addTo) {
                  case "panels":
                    n = t;
                    break;
                  default:
                    n = t.filter(r.addTo);
                }
                n.length &&
                  n
                    .find("." + i.listview)
                    .find("." + i.divider)
                    .remove()
                    .end()
                    .each(function () {
                      var t = "";
                      s.__filterListItems(e(this).children()).each(function () {
                        var n = e
                          .trim(e(this).children("a, span").text())
                          .slice(0, 1)
                          .toLowerCase();
                        n != t &&
                          n.length &&
                          ((t = n),
                          e(
                            '<li class="' + i.divider + '">' + n + "</li>"
                          ).insertBefore(this));
                      });
                    });
              }),
            r.collapse &&
              this.bind("initListview:after", function (t) {
                t.find("." + i.divider).each(function () {
                  var t = e(this),
                    n = t.nextUntil("." + i.divider, "." + i.collapsed);
                  n.length &&
                    (t.children("." + i.next).length ||
                      (t.wrapInner("<span />"),
                      t.prepend(
                        '<a href="#" class="' +
                          i.next +
                          " " +
                          i.fullsubopen +
                          '" />'
                      )));
                });
              }),
            r.fixed)
          ) {
            this.bind("initPanels:after", function () {
              "undefined" == typeof this.$fixeddivider &&
                (this.$fixeddivider = e(
                  '<ul class="' +
                    i.listview +
                    " " +
                    i.fixeddivider +
                    '"><li class="' +
                    i.divider +
                    '"></li></ul>'
                )
                  .prependTo(this.$pnls)
                  .children());
            });
            var l = function (t) {
              if (
                ((t = t || this.$pnls.children("." + i.opened)),
                !t.is(":hidden"))
              ) {
                var n = t
                    .children("." + i.listview)
                    .children("." + i.divider)
                    .not("." + i.hidden),
                  s = t.scrollTop() || 0,
                  a = "";
                n.each(function () {
                  e(this).position().top + s < s + 1 && (a = e(this).text());
                }),
                  this.$fixeddivider.text(a),
                  this.$pnls[a.length ? "addClass" : "removeClass"](
                    i.hasdividers
                  );
              }
            };
            this.bind("open:start", l),
              this.bind("openPanel:start", l),
              this.bind("updateListview", l),
              this.bind("initPanel:after", function (e) {
                e.off(a.scroll + "-" + n + " " + a.touchmove + "-" + n).on(
                  a.scroll + "-" + n + " " + a.touchmove + "-" + n,
                  function (t) {
                    l.call(s, e);
                  }
                );
              });
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("collapsed uncollapsed fixeddivider hasdividers"),
            a.add("scroll");
        },
        clickAnchor: function (e, t) {
          if (this.opts[n].collapse && t) {
            var s = e.parent();
            if (s.is("." + i.divider)) {
              var a = s.nextUntil("." + i.divider, "." + i.collapsed);
              return (
                s.toggleClass(i.opened),
                a[s.hasClass(i.opened) ? "addClass" : "removeClass"](
                  i.uncollapsed
                ),
                !0
              );
            }
          }
          return !1;
        },
      }),
        (e[t].defaults[n] = {
          add: !1,
          addTo: "panels",
          fixed: !1,
          collapse: !1,
        }),
        (e[t].configuration.classNames[n] = { collapsed: "Collapsed" });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu drag add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      function t(e, t, n) {
        return e < t && (e = t), e > n && (e = n), e;
      }
      function n(n, i, s) {
        var r,
          l,
          d,
          c = this,
          h = {
            events: "panleft panright",
            typeLower: "x",
            typeUpper: "X",
            open_dir: "right",
            close_dir: "left",
            negative: !1,
          },
          f = "width",
          u = h.open_dir,
          p = function (e) {
            e <= n.maxStartPos && (m = 1);
          },
          v = function () {
            return e("." + o.slideout);
          },
          m = 0,
          b = 0,
          g = 0;
        switch (this.opts.offCanvas.position) {
          case "top":
          case "bottom":
            (h.events = "panup pandown"),
              (h.typeLower = "y"),
              (h.typeUpper = "Y"),
              (f = "height");
        }
        switch (this.opts.offCanvas.position) {
          case "right":
          case "bottom":
            (h.negative = !0),
              (p = function (e) {
                e >= s.$wndw[f]() - n.maxStartPos && (m = 1);
              });
        }
        switch (this.opts.offCanvas.position) {
          case "left":
            break;
          case "right":
            (h.open_dir = "left"), (h.close_dir = "right");
            break;
          case "top":
            (h.open_dir = "down"), (h.close_dir = "up");
            break;
          case "bottom":
            (h.open_dir = "up"), (h.close_dir = "down");
        }
        switch (this.opts.offCanvas.zposition) {
          case "front":
            v = function () {
              return this.$menu;
            };
        }
        var _ = this.__valueOrFn(n.node, this.$menu, s.$page);
        "string" == typeof _ && (_ = e(_));
        var y = new Hammer(_[0], this.opts[a].vendors.hammer);
        y.on("panstart", function (e) {
          p(e.center[h.typeLower]), (s.$slideOutNodes = v()), (u = h.open_dir);
        }),
          y.on(h.events + " panend", function (e) {
            m > 0 && e.preventDefault();
          }),
          y.on(h.events, function (e) {
            if (
              ((r = e["delta" + h.typeUpper]),
              h.negative && (r = -r),
              r != b && (u = r >= b ? h.open_dir : h.close_dir),
              (b = r),
              b > n.threshold && 1 == m)
            ) {
              if (s.$html.hasClass(o.opened)) return;
              (m = 2),
                c._openSetup(),
                c.trigger("open:start"),
                s.$html.addClass(o.dragging),
                (g = t(s.$wndw[f]() * i[f].perc, i[f].min, i[f].max));
            }
            2 == m &&
              ((l =
                t(b, 10, g) - ("front" == c.opts.offCanvas.zposition ? g : 0)),
              h.negative && (l = -l),
              (d = "translate" + h.typeUpper + "(" + l + "px )"),
              s.$slideOutNodes.css({
                "-webkit-transform": "-webkit-" + d,
                transform: d,
              }));
          }),
          y.on("panend", function (e) {
            2 == m &&
              (s.$html.removeClass(o.dragging),
              s.$slideOutNodes.css("transform", ""),
              c[u == h.open_dir ? "_openFinish" : "close"]()),
              (m = 0);
          });
      }
      function i(e, t, n, i) {
        var s = this,
          l = e.data(r.parent);
        if (l) {
          l = l.closest("." + o.panel);
          var d = new Hammer(e[0], s.opts[a].vendors.hammer),
            c = null;
          d.on("panright", function (e) {
            c ||
              (s.openPanel(l),
              (c = setTimeout(function () {
                clearTimeout(c), (c = null);
              }, s.conf.openingInterval + s.conf.transitionDuration)));
          });
        }
      }
      var s = "mmenu",
        a = "drag";
      (e[s].addons[a] = {
        setup: function () {
          if (this.opts.offCanvas) {
            var t = this.opts[a],
              o = this.conf[a];
            (d = e[s].glbl),
              "boolean" == typeof t && (t = { menu: t, panels: t }),
              "object" != typeof t && (t = {}),
              "boolean" == typeof t.menu && (t.menu = { open: t.menu }),
              "object" != typeof t.menu && (t.menu = {}),
              "boolean" == typeof t.panels && (t.panels = { close: t.panels }),
              "object" != typeof t.panels && (t.panels = {}),
              (t = this.opts[a] = e.extend(!0, {}, e[s].defaults[a], t)),
              t.menu.open &&
                this.bind("setPage:after", function () {
                  n.call(this, t.menu, o.menu, d);
                }),
              t.panels.close &&
                this.bind("initPanel:after", function (e) {
                  i.call(this, e, t.panels, o.panels, d);
                });
          }
        },
        add: function () {
          return "function" != typeof Hammer || Hammer.VERSION < 2
            ? ((e[s].addons[a].add = function () {}),
              void (e[s].addons[a].setup = function () {}))
            : ((o = e[s]._c),
              (r = e[s]._d),
              (l = e[s]._e),
              void o.add("dragging"));
        },
        clickAnchor: function (e, t) {},
      }),
        (e[s].defaults[a] = {
          menu: { open: !1, maxStartPos: 100, threshold: 50 },
          panels: { close: !1 },
          vendors: { hammer: {} },
        }),
        (e[s].configuration[a] = {
          menu: {
            width: { perc: 0.8, min: 140, max: 440 },
            height: { perc: 0.8, min: 140, max: 880 },
          },
          panels: {},
        });
      var o, r, l, d;
    })(jQuery)
    /*
     * jQuery mmenu dropdown add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "dropdown";
      (e[t].addons[n] = {
        setup: function () {
          if (this.opts.offCanvas) {
            var r = this,
              l = this.opts[n],
              d = this.conf[n];
            if (
              ((o = e[t].glbl),
              "boolean" == typeof l && l && (l = { drop: l }),
              "object" != typeof l && (l = {}),
              "string" == typeof l.position &&
                (l.position = { of: l.position }),
              (l = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], l)),
              l.drop)
            ) {
              var c;
              this.bind("initMenu:after", function () {
                if (
                  (this.$menu.addClass(i.dropdown),
                  l.tip && this.$menu.addClass(i.tip),
                  "string" != typeof l.position.of)
                ) {
                  var t = this._getOriginalMenuId();
                  t && t.length && (l.position.of = '[href="#' + t + '"]');
                }
                "string" == typeof l.position.of &&
                  ((c = e(l.position.of)),
                  (l.event = l.event.split(" ")),
                  1 == l.event.length && (l.event[1] = l.event[0]),
                  "hover" == l.event[0] &&
                    c.on(a.mouseenter + "-" + n, function () {
                      r.open();
                    }),
                  "hover" == l.event[1] &&
                    this.$menu.on(a.mouseleave + "-" + n, function () {
                      r.close();
                    }));
              }),
                this.bind("open:start", function () {
                  this.$menu.data(s.style, this.$menu.attr("style") || ""),
                    o.$html.addClass(i.dropdown);
                }),
                this.bind("close:finish", function () {
                  this.$menu.attr("style", this.$menu.data(s.style)),
                    o.$html.removeClass(i.dropdown);
                });
              var h = function (e, t) {
                  var n = t[0],
                    s = t[1],
                    a = "x" == e ? "scrollLeft" : "scrollTop",
                    r = "x" == e ? "outerWidth" : "outerHeight",
                    h = "x" == e ? "left" : "top",
                    f = "x" == e ? "right" : "bottom",
                    u = "x" == e ? "width" : "height",
                    p = "x" == e ? "maxWidth" : "maxHeight",
                    v = null,
                    m = o.$wndw[a](),
                    b = (c.offset()[h] -= m),
                    g = b + c[r](),
                    _ = o.$wndw[u](),
                    y = d.offset.button[e] + d.offset.viewport[e];
                  if (l.position[e])
                    switch (l.position[e]) {
                      case "left":
                      case "bottom":
                        v = "after";
                        break;
                      case "right":
                      case "top":
                        v = "before";
                    }
                  null === v &&
                    (v = b + (g - b) / 2 < _ / 2 ? "after" : "before");
                  var C, w;
                  return (
                    "after" == v
                      ? ((C = "x" == e ? b : g),
                        (w = _ - (C + y)),
                        (n[h] = C + d.offset.button[e]),
                        (n[f] = "auto"),
                        s.push(i["x" == e ? "tipleft" : "tiptop"]))
                      : ((C = "x" == e ? g : b),
                        (w = C - y),
                        (n[f] =
                          "calc( 100% - " + (C - d.offset.button[e]) + "px )"),
                        (n[h] = "auto"),
                        s.push(i["x" == e ? "tipright" : "tipbottom"])),
                    (n[p] = Math.min(d[u].max, w)),
                    [n, s]
                  );
                },
                f = function (e) {
                  if (this.vars.opened) {
                    this.$menu.attr("style", this.$menu.data(s.style));
                    var t = [{}, []];
                    (t = h.call(this, "y", t)),
                      (t = h.call(this, "x", t)),
                      this.$menu.css(t[0]),
                      l.tip &&
                        this.$menu
                          .removeClass(
                            i.tipleft +
                              " " +
                              i.tipright +
                              " " +
                              i.tiptop +
                              " " +
                              i.tipbottom
                          )
                          .addClass(t[1].join(" "));
                  }
                };
              this.bind("open:start", f),
                o.$wndw.on(a.resize + "-" + n, function (e) {
                  f.call(r);
                }),
                this.opts.offCanvas.blockUI ||
                  o.$wndw.on(a.scroll + "-" + n, function (e) {
                    f.call(r);
                  });
            }
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("dropdown tip tipleft tipright tiptop tipbottom"),
            a.add("mouseenter mouseleave resize scroll");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = {
          drop: !1,
          event: "click",
          position: {},
          tip: !0,
        }),
        (e[t].configuration[n] = {
          offset: { button: { x: -10, y: 10 }, viewport: { x: 20, y: 20 } },
          height: { max: 880 },
          width: { max: 440 },
        });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu fixedElements add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "fixedElements";
      (e[t].addons[n] = {
        setup: function () {
          if (this.opts.offCanvas) {
            var s = (this.opts[n], this.conf[n]);
            o = e[t].glbl;
            var a = function (t) {
              var a = this.conf.classNames[n].fixed,
                r = t.find("." + a);
              this.__refactorClass(r, a, "slideout"),
                r[s.elemInsertMethod](s.elemInsertSelector);
              var l = this.conf.classNames[n].sticky,
                d = t.find("." + l);
              this.__refactorClass(d, l, "sticky"),
                (d = t.find("." + i.sticky)),
                d.length &&
                  (this.bind("open:before", function () {
                    var t = o.$wndw.scrollTop() + s.sticky.offset;
                    d.each(function () {
                      e(this).css("top", parseInt(e(this).css("top"), 10) + t);
                    });
                  }),
                  this.bind("close:finish", function () {
                    d.css("top", "");
                  }));
            };
            this.bind("setPage:after", a);
          }
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("sticky");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].configuration[n] = {
          sticky: { offset: 0 },
          elemInsertMethod: "appendTo",
          elemInsertSelector: "body",
        }),
        (e[t].configuration.classNames[n] = {
          fixed: "Fixed",
          sticky: "Sticky",
        });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu iconPanels add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "iconPanels";
      (e[t].addons[n] = {
        setup: function () {
          var s = this,
            a = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof a && (a = { add: a }),
            "number" == typeof a && (a = { add: !0, visible: a }),
            "object" != typeof a && (a = {}),
            (a = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], a)),
            a.visible++,
            a.add)
          ) {
            for (var r = "", l = 0; l <= a.visible; l++)
              r += " " + i.iconpanel + "-" + l;
            r.length && (r = r.slice(1));
            var d = function (t) {
              t.hasClass(i.vertical) ||
                s.$pnls
                  .children("." + i.panel)
                  .removeClass(r)
                  .filter("." + i.subopened)
                  .removeClass(i.hidden)
                  .add(t)
                  .not("." + i.vertical)
                  .slice(-a.visible)
                  .each(function (t) {
                    e(this).addClass(i.iconpanel + "-" + t);
                  });
            };
            this.bind("initMenu:after", function () {
              this.$menu.addClass(i.iconpanel);
            }),
              this.bind("openPanel:start", d),
              this.bind("initPanels:after", function (e) {
                d.call(s, s.$pnls.children("." + i.opened));
              }),
              this.bind("initListview:after", function (e) {
                e.hasClass(i.vertical) ||
                  e.children("." + i.subblocker).length ||
                  e.prepend(
                    '<a href="#' +
                      e.closest("." + i.panel).attr("id") +
                      '" class="' +
                      i.subblocker +
                      '" />'
                  );
              });
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("iconpanel subblocker");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { add: !1, visible: 3 });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu keyboardNavigation add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      function t(t, n) {
        t = t || this.$pnls.children("." + a.opened);
        var i = e(),
          s = this.$menu
            .children(
              "." + a.mm("navbars-top") + ", ." + a.mm("navbars-bottom")
            )
            .children("." + a.navbar);
        s.find(d).filter(":focus").length ||
          ("default" == n &&
            ((i = t
              .children("." + a.listview)
              .find("a[href]")
              .not("." + a.hidden)),
            i.length || (i = t.find(d).not("." + a.hidden)),
            i.length || (i = s.find(d).not("." + a.hidden))),
          i.length || (i = this.$menu.children("." + a.tabstart)),
          i.first().focus());
      }
      function n(e) {
        e || (e = this.$pnls.children("." + a.opened));
        var t = this.$pnls.children("." + a.panel),
          n = t.not(e);
        n.find(d).attr("tabindex", -1),
          e.find(d).attr("tabindex", 0),
          e
            .find("." + a.mm("toggle") + ", ." + a.mm("check"))
            .attr("tabindex", -1),
          e
            .children("." + a.navbar)
            .children("." + a.title)
            .attr("tabindex", -1);
      }
      var i = "mmenu",
        s = "keyboardNavigation";
      (e[i].addons[s] = {
        setup: function () {
          if (!e[i].support.touch) {
            var o = this.opts[s];
            this.conf[s];
            if (
              ((l = e[i].glbl),
              ("boolean" != typeof o && "string" != typeof o) ||
                (o = { enable: o }),
              "object" != typeof o && (o = {}),
              (o = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], o)),
              o.enable)
            ) {
              var r = e(
                  '<button class="' +
                    a.tabstart +
                    '" tabindex="0" type="button" />'
                ),
                d = e(
                  '<button class="' +
                    a.tabend +
                    '" tabindex="0" type="button" />'
                );
              this.bind("initMenu:after", function () {
                o.enhance && this.$menu.addClass(a.keyboardfocus),
                  this["_initWindow_" + s](o.enhance);
              }),
                this.bind("initOpened:before", function () {
                  this.$menu
                    .prepend(r)
                    .append(d)
                    .children(
                      "." + a.mm("navbars-top") + ", ." + a.mm("navbars-bottom")
                    )
                    .children("." + a.navbar)
                    .children("a." + a.title)
                    .attr("tabindex", -1);
                }),
                this.bind("open:start", function () {
                  n.call(this);
                }),
                this.bind("open:finish", function () {
                  t.call(this, null, o.enable);
                }),
                this.bind("openPanel:start", function (e) {
                  n.call(this, e);
                }),
                this.bind("openPanel:finish", function (e) {
                  t.call(this, e, o.enable);
                }),
                this.bind("initOpened:after", function () {
                  this.__sr_aria(
                    this.$menu.children(
                      "." + a.mm("tabstart") + ", ." + a.mm("tabend")
                    ),
                    "hidden",
                    !0
                  );
                });
            }
          }
        },
        add: function () {
          (a = e[i]._c),
            (o = e[i]._d),
            (r = e[i]._e),
            a.add("tabstart tabend keyboardfocus"),
            r.add("focusin keydown");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[i].defaults[s] = { enable: !1, enhance: !1 }),
        (e[i].configuration[s] = {}),
        (e[i].prototype["_initWindow_" + s] = function (t) {
          l.$wndw.off(r.keydown + "-offCanvas"),
            l.$wndw
              .off(r.focusin + "-" + s)
              .on(r.focusin + "-" + s, function (t) {
                if (l.$html.hasClass(a.opened)) {
                  var n = e(t.target);
                  n.is("." + a.tabend) &&
                    n
                      .parent()
                      .find("." + a.tabstart)
                      .focus();
                }
              }),
            l.$wndw
              .off(r.keydown + "-" + s)
              .on(r.keydown + "-" + s, function (t) {
                var n = e(t.target),
                  i = n.closest("." + a.menu);
                if (i.length) {
                  i.data("mmenu");
                  if (n.is("input, textarea"));
                  else
                    switch (t.keyCode) {
                      case 13:
                        (n.is(".mm-toggle") || n.is(".mm-check")) &&
                          n.trigger(r.click);
                        break;
                      case 32:
                      case 37:
                      case 38:
                      case 39:
                      case 40:
                        t.preventDefault();
                    }
                }
              }),
            t &&
              l.$wndw
                .off(r.keydown + "-" + s)
                .on(r.keydown + "-" + s, function (t) {
                  var n = e(t.target),
                    i = n.closest("." + a.menu);
                  if (i.length) {
                    var s = i.data("mmenu");
                    if (n.is("input, textarea"))
                      switch (t.keyCode) {
                        case 27:
                          n.val("");
                      }
                    else
                      switch (t.keyCode) {
                        case 8:
                          var r = n.closest("." + a.panel).data(o.parent);
                          r &&
                            r.length &&
                            s.openPanel(r.closest("." + a.panel));
                          break;
                        case 27:
                          i.hasClass(a.offcanvas) && s.close();
                      }
                  }
                });
        });
      var a,
        o,
        r,
        l,
        d = "input, select, textarea, button, label, a[href]";
    })(jQuery)
    /*
     * jQuery mmenu lazySubmenus add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "lazySubmenus";
      (e[t].addons[n] = {
        setup: function () {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof s && (s = { load: s }),
            "object" != typeof s && (s = {}),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            s.load &&
              (this.bind("initMenu:after", function () {
                this.$pnls
                  .find("li")
                  .children(this.conf.panelNodetype)
                  .not("." + i.inset)
                  .not("." + i.nolistview)
                  .not("." + i.nopanel)
                  .addClass(
                    i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                  );
              }),
              this.bind("initPanels:before", function (e) {
                (e = e || this.$pnls.children(this.conf.panelNodetype)),
                  this.__findAddBack(e, "." + i.lazysubmenu)
                    .not("." + i.lazysubmenu + " ." + i.lazysubmenu)
                    .removeClass(
                      i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                    );
              }),
              this.bind("initOpened:before", function () {
                var e = this.$pnls
                  .find("." + this.conf.classNames.selected)
                  .parents("." + i.lazysubmenu);
                e.length &&
                  (e.removeClass(
                    i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                  ),
                  this.initPanels(e.last()));
              }),
              this.bind("openPanel:before", function (e) {
                var t = this.__findAddBack(e, "." + i.lazysubmenu).not(
                  "." + i.lazysubmenu + " ." + i.lazysubmenu
                );
                t.length && this.initPanels(t);
              }));
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("lazysubmenu"),
            s.add("lazysubmenu");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { load: !1 }),
        (e[t].configuration[n] = {});
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars";
      (e[t].addons[n] = {
        setup: function () {
          var s = this,
            a = this.opts[n],
            r = this.conf[n];
          if (((o = e[t].glbl), "undefined" != typeof a)) {
            a instanceof Array || (a = [a]);
            var l = {},
              d = {};
            a.length &&
              (e.each(a, function (o) {
                var c = a[o];
                "boolean" == typeof c && c && (c = {}),
                  "object" != typeof c && (c = {}),
                  "undefined" == typeof c.content &&
                    (c.content = ["prev", "title"]),
                  c.content instanceof Array || (c.content = [c.content]),
                  (c = e.extend(!0, {}, s.opts.navbar, c));
                var h = e('<div class="' + i.navbar + '" />'),
                  f = c.height;
                "number" != typeof f && (f = 1),
                  (f = Math.min(4, Math.max(1, f))),
                  h.addClass(i.navbar + "-size-" + f);
                var u = c.position;
                "bottom" != u && (u = "top"),
                  l[u] || (l[u] = 0),
                  (l[u] += f),
                  d[u] ||
                    (d[u] = e('<div class="' + i.navbars + "-" + u + '" />')),
                  d[u].append(h);
                for (var p = 0, v = 0, m = c.content.length; v < m; v++) {
                  var b = e[t].addons[n][c.content[v]] || !1;
                  b
                    ? (p += b.call(s, h, c, r))
                    : ((b = c.content[v]),
                      b instanceof e || (b = e(c.content[v])),
                      h.append(b));
                }
                (p += Math.ceil(h.children().not("." + i.btn).length / f)),
                  p > 1 && h.addClass(i.navbar + "-content-" + p),
                  h.children("." + i.btn).length && h.addClass(i.hasbtns);
              }),
              this.bind("initMenu:after", function () {
                for (var e in l)
                  this.$menu.addClass(i.hasnavbar + "-" + e + "-" + l[e]),
                    this.$menu["bottom" == e ? "append" : "prepend"](d[e]);
              }));
          }
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("navbars close hasbtns");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].configuration[n] = { breadcrumbSeparator: "/" }),
        (e[t].configuration.classNames[n] = {});
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on breadcrumbs content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "breadcrumbs";
      e[t].addons[n][i] = function (n, i, s) {
        var a = this,
          o = e[t]._c,
          r = e[t]._d;
        o.add("breadcrumbs separator");
        var l = e('<span class="' + o.breadcrumbs + '" />').appendTo(n);
        return (
          this.bind("initNavbar:after", function (t) {
            t.removeClass(o.hasnavbar);
            for (
              var n = [],
                i = e('<span class="' + o.breadcrumbs + '"></span>'),
                a = t,
                l = !0;
              a && a.length;

            ) {
              if (
                (a.is("." + o.panel) || (a = a.closest("." + o.panel)),
                !a.hasClass(o.vertical))
              ) {
                var d = a
                  .children("." + o.navbar)
                  .children("." + o.title)
                  .text();
                n.unshift(
                  l
                    ? "<span>" + d + "</span>"
                    : '<a href="#' + a.attr("id") + '">' + d + "</a>"
                ),
                  (l = !1);
              }
              a = a.data(r.parent);
            }
            i.append(
              n.join(
                '<span class="' +
                  o.separator +
                  '">' +
                  s.breadcrumbSeparator +
                  "</span>"
              )
            ).appendTo(t.children("." + o.navbar));
          }),
          this.bind("openPanel:start", function (e) {
            l.html(
              e
                .children("." + o.navbar)
                .children("." + o.breadcrumbs)
                .html() || ""
            );
          }),
          this.bind("initNavbar:after:sr-aria", function (t) {
            t.children("." + o.navbar)
              .children("." + o.breadcrumbs)
              .children("a")
              .each(function () {
                a.__sr_aria(e(this), "owns", e(this).attr("href").slice(1));
              });
          }),
          0
        );
      };
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on close content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "close";
      e[t].addons[n][i] = function (n, i) {
        var s = e[t]._c,
          a =
            (e[t].glbl,
            e('<a class="' + s.close + " " + s.btn + '" href="#" />').appendTo(
              n
            ));
        return (
          this.bind("setPage:after", function (e) {
            a.attr("href", "#" + e.attr("id"));
          }),
          this.bind("setPage:after:sr-text", function (n) {
            a.html(
              this.__sr_text(e[t].i18n(this.conf.screenReader.text.closeMenu))
            ),
              this.__sr_aria(a, "owns", a.attr("href").slice(1));
          }),
          -1
        );
      };
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on next content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "next";
      (e[t].addons[n][i] = function (i, s) {
        var a,
          o,
          r,
          l = e[t]._c,
          d = e('<a class="' + l.next + " " + l.btn + '" href="#" />').appendTo(
            i
          );
        return (
          this.bind("openPanel:start", function (e) {
            (a = e.find("." + this.conf.classNames[n].panelNext)),
              (o = a.attr("href")),
              (r = a.html()),
              o ? d.attr("href", o) : d.removeAttr("href"),
              d[o || r ? "removeClass" : "addClass"](l.hidden),
              d.html(r);
          }),
          this.bind("openPanel:start:sr-aria", function (e) {
            this.__sr_aria(d, "hidden", d.hasClass(l.hidden)),
              this.__sr_aria(d, "owns", (d.attr("href") || "").slice(1));
          }),
          -1
        );
      }),
        (e[t].configuration.classNames[n].panelNext = "Next");
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on prev content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "prev";
      (e[t].addons[n][i] = function (i, s) {
        var a = e[t]._c,
          o = e('<a class="' + a.prev + " " + a.btn + '" href="#" />').appendTo(
            i
          );
        this.bind("initNavbar:after", function (e) {
          e.removeClass(a.hasnavbar);
        });
        var r, l, d;
        return (
          this.bind("openPanel:start", function (e) {
            e.hasClass(a.vertical) ||
              ((r = e.find("." + this.conf.classNames[n].panelPrev)),
              r.length ||
                (r = e.children("." + a.navbar).children("." + a.prev)),
              (l = r.attr("href")),
              (d = r.html()),
              l ? o.attr("href", l) : o.removeAttr("href"),
              o[l || d ? "removeClass" : "addClass"](a.hidden),
              o.html(d));
          }),
          this.bind("initNavbar:after:sr-aria", function (e) {
            var t = e.children("." + a.navbar);
            this.__sr_aria(t, "hidden", !0);
          }),
          this.bind("openPanel:start:sr-aria", function (e) {
            this.__sr_aria(o, "hidden", o.hasClass(a.hidden)),
              this.__sr_aria(o, "owns", (o.attr("href") || "").slice(1));
          }),
          -1
        );
      }),
        (e[t].configuration.classNames[n].panelPrev = "Prev");
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on searchfield content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "searchfield";
      e[t].addons[n][i] = function (n, i) {
        var s = e[t]._c,
          a = e('<div class="' + s.search + '" />').appendTo(n);
        return (
          "object" != typeof this.opts.searchfield &&
            (this.opts.searchfield = {}),
          (this.opts.searchfield.add = !0),
          (this.opts.searchfield.addTo = a),
          0
        );
      };
    })(jQuery)
    /*
     * jQuery mmenu navbar add-on title content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "navbars",
        i = "title";
      (e[t].addons[n][i] = function (i, s) {
        var a,
          o,
          r,
          l = e[t]._c,
          d = e('<a class="' + l.title + '" />').appendTo(i);
        this.bind("openPanel:start", function (e) {
          e.hasClass(l.vertical) ||
            ((r = e.find("." + this.conf.classNames[n].panelTitle)),
            r.length ||
              (r = e.children("." + l.navbar).children("." + l.title)),
            (a = r.attr("href")),
            (o = r.html() || s.title),
            a ? d.attr("href", a) : d.removeAttr("href"),
            d[a || o ? "removeClass" : "addClass"](l.hidden),
            d.html(o));
        });
        var c;
        return (
          this.bind("openPanel:start:sr-aria", function (e) {
            if (
              this.opts.screenReader.text &&
              (c ||
                (c = this.$menu
                  .children("." + l.navbars + "-top, ." + l.navbars + "-bottom")
                  .children("." + l.navbar)
                  .children("." + l.prev)),
              c.length)
            ) {
              var t = !0;
              "parent" == this.opts.navbar.titleLink &&
                (t = !c.hasClass(l.hidden)),
                this.__sr_aria(d, "hidden", t);
            }
          }),
          0
        );
      }),
        (e[t].configuration.classNames[n].panelTitle = "Title");
    })(jQuery)
    /*
     * jQuery mmenu pageScroll add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      function t(e) {
        d &&
          d.length &&
          d.is(":visible") &&
          l.$html.add(l.$body).animate({ scrollTop: d.offset().top + e }),
          (d = !1);
      }
      function n(e) {
        try {
          return !("#" == e || "#" != e.slice(0, 1) || !l.$page.find(e).length);
        } catch (t) {
          return !1;
        }
      }
      var i = "mmenu",
        s = "pageScroll";
      (e[i].addons[s] = {
        setup: function () {
          var o = this,
            d = this.opts[s],
            c = this.conf[s];
          if (
            ((l = e[i].glbl),
            "boolean" == typeof d && (d = { scroll: d }),
            (d = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], d)),
            d.scroll &&
              this.bind("close:finish", function () {
                t(c.scrollOffset);
              }),
            d.update)
          ) {
            var o = this,
              h = [],
              f = [];
            o.bind("initListview:after", function (t) {
              o
                .__filterListItemAnchors(
                  t.find("." + a.listview).children("li")
                )
                .each(function () {
                  var t = e(this).attr("href");
                  n(t) && h.push(t);
                }),
                (f = h.reverse());
            });
            var u = -1;
            l.$wndw.on(r.scroll + "-" + s, function (t) {
              for (var n = l.$wndw.scrollTop(), i = 0; i < f.length; i++)
                if (e(f[i]).offset().top < n + c.updateOffset) {
                  u !== i &&
                    ((u = i),
                    o.setSelected(
                      o
                        .__filterListItemAnchors(
                          o.$pnls
                            .children("." + a.opened)
                            .find("." + a.listview)
                            .children("li")
                        )
                        .filter('[href="' + f[i] + '"]')
                        .parent()
                    ));
                  break;
                }
            });
          }
        },
        add: function () {
          (a = e[i]._c), (o = e[i]._d), (r = e[i]._e);
        },
        clickAnchor: function (i, o) {
          if (
            ((d = !1),
            o &&
              this.opts[s].scroll &&
              this.opts.offCanvas &&
              l.$page &&
              l.$page.length)
          ) {
            var r = i.attr("href");
            n(r) &&
              ((d = e(r)),
              l.$html.hasClass(a.mm("widescreen")) &&
                t(this.conf[s].scrollOffset));
          }
        },
      }),
        (e[i].defaults[s] = { scroll: !1, update: !1 }),
        (e[i].configuration[s] = { scrollOffset: 0, updateOffset: 50 });
      var a,
        o,
        r,
        l,
        d = !1;
    })(jQuery)
    /*
     * jQuery mmenu RTL add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "rtl";
      (e[t].addons[n] = {
        setup: function () {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "object" != typeof s && (s = { use: s }),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            "boolean" != typeof s.use &&
              (s.use = "rtl" == (o.$html.attr("dir") || "").toLowerCase()),
            s.use &&
              this.bind("initMenu:after", function () {
                this.$menu.addClass(i.rtl);
              });
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("rtl");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { use: "detect" });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu searchfield add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      function t(e) {
        switch (e) {
          case 9:
          case 16:
          case 17:
          case 18:
          case 37:
          case 38:
          case 39:
          case 40:
            return !0;
        }
        return !1;
      }
      var n = "mmenu",
        i = "searchfield";
      (e[n].addons[i] = {
        setup: function () {
          var l = this,
            d = this.opts[i],
            c = this.conf[i];
          (r = e[n].glbl),
            "boolean" == typeof d && (d = { add: d }),
            "object" != typeof d && (d = {}),
            "boolean" == typeof d.resultsPanel &&
              (d.resultsPanel = { add: d.resultsPanel }),
            (d = this.opts[i] = e.extend(!0, {}, e[n].defaults[i], d)),
            (c = this.conf[i] = e.extend(!0, {}, e[n].configuration[i], c)),
            this.bind("close:start", function () {
              this.$menu
                .find("." + s.search)
                .find("input")
                .blur();
            }),
            this.bind("initPanels:after", function (r) {
              if (d.add) {
                var h;
                switch (d.addTo) {
                  case "panels":
                    h = r;
                    break;
                  default:
                    h = this.$menu.find(d.addTo);
                }
                if (
                  (h.each(function () {
                    var t = e(this);
                    if (!t.is("." + s.panel) || !t.is("." + s.vertical)) {
                      if (!t.children("." + s.search).length) {
                        var i = l.__valueOrFn(c.clear, t),
                          a = l.__valueOrFn(c.form, t),
                          r = l.__valueOrFn(c.input, t),
                          h = l.__valueOrFn(c.submit, t),
                          f = e(
                            "<" +
                              (a ? "form" : "div") +
                              ' class="' +
                              s.search +
                              '" />'
                          ),
                          u = e(
                            '<input placeholder="' +
                              e[n].i18n(d.placeholder) +
                              '" type="text" autocomplete="off" />'
                          );
                        f.append(u);
                        var p;
                        if (r) for (p in r) u.attr(p, r[p]);
                        if (
                          (i &&
                            e(
                              '<a class="' +
                                s.btn +
                                " " +
                                s.clear +
                                '" href="#" />'
                            )
                              .appendTo(f)
                              .on(o.click + "-searchfield", function (e) {
                                e.preventDefault(),
                                  u.val("").trigger(o.keyup + "-searchfield");
                              }),
                          a)
                        ) {
                          for (p in a) f.attr(p, a[p]);
                          h &&
                            !i &&
                            e(
                              '<a class="' +
                                s.btn +
                                " " +
                                s.next +
                                '" href="#" />'
                            )
                              .appendTo(f)
                              .on(o.click + "-searchfield", function (e) {
                                e.preventDefault(), f.submit();
                              });
                        }
                        t.hasClass(s.search)
                          ? t.replaceWith(f)
                          : t.prepend(f).addClass(s.hassearch);
                      }
                      if (d.noResults) {
                        var v = t.closest("." + s.panel).length;
                        if (
                          (v || (t = l.$pnls.children("." + s.panel).first()),
                          !t.children("." + s.noresultsmsg).length)
                        ) {
                          var m = t.children("." + s.listview).first(),
                            b = e(
                              '<div class="' +
                                s.noresultsmsg +
                                " " +
                                s.hidden +
                                '" />'
                            );
                          b.append(e[n].i18n(d.noResults))[
                            m.length ? "insertAfter" : "prependTo"
                          ](m.length ? m : t);
                        }
                      }
                    }
                  }),
                  d.search)
                ) {
                  if (d.resultsPanel.add) {
                    d.showSubPanels = !1;
                    var f = this.$pnls.children("." + s.resultspanel);
                    f.length ||
                      ((f = e(
                        '<div class="' +
                          s.resultspanel +
                          " " +
                          s.noanimation +
                          " " +
                          s.hidden +
                          '" />'
                      )
                        .appendTo(this.$pnls)
                        .append(
                          '<div class="' +
                            s.navbar +
                            " " +
                            s.hidden +
                            '"><a class="' +
                            s.title +
                            '">' +
                            e[n].i18n(d.resultsPanel.title) +
                            "</a></div>"
                        )
                        .append('<ul class="' + s.listview + '" />')
                        .append(
                          this.$pnls
                            .find("." + s.noresultsmsg)
                            .first()
                            .clone()
                        )),
                      this._initPanel(f));
                  }
                  this.$menu.find("." + s.search).each(function () {
                    var n,
                      r,
                      c = e(this),
                      h = c.closest("." + s.panel).length;
                    h
                      ? ((n = c.closest("." + s.panel)), (r = n))
                      : ((n = l.$pnls.find("." + s.panel)), (r = l.$menu)),
                      d.resultsPanel.add && (n = n.not(f));
                    var u = c.children("input"),
                      p = l.__findAddBack(n, "." + s.listview).children("li"),
                      v = p.filter("." + s.divider),
                      m = l.__filterListItems(p),
                      b = "a",
                      g = b + ", span",
                      _ = "",
                      y = function () {
                        var t = u.val().toLowerCase();
                        if (t != _) {
                          if (
                            ((_ = t),
                            d.resultsPanel.add &&
                              f.children("." + s.listview).empty(),
                            n.scrollTop(0),
                            m
                              .add(v)
                              .addClass(s.hidden)
                              .find("." + s.fullsubopensearch)
                              .removeClass(
                                s.fullsubopen + " " + s.fullsubopensearch
                              ),
                            m.each(function () {
                              var t = e(this),
                                n = b;
                              (d.showTextItems ||
                                (d.showSubPanels && t.find("." + s.next))) &&
                                (n = g);
                              var i =
                                t.data(a.searchtext) ||
                                t
                                  .children(n)
                                  .not("." + s.next)
                                  .text();
                              i.toLowerCase().indexOf(_) > -1 &&
                                t
                                  .add(t.prevAll("." + s.divider).first())
                                  .removeClass(s.hidden);
                            }),
                            d.showSubPanels &&
                              n.each(function (t) {
                                var n = e(this);
                                l.__filterListItems(
                                  n.find("." + s.listview).children()
                                ).each(function () {
                                  var t = e(this),
                                    n = t.data(a.child);
                                  t.removeClass(s.nosubresults),
                                    n &&
                                      n
                                        .find("." + s.listview)
                                        .children()
                                        .removeClass(s.hidden);
                                });
                              }),
                            d.resultsPanel.add)
                          )
                            if ("" === _)
                              this.closeAllPanels(
                                this.$pnls.children("." + s.subopened).last()
                              );
                            else {
                              var i = e();
                              n.each(function () {
                                var t = l
                                  .__filterListItems(
                                    e(this)
                                      .find("." + s.listview)
                                      .children()
                                  )
                                  .not("." + s.hidden)
                                  .clone(!0);
                                t.length &&
                                  (d.resultsPanel.dividers &&
                                    (i = i.add(
                                      '<li class="' +
                                        s.divider +
                                        '">' +
                                        e(this)
                                          .children("." + s.navbar)
                                          .children("." + s.title)
                                          .text() +
                                        "</li>"
                                    )),
                                  t
                                    .children(
                                      "." +
                                        s.mm("toggle") +
                                        ", ." +
                                        s.mm("check")
                                    )
                                    .remove(),
                                  (i = i.add(t)));
                              }),
                                i.find("." + s.next).remove(),
                                f.children("." + s.listview).append(i),
                                this.openPanel(f);
                            }
                          else
                            e(n.get().reverse()).each(function (t) {
                              var n = e(this),
                                i = n.data(a.parent);
                              i &&
                                (l.__filterListItems(
                                  n.find("." + s.listview).children()
                                ).length
                                  ? (i.hasClass(s.hidden) &&
                                      i
                                        .children("." + s.next)
                                        .not("." + s.fullsubopen)
                                        .addClass(s.fullsubopen)
                                        .addClass(s.fullsubopensearch),
                                    i
                                      .removeClass(s.hidden)
                                      .removeClass(s.nosubresults)
                                      .prevAll("." + s.divider)
                                      .first()
                                      .removeClass(s.hidden))
                                  : h ||
                                    ((n.hasClass(s.opened) ||
                                      n.hasClass(s.subopened)) &&
                                      setTimeout(function () {
                                        l.openPanel(i.closest("." + s.panel));
                                      }, (t + 1) *
                                        (1.5 * l.conf.openingInterval)),
                                    i.addClass(s.nosubresults)));
                            });
                          r
                            .find("." + s.noresultsmsg)
                            [
                              m.not("." + s.hidden).length
                                ? "addClass"
                                : "removeClass"
                            ](s.hidden),
                            this.trigger("updateListview");
                        }
                      };
                    u.off(o.keyup + "-" + i + " " + o.change + "-" + i)
                      .on(o.keyup + "-" + i, function (e) {
                        t(e.keyCode) || y.call(l);
                      })
                      .on(o.change + "-" + i, function (e) {
                        y.call(l);
                      });
                    var C = c.children("." + s.btn);
                    C.length &&
                      u.on(o.keyup + "-" + i, function (e) {
                        C[u.val().length ? "removeClass" : "addClass"](
                          s.hidden
                        );
                      }),
                      u.trigger(o.keyup + "-" + i);
                  });
                }
              }
            });
        },
        add: function () {
          (s = e[n]._c),
            (a = e[n]._d),
            (o = e[n]._e),
            s.add(
              "clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"
            ),
            a.add("searchtext"),
            o.add("change keyup");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[n].defaults[i] = {
          add: !1,
          addTo: "panels",
          placeholder: "Search",
          noResults: "No results found.",
          resultsPanel: { add: !1, dividers: !0, title: "Search results" },
          search: !0,
          showTextItems: !1,
          showSubPanels: !0,
        }),
        (e[n].configuration[i] = {
          clear: !1,
          form: !1,
          input: !1,
          submit: !1,
        });
      var s, a, o, r;
    })(jQuery)
    /*
     * jQuery mmenu sectionIndexer add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "sectionIndexer";
      (e[t].addons[n] = {
        setup: function () {
          var s = this,
            r = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initPanels:after", function (t) {
              if (r.add) {
                var o;
                switch (r.addTo) {
                  case "panels":
                    o = t;
                    break;
                  default:
                    o = e(r.addTo, this.$menu).filter("." + i.panel);
                }
                o
                  .find("." + i.divider)
                  .closest("." + i.panel)
                  .addClass(i.hasindexer),
                  this.$indexer ||
                    ((this.$indexer = e('<div class="' + i.indexer + '" />')
                      .prependTo(this.$pnls)
                      .append(
                        '<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'
                      )),
                    this.$indexer
                      .children()
                      .on(
                        a.mouseover + "-" + n + " " + a.touchstart + "-" + n,
                        function (t) {
                          var n = e(this).attr("href").slice(1),
                            a = s.$pnls.children("." + i.opened),
                            o = a.find("." + i.listview),
                            r = -1,
                            l = a.scrollTop();
                          a.scrollTop(0),
                            o
                              .children("." + i.divider)
                              .not("." + i.hidden)
                              .each(function () {
                                r < 0 &&
                                  n ==
                                    e(this).text().slice(0, 1).toLowerCase() &&
                                  (r = e(this).position().top);
                              }),
                            a.scrollTop(r > -1 ? r : l);
                        }
                      ));
                var l = function (e) {
                  (e = e || this.$pnls.children("." + i.opened)),
                    this.$menu[
                      (e.hasClass(i.hasindexer) ? "add" : "remove") + "Class"
                    ](i.hasindexer);
                };
                this.bind("openPanel:start", l),
                  this.bind("initPanels:after", l);
              }
            });
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("indexer hasindexer"),
            a.add("mouseover");
        },
        clickAnchor: function (e, t) {
          if (e.parent().is("." + i.indexer)) return !0;
        },
      }),
        (e[t].defaults[n] = { add: !1, addTo: "panels" });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu setSelected add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "setSelected";
      (e[t].addons[n] = {
        setup: function () {
          var a = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { hover: r, parent: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            "detect" == r.current)
          ) {
            var l = function (e) {
              e = e.split("?")[0].split("#")[0];
              var t = a.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
              t.length
                ? a.setSelected(t.parent(), !0)
                : ((e = e.split("/").slice(0, -1)), e.length && l(e.join("/")));
            };
            this.bind("initMenu:after", function () {
              l(window.location.href);
            });
          } else
            r.current ||
              this.bind("initListview:after", function (e) {
                this.$pnls
                  .find("." + i.listview)
                  .children("." + i.selected)
                  .removeClass(i.selected);
              });
          r.hover &&
            this.bind("initMenu:after", function () {
              this.$menu.addClass(i.hoverselected);
            }),
            r.parent &&
              (this.bind("openPanel:finish", function (e) {
                this.$pnls
                  .find("." + i.listview)
                  .find("." + i.next)
                  .removeClass(i.selected);
                for (var t = e.data(s.parent); t; )
                  t
                    .not("." + i.vertical)
                    .children("." + i.next)
                    .addClass(i.selected),
                    (t = t.closest("." + i.panel).data(s.parent));
              }),
              this.bind("initMenu:after", function () {
                this.$menu.addClass(i.parentselected);
              }));
        },
        add: function () {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("hoverselected parentselected");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].defaults[n] = { current: !0, hover: !1, parent: !1 });
      var i, s, a, o;
    })(jQuery)
    /*
     * jQuery mmenu toggles add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */,
    (function (e) {
      var t = "mmenu",
        n = "toggles";
      (e[t].addons[n] = {
        setup: function () {
          var s = this;
          this.opts[n], this.conf[n];
          (o = e[t].glbl),
            this.bind("initListview:after", function (t) {
              this.__refactorClass(
                t.find("input"),
                this.conf.classNames[n].toggle,
                "toggle"
              ),
                this.__refactorClass(
                  t.find("input"),
                  this.conf.classNames[n].check,
                  "check"
                ),
                t
                  .find("input." + i.toggle + ", input." + i.check)
                  .each(function () {
                    var t = e(this),
                      n = t.closest("li"),
                      a = t.hasClass(i.toggle) ? "toggle" : "check",
                      o = t.attr("id") || s.__getUniqueId();
                    n.children('label[for="' + o + '"]').length ||
                      (t.attr("id", o),
                      n.prepend(t),
                      e(
                        '<label for="' + o + '" class="' + i[a] + '"></label>'
                      ).insertBefore(n.children("a, span").last()));
                  });
            });
        },
        add: function () {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("toggle check");
        },
        clickAnchor: function (e, t) {},
      }),
        (e[t].configuration.classNames[n] = {
          toggle: "Toggle",
          check: "Check",
        });
      var i, s, a, o;
    })(jQuery);
  return true;
});
