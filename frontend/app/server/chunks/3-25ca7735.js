import { f as fail, r as redirect } from './index-c0d58dbe.js';
import { b as signUp, p as post, d as deletePost, r as requestResetPassword, s as serializeNonPOJ } from './Database-d3f8efb2.js';
import './shared-server-58a5f352.js';
import 'pocketbase';

const actions = {
  // SIGN-UP
  sign_up: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.append("role", "1");
    formData.append("emailVisibility", "true");
    return await signUp(formData);
  },
  // LOG-IN
  log_in: async ({ request, locals }) => {
    try {
      const user = Object.fromEntries(await request.formData());
      await locals.pb.collection("users").authWithPassword(user.email, user.password);
      return { success: true };
    } catch (error) {
      return fail(400, { success: false, message: error.data });
    }
  },
  // LOG-OUT
  log_out: async ({ locals }) => {
    await locals.pb.authStore.clear();
    await locals.pb.collection("users").update(locals.user.id, { is_online: false });
    locals.pb.collection("chats").unsubscribe("*");
    locals.pb.collection("users").unsubscribe("*");
    locals.pb.collection("posts").unsubscribe("*");
    throw redirect(302, "/");
  },
  // POST
  post: async ({ request, locals }) => {
    const formData = await request.formData();
    await post(formData);
  },
  // DELETE POST
  delete_post: async ({ request, locals }) => {
    const formData = await request.formData();
    const post_id = formData.get("post_id");
    await deletePost(String(post_id));
  },
  // REQUEST RESET PASSWORD
  request_reset_password: async ({ request }) => {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    return await requestResetPassword(email);
  },
  // PROFILE
  // UPDATE PROFILE BASIC INFO
  update_basic_info: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("users").update(locals.user.id, formData);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.data
      };
    }
  },
  change_password: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());
    try {
      await locals.pb.collection("users").update(locals.user.id, {
        email: locals.user.email,
        oldPassword: data.current_password,
        password: data.password,
        passwordConfirm: data.confirm_password
      });
      await locals.pb.collection("users").authWithPassword(locals.user.email, data.password);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: serializeNonPOJ(error?.data)
      };
    }
  },
  // Change Email
  change_email: async ({ request, locals }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("users").authWithPassword(locals.user.email, formData.get("password"));
      await locals.pb.collection("users").requestEmailChange(formData.get("newEmail"));
      return { success: true, change_email: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: serializeNonPOJ(error?.data)
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7406d3ae.js')).default;
const server_id = "src/routes/(home)/+page.server.ts";
const imports = ["_app/immutable/nodes/3.09bad871.js","_app/immutable/chunks/scheduler.22c66fb6.js","_app/immutable/chunks/index.94eb7729.js","_app/immutable/chunks/store.565d065b.js","_app/immutable/chunks/index.80348aca.js","_app/immutable/chunks/each.600bc0e3.js","_app/immutable/chunks/Database.5f632785.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.b2371634.js","_app/immutable/chunks/navigation.488f8e7d.js"];
const stylesheets = ["_app/immutable/assets/3.feca5a65.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-25ca7735.js.map
