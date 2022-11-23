export async function load({ fetch }) {
    const response = await fetch(`/api/page/styling`);
    return await response.json();
}