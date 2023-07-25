import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from './chunks/index-2f2dc0eb.js';
import { e as error, j as json, R as Redirect, H as HttpError, A as ActionFailure } from './chunks/index2-2067fca8.js';
import { D as DevalueError, i as is_primitive, g as get_type, a as is_plain_object, s as stringify_string, u as uneval } from './chunks/uneval-c005139b.js';
import { s as set_public_env, w as writable, r as readable } from './chunks/env-public-d1489f53.js';

const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;

/**
 * Turn a value into a JSON string that can be parsed with `devalue.parse`
 * @param {any} value
 */
function stringify(value) {
	/** @type {any[]} */
	const stringified = [];

	/** @type {Map<any, number>} */
	const indexes = new Map();

	/** @type {string[]} */
	const keys = [];

	let p = 0;

	/** @param {any} thing */
	function flatten(thing) {
		if (typeof thing === 'function') {
			throw new DevalueError(`Cannot stringify a function`, keys);
		}

		if (indexes.has(thing)) return indexes.get(thing);

		if (thing === undefined) return UNDEFINED;
		if (Number.isNaN(thing)) return NAN;
		if (thing === Infinity) return POSITIVE_INFINITY;
		if (thing === -Infinity) return NEGATIVE_INFINITY;
		if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;

		const index = p++;
		indexes.set(thing, index);

		let str = '';

		if (is_primitive(thing)) {
			str = stringify_primitive(thing);
		} else {
			const type = get_type(thing);

			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
					str = `["Object",${stringify_primitive(thing)}]`;
					break;

				case 'BigInt':
					str = `["BigInt",${thing}]`;
					break;

				case 'Date':
					str = `["Date","${thing.toISOString()}"]`;
					break;

				case 'RegExp':
					const { source, flags } = thing;
					str = flags
						? `["RegExp",${stringify_string(source)},"${flags}"]`
						: `["RegExp",${stringify_string(source)}]`;
					break;

				case 'Array':
					str = '[';

					for (let i = 0; i < thing.length; i += 1) {
						if (i > 0) str += ',';

						if (i in thing) {
							keys.push(`[${i}]`);
							str += flatten(thing[i]);
							keys.pop();
						} else {
							str += HOLE;
						}
					}

					str += ']';

					break;

				case 'Set':
					str = '["Set"';

					for (const value of thing) {
						str += `,${flatten(value)}`;
					}

					str += ']';
					break;

				case 'Map':
					str = '["Map"';

					for (const [key, value] of thing) {
						keys.push(
							`.get(${is_primitive(key) ? stringify_primitive(key) : '...'})`
						);
						str += `,${flatten(key)},${flatten(value)}`;
					}

					str += ']';
					break;

				default:
					if (!is_plain_object(thing)) {
						throw new DevalueError(
							`Cannot stringify arbitrary non-POJOs`,
							keys
						);
					}

					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new DevalueError(
							`Cannot stringify POJOs with symbolic keys`,
							keys
						);
					}

					if (Object.getPrototypeOf(thing) === null) {
						str = '["null"';
						for (const key in thing) {
							keys.push(`.${key}`);
							str += `,${stringify_string(key)},${flatten(thing[key])}`;
							keys.pop();
						}
						str += ']';
					} else {
						str = '{';
						let started = false;
						for (const key in thing) {
							if (started) str += ',';
							started = true;
							keys.push(`.${key}`);
							str += `${stringify_string(key)}:${flatten(thing[key])}`;
							keys.pop();
						}
						str += '}';
					}
			}
		}

		stringified[index] = str;
		return index;
	}

	const index = flatten(value);

	// special case — value is represented as a negative index
	if (index < 0) return `${index}`;

	return `[${stringified.join(',')}]`;
}

/**
 * @param {any} thing
 * @returns {string}
 */
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === 'string') return stringify_string(thing);
	if (thing instanceof String) return stringify_string(thing.toString());
	if (thing === void 0) return UNDEFINED.toString();
	if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
	if (type === 'bigint') return `["BigInt","${thing}"]`;
	return String(thing);
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse$1;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var __toString = Object.prototype.toString;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse$1(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;

  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf('=', index);

    // no more cookie pairs
    if (eqIdx === -1) {
      break
    }

    var endIdx = str.indexOf(';', index);

    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(';', eqIdx - 1) + 1;
      continue
    }

    var key = str.slice(index, eqIdx).trim();

    // only assign once
    if (undefined === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();

      // quoted values
      if (val.charCodeAt(0) === 0x22) {
        val = val.slice(1, -1);
      }

      obj[key] = tryDecode(val, dec);
    }

    index = endIdx + 1;
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode$1;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    var expires = opt.expires;

    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.priority) {
    var priority = typeof opt.priority === 'string'
      ? opt.priority.toLowerCase()
      : opt.priority;

    switch (priority) {
      case 'low':
        str += '; Priority=Low';
        break
      case 'medium':
        str += '; Priority=Medium';
        break
      case 'high':
        str += '; Priority=High';
        break
      default:
        throw new TypeError('option priority is invalid')
    }
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */

function decode (str) {
  return str.indexOf('%') !== -1
    ? decodeURIComponent(str)
    : str
}

/**
 * URL-encode value.
 *
 * @param {string} str
 * @returns {string}
 */

function encode$1 (val) {
  return encodeURIComponent(val)
}

/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */

function isDate (val) {
  return __toString.call(val) === '[object Date]' ||
    val instanceof Date
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var setCookieExports = {};
var setCookie = {
  get exports(){ return setCookieExports; },
  set exports(v){ setCookieExports = v; },
};

var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};

function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}

function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);

  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" +
        value +
        "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }

  var cookie = {
    name: name,
    value: value,
  };

  parts.forEach(function (part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value;
    } else {
      cookie[key] = value;
    }
  });

  return cookie;
}

function parseNameValuePair(nameValuePairStr) {
  // Parses name-value-pair according to rfc6265bis draft

  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
  } else {
    value = nameValuePairStr;
  }

  return { name: name, value: value };
}

function parse(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }

  if (input.headers && input.headers["set-cookie"]) {
    // fast-path for node.js (which automatically normalizes header names to lower-case
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    // slow-path for other environments - see #25
    var sch =
      input.headers[
        Object.keys(input.headers).find(function (key) {
          return key.toLowerCase() === "set-cookie";
        })
      ];
    // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn(
        "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
      );
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!options.map) {
    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
      var cookie = parseString(str, options);
      cookies[cookie.name] = cookie;
      return cookies;
    }, cookies);
  }
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }

  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}

setCookie.exports = parse;
setCookieExports.parse = parse;
var parseString_1 = setCookieExports.parseString = parseString;
var splitCookiesString_1 = setCookieExports.splitCookiesString = splitCookiesString;

function afterUpdate() { }

const DEV = false;

/** @param {boolean} value */
function set_building(value) {
}

/* .svelte-kit/generated/root.svelte generated by Svelte v3.55.0 */

const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { page } = $$props;
	let { components } = $$props;
	let { form } = $$props;
	let { data_0 = null } = $$props;
	let { data_1 = null } = $$props;
	let { data_2 = null } = $$props;

	{
		setContext('__svelte__', stores);
	}

	afterUpdate(stores.page.notify);

	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
	if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
	if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0) $$bindings.data_2(data_2);

	{
		stores.page.set(page);
	}

	return `


${components[1]
	? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0 }, {}, {
			default: () => {
				return `${components[2]
				? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1 }, {}, {
						default: () => {
							return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, { data: data_2, form }, {}, {})}`;
						}
					})}`
				: `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, form }, {}, {})}`}`;
			}
		})}`
	: `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, form }, {}, {})}`}

