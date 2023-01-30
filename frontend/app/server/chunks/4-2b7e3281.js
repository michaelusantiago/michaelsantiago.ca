import { r as redirect } from './index2-2067fca8.js';
import { s as serializeNonPOJ } from './utilities-9e3a1c44.js';

const load = async ({ cookies, locals }) => {
  const posts = serializeNonPOJ(await locals.pb.collection("posts").getList(1, 3, { sort: "-created" }));
  return { posts: posts.items };
};
const actions = {
  log_in: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await locals.pb.collection("users").authWithPassword(email, password);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  request_reset_password: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    try {
      const result = await locals.pb.collection("users").requestPasswordReset(email);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  update_basic_info: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("users").update(locals.user.id, formData);
      await locals.pb.collection("users").authRefresh();
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  change_password: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("users").update(locals.user.id, {
        oldPassword: formData.get("currentPassword"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm")
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  change_email: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("users").authWithPassword(locals.user.email, formData.get("password"));
      await locals.pb.collection("users").requestEmailChange(formData.get("newEmail"));
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  log_out: async ({ locals }) => {
    await locals.pb.authStore.clear();
    await locals.pb.collection("users").update(locals.user.id, { is_online: false });
    locals.pb.collection("chats").unsubscribe("*");
    locals.pb.collection("users").unsubscribe("*");
    throw redirect(307, "/");
  },
  close: async ({ request }) => {
  },
  post: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("posts").create(formData);
      const posts = serializeNonPOJ(await locals.pb.collection("posts").getList(1, 3, { sort: "-created" }));
      return { success: true, posts: posts.items };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  sign_up: async ({ locals, request }) => {
    const formData = await request.formData();
    formData.append("role", "1");
    formData.append("emailVisibility", "true");
    try {
      const newUser = await locals.pb.collection("users").create(formData);
      if (newUser) {
        const emailVerification = await locals.pb.collection("users").requestVerification(formData.get("email"));
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        err: true,
        message: serializeNonPOJ(error.data)
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-86e9a3d1.js')).default;
const file = '_app/immutable/components/pages/_page.svelte-78a8396a.js';
const imports = ["_app/immutable/components/pages/_page.svelte-78a8396a.js","_app/immutable/chunks/index-37f1e841.js","_app/immutable/chunks/index-d7a3a3e5.js","_app/immutable/chunks/parse-c28e5ac2.js","_app/immutable/chunks/env-public-1b9b25bc.js","_app/immutable/chunks/globalstore-e4075d3d.js"];
const stylesheets = ["_app/immutable/assets/_page-0e1ba53e.css","_app/immutable/assets/index-95b16411.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, stylesheets };
//# sourceMappingURL=4-2b7e3281.js.map
