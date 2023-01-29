class HttpError {
	/**
	 * @param {number} status
	 * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
	 */
	constructor(status, body) {
		this.status = status;
		if (typeof body === 'string') {
			this.body = { message: body };
		} else if (body) {
			this.body = body;
		} else {
			this.body = { message: `Error: ${status}` };
		}
	}

	toString() {
		return JSON.stringify(this.body);
	}
}

class Redirect {
	/**
	 * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
	 * @param {string} location
	 */
	constructor(status, location) {
		this.status = status;
		this.location = location;
	}
}

/**
 * @template {Record<string, unknown> | undefined} [T=undefined]
 */
class ActionFailure {
	/**
	 * @param {number} status
	 * @param {T} [data]
	 */
	constructor(status, data) {
		this.status = status;
		this.data = data;
	}
}

// For some reason we need to type the params as well here,
// JSdoc doesn't seem to like @type with function overloads
/**
 * @type {import('@sveltejs/kit').error}
 * @param {number} status
 * @param {any} message
 */
function error(status, message) {
	if ((isNaN(status) || status < 400 || status > 599)) {
		throw new Error(`HTTP error status codes must be between 400 and 599 — ${status} is invalid`);
	}

	return new HttpError(status, message);
}

/** @type {import('@sveltejs/kit').redirect} */
function redirect(status, location) {
	if ((isNaN(status) || status < 300 || status > 308)) {
		throw new Error('Invalid status code');
	}

	return new Redirect(status, location);
}

/** @type {import('@sveltejs/kit').json} */
function json(data, init) {
	// TODO deprecate this in favour of `Response.json` when it's
	// more widely supported
	const headers = new Headers(init?.headers);
	if (!headers.has('content-type')) {
		headers.set('content-type', 'application/json');
	}

	return new Response(JSON.stringify(data), {
		...init,
		headers
	});
}

export { ActionFailure as A, HttpError as H, Redirect as R, error as e, json as j, redirect as r };
//# sourceMappingURL=index2-2067fca8.js.map
