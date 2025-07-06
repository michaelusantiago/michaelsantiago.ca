<script lang="ts">
    import { enhance } from "$app/forms"
    import { createEventDispatcher, onMount } from "svelte"
    import { onDestroy } from "svelte"
    import type { SubmitFunction } from "@sveltejs/kit"
    import { fly } from "svelte/transition"
    import { Circle } from "svelte-loading-spinners"

    const dispatch = createEventDispatcher()

    let modal: HTMLDivElement
    let email: HTMLInputElement
    let password_reset_request_error: any = null
    let is_sending_recovery_Link = false

    onMount(() => email.focus())

    $: if (password_reset_request_error?.email) email.focus()

    const onSubmitForm: SubmitFunction = async () => {
        is_sending_recovery_Link = true
        return async ({ result }) => {
            const res: any = result
            console.log(result)
            if (res.data.success === true) {
                dispatch('close', { success: res.data.success })
            } else if (res.data.success === false) {
                is_sending_recovery_Link = false
                password_reset_request_error = res.data.message.data
            }
        }
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
            <div class="head-title-wrapper">
                <h1 class="head-title">Password Recovery</h1>
                <p class="mt-2 text-sm font-light">
                    Please enter the email you associated on your account here where I will send a recovery link.
                </p>
            </div>
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    bind:this={email}
                />
                {#if password_reset_request_error?.email}
                    <span class="error">{password_reset_request_error?.email?.message}</span>
                {/if}
            </label>

            <button
                formaction="/?/request_reset_password"
                class="send-recovery-link-button">
                <i class="ri-mail-send-line"/>&nbsp;
                <span>Send recovery link...</span>&nbsp;
                {#if is_sending_recovery_Link}
                    <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                {/if}
            </button>

            <button
                type="reset"
                on:click={() => { dispatch('close', { back_to_main: true }) }}>
                Back to Log in
            </button>
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
        padding: 25px;
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

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            /* gap: 10px; */
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 1rem;
            padding: 0.7rem 2rem;
            cursor: pointer;
        }

        .send-recovery-link-button {
            /* background-color: darkslategray; */
            background-color: var(--gray-8);
            &:hover, &:active, &:focus {
                background-color: var(--gray-9)
            }
        }

        button[type="reset"] {
            background-color: var(--green-6);
            &:hover { background-color: var(--green-7); }
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

        /*.error-box {
            background-color: var(--red-6);
            padding: 8px 10px;
            margin-inline: 5px;
            font-weight: bold;
            font-size: small;
            color: white;
            border-radius: 5px;
        } */
    }
</style>