${``}`;
});

/**
 * Given an Accept header and a list of possible content types, pick
 * the most suitable one to respond with
 * @param {string} accept
 * @param {string[]} types
 */
function negotiate(accept, types) {
	/** @type {Array<{ type: string, subtype: string, q: number, i: number }>} */
	const parts = [];

	accept.split(',').forEach((str, i) => {
		const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);

		// no match equals invalid header — ignore
		if (match) {
			const [, type, subtype, q = '1'] = match;
			parts.push({ type, subtype, q: +q, i });
		}
	});

	parts.sort((a, b) => {
		if (a.q !== b.q) {
			return b.q - a.q;
		}

		if ((a.subtype === '*') !== (b.subtype === '*')) {
			return a.subtype === '*' ? 1 : -1;
		}

		if ((a.type === '*') !== (b.type === '*')) {
			return a.type === '*' ? 1 : -1;
		}

		return a.i - b.i;
	});

	let accepted;
	let min_priority = Infinity;

	for (const mimetype of types) {
		const [type, subtype] = mimetype.split('/');
		const priority = parts.findIndex(
			(part) =>
				(part.type === type || part.type === '*') &&
				(part.subtype === subtype || part.subtype === '*')
		);

		if (priority !== -1 && priority < min_priority) {
			accepted = mimetype;
			min_priority = priority;
		}
	}

	return accepted;
}

/**
 * Returns `true` if the request contains a `content-type` header with the given type
 * @param {Request} request
 * @param  {...string} types
 */
function is_content_type(request, ...types) {
	const type = request.headers.get('content-type')?.split(';', 1)[0].trim() ?? '';
	return types.includes(type);
}

/**
 * @param {Request} request
 */
function is_form_content_type(request) {
	return is_content_type(request, 'application/x-www-form-urlencoded', 'multipart/form-data');
}

/**
 * @param {unknown} err
 * @return {Error}
 */
function coalesce_to_error(err) {
	return err instanceof Error ||
		(err && /** @type {any} */ (err).name && /** @type {any} */ (err).message)
		? /** @type {Error} */ (err)
		: new Error(JSON.stringify(err));
}

/**
 * This is an identity function that exists to make TypeScript less
 * paranoid about people throwing things that aren't errors, which
 * frankly is not something we should care about
 * @param {unknown} error
 */
function normalize_error(error) {
	return /** @type {Redirect | HttpError | Error} */ (error);
}

/**
 * @param {string} path
 * @param {import('types').TrailingSlash} trailing_slash
 */
function normalize_path(path, trailing_slash) {
	if (path === '/' || trailing_slash === 'ignore') return path;

	if (trailing_slash === 'never') {
		return path.endsWith('/') ? path.slice(0, -1) : path;
	} else if (trailing_slash === 'always' && !path.endsWith('/')) {
		return path + '/';
	}

	return path;
}

/**
 * Decode pathname excluding %25 to prevent further double decoding of params
 * @param {string} pathname
 */
function decode_pathname(pathname) {
	return pathname.split('%25').map(decodeURI).join('%25');
}

/** @param {Record<string, string>} params */
function decode_params(params) {
	for (const key in params) {
		// input has already been decoded by decodeURI
		// now handle the rest
		params[key] = decodeURIComponent(params[key]);
	}

	return params;
}

/**
 * URL properties that could change during the lifetime of the page,
 * which excludes things like `origin`
 * @type {Array<keyof URL>}
 */
const tracked_url_properties = ['href', 'pathname', 'search', 'searchParams', 'toString', 'toJSON'];

/**
 * @param {URL} url
 * @param {() => void} callback
 */
function make_trackable(url, callback) {
	const tracked = new URL(url);

	for (const property of tracked_url_properties) {
		let value = tracked[property];

		Object.defineProperty(tracked, property, {
			get() {
				callback();
				return value;
			},

			enumerable: true,
			configurable: true
		});
	}

	{
		// @ts-ignore
		tracked[Symbol.for('nodejs.util.inspect.custom')] = (depth, opts, inspect) => {
			return inspect(url, opts);
		};
	}

	disable_hash(tracked);

	return tracked;
}

/**
 * Disallow access to `url.hash` on the server and in `load`
 * @param {URL} url
 */
function disable_hash(url) {
	Object.defineProperty(url, 'hash', {
		get() {
			throw new Error(
				'Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead'
			);
		}
	});
}

/**
 * Disallow access to `url.search` and `url.searchParams` during prerendering
 * @param {URL} url
 */
function disable_search(url) {
	for (const property of ['search', 'searchParams']) {
		Object.defineProperty(url, property, {
			get() {
				throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
			}
		});
	}
}

const DATA_SUFFIX = '/__data.json';

/** @param {string} pathname */
function has_data_suffix(pathname) {
	return pathname.endsWith(DATA_SUFFIX);
}

/** @param {string} pathname */
function add_data_suffix(pathname) {
	return pathname.replace(/\/$/, '') + DATA_SUFFIX;
}

/** @param {string} pathname */
function strip_data_suffix(pathname) {
	return pathname.slice(0, -DATA_SUFFIX.length);
}

/** @type {import('types').SSRErrorPage} */
const GENERIC_ERROR = {
	id: '__error'
};

/**
 * @param {Partial<Record<import('types').HttpMethod, any>>} mod
 * @param {import('types').HttpMethod} method
 */
function method_not_allowed(mod, method) {
	return new Response(`${method} method not allowed`, {
		status: 405,
		headers: {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
			// "The server must generate an Allow header field in a 405 status code response"
			allow: allowed_methods(mod).join(', ')
		}
	});
}

/** @param {Partial<Record<import('types').HttpMethod, any>>} mod */
function allowed_methods(mod) {
	const allowed = [];

	for (const method in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
		if (method in mod) allowed.push(method);
	}

	if (mod.GET || mod.HEAD) allowed.push('HEAD');

	return allowed;
}

/**
 * @template {'prerender' | 'ssr' | 'csr' | 'trailingSlash'} Option
 * @template {Option extends 'prerender' ? import('types').PrerenderOption : Option extends 'trailingSlash' ? import('types').TrailingSlash : boolean} Value
 *
 * @param {Array<import('types').SSRNode | undefined>} nodes
 * @param {Option} option
 *
 * @returns {Value | undefined}
 */
function get_option(nodes, option) {
	return nodes.reduce((value, node) => {
		return /** @type {any} TypeScript's too dumb to understand this */ (
			node?.universal?.[option] ?? node?.server?.[option] ?? value
		);
	}, /** @type {Value | undefined} */ (undefined));
}

/**
 * Return as a response that renders the error.html
 *
 * @param {import('types').SSROptions} options
 * @param {number} status
 * @param {string} message
 */
function static_error_page(options, status, message) {
	return new Response(options.error_template({ status, message }), {
		headers: { 'content-type': 'text/html; charset=utf-8' },
		status
	});
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSROptions} options
 * @param {unknown} error
 */
async function handle_fatal_error(event, options, error) {
	error = error instanceof HttpError ? error : coalesce_to_error(error);
	const status = error instanceof HttpError ? error.status : 500;
	const body = await handle_error_and_jsonify(event, options, error);

	// ideally we'd use sec-fetch-dest instead, but Safari — quelle surprise — doesn't support it
	const type = negotiate(event.request.headers.get('accept') || 'text/html', [
		'application/json',
		'text/html'
	]);

	if (has_data_suffix(new URL(event.request.url).pathname) || type === 'application/json') {
		return new Response(JSON.stringify(body), {
			status,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}

	return static_error_page(options, status, body.message);
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSROptions} options
 * @param {any} error
 * @returns {import('types').MaybePromise<App.Error>}
 */
function handle_error_and_jsonify(event, options, error) {
	if (error instanceof HttpError) {
		return error.body;
	} else {
		return options.handle_error(error, event);
	}
}

/**
 * @param {number} status
 * @param {string} location
 */
function redirect_response(status, location) {
	const response = new Response(undefined, {
		status,
		headers: { location }
	});
	return response;
}

/**
 * @param {import('types').RequestEvent} event
 * @param {Error & { path: string }} error
 */
function clarify_devalue_error(event, error) {
	if (error.path) {
		return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
	}

	if (error.path === '') {
		return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
	}

	// belt and braces — this should never happen
	return error.message;
}

/** @param {import('types').ServerDataNode | import('types').ServerDataSkippedNode | import('types').ServerErrorNode | null} node */
function serialize_data_node(node) {
	if (!node) return 'null';

	if (node.type === 'error' || node.type === 'skip') {
		return JSON.stringify(node);
	}

	const stringified = stringify(node.data);

	const uses = [];

	if (node.uses.dependencies.size > 0) {
		uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
	}

	if (node.uses.params.size > 0) {
		uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
	}

	if (node.uses.parent) uses.push(`"parent":1`);
	if (node.uses.route) uses.push(`"route":1`);
	if (node.uses.url) uses.push(`"url":1`);

	return `{"type":"data","data":${stringified},"uses":{${uses.join(',')}}${
		node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ''
	}}`;
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSREndpoint} mod
 * @param {import('types').SSRState} state
 * @returns {Promise<Response>}
 */
async function render_endpoint(event, mod, state) {
	const method = /** @type {import('types').HttpMethod} */ (event.request.method);

	let handler = mod[method];

	if (!handler && method === 'HEAD') {
		handler = mod.GET;
	}

	if (!handler) {
		return method_not_allowed(mod, method);
	}

	const prerender = mod.prerender ?? state.prerender_default;

	if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
		throw new Error('Cannot prerender endpoints that have mutative methods');
	}

	if (state.prerendering && !prerender) {
		if (state.initiator) {
			// if request came from a prerendered page, bail
			throw new Error(`${event.route.id} is not prerenderable`);
		} else {
			// if request came direct from the crawler, signal that
			// this route cannot be prerendered, but don't bail
			return new Response(undefined, { status: 204 });
		}
	}

	try {
		const response = await handler(
			/** @type {import('types').RequestEvent<Record<string, any>>} */ (event)
		);

		if (!(response instanceof Response)) {
			throw new Error(
				`Invalid response from route ${event.url.pathname}: handler should return a Response object`
			);
		}

		if (state.prerendering) {
			response.headers.set('x-sveltekit-prerender', String(prerender));
		}

		return response;
	} catch (error) {
		if (error instanceof Redirect) {
			return new Response(undefined, {
				status: error.status,
				headers: { location: error.location }
			});
		}

		throw error;
	}
}

/**
 * @param {import('types').RequestEvent} event
 */
function is_endpoint_request(event) {
	const { method, headers } = event.request;

	if (method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
		// These methods exist exclusively for endpoints
		return true;
	}

	// use:enhance uses a custom header to disambiguate
	if (method === 'POST' && headers.get('x-sveltekit-action') === 'true') return false;

	// GET/POST requests may be for endpoints or pages. We prefer endpoints if this isn't a text/html request
	const accept = event.request.headers.get('accept') ?? '*/*';
	return negotiate(accept, ['*', 'text/html']) !== 'text/html';
}

/**
 * Removes nullish values from an array.
 *
 * @template T
 * @param {Array<T>} arr
 */
function compact(arr) {
	return arr.filter(/** @returns {val is NonNullable<T>} */ (val) => val != null);
}

/** @param {import('types').RequestEvent} event */
function is_action_json_request(event) {
	const accept = negotiate(event.request.headers.get('accept') ?? '*/*', [
		'application/json',
		'text/html'
	]);

	return accept === 'application/json' && event.request.method === 'POST';
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSROptions} options
 * @param {import('types').SSRNode['server'] | undefined} server
 */
async function handle_action_json_request(event, options, server) {
	const actions = server?.actions;

	if (!actions) {
		if (server) {
			maybe_throw_migration_error(server);
		}
		// TODO should this be a different error altogether?
		const no_actions_error = error(405, 'POST method not allowed. No actions exist for this page');
		return action_json(
			{
				type: 'error',
				error: await handle_error_and_jsonify(event, options, no_actions_error)
			},
			{
				status: no_actions_error.status,
				headers: {
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
					// "The server must generate an Allow header field in a 405 status code response"
					allow: 'GET'
				}
			}
		);
	}

	check_named_default_separate(actions);

	try {
		const data = await call_action(event, actions);

		if (data instanceof ActionFailure) {
			return action_json({
				type: 'failure',
				status: data.status,
				// @ts-expect-error we assign a string to what is supposed to be an object. That's ok
				// because we don't use the object outside, and this way we have better code navigation
				// through knowing where the related interface is used.
				data: stringify_action_response(data.data, /** @type {string} */ (event.route.id))
			});
		} else {
			return action_json({
				type: 'success',
				status: data ? 200 : 204,
				// @ts-expect-error see comment above
				data: stringify_action_response(data, /** @type {string} */ (event.route.id))
			});
		}
	} catch (e) {
		const error = normalize_error(e);

		if (error instanceof Redirect) {
			return action_json({
				type: 'redirect',
				status: error.status,
				location: error.location
			});
		}

		return action_json(
			{
				type: 'error',
				error: await handle_error_and_jsonify(event, options, check_incorrect_fail_use(error))
			},
			{
				status: error instanceof HttpError ? error.status : 500
			}
		);
	}
}

/**
 * @param {HttpError | Error} error
 */
function check_incorrect_fail_use(error) {
	return error instanceof ActionFailure
		? new Error(`Cannot "throw fail()". Use "return fail()"`)
		: error;
}

/**
 * @param {import('types').ActionResult} data
 * @param {ResponseInit} [init]
 */
function action_json(data, init) {
	return json(data, init);
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSRNode} leaf_node
 */
function is_action_request(event, leaf_node) {
	return leaf_node.server && event.request.method !== 'GET' && event.request.method !== 'HEAD';
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSRNode['server']} server
 * @returns {Promise<import('types').ActionResult>}
 */
async function handle_action_request(event, server) {
	const actions = server.actions;

	if (!actions) {
		maybe_throw_migration_error(server);
		// TODO should this be a different error altogether?
		event.setHeaders({
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
			// "The server must generate an Allow header field in a 405 status code response"
			allow: 'GET'
		});
		return {
			type: 'error',
			error: error(405, 'POST method not allowed. No actions exist for this page')
		};
	}

	check_named_default_separate(actions);

	try {
		const data = await call_action(event, actions);

		if (data instanceof ActionFailure) {
			return { type: 'failure', status: data.status, data: data.data };
		} else {
			return {
				type: 'success',
				status: 200,
				data: /** @type {Record<string, any> | undefined} */ (data)
			};
		}
	} catch (e) {
		const error = normalize_error(e);

		if (error instanceof Redirect) {
			return {
				type: 'redirect',
				status: error.status,
				location: error.location
			};
		}

		return {
			type: 'error',
			error: check_incorrect_fail_use(error)
		};
	}
}

/**
 * @param {import('types').Actions} actions
 */
function check_named_default_separate(actions) {
	if (actions.default && Object.keys(actions).length > 1) {
		throw new Error(
			`When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
		);
	}
}

/**
 * @param {import('types').RequestEvent} event
 * @param {NonNullable<import('types').SSRNode['server']['actions']>} actions
 * @throws {Redirect | ActionFailure | HttpError | Error}
 */
async function call_action(event, actions) {
	const url = new URL(event.request.url);

	let name = 'default';
	for (const param of url.searchParams) {
		if (param[0].startsWith('/')) {
			name = param[0].slice(1);
			if (name === 'default') {
				throw new Error('Cannot use reserved action name "default"');
			}
			break;
		}
	}

	const action = actions[name];
	if (!action) {
		throw new Error(`No action with name '${name}' found`);
	}

	if (!is_form_content_type(event.request)) {
		throw new Error(
			`Actions expect form-encoded data (received ${event.request.headers.get('content-type')}`
		);
	}

	return action(event);
}

/**
 * @param {import('types').SSRNode['server']} server
 */
function maybe_throw_migration_error(server) {
	for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
		if (/** @type {any} */ (server)[method]) {
			throw new Error(
				`${method} method no longer allowed in +page.server, use actions instead. See the PR for more info: https://github.com/sveltejs/kit/pull/6469`
			);
		}
	}
}

/**
 * Try to `devalue.uneval` the data object, and if it fails, return a proper Error with context
 * @param {any} data
 * @param {string} route_id
 */
