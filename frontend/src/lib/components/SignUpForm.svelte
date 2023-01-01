<script lang="ts">
    import ModalWindow from "$lib/components/ModalWindow.svelte";
    import Notification from "$lib/components/Notification.svelte";
    import { enhance } from '$app/forms';
    import Fa from "svelte-fa";
    import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { show_sign_up_form, show_notification } from "$lib/stores/globalstore";

    let loading = false;
    let sign_up_result: any = null;
    let sign_up_error: any = null;

    const onChangeInput = async (e: Event) => sign_up_error = null;
</script>

<main>
    <!-- Notification -->
    {#if $show_notification}
        <Notification success={true}>
            <div slot="message">
                Thank you for signing up.
                Please check your email where I send you a verification link to verify your account.
            </div>
        </Notification>
    {/if}

    <ModalWindow on:close={() => { $show_sign_up_form = false; }}>
        <form class="overflow-y-auto" method="POST" use:enhance = {
            ({ form, data, action }) => {
                loading = true;
                return async ({ result, update }) => {
                    loading = false;
                    sign_up_result = result;
                    if (sign_up_result?.data?.success) {
                        $show_sign_up_form = false;
                        $show_notification = true;
                    } else sign_up_error = sign_up_result?.data;
                }
            }
        }>
            <h1 class="font-bold text-2xl p-2">Sign Up</h1>
            <label>
                Email
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    autofocus
                    on:change={onChangeInput}
                    name="email"
                    type="email"
                />
            </label>
            <label>
                Password
                <input
                    on:change={onChangeInput}
                    name="password"
                    type="password"
                />
            </label>
            <label>
                Confirm Password
                <input
                    on:change={onChangeInput}
                    name="passwordConfirm"
                    type="password"
                />
            </label>
            <label>
                First Name
                <input
                    on:change={onChangeInput}
                    name="first_name"
                    type="text"
                />
            </label>
            <label>
                Last Name
                <input
                    on:change={onChangeInput}
                    name="last_name"
                    type="text"
                />
            </label>
            <label>
                Gender
                <select on:change={onChangeInput} name="gender">
                    <option>Masculine</option>
                    <option>Feminine</option>
                <select>
            </label>
            <label>
                Birth Date
                <input
                    on:change={onChangeInput}
                    id="birth_date"
                    name="birth_date"
                    type="date"
                />
            </label>

            <!-- Alert -->
            {#if sign_up_error }
                {@const error_fields = Object.keys(sign_up_error?.message.data)}
                <div class="text-sm bg-red-600 w-full p-4 rounded-md">
                    <div class="flex items-center py-2">
                        <Fa icon={faExclamationTriangle}/>
                        <span class="font-bold">{sign_up_error?.message.message}</span>
                    </div>
                    <ul class="flex flex-col gap-3">
                        {#each error_fields as error_field}
                            <li>
                                <div class="bg-gray-400 rounded-md px-2 py-1 w-fit">{error_field}</div>
                                <div>- {sign_up_error?.message.data[error_field].message}</div>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <!-- Alert Buttons -->
            <div class="group-btn">
                <button
                    formaction="/?/sign_up"
                    class="bg-blue-500 px-10 py-2 rounded-md">
                    <span class="flex gap-2 items-center">
                        Sign up 
                        {#if loading}
                            <Fa icon={faSpinner} pulse/>
                        {/if}
                    </span>
                </button>
                <button
                    formaction="/?/close"
                    class="bg-green-500 px-10 py-2 rounded-md"
                    on:click={() => { $show_sign_up_form = false }}>
                    Close
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
        padding: 17px;
        gap: 1.5px;
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
        input, select {
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
        margin-top: 1.5rem;
        gap: 5px;
    }
</style>