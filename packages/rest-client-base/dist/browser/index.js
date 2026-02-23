var c = Object.defineProperty;
var l = (a, t, e) => t in a ? c(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var h = (a, t, e) => l(a, typeof t != "symbol" ? t + "" : t, e);
class i extends Error {
  /**
   * Create a new API error
   * @param response The original HTTP response
   * @param message Optional custom error message
   */
  constructor(e, s) {
    super(
      s || `API request failed: ${e.status} ${e.statusText}`
    );
    h(this, "_response");
    h(this, "_jsonData", null);
    h(this, "_textData", null);
    this.name = "ApiError", this._response = e, Object.setPrototypeOf(this, i.prototype);
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
        const e = this._response.clone();
        this._jsonData = await e.json();
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
        const e = this._response.clone();
        this._textData = await e.text();
      } catch {
        this._textData = "";
      }
    return this._textData;
  }
}
class d {
  constructor(t = fetch) {
    this.fetchImpl = t;
  }
  async handleResponse(t) {
    if (!t.ok)
      throw new i(t);
    const e = t.headers.get("content-type");
    return e && e.includes("application/json") ? await t.json() : {};
  }
  async get(t, e) {
    const s = await this.fetchImpl(t, {
      method: "GET",
      headers: e,
      credentials: "include"
    });
    return this.handleResponse(s);
  }
  async post(t, e, s) {
    const r = await this.fetchImpl(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...s
      },
      body: JSON.stringify(e),
      credentials: "include"
    });
    return this.handleResponse(r);
  }
  async put(t, e, s) {
    const r = await this.fetchImpl(t, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...s
      },
      body: JSON.stringify(e),
      credentials: "include"
    });
    return this.handleResponse(r);
  }
  async patch(t, e, s) {
    const r = await this.fetchImpl(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...s
      },
      body: JSON.stringify(e),
      credentials: "include"
    });
    return this.handleResponse(r);
  }
  async delete(t, e) {
    const s = await this.fetchImpl(t, {
      method: "DELETE",
      headers: e,
      credentials: "include"
    });
    return this.handleResponse(s);
  }
  async deleteWithBody(t, e, s) {
    const r = await this.fetchImpl(t, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...s
      },
      body: JSON.stringify(e),
      credentials: "include"
    });
    return this.handleResponse(r);
  }
}
class u {
  constructor(t) {
    this.httpService = t;
  }
  async get(t, e) {
    const s = e ? { headers: e } : void 0;
    return this.httpService.get(t, s);
  }
  async post(t, e, s) {
    const r = s ? { headers: s } : void 0;
    return this.httpService.postJson(t, e, r);
  }
  async put(t, e, s) {
    const r = s ? { headers: s } : void 0;
    return this.httpService.putJson(t, e, r);
  }
  async patch(t, e, s) {
    const r = s ? { headers: s } : void 0;
    return this.httpService.patchJson(t, e, r);
  }
  async delete(t, e) {
    const s = e ? { headers: e } : void 0;
    return this.httpService.delete(t, s);
  }
  async deleteWithBody(t, e, s) {
    return this.httpService.deleteJson(t, e);
  }
}
class o {
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
    this.baseUrl = t.baseUrl || "", this.defaultHeaders = t.defaultHeaders || {}, t.httpAdapter ? this.httpAdapter = t.httpAdapter : t.httpService ? this.httpAdapter = new u(t.httpService) : this.httpAdapter = new d(t.fetchImpl || fetch);
  }
  /**
   * Performs a GET request
   * @param endpoint API endpoint path
   * @param queryParams URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async get(t, e, s) {
    const r = this.buildUrl(t, e);
    return this.httpAdapter.get(r, this.buildHeaders(s == null ? void 0 : s.headers));
  }
  /**
   * Performs a POST request
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async post(t, e, s, r) {
    const n = this.buildUrl(t, s);
    return this.httpAdapter.post(
      n,
      e,
      this.buildHeaders(r == null ? void 0 : r.headers)
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
  async put(t, e, s, r) {
    const n = this.buildUrl(t, s);
    return this.httpAdapter.put(
      n,
      e,
      this.buildHeaders(r == null ? void 0 : r.headers)
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
  async patch(t, e, s, r) {
    const n = this.buildUrl(t, s);
    return this.httpAdapter.patch(
      n,
      e,
      this.buildHeaders(r == null ? void 0 : r.headers)
    );
  }
  /**
   * Performs a DELETE request
   * @param endpoint API endpoint path
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving when the request is complete
   */
  async delete(t, e, s) {
    const r = this.buildUrl(t, e);
    return this.httpAdapter.delete(r, this.buildHeaders(s == null ? void 0 : s.headers));
  }
  /**
   * Performs a DELETE request with body
   * @param endpoint API endpoint path
   * @param body Request body
   * @param queryParams Optional URL query parameters
   * @param options Request options
   * @returns Promise resolving to the response data
   */
  async deleteWithBody(t, e, s, r) {
    const n = this.buildUrl(t, s);
    return this.httpAdapter.deleteWithBody(
      n,
      e,
      this.buildHeaders(r == null ? void 0 : r.headers)
    );
  }
  /**
   * Builds complete URL from endpoint and query parameters
   * @param endpoint API endpoint path
   * @param queryParams Optional query parameters
   * @returns Complete URL
   * @protected
   */
  buildUrl(t, e) {
    let s = `${this.baseUrl}${t}`;
    return s.startsWith("//") && (s = s.replace(/^\/\//, "/")), e && e.toString() && (s += `?${e.toString()}`), s;
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
function y(...a) {
  return () => {
  };
}
function f(...a) {
  return () => {
  };
}
function b(...a) {
  return () => {
  };
}
export {
  i as ApiError,
  f as ApiProperty,
  b as ApiPropertyOptional,
  o as BaseApiClient,
  d as FetchAdapter,
  u as HttpServiceAdapter,
  y as Type
};
