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
		client: {"start":"_app/immutable/entry/start.adb2d9a8.js","app":"_app/immutable/entry/app.4f7d399e.js","imports":["_app/immutable/entry/start.adb2d9a8.js","_app/immutable/chunks/scheduler.5a37f85d.js","_app/immutable/chunks/singletons.2a4c629c.js","_app/immutable/chunks/index.9bc1d2ae.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.4f7d399e.js","_app/immutable/chunks/scheduler.5a37f85d.js","_app/immutable/chunks/index.ba0f40af.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-d226339b.js')),
			__memo(() => import('./chunks/1-279ec319.js')),
			__memo(() => import('./chunks/2-19822b98.js')),
			__memo(() => import('./chunks/3-6ca618e9.js')),
			__memo(() => import('./chunks/4-592de2cb.js')),
			__memo(() => import('./chunks/5-dc0368c0.js')),
			__memo(() => import('./chunks/6-1c4a5e1c.js')),
			__memo(() => import('./chunks/7-09677ca0.js')),
			__memo(() => import('./chunks/8-bb46d2fb.js')),
			__memo(() => import('./chunks/9-b04cda92.js'))
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
