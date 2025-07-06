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
const component = async () => component_cache ??= (await import('./_page.svelte-1f278284.js')).default;
const server_id = "src/routes/chat/+page.server.ts";
const imports = ["_app/immutable/nodes/8.12281789.js","_app/immutable/chunks/scheduler.5a37f85d.js","_app/immutable/chunks/index.ba0f40af.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.b65841c2.js","_app/immutable/chunks/store.b5b4fdea.js","_app/immutable/chunks/index.9bc1d2ae.js","_app/immutable/chunks/Database.c95337da.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.2a4c629c.js","_app/immutable/chunks/navigation.59a72154.js"];
const stylesheets = ["_app/immutable/assets/8.8bd2e4e0.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-bb46d2fb.js.map
