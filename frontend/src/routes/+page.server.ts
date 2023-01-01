import type { PageServerLoad, Actions } from './$types';
import { redirect } from "@sveltejs/kit";
import { serializeNonPOJ } from '$lib/utilities';
// import Database from 'better-sqlite3';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    /** Fetch just the last 3 latest posts */
    const posts = serializeNonPOJ(await locals.pb.collection('posts').getList(1, 3, { sort: "-created" }));

    return ({ posts: posts.items })
}

export const actions: Actions = {
    // LOG IN
    log_in: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get('password') as string;

        try {
            /** Will authenticate user and will add cookie when successful
             *  or throw error if not */
            await locals.pb.collection('users').authWithPassword(email, password);

            return ({ success: true });
        } catch (error: any) {
            console.log(error)
            return ({
                err: true,
                message: serializeNonPOJ(error?.data)
            });
        }
    },

    // REQUEST RESET PASSWORD
    request_reset_password: async({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        try {
            const result = await locals.pb.collection("users").requestPasswordReset(email);
            return ({ success: true });
        } catch (error: any) {
            console.log(error)
            return ({
                err: true,
                message: serializeNonPOJ(error?.data)
            });
        }
    },

    // PROFILE
    // Update Basic Info
    update_basic_info: async({ request, locals }) => {
        const formData = await request.formData();

        try {
            await locals.pb.collection('users').update(locals.user.id, formData);
            /** Re-authenticate to reflect the update we made (cookie) */
            await locals.pb.collection('users').authRefresh();

            return({ success: true });
        } catch (error: any) {
            console.log(error);
            return ({
                err: true,
                message: serializeNonPOJ(error?.data)
            })
        }
    },

    // Change Password
    change_password: async({ request, locals }) => {
        const formData = await request.formData();
        try {
            await locals.pb.collection('users').update(locals.user.id, {
                oldPassword: formData.get("currentPassword"),
                password: formData.get("password"),
                passwordConfirm: formData.get("passwordConfirm")
            })
            return ({ success: true });
        } catch (error: any) {
            console.log(error)
            return ({
                err: true,
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
            return({ success: true });
        } catch (error: any) {
            console.log(error);
            return ({
                err: true,
                message: serializeNonPOJ(error?.data)
            })
        }
    },
    
    // LOG OUT
    log_out: async({ locals }) => {
        // Remove the current cookie
        await locals.pb.authStore.clear();

        // Set online field to false
        await locals.pb.collection('users').update(locals.user.id, { is_online: false });

        // Unsubscribe to collections
        locals.pb.collection("chats").unsubscribe("*");
        locals.pb.collection("users").unsubscribe("*");

        throw redirect(307, "/");
    },

    // CLOSE
    close: async ({ request }) => {
        /* really does nothing just catch the action when there's no action at all */
    },

    // POST What's up
    post: async ({ request, locals }) => {
        const formData = await request.formData();
        try {
            await locals.pb.collection('posts').create(formData);

            /** Fetch just the last 3 latest posts */
            const posts = serializeNonPOJ(await locals.pb.collection('posts').getList(1, 3, { sort: "-created"}));

            return ({ success: true, posts: posts.items });
        } catch (error: any) {
            console.log(error);
            return ({
                err: true,
                message: serializeNonPOJ(error?.data)
            });
        }
    },

    // SIGN-UP
    sign_up: async ({ locals, request }) => {
        const formData = await request.formData();
        formData.append('role', '1');
        formData.append('emailVisibility', "true");
        
        /** or */
        // const signing_up = Object.fromEntries([...formData]);
        // // use signing_up.email etc..

        /** Create new User (save to database)*/
        try {
            const newUser = await locals.pb.collection('users').create(formData);
           
            /** Send email verification link */
            if (newUser) {
                const emailVerification = await locals.pb.collection('users')
                .requestVerification(formData.get('email'));
            }

            return ({ success: true });
        } catch (error: any) {
            console.log(error);
            return ({
                err: true,
                message: serializeNonPOJ(error.data)
            })
        }
    }
}