<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte"
    import { fly, fade } from 'svelte/transition';

    const dispatch = createEventDispatcher()

    const onClickClose = () => {
        modal.classList.toggle('show');
        dispatch("close");
    }

	let modal: HTMLDivElement

	const handle_keydown = (e: any) => {
		if (e.key === 'Escape') {
			onClickClose();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n: Element) =>  (n as HTMLElement).tabIndex >= 0);

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

<div class="modal-window-wrapper" on:click|self={onClickClose} on:keydown={() => { }}>
    <div in:fly="{{x: 22, duration: 300}}" out:fly="{{x: 82, duration: 200}}"
        role="dialog" class="modal-window" aria-modal="true" bind:this={modal}>
        <div class="content"><slot>no content</slot></div>
    </div>
</div>

<style>
    :root {
        --mw-height: 300px;
        --mw-width: 400px;
    }
    .modal-window-wrapper {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 11;
        transition: background-color 0.8s ease-out;
    }
    
    .modal-window {
        display: flex;
        position: absolute;
        flex-direction: column;
        width: var(--mw-width);
        border: solid 1px lightblue;
        background-color: whitesmoke;
        height: 100%;
        right: 0em;
        overflow-y: auto;
    }

    .content {
        padding: 2px 5px;
    }
</style>