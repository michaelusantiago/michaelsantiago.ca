import type { Actions } from './$types';
import * as db from '$lib/Database'

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
            const admin = await db.getAdmin()
            to_id = admin?.id;
        }

        const data = {
            "from": locals.user.id,
            "to": to_id,
            "message": formData.get("message")
        }

        try {
            await db.sendMessage(locals.pb, data)

            const { chats } = await db.getChats(locals.user.id, String(to_id))

            return ({ success: true, chats })
        } catch (error: any) {
            console.log(error)
            return ({ success: false })
        }
    },

    /** Get Chat by user_id */
    get: async ({ request, locals }) => {
        const formData = await request.formData();
        const friend_id = String(formData.get("friend_id"));

        const result = await db.getChats(locals.user.id, friend_id)

        if (result.success)
            return ({ chats: result.chats })
        else {
            console.log(result.error)
            return ({ result })
        }
    }
}