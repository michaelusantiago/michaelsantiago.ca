import { writable, type Writable} from "svelte/store"
import { browser } from "$app/environment"

export let selected_menu = writable('dashboard')
export let current_user: Writable<any> = writable(null)
export let posts: Writable<any> = writable([])
export let admin: Writable<any> = writable(null)
export let chats: Writable<any> = writable([])
export let friends_list: Writable<any> = writable([])
export let selected_background_menu = writable('')
export let selected_drop_down_menu: Writable<null | string> = writable(null)
export let send_to_id = writable('')
export let unread_chats: Writable<any> = writable([])

/* 
    'dark' first', This also avoid the transition delay of light icon to dark icon when page is refreshed
*/
let _theme = 'dark'
if (browser) _theme = localStorage.getItem('theme') || 'dark'
export let theme = writable(_theme)

export let client_timezone: Writable<string> = writable('UTC')
if (browser) {
    theme.subscribe((value) => localStorage.setItem('theme', value))
    try {
        fetch('https://ipwho.is')
        .then(res =>  res.json())
        .then(data => {
            if (data.success) client_timezone.set(data.timezone.id)
        })
    } catch (error: any) { console.log(error) }
}