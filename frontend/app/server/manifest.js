const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","me.jpg","pos22 app.png","pos22 manager.png","pos22 website.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.53b5ed10.js","app":"_app/immutable/entry/app.2d4af0be.js","imports":["_app/immutable/entry/start.53b5ed10.js","_app/immutable/chunks/scheduler.22c66fb6.js","_app/immutable/chunks/singletons.b2371634.js","_app/immutable/chunks/index.80348aca.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.2d4af0be.js","_app/immutable/chunks/scheduler.22c66fb6.js","_app/immutable/chunks/index.94eb7729.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-a922de11.js')),
			__memo(() => import('./chunks/1-e9a402e0.js')),
			__memo(() => import('./chunks/2-ba088ab1.js')),
			__memo(() => import('./chunks/3-25ca7735.js')),
			__memo(() => import('./chunks/4-11a5e79f.js')),
			__memo(() => import('./chunks/5-57c049d3.js')),
			__memo(() => import('./chunks/6-8ec75868.js')),
			__memo(() => import('./chunks/7-f9aa71b9.js')),
			__memo(() => import('./chunks/8-3ee496cf.js')),
			__memo(() => import('./chunks/9-54e92cf2.js'))
		],
		routes: [
			{
				id: "/(home)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/background",
				pattern: /^\/background\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/background/biography",
				pattern: /^\/background\/biography\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/background/education",
				pattern: /^\/background\/education\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/background/workexperience",
				pattern: /^\/background\/workexperience\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/chat",
				pattern: /^\/chat\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
