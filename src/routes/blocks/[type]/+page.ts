export async function load({ fetch, params }) {
    const { type } = params;
    const response = await fetch(`/api/blocks/${type}`);
    const { page, blocks } = await response.json();
    return { page, blocks };
}