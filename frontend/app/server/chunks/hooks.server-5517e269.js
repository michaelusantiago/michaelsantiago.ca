import PocketBase from 'pocketbase';
import { e as env } from './env-public-d1489f53.js';
import './index-2f2dc0eb.js';

const handle = async ({ event, resolve }) => {
  try {
    if (!event.locals.pb) {
      event.locals.pb = new PocketBase(env.PUBLIC_PB_URI);
      event.locals.pb.autoCancellation(false);
      event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
      if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.model;
      }
    }
  } catch (error) {
    console.log(error);
  }
  const response = await resolve(event);
  response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }));
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-5517e269.js.map
