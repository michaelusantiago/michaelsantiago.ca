<script lang="ts">
    import {
        selected_menu,
        current_user,
        admin,
        chats,
        client_timezone,
        send_to_id,
        friends_list
    } from "@lib/store"
    import FriendsListDropDownMenu from "@lib/components/FriendsListDropDownMenu.svelte"
    import Message from "@lib/components/Message.svelte"
    import { afterUpdate, onMount, tick } from "svelte"
    import { enhance } from "$app/forms"
    import { page } from "$app/stores"
    import PocketBase from 'pocketbase'
    import { env } from "$env/dynamic/public"
    import * as db from "@lib/Database"

    selected_menu.set("chat")

    let message_content: HTMLDivElement
    let message: HTMLTextAreaElement
    let message_value: string
    let sendMessageBtn: HTMLButtonElement
    let submitButton: HTMLButtonElement
    let formPost: HTMLFormElement
    let loading = false
    let send_ok = false
    let res: any
    let is_typing = false
    let is_sending_message = false
    let time_out: any = null

    const pb = new PocketBase(env.PUBLIC_PB_URI)

    const onClickFriend = async (event: CustomEvent) => {
        await tick()
        const sb = document.getElementById('submit_button')
        sb?.click()
    }

    $: current_selected_friend = $friends_list.find((friend: any) => friend.id === $send_to_id) || null
    $: {
        if ($current_user.role == 0) send_ok = Boolean(message_value && current_selected_friend)
        else send_ok = Boolean(message_value)
    }
    $: updateCurrentUserIsTyping(is_typing)
    $: if ($chats) {
        if ($current_user.role == 1) (async () => await db.updateChatsRead($current_user.id))()
        else if ($send_to_id) (async () => await db.updateAdminChatsRead($send_to_id))()
    }

    onMount(async () => {
        if ($current_user.role == 1 && !$chats.length) {
            loading = true
            $chats = (await db.getChats($current_user.id, $admin.id)).chats
            // await db.updateChatsRead($current_user.id)
            loading = false
        }
    })

    const updateCurrentUserIsTyping = async (typing: boolean) => {
        try {
            await pb.collection('users').update($current_user?.id, { is_typing })
        } catch (error) { console.log(error) }
    }

    const move_to_the_bottom = () => message_content.scrollTo(0, message_content.scrollHeight)

    afterUpdate(() => move_to_the_bottom())
</script>

<svelte:head>
    <title>Chat - Michael Santiago</title>
</svelte:head>

<!--
    Applies only when it's the admin
    This hidden form is responsible for sending getChats based on the selected
    friend_id that was fried upon clicking friends name on the friends list
-->
<form
    class="hidden-form"
    bind:this={formPost}
    method="POST"
    action="/chat?/get"
    use:enhance={
        () => {
            loading = true
            return async ({ result }) => {
                loading = false
                res = result
                $chats = res?.data?.chats
                await db.updateAdminChatsRead($send_to_id)
            }
        }
    }>
    <button
        id="submit_button"
        bind:this={submitButton}
        type="submit">
        Submit
    </button>
    <input
        name="friend_id"
        value={$send_to_id || $admin.id}
        type="text"
    />
</form>


