<script lang="ts">
    import ModalWindow from "$lib/components/ModalWindow.svelte";
    import Notification from "$lib/components/Notification.svelte";
    import Container from "$lib/components/Container.svelte";
    import { enhance } from '$app/forms';
    import Fa from "svelte-fa";
    import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons";
    import {
        user, show_profile_form, show_notification,
        show_forgot_password_request_form
    } from "$lib/stores/globalstore";

    let loading = false;
    let profile_update_result: any = null;
    let profile_update_error: any = null;

    const onChangeInput = async (e: Event) => profile_update_error = null;
</script>

<!-- Notification -->
{#if $show_notification}
    <Notification success={true}>
        <div slot="message">
            Profile successfully updated!
        </div>
    </Notification>
{/if}

<main>
    <ModalWindow on:close={() => { $show_profile_form = false; }}>
        <div class="p-3">
            <h1 class="font-bold text-2xl py-3">Profile</h1>
            <div class="flex flex-col gap-1">
                <!-- Basic Info -->
                <Container
                    header_title="Basic Info"
                    open={true}
                    --border-color="none"
                    --header-bg-color="darkgray"
                    --header-bg-hover-color="lightgray"
                    --header-text-color="black"
                    --icon-size="5px"
                    --icon-position="30%"
                    --icon-color="black"
                    --container-height="400px">
                    <form class="overflow-y-auto" method="POST" use:enhance = {
                        ({ form, data, action }) => {
                            loading = true;
                            return async ({ result, update }) => {
                                loading = false;
                                profile_update_result = result;
                                if (profile_update_result?.data?.success) {
                                    $show_profile_form = false;
                                    $show_notification = true;
                                } else profile_update_error = profile_update_result?.data;
                            }
                        }}>
                        <label>
                            First Name
                            <input
                                required
                                on:change={onChangeInput}
                                name="first_name"
                                type="text"
                                value={$user.first_name}
                            />
                        </label>
                        <label>
                            Last Name
                            <input
                                required
                                on:change={onChangeInput}
                                name="last_name"
                                type="text"
                                value={$user.last_name}
                            />
                        </label>
                        <label>
                            Gender
                            <select
                                on:change={onChangeInput}
                                name="gender"
                                value={$user.gender ?? ""}>
                                <option value="" hidden disabled>- select -</option>
                                <option value="Masculine">Masculine</option>
                                <option value="Feminine">Feminine</option>
                            <select>
                        </label>
                        <label>
                            Birth Date
                            <input
                                on:change={onChangeInput}
                                id="birth_date"
                                name="birth_date"
                                type="date"
                                value={new Date($user.birth_date).toLocaleString("en-CA").split(',')[0]}
                            />
                        </label>

                        <div class="group-btn">
                            <button
                                formaction="/?/update_basic_info"
                                class="bg-blue-500 px-10 py-2 rounded-md">
                                <span class="flex gap-2 items-center">
                                    Save Changes
                                    {#if loading}
                                        <Fa icon={faSpinner} pulse/>
                                    {/if}
                                </span>
                            </button>
                            <button
                                type="reset"
                                class="bg-green-500 px-10 py-2 rounded-md"
                                on:click={() => { $show_profile_form = false }}>
                                Close
                            </button>
                        </div>
                    </form>
                </Container>

                <!-- Change Password -->
                <Container
                    header_title="Change Password"
                    --border-color="none"
                    --header-bg-color="darkgray"
                    --header-bg-hover-color="lightgray"
                    --header-text-color="black"
                    --icon-size="5px"
                    --icon-position="30%"
                    --icon-color="black"
                    --container-height="350px">
                    <form class="overflow-y-auto" method="POST" use:enhance = {
                        ({ form, data, action }) => {
                            loading = true;
                            return async ({ result, update }) => {
                                loading = false;
                                profile_update_result = result;
                                if (profile_update_result?.data?.success) {
                                    $show_profile_form = false;
                                    $show_notification = true;
                                } else profile_update_error = profile_update_result?.data;
                            }
                        }}>
                        <label>
                            Current Password
                            <input
                                required
                                on:change={onChangeInput}
                                name="currentPassword"
                                type="password"
                            />
                        </label>
                        <label>
                            New Password
                            <input
                                required
                                on:change={onChangeInput}
                                name="password"
                                type="password"
                            />
                        </label>
                        <label>
                            Confirm Password
                            <input
                                required
                                on:change={onChangeInput}
                                name="passwordConfirm"
                                type="password"
                            />
                        </label>

                        <div class="flex flex-col-reverse">
                            <!-- Action Buttons -->
                            <div class="group-btn">
                                <button
                                    formaction="/?/change_password"
                                    class="bg-blue-500 px-10 py-2 rounded-md">
                                    <span class="flex gap-2 items-center">
                                        Save Changes
                                        {#if loading}
                                            <Fa icon={faSpinner} pulse/>
                                        {/if}
                                    </span>
                                </button>
                                <button
                                    type="reset"
                                    formaction="/?/close"
                                    class="bg-green-500 px-10 py-2 rounded-md"
                                    on:click={() => { $show_profile_form = false }}>
                                    Close
                                </button>
                            </div>

                            <!-- Request password reset -->
                            <button
                                type="reset"
                                formaction="/?/close"
                                class="pl-2 text-left"
                                on:click={() => {
                                    $show_profile_form = false
                                    $show_forgot_password_request_form = true
                                }}>
                                Forgot password?
                            </button>
                        </div>
                    </form>
                </Container>

                <!--  Change Email -->
                <Container
                    header_title="Change Email Address"
                    --border-color="none"
                    --header-bg-color="darkgray"
                    --header-bg-hover-color="lightgray"
                    --header-text-color="black"
                    --icon-size="5px"
                    --icon-position="30%"
                    --icon-color="black"
                    --container-height="270px">

                    <form class="overflow-y-auto" method="POST" use:enhance = {
                        ({ form, data, action }) => {
                            loading = true;
                            return async ({ result, update }) => {
                                loading = false;
                                profile_update_result = result;
                                if (profile_update_result?.data?.success) {
                                    $show_profile_form = false;
                                    $show_notification = true;
                                } else profile_update_error = profile_update_result?.data;
                            }
                        }}>
                        <h1 class="p-2">{$user.email}</h1>
                        <label>
                            Current Password
                            <input
                                required
                                on:change={onChangeInput}
                                name="password"
                                type="password"
                            />
                        </label>
                        <label>
                            New Email
                            <input
                                required
                                on:change={onChangeInput}
                                name="newEmail"
                                type="email"
                            />
                        </label>

                        <div class="group-btn">
                            <button
                                formaction="/?/change_email"
                                class="bg-blue-500 px-10 py-2 rounded-md">
                                <span class="flex gap-2 items-center">
                                    Save Changes
                                    {#if loading}
                                        <Fa icon={faSpinner} pulse/>
                                    {/if}
                                </span>
                            </button>
                            <button
                                formaction="/?/close"
                                class="bg-green-500 px-10 py-2 rounded-md"
                                on:click={() => { $show_profile_form = false }}>
                                Close
                            </button>
                        </div>
                    </form>
                </Container>
            </div>

            <!-- Alert -->
            {#if profile_update_error }
                {@const error_fields = Object.keys(profile_update_error?.message.data)}
                <div class="text-sm bg-red-600 w-full p-4 mt-2 rounded-md">
                    <div class="flex items-center py-2">
                        <Fa icon={faExclamationTriangle}/>
                        <span class="font-bold">{profile_update_error?.message.message}</span>
                    </div>
                    <ul class="flex flex-col gap-3">
                        {#each error_fields as error_field}
                            <li>
                                <div class="bg-gray-400 rounded-md px-2 py-1 w-fit">{error_field}</div>
                                <div>- {profile_update_error?.message.data[error_field].message}</div>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    </ModalWindow>
</main>

<style lang="postcss">
    form {
        --bg-color: white;
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 5px;
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