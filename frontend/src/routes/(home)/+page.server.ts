import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import * as db from "@lib/Database"
import type { Actions } from "@sveltejs/kit";
import { serializeNonPOJ } from "@lib/utilities";

export const actions: Actions = {
    // SIGN-UP
    sign_up: async ({ request, locals }) => {
        const formData = await request.formData()
        formData.append("role", "1")
        formData.append("emailVisibility", "true")
        return (await db.signUp(formData))
    },
    // LOG-IN
    log_in: async ({ request, locals }) => {
        try {
            const user = Object.fromEntries(await request.formData())
            await locals.pb.collection('users').authWithPassword(user.email, user.password);
            return ({ success: true })
        } catch (error: any) {
            // Probably an authentication error
            // console.log(error.data)
            return fail (400, { success: false, message: error.data })
        }
    },
    // LOG-OUT
    log_out: async ({ locals }) => {
        // Remove the current cookie
        await locals.pb.authStore.clear();

        // Set online field to false
        await locals.pb.collection('users').update(locals.user.id, { is_online: false });

        // Unsubscribe to collections
        locals.pb.collection("chats").unsubscribe("*");
        locals.pb.collection("users").unsubscribe("*");
        locals.pb.collection("posts").unsubscribe("*");

        throw redirect(302, "/");
    },
    // POST
    post: async ({ request, locals }) => {
        const formData = await request.formData()
        await db.post(formData)
    },
    // DELETE POST
    delete_post: async ({ request, locals }) => {
        const formData = await request.formData()
        const post_id = formData.get('post_id')
        await db.deletePost(String(post_id))
    },
    // REQUEST RESET PASSWORD
    request_reset_password: async ({ request }) => {
        const formData = await request.formData()
        const email = String(formData.get('email'))
        return (await db.requestResetPassword(email))
    },
    // PROFILE
    // UPDATE PROFILE BASIC INFO
    update_basic_info: async ({ request, locals }) => {
        const formData = await request.formData()
        /** This is the other way */
        try {
            await locals.pb.collection('users').update(locals.user.id, formData);
            // These were uncessary since I am forcing a page reload
            // /** Re-authenticate to reflect the update we made (cookie) */
            // await locals.pb.collection('users').authRefresh();
            // locals.user = serializeNonPOJ(locals.pb.authStore.model)
            // return({ success: true, user: locals.user});

            return({ success: true })
        } catch (error: any) {
            console.log(error);
            return ({
                success: false,
                message: error?.data
            })
        }
    },
    
    change_password: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())
        try {
            await locals.pb.collection('users').update(locals.user.id, {
                email: locals.user.email,
                oldPassword: data.current_password,
                password: data.password,
                passwordConfirm: data.confirm_password
            })

            // Re-authenticate
            await locals.pb.collection('users').authWithPassword(locals.user.email, data.password)

            return ({ success: true });
        } catch (error: any) {
            console.log(error)
            return ({
                success: false,
                message: serializeNonPOJ(error?.data)
            });
        }
    },

    // Change Email
    change_email: async({ request, locals }) => {
        const formData = await request.formData();
        try {
            await locals.pb.collection('users').authWithPassword(locals.user.email, formData.get("password"));
            await locals.pb.collection('users').requestEmailChange(formData.get("newEmail"));
            return({ success: true, change_email: true });
        } catch (error: any) {
            console.log(error);
            return ({
                success: false,
                message: serializeNonPOJ(error?.data)
            })
        }
    }
}