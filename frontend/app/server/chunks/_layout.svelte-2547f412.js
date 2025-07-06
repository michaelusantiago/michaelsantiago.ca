import { c as create_ssr_component, a as subscribe, h as add_classes } from './ssr-a4520bf8.js';
import { e as selected_menu, g as selected_background_menu } from './store-c8581760.js';
import './index2-3984e389.js';

const css = {
  code: "main.svelte-l50kx3.svelte-l50kx3{display:flex;padding-block:1rem}main.svelte-l50kx3 nav.svelte-l50kx3{display:flex;padding:0 1rem;white-space:nowrap}main.svelte-l50kx3 nav ul li.svelte-l50kx3{padding-block:5px}section.svelte-l50kx3.svelte-l50kx3{padding:0 2rem;border-left:solid 1px slategrey}@media screen and (max-width: 650px){main.svelte-l50kx3.svelte-l50kx3{display:grid;grid-template-rows:auto 1fr;margin:0 2rem;padding-block:0}main.svelte-l50kx3 nav.svelte-l50kx3{padding:1rem 0}main.svelte-l50kx3 nav ul.svelte-l50kx3{display:flex;gap:1rem}main.svelte-l50kx3 section.svelte-l50kx3{border:none;padding:0}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selected_background_menu, $$unsubscribe_selected_background_menu;
  $$unsubscribe_selected_background_menu = subscribe(selected_background_menu, (value) => $selected_background_menu = value);
  selected_menu.set("background");
  $$result.css.add(css);
  $$unsubscribe_selected_background_menu();
  return `<main class="svelte-l50kx3"><nav class="svelte-l50kx3"><ul class="svelte-l50kx3"><li class="svelte-l50kx3"><a href="/background/workexperience"${add_classes(($selected_background_menu === "workexperience" ? "active" : "").trim())} data-svelte-h="svelte-1kr4o0s">Work Experiences</a></li> <li class="svelte-l50kx3"><a href="/background/education"${add_classes(($selected_background_menu === "education" ? "active" : "").trim())} data-svelte-h="svelte-11l7ynq">Education</a></li> <li class="svelte-l50kx3"><a href="/background/biography"${add_classes(($selected_background_menu === "biography" ? "active" : "").trim())} data-svelte-h="svelte-dr1zk7">Biography</a></li></ul></nav> <section class="svelte-l50kx3">${slots.default ? slots.default({}) : ``}</section> </main>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-2547f412.js.map
