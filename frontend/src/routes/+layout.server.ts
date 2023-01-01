// export const prerender = true;
// export const ssr = false;
// export const csr = false;

import type { LayoutServerLoad } from './$types';
import { serializeNonPOJ } from '$lib/utilities';
import ev from "eventsource";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (global.EventSource) global.EventSource = null;
    global.EventSource = ev;

    // Update current user's online status to true
    if (locals.user) {
        await locals.pb.collection('users').update(locals.user.id, { is_online: true });
        /** 
         *  I will see if this one is still necessary because locals.user will not get
         *  updated immediately since it's set from hooks.server though later it might 
         *  when change of route happens
         */
        locals.user.is_online = true;
    }

    /** Get unread chat's list */
    const unreadChats = serializeNonPOJ(await locals.pb.collection('chats')
        .getFullList(0, {
            filter: `read = false`,
            sort: '+created'
        })
    );

    const _uc = unreadChats.reduce((allChats: any, curr: any) => {
        const currCount = allChats[curr.from] ?? 0;
        const totalCount = allChats['totalCount'] ?? 0;
        if (!curr.read && (curr.to === locals.user?.id)) {
            return {
                ...allChats,
                totalCount: totalCount + 1,
                [curr.from]: currCount + 1
            }
        } else return { ...allChats }
    }, {});

    // return ({ user: serializeNonPOJ(locals.user), chats, unreadChats: _uc });
    return ({ user: serializeNonPOJ(locals.user), unreadChats: _uc });
}