function uneval_action_response(data, route_id) {
	return try_deserialize(data, uneval, route_id);
}

/**
 * Try to `devalue.stringify` the data object, and if it fails, return a proper Error with context
 * @param {any} data
 * @param {string} route_id
 */
function stringify_action_response(data, route_id) {
	return try_deserialize(data, stringify, route_id);
}

/**
 * @param {any} data
 * @param {(data: any) => string} fn
 * @param {string} route_id
 */
function try_deserialize(data, fn, route_id) {
	try {
		return fn(data);
	} catch (e) {
		// If we're here, the data could not be serialized with devalue
		const error = /** @type {any} */ (e);

		if ('path' in error) {
			let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
			if (error.path !== '') message += ` (data.${error.path})`;
			throw new Error(message);
		}

		throw error;
	}
}

/**
 * Given an object, return a new object where all top level values are awaited
 *
 * @param {Record<string, any>} object
 * @returns {Promise<Record<string, any>>}
 */
async function unwrap_promises(object) {
	for (const key in object) {
		if (typeof object[key]?.then === 'function') {
			return Object.fromEntries(
				await Promise.all(Object.entries(object).map(async ([key, value]) => [key, await value]))
			);
		}
	}

	return object;
}

/**
 * Calls the user's server `load` function.
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: import('types').SSROptions;
 *   state: import('types').SSRState;
 *   node: import('types').SSRNode | undefined;
 *   parent: () => Promise<Record<string, any>>;
 * }} opts
 * @returns {Promise<import('types').ServerDataNode | null>}
 */
async function load_server_data({ event, options, state, node, parent }) {
	if (!node?.server) return null;

	const uses = {
		dependencies: new Set(),
		params: new Set(),
		parent: false,
		route: false,
		url: false
	};

	const url = make_trackable(event.url, () => {
		uses.url = true;
	});

	if (state.prerendering) {
		disable_search(url);
	}

	const result = await node.server.load?.call(null, {
		...event,
		/** @param {string[]} deps */
		depends: (...deps) => {
			for (const dep of deps) {
				const { href } = new URL(dep, event.url);
				uses.dependencies.add(href);
			}
		},
		params: new Proxy(event.params, {
			get: (target, key) => {
				uses.params.add(key);
				return target[/** @type {string} */ (key)];
			}
		}),
		parent: async () => {
			uses.parent = true;
			return parent();
		},
		route: {
			get id() {
				uses.route = true;
				return event.route.id;
			}
		},
		url
	});

	const data = result ? await unwrap_promises(result) : null;
	if (options.dev) {
		validate_load_response(data, /** @type {string} */ (event.route.id));
	}

	return {
		type: 'data',
		data,
		uses,
		slash: node.server.trailingSlash
	};
}

/**
 * Calls the user's `load` function.
 * @param {{
 *   event: import('types').RequestEvent;
 *   fetched: import('./types').Fetched[];
 *   node: import('types').SSRNode | undefined;
 *   parent: () => Promise<Record<string, any>>;
 *   resolve_opts: import('types').RequiredResolveOptions;
 *   server_data_promise: Promise<import('types').ServerDataNode | null>;
 *   state: import('types').SSRState;
 *   csr: boolean;
 * }} opts
 * @returns {Promise<Record<string, any> | null>}
 */
async function load_data({
	event,
	fetched,
	node,
	parent,
	server_data_promise,
	state,
	resolve_opts,
	csr
}) {
	const server_data_node = await server_data_promise;

	if (!node?.universal?.load) {
		return server_data_node?.data ?? null;
	}

	const result = await node.universal.load.call(null, {
		url: event.url,
		params: event.params,
		data: server_data_node?.data ?? null,
		route: event.route,
		fetch: async (input, init) => {
			const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
			const response = await event.fetch(input, init);

			const url = new URL(input instanceof Request ? input.url : input, event.url);
			const same_origin = url.origin === event.url.origin;

			/** @type {import('types').PrerenderDependency} */
			let dependency;

			if (same_origin) {
				if (state.prerendering) {
					dependency = { response, body: null };
					state.prerendering.dependencies.set(url.pathname, dependency);
				}
			} else {
				// simulate CORS errors server-side for consistency with client-side behaviour
				const mode = input instanceof Request ? input.mode : init?.mode ?? 'cors';
				if (mode !== 'no-cors') {
					const acao = response.headers.get('access-control-allow-origin');
					if (!acao || (acao !== event.url.origin && acao !== '*')) {
						throw new Error(
							`CORS error: ${
								acao ? 'Incorrect' : 'No'
							} 'Access-Control-Allow-Origin' header is present on the requested resource`
						);
					}
				}
			}

			const proxy = new Proxy(response, {
				get(response, key, _receiver) {
					async function text() {
						const body = await response.text();

						if (!body || typeof body === 'string') {
							const status_number = Number(response.status);
							if (isNaN(status_number)) {
								throw new Error(
									`response.status is not a number. value: "${
										response.status
									}" type: ${typeof response.status}`
								);
							}

							fetched.push({
								url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
								method: event.request.method,
								request_body: /** @type {string | ArrayBufferView | undefined} */ (
									input instanceof Request && cloned_body
										? await stream_to_string(cloned_body)
										: init?.body
								),
								response_body: body,
								response: response
							});
						}

						if (dependency) {
							dependency.body = body;
						}

						return body;
					}

					if (key === 'arrayBuffer') {
						return async () => {
							const buffer = await response.arrayBuffer();

							if (dependency) {
								dependency.body = new Uint8Array(buffer);
							}

							// TODO should buffer be inlined into the page (albeit base64'd)?
							// any conditions in which it shouldn't be?

							return buffer;
						};
					}

					if (key === 'text') {
						return text;
					}

					if (key === 'json') {
						return async () => {
							return JSON.parse(await text());
						};
					}

					return Reflect.get(response, key, response);
				}
			});

			if (csr) {
				// ensure that excluded headers can't be read
				const get = response.headers.get;
				response.headers.get = (key) => {
					const lower = key.toLowerCase();
					const value = get.call(response.headers, lower);
					if (value && !lower.startsWith('x-sveltekit-')) {
						const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
						if (!included) {
							throw new Error(
								`Failed to get response header "${lower}" — it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route})`
							);
						}
					}

					return value;
				};
			}

			return proxy;
		},
		setHeaders: event.setHeaders,
		depends: () => {},
		parent
	});

	const data = result ? await unwrap_promises(result) : null;
	validate_load_response(data, /** @type {string} */ (event.route.id));
	return data;
}

/**
 * @param {ReadableStream<Uint8Array>} stream
 */
async function stream_to_string(stream) {
	let result = '';
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		result += decoder.decode(value);
	}
	return result;
}

/**
 * @param {any} data
 * @param {string} [routeId]
 */
function validate_load_response(data, routeId) {
	if (data != null && Object.getPrototypeOf(data) !== Object.prototype) {
		throw new Error(
			`a load function related to route '${routeId}' returned ${
				typeof data !== 'object'
					? `a ${typeof data}`
					: data instanceof Response
					? 'a Response object'
					: Array.isArray(data)
					? 'an array'
					: 'a non-plain object'
			}, but must return a plain object at the top level (i.e. \`return {...}\`)`
		);
	}
}

/**
 * Hash using djb2
 * @param {import('types').StrictBody} value
 */
function hash(value) {
	let hash = 5381;

	if (typeof value === 'string') {
		let i = value.length;
		while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
	} else if (ArrayBuffer.isView(value)) {
		const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
		let i = buffer.length;
		while (i) hash = (hash * 33) ^ buffer[--i];
	} else {
		throw new TypeError('value must be a string or TypedArray');
	}

	return (hash >>> 0).toString(36);
}

/**
 * When inside a double-quoted attribute value, only `&` and `"` hold special meaning.
 * @see https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(double-quoted)-state
 * @type {Record<string, string>}
 */
const escape_html_attr_dict = {
	'&': '&amp;',
	'"': '&quot;'
};

const escape_html_attr_regex = new RegExp(
	// special characters
	`[${Object.keys(escape_html_attr_dict).join('')}]|` +
		// high surrogate without paired low surrogate
		'[\\ud800-\\udbff](?![\\udc00-\\udfff])|' +
		// a valid surrogate pair, the only match with 2 code units
		// we match it so that we can match unpaired low surrogates in the same pass
		// TODO: use lookbehind assertions once they are widely supported: (?<![\ud800-udbff])[\udc00-\udfff]
		'[\\ud800-\\udbff][\\udc00-\\udfff]|' +
		// unpaired low surrogate (see previous match)
		'[\\udc00-\\udfff]',
	'g'
);

/**
 * Formats a string to be used as an attribute's value in raw HTML.
 *
 * It escapes unpaired surrogates (which are allowed in js strings but invalid in HTML), escapes
 * characters that are special in attributes, and surrounds the whole string in double-quotes.
 *
 * @param {string} str
 * @returns {string} Escaped string surrounded by double-quotes.
 * @example const html = `<tag data-value=${escape_html_attr('value')}>...</tag>`;
 */
function escape_html_attr(str) {
	const escaped_str = str.replace(escape_html_attr_regex, (match) => {
		if (match.length === 2) {
			// valid surrogate pair
			return match;
		}

		return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
	});

	return `"${escaped_str}"`;
}

/**
 * Inside a script element, only `</script` and `<!--` hold special meaning to the HTML parser.
 *
 * The first closes the script element, so everything after is treated as raw HTML.
 * The second disables further parsing until `-->`, so the script element might be unexpectedly
 * kept open until until an unrelated HTML comment in the page.
 *
 * U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR are escaped for the sake of pre-2018
 * browsers.
 *
 * @see tests for unsafe parsing examples.
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 * @see https://html.spec.whatwg.org/multipage/syntax.html#cdata-rcdata-restrictions
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-state
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-double-escaped-state
 * @see https://github.com/tc39/proposal-json-superset
 * @type {Record<string, string>}
 */
const replacements = {
	'<': '\\u003C',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};

const pattern = new RegExp(`[${Object.keys(replacements).join('')}]`, 'g');

/**
 * Generates a raw HTML string containing a safe script element carrying data and associated attributes.
 *
 * It escapes all the special characters needed to guarantee the element is unbroken, but care must
 * be taken to ensure it is inserted in the document at an acceptable position for a script element,
 * and that the resulting string isn't further modified.
 *
 * @param {import('./types.js').Fetched} fetched
 * @param {(name: string, value: string) => boolean} filter
 * @param {boolean} [prerendering]
 * @returns {string} The raw HTML of a script element carrying the JSON payload.
 * @example const html = serialize_data('/data.json', null, { foo: 'bar' });
 */
function serialize_data(fetched, filter, prerendering = false) {
	/** @type {Record<string, string>} */
	const headers = {};

	let cache_control = null;
	let age = null;

	for (const [key, value] of fetched.response.headers) {
		if (filter(key, value)) {
			headers[key] = value;
		}

		if (key === 'cache-control') cache_control = value;
		if (key === 'age') age = value;
	}

	const payload = {
		status: fetched.response.status,
		statusText: fetched.response.statusText,
		headers,
		body: fetched.response_body
	};

	const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);

	const attrs = [
		'type="application/json"',
		'data-sveltekit-fetched',
		`data-url=${escape_html_attr(fetched.url)}`
	];

	if (fetched.request_body) {
		attrs.push(`data-hash=${escape_html_attr(hash(fetched.request_body))}`);
	}

	if (!prerendering && fetched.method === 'GET' && cache_control) {
		const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
		if (match) {
			const ttl = +match[1] - +(age ?? '0');
			attrs.push(`data-ttl="${ttl}"`);
		}
	}

	return `<script ${attrs.join(' ')}>${safe_payload}</script>`;
}

const s = JSON.stringify;

const encoder = new TextEncoder();

/**
 * SHA-256 hashing function adapted from https://bitwiseshiftleft.github.io/sjcl
 * modified and redistributed under BSD license
 * @param {string} data
 */
