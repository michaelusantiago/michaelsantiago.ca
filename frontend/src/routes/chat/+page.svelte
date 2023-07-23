<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { send_to_id, chats, unreadChats, admin,
        user, users, client_timezone } from '$lib/stores/globalstore';
    import Message from "$lib/components/Message.svelte";
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import Fa from "svelte-fa";
    import { faCircle } from "@fortawesome/free-solid-svg-icons";
    import PocketBase from "pocketbase";
    import { serializeNonPOJ } from "$lib/utilities";
    export let data: PageData;
    import { env } from "$env/dynamic/public";

    $send_to_id = ($user?.role == 1) ? $admin?.id : null;

    let message_content: HTMLDivElement;
    let message: HTMLTextAreaElement;
    let sendMessageBtn: HTMLButtonElement;
    let loading = false;
    let send_ok = false;
    let res: any;
    let myFriend: any = null;
    let me_is_typing: boolean = false;
    let friend_is_typing: boolean = false;

    const pb = new PocketBase(env.PUBLIC_PB_URI); // this must be use in actual deployed version
    // const pb = new PocketBase("http://127.0.0.1:8090");

    const updateUserIsTyping = async (is_typing: boolean)  => {
        try {
            const _user = await pb.collection('users').getOne($user?.id);
            // Only update if the value is different from what is already there
            if (_user.is_typing !== is_typing) await pb.collection('users').update($user?.id, { is_typing });
        } catch (error) { console.log(error); }
    }

    const getChats = async () => {
        const admin = await pb.collection('users').getFirstListItem('role = 0');
        const _chats = serializeNonPOJ(await pb.collection('chats')
            .getFullList(200, {
                filter: `(from = "${$user.id}" && to = "${admin?.id}") || (from = "${admin?.id}" && to = "${$user.id}")`,
                sort: '+created'
            })
        );
        return _chats;
    }

    const updateAdminIsChattingTo = async (friend_id: string) => {
        try { await pb.collection('users').update($admin.id, { is_chatting_to: friend_id }); }
        catch (error) { console.log(error); }
    }

    const updateChatRead = async (friend_id: string, _user: number) => {
        let _uc: any = null;
        try {
            // Get the unread messages/chats from specific friend
            if (_user === 0) {
                _uc = serializeNonPOJ(await pb.collection('chats').getFullList(0, {
                    filter: `(from = "${friend_id}") && (to = "${$admin.id}") && (read = false)`,
                    sort: '+created'
                }));
            } else {
                _uc = serializeNonPOJ(await pb.collection('chats').getFullList(0, {
                    filter: `(from = "${$admin.id}") && (to = "${$user.id}") && (read = false)`,
                    sort: '+created'
                }));
            }
            
            // Loop through unread messages to get the id and then update on chats -> read = true
            for (let chat of _uc) {
                await pb.collection('chats').update(chat.id, { read: true });
            }

        } catch (error) { console.log(error); }
    }

    async function onClickUser(friend_id: string) {
        $send_to_id = friend_id;
        if (message) send_ok = Boolean($send_to_id && message?.value);
    }

    $: {
        if ($send_to_id) {
            /** Update the Users collection is_typing field to true */
            if (me_is_typing) updateUserIsTyping(me_is_typing);
            /** ..then after 3 seconds set me_is_typing to false */
            setTimeout(() => {
                me_is_typing = false;
                updateUserIsTyping(me_is_typing);
            }, 3000);
        }
    }

    $: {
        if ($send_to_id) {
            // Find the user (not the admin in Users array if he/she is typing)
            myFriend = $users.find((_user: any) => _user.id === $send_to_id);

            if ($user.role === 0) friend_is_typing = myFriend?.is_typing;

            // If user.id is equal to the admin is currently on (chatting to)
            else { if ($user?.id === $admin?.is_chatting_to) { friend_is_typing = $admin.is_typing; } }
        }
    }

    $: {
        /** Mark the chat's as already read */
        // For the admin
        if ($send_to_id) {
            (async () => {
                if ($user?.role == 0) await updateAdminIsChattingTo($send_to_id);
                if ($unreadChats[$send_to_id]) await updateChatRead($send_to_id, $user?.role);
            })();
        }
    }

    const move_to_the_bottom = () => message_content.scrollTo(0, message_content.scrollHeight);

    onMount(async () => {
        // Get chats here on initial page render if the user is a friend
        // or [] empty array (chats) if this is admin
        $chats = ($user?.role === 1) ? await getChats() : []
        if (message_content) move_to_the_bottom();
    });

    afterUpdate(() => move_to_the_bottom());
