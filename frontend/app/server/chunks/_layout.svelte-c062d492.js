import { c as create_ssr_component, a as subscribe, b as set_store_value, v as validate_component, d as createEventDispatcher, o as onDestroy, e as add_attribute, f as escape, g as getContext } from './ssr-4c1621f1.js';
import { c as current_user, a as admin, u as unread_chats, s as selected_drop_down_menu, b as chats, d as send_to_id, p as posts, f as friends_list, t as theme, e as selected_menu } from './store-b33e4f9b.js';
import PocketBase from 'pocketbase';
import { p as public_env } from './shared-server-58a5f352.js';
import './index2-13947cc8.js';

const css$8 = {
  code: `:root{--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
    0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
    0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));--shadow-color:220 3% 15%;--shadow-strength:1%;--red-6:#fa5252;--blue-6:#228be6;--green-6:#40c057;--blue-7:#1c7ed6;--green-7:#37b24d}:root{--bg-color:white}#window-frame.svelte-ck7r4a.svelte-ck7r4a{display:flex;position:fixed;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;top:0;left:0;height:100%;width:100%;z-index:2;color:black;;;transition:background-color 0.8s ease-out}.inner-window.svelte-ck7r4a.svelte-ck7r4a{display:flex;position:absolute;flex-direction:column;box-sizing:border-box;min-width:400px;max-width:400px;gap:15px;padding:20px 25px;border:solid 1px lightblue;background-color:whitesmoke;box-shadow:var(--shadow-3);right:0;top:0;height:100%;overflow-y:auto}.inner-window.svelte-ck7r4a .head-title.svelte-ck7r4a{font-weight:bold;font-size:x-large;padding:2px;margin-block-end:12px}.inner-window.svelte-ck7r4a .forgot-password.svelte-ck7r4a{background:transparent;text-align:left}.inner-window.svelte-ck7r4a label.svelte-ck7r4a{text-transform:uppercase;font-size:small;background-color:var(--bg-color);padding:10px 15px;border:whitesmoke solid 3.5px;border-radius:0.375rem;color:gray}.inner-window.svelte-ck7r4a label.svelte-ck7r4a:focus-within{border-color:lightgray}.inner-window.svelte-ck7r4a input.svelte-ck7r4a{width:100%;font-size:medium;outline:none;padding-inline:0;font-family:inherit}.inner-window.svelte-ck7r4a input.svelte-ck7r4a:-webkit-autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-ck7r4a input.svelte-ck7r4a:autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-ck7r4a .action-btns-wrapper button.svelte-ck7r4a{display:flex;align-items:center;gap:10px;padding:0.5rem 1rem;border-radius:5px;font-size:1rem;padding:0.7rem 2rem;cursor:pointer}.inner-window.svelte-ck7r4a .action-btns-wrapper button.svelte-ck7r4a:hover,.inner-window.svelte-ck7r4a .action-btns-wrapper button.svelte-ck7r4a:active,.inner-window.svelte-ck7r4a .action-btns-wrapper button.svelte-ck7r4a:focus{background-color:rgb(199, 202, 193)}.inner-window.svelte-ck7r4a .action-btns-wrapper.svelte-ck7r4a{display:flex;justify-content:flex-end;flex-direction:column-reverse}.inner-window.svelte-ck7r4a .action-btns-wrapper .forgot-password.svelte-ck7r4a{color:black;padding:0 1rem;font-size:medium}.inner-window.svelte-ck7r4a .action-btns-wrapper .forgot-password.svelte-ck7r4a:active,.inner-window.svelte-ck7r4a .action-btns-wrapper .forgot-password.svelte-ck7r4a:focus,.inner-window.svelte-ck7r4a .action-btns-wrapper .forgot-password.svelte-ck7r4a:hover{background-color:transparent;outline:none;text-decoration:underline}.inner-window.svelte-ck7r4a .action-btns-wrapper .action-btns-group.svelte-ck7r4a{display:flex;justify-content:right;margin-top:2.2rem;gap:5px}.inner-window.svelte-ck7r4a .action-btns-wrapper .action-btns-group button[type="submit"].svelte-ck7r4a{background-color:var(--blue-6)}.inner-window.svelte-ck7r4a .action-btns-wrapper .action-btns-group button[type="submit"].svelte-ck7r4a:hover{background-color:var(--blue-7)}.inner-window.svelte-ck7r4a .action-btns-wrapper .action-btns-group button[type="reset"].svelte-ck7r4a{background-color:var(--green-6)}.inner-window.svelte-ck7r4a .action-btns-wrapper .action-btns-group button[type="reset"].svelte-ck7r4a:hover{background-color:var(--green-7)}.inner-window.svelte-ck7r4a .error.svelte-ck7r4a{font-size:small;text-transform:lowercase;display:flex;color:red;padding:2px 6px;margin-top:5px;box-sizing:border-box}.inner-window.svelte-ck7r4a .error-box.svelte-ck7r4a{background-color:var(--red-6);padding:8px 10px;margin-inline:5px;font-weight:bold;font-size:small;color:white;border-radius:5px}@media(prefers-color-scheme: dark){:root{--shadow-color:220 40% 2%;--shadow-strength:25%}}`,
  map: null
};
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let modal;
  let email;
  let password;
  const previously_focused = typeof document !== "undefined" && document.activeElement;
  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
  $$result.css.add(css$8);
  return ` <main><div id="window-frame" tabindex="0" role="button" class="svelte-ck7r4a"${add_attribute("this", modal, 0)}><form class="inner-window svelte-ck7r4a" method="POST" action="/?/log_in"><h1 class="head-title svelte-ck7r4a" data-svelte-h="svelte-mnarx5">Log In</h1> <label class="svelte-ck7r4a">Email
                <input name="email" type="email" class="svelte-ck7r4a"${add_attribute("this", email, 0)}> ${``}</label> <label class="svelte-ck7r4a">Password
                <input name="password" type="password" class="svelte-ck7r4a"${add_attribute("this", password, 0)}> ${``}</label> ${``} <div class="action-btns-wrapper svelte-ck7r4a"><div class="action-btns-group svelte-ck7r4a"><button ${""} type="submit" class="svelte-ck7r4a"><span data-svelte-h="svelte-m3t7dv">Log In</span> ${``}</button> <button type="reset" class="svelte-ck7r4a" data-svelte-h="svelte-p542xn">Cancel</button></div>  <button class="forgot-password svelte-ck7r4a" data-svelte-h="svelte-d1odah">Forgot password?</button></div></form></div> </main>`;
});
const css$7 = {
  code: `:root{--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
    0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
    0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));--shadow-color:220 3% 15%;--shadow-strength:1%;--blue-7:#1c7ed6;--green-6:#40c057;--green-7:#37b24d}:root{--bg-color:white}#window-frame.svelte-wn22wo.svelte-wn22wo{display:flex;position:fixed;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;top:0;left:0;height:100%;width:100%;z-index:2;color:black;;;transition:background-color 0.8s ease-out}.inner-window.svelte-wn22wo.svelte-wn22wo{display:flex;position:absolute;flex-direction:column;box-sizing:border-box;min-width:400px;max-width:400px;padding:20px 25px;border:solid 1px lightblue;background-color:whitesmoke;box-shadow:var(--shadow-3);right:0;top:0;height:100%;overflow-y:auto}.inner-window.svelte-wn22wo .head-title.svelte-wn22wo{font-weight:bold;font-size:x-large;padding:2px;margin-block-end:12px}.inner-window.svelte-wn22wo label.svelte-wn22wo{text-transform:uppercase;font-size:small;background-color:var(--bg-color);padding:10px 15px;border:whitesmoke solid 3.5px;border-radius:0.375rem;color:gray}.inner-window.svelte-wn22wo label.svelte-wn22wo:focus-within{border-color:lightgray}.inner-window.svelte-wn22wo input.svelte-wn22wo,.inner-window.svelte-wn22wo select.svelte-wn22wo{width:100%;font-size:medium;outline:none;padding-inline:0;font-family:inherit}.inner-window.svelte-wn22wo input.svelte-wn22wo:-webkit-autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-wn22wo input.svelte-wn22wo:autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-wn22wo .action-btns-wrapper button.svelte-wn22wo{display:flex;align-items:center;gap:10px;padding:0.5rem 1rem;border-radius:5px;font-size:1rem;padding:0.7rem 2rem;cursor:pointer}.inner-window.svelte-wn22wo .action-btns-wrapper button.svelte-wn22wo:hover,.inner-window.svelte-wn22wo .action-btns-wrapper button.svelte-wn22wo:active,.inner-window.svelte-wn22wo .action-btns-wrapper button.svelte-wn22wo:focus{background-color:rgb(199, 202, 193)}.inner-window.svelte-wn22wo .action-btns-wrapper.svelte-wn22wo{display:flex;justify-content:flex-end;flex-direction:column-reverse}.inner-window.svelte-wn22wo .action-btns-wrapper .action-btns-group.svelte-wn22wo{display:flex;justify-content:right;margin-top:2.2rem;gap:5px}.inner-window.svelte-wn22wo .action-btns-wrapper .action-btns-group button[type="submit"].svelte-wn22wo{background-color:var(--blue-7)}.inner-window.svelte-wn22wo .action-btns-wrapper .action-btns-group button[type="submit"].svelte-wn22wo:hover{background-color:var(--blue-7)}.inner-window.svelte-wn22wo .action-btns-wrapper .action-btns-group button[type="reset"].svelte-wn22wo{background-color:var(--green-6)}.inner-window.svelte-wn22wo .action-btns-wrapper .action-btns-group button[type="reset"].svelte-wn22wo:hover{background-color:var(--green-7)}.inner-window.svelte-wn22wo .error.svelte-wn22wo{font-size:small;text-transform:lowercase;display:flex;color:red;padding:2px 6px;margin-top:5px;box-sizing:border-box}@media(prefers-color-scheme: dark){:root{--shadow-color:220 40% 2%;--shadow-strength:25%}}`,
  map: null
};
const SignUpForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let modal;
  let email;
  let password;
  let confirm_password;
  let first_name;
  let last_name;
  let birth_date;
  const previously_focused = typeof document !== "undefined" && document.activeElement;
  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
  $$result.css.add(css$7);
  return ` <main><div id="window-frame" tabindex="0" role="button" class="svelte-wn22wo"${add_attribute("this", modal, 0)}><form class="inner-window svelte-wn22wo" method="POST" action="/?/sign_up"><h1 class="head-title svelte-wn22wo" data-svelte-h="svelte-1mqfn3m">Sign Up</h1> <label class="svelte-wn22wo">Email
                <input name="email" type="email" class="svelte-wn22wo"${add_attribute("this", email, 0)}> ${``}</label> <label class="svelte-wn22wo">Password
                <input name="password" type="password" class="svelte-wn22wo"${add_attribute("this", password, 0)}> ${``}</label> <label class="svelte-wn22wo">Confirm Password
                <input name="passwordConfirm" type="password" class="svelte-wn22wo"${add_attribute("this", confirm_password, 0)}> ${``}</label> <label class="svelte-wn22wo">First Name
                <input name="first_name" type="text" class="svelte-wn22wo"${add_attribute("this", first_name, 0)}> ${``}</label> <label class="svelte-wn22wo">Last Name
                <input name="last_name" type="text" class="svelte-wn22wo"${add_attribute("this", last_name, 0)}> ${``}</label> <label class="svelte-wn22wo">Gender
                <select name="gender" class="svelte-wn22wo"><option value="Masculine" data-svelte-h="svelte-7d9iu9">Masculine</option><option value="Feminine" data-svelte-h="svelte-ol63aj">Feminine</option><select class="svelte-wn22wo" data-svelte-h="svelte-18rshy3"></select></select></label> <label class="svelte-wn22wo">Birth Date
                <input id="birth_date" name="birth_date" type="date" class="svelte-wn22wo"${add_attribute("this", birth_date, 0)}> ${``}</label>  <div class="action-btns-wrapper svelte-wn22wo"><div class="action-btns-group svelte-wn22wo">${`<button type="submit" class="svelte-wn22wo" data-svelte-h="svelte-1mmlurd">Sign Up</button>`} <button type="reset" class="svelte-wn22wo" data-svelte-h="svelte-125q7y9">Cancel</button></div></div></form></div> </main>`;
});
const css$6 = {
  code: `:root{--container-height:150px;--border-color:blue;--header-bg-color:lightseagreen;--header-bg-hover-color:green;--header-text-color:white;--icon-size:10px;--icon-position:30%;--icon-color:black}main.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{border:solid 1px var(--border-color);border-radius:5px}.header.svelte-1pjxtji input[type="checkbox"].svelte-1pjxtji.svelte-1pjxtji{display:none}.header.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{display:flex;align-items:center;justify-content:space-between;background-color:var(--header-bg-color);color:var(--header-text-color);padding:15px;cursor:pointer}.header.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji:hover{--header-bg-color:var(--header-bg-hover-color)}.header-br.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{transition:border-radius linear 0.5s}.header.svelte-1pjxtji span.svelte-1pjxtji.svelte-1pjxtji{display:flex;justify-content:center;align-items:center;transform:rotate(0deg);transition:transform linear 0.2s}.header.svelte-1pjxtji input[type="checkbox"].svelte-1pjxtji:checked~span.svelte-1pjxtji{transform:rotate(90deg);transition:transform linear 0.2s}.greater-arrow.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{position:relative;padding:0 18px}.greater-arrow.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji:before,.greater-arrow.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji:after{content:'';left:var(--icon-position);border:solid transparent;height:0;width:0;position:absolute}.greater-arrow.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji:after{border-left-color:var(--header-bg-color);border-width:var(--icon-size);margin-top:calc(var(--icon-size) * -1)}.greater-arrow.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji:before{border-left-color:var(--icon-color);border-width:calc(var(--icon-size) + 5px);margin-top:calc((var(--icon-size) + 5px) * -1)}.container.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{height:var(--container-height);overflow:hidden;transition:height linear 0.2s}.hide-container.svelte-1pjxtji.svelte-1pjxtji.svelte-1pjxtji{height:0;transition:height linear 0.2s}`,
  map: null
};
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { header_title } = $$props;
  let { open = false } = $$props;
  if ($$props.header_title === void 0 && $$bindings.header_title && header_title !== void 0)
    $$bindings.header_title(header_title);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$result.css.add(css$6);
  return `  <main class="svelte-1pjxtji"><label class="${["header svelte-1pjxtji", !open ? "header-br" : ""].join(" ").trim()}"><input type="checkbox" class="svelte-1pjxtji"${add_attribute("checked", open, 1)}> ${escape(header_title)} <span class="svelte-1pjxtji" data-svelte-h="svelte-j2mdvy"><div class="greater-arrow svelte-1pjxtji"></div></span></label> <div class="${["container svelte-1pjxtji", !open ? "hide-container" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div> </main>`;
});
const css$5 = {
  code: `:root{--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
    0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
    0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));--shadow-color:220 3% 15%;--shadow-strength:1%;--blue-6:#228be6;--green-6:#40c057;--blue-7:#1c7ed6;--green-7:#37b24d}:root{--bg-color:white}#window-frame.svelte-2t9v52.svelte-2t9v52{display:flex;position:fixed;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;top:0;left:0;height:100%;width:100%;z-index:2;color:black;;;transition:background-color 0.8s ease-out}.inner-window.svelte-2t9v52.svelte-2t9v52{display:flex;position:absolute;flex-direction:column;box-sizing:border-box;min-width:400px;max-width:400px;padding:20px 25px;border:solid 1px lightblue;background-color:whitesmoke;box-shadow:var(--shadow-3);right:0;top:0;height:100%;overflow-y:auto}.inner-window.svelte-2t9v52 .head-title.svelte-2t9v52{font-weight:bold;font-size:x-large;padding:2px;margin-block-end:12px}.inner-window.svelte-2t9v52 form label.svelte-2t9v52{display:block;text-transform:uppercase;font-size:small;background-color:var(--bg-color);padding:10px 15px;border:whitesmoke solid 3.5px;border-radius:0.375rem;color:gray}.inner-window.svelte-2t9v52 form label.svelte-2t9v52:focus-within{border-color:lightgray}.inner-window.svelte-2t9v52 form input.svelte-2t9v52,.inner-window.svelte-2t9v52 form select.svelte-2t9v52{width:100%;font-size:medium;outline:none;padding-inline:0;font-family:inherit}.inner-window.svelte-2t9v52 form input.svelte-2t9v52:-webkit-autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-2t9v52 form input.svelte-2t9v52:autofill{box-shadow:0 0 0px 1000px var(--bg-color) inset}.inner-window.svelte-2t9v52 form .group-btn.svelte-2t9v52{display:flex;justify-content:right;margin-top:1.5rem;gap:5px}.inner-window.svelte-2t9v52 form .group-btn button.svelte-2t9v52{padding:0.5rem 1rem;border-radius:5px;font-size:1rem;padding:0.7rem 2rem;cursor:pointer;color:black}.inner-window.svelte-2t9v52 form .group-btn button.svelte-2t9v52:hover,.inner-window.svelte-2t9v52 form .group-btn button.svelte-2t9v52:active,.inner-window.svelte-2t9v52 form .group-btn button.svelte-2t9v52:focus{background-color:rgb(199, 202, 193)}.inner-window.svelte-2t9v52 form .group-btn button span.svelte-2t9v52{display:flex;gap:5px}.inner-window.svelte-2t9v52 form .group-btn button[type="submit"].svelte-2t9v52{background-color:var(--blue-6)}.inner-window.svelte-2t9v52 form .group-btn button[type="submit"].svelte-2t9v52:hover{background-color:var(--blue-7)}.inner-window.svelte-2t9v52 form .group-btn button[type="reset"].svelte-2t9v52{background-color:var(--green-6)}.inner-window.svelte-2t9v52 form .group-btn button[type="reset"].svelte-2t9v52:hover{background-color:var(--green-7)}.inner-window.svelte-2t9v52 form .user-email.svelte-2t9v52{padding:10px 5px}.inner-window.svelte-2t9v52 form .error.svelte-2t9v52{font-size:small;text-transform:lowercase;display:flex;color:red;padding:2px 6px;margin-top:5px;box-sizing:border-box}@media(prefers-color-scheme: dark){:root{--shadow-color:220 40% 2%;--shadow-strength:25%}}`,
  map: null
};
const ProfileForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  let modal;
  let first_name;
  let last_name;
  let current_password;
  let new_password;
  let confirm_new_password;
  createEventDispatcher();
  const previously_focused = typeof document !== "undefined" && document.activeElement;
  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css$5);
  return ` <main><div id="window-frame" tabindex="0" role="button" class="svelte-2t9v52"${add_attribute("this", modal, 0)}><div class="inner-window svelte-2t9v52"><h1 class="head-title svelte-2t9v52" data-svelte-h="svelte-de01pl">Profile</h1> <div> <div style="display: contents; --border-color:none; --header-bg-color:darkgray; --header-bg-hover-color:lightgray; --header-text-color:black; --icon-size:5px; --icon-position:30%; --icon-color:black; --container-height:400px;">${validate_component(Container, "Container").$$render($$result, { header_title: "Basic Info", open: true }, {}, {
    default: () => {
      return `<form method="POST"><label class="svelte-2t9v52">First Name
                            <input required name="first_name" type="text"${add_attribute("value", user.first_name, 0)} class="svelte-2t9v52"${add_attribute("this", first_name, 0)}> ${``}</label> <label class="svelte-2t9v52">Last Name
                            <input required name="last_name" type="text"${add_attribute("value", user.last_name, 0)} class="svelte-2t9v52"${add_attribute("this", last_name, 0)}> ${``}</label> <label class="svelte-2t9v52">Gender
                            <select name="gender"${add_attribute("value", user.gender ?? "", 0)} class="svelte-2t9v52"><option value="" hidden disabled data-svelte-h="svelte-1c069ow">- select -</option><option value="Masculine" data-svelte-h="svelte-1hnaehk">Masculine</option><option value="Feminine" data-svelte-h="svelte-1a0r8ki">Feminine</option><select class="svelte-2t9v52" data-svelte-h="svelte-12rxiaj"></select></select></label> <label class="svelte-2t9v52">Birth Date
                            <input id="birth_date" name="birth_date" type="date"${add_attribute("value", new Date(user.birth_date).toLocaleString("en-CA").split(",")[0], 0)} class="svelte-2t9v52"></label> <div class="group-btn svelte-2t9v52"><button type="submit" formaction="/?/update_basic_info" class="svelte-2t9v52"><span class="svelte-2t9v52">Save Changes
                                    ${``}</span></button> <button type="reset" class="svelte-2t9v52" data-svelte-h="svelte-11kfu5v">Close</button></div></form>`;
    }
  })}</div>  <div style="display: contents; --border-color:none; --header-bg-color:darkgray; --header-bg-hover-color:lightgray; --header-text-color:black; --icon-size:5px; --icon-position:30%; --icon-color:black; --container-height:350px;">${validate_component(Container, "Container").$$render($$result, { header_title: "Change Password" }, {}, {
    default: () => {
      return `<form method="POST"><label class="svelte-2t9v52">Current Password
                            <input required name="current_password" type="password" class="svelte-2t9v52"${add_attribute("this", current_password, 0)}> ${``}</label> <label class="svelte-2t9v52">New Password
                            <input required name="password" type="password" class="svelte-2t9v52"${add_attribute("this", new_password, 0)}> ${``}</label> <label class="svelte-2t9v52">Confirm Password
                            <input required name="confirm_password" type="password" class="svelte-2t9v52"${add_attribute("this", confirm_new_password, 0)}> ${``}</label> <div> <div class="group-btn svelte-2t9v52"><button type="submit" formaction="/?/change_password" class="svelte-2t9v52"><span class="svelte-2t9v52">Save Changes
                                        ${``}</span></button> <button type="reset" formaction="/?/close" class="svelte-2t9v52" data-svelte-h="svelte-1g0j8hp">Close</button></div></div></form>`;
    }
  })}</div>  <div style="display: contents; --border-color:none; --header-bg-color:darkgray; --header-bg-hover-color:lightgray; --header-text-color:black; --icon-size:5px; --icon-position:30%; --icon-color:black; --container-height:270px;">${validate_component(Container, "Container").$$render($$result, { header_title: "Change Email Address" }, {}, {
    default: () => {
      return `<form method="POST"><h1 class="user-email svelte-2t9v52">${escape(user.email)}</h1> <label class="svelte-2t9v52">Current Password
                            <input required name="password" type="password" class="svelte-2t9v52"> ${``} ${``}</label> <label class="svelte-2t9v52">New Email
                            <input required name="newEmail" type="email" class="svelte-2t9v52"> ${``}</label> <div class="group-btn svelte-2t9v52"><button type="submit" formaction="/?/change_email" class="svelte-2t9v52"><span class="svelte-2t9v52">Save Changes
                                    ${``}</span></button> <button type="reset" formaction="/?/close" class="svelte-2t9v52" data-svelte-h="svelte-7bch8t">Close</button></div></form>`;
    }
  })}</div></div></div></div> </main>`;
});
const css$4 = {
  code: "main.svelte-a9zu1v:active button.svelte-a9zu1v{outline:none}main.svelte-a9zu1v:focus-within button.svelte-a9zu1v{outline:solid 1px inherit}button.svelte-a9zu1v.svelte-a9zu1v{display:flex;justify-content:center;align-items:center;margin:auto;padding:0;border-radius:100%;background-color:transparent}.black.svelte-a9zu1v.svelte-a9zu1v{color:black}button.svelte-a9zu1v .icon.svelte-a9zu1v{color:rgb(255, 255, 255);display:flex;justify-content:center;align-items:center;height:32px;width:32px;border-radius:100%;font-size:1.25rem;transition:background-color 0.5s ease-in-out}button.svelte-a9zu1v .icon.svelte-a9zu1v:hover{background-color:rgba(169, 169, 169, 0.411)}.animate.svelte-a9zu1v.svelte-a9zu1v{animation-name:svelte-a9zu1v-swing;animation-duration:1s;animation-timing-function:linear;animation-iteration-count:initial}@keyframes svelte-a9zu1v-swing{0%{transform:rotate(0deg)}20%{transform:rotate(45deg)}40%{transform:rotate(0deg)}60%{transform:rotate(-45deg)}100%{transform:rotate(0deg)}}",
  map: null
};
const ThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$result.css.add(css$4);
  $$unsubscribe_theme();
  return `<main class="svelte-a9zu1v"><button title="switch theme" class="svelte-a9zu1v"><span class="${["icon svelte-a9zu1v", ""].join(" ").trim()}">${$theme === "dark" ? `<i class="ri-moon-clear-fill"></i>` : `<i class="ri-sun-fill black svelte-a9zu1v"></i>`}</span></button> </main>`;
});
const css$3 = {
  code: "button.svelte-1vaweae.svelte-1vaweae{padding:0;background-color:transparent;border-radius:100%}.dd-menu.svelte-1vaweae button.svelte-1vaweae{display:flex;justify-content:space-between;width:100%;text-align:left;padding:3px 7px;font-size:1rem;border-radius:0}.dd-menu.svelte-1vaweae button.svelte-1vaweae:disabled{color:lightgray;opacity:0.3}.dd-menu.svelte-1vaweae.svelte-1vaweae{display:flex;flex-direction:column;position:absolute;padding:17px;width:10rem;right:1rem;gap:10px;border-bottom-left-radius:12px;border-bottom-right-radius:12px;box-shadow:0 3.4px 6.3px rgba(50, 50, 50, 0.09), 0 7px 10px rgba(50, 50, 50, 0.09);z-index:13}button.svelte-1vaweae .icon.svelte-1vaweae{display:flex;justify-content:center;align-items:center;height:32px;width:32px;border-radius:100%;transition:background-color 0.5s ease-in-out;font-size:1.5rem}button.svelte-1vaweae .icon.svelte-1vaweae:hover{background-color:rgba(169, 169, 169, 0.411)}",
  map: null
};
const DropDownMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_current_user;
  $$unsubscribe_current_user = subscribe(current_user, (value) => value);
  $$result.css.add(css$3);
  $$unsubscribe_current_user();
  return ` <main><button class="svelte-1vaweae" data-svelte-h="svelte-108c72x"><span class="icon svelte-1vaweae"><i class="ri-arrow-down-s-fill"></i></span></button> ${``} </main>`;
});
const css$2 = {
  code: `nav.svelte-12m65i.svelte-12m65i{padding:10px 35px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;font-family:"Rajdhani", sans-serif;display:flex;gap:15px;position:sticky;align-items:center;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-weight:600;font-size:1.3rem;top:0;z-index:1\r
    }nav.svelte-12m65i ul.svelte-12m65i{display:flex;gap:1rem}nav.svelte-12m65i ul.svelte-12m65i{flex:1}nav.svelte-12m65i .me.svelte-12m65i{display:flex;;;white-space:nowrap;align-items:center;justify-content:center;margin:auto;animation:svelte-12m65i-rolling_text_fill;animation-duration:120s;animation-delay:1s;animation-timing-function:linear;animation-iteration-count:infinite;animation-direction:alternate-reverse;animation-fill-mode:both;background-size:400%;-webkit-text-fill-color:transparent;-webkit-background-clip:text}nav.svelte-12m65i .current-user.svelte-12m65i{display:flex;align-items:center}.nav-shadow-black.svelte-12m65i.svelte-12m65i{box-shadow:0 3.4px 6.3px rgba(0, 0, 0, 0.09), 0 7px 10px rgba(0, 0, 0, 0.09)}.nav-shadow-white.svelte-12m65i.svelte-12m65i{box-shadow:0 3.4px 6.3px rgba(255, 255, 255, 0.09), 0 7px 10px rgba(255, 255, 255, 0.09)}a.svelte-12m65i.svelte-12m65i{display:flex;white-space:nowrap}.total-unread-chats.svelte-12m65i.svelte-12m65i{display:flex;font-family:'Courier New', Courier, monospace;font-size:small;height:20px;width:20px;align-items:center;justify-content:center;border-radius:100%;color:#222;background-color:yellowgreen}@keyframes svelte-12m65i-rolling_text_fill{from{background-position:0%}to{background-position:400%}}@media screen and (max-width: 650px){nav.svelte-12m65i .me.svelte-12m65i{display:none}}`,
  map: null
};
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let total_unread_chats;
  let $unread_chats, $$unsubscribe_unread_chats;
  let $theme, $$unsubscribe_theme;
  let $selected_menu, $$unsubscribe_selected_menu;
  let $current_user, $$unsubscribe_current_user;
  $$unsubscribe_unread_chats = subscribe(unread_chats, (value) => $unread_chats = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_selected_menu = subscribe(selected_menu, (value) => $selected_menu = value);
  $$unsubscribe_current_user = subscribe(current_user, (value) => $current_user = value);
  let currentY = 0;
  $$result.css.add(css$2);
  total_unread_chats = $unread_chats.length;
  $$unsubscribe_unread_chats();
  $$unsubscribe_theme();
  $$unsubscribe_selected_menu();
  $$unsubscribe_current_user();
  return ` <nav class="${[
    "svelte-12m65i",
    ($theme === "dark" && currentY >= 11 ? "nav-shadow-white" : "") + " " + ($theme === "light" && currentY >= 11 ? "nav-shadow-black" : "")
  ].join(" ").trim()}"><ul class="svelte-12m65i"><li><a href="/" class="${["svelte-12m65i", $selected_menu === "dashboard" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-3e0gtm">Dashboard</a></li> <li><a href="/projects" class="${["svelte-12m65i", $selected_menu === "projects" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1jcppl0">Projects</a></li> ${$current_user ? `<li><a href="/background" class="${["svelte-12m65i", $selected_menu === "background" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-18xdasc">Background</a></li> <li><a href="/chat" class="${["svelte-12m65i", $selected_menu === "chat" ? "active" : ""].join(" ").trim()}">Chat
                    ${total_unread_chats ? ` <span class="total-unread-chats svelte-12m65i">${escape(total_unread_chats)}</span>` : ``}</a></li>` : ``}</ul> <span class="me svelte-12m65i" data-svelte-h="svelte-1y5jesa">© MICHAEL SANTIAGO</span> <span>${validate_component(ThemeButton, "ThemeButton").$$render($$result, {}, {}, {})}</span> <span class="current-user svelte-12m65i">${$current_user ? `${$current_user?.role == 1 ? `<p>${escape(`${$current_user?.first_name[0]}${$current_user?.last_name[0]}`)}</p> ` : ``}` : ``} ${validate_component(DropDownMenu, "DropDownMenu").$$render($$result, {}, {}, {})}</span> </nav>`;
});
const css$1 = {
  code: "footer.svelte-1rsxejd.svelte-1rsxejd{display:flex;font-size:0.9rem}footer.svelte-1rsxejd span.svelte-1rsxejd{flex:1;white-space:nowrap}footer.svelte-1rsxejd ul.svelte-1rsxejd{display:flex;align-self:flex-end}footer.svelte-1rsxejd.svelte-1rsxejd{padding:0.5rem;margin-bottom:1rem;border-top:dotted 1px slategray}@media(max-width: 600px){footer.svelte-1rsxejd.svelte-1rsxejd{flex-direction:column}footer.svelte-1rsxejd ul.svelte-1rsxejd{align-self:flex-start}}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="svelte-1rsxejd"><span class="svelte-1rsxejd">Michael Santiago © 2022 - ${escape(( new Date()).getFullYear())}</span> <ul class="svelte-1rsxejd" data-svelte-h="svelte-5ccmx7"><span class="svelte-1rsxejd">Powered by</span>
         
        <li><a href="https://kit.svelte.dev" target="_blank">SvelteKit</a></li>
         + 
        <li><a href="https://pocketbase.io" target="_blank">PocketBase</a></li>
         + 
        <li><a href="https://pockethost.io" target="_blank">PocketHost</a></li></ul> </footer>`;
});
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const css = {
  code: "main.svelte-7lgbuj{display:grid;grid-template-rows:repeat(3, auto);font-family:poppins, sans-serif;width:52rem;margin:auto}@media(max-width: 52rem){main.svelte-7lgbuj{width:100%}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $unread_chats, $$unsubscribe_unread_chats;
  let $admin, $$unsubscribe_admin;
  let $current_user, $$unsubscribe_current_user;
  let $selected_drop_down_menu, $$unsubscribe_selected_drop_down_menu;
  let $$unsubscribe_chats;
  let $$unsubscribe_send_to_id;
  let $$unsubscribe_posts;
  let $$unsubscribe_friends_list;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_unread_chats = subscribe(unread_chats, (value) => $unread_chats = value);
  $$unsubscribe_admin = subscribe(admin, (value) => $admin = value);
  $$unsubscribe_current_user = subscribe(current_user, (value) => $current_user = value);
  $$unsubscribe_selected_drop_down_menu = subscribe(selected_drop_down_menu, (value) => $selected_drop_down_menu = value);
  $$unsubscribe_chats = subscribe(chats, (value) => value);
  $$unsubscribe_send_to_id = subscribe(send_to_id, (value) => value);
  $$unsubscribe_posts = subscribe(posts, (value) => value);
  $$unsubscribe_friends_list = subscribe(friends_list, (value) => value);
  new PocketBase(public_env.PUBLIC_PB_URI);
  set_store_value(current_user, $current_user = $page.data.current_user, $current_user);
  set_store_value(admin, $admin = $page.data.admin, $admin);
  set_store_value(unread_chats, $unread_chats = $page.data.unread_chats, $unread_chats);
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_unread_chats();
  $$unsubscribe_admin();
  $$unsubscribe_current_user();
  $$unsubscribe_selected_drop_down_menu();
  $$unsubscribe_chats();
  $$unsubscribe_send_to_id();
  $$unsubscribe_posts();
  $$unsubscribe_friends_list();
  return `${``} ${`${`${`${``}`}`}`} ${$selected_drop_down_menu === "login" ? `${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})}` : `${$selected_drop_down_menu === "signup" ? `${validate_component(SignUpForm, "SignUpForm").$$render($$result, {}, {}, {})}` : `${$selected_drop_down_menu === "profile" ? `${validate_component(ProfileForm, "ProfileForm").$$render($$result, { user: $current_user }, {}, {})}` : ``}`}`} <main class="svelte-7lgbuj">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </main>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-c062d492.js.map
