import { c as create_ssr_component } from './ssr-a4520bf8.js';
import { g as selected_background_menu } from './store-c8581760.js';
import './index2-3984e389.js';

const css = {
  code: ".head-title.svelte-1iwm8lp.svelte-1iwm8lp{font-size:1.5rem;font-weight:bold}.education-container.svelte-1iwm8lp.svelte-1iwm8lp{padding-block:0.5rem}.education-container.svelte-1iwm8lp h2.svelte-1iwm8lp{font-size:larger;font-weight:bold}.education-container.svelte-1iwm8lp h1.svelte-1iwm8lp{font-weight:bold}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  selected_background_menu.set("education");
  $$result.css.add(css);
  return `<main data-svelte-h="svelte-1hii4x4"><h1 class="head-title svelte-1iwm8lp">Education</h1> <div class="education-container svelte-1iwm8lp"><h1 class="svelte-1iwm8lp">2001-2005</h1> <h2 class="svelte-1iwm8lp">Bachelor of Science in Computer Science</h2> <h3><a href="https://www.psu.palawan.edu.ph/" target="_blank" rel="noreferrer">Palawan State University</a></h3></div> <div class="education-container svelte-1iwm8lp"><h1 class="svelte-1iwm8lp">1999-2000</h1> <h2 class="svelte-1iwm8lp">Certificate in Information Systems</h2> <h3><a href="https://sti.edu" target="_blank" rel="noreferrer">Systems Technology Institute</a></h3></div> <div class="education-container svelte-1iwm8lp"><h1 class="svelte-1iwm8lp">1995-1999</h1> <h3><a href="https://pns.edu.ph" target="_blank" rel="noreferrer">Palawan National High School</a></h3> <h3>Secondary</h3></div> <div class="education-container svelte-1iwm8lp"><h1 class="svelte-1iwm8lp">1989-1995</h1> <h3>East Elementary School</h3> <h3>Primary</h3></div> </main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-8151d78a.js.map
