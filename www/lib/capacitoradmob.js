var ye = Object.defineProperty;
var ie = (t, e) => () => (t && (e = t(t = 0)), e);
var Le = (t, e) => {
  for (var r in e) ye(t, r, { get: e[r], enumerable: !0 });
};
var je,
  _e,
  fe,
  Xe,
  Ye,
  R,
  D,
  Se,
  Me,
  Ie,
  W,
  F,
  Ze,
  U,
  de,
  ue,
  re,
  et,
  De,
  Be,
  We,
  Fe,
  oe,
  tt,
  ne = ie(() => {
    je = t => {
      let e = new Map();
      e.set("web", { name: "web" });
      let r = t.CapacitorPlatforms
          || { currentPlatform: { name: "web" }, platforms: e },
        i = (n, a) => {
          r.platforms.set(n, a);
        },
        o = n => {
          r.platforms.has(n) && (r.currentPlatform = r.platforms.get(n));
        };
      return r.addPlatform = i, r.setPlatform = o, r;
    },
      _e = t => t.CapacitorPlatforms = je(t),
      fe = _e(
        typeof globalThis < "u"
          ? globalThis
          : typeof self < "u"
          ? self
          : typeof window < "u"
          ? window
          : typeof global < "u"
          ? global
          : {},
      ),
      Xe = fe.addPlatform,
      Ye = fe.setPlatform;
    (function(t) {
      t.Unimplemented = "UNIMPLEMENTED", t.Unavailable = "UNAVAILABLE";
    })(R || (R = {}));
    D = class extends Error {
      constructor(e, r, i) {
        super(e), this.message = e, this.code = r, this.data = i;
      }
    },
      Se = t => {
        var e, r;
        return t?.androidBridge
          ? "android"
          : !((r = (e = t?.webkit) === null || e === void 0
                  ? void 0
                  : e.messageHandlers) === null || r === void 0) && r.bridge
          ? "ios"
          : "web";
      },
      Me = t => {
        var e, r, i, o, n;
        let a = t.CapacitorCustomPlatform || null,
          s = t.Capacitor || {},
          f = s.Plugins = s.Plugins || {},
          l = t.CapacitorPlatforms,
          C = () => a !== null ? a.name : Se(t),
          P = ((e = l?.currentPlatform) === null || e === void 0
            ? void 0
            : e.getPlatform) || C,
          A = () => P() !== "web",
          H = ((r = l?.currentPlatform) === null || r === void 0
            ? void 0
            : r.isNativePlatform) || A,
          G = c => {
            let d = O.get(c);
            return !!(d?.platforms.has(P()) || j(c));
          },
          N =
            ((i = l?.currentPlatform) === null || i === void 0
              ? void 0
              : i.isPluginAvailable) || G,
          V = c => {
            var d;
            return (d = s.PluginHeaders) === null || d === void 0 ? void 0
            : d.find(y => y.name === c);
          },
          j =
            ((o = l?.currentPlatform) === null || o === void 0
              ? void 0
              : o.getPluginHeader) || V,
          q = c => t.console.error(c),
          K = (c, d, y) =>
            Promise.reject(`${y} does not have an implementation of "${d}".`),
          O = new Map(),
          z = (c, d = {}) => {
            let y = O.get(c);
            if (y) {
              return console.warn(
                `Capacitor plugin "${c}" already registered. Cannot register plugins twice.`,
              ),
                y.proxy;
            }
            let v = P(),
              L = j(c),
              h,
              Q = async () => (!h && v in d
                ? h = typeof d[v] == "function" ? h = await d[v]() : h = d[v]
                : a !== null && !h && "web" in d
                  && (h = typeof d.web == "function"
                    ? h = await d.web()
                    : h = d.web),
                h),
              X = (u, m) => {
                var p, w;
                if (L) {
                  let b = L?.methods.find(g => m === g.name);
                  if (b) {
                    return b.rtype === "promise"
                      ? g => s.nativePromise(c, m.toString(), g)
                      : (g, x) => s.nativeCallback(c, m.toString(), g, x);
                  }
                  if (u) {return (p = u[m]) === null || p === void 0 ? void 0
                    : p.bind(u);}
                }
                else {
                  if (u) {
                    return (w = u[m]) === null || w === void 0
                      ? void 0
                      : w.bind(u);
                  }
                  throw new D(
                    `"${c}" plugin is not implemented on ${v}`,
                    R.Unimplemented,
                  );
                }
              },
              k = u => {
                let m,
                  p = (...w) => {
                    let b = Q().then(g => {
                      let x = X(g, u);
                      if (x) {
                        let E = x(...w);
                        return m = E?.remove, E;
                      }
                      else {
                        throw new D(
                          `"${c}.${u}()" is not implemented on ${v}`,
                          R.Unimplemented,
                        );
                      }
                    });
                    return u === "addListener" && (b.remove = async () => m()),
                      b;
                  };
                return p.toString = () =>
                  `${u.toString()}() { [capacitor code] }`,
                  Object.defineProperty(p, "name", {
                    value: u,
                    writable: !1,
                    configurable: !1,
                  }),
                  p;
              },
              _ = k("addListener"),
              S = k("removeListener"),
              Y = (u, m) => {
                let p = _({ eventName: u }, m),
                  w = async () => {
                    let g = await p;
                    S({ eventName: u, callbackId: g }, m);
                  },
                  b = new Promise(g => p.then(() => g({ remove: w })));
                return b.remove = async () => {
                  console.warn(
                    "Using addListener() without 'await' is deprecated.",
                  ), await w();
                },
                  b;
              },
              $ = new Proxy({}, {
                get(u, m) {
                  switch (m) {
                    case "$$typeof":
                      return;
                    case "toJSON":
                      return () => ({});
                    case "addListener":
                      return L ? Y : _;
                    case "removeListener":
                      return S;
                    default:
                      return k(m);
                  }
                },
              });
            return f[c] = $,
              O.set(c, {
                name: c,
                proxy: $,
                platforms: new Set([...Object.keys(d), ...L ? [v] : []]),
              }),
              $;
          },
          J =
            ((n = l?.currentPlatform) === null || n === void 0
              ? void 0
              : n.registerPlugin) || z;
        return s.convertFileSrc || (s.convertFileSrc = c =>
          c),
          s.getPlatform = P,
          s.handleError = q,
          s.isNativePlatform = H,
          s.isPluginAvailable = N,
          s.pluginMethodNoop = K,
          s.registerPlugin = J,
          s.Exception = D,
          s.DEBUG = !!s.DEBUG,
          s.isLoggingEnabled = !!s.isLoggingEnabled,
          s.platform = s.getPlatform(),
          s.isNative = s.isNativePlatform(),
          s;
      },
      Ie = t => t.Capacitor = Me(t),
      W = Ie(
        typeof globalThis < "u"
          ? globalThis
          : typeof self < "u"
          ? self
          : typeof window < "u"
          ? window
          : typeof global < "u"
          ? global
          : {},
      ),
      F = W.registerPlugin,
      Ze = W.Plugins,
      U = class {
        constructor(e) {
          this.listeners = {},
            this.windowListeners = {},
            e
            && (console.warn(
              `Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`,
            ),
              this.config = e);
        }
        addListener(e, r) {
          this.listeners[e] || (this.listeners[e] = []),
            this.listeners[e].push(r);
          let o = this.windowListeners[e];
          o && !o.registered && this.addWindowListener(o);
          let n = async () => this.removeListener(e, r),
            a = Promise.resolve({ remove: n });
          return Object.defineProperty(a, "remove", {
            value: async () => {
              console.warn(
                "Using addListener() without 'await' is deprecated.",
              ), await n();
            },
          }),
            a;
        }
        async removeAllListeners() {
          this.listeners = {};
          for (let e in this.windowListeners) {
            this.removeWindowListener(this.windowListeners[e]);
          }
          this.windowListeners = {};
        }
        notifyListeners(e, r) {
          let i = this.listeners[e];
          i && i.forEach(o => o(r));
        }
        hasListeners(e) {
          return !!this.listeners[e].length;
        }
        registerWindowListener(e, r) {
          this.windowListeners[r] = {
            registered: !1,
            windowEventName: e,
            pluginEventName: r,
            handler: i => {
              this.notifyListeners(r, i);
            },
          };
        }
        unimplemented(e = "not implemented") {
          return new W.Exception(e, R.Unimplemented);
        }
        unavailable(e = "not available") {
          return new W.Exception(e, R.Unavailable);
        }
        async removeListener(e, r) {
          let i = this.listeners[e];
          if (!i) return;
          let o = i.indexOf(r);
          this.listeners[e].splice(o, 1),
            this.listeners[e].length
            || this.removeWindowListener(this.windowListeners[e]);
        }
        addWindowListener(e) {
          window.addEventListener(e.windowEventName, e.handler),
            e.registered = !0;
        }
        removeWindowListener(e) {
          e
            && (window.removeEventListener(e.windowEventName, e.handler),
              e.registered = !1);
        }
      },
      de = t =>
        encodeURIComponent(t).replace(
          /%(2[346B]|5E|60|7C)/g,
          decodeURIComponent,
        ).replace(/[()]/g, escape),
      ue = t => t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent),
      re = class extends U {
        async getCookies() {
          let e = document.cookie, r = {};
          return e.split(";").forEach(i => {
            if (i.length <= 0) return;
            let [o, n] = i.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
            o = ue(o).trim(), n = ue(n).trim(), r[o] = n;
          }),
            r;
        }
        async setCookie(e) {
          try {
            let r = de(e.key),
              i = de(e.value),
              o = `; expires=${(e.expires || "").replace("expires=", "")}`,
              n = (e.path || "/").replace("path=", ""),
              a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
            document.cookie = `${r}=${i || ""}${o}; path=${n}; ${a};`;
          }
          catch (r) {
            return Promise.reject(r);
          }
        }
        async deleteCookie(e) {
          try {
            document.cookie = `${e.key}=; Max-Age=0`;
          }
          catch (r) {
            return Promise.reject(r);
          }
        }
        async clearCookies() {
          try {
            let e = document.cookie.split(";") || [];
            for (let r of e) {
              document.cookie = r.replace(/^ +/, "").replace(
                /=.*/,
                `=;expires=${new Date().toUTCString()};path=/`,
              );
            }
          }
          catch (e) {
            return Promise.reject(e);
          }
        }
        async clearAllCookies() {
          try {
            await this.clearCookies();
          }
          catch (e) {
            return Promise.reject(e);
          }
        }
      },
      et = F("CapacitorCookies", { web: () => new re() }),
      De = async t =>
        new Promise((e, r) => {
          let i = new FileReader();
          i.onload = () => {
            let o = i.result;
            e(o.indexOf(",") >= 0 ? o.split(",")[1] : o);
          },
            i.onerror = o => r(o),
            i.readAsDataURL(t);
        }),
      Be = (t = {}) => {
        let e = Object.keys(t);
        return Object.keys(t).map(o => o.toLocaleLowerCase()).reduce(
          (o, n, a) => (o[n] = t[e[a]], o),
          {},
        );
      },
      We = (t, e = !0) =>
        t
          ? Object.entries(t).reduce((i, o) => {
            let [n, a] = o, s, f;
            return Array.isArray(a)
              ? (f = "",
                a.forEach(l => {
                  s = e ? encodeURIComponent(l) : l, f += `${n}=${s}&`;
                }),
                f.slice(0, -1))
              : (s = e ? encodeURIComponent(a) : a, f = `${n}=${s}`),
              `${i}&${f}`;
          }, "").substr(1)
          : null,
      Fe = (t, e = {}) => {
        let r = Object.assign(
            { method: t.method || "GET", headers: t.headers },
            e,
          ),
          o = Be(t.headers)["content-type"] || "";
        if (typeof t.data == "string") r.body = t.data;
        else if (o.includes("application/x-www-form-urlencoded")) {
          let n = new URLSearchParams();
          for (let [a, s] of Object.entries(t.data || {})) n.set(a, s);
          r.body = n.toString();
        }
        else if (o.includes("multipart/form-data")) {
          let n = new FormData();
          if (t.data instanceof FormData) {
            t.data.forEach((s, f) => {
              n.append(f, s);
            });
          }
          else for (let s of Object.keys(t.data)) n.append(s, t.data[s]);
          r.body = n;
          let a = new Headers(r.headers);
          a.delete("content-type"), r.headers = a;
        }
        else {
          (o.includes("application/json") || typeof t.data == "object")
            && (r.body = JSON.stringify(t.data));
        }
        return r;
      },
      oe = class extends U {
        async request(e) {
          let r = Fe(e, e.webFetchExtra),
            i = We(e.params, e.shouldEncodeUrlParams),
            o = i ? `${e.url}?${i}` : e.url,
            n = await fetch(o, r),
            a = n.headers.get("content-type") || "",
            { responseType: s = "text" } = n.ok ? e : {};
          a.includes("application/json") && (s = "json");
          let f, l;
          switch (s) {
            case "arraybuffer":
            case "blob":
              l = await n.blob(), f = await De(l);
              break;
            case "json":
              f = await n.json();
              break;
            case "document":
            case "text":
            default:
              f = await n.text();
          }
          let C = {};
          return n.headers.forEach((P, A) => {
            C[A] = P;
          }),
            { data: f, headers: C, status: n.status, url: n.url };
        }
        async get(e) {
          return this.request(
            Object.assign(Object.assign({}, e), { method: "GET" }),
          );
        }
        async post(e) {
          return this.request(
            Object.assign(Object.assign({}, e), { method: "POST" }),
          );
        }
        async put(e) {
          return this.request(
            Object.assign(Object.assign({}, e), { method: "PUT" }),
          );
        }
        async patch(e) {
          return this.request(
            Object.assign(Object.assign({}, e), { method: "PATCH" }),
          );
        }
        async delete(e) {
          return this.request(
            Object.assign(Object.assign({}, e), { method: "DELETE" }),
          );
        }
      },
      tt = F("CapacitorHttp", { web: () => new oe() });
  });
