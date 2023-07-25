const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","me.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-3acdde14.js","imports":["_app/immutable/start-3acdde14.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/parse-c28e5ac2.js","_app/immutable/chunks/env-public-1b9b25bc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-62604895.js'),
			() => import('./chunks/1-4d26add2.js'),
			() => import('./chunks/2-21722d9a.js'),
			() => import('./chunks/3-aeabbbef.js'),
			() => import('./chunks/4-69cae8be.js'),
			() => import('./chunks/5-a2c7a7c0.js'),
			() => import('./chunks/6-cd617724.js'),
			() => import('./chunks/7-92435455.js'),
			() => import('./chunks/8-459d6e4e.js'),
			() => import('./chunks/9-a0b2e60a.js'),
			() => import('./chunks/10-5cb796bb.js')
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
