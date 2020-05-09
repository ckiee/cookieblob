import { readable } from "svelte/store";

export const user = readable(null, async (set) => {
    set(await (await fetch("/api/users/me")).json());
    return () => {};
});
