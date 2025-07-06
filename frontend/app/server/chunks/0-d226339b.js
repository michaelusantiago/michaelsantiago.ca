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
const component = async () => component_cache ??= (await import('./_layout.svelte-64948111.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.b341a4d1.js","_app/immutable/chunks/scheduler.5a37f85d.js","_app/immutable/chunks/index.ba0f40af.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/Database.c95337da.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.2a4c629c.js","_app/immutable/chunks/index.9bc1d2ae.js","_app/immutable/chunks/navigation.59a72154.js","_app/immutable/chunks/store.b5b4fdea.js"];
const stylesheets = ["_app/immutable/assets/0.64644b33.css"];
const fonts = ["_app/immutable/assets/remixicon.f102deec.woff2","_app/immutable/assets/remixicon.503d3019.woff","_app/immutable/assets/remixicon.b0d70a34.ttf"];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-d226339b.js.map
