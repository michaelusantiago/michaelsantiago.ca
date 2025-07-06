import { w as writable } from './index2-13947cc8.js';

let selected_menu = writable("dashboard");
let current_user = writable(null);
let posts = writable([]);
let admin = writable(null);
let chats = writable([]);
let friends_list = writable([]);
let selected_background_menu = writable("");
let selected_drop_down_menu = writable(null);
let send_to_id = writable("");
let unread_chats = writable([]);
let _theme = "dark";
let theme = writable(_theme);
let client_timezone = writable("UTC");

export { admin as a, chats as b, current_user as c, send_to_id as d, selected_menu as e, friends_list as f, selected_background_menu as g, client_timezone as h, posts as p, selected_drop_down_menu as s, theme as t, unread_chats as u };
//# sourceMappingURL=store-b33e4f9b.js.map
