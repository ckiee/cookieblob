import { readable, writable } from "svelte/store";

export const user = writable(null, async (set) => {
    const res = await fetch("/api/users/me");
    set(res.ok ? await res.json() : null);
    return () => {};
});

export async function logOut() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    user.set(null);
}
