const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","me.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-8ec19f66.js","imports":["_app/immutable/start-8ec19f66.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/parse-c28e5ac2.js","_app/immutable/chunks/env-public-1b9b25bc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-393d633e.js'),
			() => import('./chunks/1-4d26add2.js'),
			() => import('./chunks/2-d72093db.js'),
			() => import('./chunks/3-f2abd3c4.js'),
			() => import('./chunks/4-04c8679d.js'),
			() => import('./chunks/5-a2c7a7c0.js'),
			() => import('./chunks/6-fcbee592.js'),
			() => import('./chunks/7-e56edd77.js'),
			() => import('./chunks/8-9ffab42c.js'),
			() => import('./chunks/9-1febf892.js'),
			() => import('./chunks/10-c3ad7714.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/about/biography",
				pattern: /^\/about\/biography\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/about/education",
				pattern: /^\/about\/education\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/about/projects",
				pattern: /^\/about\/projects\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/about/workexperience",
				pattern: /^\/about\/workexperience\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/chat",
				pattern: /^\/chat\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