var ve = {};
Le(ve, { AdMobWeb: () => se });
var se,
  Pe = ie(() => {
    ne();
    se = class extends U {
      constructor() {
        super({ name: "AdMob", platforms: ["web"] });
      }
      async initialize() {
        console.log("initialize");
      }
      async targetSettings() {
        console.log("targetSettings");
      }
      async trackingAuthorizationStatus() {
        return { status: "authorized" };
      }
      async showBanner(e) {
        console.log("showBanner", e);
      }
      async hideBanner() {
        console.log("hideBanner");
      }
      async resumeBanner() {
        console.log("resumeBanner");
      }
      async removeBanner() {
        console.log("removeBanner");
      }
      async prepareInterstitial(e) {
        return console.log("prepareInterstitial", e), { adUnitId: e.adId };
      }
      async showInterstitial() {
        console.log("showInterstitial");
      }
      async prepareRewardVideoAd(e) {
        return console.log(e), { adUnitId: e.adId };
      }
      async showRewardVideoAd() {
        return { type: "", amount: 0 };
      }
    };
  });
var Ce = t => {
    let e = new Map();
    e.set("web", { name: "web" });
    let r = t.CapacitorPlatforms
        || { currentPlatform: { name: "web" }, platforms: e },
      i = (n, a) => {
        r.platforms.set(n, a);
      },
      o = n => {
        r.platforms.has(n) && (r.currentPlatform = r.platforms.get(n));
      };
    return r.addPlatform = i, r.setPlatform = o, r;
  },
  xe = t => t.CapacitorPlatforms = Ce(t),
  ce = xe(
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {},
  ),
  Ge = ce.addPlatform,
  Ne = ce.setPlatform,
  Ee = (t, e) => {
    var r;
    let i = e.config, o = t.Plugins;
    if (!i || !i.name) {
      throw new Error(
        "Capacitor WebPlugin is using the deprecated \"registerWebPlugin()\" function, but without the config. Please use \"registerPlugin()\" instead to register this web plugin.\"",
      );
    }
    console.warn(
      `Capacitor plugin "${i.name}" is using the deprecated "registerWebPlugin()" function`,
    ),
      (!o[i.name]
        || !((r = i?.platforms) === null || r === void 0)
          && r.includes(t.getPlatform())) && (o[i.name] = e);
  },
  T;
