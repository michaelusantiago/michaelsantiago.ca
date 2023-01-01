<script lang="ts">
    import ModalWindow from "$lib/components/ModalWindow.svelte";
    import { enhance } from '$app/forms';
    import Fa from "svelte-fa";
    import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { show_login_form, show_forgot_password_request_form } from "$lib/stores/globalstore";
    import { onMount } from "svelte";

    let loading = false;
    let log_in_result: any = null;
    let log_in_error: any = null;

    let email: HTMLElement;
    let password: HTMLElement;

    onMount(() => { email.focus() });
</script>

<main>
    <ModalWindow 
        on:close={() => { $show_login_form = false; }}>
        <form method="POST" use:enhance = {
            ({ form, data, action }) => {
                loading = true;
                return async ({ result, update }) => {
                    loading = false;
                    log_in_result = result;
                    if (log_in_result?.data?.success) {
                        $show_login_form = false;
                        location.reload();
                    } else log_in_error = log_in_result?.data;
                }
            }}>
            <h1 class="font-bold text-2xl">Log In</h1>
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    bind:this={email}
                    on:change={() => log_in_error = null}
                />
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    bind:this={password}
                    on:change={() => log_in_error = null}
                />
            </label>
            <div class="btn-action-wrapper">
                <div class="group-btn">
                    <button
                        default={true}
                        formaction="/?/log_in"
                        class="bg-blue-500 px-10 py-2 rounded-md">
                        <span class="flex gap-2 items-center">
                            Log in
                            {#if loading}
                                <Fa icon={faSpinner} pulse/>
                            {/if}
                        </span>
                    </button>
                    <button
                        formaction="/?/close"
                        class="bg-green-500 px-10 py-2 rounded-md"
                        on:click={() => $show_login_form = false }>
                        Close
                    </button>
                </div>

                <!-- Alert -->
                {#if log_in_error}
                    <!--  Extract fields that has error -->
                    {@const error_fields = Object.keys(log_in_error?.message.data)}
                    <div class="mt-3 text-sm bg-red-600 w-full p-4 rounded-md">
                        <div class="flex items-center py-2">
                            <Fa icon={faExclamationTriangle}/>
                            &nbsp;
                            <span class="font-bold">{log_in_error?.message.message}</span>
                        </div>
                        <ul class="flex flex-col gap-3">
                            {#each error_fields as error_field}
                                <li>
                                    <div class="bg-gray-400 rounded-md px-2 py-1 w-fit">{error_field}</div>
                                    <div>- {log_in_error?.message.data[error_field].message}</div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                <!-- Request password reset -->
                <button
                    formaction="/?/close"
                    class="pl-2 text-left"
                    on:click={() => {
                        $show_login_form = false
                        $show_forgot_password_request_form = true
                    }}>
                    Forgot password?
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

    .btn-action-wrapper {
        display: flex;
        flex-direction: column-reverse;
    }
</style>