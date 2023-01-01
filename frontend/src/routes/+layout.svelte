<script lang="ts">
    import "../app.css";
    import "remixicon/fonts/remixicon.css";
    import LoginForm from "$lib/components/LoginForm.svelte";
    import ResetPasswordForm from "$lib/components/ResetPasswordForm.svelte";
    import SignUpForm from "$lib/components/SignUpForm.svelte";
    import ProfileForm from "$lib/components/ProfileForm.svelte";
    import type { LayoutData, PageData } from "./$types";
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {
        users, chats, unreadChats, send_to_id, admin, user, show_sign_up_form,
        show_login_form, show_forgot_password_request_form, show_notification,
        show_profile_form, theme
    } from "$lib/stores/globalstore";
    import { onMount } from "svelte";
    import { serializeNonPOJ } from '$lib/utilities';
    import PocketBase from "pocketbase";

    // const pb = new PocketBase(env.PUBLIC_PB_URI); // this must be use in actual deployed version
    const pb = new PocketBase("http://127.0.0.1:8090");
    
    // Helper function that get's Users List
    const getUsersList = async () => {
        $users = serializeNonPOJ(await pb.collection('users')
            .getFullList(200, {
                filter: "role = 1",
                sort: '+first_name, +last_name'
            })
        );
    };

    const getAdmin = async () => {
        $admin = serializeNonPOJ(await pb.collection('users')
            .getFullList(200, { filter: "role = 0" })
        )[0];
    };

    const getUserChats = async (friend_id: string, admin_id: string) => {
        $chats = serializeNonPOJ(await pb.collection('chats')
            .getFullList(200, {
                filter: `(from = "${friend_id}" && to = "${admin_id}") || (from = "${admin_id}" && to = "${friend_id}")`,
                sort: '+created'
            })
        );
    }

    const getUnreadChats = async () => {
        /** Get unread chat's list */
        const _unreadChats = serializeNonPOJ(await pb.collection('chats')
            .getFullList(0, {
                filter: `read = false`,
                sort: '+created'
            })
        );

        const _uc = _unreadChats.reduce((allChats: any, curr: any) => {
            const currCount = allChats[curr.from] ?? 0;
            const totalCount = allChats['totalCount'] ?? 0;
            if (!curr.read && (curr.to === $user?.id)) {
                return {
                    ...allChats,
                    totalCount: totalCount + 1,
                    [curr.from]: currCount + 1
                }
            } else return { ...allChats }
        }, {});

        $unreadChats = _uc;
    }

    $: {
        if ($show_notification) {
            const timeout = setTimeout(() => {
               $show_notification = false 
               location.reload();
            }, 4000);
        }
    }

    export let data: LayoutData;

    /** Set's global store user (this is the user that is currently logged in) */
    $user = data.user; 

    /** When user is not on the chat page */
    $unreadChats = data?.unreadChats;

    onMount(async () => {
        await getUsersList();

        document.body.classList.add(`${$theme}-theme`);

        // Subscribe to Realtime Data
        // Listen to the database changes on users Collection
        await pb.collection("users").subscribe("*", async (chat: any) => {
            await getUsersList();
            await getAdmin();
        });

        /** Persistent/Realtime chat update */
        pb.collection("chats").subscribe("*", async (chat: any) => {
            const admin = await pb.collection('users').getFirstListItem('role=0');
            // if (chat.action == 'create') {
                const friend_id = (data?.user.role == 1) ? data?.user.id : $send_to_id;
                await getUserChats(friend_id, admin?.id);
                await getUnreadChats();
            // }
        });
    });
</script>

<!-- Log In -->
{#if $show_login_form} <LoginForm /> {/if}

<!-- Request password reset form -->
{#if $show_forgot_password_request_form} <ResetPasswordForm /> {/if}

<!-- Sign Up -->
{#if $show_sign_up_form} <SignUpForm /> {/if}

<!-- Sign Up -->
{#if $show_profile_form} <ProfileForm /> {/if}

<main>
    <NavBar />
    <div class="content"><slot /></div>
    <Footer />
</main>

<style lang="postcss">
    main {
        display: grid;
        margin: 0 20%;
        grid-template-columns: 1;
        grid-template-rows: auto;
        /* font-family: "Rajdhani", sans-serif; */
        font-family: poppins, sans-serif;
        font-weight: 300;
    }

    .content {
        margin-top: 7em;
        z-index: 0;
    }
</style>