import { get, writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import PocketBase from 'pocketbase';
import { serializeNonPOJ } from '$lib/utilities';
import { env } from "$env/dynamic/public";

let _theme;
if (browser) _theme = localStorage.getItem('theme') || 'light';
export const theme = writable(_theme);

// Will only sets/subscribe this when instruction is coming from browser (not from backend server)
export const client_timezone: Writable<string> = writable('UTC');
if (browser) {
    theme.subscribe((value) => localStorage.setItem('theme', value));
    try {
        fetch('https://ipwho.is')
        .then(res =>  res.json())
        .then(data => {
            if (data.success) client_timezone.set(data.timezone.id);
        })
    } catch (error: any) { console.log(error); }
}

// I typed this particular store to stop the typescript yelling about it
export const user: Writable<any> = writable();  // currently logged-in
export const users: Writable<any> = writable([]);

// const pb = new PocketBase(env.PUBLIC_PB_URI); // this must be in actual deployed version
let pb_uri = (!browser) ? env.PUBLIC_PB_URI : "http://127.0.0.1:8090";
// let pb_uri = (!browser) ? env.PUBLIC_PB_URI : env.PUBLIC_PB_URI;
const pb = new PocketBase(pb_uri);

const _admin = serializeNonPOJ(
    await pb.collection('users')
    .getFullList(200, { filter: "role = 0" })
)[0];
    
export const admin: Writable<any> = writable(_admin);

export const chats: Writable<any> = writable([]);
export const unreadChats: Writable<any> = writable([]);
export const send_to_id = writable('');
export const selected_menu = writable('dashboard');
export const about_selected_menu = writable('projects');
export const show_dropdown_menu = writable(false);
export const show_login_form = writable(false);
export const show_sign_up_form = writable(false);
export const show_profile_form = writable(false);
export const show_forgot_password_request_form = writable(false);
export const show_notification = writable(false);