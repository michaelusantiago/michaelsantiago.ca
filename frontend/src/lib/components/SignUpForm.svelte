<script lang="ts">
    import { enhance, applyAction } from "$app/forms"
    import { createEventDispatcher, onMount } from "svelte"
    import { onDestroy } from "svelte"
    import type { SubmitFunction } from "@sveltejs/kit"
    import { fly } from "svelte/transition"
    import { Circle } from "svelte-loading-spinners";

    const dispatch = createEventDispatcher()

    let is_saving = false
    let modal: HTMLDivElement
    let email: HTMLInputElement
    let password: HTMLInputElement
    let confirm_password: HTMLInputElement
    let first_name: HTMLInputElement
    let last_name: HTMLInputElement
    let birth_date: HTMLInputElement
    let sign_up_result: any
    let sign_up_error: any

    onMount(() => { email.focus() })

    const onSubmitForm: SubmitFunction = async () => {
        is_saving = true 
        return async ({ result, update }) => {
            is_saving = false
            sign_up_result = result
            if (sign_up_result?.data?.success) {
                await applyAction(result)
                update()
                dispatch('close', { success: true })
            } else {
                sign_up_error = sign_up_result?.data
                is_saving = false
            }
        }
    }

    const onClickWindowFrame = (e: Event) => {
        const window_frame = (e.target as HTMLDivElement).closest('#window-frame')
        if (window_frame) dispatch('close')
    }

	const handle_keydown = (e: any) => {
		if (e.key === 'Escape') {
            // if (questionInput.value.trim() === '') dispatch('close')
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

    const onChangeInput = async(e: Event) => { }

    $: {
        if (sign_up_error?.message?.data?.email) email.focus()
        else if (sign_up_error?.message?.data?.password) password.focus()
        else if (sign_up_error?.message?.data?.passwordConfirm) confirm_password.focus()
        else if (sign_up_error?.message?.data?.first_name) first_name.focus()
        else if (sign_up_error?.message?.data?.last_name) last_name.focus()
        else if (sign_up_error?.message?.data?.birth_date) birth_date.focus()
    }
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
        <form
            class="inner-window"
            method="POST"
            action="/?/sign_up"
            in:fly="{{x: 22, duration: 300}}"
            out:fly="{{x: 82, duration: 200}}"
            use:enhance={onSubmitForm}>
            <h1 class="head-title">Sign Up</h1>
            <label>
                Email
                <input
                    on:change={onChangeInput}
                    bind:this={email}
                    name="email"
                    type="email"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.email?.message}
                        <span class="error">{sign_up_error?.message?.data?.email?.message}</span>
                    {/if}
                {/if}
            </label>
            <label>
                Password
                <input
                    bind:this={password}
                    on:change={onChangeInput}
                    name="password"
                    type="password"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.password?.message}
                        <span class="error">{sign_up_error?.message?.data?.password?.message}</span>
                    {/if}
                {/if}
            </label>
            <label>
                Confirm Password
                <input
                    bind:this={confirm_password}
                    on:change={onChangeInput}
                    name="passwordConfirm"
                    type="password"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.passwordConfirm?.message}
                        <span class="error">{sign_up_error?.message?.data?.passwordConfirm?.message}</span>
                    {/if}
                {/if}
            </label>
            <label>
                First Name
                <input
                    bind:this={first_name}
                    on:change={onChangeInput}
                    name="first_name"
                    type="text"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.first_name?.message}
                        <span class="error">{sign_up_error?.message?.data?.first_name?.message}</span>
                    {/if}
                {/if}
            </label>
            <label>
                Last Name
                <input
                    bind:this={last_name}
                    on:change={onChangeInput}
                    name="last_name"
                    type="text"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.last_name?.message}
                        <span class="error">{sign_up_error?.message?.data?.last_name?.message}</span>
                    {/if}
                {/if}
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
                    bind:this={birth_date}
                    on:change={onChangeInput}
                    id="birth_date"
                    name="birth_date"
                    type="date"
                />
                {#if sign_up_error}
                    {#if sign_up_error?.message?.data?.birth_date?.message}
                        <span class="error">{sign_up_error?.message?.data?.birth_date?.message}</span>
                    {/if}
                {/if}
            </label>

            <!-- Action Buttons Wrapper -->
            <div class="action-btns-wrapper">
                <div class="action-btns-group">
                    {#if is_saving}
                        <button type="submit">
                            <span>Signing Up</span>
                            <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                        </button>
                    {:else}
                        <button type="submit">Sign Up</button>
                    {/if}
                    <button type="reset" on:click|self={() => dispatch("close")}>Cancel</button>
                </div>
            </div>
        </form>
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
        label {
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
        .action-btns-wrapper button {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 1rem;
            padding: 0.7rem 2rem;
            cursor: pointer;
            &:hover, &:active, &:focus {
                background-color: rgb(199, 202, 193);
            }
        }
        .action-btns-wrapper {
            display: flex;
            justify-content: flex-end;
            flex-direction: column-reverse;
            .action-btns-group {
                display: flex;
                justify-content: right;
                margin-top: 2.2rem;
                gap: 5px;
            }
            .action-btns-group button[type="submit"] {
                background-color: var(--blue-7);
                &:hover { background-color: var(--blue-7); }
            }
            .action-btns-group button[type="reset"] {
                background-color: var(--green-6);
                &:hover { background-color: var(--green-7); }
            }
        }
        /* .errors-wrapper {
            padding: 10px;
            font-size: small;
            .error-field {
                background-color: lightgrey;
                border-radius: 20px;
                padding: 5px 10px;
                width: fit-content;
            }
            .error-message { }
        } */
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
</style>