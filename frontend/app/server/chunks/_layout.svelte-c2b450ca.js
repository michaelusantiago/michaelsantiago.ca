import { c as create_ssr_component, b as subscribe } from './index-2f2dc0eb.js';
import { j as selected_menu, k as about_selected_menu } from './globalstore-00e055b6.js';
import './env-public-d1489f53.js';
import 'pocketbase';
import './utilities-9e3a1c44.js';

/* src/routes/about/+layout.svelte generated by Svelte v3.55.0 */

const css = {
	code: "main.svelte-1v8ifz7.svelte-1v8ifz7{display:flex}.nav.svelte-1v8ifz7.svelte-1v8ifz7{border-right:solid 1px gold;margin-right:1rem;flex:0.75}.nav.svelte-1v8ifz7 a.svelte-1v8ifz7{font-family:\"Rajdhani\", sans-serif;font-size:1.15rem}.nav.svelte-1v8ifz7 a.svelte-1v8ifz7:hover,.nav.svelte-1v8ifz7 a.active.svelte-1v8ifz7{color:block;font-weight:bold}.content.svelte-1v8ifz7.svelte-1v8ifz7{flex:3}",
	map: null
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_selected_menu;
	let $about_selected_menu, $$unsubscribe_about_selected_menu;
	$$unsubscribe_selected_menu = subscribe(selected_menu, value => value);
	$$unsubscribe_about_selected_menu = subscribe(about_selected_menu, value => $about_selected_menu = value);

	$$result.css.add(css);
	$$unsubscribe_selected_menu();
	$$unsubscribe_about_selected_menu();

	return `${($$result.head += '<!-- HEAD_svelte-18lm8e8_START -->' + `${($$result.title = `<title>About - Michael Santiago</title>`, "")}` + '<!-- HEAD_svelte-18lm8e8_END -->', "")}

<main class="${"svelte-1v8ifz7"}"><div class="${"nav svelte-1v8ifz7"}"><ul><li><a href="${"/about/projects/"}" class="${["svelte-1v8ifz7", $about_selected_menu === "projects" ? "active" : ""].join(' ').trim()}">Projects
                </a></li>
            <li><a href="${"/about/workexperience/"}" class="${[
		"svelte-1v8ifz7",
		$about_selected_menu === "workexperience"
		? "active"
		: ""
	].join(' ').trim()}">Work Experience 
                </a></li>
            <li><a href="${"/about/education/"}" class="${["svelte-1v8ifz7", $about_selected_menu === "education" ? "active" : ""].join(' ').trim()}">Education 
                </a></li>
            <li><a href="${"/about/biography/"}" class="${["svelte-1v8ifz7", $about_selected_menu === "biography" ? "active" : ""].join(' ').trim()}">Biography 
                </a></li></ul></div>
    <div class="${"content svelte-1v8ifz7"}">${slots.default ? slots.default({}) : ``}</div>
</main>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-c2b450ca.js.map