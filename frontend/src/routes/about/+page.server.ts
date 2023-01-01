import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    throw redirect(307, '/about/projects');
    // if (locals.user) throw redirect(307, '/about/projects');
    // else throw redirect(307, '/login');
}