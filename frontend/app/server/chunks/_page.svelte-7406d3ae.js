import { c as create_ssr_component, a as subscribe, i as add_styles, f as escape, v as validate_component, e as add_attribute, j as each } from './ssr-4c1621f1.js';
import { e as selected_menu, p as posts, t as theme, a as admin, c as current_user } from './store-b33e4f9b.js';
import { f as exactAge } from './Database-d3f8efb2.js';
import 'pocketbase';
import './index2-13947cc8.js';
import './shared-server-58a5f352.js';

const css$1 = {
  code: ":root{--red-7:#f03e3e}main.svelte-1p8rmic .news-updates-container.svelte-1p8rmic{position:relative;margin:1rem 1em 0em 1em;background-color:rgba(22, 22, 22, 0.8);border-radius:10px;padding:2rem;color:white}main.svelte-1p8rmic .news-updates-container .date.svelte-1p8rmic{font-weight:300}.content.svelte-1p8rmic.svelte-1p8rmic{text-indent:3ex;font-size:large;margin-bottom:1em}.date.svelte-1p8rmic.svelte-1p8rmic{font-size:small;text-align:right}.delete-notification.svelte-1p8rmic.svelte-1p8rmic{display:flex;position:absolute;background-color:rgba(55, 55, 55, 0.9);justify-content:center;align-items:center;height:100%;width:100%;top:0;left:0}.delete-post-btn.svelte-1p8rmic.svelte-1p8rmic{position:absolute;left:0;top:0;color:black;border-radius:100%;height:25px;width:25px;transition:background-color 0.5s ease-in-out}.delete-post-btn.svelte-1p8rmic.svelte-1p8rmic:hover{background-color:var(--red-7)}@media screen and (max-width: 450px){.content.svelte-1p8rmic.svelte-1p8rmic{font-size:medium}}",
  map: null
};
const Posts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $current_user, $$unsubscribe_current_user;
  $$unsubscribe_current_user = subscribe(current_user, (value) => $current_user = value);
  let is_deleting = null;
  let { posts: posts2 } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts2 !== void 0)
    $$bindings.posts(posts2);
  $$result.css.add(css$1);
  $$unsubscribe_current_user();
  return `<main class="svelte-1p8rmic">${each(posts2, (post) => {
    return `<div class="news-updates-container svelte-1p8rmic"><form method="POST">${$current_user?.role == 0 ? `<button class="delete-post-btn svelte-1p8rmic"${add_attribute("id", post.id, 0)} formaction="/?/delete_post"><i class="ri-close-line"></i> </button>` : ``} <input hidden name="post_id"${add_attribute("value", post.id, 0)}></form> <div class="content svelte-1p8rmic"><!-- HTML_TAG_START -->${post.content}<!-- HTML_TAG_END --></div> <div class="date text-sm text-right svelte-1p8rmic">${escape(new Date(post.created).toLocaleString("en-us", {
      timeZone: "Asia/Manila",
      dateStyle: "medium",
      timeStyle: "long"
    }))}</div> ${is_deleting == post.id ? `<div class="delete-notification svelte-1p8rmic" data-svelte-h="svelte-1vy8v26">deleting post...</div>` : ``} </div>`;
  })} </main>`;
});
const css = {
  code: ':root{--green-5:#51cf66}main.svelte-1urnr4z.svelte-1urnr4z{display:flex;flex-direction:column;padding:2rem 1rem}a.svelte-1urnr4z.svelte-1urnr4z{display:inline-flex;align-items:center;gap:10px;position:relative;color:black;text-decoration:none\r\n    }a.svelte-1urnr4z.svelte-1urnr4z:after{content:"";position:absolute;bottom:-1px;left:0;width:100%;height:2px;background:blue;transform:rotateY(90deg);transform-origin:0 0;transform-origin:right top;transition:height 200ms, transform 200ms}a.svelte-1urnr4z.svelte-1urnr4z:hover:after{transform:rotateX(0deg);transform-origin:left top}form.svelte-1urnr4z textarea.svelte-1urnr4z{padding:15px 20px;border-radius:5px;border:solid 1px black;box-sizing:border-box;width:100%;min-height:80px;resize:vertical;font-family:inherit;font-size:inherit}form.svelte-1urnr4z button.svelte-1urnr4z{float:right;padding:10px 30px;background-color:darkgreen;border-radius:5px;color:white}form.svelte-1urnr4z button.svelte-1urnr4z:disabled{opacity:0.5;color:lightgray;cursor:auto}form.svelte-1urnr4z.svelte-1urnr4z{padding:10px;margin-bottom:3em}.post.svelte-1urnr4z .loading-indicator.svelte-1urnr4z{display:flex;width:100%;place-content:center}.post-title.svelte-1urnr4z.svelte-1urnr4z{font-size:1.75rem;font-weight:bold}h1.svelte-1urnr4z.svelte-1urnr4z{font-size:2.75rem;font-weight:700;white-space:nowrap}h3.svelte-1urnr4z.svelte-1urnr4z{font-size:1.5rem;font-weight:700}.me-container.svelte-1urnr4z.svelte-1urnr4z{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto;margin-bottom:4em}.me-details-container.svelte-1urnr4z.svelte-1urnr4z{width:100%;align-items:center;margin:auto;padding:1rem}.me-img.svelte-1urnr4z.svelte-1urnr4z{padding:1rem}.me-img.svelte-1urnr4z img.svelte-1urnr4z{border-radius:100%;align-self:center}a.svelte-1urnr4z.svelte-1urnr4z:not(.links a){color:cadetblue}.links.svelte-1urnr4z.svelte-1urnr4z{display:flex;gap:10px;padding-block:10px}.links.svelte-1urnr4z a.svelte-1urnr4z{transition:transform ease-in-out 0.2s;font-size:2rem}.links.svelte-1urnr4z a.svelte-1urnr4z:hover{transform:scale(1.2)}.info-wrapper.svelte-1urnr4z.svelte-1urnr4z{display:flex;flex-direction:column}.info-wrapper.svelte-1urnr4z .my-status.svelte-1urnr4z{font-weight:bold;color:gray}.info-wrapper.svelte-1urnr4z .my-status.online.svelte-1urnr4z{color:var(--green-5)}@media screen and (max-width: 650px){main.svelte-1urnr4z.svelte-1urnr4z{padding:1rem}.me-container.svelte-1urnr4z.svelte-1urnr4z{display:flex;flex-direction:column;align-items:center;align-self:center}h2.svelte-1urnr4z.svelte-1urnr4z{padding-inline:10px}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $posts, $$unsubscribe_posts;
  let $theme, $$unsubscribe_theme;
  let $admin, $$unsubscribe_admin;
  let $current_user, $$unsubscribe_current_user;
  $$unsubscribe_posts = subscribe(posts, (value) => $posts = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_admin = subscribe(admin, (value) => $admin = value);
  $$unsubscribe_current_user = subscribe(current_user, (value) => $current_user = value);
  selected_menu.set("dashboard");
  let textArea;
  const my_bd = /* @__PURE__ */ (/* @__PURE__ */ new Date("April 22, 1982 16:30:00 GMT+8:00")).toLocaleString("en-us", { dateStyle: "medium", timeStyle: "long" });
  const myAge = exactAge(my_bd);
  $$result.css.add(css);
  $$unsubscribe_posts();
  $$unsubscribe_theme();
  $$unsubscribe_admin();
  $$unsubscribe_current_user();
  return `${$$result.head += `<!-- HEAD_svelte-1ml1tnl_START -->${$$result.title = `<title>Dashboard - Michael Santiago</title>`, ""}<!-- HEAD_svelte-1ml1tnl_END -->`, ""} <main class="svelte-1urnr4z"><div class="me-container svelte-1urnr4z"><div class="me-img svelte-1urnr4z" data-svelte-h="svelte-13c59z9"><img src="./me.jpg" alt="Michael Santiago" width="300px" class="svelte-1urnr4z"></div> <div class="me-details-container svelte-1urnr4z"><h1 class="svelte-1urnr4z"${add_styles({
    "color": $theme === "light" ? "brown" : "orange"
  })} data-svelte-h="svelte-1uepkki">Michael Santiago</h1> <h3 class="svelte-1urnr4z" data-svelte-h="svelte-14wbp0f">Software Developer</h3> <div class="info-wrapper svelte-1urnr4z"><h4>👨‍💼
                    ${myAge.year > 1 ? `<span>${escape(myAge.year)} years</span>` : `<span>${escape(myAge.year)} year</span>`} ${myAge.months_over > 1 ? `<span>${escape(myAge.months_over)} months</span>` : `<span>${escape(myAge.months_over)} month</span>`} ${myAge.weeks_over > 1 ? `<span>${escape(myAge.weeks_over)} weeks</span>` : `<span>${escape(myAge.weeks_over)} week</span>`}
                    and
                    ${myAge.days_over > 1 ? `<span>${escape(myAge.days_over)} days</span>` : `<span>${escape(myAge.days_over)} day</span>`}
                    of life existence.</h4> <h4 data-svelte-h="svelte-fak7ci">🏝️ Puerto Princesa City, Palawan, Philippines</h4> <span data-svelte-h="svelte-7fchai">📧 <a href="mailto:contact@michaelsantiago.au" class="svelte-1urnr4z">contact@michaelsantiago.au</a> (don&#39;t do it now)</span> <span class="${["my-status svelte-1urnr4z", $admin?.is_online ? "online" : ""].join(" ").trim()}">${escape($admin.is_online ? "On-line" : "Off-line")}</span></div> <div class="links svelte-1urnr4z" data-svelte-h="svelte-1s05nfw"><a href="https://github.com/michaelusantiago" target="_blank" rel="noreferrer" class="svelte-1urnr4z"><i class="ri-github-fill"></i></a> <a href="https://twitter.com/mus_e" target="_blank" rel="noreferrer" class="svelte-1urnr4z"><i class="ri-twitter-fill"></i></a> <a href="https://www.linkedin.com/in/michaelusantiago" target="_blank" rel="noreferrer" class="svelte-1urnr4z"><i class="ri-linkedin-box-fill"></i></a></div></div></div> <h2 class="post-title svelte-1urnr4z" data-svelte-h="svelte-1do188w">What&#39;s Up?</h2>  ${$current_user?.role === 0 ? `<form method="POST" class="svelte-1urnr4z"><textarea name="content" class="svelte-1urnr4z"${add_attribute("this", textArea, 0)}>${escape("")}</textarea> <button ${"disabled"} formaction="/?/post" class="svelte-1urnr4z">${escape("Post")}</button></form>` : ``} <div class="post svelte-1urnr4z">${`${validate_component(Posts, "Posts").$$render($$result, { posts: $posts }, {}, {})}`}</div> </main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-7406d3ae.js.map
