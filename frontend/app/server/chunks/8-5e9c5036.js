import { g as getAdmin, c as sendMessage, e as getChats } from './Database-d3f8efb2.js';
import './shared-server-58a5f352.js';
import 'pocketbase';

const actions = {
  /** Send chat */
  send: async ({ request, locals }) => {
    const formData = await request.formData();
    let to_id = formData.get("send_to_id");
    if (locals.user.role === 1) {
      const admin = await getAdmin();
      to_id = admin?.id;
    }
    const data = {
      "from": locals.user.id,
      "to": to_id,
      "message": formData.get("message")
    };
    try {
      await sendMessage(locals.pb, data);
      const { chats } = await getChats(locals.user.id, String(to_id));
      return { success: true, chats };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
  /** Get Chat by user_id */
  get: async ({ request, locals }) => {
    const formData = await request.formData();
    const friend_id = String(formData.get("friend_id"));
    const result = await getChats(locals.user.id, friend_id);
    if (result.success)
      return { chats: result.chats };
    else {
      console.log(result.error);
      return { result };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-d315fb0c.js')).default;
const server_id = "src/routes/chat/+page.server.ts";
const imports = ["_app/immutable/nodes/8.e6406c1f.js","_app/immutable/chunks/scheduler.22c66fb6.js","_app/immutable/chunks/index.94eb7729.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.600bc0e3.js","_app/immutable/chunks/store.565d065b.js","_app/immutable/chunks/index.80348aca.js","_app/immutable/chunks/Database.7f6fed06.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.9380a151.js","_app/immutable/chunks/navigation.5a144dea.js"];
const stylesheets = ["_app/immutable/assets/8.8bd2e4e0.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-5e9c5036.js.map
