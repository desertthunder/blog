<script lang="ts">
	import { drawerVisible } from '$lib/store';
</script>

{#if $drawerVisible}
	<aside>
		{#each [0, 1] as _}
			<div class="flex-1 border-2 border-black bg-pearl rounded flex flex-col">
				<header class="flex items-center space-x-2 h-[32px] px-2 bg-black">
					<div class="w-4 h-4 bg-red-500 rounded-full"></div>
					<div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
					<div class="w-4 h-4 bg-green-500 rounded-full"></div>
				</header>
				<section class="flex-1 space-x-2 divide-y-2 divide-black-olive p-4">Projects</section>
			</div>
		{/each}
	</aside>
{/if}

<style lang="postcss">
	aside {
		@apply min-w-[25%] flex flex-col space-y-8;
	}
</style>