(function(t) {
  t.Unimplemented = "UNIMPLEMENTED", t.Unavailable = "UNAVAILABLE";
})(T || (T = {}));
var M = class extends Error {
    constructor(e, r, i) {
      super(e), this.message = e, this.code = r, this.data = i;
    }
  },
  Ae = t => {
    var e, r;
    return t?.androidBridge
      ? "android"
      : !((r = (e = t?.webkit) === null || e === void 0
              ? void 0
              : e.messageHandlers) === null || r === void 0) && r.bridge
      ? "ios"
      : "web";
  },
  Oe = t => {
    var e, r, i, o, n;
    let a = t.CapacitorCustomPlatform || null,
      s = t.Capacitor || {},
      f = s.Plugins = s.Plugins || {},
      l = t.CapacitorPlatforms,
      C = () => a !== null ? a.name : Ae(t),
      P =
        ((e = l?.currentPlatform) === null || e === void 0
          ? void 0
          : e.getPlatform) || C,
      A = () => P() !== "web",
      H =
        ((r = l?.currentPlatform) === null || r === void 0
          ? void 0
          : r.isNativePlatform) || A,
      G = c => {
        let d = O.get(c);
        return !!(d?.platforms.has(P()) || j(c));
      },
      N =
        ((i = l?.currentPlatform) === null || i === void 0
          ? void 0
          : i.isPluginAvailable) || G,
      V = c => {
        var d;
        return (d = s.PluginHeaders) === null || d === void 0 ? void 0
        : d.find(y => y.name === c);
      },
      j =
        ((o = l?.currentPlatform) === null || o === void 0
          ? void 0
          : o.getPluginHeader) || V,
      q = c => t.console.error(c),
      K = (c, d, y) =>
        Promise.reject(`${y} does not have an implementation of "${d}".`),
      O = new Map(),
      z = (c, d = {}) => {
        let y = O.get(c);
        if (y) {
          return console.warn(
            `Capacitor plugin "${c}" already registered. Cannot register plugins twice.`,
          ),
            y.proxy;
        }
        let v = P(),
          L = j(c),
          h,
          Q = async () => (!h && v in d
            ? h = typeof d[v] == "function" ? h = await d[v]() : h = d[v]
            : a !== null && !h && "web" in d && (h = typeof d.web == "function"
              ? h = await d.web()
              : h = d.web),
            h),
          X = (u, m) => {
            var p, w;
            if (L) {
              let b = L?.methods.find(g => m === g.name);
              if (b) {
                return b.rtype === "promise"
                  ? g => s.nativePromise(c, m.toString(), g)
                  : (g, x) => s.nativeCallback(c, m.toString(), g, x);
              }
              if (u) {return (p = u[m]) === null || p === void 0 ? void 0
                : p.bind(u);}
            }
            else {
              if (u) {
                return (w = u[m]) === null || w === void 0 ? void 0 : w.bind(u);
              }
              throw new M(
                `"${c}" plugin is not implemented on ${v}`,
                T.Unimplemented,
              );
            }
          },
          k = u => {
            let m,
              p = (...w) => {
                let b = Q().then(g => {
                  let x = X(g, u);
                  if (x) {
                    let E = x(...w);
                    return m = E?.remove, E;
                  }
                  else {
                    throw new M(
                      `"${c}.${u}()" is not implemented on ${v}`,
                      T.Unimplemented,
                    );
                  }
                });
                return u === "addListener" && (b.remove = async () => m()), b;
              };
            return p.toString = () => `${u.toString()}() { [capacitor code] }`,
              Object.defineProperty(p, "name", {
                value: u,
                writable: !1,
                configurable: !1,
              }),
              p;
          },
          _ = k("addListener"),
          S = k("removeListener"),
          Y = (u, m) => {
            let p = _({ eventName: u }, m),
              w = async () => {
                let g = await p;
                S({ eventName: u, callbackId: g }, m);
              },
              b = new Promise(g => p.then(() => g({ remove: w })));
            return b.remove = async () => {
              console.warn(
                "Using addListener() without 'await' is deprecated.",
              ), await w();
            },
              b;
          },
          $ = new Proxy({}, {
            get(u, m) {
              switch (m) {
                case "$$typeof":
                  return;
                case "toJSON":
                  return () => ({});
                case "addListener":
                  return L ? Y : _;
                case "removeListener":
                  return S;
                default:
                  return k(m);
              }
            },
          });
        return f[c] = $,
          O.set(c, {
            name: c,
            proxy: $,
            platforms: new Set([...Object.keys(d), ...L ? [v] : []]),
          }),
          $;
      },
      J =
        ((n = l?.currentPlatform) === null || n === void 0
          ? void 0
          : n.registerPlugin) || z;
    return s.convertFileSrc || (s.convertFileSrc = c => c),
      s.getPlatform = P,
      s.handleError = q,
      s.isNativePlatform = H,
      s.isPluginAvailable = N,
      s.pluginMethodNoop = K,
      s.registerPlugin = J,
      s.Exception = M,
      s.DEBUG = !!s.DEBUG,
      s.isLoggingEnabled = !!s.isLoggingEnabled,
      s.platform = s.getPlatform(),
      s.isNative = s.isNativePlatform(),
      s;
  },
  ke = t => t.Capacitor = Oe(t),
  I = ke(
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {},
  ),
  te = I.registerPlugin,
  Ve = I.Plugins,
  qe = t => Ee(I, t),
  B = class {
    constructor(e) {
      this.listeners = {},
        this.windowListeners = {},
        e
        && (console.warn(
          `Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`,
        ),
          this.config = e);
    }
    addListener(e, r) {
      this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(r);
      let o = this.windowListeners[e];
      o && !o.registered && this.addWindowListener(o);
      let n = async () => this.removeListener(e, r),
        a = Promise.resolve({ remove: n });
      return Object.defineProperty(a, "remove", {
        value: async () => {
          console.warn("Using addListener() without 'await' is deprecated."),
            await n();
        },
      }),
        a;
    }
    async removeAllListeners() {
      this.listeners = {};
      for (let e in this.windowListeners) {
        this.removeWindowListener(this.windowListeners[e]);
      }
      this.windowListeners = {};
    }
    notifyListeners(e, r) {
      let i = this.listeners[e];
      i && i.forEach(o => o(r));
    }
    hasListeners(e) {
      return !!this.listeners[e].length;
    }
    registerWindowListener(e, r) {
      this.windowListeners[r] = {
        registered: !1,
        windowEventName: e,
        pluginEventName: r,
        handler: i => {
          this.notifyListeners(r, i);
        },
      };
    }
    unimplemented(e = "not implemented") {
      return new I.Exception(e, T.Unimplemented);
    }
    unavailable(e = "not available") {
      return new I.Exception(e, T.Unavailable);
    }
    async removeListener(e, r) {
      let i = this.listeners[e];
      if (!i) return;
      let o = i.indexOf(r);
      this.listeners[e].splice(o, 1),
        this.listeners[e].length
        || this.removeWindowListener(this.windowListeners[e]);
    }
    addWindowListener(e) {
      window.addEventListener(e.windowEventName, e.handler), e.registered = !0;
    }
    removeWindowListener(e) {
      e
        && (window.removeEventListener(e.windowEventName, e.handler),
          e.registered = !1);
    }
  },
  Ke = te("WebView"),
  ae = t =>
    encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape),
  le = t => t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent),
  Z = class extends B {
    async getCookies() {
      let e = document.cookie, r = {};
      return e.split(";").forEach(i => {
        if (i.length <= 0) return;
        let [o, n] = i.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
        o = le(o).trim(), n = le(n).trim(), r[o] = n;
      }),
        r;
    }
    async setCookie(e) {
      try {
        let r = ae(e.key),
          i = ae(e.value),
          o = `; expires=${(e.expires || "").replace("expires=", "")}`,
          n = (e.path || "/").replace("path=", ""),
          a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
        document.cookie = `${r}=${i || ""}${o}; path=${n}; ${a};`;
      }
      catch (r) {
        return Promise.reject(r);
      }
    }
    async deleteCookie(e) {
      try {
        document.cookie = `${e.key}=; Max-Age=0`;
      }
      catch (r) {
        return Promise.reject(r);
      }
    }
    async clearCookies() {
      try {
        let e = document.cookie.split(";") || [];
        for (let r of e) {
          document.cookie = r.replace(/^ +/, "").replace(
            /=.*/,
            `=;expires=${new Date().toUTCString()};path=/`,
          );
        }
      }
      catch (e) {
        return Promise.reject(e);
      }
    }
    async clearAllCookies() {
      try {
        await this.clearCookies();
      }
      catch (e) {
        return Promise.reject(e);
      }
    }
  },
  ze = te("CapacitorCookies", { web: () => new Z() }),
  $e = async t =>
    new Promise((e, r) => {
      let i = new FileReader();
      i.onload = () => {
        let o = i.result;
        e(o.indexOf(",") >= 0 ? o.split(",")[1] : o);
      },
        i.onerror = o => r(o),
        i.readAsDataURL(t);
    }),
  Te = (t = {}) => {
    let e = Object.keys(t);
    return Object.keys(t).map(o => o.toLocaleLowerCase()).reduce(
      (o, n, a) => (o[n] = t[e[a]], o),
      {},
    );
  },
  Re = (t, e = !0) =>
    t
      ? Object.entries(t).reduce((i, o) => {
        let [n, a] = o, s, f;
        return Array.isArray(a)
          ? (f = "",
            a.forEach(l => {
              s = e ? encodeURIComponent(l) : l, f += `${n}=${s}&`;
            }),
            f.slice(0, -1))
          : (s = e ? encodeURIComponent(a) : a, f = `${n}=${s}`),
          `${i}&${f}`;
      }, "").substr(1)
      : null,
  Ue = (t, e = {}) => {
    let r = Object.assign({ method: t.method || "GET", headers: t.headers }, e),
      o = Te(t.headers)["content-type"] || "";
    if (typeof t.data == "string") r.body = t.data;
    else if (o.includes("application/x-www-form-urlencoded")) {
      let n = new URLSearchParams();
      for (let [a, s] of Object.entries(t.data || {})) n.set(a, s);
      r.body = n.toString();
    }
    else if (o.includes("multipart/form-data")) {
      let n = new FormData();
      if (t.data instanceof FormData) {t.data.forEach((s, f) => {
          n.append(f, s);
        });}
      else for (let s of Object.keys(t.data)) n.append(s, t.data[s]);
      r.body = n;
      let a = new Headers(r.headers);
      a.delete("content-type"), r.headers = a;
    }
    else {
      (o.includes("application/json") || typeof t.data == "object")
        && (r.body = JSON.stringify(t.data));
    }
    return r;
  },
  ee = class extends B {
    async request(e) {
      let r = Ue(e, e.webFetchExtra),
        i = Re(e.params, e.shouldEncodeUrlParams),
        o = i ? `${e.url}?${i}` : e.url,
        n = await fetch(o, r),
        a = n.headers.get("content-type") || "",
        { responseType: s = "text" } = n.ok ? e : {};
      a.includes("application/json") && (s = "json");
      let f, l;
      switch (s) {
        case "arraybuffer":
        case "blob":
          l = await n.blob(), f = await $e(l);
          break;
        case "json":
          f = await n.json();
          break;
        case "document":
        case "text":
        default:
          f = await n.text();
      }
      let C = {};
      return n.headers.forEach((P, A) => {
        C[A] = P;
      }),
        { data: f, headers: C, status: n.status, url: n.url };
    }
    async get(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: "GET" }),
      );
    }
    async post(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: "POST" }),
      );
    }
    async put(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: "PUT" }),
      );
    }
    async patch(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: "PATCH" }),
      );
    }
    async delete(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: "DELETE" }),
      );
    }
  },
  Je = te("CapacitorHttp", { web: () => new ee() });
