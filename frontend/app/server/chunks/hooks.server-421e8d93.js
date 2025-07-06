import dotenv from 'dotenv';
import PocketBase from 'pocketbase';
import { p as public_env } from './shared-server-58a5f352.js';

dotenv.config();
const handle = async ({ event, resolve }) => {
  if (!event.locals.pb) {
    event.locals.pb = new PocketBase(public_env.PUBLIC_PB_URI);
    event.locals.pb.autoCancellation(false);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
    if (event.locals.pb.authStore.isValid) {
      event.locals.user = event.locals.pb.authStore.model;
      await event.locals.pb.collection("users").update(event.locals.user.id, { is_online: true });
      event.locals.user.is_online = true;
    } else {
      if (event.request.url.includes("/background") || event.request.url.includes("/chat")) {
        throw new Error("Page not found");
      }
    }
  }
  const response = await resolve(event);
  response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }));
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-421e8d93.js.map