</script>

<main>
    <!-- Chat Window -->
    <form class="chat-container" method="POST" action="?/send" use:enhance = {
            () => {
                loading = true;
                return async ({ result }) => {
                    loading = false;
                    message.value = "";
                    message.focus();
                    send_ok = false;
                }
            }
        }>

        {#if $user.role === 0}
            <!-- {#if current_chat_friend_full_name}  -->
            {#if myFriend} 
                <div class="px-2 py-5 font-semibold">Me & {myFriend?.first_name}</div>
            {:else}
                <div class="px-2 py-5 text-red-500">Select a friend to chat</div>
            {/if}
        {:else}
            <div class="px-2 py-5 font-semibold">You & {$admin?.first_name}</div>
        {/if}
        <div class="content" bind:this={message_content}>
            <div></div> <!-- being set in grid (2 rows) this will push chats at the bottom -->
            <div class="messages-wrapper">
                {#if $chats}
                    {#each $chats as chat}
                        <Message source={(data?.user.id === chat.from) ? "from" : "to"}>
                            <span slot="message">{chat.message}</span>
                            <span slot="chat-date">
                                {
                                    new Date(chat.created)
                                    .toLocaleString("en-us", {
                                        timeZone: $client_timezone,
                                        dateStyle: "medium",
                                        timeStyle: "long"
                                    })
                                }
                            </span>
                        </Message>
                    {/each}
                {/if}
            </div>
        </div>
        <div style:visibility={friend_is_typing ? "visible" : "hidden"} class="friend-is-typing">
                {#if $user?.role === 0}
                    {myFriend?.first_name} is typing . . .
                {:else}
                    {$admin?.first_name} is typing . . .
                {/if}
        </div>
        <textarea 
            class="new-message"
            name="message"
            placeholder="type your message here"
            bind:this={message}
            on:input={() => {
                if (message) send_ok = Boolean($send_to_id && message?.value);
            }}
            on:keypress={(e) => {
                const special_keys = e.key == "Enter" || e.key == "Tab" || e.key == "Shift" || e.key =="Alt";
                if (!special_keys) me_is_typing = true;
            }}
            on:keydown={async (e) => {
                if (send_ok) {
                    if ((!(e.key == "Enter" && e.shiftKey)) && (e.key === "Enter")) {
                        await updateUserIsTyping(false);
                        sendMessageBtn.click();
                    }
                }
            }}
        />
        <input name="send_to_id" type="text" value={$send_to_id} style="display: none"/>
        <div class="send-btn-wrapper">
            <span></span>
            <button disabled={!send_ok} bind:this={sendMessageBtn} class="btn-send">SEND</button>
        </div>
    </form>

    <!-- Friends/Users List -->
    {#if ($user?.role == 0)}
        <div class="friends-list">
            <h3 class="text-[#222] text-sm">Friend's List</h3>
            <div class="friends-list-wrapper">
                <ul>
                    <!-- {#each data.users as _user} -->
                    {#each $users as _user}
                        {@const color = (_user.is_online ? "green" : "lightgray")}
                        {@const users_full_name = `${_user.first_name} ${_user.last_name}`}
                        {@const padded_users_full_name = users_full_name.length > 13 ? users_full_name.substring(0, 13).padEnd(16, ".") : users_full_name}
                        <li id={_user.id} class:active={_user.id === $send_to_id}>
                            <form 
                                method="POST"
                                action="?/get"
                                use:enhance = {
                                    () => {
                                        loading = true;
                                        return async ({ result }) => {
                                            loading = false;
                                            res = result;
                                            $chats = res?.data?.chats;
                                        }
                                    }
                                }>
                                <button class:online={_user?.is_online} on:click={(e) => onClickUser(_user.id)}>
                                    <Fa icon={faCircle} scale="0.75" style={`color: ${color}`}/>
                                    <span title={users_full_name}>{padded_users_full_name}</span>
                                    {#if ($unreadChats[_user.id] && ($send_to_id !== _user.id))}
                                        <span class="new-messages">{$unreadChats[_user.id]}</span>
                                    {/if}
                                </button>
                                <input name="friend_id" type="text" value={_user.id} style="display: none"/>
                            </form>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</main>

<style lang="postcss">
    main {
        --message-border-radius: 20px;
        display: flex;
        width: 100%;
        column-gap: 5px;
        height: 70vh;
    }

    /* Chat Container */
    .chat-container {
        flex: 2.5;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto auto auto;
        width: 100%;
        overflow-y: auto;
        .content {
            grid-column: 1 / 1;
            grid-row: 2 / 4;
            display: grid;
            grid-template-columns: none;
            grid-template-rows: 1fr auto;
            overflow-y: auto;
            border: solid 0.2px #222;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            padding: 5px 10px;
            .messages-wrapper { display: grid; }
        }
        .friend-is-typing {
            width: fit-content;
            grid-column: 1 / 1;
            grid-row: 3 / 4;
            border-top-right-radius: 15px;
            background-color: rgba(0, 0, 255, 0.801);
            padding: 5px 10px;
            font-size: small;
            z-index: 18;
        }
        .new-message {
            grid-column: 1 / 1;
            grid-row: 5 / 5;
            border: solid 0.2px #222;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            padding: 10px;
            outline: none;
            resize: none;
        }
        .send-btn-wrapper {
            grid-column: 1 / 1;
            grid-row: 6 / 6;
            display: flex;
            align-items: center;
            span {
                flex: 2;
                padding-left: 10px;
                font-weight: 200;
                font-size: small;
            }
            .btn-send {
                background-color: green;
                border-radius: 7px;
                text-transform: uppercase;
                float: right;
                padding: 10px 26px;
                font-size: small;
                color: white;
                margin-top: 2px;
                letter-spacing: 1px;
            }
            .btn-send:hover { background-color: rgb(5, 168, 5); }
            .btn-send:active { background-color: rgb(7, 204, 7); }
            .btn-send:disabled {
                background-color: lightgray;
                color: darkgray;
            }
        }
    }

    /* Friends List */
    .friends-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        row-gap: 5px;
        flex: 1;
        border: solid 0.2px #222;
        border-radius: 7px;
        grid-template-columns: 1fr;
        .friends-list-wrapper { overflow-x: auto; }
        h3 {
            padding: 10px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            background-color: whitesmoke;
        }
        ul {
            padding: 10px;
            font-size: large;
        }
        ul li {
            border-radius: 7px;
            button {
                padding: 5px 10px;
                display: flex;
                align-items: center;
                gap: 3px;
                width: 100%;
                height: 100%;
                /* font-weight: 100; */
                .new-messages {
                    font-size: x-small;
                    background-color: gold;
                    color: black;
                    padding: 2px 7px;
                    border-radius: 10px;
                }
            }
            button.online { font-weight: bold; }
        }
        ul li.active, ul li:hover {
            background-color: rgba(102, 108, 104, 0.767);
            cursor: pointer;
            transition: background-color ease-out 0.3s;
        }

        ul li:active { 
            background-color: rgba(112, 128, 144, 0.767);
            cursor: pointer;
            transition: background-color ease-out 0.3s;
        }
    }
</style>