<main>
    <!-- Chat Window -->
    <div class="chat-container">
        {#if $current_user.role === 0}
            <div class="chat-who-wrapper">
                {#if current_selected_friend}
                    <span class="chat-who">Me & {current_selected_friend.first_name}</span>
                {:else}
                    <span class="chat-who">Select a friend to chat</span>
                {/if}
                <FriendsListDropDownMenu on:click={onClickFriend}/>
            </div>
        {:else}
            <div class="chat-who-wrapper">
                <div class="chat-who">
                    Michael is 
                    <span
                        class:online={$admin.is_online}
                        class="status">
                        {$admin.is_online ? '🟢 online' : '⚫ offline'}
                    </span>
                </div>
            </div>
        {/if}

        <!-- Messages/Conversation -->
        <div class="content" bind:this={message_content}>
            <div></div> <!-- being set in grid (2 rows) this will push chats at the bottom -->
            <div class="messages-wrapper">
                {#if !loading}
                    {#each $chats as chat}
                        <Message source={($current_user.id === chat.from) ?  "from" : "to"}>
                            <span slot="message">{chat.message}</span>
                            <span slot="chat-date">
                                {
                                    new Date(chat.created).toLocaleString("en-us", {
                                        timeZone: $client_timezone,
                                        dateStyle: "medium",
                                        timeStyle: "long"
                                    })
                                }
                            </span>
                        </Message>
                    {/each}
                {:else}
                    <div>Loading chats...</div>
                {/if}
            </div>
        </div>

        <!-- User is typing indicator -->
        <!-- <div style:visibility={friend_is_typing ? "visible" : "hidden"} class="friend-is-typing"> -->
        {#if $current_user.role == 1}
            <div style:visibility={$admin.is_typing ? "visible" : "hidden"} class="friend-is-typing">
                <span>{$admin.first_name} typing..</span>
            </div>
         {:else}
            {#if current_selected_friend}
                <div style:visibility={current_selected_friend.is_typing ? "visible" : "hidden"} class="friend-is-typing">
                    <span>{current_selected_friend.first_name} typing..</span>
                </div>
            {/if}
        {/if}

        <!-- Message Input Control -->
        <form
            class="message-input-control"
            method="POST"
            action="?/send"
            use:enhance={
                () => {
                    is_sending_message = true
                    send_ok = false
                    return async ({ result }) => {
                        is_sending_message = false
                        res = result
                        $chats = res?.data?.chats
                        message_value = ''
                        message.focus()
                    }
                }
            }>
            {#if is_sending_message}
                <div class="sending-notification">
                    sending....
                </div>
            {/if}
            <textarea 
                class="new-message"
                name="message"
                placeholder="type your message here"
                bind:value={message_value}
                bind:this={message}
                on:keypress={(e) => {
                    const special_keys = (e.key == "Enter" || e.key == "Tab" || e.key == "Shift" || e.key =="Alt");
                    if (!special_keys) {
                        if (!is_typing) {
                            is_typing = true
                            clearTimeout(time_out)
                        }
                        time_out = setTimeout(() => is_typing = false, 3000)
                    }
                }}
                on:keydown={async (e) => {
                    if ((!(e.key == "Enter" && e.shiftKey)) && (e.key === "Enter")) {
                        if (send_ok && message_value.trim()) sendMessageBtn.click()
                        e.preventDefault()
                    } 
                }}
            />
            <input
                hidden
                name="send_to_id"
                type="text"
                value={$send_to_id}
            />
            <button
                disabled={!send_ok}
                bind:this={sendMessageBtn}
                class="btn-send">
                Send
            </button>
        </form>
    </div>
</main>

<style lang="postcss">
    main {
        --message-border-radius: 20px;
        display: flex;
        height: 70vh;
        margin: 2rem;
    }

    .hidden-form {
        visibility: hidden;
        height: 0px;
        * {
            visibility: hidden;
            height: 0px;
        }
    }

    /* Chat Container */
    .chat-container {
        flex: 2.5;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto auto auto;
        width: 100%;
        overflow-y: auto;

        .chat-who-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0.5rem;
            .chat-who { flex: 2; }
        }

        .status { color: lightgray; }
        .status.online {
            font-weight: bold;
            color: var(--blue-5);
        }
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

        .message-input-control {
            position: relative;
            display: flex;
            border: solid 1px #222;
            height: auto;
            border: solid 0.2px #222;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            .new-message {
                /* grid-column: 1 / 1;
                grid-row: 5 / 5; */
                /* border: solid 0.2px #222;*/
                border-bottom-left-radius: 7px;
                border-bottom-right-radius: 7px;
                padding: 10px;
                outline: none;
                resize: none;
                font-family: inherit;
                flex: 2;
            }
            .btn-send {
                background-color: green;
                border-radius: 7px;
                text-transform: uppercase;
                padding: 10px 26px;
                font-size: small;
                color: white;
                margin: 0.2rem;
                letter-spacing: 1px;
            }
            .btn-send:hover { background-color: rgb(5, 168, 5); }
            .btn-send:active { background-color: rgb(7, 204, 7); }
            .btn-send:disabled {
                background-color: lightgray;
                color: darkgray;
            }
        }

        .message-input-control > .sending-notification {
            position: absolute;
            display: flex;
            background-color: rgba(22, 22, 22, 0.5);
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
            z-index: 2;
        }
    }

    @media screen and (max-width: 650px) {
        main {
            flex-direction: column;
        }
    }
</style>