import { c as create_ssr_component } from './ssr-4c1621f1.js';
import { e as selected_menu } from './store-b33e4f9b.js';
import './index2-13947cc8.js';

const css = {
  code: ":root{--green-3:#8ce99a}main.svelte-1fbahj.svelte-1fbahj{padding:1rem}.head-title.svelte-1fbahj.svelte-1fbahj{font-size:1.5rem;font-weight:bold}.project.svelte-1fbahj.svelte-1fbahj{padding:1rem 0}.project.svelte-1fbahj a.svelte-1fbahj{font-weight:bold;font-size:x-large}.project.svelte-1fbahj a.svelte-1fbahj:hover{color:var(--green-3)}.project.svelte-1fbahj .extra-info h3.svelte-1fbahj{font-weight:bold;font-size:0.9rem}.project.svelte-1fbahj .extra-info.svelte-1fbahj{display:flex;flex-direction:column;gap:5px;color:black;padding:8px;background-color:whitesmoke;width:55%;font-size:0.8rem;font-weight:300}.project.svelte-1fbahj img.svelte-1fbahj{margin-block:0.5rem;border:2px solid darkgray}.description.svelte-1fbahj.svelte-1fbahj{display:flex;flex-direction:column;gap:5px}.stack.svelte-1fbahj.svelte-1fbahj{background-color:darkgrey;padding:3px 10px;border-radius:50px;font-size:small;font-weight:300;color:black}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  selected_menu.set("projects");
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-ba8gpn_START -->${$$result.title = `<title>Projects - Michael Santiago</title>`, ""}<!-- HEAD_svelte-ba8gpn_END -->`, ""} <main class="svelte-1fbahj" data-svelte-h="svelte-yzfivf"><h1 class="head-title svelte-1fbahj">Projects</h1> <div class="project svelte-1fbahj"><h2 class="project-title">2022 - POS22 Client Manager</h2> <a title="POS22 Client Manager" href="https://npos-manager.vercel.app" target="_blank" rel="noreferrer" class="svelte-1fbahj"><img src="/pos22 manager.png" width="500px" alt="pos22 website" class="svelte-1fbahj"></a> <div class="description svelte-1fbahj"><div><span class="stack svelte-1fbahj">TypeScript</span>
                +
                <span class="stack svelte-1fbahj">SvelteKit</span>
                +
                <span class="stack svelte-1fbahj">MongoDB</span></div></div></div> <div class="project svelte-1fbahj"><h2 class="project-title">2021 - POS22 Official Website</h2> <a title="POS22 Official Website" href="https://npos.vercel.app" target="_blank" rel="noreferrer" class="svelte-1fbahj"><img src="/pos22 website.png" width="500px" alt="pos22 website" class="svelte-1fbahj"></a> <div class="description svelte-1fbahj"><div><span class="stack svelte-1fbahj">TypeScript</span>
                +
                <span class="stack svelte-1fbahj">SvelteKit</span>
                +
                <span class="stack svelte-1fbahj">MongoDB</span></div></div></div> <div class="project svelte-1fbahj"><h2 class="project-title">2019 - POS22 App</h2> <div class="extra-info svelte-1fbahj"><h3 class="svelte-1fbahj">Sample/Test Account</h3> <p>Account ID: 62B4A16A15FB0510FF5EDF57</p> <p>Username: TrialMan</p> <p>Password: trialman</p></div> <a title="POS22 App" href="https://npos-app.vercel.app" target="_blank" rel="noreferrer" class="svelte-1fbahj"><img src="/pos22 app.png" width="500px" alt="pos22 app" class="svelte-1fbahj"></a> <div class="description svelte-1fbahj"><div><span class="stack svelte-1fbahj">ReactJS</span>
                +
                <span class="stack svelte-1fbahj">MongoDB</span></div></div></div> <div class="project svelte-1fbahj"><h2 class="project-title">PLAYGROUND</h2> <div class="extra-info svelte-1fbahj"><p>Demonstrated the use of baserow third party Database/RESt API provider.</p> <p>It&#39;s a CRUD type of application, which also showcase the use of regex to validate certain required fields.</p> <p>The first one I developed was the one in Svelte, then the Vuejs version. That&#39;s why the Vuejs version is a little bit more improved in my observation.</p> <p>*App is not mobile screen ready or responsive.</p></div> <ul><li><a class="just-link svelte-1fbahj" title="Svelte + Baserow" href="https://everneat.vercel.app" target="_blank" rel="noreferrer">On Svelte (Everneat)</a></li> <li><a class="just-link svelte-1fbahj" title="Vuejs + Baserow" href="https://kumpanya.vercel.app" target="_blank" rel="noreferrer">On Vuejs (Kumpanya)</a></li></ul></div> </main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-d1f11e3f.js.map
