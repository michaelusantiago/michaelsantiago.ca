import { p as public_env } from './shared-server-58a5f352.js';
import PocketBase from 'pocketbase';

function exactAge(birth_date) {
  const AVERAGE_DAYS_IN_YEAR = 365.25;
  const MONTHS_IN_YEAR = 12;
  const DAYS_IN_WEEK = 7;
  const AVERAGE_DAYS_IN_MONTH = AVERAGE_DAYS_IN_YEAR / MONTHS_IN_YEAR;
  const MS_IN_YEAR = 315576e5;
  const MS_IN_DAY = 864e5;
  const MS_IN_MONTH = AVERAGE_DAYS_IN_MONTH * MS_IN_DAY;
  const MS_IN_WEEK = DAYS_IN_WEEK * MS_IN_DAY;
  const my_bd = new Date(birth_date).getTime();
  const now = (/* @__PURE__ */ new Date()).getTime();
  let age_in_ms = now - my_bd;
  let myAge = { year: 0, months_over: 0, weeks_over: 0, days_over: 0 };
  myAge.year = Math.trunc(age_in_ms / MS_IN_YEAR);
  age_in_ms -= myAge.year * MS_IN_YEAR;
  myAge.months_over = Math.trunc(age_in_ms / MS_IN_MONTH);
  age_in_ms -= myAge.months_over * MS_IN_MONTH;
  myAge.weeks_over = Math.trunc(age_in_ms / MS_IN_WEEK);
  age_in_ms -= myAge.weeks_over * MS_IN_WEEK;
  myAge.days_over = Math.trunc(age_in_ms / MS_IN_DAY);
  return myAge;
}
const serializeNonPOJ = (data) => {
  if (data)
    return JSON.parse(JSON.stringify(data));
  return null;
};

const getAdmin = async () => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  return serializeNonPOJ(
    await pb.collection("users").getFullList(0, { filter: "role = 0" })
  )[0];
};
const signUp = async (user) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  try {
    const new_user = await pb.collection("users").create(user);
    if (new_user)
      await pb.collection("users").requestVerification(String(user.get("email")));
    return { success: true };
  } catch (error) {
    return {
      sucesss: false,
      message: serializeNonPOJ(error.data)
    };
  }
};
const post = async (post2) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  try {
    await pb.collection("posts").create(post2);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      err: true,
      message: serializeNonPOJ(error?.data)
    };
  }
};
const deletePost = async (post_id) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  await pb.collection("posts").delete(post_id);
};
const getChats = async (current_user_id, friend_id) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  try {
    const chats = serializeNonPOJ(
      await pb.collection("chats").getFullList(0, {
        filter: `(from = "${current_user_id}" && to = "${friend_id}") || (from = "${friend_id}" && to = "${current_user_id}")`,
        sort: "+created"
      })
    );
    return { success: true, chats };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message };
  }
};
const sendMessage = async (pb, data) => {
  await pb.collection("chats").create(data);
};
const getUnreadChats = async (user_id) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  const unread_chats = serializeNonPOJ(
    await pb.collection("chats").getFullList(0, {
      filter: `(read = false) && (to = "${user_id}")`,
      sort: "+created"
    })
  );
  return unread_chats;
};
const updateChatsRead = async (user_id) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  const unread_chats = await getUnreadChats(user_id);
  if (unread_chats.length == 0)
    return;
  for (let chat of unread_chats) {
    await pb.collection("chats").update(chat.id, { read: true });
  }
};
const updateAdminChatsRead = async (friend_id) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  const admin = await getAdmin();
  const unread_chats = serializeNonPOJ(
    await pb.collection("chats").getFullList(0, {
      filter: `(from = "${friend_id}" && to = "${admin.id}") && (read = false)`,
      sort: "+created"
    })
  );
  if (!unread_chats.length)
    return;
  for (let chat of unread_chats) {
    await pb.collection("chats").update(chat.id, { read: true });
  }
};
const requestResetPassword = async (email) => {
  const pb = new PocketBase(public_env.PUBLIC_PB_URI);
  try {
    const result = await pb.collection("users").requestPasswordReset(email);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: serializeNonPOJ(error?.data)
    };
  }
};

export { getUnreadChats as a, signUp as b, sendMessage as c, deletePost as d, getChats as e, exactAge as f, getAdmin as g, updateAdminChatsRead as h, post as p, requestResetPassword as r, serializeNonPOJ as s, updateChatsRead as u };
//# sourceMappingURL=Database-d3f8efb2.js.map
