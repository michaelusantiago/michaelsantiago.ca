<script lang="ts">
    import { send_to_id, friends_list, unread_chats } from "@lib/store";
    import { createEventDispatcher } from "svelte";

    let loading = false
    let res: any

    const dispatch = createEventDispatcher()

    const getTotalUnreadChats = (friend_id: string) => {
        const _uc = $unread_chats.filter((uc: any) => uc.from == friend_id)
        return _uc.length
    }

    const onClickFriend = async (friend_id: string) => {
        $send_to_id = friend_id
        dispatch("click", friend_id)
    }
</script>

<main>
    <div class="friends-list">
        <h3><i class="ri-chat-new-line"/>&nbsp;Friend's List</h3>
        <div class="friends-list-wrapper">
            <ul>
                {#each $friends_list as friend}
                    {@const friend_full_name = `${friend.first_name} ${friend.last_name}`}
                    {@const padded_friend_full_name = friend_full_name.length > 30 ? friend_full_name.substring(0, 13).padEnd(16, ".") : friend_full_name}
                    {@const total_unread_chats = getTotalUnreadChats(friend.id)}
                    <li class:active={friend.id === $send_to_id}>
                        <button
                            class:online={friend.is_online}
                            on:click={() => onClickFriend(friend.id)}>
                            {#if friend.is_online}🟢{:else}⚫{/if}
                            &nbsp;
                            <span title={friend_full_name}>{padded_friend_full_name}</span>
                            &nbsp;
                            {#if total_unread_chats}
                                <span class="new-messages">{total_unread_chats}</span>
                            {/if}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</main>

<style lang="postcss">
    .friends-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        /* row-gap: 5px; */
        flex: 1;
        border: solid 0.2px #222;
        border-radius: 7px;
        grid-template-columns: 1fr;
        width: 15rem;
        height: 20rem;
        overflow-y: auto;
        .friends-list-wrapper { overflow: auto; }
        h3 {
            font-size: small;
            padding: 10px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }
        ul li {
            display: flex;
            button {
                background-color: inherit;
                padding: 5px 10px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                height: 100%;
                font-weight: 100;
                i { color: lightgray; } /* off-line */
                .new-messages {
                    display: flex;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: x-small;
                    height: 20px;
                    width: 20px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100%;
                    color: #222;
                    background-color: yellowgreen;
                }
            }
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