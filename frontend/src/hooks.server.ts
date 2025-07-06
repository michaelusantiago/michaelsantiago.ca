import type { Handle } from "@sveltejs/kit"
import dotenv from "dotenv"
import PocketBase from "pocketbase"
import { env } from "$env/dynamic/public"
// import eventsource from "eventsource"

dotenv.config()

export const handle: Handle = async ({ event, resolve }) => {
    // globalThis.EventSource = eventsource

    if (!event.locals.pb) {
        event.locals.pb = new PocketBase(env.PUBLIC_PB_URI)
        event.locals.pb.autoCancellation(false)

        /** Find pb_auth cookie in cookie's and then try to authenticate if there is
         *  and store it in authStore
        */
        event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
        
        /** At this point the authentication result is available
         *  See if there is a valid/authenticated user
         *  it's optional to store it again in another variable user
         *  but it just to make it shorter to call later on front-end
         */
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = event.locals.pb.authStore.model
            await event.locals.pb.collection('users').update(event.locals.user.id, { is_online: true });
            event.locals.user.is_online = true
        } else {
            /**
             * Prevent accessing private page exclusive for members and the admin
             */
            if (event.request.url.includes("/background") || event.request.url.includes("/chat")) {
                throw new Error("Page not found")
            }
        }
    }

    const response = await resolve(event) as Response;
    
    /** Allow CORS (not needed in this project) */
    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set("Vary", "origin");
    // response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // response.headers.set("Access-Control-Allow-Headers", "*");
    // response.headers.set("Access-Control-Allow-Credentials", "true");
    // if (event.request.method === "OPTIONS") {
    //     return new Response(null, { status: 200 })
    // }

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response
}