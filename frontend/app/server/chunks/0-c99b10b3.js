import { s as serializeNonPOJ } from './utilities-9e3a1c44.js';
import ev from 'eventsource';

const load = async ({ locals }) => {
  try {
    if (global.EventSource)
      global.EventSource = null;
    global.EventSource = ev;
    if (locals.user) {
      await locals.pb.collection("users").update(locals.user.id, { is_online: true });
      locals.user.is_online = true;
    }
    const unreadChats = serializeNonPOJ(
      await locals.pb.collection("chats").getFullList(0, {
        filter: `read = false`,
        sort: "+created"
      })
    );
    const _uc = unreadChats.reduce((allChats, curr) => {
      const currCount = allChats[curr.from] ?? 0;
      const totalCount = allChats["totalCount"] ?? 0;
      if (!curr.read && curr.to === locals.user?.id) {
        return {
          ...allChats,
          totalCount: totalCount + 1,
          [curr.from]: currCount + 1
        };
      } else
        return { ...allChats };
    }, {});
    return { user: serializeNonPOJ(locals.user), unreadChats: _uc };
  } catch (error) {
    console.log("this is the error", error);
  }
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-c2c875a6.js')).default;
const file = '_app/immutable/components/pages/_layout.svelte-0fa986cf.js';
const imports = ["_app/immutable/components/pages/_layout.svelte-0fa986cf.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/index-13156f96.js","_app/immutable/chunks/parse-0003fb26.js","_app/immutable/chunks/index-e90a8133.js","_app/immutable/chunks/globalstore-84cc4bc0.js"];
const stylesheets = ["_app/immutable/assets/_layout-c49d3da5.css","_app/immutable/assets/index-95b16411.css"];
const fonts = ["_app/immutable/assets/remixicon-e61f0d10.woff2","_app/immutable/assets/remixicon-c2dacfbc.woff","_app/immutable/assets/remixicon-0ac8bc3c.ttf"];

export { component, file, fonts, imports, index, _layout_server_ts as server, stylesheets };
//# sourceMappingURL=0-c99b10b3.js.map
