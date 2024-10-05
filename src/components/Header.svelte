<script lang="ts">
	import { toggleDrawer } from '$lib/store';
</script>

<header class="my-8 py-4 flex justify-between container items-center">
	<button on:click={toggleDrawer}>
		<i class="i-ri-menu-fill"></i>
	</button>

	<h1 class="text-5xl font-semibold">Owais Jamil</h1>

	<button>
		<i class="i-ri-search-eye-line"></i>
	</button>
</header>

<style lang="postcss">
	button {
		@apply text-black-olive border-2 border-black-olive rounded-sm shadow-sm p-4 flex;
		@apply bg-pearl;
	}

	button i {
		@apply text-3xl;
	}
</style>
