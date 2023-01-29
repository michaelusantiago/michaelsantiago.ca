const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","me.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-abf3d681.js","imports":["_app/immutable/start-abf3d681.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/parse-0003fb26.js","_app/immutable/chunks/index-e90a8133.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-f6b37c55.js'),
			() => import('./chunks/1-4d26add2.js'),
			() => import('./chunks/2-d26a8471.js'),
			() => import('./chunks/3-7b64b54d.js'),
			() => import('./chunks/4-5a96ec75.js'),
			() => import('./chunks/5-a2c7a7c0.js'),
			() => import('./chunks/6-d2339db6.js'),
			() => import('./chunks/7-5f83938a.js'),
			() => import('./chunks/8-9cb9a303.js'),
			() => import('./chunks/9-60fb291f.js'),
			() => import('./chunks/10-91fc6bd3.js')
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
