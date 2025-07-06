<script lang="ts">
    import { enhance, applyAction } from "$app/forms"
    import { createEventDispatcher, onMount } from "svelte"
    import { onDestroy } from "svelte"
    import type { SubmitFunction } from "@sveltejs/kit"
    import { fly } from "svelte/transition"
    import { Circle } from "svelte-loading-spinners"

    const dispatch = createEventDispatcher()

    let modal: HTMLDivElement
    let email: HTMLInputElement
    let password: HTMLInputElement
    let is_saving = false
    let is_newly_mounted = true
    let login_error: any = null

    onMount(() => email.focus())

    const onSubmitForm: SubmitFunction = async () => {
        is_saving = true
        return async ({ result }) => {
            is_newly_mounted = false
            await applyAction(result)
            const res: any = result
            if (res.data.success) {
                dispatch('close')
                window.location.reload()
            } else {
                login_error = res.data.message
                is_saving = false
            }
        }
    }

    $: {
        if (login_error?.data.identity) email.focus()
        else if (login_error?.data.password) password.focus()
        else if (email) email.focus()
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
            action="/?/log_in"
            in:fly="{{x: 22, duration: 300}}"
            out:fly="{{x: 82, duration: 200}}"
            use:enhance={onSubmitForm}>
            <h1 class="head-title">Log In</h1>
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    bind:this={email}
                />
                {#if login_error?.data?.identity}
                    <span class="error">{login_error?.data?.identity?.message}</span>
                {/if}
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    bind:this={password}
                />
                {#if login_error?.data?.password}
                    <span class="error">{login_error?.data?.password?.message}</span>
                {/if}
            </label>
            {#if (login_error && !(login_error?.data?.identity || login_error?.data?.password))}
                <div class="error-box">
                    <i class="ri-error-warning-line"/>
                    <span>{login_error?.message}</span>
                </div>
            {/if}
            <div class="action-btns-wrapper">
                <div class="action-btns-group">
                    <button
                        disabled={is_saving}
                        type="submit">
                        <span>Log In</span>
                        {#if is_saving}
                            <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                        {/if}
                    </button>
                    <button type="reset" on:click|self={() => dispatch("close") }>
                    Cancel
                    </button>
                </div>

                <!-- Request password reset -->
                <button
                    class="forgot-password"
                    on:click={() => dispatch('close', { password_reset: true })}>
                    Forgot password?
                </button>
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
        gap: 15px;
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
        .forgot-password {
            background: transparent;
            text-align: left;
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
        input {
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
            .forgot-password {
                color: black;
                padding: 0 1rem;
                font-size: medium;
                &:active, &:focus, &:hover {
                    background-color: transparent;
                    outline: none;
                    text-decoration: underline;
                }
            }
            .action-btns-group {
                display: flex;
                justify-content: right;
                margin-top: 2.2rem;
                gap: 5px;
            }
            .action-btns-group button[type="submit"] {
                background-color: var(--blue-6);
                &:hover { background-color: var(--blue-7); }
            }
            .action-btns-group button[type="reset"] {
                background-color: var(--green-6);
                &:hover { background-color: var(--green-7); }
            }
        }
        .error {
            font-size: small;
            text-transform: lowercase;
            display: flex;
            color: red;
            padding: 2px 6px;
            margin-top: 5px;
            box-sizing: border-box;
        }
        .error-box {
            background-color: var(--red-6);
            padding: 8px 10px;
            margin-inline: 5px;
            font-weight: bold;
            font-size: small;
            color: white;
            border-radius: 5px;
        }
    }
</style>