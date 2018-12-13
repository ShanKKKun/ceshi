/**
 * Minified by jsDelivr using UglifyJS v3.1.10.
 * Original file: /npm/tween.js@16.3.4/src/Tween.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function () { if ('performance' in window == !1 && (window.performance = {}), Date.now = Date.now || function () { return (new Date()).getTime(); }, 'now' in window.performance == !1) { const n = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now(); window.performance.now = function () { return Date.now() - n; }; } }()); var TWEEN = TWEEN || (function () {
  let n = []; return {
    getAll() { return n; }, removeAll() { n = []; }, add(t) { n.push(t); }, remove(t) { const r = n.indexOf(t); r !== -1 && n.splice(r, 1); }, update(t) { if (n.length === 0) return !1; let r = 0; for (t = void 0 !== t ? t : window.performance.now(); r < n.length;)n[r].update(t) ? r++ : n.splice(r, 1); return !0; },
  };
}()); TWEEN.Tween = function (n) {
  let t = n,
    r = {},
    i = {},
    o = {},
    u = 1e3,
    e = 0,
    a = !1,
    f = !1,
    c = !1,
    s = 0,
    h = null,
    l = TWEEN.Easing.Linear.None,
    p = TWEEN.Interpolation.Linear,
    E = [],
    w = null,
    v = !1,
    d = null,
    I = null,
    M = null; for (const m in n)r[m] = parseFloat(n[m], 10); this.to = function (n, t) { return void 0 !== t && (u = t), i = n, this; }, this.start = function (n) { TWEEN.add(this), f = !0, v = !1, h = void 0 !== n ? n : window.performance.now(), h += s; for (const u in i) { if (i[u] instanceof Array) { if (i[u].length === 0) continue; i[u] = [t[u]].concat(i[u]); } void 0 !== r[u] && (r[u] = t[u], r[u] instanceof Array == !1 && (r[u] *= 1), o[u] = r[u] || 0); } return this; }, this.stop = function () { return f ? (TWEEN.remove(this), f = !1, M !== null && M.call(t), this.stopChainedTweens(), this) : this; }, this.stopChainedTweens = function () { for (let n = 0, t = E.length; n < t; n++)E[n].stop(); }, this.delay = function (n) { return s = n, this; }, this.repeat = function (n) { return e = n, this; }, this.yoyo = function (n) { return a = n, this; }, this.easing = function (n) { return l = n, this; }, this.interpolation = function (n) { return p = n, this; }, this.chain = function () { return E = arguments, this; }, this.onStart = function (n) { return w = n, this; }, this.onUpdate = function (n) { return d = n, this; }, this.onComplete = function (n) { return I = n, this; }, this.onStop = function (n) { return M = n, this; }, this.update = function (n) {
    let f,
      M,
      m; if (n < h) return !0; !1 === v && (w !== null && w.call(t), v = !0), m = l(M = (M = (n - h) / u) > 1 ? 1 : M); for (f in i) {
      if (void 0 !== r[f]) {
        let T = r[f] || 0,
          g = i[f]; g instanceof Array ? t[f] = p(g, m) : (typeof g === 'string' && (g = g.startsWith('+') || g.startsWith('-') ? T + parseFloat(g, 10) : parseFloat(g, 10)), typeof g === 'number' && (t[f] = T + (g - T) * m));
      }
    } if (d !== null && d.call(t, m), M === 1) { if (e > 0) { isFinite(e) && e--; for (f in o) { if (typeof i[f] === 'string' && (o[f] = o[f] + parseFloat(i[f], 10)), a) { const O = o[f]; o[f] = i[f], i[f] = O; }r[f] = o[f]; } return a && (c = !c), h = n + s, !0; }I !== null && I.call(t); for (let N = 0, W = E.length; N < W; N++)E[N].start(h + u); return !1; } return !0;
  };
}, TWEEN.Easing = {
  Linear: { None(n) { return n; } },
  Quadratic: { In(n) { return n * n; }, Out(n) { return n * (2 - n); }, InOut(n) { return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1); } },
  Cubic: { In(n) { return n * n * n; }, Out(n) { return --n * n * n + 1; }, InOut(n) { return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2); } },
  Quartic: { In(n) { return n * n * n * n; }, Out(n) { return 1 - --n * n * n * n; }, InOut(n) { return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2); } },
  Quintic: { In(n) { return n * n * n * n * n; }, Out(n) { return --n * n * n * n * n + 1; }, InOut(n) { return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2); } },
  Sinusoidal: { In(n) { return 1 - Math.cos(n * Math.PI / 2); }, Out(n) { return Math.sin(n * Math.PI / 2); }, InOut(n) { return 0.5 * (1 - Math.cos(Math.PI * n)); } },
  Exponential: { In(n) { return n === 0 ? 0 : Math.pow(1024, n - 1); }, Out(n) { return n === 1 ? 1 : 1 - Math.pow(2, -10 * n); }, InOut(n) { return n === 0 ? 0 : n === 1 ? 1 : (n *= 2) < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))); } },
  Circular: { In(n) { return 1 - Math.sqrt(1 - n * n); }, Out(n) { return Math.sqrt(1 - --n * n); }, InOut(n) { return (n *= 2) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1); } },
  Elastic: {
    In(n) {
      let t,
        r = 0.1; return n === 0 ? 0 : n === 1 ? 1 : (!r || r < 1 ? (r = 1, t = 0.1) : t = 0.4 * Math.asin(1 / r) / (2 * Math.PI), -r * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / 0.4));
    },
    Out(n) {
      let t,
        r = 0.1; return n === 0 ? 0 : n === 1 ? 1 : (!r || r < 1 ? (r = 1, t = 0.1) : t = 0.4 * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * n) * Math.sin((n - t) * (2 * Math.PI) / 0.4) + 1);
    },
    InOut(n) {
      let t,
        r = 0.1; return n === 0 ? 0 : n === 1 ? 1 : (!r || r < 1 ? (r = 1, t = 0.1) : t = 0.4 * Math.asin(1 / r) / (2 * Math.PI), (n *= 2) < 1 ? r * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / 0.4) * -0.5 : r * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / 0.4) * 0.5 + 1);
    },
  },
  Back: { In(n) { const t = 1.70158; return n * n * ((t + 1) * n - t); }, Out(n) { const t = 1.70158; return --n * n * ((t + 1) * n + t) + 1; }, InOut(n) { const t = 2.5949095; return (n *= 2) < 1 ? n * n * ((t + 1) * n - t) * 0.5 : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2); } },
  Bounce: { In(n) { return 1 - TWEEN.Easing.Bounce.Out(1 - n); }, Out(n) { return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375; }, InOut(n) { return n < 0.5 ? 0.5 * TWEEN.Easing.Bounce.In(2 * n) : 0.5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + 0.5; } },
}, TWEEN.Interpolation = {
  Linear(n, t) {
    let r = n.length - 1,
      i = r * t,
      o = Math.floor(i),
      u = TWEEN.Interpolation.Utils.Linear; return t < 0 ? u(n[0], n[1], i) : t > 1 ? u(n[r], n[r - 1], r - i) : u(n[o], n[o + 1 > r ? r : o + 1], i - o);
  },
  Bezier(n, t) { for (var r = 0, i = n.length - 1, o = Math.pow, u = TWEEN.Interpolation.Utils.Bernstein, e = 0; e <= i; e++)r += o(1 - t, i - e) * o(t, e) * n[e] * u(i, e); return r; },
  CatmullRom(n, t) {
    let r = n.length - 1,
      i = r * t,
      o = Math.floor(i),
      u = TWEEN.Interpolation.Utils.CatmullRom; return n[0] === n[r] ? (t < 0 && (o = Math.floor(i = r * (1 + t))), u(n[(o - 1 + r) % r], n[o], n[(o + 1) % r], n[(o + 2) % r], i - o)) : t < 0 ? n[0] - (u(n[0], n[0], n[1], n[1], -i) - n[0]) : t > 1 ? n[r] - (u(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r]) : u(n[o ? o - 1 : 0], n[o], n[r < o + 1 ? r : o + 1], n[r < o + 2 ? r : o + 2], i - o);
  },
  Utils: {
    Linear(n, t, r) { return (t - n) * r + n; },
    Bernstein(n, t) { const r = TWEEN.Interpolation.Utils.Factorial; return r(n) / r(t) / r(n - t); },
    Factorial: (function () { const n = [1]; return function (t) { let r = 1; if (n[t]) return n[t]; for (let i = t; i > 1; i--)r *= i; return n[t] = r, r; }; }()),
    CatmullRom(n, t, r, i, o) {
      let u = 0.5 * (r - n),
        e = 0.5 * (i - t),
        a = o * o; return (2 * t - 2 * r + u + e) * (o * a) + (-3 * t + 3 * r - 2 * u - e) * a + u * o + t;
    },
  },
}, (function (n) { typeof define === 'function' && define.amd ? define([], () => TWEEN) : typeof module !== 'undefined' && typeof exports === 'object' ? module.exports = TWEEN : void 0 !== n && (n.TWEEN = TWEEN); }(this));
// # sourceMappingURL=/sm/ea47e87bea877dcb22432f4faa06bb23183a1cefe5b1ece3ebcf347e48058abd.map
