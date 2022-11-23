export async function load({ fetch }) {
    const response = await fetch(`/api/page/introduction`);
    return await response.json();
}