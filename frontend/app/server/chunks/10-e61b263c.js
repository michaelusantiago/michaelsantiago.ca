import { s as serializeNonPOJ } from './utilities-9e3a1c44.js';

const actions = {
  send: async ({ request, locals }) => {
    const formData = await request.formData();
    let to_id = formData.get("send_to_id");
    if (locals.user.role === 1) {
      const admin = await locals.pb.collection("users").getFirstListItem("role=0");
      to_id = admin?.id;
    }
    const data = {
      "from": locals.user.id,
      "to": to_id,
      "message": formData.get("message")
    };
    try {
      const record = await locals.pb.collection("chats").create(data);
      const chats = serializeNonPOJ(
        await locals.pb.collection("chats").getFullList(200, {
          filter: `(from = "${locals.user.id}" && to = "${to_id}") || (from = "${to_id}" && to = "${locals.user.id}")`,
          sort: "+created"
        })
      );
      return { success: true, chats };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
  get: async ({ request, locals }) => {
    const formData = await request.formData();
    const friend_id = formData.get("friend_id");
    try {
      const chats = serializeNonPOJ(
        await locals.pb.collection("chats").getFullList(200, {
          filter: `(from = "${locals.user.id}" && to = "${friend_id}") || (from = "${friend_id}" && to = "${locals.user.id}")`,
          sort: "+created"
        })
      );
      return { success: true, chats };
    } catch (err) {
      console.log(err);
      return { error: true, message: err.message };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 10;
const component = async () => (await import('./_page.svelte-28e11498.js')).default;
const file = '_app/immutable/components/pages/chat/_page.svelte-bd4b492b.js';
const imports = ["_app/immutable/components/pages/chat/_page.svelte-bd4b492b.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/globalstore-e4075d3d.js","_app/immutable/chunks/env-public-1b9b25bc.js","_app/immutable/chunks/index-d7a3a3e5.js","_app/immutable/chunks/parse-c28e5ac2.js"];
const stylesheets = ["_app/immutable/assets/_page-563db290.css","_app/immutable/assets/index-95b16411.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, stylesheets };
//# sourceMappingURL=10-e61b263c.js.map
