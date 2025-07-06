import { env } from "$env/dynamic/public"
import { serializeNonPOJ } from "@lib/utilities"
import PocketBase from "pocketbase"

// No use
interface User {
    email: string
    password: string
    confirm_password: string
    first_name: string
    last_name: string
    gender: string
    birth_date: Date
    role: number
    emailVisibility: boolean
}

export const getAdmin = async (): Promise<any> => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    return ( 
        serializeNonPOJ(
            await pb.collection('users')
            .getFullList(0, { filter: "role = 0" })
        )[0]
    )
}

export const signUp = async (user: FormData ) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    try {
        const new_user = await pb.collection("users").create(user)
        if (new_user) await pb.collection('users').requestVerification(String(user.get('email')))
        return ({ success: true })
    } catch (error: any) {
        return ({
            sucesss: false,
            message: serializeNonPOJ(error.data)
        })
    }
}

export const getPost = async () => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    const posts = serializeNonPOJ(await pb.collection('posts').getList(1, 3, { sort: '-created' }))
    return posts.items
}

export const post = async (post: FormData ) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    try {
        await pb.collection('posts').create(post);
        return ({ success: true });
    } catch (error: any) {
        console.log(error);
        return ({
            err: true,
            message: serializeNonPOJ(error?.data)
        });
    }
}

export const deletePost = async (post_id: string) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    await pb.collection('posts').delete(post_id)
}

export const getFriendsList = async (pb: any) => {
    const friends = serializeNonPOJ(await pb.collection('users').getFullList(0, {
        filter: "role = 1",
        sort: "+first_name, +last_name"
    }))

    return friends
}

export const getChats = async (current_user_id: string, friend_id: string) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    try {
        /** Get Chats */
        const chats = serializeNonPOJ(await pb.collection('chats')
            .getFullList(0, {
                filter: `(from = "${current_user_id}" && to = "${friend_id}") || (from = "${friend_id}" && to = "${current_user_id}")`,
                sort: '+created'
            })
        )

        return ({ success: true, chats });
    } catch (err: any) {
        console.log(err)
        return ({ error: true, message: err.message })
    }
}

export const sendMessage = async (pb: any, data: any) => {
    await pb.collection('chats').create(data)
}

export const setCurrentUserIsTyping = async (pb: any, user_id: string, is_typing: boolean) => {
    try {
        const user = await pb.collection('users').getOne(user_id)
        if (user.is_typing !== is_typing) await pb.collection('users').update(user_id, { is_typing })
    } catch (error: any) { console.log(error) }
}

export const getUnreadChats = async (user_id: string) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    const unread_chats = serializeNonPOJ(
        await pb.collection('chats').getFullList(0, {
            filter: `(read = false) && (to = "${user_id}")`,
            sort: '+created'
        })
    )
    return (unread_chats)
}

export const updateChatsRead = async (user_id: string) => {
    // First get all the unread_chats by the user_id
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    const unread_chats = await getUnreadChats(user_id)

    if (unread_chats.length == 0) return

    // Marked read to true one by one, no one command shot in pocketbase
    for (let chat of unread_chats) {
        await pb.collection('chats').update(chat.id, { read: true })
    }
}

/** Specific for Admin only */
export const updateAdminChatsRead = async (friend_id: string) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    const admin = await getAdmin()
    const unread_chats = serializeNonPOJ(await pb.collection('chats')
        .getFullList(0, {
            filter: `(from = "${friend_id}" && to = "${admin.id}") && (read = false)`,
            sort: '+created'
        })
    )

    if (!unread_chats.length) return

    for (let chat of unread_chats) {
        await pb.collection('chats').update(chat.id, { read: true })
    }
}

export const requestResetPassword = async (email: string) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    try {
        const result = await pb.collection("users").requestPasswordReset(email)
        return ({ success: true })
    } catch (error: any) {
        console.log(error)
        return ({
            success: false,
            message: serializeNonPOJ(error?.data)
        })
    }
}

export const changePassword = async (id: string, data: any) => {
    const pb = new PocketBase(env.PUBLIC_PB_URI)
    try {
        await pb.collection('users').update(id, {
            oldPassword: data.current_password,
            password: data.password,
            passwordConfirm: data.confirm_password
        })
        return ({ success: true });
    } catch (error: any) {
        console.log(error)
        return ({
            success: false,
            message: serializeNonPOJ(error?.data)
        });
    }
}

// export const updateCurrentUserInfo = async (id: string, data: any) => {
//     const pb = new PocketBase(env.PUBLIC_PB_URI)
//     try {
//         await pb.collection('users').update(id, data);
//         /** Re-authenticate to reflect the update we made (cookie) */
//         // await pb.collection('users').authRefresh();
//         return({ success: true });
//     } catch (error: any) {
//         console.log(error);
//         return ({
//             success: false,
//             message: error?.data
//         })
//     }
// }

// export const getCurrentUser = async (id: string) => {
//     const pb = new PocketBase(env.PUBLIC_PB_URI)
//     try {
//         const result = serializeNonPOJ(await pb.collection("users").getFirstListItem(`id="${id}"`))
//         console.log(result)
//         return ({ success: true, result })
//     } catch (error: any) {
//         console.log(error)
//         return ({
//             success: false,
//             message: serializeNonPOJ(error?.data)
//         })
//     }
// }