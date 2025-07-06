<script lang="ts">
    import Container from "./Container.svelte"
    import { enhance } from "$app/forms"
    import { createEventDispatcher, onDestroy } from "svelte"
    import type { SubmitFunction } from "@sveltejs/kit"
    import { fly } from "svelte/transition"
    import { Circle } from "svelte-loading-spinners";

    export let user: any

    let modal: HTMLDivElement
    let first_name: HTMLInputElement
    let last_name: HTMLInputElement
    let current_password: HTMLInputElement
    let new_password: HTMLInputElement
    let confirm_new_password: HTMLInputElement
    let is_updating = false
    let profile_update_result: any = null
    let profile_update_error: any = null

    const dispatch = createEventDispatcher()

    const onSubmitForm: SubmitFunction = async () => {
        is_updating = true;
        return async ({ result }) => {
            is_updating = false;
            profile_update_result = result;
            if (profile_update_result?.data?.success) {
                if (profile_update_result?.data?.change_email)
                    dispatch('close', { success: true, change_email: true })
                else
                    dispatch('close', { success: true })
            } else {
                is_updating = false;
                profile_update_error = profile_update_result?.data?.message?.data;
                console.log(profile_update_result)
            }
        }
    }

    $: {
        if (profile_update_error?.first_name) first_name.focus()
        else if (profile_update_error?.last_name) last_name.focus()
        else if (profile_update_error?.oldPassword) current_password.focus()
        else if (profile_update_error?.password) new_password.focus()
        else if (profile_update_error?.passwordConfirm) confirm_new_password.focus()
    }

    const onClickWindowFrame = (e: Event) => {
        const window_frame = (e.target as HTMLDivElement).closest('#window-frame')
        if (window_frame) dispatch('close')
    }

	const handle_keydown = (e: any) => {
		if (e.key === 'Escape') {
            dispatch('close')
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n: any) => (n.tabIndex >= 0) && (!n.hidden));

			let index = tabbable.indexOf(document.activeElement as HTMLElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			(tabbable[index] as HTMLElement).focus();
			e.preventDefault();
		}
	}

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			(previously_focused as HTMLElement).focus();
		});
	}

    const onChangeInput = () => { }
</script>

<svelte:window on:keydown={handle_keydown}/>

