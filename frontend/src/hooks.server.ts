import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from "$env/dynamic/public";

export const handle: Handle = async ({ event, resolve }) => {
    try {

    if (!event.locals.pb) {
        event.locals.pb = new PocketBase(env.PUBLIC_PB_URI);
        event.locals.pb.autoCancellation(false)

        /** Find pb_auth cookie in cookie's and then try to authenticate if there is
         *  and store it in authStore
        */
        event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
        
        /** At this point the authentication result is available
         *  see if there is a valid/authenticated user
         *  it's optional to store it again in another variable user
         *  but it just to make it shorter to call later on front-end
         */
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = event.locals.pb.authStore.model;
        }
    }

    } catch (error) {
        console.log(error)
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response;
}