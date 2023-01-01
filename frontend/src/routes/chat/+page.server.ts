import type { PageServerLoad, Actions } from './$types';
import { serializeNonPOJ } from '$lib/utilities';

export const actions: Actions = {
    /** Send chat */
    send: async ({ request, locals }) => {
        const formData = await request.formData();
        let to_id = formData.get('send_to_id');

        /** 
         *  If the current user is not an admin
         *  Lets get the id of the admin
         */
        if (locals.user.role === 1) {
            const admin = await locals.pb.collection('users').getFirstListItem('role=0');
            to_id = admin?.id;
        }

        const data = {
            "from": locals.user.id,
            "to": to_id,
            "message": formData.get("message")
        }

        try {
            const record = await locals.pb.collection('chats').create(data);

            const chats = serializeNonPOJ(await locals.pb.collection('chats')
                .getFullList(200, {
                    filter: `(from = "${locals.user.id}" && to = "${to_id}") || (from = "${to_id}" && to = "${locals.user.id}")`,
                    sort: '+created'
                })
            );

            return ({ success: true, chats });
        } catch (error: any) {
            console.log(error)
            return ({ success: false })
        }
    },

    /** Get Chat by user_id */
    get: async ({ request, locals }) => {
        const formData = await request.formData();
        const friend_id = formData.get("friend_id");

        try {
            /** Get Chats */
            const chats = serializeNonPOJ(await locals.pb.collection('chats')
                .getFullList(200, {
                    filter: `(from = "${locals.user.id}" && to = "${friend_id}") || (from = "${friend_id}" && to = "${locals.user.id}")`,
                    sort: '+created'
                })
            );

            return ({ success: true, chats });
        } catch (err: any) {
            console.log(err)
            return ({ error: true, message: err.message })
        }
    }
}