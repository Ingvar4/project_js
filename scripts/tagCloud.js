(function (f, c) {
  typeof exports == "object" && typeof module < "u"
    ? (module.exports = c())
    : typeof define == "function" && define.amd
    ? define(c)
    : ((f = typeof globalThis < "u" ? globalThis : f || self),
      (f.SVG3DTagCloud = c()));
})(this, function () {
  "use strict";
  var C = Object.defineProperty;
  var w = (f, c, g) =>
    c in f
      ? C(f, c, { enumerable: !0, configurable: !0, writable: !0, value: g })
      : (f[c] = g);
  var n = (f, c, g) => w(f, typeof c != "symbol" ? c + "" : c, g);
  const f = [
      "#23bcfe",
      "#ff6f61",
      "#6a5acd",
      "#3cb371",
      "#ffcc00",
      "#ff1493",
      "#20b2aa",
      "#ff4500",
      "#9370db",
      "#f08080",
    ],
    c = {
      children: [],
      width: 480,
      height: 480,
      radius: "70%",
      radiusMin: 75,
      isDrawSvgBg: !0,
      svgBgColor: "#000",
      opacityOver: 1,
      opacityOut: 0.05,
      opacitySpeed: 6,
      fov: 800,
      speed: 0.5,
      fontFamily: "Arial, sans-serif",
      fontSize: "12",
      fontColor: "#fff",
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      fontToUpperCase: !1,
      tooltipFontFamily: "Arial, sans-serif",
      tooltipFontSize: "15",
      tooltipFontColor: "#fff",
      tooltipFontWeight: "normal",
      tooltipFontStyle: "normal",
      tooltipFontStretch: "normal",
      tooltipFontToUpperCase: !1,
      tooltipTextAnchor: "left",
      tooltipDiffX: 0,
      tooltipDiffY: 10,
      animatingSpeed: 0.1,
      animatingRadiusLimit: 1.3,
    };
  class g {
    constructor(t, i) {
      n(this, "containerEl");
      n(this, "settings");
      n(this, "childHolder", []);
      n(this, "tooltipEl", null);
      n(this, "radius", 0);
      n(this, "diameter", 0);
      n(this, "mouseReact", !0);
      n(this, "mousePos", { x: 0, y: 0 });
      n(this, "center2D", { x: 0, y: 0 });
      n(this, "center3D", { x: 0, y: 0, z: 0 });
      n(this, "speed", { x: 0, y: 0 });
      n(this, "position", { sx: 0, cx: 0, sy: 0, cy: 0 });
      n(this, "MATHPI180", Math.PI / 180);
      n(this, "svgEl", null);
      n(this, "svgNS", "http://www.w3.org/2000/svg");
      n(this, "svgBg", null);
      n(this, "animFrameId", null);
      n(this, "radius_factor", 1);
      n(this, "animOut_cb", null);
      n(this, "animIn_cb", null);
      n(this, "animating", !1);
      n(this, "onScreenResizeHandler", () => {
        this.setParams();
      });
      n(this, "onMouseMoveHandler", (t) => {
        this.mousePos = this.getMousePos(this.svgEl, t);
      });
      n(this, "mouseOverHandler", (t) => {
        this.mouseReact = !1;
        const i = t.target,
          o = this.getChildByElement(i);
        o && (this.highlightChild(o), this.showTooltip(o));
      });
      n(this, "mouseOutHandler", (t) => {
        this.mouseReact = !0;
        const i = t.target;
        this.getChildByElement(i) && this.hideTooltip();
      });
      n(this, "build", () => {
        this.settings.children.length &&
          (this.setSvgElAndSvgBgEl(),
          this.addChildren(),
          this.setParams(),
          this.animationLoopStart(),
          window.addEventListener("resize", this.onScreenResizeHandler));
      });
      (this.containerEl = t),
        (this.settings = { ...c, ...i }),
        this.bindMethods();
    }
    bindMethods() {
      (this.animationLoopStart = this.animationLoopStart.bind(this)),
        (this._animIn = this._animIn.bind(this)),
        (this._animOut = this._animOut.bind(this));
    }
    setAttributes(t, i) {
      for (const [o, a] of Object.entries(i)) t.setAttribute(o, a);
    }
    getFontColor(t = 0, i = [], o = "#fff") {
      const a = i.length;
      return a > 0 ? i[t % a] : o;
    }
    getMousePos(t, i) {
      if (!t) return { x: 0, y: 0 };
      const o = t.getBoundingClientRect();
      return { x: i.clientX - o.left, y: i.clientY - o.top };
    }
    setChildPosition(t, i) {
      if (!t.vectorPosition) return;
      const { x: o, y: a, z: h } = t.vectorPosition,
        r = o - this.center3D.x,
        l = a - this.center3D.y,
        d = h - this.center3D.z,
        s = Math.sqrt(r * r + l * l + d * d);
      Object.assign(t.vectorPosition, {
        x: (o / s) * i,
        y: (a / s) * i,
        z: (h / s) * i,
      });
    }
    setChildPositions(t) {
      this.childHolder.forEach((i) => this.setChildPosition(i, t));
    }
    setParams() {
      var u, v;
      const { innerWidth: t, innerHeight: i } = window,
        { documentElement: o, body: a } = document,
        {
          width: h,
          height: r,
          radius: l = "65%",
          speed: d = 0,
          radiusMin: s = 1,
          isDrawSvgBg: p,
        } = this.settings;
      let e = t || o.clientWidth || a.clientWidth,
        m = i || o.clientHeight || a.clientHeight;
      typeof h == "string" && h.includes("%")
        ? ((e = Math.round((this.containerEl.offsetWidth / 100) * parseInt(h))),
          (m = Math.round((e / 100) * parseInt(r))))
        : ((e = h), (m = r)),
        (e = Math.min(e, t || 0)),
        (m = Math.min(m, i || 0)),
        (this.center2D = { x: e / 2, y: m / 2 }),
        (this.speed = { x: d / this.center2D.x, y: d / this.center2D.y }),
        (this.diameter = Math.min(m, e) * (parseInt(`${l}`) / 100)),
        (this.diameter = Math.max(this.diameter, 1)),
        (this.radius = Math.max(this.diameter / 2, s)),
        (this.diameter = this.radius * 2),
        (u = this.svgEl) == null || u.setAttribute("width", `${e}`),
        (v = this.svgEl) == null || v.setAttribute("height", `${m}`),
        p &&
          this.svgBg &&
          (this.svgBg.setAttribute("width", `${e}`),
          this.svgBg.setAttribute("height", `${m}`)),
        this.setChildPositions(this.radius * this.radius_factor);
    }
    addChild(t, i, o, a, h) {
      var p;
      const { settings: r, svgNS: l } = this,
        d = this.getFontColor(t, f, r.fontColor),
        s = {
          index: t,
          mouseOver: !1,
          fontColor: d,
          vectorPosition: { x: o, y: a, z: h },
          vector2D: { x: 0, y: 0 },
          ...i,
        };
      if (i.label) {
        const e = {
          x: "0",
          y: "0",
          fill: s.fontColor,
          "font-family": s.fontFamily || r.fontFamily,
          "font-size": `${i.fontSize || r.fontSize}`,
          "font-weight": s.fontWeight || r.fontWeight,
          "font-style": s.fontStyle || r.fontStyle,
          "font-stretch": s.fontStretch || r.fontStretch,
          "text-anchor": "middle",
        };
        (s.element = document.createElementNS(l, "text")),
          this.setAttributes(s.element, e),
          (s.element.textContent = r.fontToUpperCase
            ? i.label.toUpperCase()
            : i.label);
      } else if (i.image)
        (s.element = document.createElementNS(l, "image")),
          s.element.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "href",
            i.image
          ),
          this.setAttributes(s.element, {
            x: "0",
            y: "0",
            width: `${i.width || "0"}`,
            height: `${i.height || "0"}`,
          }),
          (s.diffX = i.width / 2),
          (s.diffY = i.height / 2);
      else return;
      (s.link = document.createElementNS(l, "a")),
        this.setAttributes(s.link, {
          href: i.url || "",
          target: i.target || "",
        }),
        s.link.appendChild(s.element),
        s.link.addEventListener("mouseover", this.mouseOverHandler, !0),
        s.link.addEventListener("mouseout", this.mouseOutHandler, !0),
        i.tooltip
          ? ((s.tooltipLabel = r.tooltipFontToUpperCase
              ? i.tooltip.toUpperCase()
              : i.tooltip),
            (s.tooltip = s.tooltipLabel))
          : (s.tooltip = ""),
        (p = this.svgEl) == null || p.appendChild(s.link),
        this.childHolder.push(s);
    }
    addTooltip() {
      var d;
      const {
        tooltipFontColor: t,
        tooltipFontFamily: i,
        tooltipFontSize: o,
        tooltipFontWeight: a,
        tooltipFontStyle: h,
        tooltipFontStretch: r,
        tooltipTextAnchor: l,
      } = this.settings;
      (this.tooltipEl = document.createElementNS(this.svgNS, "text")),
        this.setAttributes(this.tooltipEl, {
          x: "0",
          y: "0",
          fill: `${t}`,
          "font-family": `${i}`,
          "font-size": `${o}`,
          "font-weight": `${a}`,
          "font-style": `${h}`,
          "font-stretch": `${r}`,
          "text-anchor": `${l}`,
        }),
        (d = this.svgEl) == null || d.appendChild(this.tooltipEl);
    }
    showTooltip(t) {
      if (t.tooltip && this.tooltipEl && t.vector2D) {
        const {
          tooltipDiffX: i,
          tooltipDiffY: o,
          tooltipFontToUpperCase: a,
        } = this.settings;
        this.setAttributes(this.tooltipEl, {
          x: `${t.vector2D.x - (i || 0)}`,
          y: `${t.vector2D.y - (o || 0)}`,
          opacity: "1.0",
        }),
          (this.tooltipEl.textContent = a
            ? (t.tooltipLabel || "").toUpperCase()
            : t.tooltipLabel || "");
      }
    }
    hideTooltip() {
      var t;
      (t = this.tooltipEl) == null || t.setAttribute("opacity", "0.0");
    }
    addChildren() {
      let t = !1;
      this.settings.children.forEach((i, o) => {
        const a = this.settings.children.length + 1,
          h = Math.acos(-1 + (2 * (o + 1)) / a),
          r = Math.sqrt(a * Math.PI) * h,
          l = Math.cos(r) * Math.sin(h),
          d = Math.sin(r) * Math.sin(h),
          s = Math.cos(h);
        this.addChild(o, i, l, d, s), i.tooltip && (t = !0);
      }),
        t && this.addTooltip();
    }
    highlightChild(t) {
      this.childHolder.forEach((i) => (i.mouseOver = i.index === t.index));
    }
    getChildByElement(t) {
      return this.childHolder.find((i) => {
        var o;
        return (o = i.element) == null ? void 0 : o.isEqualNode(t);
      });
    }
    render() {
      const {
          speed: t = 0,
          opacityOut: i = 0.1,
          opacityOver: o = 1,
          opacitySpeed: a = 5,
          fov: h = 0,
          animatingRadiusLimit: r = 1.3,
        } = this.settings,
        l = this.speed.x * this.mousePos.x - t,
        d = t - this.speed.y * this.mousePos.y,
        s = l * this.MATHPI180,
        p = d * this.MATHPI180;
      (this.position = {
        sx: Math.sin(s),
        cx: Math.cos(s),
        sy: Math.sin(p),
        cy: Math.cos(p),
      }),
        this.childHolder.forEach((e) => {
          if (!e.element || !e.vectorPosition || !e.vector2D) return;
          if (this.mouseReact) {
            const { x: y, y: x, z: S } = e.vectorPosition,
              E = x * this.position.sy + S * this.position.cy;
            (e.vectorPosition.x = y * this.position.cx + E * this.position.sx),
              (e.vectorPosition.y =
                x * this.position.cy + S * -this.position.sy),
              (e.vectorPosition.z =
                y * -this.position.sx + E * this.position.cx);
          }
          const m = h / (h + e.vectorPosition.z);
          (e.vector2D.x = e.vectorPosition.x * m + this.center2D.x),
            (e.vector2D.y = e.vectorPosition.y * m + this.center2D.y),
            e.diffX &&
              e.diffY &&
              ((e.vector2D.x -= e.diffX), (e.vector2D.y -= e.diffY)),
            e.element.setAttribute("x", `${e.vector2D.x}`),
            e.element.setAttribute("y", `${e.vector2D.y}`);
          let u = this.mouseReact
            ? (this.radius - e.vectorPosition.z) / this.diameter
            : parseFloat(e.element.getAttribute("opacity") || "1");
          u = this.mouseReact
            ? Math.max(u, i)
            : e.mouseOver
            ? u + (o - u) / a
            : u + (i - u) / a;
          const v = 1 - (this.radius_factor - 1) / (r - 1);
          e.element.setAttribute("opacity", `${u * v}`);
        }),
        this.childHolder.sort(
          (e, m) => m.vectorPosition.z - e.vectorPosition.z
        );
    }
    animationLoopStart() {
      this.animFrameId = window.requestAnimationFrame(() => {
        this.render(), this.animationLoopStart();
      });
    }
    _animIn() {
      (this.animating = this.radius_factor > 1)
        ? (this.setRadiusFactor(
            this.radius_factor - (this.settings.animatingSpeed || 0.1)
          ),
          window.requestAnimationFrame(this._animIn))
        : this.animIn_cb && (this.animIn_cb(), (this.animIn_cb = null));
    }
    _animOut() {
      (this.animating =
        this.radius_factor < (this.settings.animatingRadiusLimit || 1.3))
        ? (this.setRadiusFactor(
            this.radius_factor + (this.settings.animatingSpeed || 0.1)
          ),
          window.requestAnimationFrame(this._animOut))
        : this.animOut_cb && (this.animOut_cb(), (this.animOut_cb = null));
    }
    setRadiusFactor(t) {
      (this.radius_factor = Math.min(
        Math.max(t, 1),
        this.settings.animatingRadiusLimit || 1.3
      )),
        this.setParams();
    }
    resetRadiusFactor() {
      this.setRadiusFactor(1);
    }
    animOut(t) {
      this.animating ||
        ((this.radius_factor = 1), (this.animOut_cb = t), this._animOut());
    }
    animIn(t) {
      this.animating ||
        ((this.radius_factor = this.settings.animatingRadiusLimit || 1.3),
        (this.animIn_cb = t),
        this._animIn());
    }
    setChildren(t) {
      this.destroy(), (this.settings.children = t), this.build();
    }
    setSvgElAndSvgBgEl() {
      (this.svgEl = document.createElementNS(this.svgNS, "svg")),
        this.svgEl.addEventListener("mousemove", this.onMouseMoveHandler),
        this.containerEl.appendChild(this.svgEl),
        this.settings.isDrawSvgBg &&
          ((this.svgBg = document.createElementNS(this.svgNS, "rect")),
          this.setAttributes(this.svgBg, {
            x: "0",
            y: "0",
            fill: `${this.settings.svgBgColor}`,
          }),
          this.svgEl.appendChild(this.svgBg));
    }
    destroy() {
      var t;
      this.animFrameId && window.cancelAnimationFrame(this.animFrameId),
        window.removeEventListener("resize", this.onScreenResizeHandler),
        this.svgBg && ((t = this.svgEl) == null || t.removeChild(this.svgBg)),
        this.svgEl &&
          (this.containerEl.removeChild(this.svgEl),
          this.svgEl.removeEventListener("mousemove", this.onMouseMoveHandler),
          (this.svgEl = null));
    }
    static __VERSION() {
      console.log(
        "%c [ __VERSION ]-573",
        "font-size:13px; background:pink; color:#bf2c9f;",
        "v0.0.19_Bt: 10/16/2024, 9:49:51 AM"
      );
    }
  }
  return (
    window &&
      ((window.SVG3DTagCloud = g),
      (window.SVG3dTagCloud = g),
      (window.Svg3dTagCloud = g)),
    g
  );
});
