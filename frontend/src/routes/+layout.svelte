<script lang="ts">
    import LoginForm from "@lib/components/LoginForm.svelte"
    import SignUpForm from "@lib/components/SignUpForm.svelte"
    import ProfileForm from "@lib/components/ProfileForm.svelte"
    import ResetPasswordForm from "@lib/components/ResetPasswordForm.svelte"
    import NavBar from "@lib/components/NavBar.svelte"
    import Footer from "@lib/components/Footer.svelte"
    import Notification from "@lib/components/Notification.svelte"
    import "../app.css"
    import { onMount } from "svelte"
    import { page } from "$app/stores"
    import PocketBase from "pocketbase"
    import { env } from "$env/dynamic/public"
    import * as db from "$lib/Database"
    import {
        selected_drop_down_menu,
        current_user,
        admin,
        posts,
        chats,
        unread_chats,
        friends_list,
        send_to_id
    } from "@lib/store"

    const pb = new PocketBase(env.PUBLIC_PB_URI)
    let is_show_signup_success_notificaion = false
    let is_show_reset_password_success_notification = false
    let is_show_profile_update_success = false
    let is_show_request_email_change_success = false
    let is_password_reset = false

    onMount(() => {
        /**
         * Get the initial friends_list here
         * Notice the use of .then() instead of await
        */
        db.getFriendsList(pb)
        .then(data => $friends_list = data)

        /**
        * Get the unread chats
        */
        if ($current_user)
            db.getUnreadChats($current_user.id)
            .then(data => $unread_chats = data)

        /**
         * Realtime update
         * Watch users table changes realtime and update view
         * It has nothing to do with Load function in .server or .ts files
         */
        pb.collection("users").subscribe("*", async (result: any) => {
            try {
                $admin = await db.getAdmin()
                $friends_list = await db.getFriendsList(pb)
            } catch (error) { console.log(error) }
        });

        pb.collection("posts").subscribe("*", async (result: any) => {
            $posts = await db.getPost()
        })

        pb.collection("chats").subscribe("*", async (result: any) => {
            if ($current_user.id === $admin.id)
                $chats = (await db.getChats($admin.id, $send_to_id)).chats
            else
                $chats = (await db.getChats($current_user.id, $admin.id)).chats

            $unread_chats = (await db.getUnreadChats($current_user.id))
        })

        return () => {
            pb.collection("users").unsubscribe('*')
            pb.collection("posts").unsubscribe('*')
            pb.collection("chats").unsubscribe('*')
        }
    })

    const onCloseSignUp = async (event: CustomEvent) => {
        $selected_drop_down_menu = null

        // show the notificaion
        if (event.detail?.success) {
            is_show_signup_success_notificaion = true
            // Close notificaiton after 3 seconds
            setTimeout(() => is_show_signup_success_notificaion = false, 5000)
        }
    }

    const oncloseLoginForm = async (event: CustomEvent) => {
        is_password_reset = event.detail?.password_reset
        $selected_drop_down_menu = null
    }

    const onCloseResetForm = async (event: CustomEvent) => {
        if (event.detail?.back_to_main) $selected_drop_down_menu = "login"
        is_show_reset_password_success_notification = Boolean(event.detail?.success)
        setTimeout(() => is_show_reset_password_success_notification = false, 5000)
        is_password_reset = false 
    }

    const onCloseProfileForm = async (event: CustomEvent) => {
        // const success = event.detail?.success
        $selected_drop_down_menu = null
        if (event.detail?.success) {
            if (!event.detail?.change_email) {
                is_show_profile_update_success = true
                setTimeout(() => is_show_profile_update_success = false, 5000)
            } else {
                is_show_request_email_change_success = true
                setTimeout(() => is_show_request_email_change_success = false, 7000)
            }
            window.location.reload()
        }
        // Might as well ask for page reload if the update is successful
        // if (success == true) window.location.reload()
    }

    /**
     * This is only when page is Loaded/Reloaded NOT when realtime update happens
     */
    $current_user = $page.data.current_user
    $admin = $page.data.admin
    $unread_chats = $page.data.unread_chats
</script>

{#if is_password_reset}
    <ResetPasswordForm on:close={onCloseResetForm} />
{/if}

{#if is_show_signup_success_notificaion}
    <Notification success={true}>
        <div slot="message">
            <p>Please check your email where I sent you a verification link.</p>
            <br/>
            <p>Thank you for the friendship!</p>
        </div>
    </Notification>
{:else if is_show_reset_password_success_notification}
    <Notification success={true}>
        <div slot="message">
            <p>Recovery link was sent to your email. Please click that link and follow the instructions.</p>
            <br/>
            <p>Thank you for the friendship!</p>
        </div>
    </Notification>
{:else if is_show_profile_update_success}
    <Notification success={true}>
        <div slot="message">
            <p>Profile is updated successfully!</p>
            <p>Page will reload after a second or two.</p>
            <br/>
            <p>Thank you for the friendship!</p>
        </div>
    </Notification>
{:else if is_show_request_email_change_success}
    <Notification success={true}>
        <div slot="message">
            <p>Change of email request was sent successfully!</p>
            <p>Please check your new email and confirm the change</p>
            <br/>
            <p>Thank you for the friendship!</p>
        </div>
    </Notification>
{/if}

{#if $selected_drop_down_menu === "login"}
    <LoginForm on:close={oncloseLoginForm}/>
{:else if $selected_drop_down_menu === "signup"}
    <SignUpForm on:close={onCloseSignUp}/>
{:else if $selected_drop_down_menu === "profile"}
    <ProfileForm
        on:close={onCloseProfileForm}
        user={$current_user}
    />
{/if}

<main>
    <NavBar/>
    <slot/>
    <Footer/>
</main>

<style lang="postcss">
    main {
        display: grid;
        grid-template-rows: repeat(3, auto);
        font-family: poppins, sans-serif;
        width: 52rem; 
        margin: auto;
    }
    @media (max-width: 52rem) {
        main { width: 100%; }
    }
</style>