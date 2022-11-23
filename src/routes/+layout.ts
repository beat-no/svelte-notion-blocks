export async function load({ fetch }) {
    const response = await fetch("/api/blocks");
    const blocks = await response.json();
    return { blockTypes: blocks };
}