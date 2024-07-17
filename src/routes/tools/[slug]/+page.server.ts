import type { PageServerLoad } from './$types';

interface Tool {
    name: string;
    slug: string;
}

const tools: Record<string, Tool> = {
    sandbox: { name: 'Sandbox', slug: 'sandbox' }
    // Add more tools here as needed
};

export const load: PageServerLoad = async ({ params }) => {
    const tool = tools[params.slug];

    if (tool) {
        return { tool };
    }

    throw new Error('Not found');
};