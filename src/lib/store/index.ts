import { writable } from "svelte/store";

// Drawer
export const drawerVisible = writable(true);

export function toggleDrawer() {
    drawerVisible.update((value) => !value);
}
