import { e as env, w as writable } from './env-public-d1489f53.js';
import PocketBase from 'pocketbase';
import { s as serializeNonPOJ } from './utilities-9e3a1c44.js';

let _theme;
const theme = writable(_theme);
const client_timezone = writable("UTC");
const user = writable();
const users = writable([]);
let pb_uri = env.PUBLIC_PB_URI ;
const pb = new PocketBase(pb_uri);
const _admin = serializeNonPOJ(
  await pb.collection("users").getFullList(200, { filter: "role = 0" })
)[0];
const admin = writable(_admin);
const chats = writable([]);
const unreadChats = writable([]);
const send_to_id = writable("");
const selected_menu = writable("dashboard");
const about_selected_menu = writable("projects");
const show_dropdown_menu = writable(false);
const show_login_form = writable(false);
const show_sign_up_form = writable(false);
const show_profile_form = writable(false);
const show_forgot_password_request_form = writable(false);
const show_notification = writable(false);

export { unreadChats as a, show_notification as b, chats as c, admin as d, users as e, show_login_form as f, show_forgot_password_request_form as g, show_sign_up_form as h, show_profile_form as i, selected_menu as j, about_selected_menu as k, show_dropdown_menu as l, client_timezone as m, send_to_id as s, theme as t, user as u };
//# sourceMappingURL=globalstore-00e055b6.js.map
