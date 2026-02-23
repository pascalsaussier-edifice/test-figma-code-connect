var y = Object.defineProperty;
var g = (n, t, r) => t in n ? y(n, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[t] = r;
var h = (n, t, r) => g(n, typeof t != "symbol" ? t + "" : t, r);
import { ApiProperty as T, ApiPropertyOptional as P } from "@nestjs/swagger";
class f extends Error {
  /**
   * Create a new API error
   * @param response The original HTTP response
   * @param message Optional custom error message
   */
  constructor(r, e) {
    super(
      e || `API request failed: ${r.status} ${r.statusText}`
    );
    h(this, "_response");
    h(this, "_jsonData", null);
    h(this, "_textData", null);
    this.name = "ApiError", this._response = r, Object.setPrototypeOf(this, f.prototype);
  }
  /**
   * Get the original Response object
   * @returns The original Response
   */
  response() {
    return this._response;
  }
  /**
   * Get the HTTP status code
   * @returns The numeric status code (e.g., 404, 500)
   */
  status() {
    return this._response.status;
  }
  /**
   * Get the HTTP status text
   * @returns The status text (e.g., "Not Found", "Internal Server Error")
   */
  statusText() {
    return this._response.statusText;
  }
  /**
   * Get the response body as JSON
   * @returns Parsed JSON data or null if not available
   * @throws If the response body isn't valid JSON
   */
  async json() {
    if (this._jsonData === null)
      try {
        const r = this._response.clone();
        this._jsonData = await r.json();
      } catch {
        this._jsonData = null;
      }
    return this._jsonData;
  }
  /**
   * Get the response body as text
   * @returns Text content or empty string if not available
   */
  async text() {
    if (this._textData === null)
      try {
        const r = this._response.clone();
        this._textData = await r.text();
      } catch {
        this._textData = "";
      }
    return this._textData;
  }
}
class _ {
  constructor(t = fetch) {
    this.fetchImpl = t;
  }
  async handleResponse(t) {
    if (!t.ok)
      throw new f(t);
    const r = t.headers.get("content-type");
    return r && r.includes("application/json") ? await t.json() : {};
  }
  async get(t, r) {
    const e = await this.fetchImpl(t, {
      method: "GET",
      headers: r,
      credentials: "include"
    });
    return this.handleResponse(e);
  }
  async post(t, r, e) {
    const s = await this.fetchImpl(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...e
      },
      body: JSON.stringify(r),
      credentials: "include"
    });
    return this.handleResponse(s);
  }
  async put(t, r, e) {
    const s = await this.fetchImpl(t, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...e
      },
      body: JSON.stringify(r),
      credentials: "include"
    });
    return this.handleResponse(s);
  }
  async patch(t, r, e) {
    const s = await this.fetchImpl(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...e
      },
      body: JSON.stringify(r),
      credentials: "include"
    });
    return this.handleResponse(s);
  }
  async delete(t, r) {
    const e = await this.fetchImpl(t, {
      method: "DELETE",
      headers: r,
      credentials: "include"
    });
    return this.handleResponse(e);
  }
  async deleteWithBody(t, r, e) {
    const s = await this.fetchImpl(t, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...e
      },
      body: JSON.stringify(r),
      credentials: "include"
    });
    return this.handleResponse(s);
  }
}
class M {
  constructor(t) {
    this.httpService = t;
  }
  async get(t, r) {
    const e = r ? { headers: r } : void 0;
    return this.httpService.get(t, e);
  }
  async post(t, r, e) {
    const s = e ? { headers: e } : void 0;
    return this.httpService.postJson(t, r, s);
  }
  async put(t, r, e) {
    const s = e ? { headers: e } : void 0;
    return this.httpService.putJson(t, r, s);
  }
  async patch(t, r, e) {
    const s = e ? { headers: e } : void 0;
    return this.httpService.patchJson(t, r, s);
  }
  async delete(t, r) {
    const e = r ? { headers: r } : void 0;
    return this.httpService.delete(t, e);
  }
  async deleteWithBody(t, r, e) {
    return this.httpService.deleteJson(t, r);
  }
}
class x {
  /**
   * Creates a new API client instance
   *
   * @param options Configuration options
   * @param options.baseUrl Base URL for API requests
   * @param options.defaultHeaders Default headers for all requests
   * @param options.fetchImpl Custom fetch implementation (deprecated, use httpAdapter)
   * @param options.httpService Edifice HttpService instance (from odeServices.http())
   * @param options.httpAdapter Custom HTTP adapter implementation
   *
   * @example
   * // With Edifice HttpService
   * import { odeServices } from '@edifice.io/client';
   *
   * const client = new CommunityClient({
   *   httpService: odeServices.http(),
   *   defaultHeaders: {
   *     'X-Custom-Header': 'value'
   *   }
   * });
   */
  constructor(t = {}) {
    /**
     * Base URL for all API requests
     * @protected
     */
    h(this, "baseUrl");
    /**
     * Default headers included with all requests
     * @protected
     */
    h(this, "defaultHeaders");
    /**
     * HTTP adapter for making requests
     * @protected
     */
    h(this, "httpAdapter");
    this.baseUrl = t.baseUrl || "", this.defaultHeaders = t.defaultHeaders || {}, t.httpAdapter ? this.httpAdapter = t.httpAdapter : t.httpService ? this.httpAdapter = new M(t.httpService) : this.httpAdapter = new _(t.fetchImpl || fetch);
  }
  /**
   * Performs a GET request
   * @param endpoint API endpoint path
   * @param queryParams URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async get(t, r, e) {
    const s = this.buildUrl(t, r);
    return this.httpAdapter.get(s, this.buildHeaders(e == null ? void 0 : e.headers));
  }
  /**
   * Performs a POST request
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async post(t, r, e, s) {
    const a = this.buildUrl(t, e);
    return this.httpAdapter.post(
      a,
      r,
      this.buildHeaders(s == null ? void 0 : s.headers)
    );
  }
  /**
   * Performs a PUT request
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async put(t, r, e, s) {
    const a = this.buildUrl(t, e);
    return this.httpAdapter.put(
      a,
      r,
      this.buildHeaders(s == null ? void 0 : s.headers)
    );
  }
  /**
   * Performs a PATCH request
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async patch(t, r, e, s) {
    const a = this.buildUrl(t, e);
    return this.httpAdapter.patch(
      a,
      r,
      this.buildHeaders(s == null ? void 0 : s.headers)
    );
  }
  /**
   * Performs a DELETE request
   * @param endpoint API endpoint path
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving when the request is complete
   */
  async delete(t, r, e) {
    const s = this.buildUrl(t, r);
    return this.httpAdapter.delete(s, this.buildHeaders(e == null ? void 0 : e.headers));
  }
  /**
   * Performs a DELETE request with body
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async deleteWithBody(t, r, e, s) {
    const a = this.buildUrl(t, e);
    return this.httpAdapter.deleteWithBody(
      a,
      r,
      this.buildHeaders(s == null ? void 0 : s.headers)
    );
  }
  /**
   * Builds complete URL from endpoint and query parameters
   * @param endpoint API endpoint path
   * @param queryParams Optional query parameters
   * @returns Complete URL
   * @protected
   */
  buildUrl(t, r) {
    let e = `${this.baseUrl}${t}`;
    return e.startsWith("//") && (e = e.replace(/^\/\//, "/")), r && r.toString() && (e += `?${r.toString()}`), e;
  }
  /**
   * Builds headers for a request by combining default and request-specific headers
   * @param additionalHeaders Optional additional headers
   * @returns Combined headers
   * @protected
   */
  buildHeaders(t) {
    return {
      ...this.defaultHeaders,
      ...t
    };
  }
}
var o;
(function(n) {
  n[n.PLAIN_TO_CLASS = 0] = "PLAIN_TO_CLASS", n[n.CLASS_TO_PLAIN = 1] = "CLASS_TO_PLAIN", n[n.CLASS_TO_CLASS = 2] = "CLASS_TO_CLASS";
})(o || (o = {}));
var S = (
  /** @class */
  function() {
    function n() {
      this._typeMetadatas = /* @__PURE__ */ new Map(), this._transformMetadatas = /* @__PURE__ */ new Map(), this._exposeMetadatas = /* @__PURE__ */ new Map(), this._excludeMetadatas = /* @__PURE__ */ new Map(), this._ancestorsMap = /* @__PURE__ */ new Map();
    }
    return n.prototype.addTypeMetadata = function(t) {
      this._typeMetadatas.has(t.target) || this._typeMetadatas.set(t.target, /* @__PURE__ */ new Map()), this._typeMetadatas.get(t.target).set(t.propertyName, t);
    }, n.prototype.addTransformMetadata = function(t) {
      this._transformMetadatas.has(t.target) || this._transformMetadatas.set(t.target, /* @__PURE__ */ new Map()), this._transformMetadatas.get(t.target).has(t.propertyName) || this._transformMetadatas.get(t.target).set(t.propertyName, []), this._transformMetadatas.get(t.target).get(t.propertyName).push(t);
    }, n.prototype.addExposeMetadata = function(t) {
      this._exposeMetadatas.has(t.target) || this._exposeMetadatas.set(t.target, /* @__PURE__ */ new Map()), this._exposeMetadatas.get(t.target).set(t.propertyName, t);
    }, n.prototype.addExcludeMetadata = function(t) {
      this._excludeMetadatas.has(t.target) || this._excludeMetadatas.set(t.target, /* @__PURE__ */ new Map()), this._excludeMetadatas.get(t.target).set(t.propertyName, t);
    }, n.prototype.findTransformMetadatas = function(t, r, e) {
      return this.findMetadatas(this._transformMetadatas, t, r).filter(function(s) {
        return !s.options || s.options.toClassOnly === !0 && s.options.toPlainOnly === !0 ? !0 : s.options.toClassOnly === !0 ? e === o.CLASS_TO_CLASS || e === o.PLAIN_TO_CLASS : s.options.toPlainOnly === !0 ? e === o.CLASS_TO_PLAIN : !0;
      });
    }, n.prototype.findExcludeMetadata = function(t, r) {
      return this.findMetadata(this._excludeMetadatas, t, r);
    }, n.prototype.findExposeMetadata = function(t, r) {
      return this.findMetadata(this._exposeMetadatas, t, r);
    }, n.prototype.findExposeMetadataByCustomName = function(t, r) {
      return this.getExposedMetadatas(t).find(function(e) {
        return e.options && e.options.name === r;
      });
    }, n.prototype.findTypeMetadata = function(t, r) {
      return this.findMetadata(this._typeMetadatas, t, r);
    }, n.prototype.getStrategy = function(t) {
      var r = this._excludeMetadatas.get(t), e = r && r.get(void 0), s = this._exposeMetadatas.get(t), a = s && s.get(void 0);
      return e && a || !e && !a ? "none" : e ? "excludeAll" : "exposeAll";
    }, n.prototype.getExposedMetadatas = function(t) {
      return this.getMetadata(this._exposeMetadatas, t);
    }, n.prototype.getExcludedMetadatas = function(t) {
      return this.getMetadata(this._excludeMetadatas, t);
    }, n.prototype.getExposedProperties = function(t, r) {
      return this.getExposedMetadatas(t).filter(function(e) {
        return !e.options || e.options.toClassOnly === !0 && e.options.toPlainOnly === !0 ? !0 : e.options.toClassOnly === !0 ? r === o.CLASS_TO_CLASS || r === o.PLAIN_TO_CLASS : e.options.toPlainOnly === !0 ? r === o.CLASS_TO_PLAIN : !0;
      }).map(function(e) {
        return e.propertyName;
      });
    }, n.prototype.getExcludedProperties = function(t, r) {
      return this.getExcludedMetadatas(t).filter(function(e) {
        return !e.options || e.options.toClassOnly === !0 && e.options.toPlainOnly === !0 ? !0 : e.options.toClassOnly === !0 ? r === o.CLASS_TO_CLASS || r === o.PLAIN_TO_CLASS : e.options.toPlainOnly === !0 ? r === o.CLASS_TO_PLAIN : !0;
      }).map(function(e) {
        return e.propertyName;
      });
    }, n.prototype.clear = function() {
      this._typeMetadatas.clear(), this._exposeMetadatas.clear(), this._excludeMetadatas.clear(), this._ancestorsMap.clear();
    }, n.prototype.getMetadata = function(t, r) {
      var e = t.get(r), s;
      e && (s = Array.from(e.values()).filter(function(l) {
        return l.propertyName !== void 0;
      }));
      for (var a = [], i = 0, p = this.getAncestors(r); i < p.length; i++) {
        var c = p[i], d = t.get(c);
        if (d) {
          var u = Array.from(d.values()).filter(function(l) {
            return l.propertyName !== void 0;
          });
          a.push.apply(a, u);
        }
      }
      return a.concat(s || []);
    }, n.prototype.findMetadata = function(t, r, e) {
      var s = t.get(r);
      if (s) {
        var a = s.get(e);
        if (a)
          return a;
      }
      for (var i = 0, p = this.getAncestors(r); i < p.length; i++) {
        var c = p[i], d = t.get(c);
        if (d) {
          var u = d.get(e);
          if (u)
            return u;
        }
      }
    }, n.prototype.findMetadatas = function(t, r, e) {
      var s = t.get(r), a;
      s && (a = s.get(e));
      for (var i = [], p = 0, c = this.getAncestors(r); p < c.length; p++) {
        var d = c[p], u = t.get(d);
        u && u.has(e) && i.push.apply(i, u.get(e));
      }
      return i.slice().reverse().concat((a || []).slice().reverse());
    }, n.prototype.getAncestors = function(t) {
      if (!t)
        return [];
      if (!this._ancestorsMap.has(t)) {
        for (var r = [], e = Object.getPrototypeOf(t.prototype.constructor); typeof e.prototype < "u"; e = Object.getPrototypeOf(e.prototype.constructor))
          r.push(e);
        this._ancestorsMap.set(t, r);
      }
      return this._ancestorsMap.get(t);
    }, n;
  }()
), A = new S();
function O(n, t) {
  return t === void 0 && (t = {}), function(r, e) {
    var s = Reflect.getMetadata("design:type", r, e);
    A.addTypeMetadata({
      target: r.constructor,
      propertyName: e,
      reflectedType: s,
      typeFunction: n,
      options: t
    });
  };
}
export {
  f as ApiError,
  T as ApiProperty,
  P as ApiPropertyOptional,
  x as BaseApiClient,
  _ as FetchAdapter,
  M as HttpServiceAdapter,
  O as Type
};