function sha256(data) {
	if (!key[0]) precompute();

	const out = init.slice(0);
	const array = encode(data);

	for (let i = 0; i < array.length; i += 16) {
		const w = array.subarray(i, i + 16);

		let tmp;
		let a;
		let b;

		let out0 = out[0];
		let out1 = out[1];
		let out2 = out[2];
		let out3 = out[3];
		let out4 = out[4];
		let out5 = out[5];
		let out6 = out[6];
		let out7 = out[7];

		/* Rationale for placement of |0 :
		 * If a value can overflow is original 32 bits by a factor of more than a few
		 * million (2^23 ish), there is a possibility that it might overflow the
		 * 53-bit mantissa and lose precision.
		 *
		 * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
		 * propagates around the loop, and on the hash state out[]. I don't believe
		 * that the clamps on out4 and on out0 are strictly necessary, but it's close
		 * (for out4 anyway), and better safe than sorry.
		 *
		 * The clamps on out[] are necessary for the output to be correct even in the
		 * common case and for short inputs.
		 */

		for (let i = 0; i < 64; i++) {
			// load up the input word for this round

			if (i < 16) {
				tmp = w[i];
			} else {
				a = w[(i + 1) & 15];

				b = w[(i + 14) & 15];

				tmp = w[i & 15] =
					(((a >>> 7) ^ (a >>> 18) ^ (a >>> 3) ^ (a << 25) ^ (a << 14)) +
						((b >>> 17) ^ (b >>> 19) ^ (b >>> 10) ^ (b << 15) ^ (b << 13)) +
						w[i & 15] +
						w[(i + 9) & 15]) |
					0;
			}

			tmp =
				tmp +
				out7 +
				((out4 >>> 6) ^ (out4 >>> 11) ^ (out4 >>> 25) ^ (out4 << 26) ^ (out4 << 21) ^ (out4 << 7)) +
				(out6 ^ (out4 & (out5 ^ out6))) +
				key[i]; // | 0;

			// shift register
			out7 = out6;
			out6 = out5;
			out5 = out4;

			out4 = (out3 + tmp) | 0;

			out3 = out2;
			out2 = out1;
			out1 = out0;

			out0 =
				(tmp +
					((out1 & out2) ^ (out3 & (out1 ^ out2))) +
					((out1 >>> 2) ^
						(out1 >>> 13) ^
						(out1 >>> 22) ^
						(out1 << 30) ^
						(out1 << 19) ^
						(out1 << 10))) |
				0;
		}

		out[0] = (out[0] + out0) | 0;
		out[1] = (out[1] + out1) | 0;
		out[2] = (out[2] + out2) | 0;
		out[3] = (out[3] + out3) | 0;
		out[4] = (out[4] + out4) | 0;
		out[5] = (out[5] + out5) | 0;
		out[6] = (out[6] + out6) | 0;
		out[7] = (out[7] + out7) | 0;
	}

	const bytes = new Uint8Array(out.buffer);
	reverse_endianness(bytes);

	return base64(bytes);
}

/** The SHA-256 initialization vector */
const init = new Uint32Array(8);

/** The SHA-256 hash key */
const key = new Uint32Array(64);

/** Function to precompute init and key. */
function precompute() {
	/** @param {number} x */
	function frac(x) {
		return (x - Math.floor(x)) * 0x100000000;
	}

	let prime = 2;

	for (let i = 0; i < 64; prime++) {
		let is_prime = true;

		for (let factor = 2; factor * factor <= prime; factor++) {
			if (prime % factor === 0) {
				is_prime = false;

				break;
			}
		}

		if (is_prime) {
			if (i < 8) {
				init[i] = frac(prime ** (1 / 2));
			}

			key[i] = frac(prime ** (1 / 3));

			i++;
		}
	}
}

/** @param {Uint8Array} bytes */
function reverse_endianness(bytes) {
	for (let i = 0; i < bytes.length; i += 4) {
		const a = bytes[i + 0];
		const b = bytes[i + 1];
		const c = bytes[i + 2];
		const d = bytes[i + 3];

		bytes[i + 0] = d;
		bytes[i + 1] = c;
		bytes[i + 2] = b;
		bytes[i + 3] = a;
	}
}

/** @param {string} str */
function encode(str) {
	const encoded = encoder.encode(str);
	const length = encoded.length * 8;

	// result should be a multiple of 512 bits in length,
	// with room for a 1 (after the data) and two 32-bit
	// words containing the original input bit length
	const size = 512 * Math.ceil((length + 65) / 512);
	const bytes = new Uint8Array(size / 8);
	bytes.set(encoded);

	// append a 1
	bytes[encoded.length] = 0b10000000;

	reverse_endianness(bytes);

	// add the input bit length
	const words = new Uint32Array(bytes.buffer);
	words[words.length - 2] = Math.floor(length / 0x100000000); // this will always be zero for us
	words[words.length - 1] = length;

	return words;
}