<main>
    <div 
        id="window-frame"
        on:click|self={onClickWindowFrame}
        bind:this={modal}
        on:keydown={() => { }}
        tabindex="0"
        role="button">
        <div
            class="inner-window"
            in:fly="{{x: 22, duration: 300}}"
            out:fly="{{x: 82, duration: 200}}">
            <h1 class="head-title">Profile</h1>
            <div>
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
                    <form method="POST" use:enhance = {onSubmitForm}>
                        <label>
                            First Name
                            <input
                                required
                                bind:this={first_name}
                                on:change={onChangeInput}
                                name="first_name"
                                type="text"
                                value={user.first_name}
                            />
                            {#if profile_update_error?.first_name}
                                <span class="error">{profile_update_error?.first_name.message}</span>
                            {/if}
                        </label>
                        <label>
                            Last Name
                            <input
                                required
                                bind:this={last_name}
                                on:change={onChangeInput}
                                name="last_name"
                                type="text"
                                value={user.last_name}
                            />
                            {#if profile_update_error?.last_name}
                                <span class="error">{profile_update_error?.last_name.message}</span>
                            {/if}
                        </label>
                        <label>
                            Gender
                            <select
                                on:change={onChangeInput}
                                name="gender"
                                value={user.gender ?? ""}>
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
                                value={new Date(user.birth_date).toLocaleString("en-CA").split(',')[0]}
                            />
                        </label>

                        <div class="group-btn">
                            <button
                                type="submit"
                                formaction="/?/update_basic_info">
                                <span>
                                    Save Changes
                                    {#if is_updating}
                                        <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                                    {/if}
                                </span>
                            </button>
                            <button
                                type="reset"
                                on:click={() => { dispatch('close')}}>
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
                    <form method="POST" use:enhance = {onSubmitForm}>
                        <label>
                            Current Password
                            <input
                                required
                                bind:this={current_password}
                                on:change={onChangeInput}
                                name="current_password"
                                type="password"
                            />
                            {#if profile_update_error?.oldPassword}
                                <span class="error">{profile_update_error?.oldPassword.message}</span>
                            {/if}
                        </label>
                        <label>
                            New Password
                            <input
                                required
                                bind:this={new_password}
                                on:change={onChangeInput}
                                name="password"
                                type="password"
                            />
                            {#if profile_update_error?.password}
                                <span class="error">{profile_update_error?.password.message}</span>
                            {/if}
                        </label>
                        <label>
                            Confirm Password
                            <input
                                required
                                bind:this={confirm_new_password}
                                on:change={onChangeInput}
                                name="confirm_password"
                                type="password"
                            />
                            {#if profile_update_error?.passwordConfirm}
                                <span class="error">{profile_update_error?.passwordConfirm.message}</span>
                            {/if}
                        </label>

                        <div>
                            <!-- Action Buttons -->
                            <div class="group-btn">
                                <button
                                    type="submit"
                                    formaction="/?/change_password">
                                    <span>
                                        Save Changes
                                        {#if is_updating}
                                            <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                                        {/if}
                                    </span>
                                </button>
                                <button
                                    type="reset"
                                    formaction="/?/close"
                                    on:click={() => { dispatch('close')}}>
                                    Close
                                </button>
                            </div>
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
                    <form method="POST" use:enhance = { onSubmitForm }>
                        <h1 class="user-email">{user.email}</h1>
                        <label>
                            Current Password
                            <input
                                required
                                on:change={onChangeInput}
                                name="password"
                                type="password"
                            />
                            {#if profile_update_error?.password}
                                <span class="error">{profile_update_error?.password.message}</span>
                            {/if}
                            {#if profile_update_result?.data?.message?.code === 400}
                                <span class="error">{profile_update_result?.data?.message?.message}</span>
                            {/if}
                        </label>
                        <label>
                            New Email
                            <input
                                required
                                on:change={onChangeInput}
                                name="newEmail"
                                type="email"
                            />
                            {#if profile_update_error?.newEmail}
                                <span class="error">{profile_update_error?.newEmail.message}</span>
                            {/if}
                        </label>

                        <div class="group-btn">
                            <button
                                type="submit"
                                formaction="/?/change_email">
                                <span>
                                    Save Changes
                                    {#if is_updating}
                                        <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                                    {/if}
                                </span>
                            </button>
                            <button
                                type="reset"
                                formaction="/?/close"
                                on:click={() => { dispatch('close') }}>
                                Close
                            </button>
                        </div>
                    </form>
                </Container>
            </div>
        </div> 
    </div>
</main>

<style lang="postcss">
    :root {
        --bg-color: white;
    }
    #window-frame {
        display: flex;
        position: fixed;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        color: black;;
        transition: background-color 0.8s ease-out;
    }
    .inner-window {
        display: flex;
        position: absolute;
        flex-direction: column;
        box-sizing: border-box;
        min-width: 400px;
        max-width: 400px;
        padding: 20px 25px;
        border: solid 1px lightblue;
        background-color: whitesmoke;
        box-shadow: var(--shadow-3);
        right: 0;
        top: 0;
        height: 100%;
        overflow-y: auto;
        .head-title {
            font-weight: bold;
            font-size: x-large;
            padding: 2px;
            margin-block-end: 12px;
        }
        form {
            label {
                display: block;
                text-transform: uppercase;
                font-size: small;
                background-color: var(--bg-color);
                padding: 10px 15px;
                border: whitesmoke solid 3.5px;
                border-radius: 0.375rem;
                color: gray;
            }
            label:focus-within { border-color: lightgray; }
            input, select {
                width: 100%;
                font-size: medium;
                outline: none;
                padding-inline: 0;
                font-family: inherit;
            }
            input:autofill {
                box-shadow: 0 0 0px 1000px var(--bg-color) inset;
            }

            .group-btn {
                display: flex;
                justify-content: right;
                margin-top: 1.5rem;
                gap: 5px;
                button { 
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    font-size: 1rem;
                    padding: 0.7rem 2rem;
                    cursor: pointer;
                    color: black;
                    &:hover, &:active, &:focus {
                        background-color: rgb(199, 202, 193);
                    }
                    span {
                        display: flex;
                        gap: 5px;
                    }
                }
                button[type="submit"] {
                    background-color: var(--blue-6);
                    &:hover { background-color: var(--blue-7); }
                }
                button[type="reset"] {
                    background-color: var(--green-6);
                    &:hover { background-color: var(--green-7); }
                }
            }
            .user-email { padding: 10px 5px; }
            .error {
                font-size: small;
                text-transform: lowercase;
                display: flex;
                color: red;
                padding: 2px 6px;
                margin-top: 5px;
                box-sizing: border-box;
            }
        }
    }
</style>
