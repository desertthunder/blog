<script lang="ts">
	import { toggleDrawer, drawerVisible } from '$lib/store';
</script>

<header class="my-8 py-4 flex justify-between container items-center">
	<button on:click={toggleDrawer}>
		<i class="i-ri-book-open-line {$drawerVisible ? 'opacity-100' : 'opacity-0 w-0 h-0'}"></i>
		<i class="i-ri-book-fill {$drawerVisible ? 'w-0 h-0 opacity-0' : 'opacity-100'}"></i>
	</button>

	<h1 class="text-5xl font-semibold">Owais Jamil</h1>

	<button>
		<i class="i-ri-search-eye-line"></i>
	</button>
</header>

<style lang="postcss">
	button {
		@apply text-black-olive border border-black-olive rounded-sm shadow-sm p-4 flex;
		@apply bg-pearl;
	}

	button i {
		@apply text-3xl;
		@apply transition-all duration-500;
	}
</style>
