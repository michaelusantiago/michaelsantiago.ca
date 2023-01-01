// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: any | undefined,
		pb: any | undefined,
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

declare module '*.md' {
	const content: svelte;
	export = content;
}