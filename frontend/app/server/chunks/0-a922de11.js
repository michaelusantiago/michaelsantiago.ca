import { g as getAdmin, s as serializeNonPOJ, a as getUnreadChats } from './Database-d3f8efb2.js';
import './shared-server-58a5f352.js';
import 'pocketbase';

const load = async ({ locals }) => {
  try {
    let unread_chats = [];
    const admin = await getAdmin();
    const current_user = serializeNonPOJ(locals.user);
    if (current_user)
      unread_chats = serializeNonPOJ(await getUnreadChats(current_user.id));
    return {
      admin,
      current_user,
      unread_chats
    };
  } catch (error) {
    console.log("something went wrong");
  }
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-c062d492.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.ed2ed68a.js","_app/immutable/chunks/scheduler.22c66fb6.js","_app/immutable/chunks/index.94eb7729.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/Database.5f632785.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.b2371634.js","_app/immutable/chunks/index.80348aca.js","_app/immutable/chunks/navigation.488f8e7d.js","_app/immutable/chunks/store.565d065b.js"];
const stylesheets = ["_app/immutable/assets/0.0a3d7772.css"];
const fonts = ["_app/immutable/assets/remixicon.d4d28086.woff2","_app/immutable/assets/remixicon.128cad06.woff","_app/immutable/assets/remixicon.03b5b8ed.ttf"];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-a922de11.js.map
