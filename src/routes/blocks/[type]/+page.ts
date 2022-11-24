export async function load({ fetch, params, setHeaders }) {
    setHeaders({ 'cache-control': 'public, max-age=60' });
    const { type } = params;
    const response = await fetch(`/api/blocks/${type}`);
    const { page, blocks } = await response.json();
    return { page, blocks };
}