import type { LayoutServerLoad } from "./$types"
import { serializeNonPOJ } from "@lib/utilities"
import * as db from "@lib/Database"

export const load: LayoutServerLoad = async ({ locals }) => {
    try {
        let unread_chats = []
        const admin = await db.getAdmin()
        const current_user: any = serializeNonPOJ(locals.user)
        if (current_user) unread_chats = serializeNonPOJ(await db.getUnreadChats(current_user.id))

        return ({
            admin,
            current_user,
            unread_chats
        })
    } catch (error) {
        console.log('something went wrong')
    }
}