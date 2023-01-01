<script lang="ts">
    import ModalWindow from "$lib/components/ModalWindow.svelte";
    import Notification from "./Notification.svelte";
    import { enhance } from '$app/forms';
    import Fa from "svelte-fa";
    import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { show_login_form, show_forgot_password_request_form, show_notification } from "$lib/stores/globalstore";
    import { onMount } from "svelte";

    let loading = false;

    let password_reset_request_error: any = null;
    let password_reset_request_result: any = null;
</script>

<main>
    <!-- Notification -->
    {#if $show_notification}
        <Notification success={true}>
            <div slot="message">
                Recovery link was sent to your email. Please click that link and follow the instructions.
            </div>
        </Notification>
    {/if}

    <ModalWindow on:close={() => { $show_forgot_password_request_form = false; }}>
        <form method="POST" use:enhance = {
            ({ form, data, action }) => {
                loading = true;
                return async ({ result, update }) => {
                    loading = false;
                    password_reset_request_result = result;
                    if (password_reset_request_result?.data?.success) {
                        $show_forgot_password_request_form = false;
                        $show_notification = true;
                        // location.reload();
                    } else {
                        password_reset_request_error = password_reset_request_result?.data;
                    }
                }
            }
        }>
            <h1 class="font-bold text-2xl">
                <p>Password Recovery</p>
                <p class="mt-2 text-sm font-light">Please enter the email you associate for your account here where I will send a recovery link.</p>
            </h1>
            <label>
                Email
                <!-- svelte-ignore a11y-autofocus -->
                <input                
                    autofocus
                    name="email"
                    type="email"
                    on:change={() => password_reset_request_error = null}
                />
            </label>
            <button
                default={true}
                formaction="/?/request_reset_password"
                class="flex justify-center bg-gray-800 px-10 py-2 rounded-md text-white"
                on:click={() => {
                    $show_login_form = false
                }}>
                {#if loading}
                    <Fa icon={faSpinner} pulse/>
                    <span>Sending recovery link</span>
                {:else}
                    <i class="ri-mail-send-line"/>&nbsp;
                    <span>Send recovery link</span>
                {/if}
            </button>

            <!-- Alert -->
            {#if password_reset_request_error}
                <!--  Extract fields that has error -->
                {@const error_fields = Object.keys(password_reset_request_error?.message.data)}
                <div class="mt-3 text-sm bg-red-600 w-full p-4 rounded-md">
                    <div class="flex items-center py-2">
                        <Fa icon={faExclamationTriangle}/>
                        &nbsp;
                        <span class="font-bold">{password_reset_request_error?.message.message}</span>
                    </div>
                    <ul class="flex flex-col gap-3">
                        {#each error_fields as error_field}
                            <li>
                                <div class="bg-gray-400 rounded-md px-2 py-1 w-fit">{error_field}</div>
                                <div>- {password_reset_request_error?.message.data[error_field].message}</div>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <div class="group-btn">
                <button
                    formaction="/?/close"
                    class="bg-green-500 px-10 py-2 rounded-md"
                    on:click={() => {
                        $show_forgot_password_request_form = false
                        $show_login_form = true
                    }}>
                    Back to Log in
                </button>
            </div>
        </form>
    </ModalWindow>
</main>

<style lang="postcss">
    form {
        --bg-color: white;
        display: flex;
        flex-direction: column;
        padding: 25px;
        gap: 25px;
        label {
            text-transform: uppercase;
            font-size: small;
            background-color: var(--bg-color);
            padding: 10px 20px;
            border: whitesmoke solid 3.5px;
            border-radius: 0.375rem;
            color: gray;
        }
        label:focus-within { border-color: lightgray; }
        input {
            width: 100%;
            font-size: medium;
            outline: none;
        }
        input:autofill {
            box-shadow: 0 0 0px 1000px var(--bg-color) inset;
        }
    }

    .group-btn {
        display: flex;
        justify-content: right;
        margin-top: 2.2rem;
        gap: 5px;
    }
</style>