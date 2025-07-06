import { c as create_ssr_component, a as subscribe, e as add_attribute, f as escape, v as validate_component, j as each, i as add_styles, d as createEventDispatcher, n as null_to_empty } from './ssr-4c1621f1.js';
import { e as selected_menu, c as current_user, a as admin, b as chats, d as send_to_id, f as friends_list, h as client_timezone } from './store-b33e4f9b.js';
import PocketBase from 'pocketbase';
import { p as public_env } from './shared-server-58a5f352.js';
import { u as updateChatsRead, h as updateAdminChatsRead } from './Database-d3f8efb2.js';
import './index2-13947cc8.js';

const css$2 = {
  code: ":root{--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),\n    0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),\n    0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),\n    0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),\n    0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));--shadow-color:220 3% 15%;--shadow-strength:1%}button.svelte-iij74.svelte-iij74{padding:0;background-color:transparent;border-radius:100%}.friends-list-wrapper.svelte-iij74.svelte-iij74{box-shadow:var(--shadow-3);display:flex;position:absolute;right:0}button.svelte-iij74 .icon.svelte-iij74{background-color:rgba(169, 169, 169, 0.411);display:flex;justify-content:center;align-items:center;padding:0.7rem;border-radius:100%;margin:auto;transition:background-color 0.2s ease-in-out;font-size:1.2rem}button.svelte-iij74 .icon.svelte-iij74:hover{background-color:rgba(169, 169, 169, 1)}@media(prefers-color-scheme: dark){:root{--shadow-color:220 40% 2%;--shadow-strength:25%}}",
  map: null
};
const FriendsListDropDownMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  $$result.css.add(css$2);
  return ` <main><button class="svelte-iij74" data-svelte-h="svelte-1k85noj"><span class="icon svelte-iij74"><i class="ri-chat-new-line"></i></span></button> ${``} </main>`;
});
const css$1 = {
  code: ".from.svelte-1bj46e9 .message.svelte-1bj46e9,.to.svelte-1bj46e9 .message.svelte-1bj46e9{color:black;padding:7px 15px ;margin:5px 0;max-width:48%;width:-moz-fit-content;width:fit-content}.from.svelte-1bj46e9 .message .chat-date.svelte-1bj46e9,.to.svelte-1bj46e9 .message .chat-date.svelte-1bj46e9{font-size:x-small}.from.svelte-1bj46e9 .message.svelte-1bj46e9{border-top-left-radius:var(--message-border-radius);border-top-right-radius:var(--message-border-radius);border-bottom-left-radius:var(--message-border-radius);background-color:lightgray;justify-self:right;float:right}.from.svelte-1bj46e9 .message .chat-date.svelte-1bj46e9{text-align:right}.to.svelte-1bj46e9 .message.svelte-1bj46e9{border-top-left-radius:var(--message-border-radius);border-top-right-radius:var(--message-border-radius);border-bottom-right-radius:var(--message-border-radius);background-color:lightblue;justify-self:left}.to.svelte-1bj46e9 .message .chat-date.svelte-1bj46e9{text-align:left}",
  map: null
};
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { source } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  $$result.css.add(css$1);
  return `<main><div class="${escape(null_to_empty(source), true) + " svelte-1bj46e9"}"><div class="message svelte-1bj46e9">${slots.message ? slots.message({}) : ``} <p class="chat-date svelte-1bj46e9">${slots["chat-date"] ? slots["chat-date"]({}) : ``}</p></div></div> </main>`;
});
const css = {
  code: ":root{--blue-5:#339af0}main.svelte-q3wrar.svelte-q3wrar.svelte-q3wrar{--message-border-radius:20px;display:flex;height:70vh;margin:2rem}.hidden-form.svelte-q3wrar.svelte-q3wrar.svelte-q3wrar{visibility:hidden;height:0px}.hidden-form.svelte-q3wrar .svelte-q3wrar.svelte-q3wrar{visibility:hidden;height:0px}.chat-container.svelte-q3wrar.svelte-q3wrar.svelte-q3wrar{flex:2.5;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto auto auto auto;width:100%;overflow-y:auto}.chat-container.svelte-q3wrar .chat-who-wrapper.svelte-q3wrar.svelte-q3wrar{position:relative;display:flex;align-items:center;padding:0.5rem}.chat-container.svelte-q3wrar .chat-who-wrapper .chat-who.svelte-q3wrar.svelte-q3wrar{flex:2}.chat-container.svelte-q3wrar .status.svelte-q3wrar.svelte-q3wrar{color:lightgray}.chat-container.svelte-q3wrar .status.online.svelte-q3wrar.svelte-q3wrar{font-weight:bold;color:var(--blue-5)}.chat-container.svelte-q3wrar .content.svelte-q3wrar.svelte-q3wrar{grid-column:1 / 1;grid-row:2 / 4;display:grid;grid-template-columns:none;grid-template-rows:1fr auto;overflow-y:auto;border:solid 0.2px #222;border-top-left-radius:7px;border-top-right-radius:7px;padding:5px 10px}.chat-container.svelte-q3wrar .content .messages-wrapper.svelte-q3wrar.svelte-q3wrar{display:grid}.chat-container.svelte-q3wrar .friend-is-typing.svelte-q3wrar.svelte-q3wrar{width:-moz-fit-content;width:fit-content;grid-column:1 / 1;grid-row:3 / 4;border-top-right-radius:15px;background-color:rgba(0, 0, 255, 0.801);padding:5px 10px;font-size:small;z-index:18}.chat-container.svelte-q3wrar .message-input-control.svelte-q3wrar.svelte-q3wrar{position:relative;display:flex;border:solid 1px #222;height:auto;border:solid 0.2px #222;border-bottom-left-radius:7px;border-bottom-right-radius:7px}.chat-container.svelte-q3wrar .message-input-control .new-message.svelte-q3wrar.svelte-q3wrar{border-bottom-left-radius:7px;border-bottom-right-radius:7px;padding:10px;outline:none;resize:none;font-family:inherit;flex:2}.chat-container.svelte-q3wrar .message-input-control .btn-send.svelte-q3wrar.svelte-q3wrar{background-color:green;border-radius:7px;text-transform:uppercase;padding:10px 26px;font-size:small;color:white;margin:0.2rem;letter-spacing:1px}.chat-container.svelte-q3wrar .message-input-control .btn-send.svelte-q3wrar.svelte-q3wrar:hover{background-color:rgb(5, 168, 5)}.chat-container.svelte-q3wrar .message-input-control .btn-send.svelte-q3wrar.svelte-q3wrar:active{background-color:rgb(7, 204, 7)}.chat-container.svelte-q3wrar .message-input-control .btn-send.svelte-q3wrar.svelte-q3wrar:disabled{background-color:lightgray;color:darkgray}.chat-container.svelte-q3wrar .message-input-control.svelte-q3wrar>.sending-notification.svelte-q3wrar{position:absolute;display:flex;background-color:rgba(22, 22, 22, 0.5);height:100%;width:100%;align-items:center;justify-content:center;z-index:2}@media screen and (max-width: 650px){main.svelte-q3wrar.svelte-q3wrar.svelte-q3wrar{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let current_selected_friend;
  let $current_user, $$unsubscribe_current_user;
  let $admin, $$unsubscribe_admin;
  let $chats, $$unsubscribe_chats;
  let $send_to_id, $$unsubscribe_send_to_id;
  let $friends_list, $$unsubscribe_friends_list;
  let $client_timezone, $$unsubscribe_client_timezone;
  $$unsubscribe_current_user = subscribe(current_user, (value) => $current_user = value);
  $$unsubscribe_admin = subscribe(admin, (value) => $admin = value);
  $$unsubscribe_chats = subscribe(chats, (value) => $chats = value);
  $$unsubscribe_send_to_id = subscribe(send_to_id, (value) => $send_to_id = value);
  $$unsubscribe_friends_list = subscribe(friends_list, (value) => $friends_list = value);
  $$unsubscribe_client_timezone = subscribe(client_timezone, (value) => $client_timezone = value);
  selected_menu.set("chat");
  let message_content;
  let message;
  let message_value;
  let sendMessageBtn;
  let submitButton;
  let formPost;
  let send_ok = false;
  let is_typing = false;
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  const updateCurrentUserIsTyping = async (typing) => {
    try {
      await pb.collection("users").update($current_user?.id, { is_typing });
    } catch (error) {
      console.log(error);
    }
  };
  $$result.css.add(css);
  current_selected_friend = $friends_list.find((friend) => friend.id === $send_to_id) || null;
  {
    {
      if ($current_user.role == 0)
        send_ok = Boolean(message_value);
      else
        send_ok = Boolean(message_value);
    }
  }
  {
    updateCurrentUserIsTyping();
  }
  {
    if ($chats) {
      if ($current_user.role == 1)
        (async () => await updateChatsRead($current_user.id))();
      else if ($send_to_id)
        (async () => await updateAdminChatsRead($send_to_id))();
    }
  }
  $$unsubscribe_current_user();
  $$unsubscribe_admin();
  $$unsubscribe_chats();
  $$unsubscribe_send_to_id();
  $$unsubscribe_friends_list();
  $$unsubscribe_client_timezone();
  return `${$$result.head += `<!-- HEAD_svelte-o2mvh3_START -->${$$result.title = `<title>Chat - Michael Santiago</title>`, ""}<!-- HEAD_svelte-o2mvh3_END -->`, ""}  <form class="hidden-form svelte-q3wrar" method="POST" action="/chat?/get"${add_attribute("this", formPost, 0)}><button id="submit_button" type="submit" class="svelte-q3wrar"${add_attribute("this", submitButton, 0)} data-svelte-h="svelte-1n6la0w">Submit</button> <input name="friend_id"${add_attribute("value", $send_to_id || $admin.id, 0)} type="text" class="svelte-q3wrar"></form> <main class="svelte-q3wrar"> <div class="chat-container svelte-q3wrar">${$current_user.role === 0 ? `<div class="chat-who-wrapper svelte-q3wrar">${current_selected_friend ? `<span class="chat-who svelte-q3wrar">Me &amp; ${escape(current_selected_friend.first_name)}</span>` : `<span class="chat-who svelte-q3wrar" data-svelte-h="svelte-19bbntk">Select a friend to chat</span>`} ${validate_component(FriendsListDropDownMenu, "FriendsListDropDownMenu").$$render($$result, {}, {}, {})}</div>` : `<div class="chat-who-wrapper svelte-q3wrar"><div class="chat-who svelte-q3wrar">Michael is 
                    <span class="${["status svelte-q3wrar", $admin.is_online ? "online" : ""].join(" ").trim()}">${escape($admin.is_online ? "🟢 online" : "⚫ offline")}</span></div></div>`}  <div class="content svelte-q3wrar"${add_attribute("this", message_content, 0)}><div></div>  <div class="messages-wrapper svelte-q3wrar">${`${each($chats, (chat) => {
    return `${validate_component(Message, "Message").$$render(
      $$result,
      {
        source: $current_user.id === chat.from ? "from" : "to"
      },
      {},
      {
        "chat-date": () => {
          return `<span slot="chat-date">${escape(new Date(chat.created).toLocaleString("en-us", {
            timeZone: $client_timezone,
            dateStyle: "medium",
            timeStyle: "long"
          }))} </span>`;
        },
        message: () => {
          return `<span slot="message">${escape(chat.message)}</span>`;
        }
      }
    )}`;
  })}`}</div></div>   ${$current_user.role == 1 ? `<div class="friend-is-typing svelte-q3wrar"${add_styles({
    "visibility": $admin.is_typing ? "visible" : "hidden"
  })}><span>${escape($admin.first_name)} typing..</span></div>` : `${current_selected_friend ? `<div class="friend-is-typing svelte-q3wrar"${add_styles({
    "visibility": current_selected_friend.is_typing ? "visible" : "hidden"
  })}><span>${escape(current_selected_friend.first_name)} typing..</span></div>` : ``}`}  <form class="message-input-control svelte-q3wrar" method="POST" action="?/send">${``} <textarea class="new-message svelte-q3wrar" name="message" placeholder="type your message here"${add_attribute("this", message, 0)}>${escape("")}</textarea> <input hidden name="send_to_id" type="text"${add_attribute("value", $send_to_id, 0)}> <button ${!send_ok ? "disabled" : ""} class="btn-send svelte-q3wrar"${add_attribute("this", sendMessageBtn, 0)}>Send</button></form></div> </main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-d315fb0c.js.map
