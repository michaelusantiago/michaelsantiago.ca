const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","me.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-a05864a0.js","imports":["_app/immutable/start-a05864a0.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/parse-c28e5ac2.js","_app/immutable/chunks/env-public-1b9b25bc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-14cc8c11.js'),
			() => import('./chunks/1-4d26add2.js'),
			() => import('./chunks/2-0f18a907.js'),
			() => import('./chunks/3-da6e34cc.js'),
			() => import('./chunks/4-2b1471a4.js'),
			() => import('./chunks/5-a2c7a7c0.js'),
			() => import('./chunks/6-c6711d3e.js'),
			() => import('./chunks/7-c59a6572.js'),
			() => import('./chunks/8-e6038cb0.js'),
			() => import('./chunks/9-2e3d1681.js'),
			() => import('./chunks/10-c5743624.js')
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