/*
	Based on https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727

	MIT License
	Copyright (c) 2020 Egor Nepomnyaschih
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/** @param {Uint8Array} bytes */
function base64(bytes) {
	const l = bytes.length;

	let result = '';
	let i;

	for (i = 2; i < l; i += 3) {
		result += chars[bytes[i - 2] >> 2];
		result += chars[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
		result += chars[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
		result += chars[bytes[i] & 0x3f];
	}

	if (i === l + 1) {
		// 1 octet yet to write
		result += chars[bytes[i - 2] >> 2];
		result += chars[(bytes[i - 2] & 0x03) << 4];
		result += '==';
	}

	if (i === l) {
		// 2 octets yet to write
		result += chars[bytes[i - 2] >> 2];
		result += chars[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
		result += chars[(bytes[i - 1] & 0x0f) << 2];
		result += '=';
	}

	return result;
}

const array = new Uint8Array(16);

function generate_nonce() {
	crypto.getRandomValues(array);
	return base64(array);
}

const quoted = new Set([
	'self',
	'unsafe-eval',
	'unsafe-hashes',
	'unsafe-inline',
	'none',
	'strict-dynamic',
	'report-sample',
	'wasm-unsafe-eval'
]);

const crypto_pattern = /^(nonce|sha\d\d\d)-/;

// CSP and CSP Report Only are extremely similar with a few caveats
// the easiest/DRYest way to express this is with some private encapsulation
class BaseProvider {
	/** @type {boolean} */
	#use_hashes;

	/** @type {boolean} */
	#script_needs_csp;

	/** @type {boolean} */
	#style_needs_csp;

	/** @type {import('types').CspDirectives} */
	#directives;

	/** @type {import('types').Csp.Source[]} */
	#script_src;

	/** @type {import('types').Csp.Source[]} */
	#style_src;

	/** @type {string} */
	#nonce;

	/**
	 * @param {boolean} use_hashes
	 * @param {import('types').CspDirectives} directives
	 * @param {string} nonce
	 * @param {boolean} dev
	 */
	constructor(use_hashes, directives, nonce, dev) {
		this.#use_hashes = use_hashes;
		this.#directives = dev ? { ...directives } : directives; // clone in dev so we can safely mutate

		const d = this.#directives;

		if (dev) {
			// remove strict-dynamic in dev...
			// TODO reinstate this if we can figure out how to make strict-dynamic work
			// if (d['default-src']) {
			// 	d['default-src'] = d['default-src'].filter((name) => name !== 'strict-dynamic');
			// 	if (d['default-src'].length === 0) delete d['default-src'];
			// }

			// if (d['script-src']) {
			// 	d['script-src'] = d['script-src'].filter((name) => name !== 'strict-dynamic');
			// 	if (d['script-src'].length === 0) delete d['script-src'];
			// }

			const effective_style_src = d['style-src'] || d['default-src'];

			// ...and add unsafe-inline so we can inject <style> elements
			if (effective_style_src && !effective_style_src.includes('unsafe-inline')) {
				d['style-src'] = [...effective_style_src, 'unsafe-inline'];
			}
		}

		this.#script_src = [];
		this.#style_src = [];

		const effective_script_src = d['script-src'] || d['default-src'];
		const effective_style_src = d['style-src'] || d['default-src'];

		this.#script_needs_csp =
			!!effective_script_src &&
			effective_script_src.filter((value) => value !== 'unsafe-inline').length > 0;

		this.#style_needs_csp =
			!dev &&
			!!effective_style_src &&
			effective_style_src.filter((value) => value !== 'unsafe-inline').length > 0;

		this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
		this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
		this.#nonce = nonce;
	}

	/** @param {string} content */
	add_script(content) {
		if (this.#script_needs_csp) {
			if (this.#use_hashes) {
				this.#script_src.push(`sha256-${sha256(content)}`);
			} else if (this.#script_src.length === 0) {
				this.#script_src.push(`nonce-${this.#nonce}`);
			}
		}
	}

	/** @param {string} content */
	add_style(content) {
		if (this.#style_needs_csp) {
			if (this.#use_hashes) {
				this.#style_src.push(`sha256-${sha256(content)}`);
			} else if (this.#style_src.length === 0) {
				this.#style_src.push(`nonce-${this.#nonce}`);
			}
		}
	}

	/**
	 * @param {boolean} [is_meta]
	 */
	get_header(is_meta = false) {
		const header = [];

		// due to browser inconsistencies, we can't append sources to default-src
		// (specifically, Firefox appears to not ignore nonce-{nonce} directives
		// on default-src), so we ensure that script-src and style-src exist

		const directives = { ...this.#directives };

		if (this.#style_src.length > 0) {
			directives['style-src'] = [
				...(directives['style-src'] || directives['default-src'] || []),
				...this.#style_src
			];
		}

		if (this.#script_src.length > 0) {
			directives['script-src'] = [
				...(directives['script-src'] || directives['default-src'] || []),
				...this.#script_src
			];
		}

		for (const key in directives) {
			if (is_meta && (key === 'frame-ancestors' || key === 'report-uri' || key === 'sandbox')) {
				// these values cannot be used with a <meta> tag
				// TODO warn?
				continue;
			}

			// @ts-expect-error gimme a break typescript, `key` is obviously a member of internal_directives
			const value = /** @type {string[] | true} */ (directives[key]);

			if (!value) continue;

			const directive = [key];
			if (Array.isArray(value)) {
				value.forEach((value) => {
					if (quoted.has(value) || crypto_pattern.test(value)) {
						directive.push(`'${value}'`);
					} else {
						directive.push(value);
					}
				});
			}

			header.push(directive.join(' '));
		}

		return header.join('; ');
	}
}

class CspProvider extends BaseProvider {
	get_meta() {
		const content = escape_html_attr(this.get_header(true));
		return `<meta http-equiv="content-security-policy" content=${content}>`;
	}
}

class CspReportOnlyProvider extends BaseProvider {
	/**
	 * @param {boolean} use_hashes
	 * @param {import('types').CspDirectives} directives
	 * @param {string} nonce
	 * @param {boolean} dev
	 */
	constructor(use_hashes, directives, nonce, dev) {
		super(use_hashes, directives, nonce, dev);

		if (Object.values(directives).filter((v) => !!v).length > 0) {
			// If we're generating content-security-policy-report-only,
			// if there are any directives, we need a report-uri or report-to (or both)
			// else it's just an expensive noop.
			const has_report_to = directives['report-to']?.length ?? 0 > 0;
			const has_report_uri = directives['report-uri']?.length ?? 0 > 0;
			if (!has_report_to && !has_report_uri) {
				throw Error(
					'`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both'
				);
			}
		}
	}
}

class Csp {
	/** @readonly */
	nonce = generate_nonce();

	/** @type {CspProvider} */
	csp_provider;

	/** @type {CspReportOnlyProvider} */
	report_only_provider;

	/**
	 * @param {import('./types').CspConfig} config
	 * @param {import('./types').CspOpts} opts
	 */
	constructor({ mode, directives, reportOnly }, { prerender, dev }) {
		const use_hashes = mode === 'hash' || (mode === 'auto' && prerender);
		this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
		this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
	}

	get script_needs_nonce() {
		return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
	}

	get style_needs_nonce() {
		return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
	}

	/** @param {string} content */
	add_script(content) {
		this.csp_provider.add_script(content);
		this.report_only_provider.add_script(content);
	}

	/** @param {string} content */
	add_style(content) {
		this.csp_provider.add_style(content);
		this.report_only_provider.add_style(content);
	}
}

// TODO rename this function/module

const updated = {
	...readable(false),
	check: () => false
};

/**
 * Creates the HTML response.
 * @param {{
 *   branch: Array<import('./types').Loaded>;
 *   fetched: Array<import('./types').Fetched>;
 *   options: import('types').SSROptions;
 *   state: import('types').SSRState;
 *   page_config: { ssr: boolean; csr: boolean };
 *   status: number;
 *   error: App.Error | null;
 *   event: import('types').RequestEvent;
 *   resolve_opts: import('types').RequiredResolveOptions;
 *   action_result?: import('types').ActionResult;
 * }} opts
 */
async function render_response({
	branch,
	fetched,
	options,
	state,
	page_config,
	status,
	error = null,
	event,
	resolve_opts,
	action_result
}) {
	if (state.prerendering) {
		if (options.csp.mode === 'nonce') {
			throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
		}

		if (options.app_template_contains_nonce) {
			throw new Error('Cannot use prerendering if page template contains %sveltekit.nonce%');
		}
	}

	const { entry } = options.manifest._;

	const stylesheets = new Set(entry.stylesheets);
	const modulepreloads = new Set(entry.imports);
	const fonts = new Set(options.manifest._.entry.fonts);

	/** @type {Set<string>} */
	const link_header_preloads = new Set();

	/** @type {Map<string, string>} */
	// TODO if we add a client entry point one day, we will need to include inline_styles with the entry, otherwise stylesheets will be linked even if they are below inlineStyleThreshold
	const inline_styles = new Map();

	let rendered;

	const form_value =
		action_result?.type === 'success' || action_result?.type === 'failure'
			? action_result.data ?? null
			: null;

	if (page_config.ssr) {
		/** @type {Record<string, any>} */
		const props = {
			stores: {
				page: writable(null),
				navigating: writable(null),
				updated
			},
			components: await Promise.all(branch.map(({ node }) => node.component())),
			form: form_value
		};

		let data = {};

		// props_n (instead of props[n]) makes it easy to avoid
		// unnecessary updates for layout components
		for (let i = 0; i < branch.length; i += 1) {
			data = { ...data, ...branch[i].data };
			props[`data_${i}`] = data;
		}

		props.page = {
			error,
			params: /** @type {Record<string, any>} */ (event.params),
			route: event.route,
			status,
			url: event.url,
			data,
			form: form_value
		};

		rendered = options.root.render(props);

		for (const { node } of branch) {
			if (node.imports) {
				node.imports.forEach((url) => modulepreloads.add(url));
			}

			if (node.stylesheets) {
				node.stylesheets.forEach((url) => stylesheets.add(url));
			}

			if (node.fonts) {
				node.fonts.forEach((url) => fonts.add(url));
			}

			if (node.inline_styles) {
				Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
			}
		}
	} else {
		rendered = { head: '', html: '', css: { code: '', map: null } };
	}

	let head = '';
	let body = rendered.html;

	const csp = new Csp(options.csp, {
		dev: options.dev,
		prerender: !!state.prerendering
	});

	const target = hash(body);

	/**
	 * The prefix to use for static assets. Replaces `%sveltekit.assets%` in the template
	 * @type {string}
	 */
	let assets;

	if (options.paths.assets) {
		// if an asset path is specified, use it
		assets = options.paths.assets;
	} else if (state.prerendering?.fallback) {
		// if we're creating a fallback page, asset paths need to be root-relative
		assets = options.paths.base;
	} else {
		// otherwise we want asset paths to be relative to the page, so that they
		// will work in odd contexts like IPFS, the internet archive, and so on
		const segments = event.url.pathname.slice(options.paths.base.length).split('/').slice(2);
		assets = segments.length > 0 ? segments.map(() => '..').join('/') : '.';
	}

	/** @param {string} path */
	const prefixed = (path) => (path.startsWith('/') ? path : `${assets}/${path}`);

	const serialized = { data: '', form: 'null' };

	try {
		serialized.data = `[${branch
			.map(({ server_data }) => {
				if (server_data?.type === 'data') {
					const data = uneval(server_data.data);

					const uses = [];
					if (server_data.uses.dependencies.size > 0) {
						uses.push(`dependencies:${s(Array.from(server_data.uses.dependencies))}`);
					}

					if (server_data.uses.params.size > 0) {
						uses.push(`params:${s(Array.from(server_data.uses.params))}`);
					}

					if (server_data.uses.parent) uses.push(`parent:1`);
					if (server_data.uses.route) uses.push(`route:1`);
					if (server_data.uses.url) uses.push(`url:1`);

					return `{type:"data",data:${data},uses:{${uses.join(',')}}${
						server_data.slash ? `,slash:${s(server_data.slash)}` : ''
					}}`;
				}

				return s(server_data);
			})
			.join(',')}]`;
	} catch (e) {
		const error = /** @type {any} */ (e);
		throw new Error(clarify_devalue_error(event, error));
	}

	if (form_value) {
		serialized.form = uneval_action_response(form_value, /** @type {string} */ (event.route.id));
	}

	if (inline_styles.size > 0) {
		const content = Array.from(inline_styles.values()).join('\n');

		const attributes = [];
		if (options.dev) attributes.push(' data-sveltekit');
		if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);

		csp.add_style(content);

		head += `\n\t<style${attributes.join('')}>${content}</style>`;
	}

	for (const dep of stylesheets) {
		const path = prefixed(dep);

		if (resolve_opts.preload({ type: 'css', path })) {
			const attributes = [];

			if (csp.style_needs_nonce) {
				attributes.push(`nonce="${csp.nonce}"`);
			}

			if (inline_styles.has(dep)) {
				// don't load stylesheets that are already inlined
				// include them in disabled state so that Vite can detect them and doesn't try to add them
				attributes.push('disabled', 'media="(max-width: 0)"');
			} else {
				const preload_atts = ['rel="preload"', 'as="style"'].concat(attributes);
				link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(';')}; nopush`);
			}

			attributes.unshift('rel="stylesheet"');
			head += `\n\t\t<link href="${path}" ${attributes.join(' ')}>`;
		}
	}

	for (const dep of fonts) {
		const path = prefixed(dep);

		if (resolve_opts.preload({ type: 'font', path })) {
			const ext = dep.slice(dep.lastIndexOf('.') + 1);
			const attributes = [
				'rel="preload"',
				'as="font"',
				`type="font/${ext}"`,
				`href="${path}"`,
				'crossorigin'
			];

			head += `\n\t\t<link ${attributes.join(' ')}>`;
		}
	}

	if (page_config.csr) {
		const opts = [
			`env: ${s(options.public_env)}`,
			`paths: ${s(options.paths)}`,
			`target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode`,
			`version: ${s(options.version)}`
		];

		if (page_config.ssr) {
			const hydrate = [
				`node_ids: [${branch.map(({ node }) => node.index).join(', ')}]`,
				`data: ${serialized.data}`,
				`form: ${serialized.form}`
			];

			if (status !== 200) {
				hydrate.push(`status: ${status}`);
			}

			if (error) {
				hydrate.push(`error: ${uneval(error)}`);
			}

			if (options.embedded) {
				hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
			}

			opts.push(`hydrate: {\n\t\t\t\t\t${hydrate.join(',\n\t\t\t\t\t')}\n\t\t\t\t}`);
		}

		// prettier-ignore
		const init_app = `
			import { start } from ${s(prefixed(entry.file))};

			start({
				${opts.join(',\n\t\t\t\t')}
			});
		`;

		for (const dep of modulepreloads) {
			const path = prefixed(dep);

			if (resolve_opts.preload({ type: 'js', path })) {
				link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
				if (state.prerendering) {
					head += `\n\t\t<link rel="modulepreload" href="${path}">`;
				}
			}
		}

		const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];

		csp.add_script(init_app);

		if (csp.script_needs_nonce) {
			attributes.push(`nonce="${csp.nonce}"`);
		}

		body += `\n\t\t<script ${attributes.join(' ')}>${init_app}</script>`;
	}

	if (page_config.ssr && page_config.csr) {
		body += `\n\t${fetched
			.map((item) =>
				serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
			)
			.join('\n\t')}`;
	}

	if (options.service_worker) {
		const opts = options.dev ? `, { type: 'module' }` : '';

		// we use an anonymous function instead of an arrow function to support
		// older browsers (https://github.com/sveltejs/kit/pull/5417)
		const init_service_worker = `
			if ('serviceWorker' in navigator) {
				addEventListener('load', function () {
					navigator.serviceWorker.register('${prefixed('service-worker.js')}'${opts});
				});
			}
		`;

		// always include service worker unless it's turned off explicitly
		csp.add_script(init_service_worker);

		head += `
		<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ''}>${init_service_worker}</script>`;
	}

	if (state.prerendering) {
		// TODO read headers set with setHeaders and convert into http-equiv where possible
		const http_equiv = [];

		const csp_headers = csp.csp_provider.get_meta();
		if (csp_headers) {
			http_equiv.push(csp_headers);
		}

		if (state.prerendering.cache) {
			http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
		}

		if (http_equiv.length > 0) {
			head = http_equiv.join('\n') + head;
		}
	}

	// add the content after the script/css links so the link elements are parsed first
	head += rendered.head;

	// TODO flush chunks as early as we can
	const html =
		(await resolve_opts.transformPageChunk({
			html: options.app_template({ head, body, assets, nonce: /** @type {string} */ (csp.nonce) }),
			done: true
		})) || '';

	const headers = new Headers({
		'x-sveltekit-page': 'true',
		'content-type': 'text/html',
		etag: `"${hash(html)}"`
	});

	if (!state.prerendering) {
		const csp_header = csp.csp_provider.get_header();
		if (csp_header) {
			headers.set('content-security-policy', csp_header);
		}
		const report_only_header = csp.report_only_provider.get_header();
		if (report_only_header) {
			headers.set('content-security-policy-report-only', report_only_header);
		}

		if (link_header_preloads.size) {
			headers.set('link', Array.from(link_header_preloads).join(', '));
		}
	}

	return new Response(html, {
		status,
		headers
	});
}

/**
 * @typedef {import('./types.js').Loaded} Loaded
 * @typedef {import('types').SSROptions} SSROptions
 * @typedef {import('types').SSRState} SSRState
 */

/**
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: SSROptions;
 *   state: SSRState;
 *   status: number;
 *   error: unknown;
 *   resolve_opts: import('types').RequiredResolveOptions;
 * }} opts
 */
async function respond_with_error({ event, options, state, status, error, resolve_opts }) {
	/** @type {import('./types').Fetched[]} */
	const fetched = [];

	try {
		const branch = [];
		const default_layout = await options.manifest._.nodes[0](); // 0 is always the root layout
		const ssr = get_option([default_layout], 'ssr') ?? true;
		const csr = get_option([default_layout], 'csr') ?? true;

		if (ssr) {
			state.initiator = GENERIC_ERROR;

			const server_data_promise = load_server_data({
				event,
				options,
				state,
				node: default_layout,
				parent: async () => ({})
			});

			const server_data = await server_data_promise;

			const data = await load_data({
				event,
				fetched,
				node: default_layout,
				parent: async () => ({}),
				resolve_opts,
				server_data_promise,
				state,
				csr
			});

			branch.push(
				{
					node: default_layout,
					server_data,
					data
				},
				{
					node: await options.manifest._.nodes[1](), // 1 is always the root error
					data: null,
					server_data: null
				}
			);
		}

		return await render_response({
			options,
			state,
			page_config: {
				ssr,
				csr: get_option([default_layout], 'csr') ?? true
			},
			status,
			error: await handle_error_and_jsonify(event, options, error),
			branch,
			fetched,
			event,
			resolve_opts
		});
	} catch (error) {
		// Edge case: If route is a 404 and the user redirects to somewhere from the root layout,
		// we end up here.
		if (error instanceof Redirect) {
			return redirect_response(error.status, error.location);
		}

		return static_error_page(
			options,
			error instanceof HttpError ? error.status : 500,
			(await handle_error_and_jsonify(event, options, error)).message
		);
	}
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSRRoute} route
 * @param {import('types').PageNodeIndexes} page
 * @param {import('types').SSROptions} options
 * @param {import('types').SSRState} state
 * @param {import('types').RequiredResolveOptions} resolve_opts
 * @returns {Promise<Response>}
 */
async function render_page(event, route, page, options, state, resolve_opts) {
	if (state.initiator === route) {
		// infinite request cycle detected
		return new Response(`Not found: ${event.url.pathname}`, {
			status: 404
		});
	}

	state.initiator = route;

	if (is_action_json_request(event)) {
		const node = await options.manifest._.nodes[page.leaf]();
		return handle_action_json_request(event, options, node?.server);
	}

	try {
		const nodes = await Promise.all([
			// we use == here rather than === because [undefined] serializes as "[null]"
			...page.layouts.map((n) => (n == undefined ? n : options.manifest._.nodes[n]())),
			options.manifest._.nodes[page.leaf]()
		]);

		const leaf_node = /** @type {import('types').SSRNode} */ (nodes.at(-1));

		let status = 200;

		/** @type {import('types').ActionResult | undefined} */
		let action_result = undefined;

		if (is_action_request(event, leaf_node)) {
			// for action requests, first call handler in +page.server.js
			// (this also determines status code)
			action_result = await handle_action_request(event, leaf_node.server);
			if (action_result?.type === 'redirect') {
				return redirect_response(303, action_result.location);
			}
			if (action_result?.type === 'error') {
				const error = action_result.error;
				status = error instanceof HttpError ? error.status : 500;
			}
			if (action_result?.type === 'failure') {
				status = action_result.status;
			}
		}

		const should_prerender_data = nodes.some((node) => node?.server);
		const data_pathname = add_data_suffix(event.url.pathname);

		// it's crucial that we do this before returning the non-SSR response, otherwise
		// SvelteKit will erroneously believe that the path has been prerendered,
		// causing functions to be omitted from the manifesst generated later
		const should_prerender = get_option(nodes, 'prerender');

		if (should_prerender) {
			const mod = leaf_node.server;
			if (mod && mod.actions) {
				throw new Error('Cannot prerender pages with actions');
			}
		} else if (state.prerendering) {
			// Try to render the shell when ssr is false and prerendering not explicitly disabled.
			// People can opt out of this behavior by explicitly setting prerender to false.
			if (
				should_prerender !== false &&
				get_option(nodes, 'ssr') === false &&
				!leaf_node.server?.actions
			) {
				return await render_response({
					branch: [],
					fetched: [],
					page_config: {
						ssr: false,
						csr: get_option(nodes, 'csr') ?? true
					},
					status,
					error: null,
					event,
					options,
					state,
					resolve_opts
				});
			}

			// if the page isn't marked as prerenderable, then bail out at this point
			return new Response(undefined, {
				status: 204
			});
		}

		// if we fetch any endpoints while loading data for this page, they should
		// inherit the prerender option of the page
		state.prerender_default = should_prerender;

		/** @type {import('./types').Fetched[]} */
		const fetched = [];

		if (get_option(nodes, 'ssr') === false) {
			return await render_response({
				branch: [],
				fetched,
				page_config: {
					ssr: false,
					csr: get_option(nodes, 'csr') ?? true
				},
				status,
				error: null,
				event,
				options,
				state,
				resolve_opts
			});
		}

		/** @type {Array<import('./types.js').Loaded | null>} */
		let branch = [];

		/** @type {Error | null} */
		let load_error = null;

		/** @type {Array<Promise<import('types').ServerDataNode | null>>} */
		const server_promises = nodes.map((node, i) => {
			if (load_error) {
				// if an error happens immediately, don't bother with the rest of the nodes
				throw load_error;
			}

			return Promise.resolve().then(async () => {
				try {
					if (node === leaf_node && action_result?.type === 'error') {
						// we wait until here to throw the error so that we can use
						// any nested +error.svelte components that were defined
						throw action_result.error;
					}

					return await load_server_data({
						event,
						options,
						state,
						node,
						parent: async () => {
							/** @type {Record<string, any>} */
							const data = {};
							for (let j = 0; j < i; j += 1) {
								const parent = await server_promises[j];
								if (parent) Object.assign(data, await parent.data);
							}
							return data;
						}
					});
				} catch (e) {
					load_error = /** @type {Error} */ (e);
					throw load_error;
				}
			});
		});

		const csr = get_option(nodes, 'csr') ?? true;

		/** @type {Array<Promise<Record<string, any> | null>>} */
		const load_promises = nodes.map((node, i) => {
			if (load_error) throw load_error;
			return Promise.resolve().then(async () => {
				try {
					return await load_data({
						event,
						fetched,
						node,
						parent: async () => {
							const data = {};
							for (let j = 0; j < i; j += 1) {
								Object.assign(data, await load_promises[j]);
							}
							return data;
						},
						resolve_opts,
						server_data_promise: server_promises[i],
						state,
						csr
					});
				} catch (e) {
					load_error = /** @type {Error} */ (e);
					throw load_error;
				}
			});
		});

		// if we don't do this, rejections will be unhandled
		for (const p of server_promises) p.catch(() => {});
		for (const p of load_promises) p.catch(() => {});

		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];

			if (node) {
				try {
					const server_data = await server_promises[i];
					const data = await load_promises[i];

					branch.push({ node, server_data, data });
				} catch (e) {
					const err = normalize_error(e);

					if (err instanceof Redirect) {
						if (state.prerendering && should_prerender_data) {
							const body = JSON.stringify({
								type: 'redirect',
								location: err.location
							});

							state.prerendering.dependencies.set(data_pathname, {
								response: new Response(body),
								body
							});
						}

						return redirect_response(err.status, err.location);
					}

					const status = err instanceof HttpError ? err.status : 500;
					const error = await handle_error_and_jsonify(event, options, err);

					while (i--) {
						if (page.errors[i]) {
							const index = /** @type {number} */ (page.errors[i]);
							const node = await options.manifest._.nodes[index]();

							let j = i;
							while (!branch[j]) j -= 1;

							return await render_response({
								event,
								options,
								state,
								resolve_opts,
								page_config: { ssr: true, csr: true },
								status,
								error,
								branch: compact(branch.slice(0, j + 1)).concat({
									node,
									data: null,
									server_data: null
								}),
								fetched
							});
						}
					}

					// if we're still here, it means the error happened in the root layout,
					// which means we have to fall back to error.html
					return static_error_page(options, status, error.message);
				}
			} else {
				// push an empty slot so we can rewind past gaps to the
				// layout that corresponds with an +error.svelte page
				branch.push(null);
			}
		}

		if (state.prerendering && should_prerender_data) {
			const body = `{"type":"data","nodes":[${branch
				.map((node) => serialize_data_node(node?.server_data))
				.join(',')}]}`;

			state.prerendering.dependencies.set(data_pathname, {
				response: new Response(body),
				body
			});
		}

		return await render_response({
			event,
			options,
			state,
			resolve_opts,
			page_config: {
				csr: get_option(nodes, 'csr') ?? true,
				ssr: true
			},
			status,
			error: null,
			branch: compact(branch),
			action_result,
			fetched
		});
	} catch (error) {
		// if we end up here, it means the data loaded successfull
		// but the page failed to render, or that a prerendering error occurred
		return await respond_with_error({
			event,
			options,
			state,
			status: 500,
			error,
			resolve_opts
		});
	}
}

/**
 * @param {RegExpMatchArray} match
 * @param {import('types').RouteParam[]} params
 * @param {Record<string, import('types').ParamMatcher>} matchers
 */
function exec(match, params, matchers) {
	/** @type {Record<string, string>} */
	const result = {};

	const values = match.slice(1);

	let buffered = '';

	for (let i = 0; i < params.length; i += 1) {
		const param = params[i];
		let value = values[i];

		if (param.chained && param.rest && buffered) {
			// in the `[[lang=lang]]/[...rest]` case, if `lang` didn't
			// match, we roll it over into the rest value
			value = value ? buffered + '/' + value : buffered;
		}

		buffered = '';

		if (value === undefined) {
			// if `value` is undefined, it means this is
			// an optional or rest parameter
			if (param.rest) result[param.name] = '';
		} else {
			if (param.matcher && !matchers[param.matcher](value)) {
				// in the `/[[a=b]]/[[c=d]]` case, if the value didn't satisfy the `b` matcher,
				// try again with the next segment by shifting values rightwards
				if (param.optional && param.chained) {
					// @ts-expect-error TypeScript is... wrong
					let j = values.indexOf(undefined, i);

					if (j === -1) {
						// we can't shift values any further, so hang on to this value
						// so it can be rolled into a subsequent `[...rest]` param
						const next = params[i + 1];
						if (next?.rest && next.chained) {
							buffered = value;
						} else {
							return;
						}
					}

					while (j >= i) {
						values[j] = values[j - 1];
						j -= 1;
					}

					continue;
				}

				// otherwise, if the matcher returns `false`, the route did not match
				return;
			}

			result[param.name] = value;
		}
	}

	if (buffered) return;
	return result;
}

/**
 * @template T
 * @param {() => T} fn
 */
function once(fn) {
	let done = false;

	/** @type T */
	let result;

	return () => {
		if (done) return result;
		done = true;
		return (result = fn());
	};
}

const INVALIDATED_PARAM = 'x-sveltekit-invalidated';

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSRRoute} route
 * @param {import('types').SSROptions} options
 * @param {import('types').SSRState} state
 * @param {boolean[] | undefined} invalidated_data_nodes
 * @param {import('types').TrailingSlash} trailing_slash
 * @returns {Promise<Response>}
 */
async function render_data(
	event,
	route,
	options,
	state,
	invalidated_data_nodes,
	trailing_slash
) {
	if (!route.page) {
		// requesting /__data.json should fail for a +server.js
		return new Response(undefined, {
			status: 404
		});
	}

	try {
		const node_ids = [...route.page.layouts, route.page.leaf];
		const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);

		let aborted = false;

		const url = new URL(event.url);
		url.pathname = normalize_path(url.pathname, trailing_slash);

		const new_event = { ...event, url };

		const functions = node_ids.map((n, i) => {
			return once(async () => {
				try {
					if (aborted) {
						return /** @type {import('types').ServerDataSkippedNode} */ ({
							type: 'skip'
						});
					}

					// == because it could be undefined (in dev) or null (in build, because of JSON.stringify)
					const node = n == undefined ? n : await options.manifest._.nodes[n]();
					return load_server_data({
						event: new_event,
						options,
						state,
						node,
						parent: async () => {
							/** @type {Record<string, any>} */
							const data = {};
							for (let j = 0; j < i; j += 1) {
								const parent = /** @type {import('types').ServerDataNode | null} */ (
									await functions[j]()
								);

								if (parent) {
									Object.assign(data, parent.data);
								}
							}
							return data;
						}
					});
				} catch (e) {
					aborted = true;
					throw e;
				}
			});
		});

		const promises = functions.map(async (fn, i) => {
			if (!invalidated[i]) {
				return /** @type {import('types').ServerDataSkippedNode} */ ({
					type: 'skip'
				});
			}

			return fn();
		});

		let length = promises.length;
		const nodes = await Promise.all(
			promises.map((p, i) =>
				p.catch(async (error) => {
					if (error instanceof Redirect) {
						throw error;
					}

					// Math.min because array isn't guaranteed to resolve in order
					length = Math.min(length, i + 1);

					return /** @type {import('types').ServerErrorNode} */ ({
						type: 'error',
						error: await handle_error_and_jsonify(event, options, error),
						status: error instanceof HttpError ? error.status : undefined
					});
				})
			)
		);

		try {
			const stubs = nodes.slice(0, length).map(serialize_data_node);

			const json = `{"type":"data","nodes":[${stubs.join(',')}]}`;
			return json_response(json);
		} catch (e) {
			const error = /** @type {any} */ (e);
			return json_response(JSON.stringify(clarify_devalue_error(event, error)), 500);
		}
	} catch (e) {
		const error = normalize_error(e);

		if (error instanceof Redirect) {
			return redirect_json_response(error);
		} else {
			// TODO make it clearer that this was an unexpected error
			return json_response(JSON.stringify(await handle_error_and_jsonify(event, options, error)));
		}
	}
}

/**
 * @param {string} json
 * @param {number} [status]
 */
function json_response(json, status = 200) {
	return new Response(json, {
		status,
		headers: {
			'content-type': 'application/json',
			'cache-control': 'private, no-store'
		}
	});
}

/**
 * @param {Redirect} redirect
 */
function redirect_json_response(redirect) {
	return json_response(
		JSON.stringify({
			type: 'redirect',
			location: redirect.location
		})
	);
}

/**
 * Tracks all cookies set during dev mode so we can emit warnings
 * when we detect that there's likely cookie misusage due to wrong paths
 *
 * @type {Record<string, Set<string>>} */
const cookie_paths = {};

/**
 * @param {Request} request
 * @param {URL} url
 * @param {boolean} dev
 * @param {import('types').TrailingSlash} trailing_slash
 */
function get_cookies(request, url, dev, trailing_slash) {
	const header = request.headers.get('cookie') ?? '';
	const initial_cookies = parse_1(header, { decode: (value) => value });

	const normalized_url = normalize_path(url.pathname, trailing_slash);
	// Emulate browser-behavior: if the cookie is set at '/foo/bar', its path is '/foo'
	const default_path = normalized_url.split('/').slice(0, -1).join('/') || '/';

	if (dev) {
		// TODO this could theoretically be wrong if the cookie was set unencoded?
		const initial_decoded_cookies = parse_1(header, { decode: decodeURIComponent });
		// Remove all cookies that no longer exist according to the request
		for (const name of Object.keys(cookie_paths)) {
			cookie_paths[name] = new Set(
				[...cookie_paths[name]].filter(
					(path) => !path_matches(normalized_url, path) || name in initial_decoded_cookies
				)
			);
		}
		// Add all new cookies we might not have seen before
		for (const name in initial_decoded_cookies) {
			cookie_paths[name] = cookie_paths[name] ?? new Set();
			if (![...cookie_paths[name]].some((path) => path_matches(normalized_url, path))) {
				cookie_paths[name].add(default_path);
			}
		}
	}

	/** @type {Record<string, import('./page/types').Cookie>} */
	const new_cookies = {};

	/** @type {import('cookie').CookieSerializeOptions} */
	const defaults = {
		httpOnly: true,
		sameSite: 'lax',
		secure: url.hostname === 'localhost' && url.protocol === 'http:' ? false : true
	};

	/** @type {import('types').Cookies} */
	const cookies = {
		// The JSDoc param annotations appearing below for get, set and delete
		// are necessary to expose the `cookie` library types to
		// typescript users. `@type {import('types').Cookies}` above is not
		// sufficient to do so.

		/**
		 * @param {string} name
		 * @param {import('cookie').CookieParseOptions} opts
		 */
		get(name, opts) {
			const c = new_cookies[name];
			if (
				c &&
				domain_matches(url.hostname, c.options.domain) &&
				path_matches(url.pathname, c.options.path)
			) {
				return c.value;
			}

			const decoder = opts?.decode || decodeURIComponent;
			const req_cookies = parse_1(header, { decode: decoder });
			const cookie = req_cookies[name]; // the decoded string or undefined

			if (!dev || cookie) {
				return cookie;
			}

			const paths = new Set([...(cookie_paths[name] ?? [])]);
			if (c) {
				paths.add(c.options.path ?? default_path);
			}
			if (paths.size > 0) {
				console.warn(
					// prettier-ignore
					`Cookie with name '${name}' was not found at path '${url.pathname}', but a cookie with that name exists at these paths: '${[...paths].join("', '")}'. Did you mean to set its 'path' to '/' instead?`
				);
			}
		},

		/**
		 * @param {string} name
		 * @param {string} value
		 * @param {import('cookie').CookieSerializeOptions} opts
		 */
		set(name, value, opts = {}) {
			let path = opts.path ?? default_path;

			new_cookies[name] = {
				name,
				value,
				options: {
					...defaults,
					...opts,
					path
				}
			};

			if (dev) {
				cookie_paths[name] = cookie_paths[name] ?? new Set();
				if (!value) {
					if (!cookie_paths[name].has(path) && cookie_paths[name].size > 0) {
						const paths = `'${Array.from(cookie_paths[name]).join("', '")}'`;
						console.warn(
							`Trying to delete cookie '${name}' at path '${path}', but a cookie with that name only exists at these paths: ${paths}.`
						);
					}
					cookie_paths[name].delete(path);
				} else {
					// We could also emit a warning here if the cookie already exists at a different path,
					// but that's more likely a false positive because it's valid to set the same name at different paths
					cookie_paths[name].add(path);
				}
			}
		},

		/**
		 * @param {string} name
		 * @param {import('cookie').CookieSerializeOptions} opts
		 */
		delete(name, opts = {}) {
			cookies.set(name, '', {
				...opts,
				maxAge: 0
			});
		},

		/**
		 * @param {string} name
		 * @param {string} value
		 * @param {import('cookie').CookieSerializeOptions} opts
		 */
		serialize(name, value, opts) {
			return serialize_1(name, value, {
				...defaults,
				...opts
			});
		}
	};

	/**
	 * @param {URL} destination
	 * @param {string | null} header
	 */
	function get_cookie_header(destination, header) {
		/** @type {Record<string, string>} */
		const combined_cookies = {
			// cookies sent by the user agent have lowest precedence
			...initial_cookies
		};

		// cookies previous set during this event with cookies.set have higher precedence
		for (const key in new_cookies) {
			const cookie = new_cookies[key];
			if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
			if (!path_matches(destination.pathname, cookie.options.path)) continue;

			const encoder = cookie.options.encode || encodeURIComponent;
			combined_cookies[cookie.name] = encoder(cookie.value);
		}

		// explicit header has highest precedence
		if (header) {
			const parsed = parse_1(header, { decode: (value) => value });
			for (const name in parsed) {
				combined_cookies[name] = parsed[name];
			}
		}

		return Object.entries(combined_cookies)
			.map(([name, value]) => `${name}=${value}`)
			.join('; ');
	}

	return { cookies, new_cookies, get_cookie_header };
}

/**
 * @param {string} hostname
 * @param {string} [constraint]
 */
function domain_matches(hostname, constraint) {
	if (!constraint) return true;

	const normalized = constraint[0] === '.' ? constraint.slice(1) : constraint;

	if (hostname === normalized) return true;
	return hostname.endsWith('.' + normalized);
}

/**
 * @param {string} path
 * @param {string} [constraint]
 */
function path_matches(path, constraint) {
	if (!constraint) return true;

	const normalized = constraint.endsWith('/') ? constraint.slice(0, -1) : constraint;

	if (path === normalized) return true;
	return path.startsWith(normalized + '/');
}

/**
 * @param {Headers} headers
 * @param {import('./page/types').Cookie[]} cookies
 */
function add_cookies_to_headers(headers, cookies) {
	for (const new_cookie of cookies) {
		const { name, value, options } = new_cookie;
		headers.append('set-cookie', serialize_1(name, value, options));
	}
}

/**
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: import('types').SSROptions;
 *   state: import('types').SSRState;
 *   get_cookie_header: (url: URL, header: string | null) => string;
 * }} opts
 * @returns {typeof fetch}
 */
function create_fetch({ event, options, state, get_cookie_header }) {
	return async (info, init) => {
		const original_request = normalize_fetch_input(info, init, event.url);

		const request_body = init?.body;

		// some runtimes (e.g. Cloudflare) error if you access `request.mode`,
		// annoyingly, so we need to read the value from the `init` object instead
		let mode = (info instanceof Request ? info.mode : init?.mode) ?? 'cors';
		let credentials =
			(info instanceof Request ? info.credentials : init?.credentials) ?? 'same-origin';

		return await options.hooks.handleFetch({
			event,
			request: original_request,
			fetch: async (info, init) => {
				const request = normalize_fetch_input(info, init, event.url);

				const url = new URL(request.url);

				if (!request.headers.has('origin')) {
					request.headers.set('origin', event.url.origin);
				}

				if (info !== original_request) {
					mode = (info instanceof Request ? info.mode : init?.mode) ?? 'cors';
					credentials =
						(info instanceof Request ? info.credentials : init?.credentials) ?? 'same-origin';
				}

				// Remove Origin, according to https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#description
				if (
					(request.method === 'GET' || request.method === 'HEAD') &&
					((mode === 'no-cors' && url.origin !== event.url.origin) ||
						url.origin === event.url.origin)
				) {
					request.headers.delete('origin');
				}

				if (url.origin !== event.url.origin) {
					// allow cookie passthrough for "same-origin"
					// if SvelteKit is serving my.domain.com:
					// -        domain.com WILL NOT receive cookies
					// -     my.domain.com WILL receive cookies
					// -    api.domain.dom WILL NOT receive cookies
					// - sub.my.domain.com WILL receive cookies
					// ports do not affect the resolution
					// leading dot prevents mydomain.com matching domain.com
					if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== 'omit') {
						const cookie = get_cookie_header(url, request.headers.get('cookie'));
						if (cookie) request.headers.set('cookie', cookie);
					}

					let response = await fetch(request);

					if (mode === 'no-cors') {
						response = new Response('', {
							status: response.status,
							statusText: response.statusText,
							headers: response.headers
						});
					}

					return response;
				}

				/** @type {Response} */
				let response;

				// handle fetch requests for static assets. e.g. prebaked data, etc.
				// we need to support everything the browser's fetch supports
				const prefix = options.paths.assets || options.paths.base;
				const decoded = decodeURIComponent(url.pathname);
				const filename = (
					decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded
				).slice(1);
				const filename_html = `${filename}/index.html`; // path may also match path/index.html

				const is_asset = options.manifest.assets.has(filename);
				const is_asset_html = options.manifest.assets.has(filename_html);

				if (is_asset || is_asset_html) {
					const file = is_asset ? filename : filename_html;

					if (options.read) {
						const type = is_asset
							? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf('.'))]
							: 'text/html';

						return new Response(options.read(file), {
							headers: type ? { 'content-type': type } : {}
						});
					}

					return await fetch(request);
				}

				if (credentials !== 'omit') {
					const cookie = get_cookie_header(url, request.headers.get('cookie'));
					if (cookie) {
						request.headers.set('cookie', cookie);
					}

					const authorization = event.request.headers.get('authorization');
					if (authorization && !request.headers.has('authorization')) {
						request.headers.set('authorization', authorization);
					}
				}

				if (request_body && typeof request_body !== 'string' && !ArrayBuffer.isView(request_body)) {
					// TODO is this still necessary? we just bail out below
					// per https://developer.mozilla.org/en-US/docs/Web/API/Request/Request, this can be a
					// Blob, BufferSource, FormData, URLSearchParams, USVString, or ReadableStream object.
					// non-string bodies are irksome to deal with, but luckily aren't particularly useful
					// in this context anyway, so we take the easy route and ban them
					throw new Error('Request body must be a string or TypedArray');
				}

				if (!request.headers.has('accept')) {
					request.headers.set('accept', '*/*');
				}

				if (!request.headers.has('accept-language')) {
					request.headers.set(
						'accept-language',
						/** @type {string} */ (event.request.headers.get('accept-language'))
					);
				}

				response = await respond(request, options, state);

				const set_cookie = response.headers.get('set-cookie');
				if (set_cookie) {
					for (const str of splitCookiesString_1(set_cookie)) {
						const { name, value, ...options } = parseString_1(str);

						// options.sameSite is string, something more specific is required - type cast is safe
						event.cookies.set(
							name,
							value,
							/** @type {import('cookie').CookieSerializeOptions} */ (options)
						);
					}
				}

				return response;
			}
		});
	};
}

/**
 * @param {RequestInfo | URL} info
 * @param {RequestInit | undefined} init
 * @param {URL} url
 */
function normalize_fetch_input(info, init, url) {
	if (info instanceof Request) {
		return info;
	}

	return new Request(typeof info === 'string' ? new URL(info, url) : info, init);
}

/* global "@sveltejs/adapter-node" */

/** @type {import('types').RequiredResolveOptions['transformPageChunk']} */
const default_transform = ({ html }) => html;

/** @type {import('types').RequiredResolveOptions['filterSerializedResponseHeaders']} */
const default_filter = () => false;

/** @type {import('types').RequiredResolveOptions['preload']} */
const default_preload = ({ type }) => type === 'js' || type === 'css';

/** @type {import('types').Respond} */
async function respond(request, options, state) {
	/** URL but stripped from the potential `/__data.json` suffix and its search param  */
	let url = new URL(request.url);

	if (options.csrf.check_origin) {
		const forbidden =
			request.method === 'POST' &&
			request.headers.get('origin') !== url.origin &&
			is_form_content_type(request);

		if (forbidden) {
			const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
			if (request.headers.get('accept') === 'application/json') {
				return json(csrf_error.body, { status: csrf_error.status });
			}
			return new Response(csrf_error.body.message, { status: csrf_error.status });
		}
	}

	let decoded;
	try {
		decoded = decode_pathname(url.pathname);
	} catch {
		return new Response('Malformed URI', { status: 400 });
	}

	/** @type {import('types').SSRRoute | null} */
	let route = null;

	/** @type {Record<string, string>} */
	let params = {};

	if (options.paths.base && !state.prerendering?.fallback) {
		if (!decoded.startsWith(options.paths.base)) {
			return new Response('Not found', { status: 404 });
		}
		decoded = decoded.slice(options.paths.base.length) || '/';
	}

	const is_data_request = has_data_suffix(decoded);
	/** @type {boolean[] | undefined} */
	let invalidated_data_nodes;
	if (is_data_request) {
		decoded = strip_data_suffix(decoded) || '/';
		url.pathname = strip_data_suffix(url.pathname) || '/';
		invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split('_').map(Boolean);
		url.searchParams.delete(INVALIDATED_PARAM);
	}

	if (!state.prerendering?.fallback) {
		// TODO this could theoretically break — should probably be inside a try-catch
		const matchers = await options.manifest._.matchers();

		for (const candidate of options.manifest._.routes) {
			const match = candidate.pattern.exec(decoded);
			if (!match) continue;

			const matched = exec(match, candidate.params, matchers);
			if (matched) {
				route = candidate;
				params = decode_params(matched);
				break;
			}
		}
	}

	/** @type {import('types').TrailingSlash | void} */
	let trailing_slash = undefined;

	/** @type {Record<string, string>} */
	const headers = {};

	/** @type {import('types').RequestEvent} */
	const event = {
		// @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
		cookies: null,
		// @ts-expect-error
		fetch: null,
		getClientAddress:
			state.getClientAddress ||
			(() => {
				throw new Error(
					`${"@sveltejs/adapter-node"} does not specify getClientAddress. Please raise an issue`
				);
			}),
		locals: {},
		params,
		platform: state.platform,
		request,
		route: { id: route?.id ?? null },
		setHeaders: (new_headers) => {
			for (const key in new_headers) {
				const lower = key.toLowerCase();
				const value = new_headers[key];

				if (lower === 'set-cookie') {
					throw new Error(
						`Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
					);
				} else if (lower in headers) {
					throw new Error(`"${key}" header is already set`);
				} else {
					headers[lower] = value;

					if (state.prerendering && lower === 'cache-control') {
						state.prerendering.cache = /** @type {string} */ (value);
					}
				}
			}
		},
		url,
		isDataRequest: is_data_request
	};

	/** @type {import('types').RequiredResolveOptions} */
	let resolve_opts = {
		transformPageChunk: default_transform,
		filterSerializedResponseHeaders: default_filter,
		preload: default_preload
	};

	try {
		// determine whether we need to redirect to add/remove a trailing slash
		if (route && !is_data_request) {
			if (route.page) {
				const nodes = await Promise.all([
					// we use == here rather than === because [undefined] serializes as "[null]"
					...route.page.layouts.map((n) => (n == undefined ? n : options.manifest._.nodes[n]())),
					options.manifest._.nodes[route.page.leaf]()
				]);

				if (DEV) ;

				trailing_slash = get_option(nodes, 'trailingSlash');
			} else if (route.endpoint) {
				const node = await route.endpoint();
				trailing_slash = node.trailingSlash;

				if (DEV) ;
			}

			const normalized = normalize_path(url.pathname, trailing_slash ?? 'never');

			if (normalized !== url.pathname && !state.prerendering?.fallback) {
				return new Response(undefined, {
					status: 301,
					headers: {
						'x-sveltekit-normalize': '1',
						location:
							// ensure paths starting with '//' are not treated as protocol-relative
							(normalized.startsWith('//') ? url.origin + normalized : normalized) +
							(url.search === '?' ? '' : url.search)
					}
				});
			}
		}

		const { cookies, new_cookies, get_cookie_header } = get_cookies(
			request,
			url,
			options.dev,
			trailing_slash ?? 'never'
		);

		event.cookies = cookies;
		event.fetch = create_fetch({ event, options, state, get_cookie_header });

		if (state.prerendering && !state.prerendering.fallback) disable_search(url);

		const response = await options.hooks.handle({
			event,
			resolve: (event, opts) =>
				resolve(event, opts).then((response) => {
					// add headers/cookies here, rather than inside `resolve`, so that we
					// can do it once for all responses instead of once per `return`
					for (const key in headers) {
						const value = headers[key];
						response.headers.set(key, /** @type {string} */ (value));
					}

					add_cookies_to_headers(response.headers, Object.values(new_cookies));

					if (state.prerendering && event.route.id !== null) {
						response.headers.set('x-sveltekit-routeid', encodeURI(event.route.id));
					}

					return response;
				})
		});

		// respond with 304 if etag matches
		if (response.status === 200 && response.headers.has('etag')) {
			let if_none_match_value = request.headers.get('if-none-match');

			// ignore W/ prefix https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match#directives
			if (if_none_match_value?.startsWith('W/"')) {
				if_none_match_value = if_none_match_value.substring(2);
			}

			const etag = /** @type {string} */ (response.headers.get('etag'));

			if (if_none_match_value === etag) {
				const headers = new Headers({ etag });

				// https://datatracker.ietf.org/doc/html/rfc7232#section-4.1 + set-cookie
				for (const key of [
					'cache-control',
					'content-location',
					'date',
					'expires',
					'vary',
					'set-cookie'
				]) {
					const value = response.headers.get(key);
					if (value) headers.set(key, value);
				}

				return new Response(undefined, {
					status: 304,
					headers
				});
			}
		}

		// Edge case: If user does `return Response(30x)` in handle hook while processing a data request,
		// we need to transform the redirect response to a corresponding JSON response.
		if (is_data_request && response.status >= 300 && response.status <= 308) {
			const location = response.headers.get('location');
			if (location) {
				return redirect_json_response(new Redirect(/** @type {any} */ (response.status), location));
			}
		}

		return response;
	} catch (error) {
		if (error instanceof Redirect) {
			if (is_data_request) {
				return redirect_json_response(error);
			} else {
				return redirect_response(error.status, error.location);
			}
		}
		return await handle_fatal_error(event, options, error);
	}

	/**
	 *
	 * @param {import('types').RequestEvent} event
	 * @param {import('types').ResolveOptions} [opts]
	 */
	async function resolve(event, opts) {
		try {
			if (opts) {
				if ('ssr' in opts) {
					throw new Error(
						'ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197'
					);
				}

				resolve_opts = {
					transformPageChunk: opts.transformPageChunk || default_transform,
					filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
					preload: opts.preload || default_preload
				};
			}

			if (state.prerendering?.fallback) {
				return await render_response({
					event,
					options,
					state,
					page_config: { ssr: false, csr: true },
					status: 200,
					error: null,
					branch: [],
					fetched: [],
					resolve_opts
				});
			}

			if (route) {
				/** @type {Response} */
				let response;

				if (is_data_request) {
					response = await render_data(
						event,
						route,
						options,
						state,
						invalidated_data_nodes,
						trailing_slash ?? 'never'
					);
				} else if (route.endpoint && (!route.page || is_endpoint_request(event))) {
					response = await render_endpoint(event, await route.endpoint(), state);
				} else if (route.page) {
					response = await render_page(event, route, route.page, options, state, resolve_opts);
				} else {
					// a route will always have a page or an endpoint, but TypeScript
					// doesn't know that
					throw new Error('This should never happen');
				}

				return response;
			}

			if (state.initiator === GENERIC_ERROR) {
				return new Response('Internal Server Error', {
					status: 500
				});
			}

			// if this request came direct from the user, rather than
			// via a `fetch` in a `load`, render a 404 page
			if (!state.initiator) {
				return await respond_with_error({
					event,
					options,
					state,
					status: 404,
					error: new Error(`Not found: ${event.url.pathname}`),
					resolve_opts
				});
			}

			if (state.prerendering) {
				return new Response('not found', { status: 404 });
			}

			// we can't load the endpoint from our own manifest,
			// so we need to make an actual HTTP request
			return await fetch(request);
		} catch (error) {
			// HttpError from endpoint can end up here - TODO should it be handled there instead?
			return await handle_fatal_error(event, options, error);
		} finally {
			event.cookies.set = () => {
				throw new Error('Cannot use `cookies.set(...)` after the response has been generated');
			};

			event.setHeaders = () => {
				throw new Error('Cannot use `setHeaders(...)` after the response has been generated');
			};
		}
	}
}