ne();
var me;
(function(t) {
  t.General = "General",
    t.ParentalGuidance = "ParentalGuidance",
    t.Teen = "Teen",
    t.MatureAudience = "MatureAudience";
})(me || (me = {}));
var ge;
(function(t) {
  t.SizeChanged = "bannerAdSizeChanged",
    t.Loaded = "bannerAdLoaded",
    t.FailedToLoad = "bannerAdFailedToLoad",
    t.Opened = "bannerAdOpened",
    t.Closed = "bannerAdClosed",
    t.AdImpression = "bannerAdImpression";
})(ge || (ge = {}));
var pe;
(function(t) {
  t.TOP_CENTER = "TOP_CENTER",
    t.CENTER = "CENTER",
    t.BOTTOM_CENTER = "BOTTOM_CENTER";
})(pe || (pe = {}));
var he;
(function(t) {
  t.BANNER = "BANNER",
    t.FULL_BANNER = "FULL_BANNER",
    t.LARGE_BANNER = "LARGE_BANNER",
    t.MEDIUM_RECTANGLE = "MEDIUM_RECTANGLE",
    t.LEADERBOARD = "LEADERBOARD",
    t.ADAPTIVE_BANNER = "ADAPTIVE_BANNER",
    t.SMART_BANNER = "SMART_BANNER";
})(he || (he = {}));
var we;
(function(t) {
  t.Loaded = "interstitialAdLoaded",
    t.FailedToLoad = "interstitialAdFailedToLoad",
    t.Showed = "interstitialAdShowed",
    t.FailedToShow = "interstitialAdFailedToShow",
    t.Dismissed = "interstitialAdDismissed";
})(we || (we = {}));
var be;
(function(t) {
  t.Loaded = "onRewardedVideoAdLoaded",
    t.FailedToLoad = "onRewardedVideoAdFailedToLoad",
    t.Showed = "onRewardedVideoAdShowed",
    t.FailedToShow = "onRewardedVideoAdFailedToShow",
    t.Dismissed = "onRewardedVideoAdDismissed",
    t.Rewarded = "onRewardedVideoAdReward";
})(be || (be = {}));
var $t = F("AdMob", {
  web: () =>
    Promise.resolve().then(() => (Pe(), ve)).then(t => new t.AdMobWeb()),
});
export {
  $t as AdMob,
  B as WebPlugin,
  be as RewardAdPluginEvents,
  ce as CapacitorPlatforms,
  Ge as addPlatform,
  ge as BannerAdPluginEvents,
  he as BannerAdSize,
  I as Capacitor,
  Je as CapacitorHttp,
  Ke as WebView,
  M as CapacitorException,
  me as MaxAdContentRating,
  Ne as setPlatform,
  pe as BannerAdPosition,
  qe as registerWebPlugin,
  T as ExceptionCode,
  te as registerPlugin,
  Ve as Plugins,
  we as InterstitialAdPluginEvents,
  ze as CapacitorCookies,
};
/*! Capacitor: https://capacitorjs.com/ - MIT License */
