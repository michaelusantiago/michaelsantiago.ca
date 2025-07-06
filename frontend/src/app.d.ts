// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			pb: any | undefined,
			user: any | undefined
		}
	}
}

declare module "eventsource";

export {};