/** @type {string} */
let base = '';

/** @type {string} */
let assets = '';

/** @param {{ base: string, assets: string }} paths */
function set_paths(paths) {
	base = paths.base;
	assets = paths.assets || base;
}

const app_template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width\" />\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap\" rel=\"stylesheet\">\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div>" + body + "</div>\n\t</body>\n</html>\n";

const error_template = ({ status, message }) => "<main>\r\n    <h1 class=\"text-[1.2rem]\">Something Went Wrong!</h1>\r\n    <div>" + status + "</div>\r\n    <div>" + message + "</div>\r\n</main>";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_building(settings.building);
	read = settings.read;
}

class Server {
	constructor(manifest) {
		this.options = {
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			csrf: {
				check_origin: true,
			},
			dev: false,
			embedded: false,
			handle_error: (error, event) => {
				return this.options.hooks.handleError({ error, event }) ?? {
					message: event.route.id != null ? 'Internal Error' : 'Not Found'
				};
			},
			hooks: null,
			manifest,
			paths: { base, assets },
			public_env: {},
			read,
			root: Root,
			service_worker: false,
			app_template,
			app_template_contains_nonce: false,
			error_template,
			version: "1690252237947"
		};
	}

	/**
	 * Take care: Some adapters may have to call `Server.init` per-request to set env vars,
	 * so anything that shouldn't be rerun should be wrapped in an `if` block to make sure it hasn't
	 * been done already.
	 */
	async init({ env }) {
		const entries = Object.entries(env);

		Object.fromEntries(entries.filter(([k]) => !k.startsWith('PUBLIC_')));

		const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith('PUBLIC_')));
		set_public_env(pub);

		this.options.public_env = pub;

		if (!this.options.hooks) {
			const module = await import('./chunks/hooks.server-ca3fc2f8.js');

			this.options.hooks = {
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				handleFetch: module.handleFetch || (({ request, fetch }) => fetch(request))
			};
		}
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		return respond(request, this.options, options);
	}
}

export { Server, override };
//# sourceMappingURL=index.js.map
